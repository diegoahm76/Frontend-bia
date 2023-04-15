/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { Title } from '../../../../components/Title';
import jsPDF from 'jspdf';
import { Button, Grid, Typography, Stack, MenuItem, Box, CircularProgress, TextField } from '@mui/material';
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
    { label: 'ESTACIÓN GUAMAL', value: "1" },
    { label: 'ESTACIÓN GUAYURIBA', value: "2" },
    { label: 'ESTACIÓN OCOA', value: "3" },
    { label: 'ESTACIÓN PUERTO GAITAN', value: "4" },
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
    const image_data2 = "data:image/png;base64,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"
    const img_width = 140;
    const img_height = 15;
    const img_x = (doc.internal.pageSize.width - img_width) / 2;
    const img_y = doc.internal.pageSize.getHeight() - img_height - 10; // Aquí se resta 10 unidades para dejar algo de espacio entre la imagen y el borde inferior de la página

    const image_data = "data:image/jpeg;base64,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"
    const selected_station = opc_dashboards.find(station => station.value === selectdashboards.opc_dashboards);
    const title = `CERTIFICADO MENSUAL DE LA ${selected_station?.label ?? 'Ninguna estación seleccionada'}`;
    const title_width = doc.getTextWidth(title);
    const x_pos = (doc.internal.pageSize.width - title_width) / 2;
    doc.addImage(image_data, 160, 5, 40, 15)
    doc.addImage(image_data2, img_x, img_y, img_width, img_height);;
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

    doc.save('reporte_mensual.pdf');
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

    const image_data2 = "data:image/png;base64,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"
    const img_width = 140;
    const img_height = 15;
    const img_x = (doc.internal.pageSize.width - img_width) / 2;
    const img_y = doc.internal.pageSize.getHeight() - img_height - 10; // Aquí se resta 10 unidades para dejar algo de espacio entre la imagen y el borde inferior de la página
    const image_data = "data:image/jpeg;base64,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"
    const selected_station = opc_dashboards.find(station => station.value === selectdashboards.opc_dashboards);
    const title = `CERTIFICADO DE DATOS OBTENIDOS EN LA ${selected_station?.label ?? 'Ninguna estación seleccionada'}`;
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
    doc.save('reporte.pdf');
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
          <Grid item xs={12} spacing={2} >
            <Box mb={2} style={{ marginTop: '20px' }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
                      sx={{ width: 490, height: 42 }} // Ancho de 200px
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
                <Grid item>
                  <Stack direction="row" spacing={5} alignItems="center"></Stack>

                  <Stack direction="row" spacing={5} alignItems="center" sx={{ m: '20px 0' }} >
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
                      onClick={handle_download_pdf}>Descargar PDF</Button>
                  </Stack>

                </Grid>
              </div>
            </Box>
          </Grid>
        </Typography>

        <Typography variant="body1" hidden={select_reporte.opciones_reportes !== "2"}>
          <Grid item xs={12} spacing={2} >
            <Box mb={2} style={{ marginTop: '20px' }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
                      sx={{ width: 490, height: 42 }} // Ancho de 200px
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
                <Grid item>
                  <Stack direction="row" spacing={5} alignItems="center"></Stack>

                  <Stack direction="row" spacing={5} alignItems="center" sx={{ m: '20px 0' }} >
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
                      onClick={handle_download_pdf_2}>Descargar PDF</Button>
                  </Stack>

                </Grid>
              </div>
            </Box>
          </Grid>
        </Typography>
      </Grid >
    </Grid >

  );
};
