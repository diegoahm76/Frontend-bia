import { Button, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Title } from "../../../../../components/Title";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";
import SearchIcon from '@mui/icons-material/Search';
import { DataContextPgar } from "../../../SeguimientoPGAR/context/context";
import { get_tablero_por_objetivo } from "../services/services";
import { control_error } from "../../../../../helpers";
import { get_ejes_estrategicos_id_objetivo } from "../../../SeguimientoPGAR/services/services";
import { Gradient } from "./Gradient";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaIndicadorObjetivoyEje: React.FC = () => {

  const [form_values, set_form_values] = useState({
    id_armonizar: '',
    nombre_planPGAR: '',
    nombre_planPAI: '',
    objetivoPGAR: [],
    ejesEstrategicosPAI: [],
    ejesEstrategicosPGAR: [],
    estado: '',
    id_objetivo: '',
    id_eje_estrategico: '',
    anio: 0,
  });

  const gauges_data = [
    { value: 76, label: 'Avance Físico' },
    { value: 50, label: 'Avance Financiero' },
    { value: 50, label: 'Avance Financiero' },
    { value: 50, label: 'Avance Financiero' },
    { value: 50, label: 'Avance Financiero' },
    // ... more gauges
  ];

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

  const handle_change_objetivo = (event: any) => {
    set_form_values({
      ...form_values,
      id_objetivo: event.target.value,
    });
  }

  const handle_change_eje = (event: any) => {
    set_form_values({
      ...form_values,
      id_eje_estrategico: event.target.value,
    });
  }

  useEffect(() => {
    if(form_values.id_objetivo) {
      get_ejes_estrategicos_id_objetivo(Number(form_values.id_objetivo)).then((response) => {
        set_form_values({
          ...form_values,
          ejesEstrategicosPGAR: response,
        });
      }).catch((error) => {
        control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
      });
    }
  }, [form_values.id_objetivo]);

  const handle_click_open = () => {
    get_tablero_por_objetivo(Number(form_values.id_objetivo), form_values.anio).then((data) => {
      console.log(data);
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
          categories.push(ind.nombre);
          Object.keys(ind.porcentajes).forEach(key => {
            porcentajes_obj[key].push(ind.porcentajes[key]);
          });
        });

        let series = Object.keys(porcentajes_obj).map(key => {
          return {
            name: nombres[key],
            data: porcentajes_obj[key]
          };
        });
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
            labels: {
              style: {
                fontSize: '13px',
                cssClass: 'apexcharts-xaxis-label',
              },
              maxHeight: 120,
            }
        },
      },
  });

  const get_chart_data_by_obj = (objective: any) => {
    const categories = ['Eje Estratégico 1', 'Eje Estratégico 2', 'Eje Estratégico 3', 'Eje Estratégico 4'];
    const series = [
      {
        name: 'Porcentaje de Avance Físico',
        data: [30, 40, 50, 60],
      },
      {
        name: 'Porcentaje de Avance Físico Acumulado',
        data: [20, 10, 80, 90],
      },
      {
        name: 'Porcentje de Avance Financiero',
        data: [10, 20, 70, 55],
      },
      {
        name: 'Porcentaje de Avance de los Recursos Obligados',
        data: [40, 30, 24, 97],
      },
    ];
    return { categories, series };
  };

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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <FormControl required size='small' fullWidth>
            <InputLabel>Nombre Eje Estratégico</InputLabel>
            <Select
              multiline
              value={form_values.id_eje_estrategico || ''}
              label="Nombre Eje Estratégico"
              onChange={handle_change_eje}
              disabled={!form_values.ejesEstrategicosPGAR.length}
            >
              {form_values.ejesEstrategicosPGAR.map((tipos: any) => (
                <MenuItem key={tipos.id_eje_estrategico} value={tipos.id_eje_estrategico}>
                  {tipos.nombre}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Seleccione un Eje Estratégico</FormHelperText>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={2}>
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
          </Grid> */}
        <Grid item xs={12} my={4} mx={2} sx={{
          background: `url('https://api.gbif.org/v1/image/unsafe/https%3A%2F%2Fraw.githubusercontent.com%2FSIB-Colombia%2Flogos%2Fmain%2Fsocio-SiB-cormacarena.png') no-repeat center center, #FFFFFF `,
          backgroundSize: 'contain',
          display: 'flex',
          flexWrap: 'wrap',
          // justifyContent: 'center',
          // gap: '5rem'
        }}>
          {gauges_data.map((gauge, index) => (
            <Grid item xs={3} key={index}>
              <Gradient value={gauge.value} label={gauge.label} />
          </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  )
}