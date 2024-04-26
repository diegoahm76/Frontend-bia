import { Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Title } from "../../../../../components/Title";
import { DataContextPgar } from "../../../SeguimientoPGAR/context/context";
import { InfoCard } from "./InfoCard";
import { StackedBarChart } from "./StackedBarChart";
import { LineChart } from "./LineChart";
import { get_tablero_por_eje } from "../services/services";
import { control_error } from "../../../../../helpers";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableroGeneralPgar: React.FC = () => {

  const [form_values, set_form_values] = useState({
    id_armonizar: '',
    id_planPGAR: '',
    id_planPAI: '',
    nombre_planPGAR: '',
    nombre_planPAI: '',
    objetivoPGAR: [],
    ejesEstrategicosPAI: [],
    estado: '',
  });

  const [data_chart, set_data_chart] = useState([]);
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
        objetivoPGAR: armonizacion_select.objetivoPGAR,
        ejesEstrategicosPAI: armonizacion_select.ejesEstrategicosPAI,
        estado: armonizacion_select.estado,
      });
    }
  }

  useEffect(() => {
    if(form_values.id_planPAI && form_values.id_planPGAR) {
      get_tablero_por_eje(Number(form_values.id_planPAI), Number(form_values.id_planPGAR)).then((data: any) => {
        set_data_chart(data);
        // set_show_chart(true);
        // load_chart_data(data);
      }).catch((error: any) => {
        control_error(error);
      });
    }
  }, [form_values.id_planPAI, form_values.id_planPGAR]);

  const idfo_data = [
    { value: '90', label: 'AVANCE FISICO', color: 'lightblue' },
    { value: '90', label: 'AVANCE FISICO', color: 'aquamarine' },
    { value: '90', label: 'AVANCE FISICO', color: 'yellow' },
    { value: '90', label: 'AVANCE FISICO', color: 'gray' },
    // ... más datos
  ];


  // Estado inicial para la serie y opciones de la gráfica
  const [chart_data, set_chart_data] = useState({
    series: [
      {
        name: 'Q1 Budget',
        group: 'budget',
        data: [44000, 55000, 41000, 67000, 22000]
      },
      {
        name: 'Q1 Actual',
        group: 'actual',
        data: [48000, 50000, 40000, 65000, 25000]
      },
      {
        name: 'Q2 Budget',
        group: 'budget',
        data: [13000, 36000, 20000, 8000, 13000]
      },
      {
        name: 'Q2 Actual',
        group: 'actual',
        data: [20000, 40000, 25000, 10000, 12000]
      }
    ],
      options: {
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
        chart: {
            height: 350,
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
            show: false
        },
        xaxis: {
          categories: ['Eje Estratégico 1', 'Eje Estratégico 2', 'Eje Estratégico 3', 'Eje Estratégico 4', 'Eje Estratégico 5', 'Eje Estratégico 6', 'Eje Estratégico 7', 'Eje Estratégico 8'],
          labels: {
            style: {
              fontSize: '12px'
            }
          }
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
          <Title title="Tablero de Control General PGAR" />
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

        <Grid item xs={12} sm={12} my={4} mx={2}>
          <Grid container spacing={6}>
            {/* Tarjetas de información */}
            {idfo_data.map((data, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <InfoCard value={data.value} label={data.label} color={data.color} />
              </Grid>
            ))}

            {/* Gráfico de barras apiladas */}
            <Grid item xs={6}>
              <StackedBarChart data={data_chart}/>
            </Grid>

            {/* Gráfico de líneas */}
            <Grid item xs={6}>
              <LineChart />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}