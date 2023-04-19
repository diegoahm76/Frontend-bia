/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { Title } from '../../../../components/Title';
import jsPDF from 'jspdf';
import { Button, Grid, Typography, Stack, MenuItem, Box, CircularProgress, TextField, FormControl } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { api } from '../../../../api/axios';
import "react-datepicker/dist/react-datepicker.css";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import esLocale from 'dayjs/locale/es'; // importar el idioma español

import { control_error } from '../../../../helpers/controlError';
import type { AxiosError } from 'axios';
import { image_data, image_data2, image_data2_1, image_data_1 } from '../imagenes/imagenes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReportesScreen: React.FC = () => {

  const [select_reporte, set_select_reporte] = useState({
    opciones_reportes: "0",
  });

  const opciones_reportes = [
    { label: 'Reporte variables', value: "1" },
    { label: 'Reporte mensual', value: "2" },
  ];

  const [selectdashboards, set_select_dashboards] = useState({
    opc_dashboards: "0"
  })
  const opc_dashboards = [
    { label: 'Guamal', value: "1" },
    { label: 'Guayuriba', value: "2" },
    { label: 'Ocoa', value: "3" },
    { label: 'Caño Rubiales', value: "4" },
    { label: 'Acaciitas', value: "5" },
    { label: 'Chichimene', value: "6" },
  ];

  const [loading, set_loading] = useState(false);


  const [fecha_inicial, set_fecha_inicial] = useState<Date | null>(new Date());

  const handle_input_change = (date: Date | null) => {
    set_fecha_inicial(date)
  };
  const fetch_data = async (): Promise<any> => {
    set_loading(true);
    const fecha = dayjs(fecha_inicial).format('YYYY-MM');

    console.log(fecha)

    try {
      const response = await api.get(`https://backend-bia-beta-production.up.railway.app/api/estaciones/datos/consultar-datos-reporte/${selectdashboards.opc_dashboards}/${fecha}/`);
      set_loading(false);
      return response.data;
    } catch (err: unknown) {
      set_loading(false);
      const temp_error = err as AxiosError
      console.log("Error", temp_error.response?.status)
      if (temp_error.response?.status === 404) {
        control_error("No se encontraron datos para esta estación");
        console.log("No hay datos");
      } else {
        // Otro error, mostrar mensaje de error genérico
        control_error("Ha ocurrido un error, por favor intente de nuevo más tarde.");
      }
    };
  }

  const fetch_data_2 = async (): Promise<{ data: any, unique_days: Record<string, boolean> }> => {
    try {
      set_loading(true);
      const fecha = dayjs(fecha_inicial).format("YYYY-MM");
      const response = await api.get(
        `https://backend-bia-beta-production.up.railway.app/api/estaciones/datos/consultar-datos-reporte/${selectdashboards.opc_dashboards}/${fecha}/`
      );

      // Dias unicos del mes
      const year = dayjs(fecha_inicial).year();
      const month = dayjs(fecha_inicial).month();
      const num_days = new Date(year, month + 1, 0).getDate();

      const unique_days: Record<string, boolean> = {};
      for (let i = 1; i <= num_days; i++) {
        const date_str = dayjs().set('year', year).set('month', month).set('date', i).format("YYYY-MM-DD");
        unique_days[date_str] = false;
      }

      // verificar si hay datos para cada uno de los días únicos del mes
      for (let i = 0; i < response.data.data.length; i++) {
        const fecha = dayjs(response.data.data[i].fecha_registro);
        const date_str = fecha.format("YYYY-MM-DD");

        // verificar si la fecha está dentro del mes seleccionado
        if (fecha.month() === month && fecha.year() === year) {
          unique_days[date_str] = true;
        }
      }

      // verificar si hay datos en todos los días únicos del mes
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const all_days_have_data = !Object.values(unique_days).includes(false);

      set_loading(false);
      return { data: response.data, unique_days };

    } catch (err: unknown) {
      set_loading(false);
      const temp_error = err as AxiosError
      console.log("Error", temp_error.response?.status)
      if (temp_error.response?.status === 404) {
        control_error("No se encontraron datos para esta fecha");
        console.log("No hay datos");
      } else {
        // Otro error, mostrar mensaje de error genérico
        control_error("Ha ocurrido un error, por favor intente de nuevo más tarde.");
      }
      // agrega un retorno en caso de error
      return { data: null, unique_days: {} };
    }
  };


  const {
    control: control_filtrar,
  } = useForm();
  const generate_pdf_2 = (data: any, unique_days: Record<string, boolean>): void => {
    // eslint-disable-next-line new-cap
    const doc: jsPDF = new jsPDF();

    // Establecer la fuente y tamaño de letra
    const font_props = {
      size: 12
    };
    doc.setFont('Arial', 'normal');
    doc.setFontSize(font_props.size);

    const img_width = 140;
    const img_height = 15;
    const img_x = (doc.internal.pageSize.width - img_width) / 2;
    const img_y = doc.internal.pageSize.getHeight() - img_height - 10; // Aquí se resta 10 unidades para dejar algo de espacio entre la imagen y el borde inferior de la página

    const selected_station = opc_dashboards.find(station => station.value === selectdashboards.opc_dashboards);
    const title = `CERTIFICADO MENSUAL DE LA ESTACIÓN ${selected_station?.label ?? 'Ninguna estación seleccionada'}`;
    const title_width = doc.getTextWidth(title);
    const x_pos = (doc.internal.pageSize.width - title_width) / 2;
    doc.addImage(image_data_1, 160, 5, 40, 15)
    doc.addImage(image_data2_1, img_x, img_y, img_width, img_height);;
    doc.setFont("Arial", "bold"); // establece la fuente en Arial
    doc.text(title, x_pos, 30);
    const fecha = dayjs(fecha_inicial).locale('es').format('MMMM [de] YYYY')
    doc.setFont("Arial", "normal"); // establece la fuente en Arial
    doc.text(`En el mes de ${fecha} la ${selected_station?.label ?? 'Ninguna estación seleccionada'} `, 30, 50);
    doc.text(`presento las siguientes variaciones`, 30, 60);
    doc.setFont("Arial", "normal");

    const unavailable_days = Object.keys(unique_days).filter(day => !unique_days[day])
      .map(day => dayjs(day).format("DD"));
    const get_available_days = (unique_days: Record<string, boolean>): string[] => {
      const available_days: string[] = [];

      for (const day in unique_days) {
        // eslint-disable-next-line no-prototype-builtins
        if (unique_days.hasOwnProperty(day)) {
          if (unique_days[day]) {
            available_days.push(day);
          }
        }
      }

      return available_days;
    }
    const get_date_range = (available_days: string[]): { start: string, end: string } => {
      const start_date = dayjs(available_days[0]);
      const end_date = dayjs(available_days[available_days.length - 1]);

      return {
        start: start_date.format('DD'),
        end: end_date.format('DD')
      };
    }
    const available_days = get_available_days(unique_days);
    const date_range = get_date_range(available_days);

    doc.text(` Se recibieron datos del sensor de temperatura de la estación en los siguientes días:`, 30, 70);
    doc.text(`Del día ${date_range.start} al día ${date_range.end} de ${fecha}`, 30, 80);
    doc.text(`Dia(s) en que no hay datos ${unavailable_days.join(", ")}`, 30, 90);
    doc.text(`Se recibieron datos del sensor de humedad de la estación en los siguientes días:`, 30, 100);
    doc.text(`Del día ${date_range.start} al día ${date_range.end} de ${fecha}`, 30, 110);
    doc.text(`Dia(s) en que no hay datos ${unavailable_days.join(", ")}`, 30, 120);
    doc.text(`Se recibieron datos del sensor de presion de aire de la estación en los siguientes días:`, 30, 130);
    doc.text(`Del día ${date_range.start} al día ${date_range.end} de ${fecha}`, 30, 140);
    doc.text(`Dia(s) en que no hay datos ${unavailable_days.join(", ")}`, 30, 150);
    doc.text(`Se recibieron datos del sensor de nivel de agua de la estación en los siguientes días:`, 30, 160);
    doc.text(`Del día ${date_range.start} al día ${date_range.end} de ${fecha}`, 30, 170);
    doc.text(`Dia(s) en que no hay datos ${unavailable_days.join(", ")}`, 30, 180);
    doc.text(`Se recibieron datos del sensor de velocidad del viento de la estación en los siguientes días:`, 30, 190);
    doc.text(`Del día ${date_range.start} al día ${date_range.end} de ${fecha}`, 30, 200);
    doc.text(`Dia(s) en que no hay datos ${unavailable_days.join(", ")}`, 30, 210);
    doc.text(`Se recibieron datos del sensor de luminosidad de la estación en los siguientes días:`, 30, 220);
    doc.text(`Del día ${date_range.start} al día ${date_range.end} de ${fecha}`, 30, 230);
    doc.text(`Dia(s) en que no hay datos ${unavailable_days.join(", ")}`, 30, 240);
    doc.text(`Se recibieron datos del sensor de dirección de viento de la estación en los siguientes días:`, 30, 250);
    doc.text(`Del día ${date_range.start} al día ${date_range.end} de ${fecha}`, 30, 260);
    doc.text(`Dia(s) en que no hay datos ${unavailable_days.join(", ")}`, 30, 270);

    doc.save('Certificación_mensual.pdf');
  }

  const generate_pdf = (data: any): void => {

    // eslint-disable-next-line new-cap
    const doc: jsPDF = new jsPDF();

    // Establecer la fuente y tamaño de letra
    const font_props = {
      size: 12
    };
    doc.setFont('Arial', 'normal');
    doc.setFontSize(font_props.size);


    // Calcular la temperatura promedio, mínima y máxima
    const temps = data.data.map((item: any) => parseFloat(item.temperatura_ambiente));
    const temp_avg = temps.reduce((acc: number, cur: number) => acc + cur, 0) / temps.length;
    const temp_min = Math.min(...temps);
    const temp_max = Math.max(...temps);
    // Calcular la humedad promedio, mínima y máxima
    const hum = data.data.map((item: any) => parseFloat(item.humedad_ambiente));
    const hum_avg = hum.reduce((acc: number, cur: number) => acc + cur, 0) / hum.length;
    const hum_min = Math.min(...hum);
    const hum_max = Math.max(...hum);
    // Calcular el nivel de agua promedio, mínima y máxima
    const nivel = data.data.map((item: any) => parseFloat(item.nivel_agua));
    const nivel_avg = nivel.reduce((acc: number, cur: number) => acc + cur, 0) / nivel.length;
    const nivel_min = Math.min(...nivel);
    const nivel_max = Math.max(...nivel);

    // Calcular el velocidad del agua promedio, mínima y máxima
    const velocidad = data.data.map((item: any) => parseFloat(item.velocidad_agua));
    const velocidad_avg = velocidad.reduce((acc: number, cur: number) => acc + cur, 0) / velocidad.length;
    const velocidad_min = Math.min(...velocidad);
    const velocidad_max = Math.max(...velocidad);

    // Calcular presion del aire promedio, minima y maxima

    const presion = data.data.map((item: any) => parseFloat(item.presion_barometrica));
    const presion_avg = presion.reduce((acc: number, cur: number) => acc + cur, 0) / presion.length;
    const presion_min = Math.min(...presion);
    const presion_max = Math.max(...presion);

    // Calcular luminosidad promedio, minima y maxima

    const luminosidad = data.data.map((item: any) => parseFloat(item.luminosidad));
    const luminosidad_avg = luminosidad.reduce((acc: number, cur: number) => acc + cur, 0) / luminosidad.length;
    const luminosidad_min = Math.min(...luminosidad);
    const luminosidad_max = Math.max(...luminosidad);

    // Calcular precipitacion promeido, minima y maxima

    const precipitacion = data.data.map((item: any) => parseFloat(item.precipitacion));
    const precipitacion_avg = precipitacion.reduce((acc: number, cur: number) => acc + cur, 0) / precipitacion.length;
    const precipitacion_min = Math.min(...precipitacion);
    const precipitacion_max = Math.max(...precipitacion);

    // const notrans = data.data.map((item: any) => (item.fecha_registro));
    // const notrasn_fecha = notrans

    // Agregar título y datos al PDF
    const img_width = 140;
    const img_height = 15;
    const img_x = (doc.internal.pageSize.width - img_width) / 2;
    const img_y = doc.internal.pageSize.getHeight() - img_height - 10; // Aquí se resta 10 unidades para dejar algo de espacio entre la imagen y el borde inferior de la página

    const selected_station = opc_dashboards.find(station => station.value === selectdashboards.opc_dashboards);
    const title = `CERTIFICADO DE DATOS OBTENIDOS EN LA ESTACIÓN ${selected_station?.label ?? 'Ninguna estación seleccionada'}`;
    const title_width = doc.getTextWidth(title);
    const x_pos = (doc.internal.pageSize.width - title_width) / 2;
    const fecha = dayjs(fecha_inicial).locale('es').format('MMMM [de] YYYY')
    doc.addImage(image_data, 160, 5, 40, 15)
    doc.addImage(image_data2, img_x, img_y, img_width, img_height);;
    doc.setFont("Arial", "normal"); // establece la fuente en Arial
    doc.text(`A continuación se mostrara un breve resumen de los datos obtenidos por cada una de las`, 30, 50);
    doc.text(`variables, dichos datos fueron obtenidos en el mes ${fecha}, estos son:`, 30, 60);
    doc.setFont("Arial", "bold"); // establece la fuente en Arial
    doc.text(title, x_pos, 30);
    doc.text(`Temperatura`, 100, 80);
    doc.setFont("Arial", "normal"); // establece la fuente en Arial
    doc.text(`La temperatura promedio que se presentó en el mes de ${fecha} fue de ${temp_avg.toFixed(2)} °C`, 30, 90);
    doc.text(`La temperatura mínima que se presentó en el mes ${fecha} fue de ${temp_min.toFixed(2)} °C`, 30, 100);
    doc.text(`La temperatura maxima que se presento en el mes ${fecha} fue de ${temp_max.toFixed(2)} °C`, 30, 110);
    doc.setFont("Arial", "bold"); // establece la fuente en Arial
    doc.text(`Humedad`, 102, 120);
    doc.setFont("Arial", "normal"); // establece la fuente en Arial
    doc.text(`La humedad promedio que se presento en el mes ${fecha} fue de ${hum_avg.toFixed(2)} % `, 30, 130);
    doc.text(`La humedad mínima que se presento en el mes ${fecha} fue de ${hum_min.toFixed(2)} % `, 30, 140);
    doc.text(`La humedad maxima que se presento en el mes ${fecha} fue de ${hum_max.toFixed(2)} % `, 30, 150);
    doc.setFont("Arial", "bold"); // establece la fuente en Arial
    doc.text(`Nivel de agua`, 100, 160);
    doc.setFont("Arial", "normal"); // establece la fuente en Arial
    doc.text(`El nivel de agua promedio que se presento en el mes ${fecha} fue de ${nivel_avg.toFixed(2)} m`, 30, 170);
    doc.text(`El nivel de agua minimo que se presento en el mes ${fecha} fue de ${nivel_min.toFixed(2)} m`, 30, 180);
    doc.text(`El nivel de agua maximo que se presento en el mes ${fecha} fue de ${nivel_max.toFixed(2)} m`, 30, 190);
    doc.setFont("Arial", "bold"); // establece la fuente en Arial
    doc.text(`Velocidad del agua`, 94, 200);
    doc.setFont("Arial", "normal"); // establece la fuente en Arial
    doc.text(`La velocidad del agua promedio que se presento en el mes ${fecha} fue de ${velocidad_avg.toFixed(2)} m / s`, 30, 210);
    doc.text(`La velocidad del agua mínima que se presento en el mes ${fecha} fue de ${velocidad_min.toFixed(2)} m / s`, 30, 220);
    doc.text(`La velocidad del agua maxima que se presento en el mes ${fecha} fue de ${velocidad_max.toFixed(2)} m / s`, 30, 230);
    doc.setFont("Arial", "bold"); // establece la fuente en Arial
    doc.text(`Presion del aire`, 97, 240);
    doc.setFont("Arial", "normal"); // establece la fuente en Arial
    doc.text(`La presión del aire promedio que se presento en el mes ${fecha} fue de ${presion_avg.toFixed(2)} Hpa`, 30, 250);
    doc.text(`La presión del aire mínima que se presento en el mes ${fecha} fue de ${presion_min.toFixed(2)} Hpa`, 30, 260);
    doc.text(`La presión del aire maxima que se presento en el mes ${fecha} fue de ${presion_max.toFixed(2)} Hpa`, 30, 270);
    doc.addPage() // Salto de pagina
    doc.addImage(image_data, 160, 5, 40, 15)
    doc.addImage(image_data2, img_x, img_y, img_width, img_height);;
    doc.setFont("Arial", "bold"); // establece la fuente en Arial
    doc.text(`Luminosidad`, 98, 40);
    doc.setFont("Arial", "normal"); // establece la fuente en Arial
    doc.text(`La luminosidad promedio que se presento en el mes ${fecha} fue de ${luminosidad_avg.toFixed(2)} Lux`, 30, 50);
    doc.text(`La luminosidad mínima que se presento en el mes ${fecha} fue de${luminosidad_min.toFixed(2)} Lux`, 30, 60);
    doc.text(`La luminosidad maxima que se presento en el mes ${fecha} fue de ${luminosidad_max.toFixed(2)} Lux`, 30, 70);
    doc.setFont("Arial", "bold"); // establece la fuente en Arial
    doc.text(`Precipitación`, 98, 80);
    doc.setFont("Arial", "normal"); // establece la fuente en Arial
    doc.text(`La precipitación promedio que se presento en el mes ${fecha} fue de ${precipitacion_avg.toFixed(2)} mm`, 30, 90);
    doc.text(`La precipitación mínima que se presento en el mes ${fecha} fue de ${precipitacion_min.toFixed(2)} mm`, 30, 100);
    doc.text(`La precipitación maxima que se presento en el mes ${fecha} fue de ${precipitacion_max.toFixed(2)} mm`, 30, 110);
    // Guardar el PDF
    doc.save('Certificación.pdf');
  }

  const handle_download_pdf = async (): Promise<void> => {
    const data = await fetch_data();
    generate_pdf(data);
  }

  const handle_download_pdf_2 = async (): Promise<void> => {
    const { data, unique_days } = await fetch_data_2();
    generate_pdf_2(data, unique_days);
  }

  return (

    <Grid
      container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}>
      <Title title="REPORTES DE LAS ESTACIONES" />
      <Grid item xs={12} spacing={2} >
        <Box mb={2} style={{ marginTop: '20px' }}>
          <Controller
            name="reporte"
            control={control_filtrar}
            defaultValue={""}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="dense"
                fullWidth
                select
                size="small"
                label="Tipo de informe"
                variant="outlined"
                defaultValue={value}
                value={value}
                onChange={(event) => {
                  const selected_value = event.target.value;
                  set_select_reporte({ opciones_reportes: selected_value });
                  onChange(selected_value, event);
                }}
              >
                {opciones_reportes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>
        <Typography variant="body1" hidden={select_reporte.opciones_reportes !== "1"}>
          <Stack sx={{ m: '20px 0 20px 0' }} direction="row" spacing={2}>
            <FormControl fullWidth>
              <Controller
                name="estacion"
                control={control_filtrar}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    select
                    size="small"
                    label="Estación"
                    variant="outlined"
                    defaultValue={value}
                    value={value}
                    onChange={(event) => {
                      const selected_value = event.target.value;
                      set_select_dashboards({ opc_dashboards: selected_value });
                      onChange(selected_value, event);
                    }}
                  >
                    {opc_dashboards.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                <DatePicker
                  label="Desde la fecha"
                  inputFormat="YYYY/MM"
                  openTo="month"
                  views={['year', 'month']}
                  value={fecha_inicial}

                  onChange={handle_input_change}
                  renderInput={(params) => (
                    <TextField
                      required
                      fullWidth
                      size="small"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth>
              <Button
                variant="contained"
                type="submit"
                className="text-capitalize rounded-pill "
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    ""
                  )
                }
                onClick={handle_download_pdf}>Descargar PDF
              </Button>
            </FormControl>
          </Stack>
        </Typography>
        <Typography variant="body1" hidden={select_reporte.opciones_reportes !== "2"}>
          <Stack sx={{ m: '20px 0 20px 0' }} direction="row" spacing={2}>
            <FormControl fullWidth>
              <Controller
                name="estacion"
                control={control_filtrar}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    select
                    size="small"
                    label="Estación"
                    variant="outlined"
                    defaultValue={value}
                    value={value}
                    onChange={(event) => {
                      const selected_value = event.target.value;
                      set_select_dashboards({ opc_dashboards: selected_value });
                      onChange(selected_value, event);
                    }}
                  >
                    {opc_dashboards.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                <DatePicker
                  label="Desde la fecha"
                  inputFormat="YYYY/MM"
                  openTo="month"
                  views={['year', 'month']}
                  value={fecha_inicial}

                  onChange={handle_input_change}
                  renderInput={(params) => (
                    <TextField
                      required
                      fullWidth
                      size="small"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth>
              <Button
                variant="contained"
                type="submit"
                className="text-capitalize rounded-pill "
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    ""
                  )
                }
                onClick={handle_download_pdf_2}>Descargar PDF
              </Button>
            </FormControl>
          </Stack>
        </Typography>
      </Grid >
    </Grid >

  );
};