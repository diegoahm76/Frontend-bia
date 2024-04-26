import { Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Title } from "../../../../../components/Title";
import ReactApexChart from 'react-apexcharts';
import { DataContextPgar } from "../../../SeguimientoPGAR/context/context";
import { get_tablero_por_eje } from "../services/services";
import { control_error } from "../../../../../helpers";
import { ApexOptions } from "apexcharts";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaIndicadorEjeEstrategico: React.FC = () => {

  const [form_values, set_form_values] = useState({
    id_armonizar: '',
    id_planPGAR: '',
    id_planPAI: '',
    nombre_planPGAR: '',
    nombre_planPAI: '',
    estado: '',
  });

  const {rows_armonizacion, fetch_data_armonizaciones, fetch_data_seguimiento_pgar} = useContext(DataContextPgar);

  useEffect(() => {
    fetch_data_armonizaciones();
  }, []);

  const handle_change_armonizacion = (event: any) => {
    const id_armonizacion_select = event.target.value;
    const armonizacion_select = rows_armonizacion.find(armonizacion => armonizacion.id_armonizar === id_armonizacion_select);
    if (armonizacion_select) {
      set_form_values({
        ...form_values,
        id_armonizar: armonizacion_select.id_armonizar,
        id_planPGAR: armonizacion_select.id_planPGAR,
        id_planPAI: armonizacion_select.id_planPAI,
        nombre_planPGAR: armonizacion_select.nombre_planPGAR,
        nombre_planPAI: armonizacion_select.nombre_planPAI,
        estado: armonizacion_select.estado,
      });
    }
  }

  useEffect(() => {
    if(form_values.id_planPAI && form_values.id_planPGAR) {
      get_tablero_por_eje(Number(form_values.id_planPAI), Number(form_values.id_planPGAR)).then((data: any) => {
        console.log(data)
        load_chart_data(data);
      }).catch((error: any) => {
        control_error(error);
      });
    }
  }, [form_values.id_planPAI, form_values.id_planPGAR]);

  // const load_chart_data = (data: any) => {
  //   let series_obj: any = {};
  //   let categories: any = [];

  //   let nombres: any = {
  //     "pvance_fisico": "Porcentaje AFIS",
  //     "pavance_fisico_acomulado": "Porcentaje AFISA",
  //     "pavance_financiero": "Porcentaje AFIN",
  //     "pavance_recursos_obligados": "Porcentaje ARO"
  //   };

  //   if (data.length) {

  //     data.forEach((ind: any) => {
  //       categories.push(ind.nombre);

  //       ind.porcentajes.forEach((porcentaje: any) => {
  //         const ano = `Año ${porcentaje.año}`;

  //         if (!series_obj[ano]) {
  //           series_obj[ano] = {};
  //         }

  //         for (let key in porcentaje) {
  //           if (key !== 'año') {
  //             if (!series_obj[ano][key]) {
  //               series_obj[ano][key] = { name: nombres[key] + ' ' + ano, data: [], group: ano };
  //             }

  //             series_obj[ano][key].data.push(porcentaje[key]);
  //           }
  //         }
  //       });
  //     });


  //     let series: any = [];

  //     for (let group in series_obj) {
  //       for (let serie in series_obj[group]) {
  //         series.push(series_obj[group][serie]);
  //       }
  //     }

  //     console.log("series", series)

  //     set_chart_data({
  //       ...chart_data,
  //       series,
  //       options: {
  //         ...chart_data.options,
  //         xaxis: {
  //           ...chart_data.options.xaxis,
  //           categories,
  //         }
  //       }
  //     });
  //   }
  // };

  const load_chart_data = (data: any) => {
    let series_obj: any = {};
    let categories: any = [];

    let nombres: any = {
      "pvance_fisico": "Porcentaje AFIS",
      "pavance_fisico_acomulado": "Porcentaje AFISA",
      "pavance_financiero": "Porcentaje AFIN",
      "pavance_recursos_obligados": "Porcentaje ARO"
    };

    if (data.length) {
      data.forEach((ind: any, index: number) => {
        const words = ind.nombre.split(' ');
        const grouped_words = [];

        for (let i = 0; i < words.length; i += 2) {
          grouped_words.push(words.slice(i, i + 2).join(' '));
        }

        categories.push(grouped_words);

        // Inicializar todas las series para este eje estratégico
        for (let ano = 1; ano <= 4; ano++) {
          const anio_str = `Año ${ano}`;
          if (!series_obj[anio_str]) {
            series_obj[anio_str] = {
              'pvance_fisico': { name: 'Porcentaje AFIS ' + anio_str, data: [], group: anio_str },
              'pavance_fisico_acomulado': { name: 'Porcentaje AFISA ' + anio_str, data: [], group: anio_str },
              'pavance_financiero': { name: 'Porcentaje AFIN ' + anio_str, data: [], group: anio_str },
              'pavance_recursos_obligados': { name: 'Porcentaje ARO ' + anio_str, data: [], group: anio_str }
            };
          }
        }

        let length_porcentajes = ind.porcentajes.length;

        ind.porcentajes.forEach((porcentaje: any) => {
          const ano = `Año ${porcentaje.año}`;

          for (let key in porcentaje) {
            // if(ano === 'Año 3' && series_obj[ano][key].data.length === 0) series_obj[ano][key].data.push(0);
            if (key !== 'año') {
              if(index !== 0 && length_porcentajes < 4){
                if(series_obj[ano][key].data.length === 0) series_obj[ano][key].data.push(0);
              }
              series_obj[ano][key].data.push(porcentaje[key]);
            }
          }
        });

        // Añadir 0s para los años que no tienen datos
      });

      console.log(series_obj)

      let series: any = [];

      for (let group in series_obj) {
        for (let serie in series_obj[group]) {
          series.push(series_obj[group][serie]);
        }
      }

      console.log(series)

      set_chart_data({
        ...chart_data,
        series,
        options: {
          ...chart_data.options,
          xaxis: {
            ...chart_data.options.xaxis,
            categories,
          }
        }
      });
    }
  };


  // Estado inicial para la serie y opciones de la gráfica
  const [chart_data, set_chart_data] = useState<{
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    options: ApexOptions;
  }>({
    series: [],
    options: {
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
      chart: {
          height: 500,
          type: 'bar' as const, // Corregido para ser reconocido como un valor específico y no un string genérico
          stacked: true,
          events: {
              click: function (chart: any, w: any, e: any) {
                  // Puedes manejar clics en la gráfica aquí
              }
          },
          toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      plotOptions: {
          bar: {
              // distributed: true,
              barHeight: '75%',
              horizontal: true,
          }
      },
      dataLabels: {
          enabled: false
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontSize: '14px',
          },
        },
      },
    },
  });

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Tablero de Control General PGAR por Eje Estrategico" />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl required size='small' fullWidth>
            <InputLabel>Nombre Armonización</InputLabel>
            <Select
              multiline
              value={form_values.id_armonizar || ''}
              label="Nombre Armonización"
              onChange={handle_change_armonizacion}
            >
              <MenuItem value="">
                <em>Seleccione una opción</em>
              </MenuItem>
              {rows_armonizacion.map((tipos: any) => (
                <MenuItem key={tipos.id_armonizar} value={tipos.id_armonizar}>
                  {tipos.nombre_relacion}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Seleccione una armonización</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <TextField
            size='small'
            multiline
            fullWidth
            label="Nombre PGAR"
            value={form_values.nombre_planPGAR || ''}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            size='small'
            fullWidth
            label="Estado"
            value={form_values.estado ? 'Vigente' : 'No Vigente'}
            disabled
         />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <TextField
            multiline
            size='small'
            fullWidth
            label="Nombre PAI"
            value={form_values.nombre_planPAI}
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={12} my={4} mx={2} sx={{
          background: `url('https://api.gbif.org/v1/image/unsafe/https%3A%2F%2Fraw.githubusercontent.com%2FSIB-Colombia%2Flogos%2Fmain%2Fsocio-SiB-cormacarena.png') no-repeat center center, #FFFFFF `,
          backgroundSize: 'contain',
        }}>
          <ReactApexChart options={chart_data.options} series={chart_data.series} type="bar" height={500} />
        </Grid>
      </Grid>
    </>
  )
}