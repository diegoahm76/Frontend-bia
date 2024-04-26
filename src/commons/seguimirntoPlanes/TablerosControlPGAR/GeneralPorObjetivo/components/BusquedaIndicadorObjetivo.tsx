import { Button, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Title } from "../../../../../components/Title";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";
import SearchIcon from '@mui/icons-material/Search';
import { DataContextPgar } from "../../../SeguimientoPGAR/context/context";
import { get_tablero_por_objetivo } from "../services/services";
import { control_error } from "../../../../../helpers";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaIndicadorObjetivo: React.FC = () => {

  const [form_values, set_form_values] = useState({
    id_armonizar: '',
    nombre_planPGAR: '',
    nombre_planPAI: '',
    objetivoPGAR: [],
    ejesEstrategicosPAI: [],
    estado: '',
    id_objetivo: '',
    anio: 0,
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
        nombre_planPGAR: armonizacion_select.nombre_planPGAR,
        nombre_planPAI: armonizacion_select.nombre_planPAI,
        objetivoPGAR: armonizacion_select.objetivoPGAR,
        ejesEstrategicosPAI: armonizacion_select.ejesEstrategicosPAI,
        estado: armonizacion_select.estado,
      });
    }
  }

  const handle_change_anio = (event: any) => {
    set_form_values({
      ...form_values,
      anio: event.target.value,
    });
  }

  const handle_change_objetivo = (event: any) => {
    set_form_values({
      ...form_values,
      id_objetivo: event.target.value,
    });
  }

  const handle_click_open = () => {
    get_tablero_por_objetivo(Number(form_values.id_objetivo), form_values.anio).then((data) => {
      let series: any = [];
      let porcentajes_obj: any = {
        "pvance_fisico": [],
        "pavance_fisico_acomulado": [],
        "pavance_financiero": [],
        "pavance_recursos_obligados": []
      };

      let nombres: any = {
        "pvance_fisico": "Porcentaje AFIS",
        "pavance_fisico_acomulado": "Porcentaje AFISA",
        "pavance_financiero": "Porcentaje AFIN",
        "pavance_recursos_obligados": "Porcentaje ARO"
      };
      let categories: any = [];
      if (data.length) {
        data.forEach((ind: any) => {
          const words = ind.nombre.split(' ');
          const grouped_words = [];

          for (let i = 0; i < words.length; i += 2) {
            grouped_words.push(words.slice(i, i + 2).join(' '));
          }

          categories.push(grouped_words);
          Object.keys(ind.porcentajes).forEach(key => {
            porcentajes_obj[key].push(ind.porcentajes[key]);
          });
        });

        series = Object.keys(porcentajes_obj).map(key => {
          return {
            name: nombres[key],
            data: porcentajes_obj[key]
          };
        });
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
    }).catch((error) => {
      control_error(error.response.data.detail);
    });
  }

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
          type: 'bar' as const,
          events: {
            click: function (chart: any, w: any, e: any) {
            }
          },
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        plotOptions: {
            bar: {
                barHeight: '75%',
                horizontal: true,
            }
        },
        dataLabels: {
          enabled: true
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '14px',
          itemMargin: {
            horizontal: 20,
            vertical: 10
          },
          show: true
        },
        xaxis: {
          categories: [],
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
          <Title title="Tablero de Control General PGAR por Objetivo" />
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
        <Grid item xs={12} md={7}>
          <FormControl required size='small' fullWidth>
            <InputLabel>Nombre Objetivo</InputLabel>
            <Select
              multiline
              value={form_values.id_objetivo || ''}
              label="Nombre Objetivo"
              onChange={handle_change_objetivo}
              disabled={!form_values.objetivoPGAR.length}
            >
              {form_values.objetivoPGAR.map((tipos: any) => (
                <MenuItem key={tipos.id_objetivo} value={tipos.id_objetivo}>
                  {tipos.nombre_objetivo}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Seleccione un objetivo</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
              size='small'
              multiline
              fullWidth
              label="Año"
              value={form_values.anio || ''}
              onChange={handle_change_anio}
            />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
            <Button
              variant="contained"
              color="primary"
              disabled={!form_values.id_objetivo || !form_values.anio}
              startIcon={<SearchIcon />}
              onClick={() => {
                handle_click_open();
              }}
            >
              Buscar
            </Button>
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