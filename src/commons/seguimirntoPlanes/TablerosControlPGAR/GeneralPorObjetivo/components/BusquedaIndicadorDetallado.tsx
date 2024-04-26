import { Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DataContextPgar } from "../../../SeguimientoPGAR/context/context";
import { Title } from "../../../../../components/Title";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";
import { SemiCircleGauge } from "./SemiCircle";
import { get_tablero_por_eje } from "../services/services";
import { control_error } from "../../../../../helpers";

interface Porcentaje {
  año: number;
  pvance_fisico: number;
  pavance_fisico_acomulado: number;
  pavance_financiero: number;
  pavance_recursos_obligados: number;
}

interface Eje {
  id_eje_estrategico: number;
  porcentajes: Porcentaje[];
  nombre: string;
  id_tipo_eje: number;
  id_plan: number | null;
  id_objetivo: number;
}

interface Gauge {
  value: number;
  label: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaIndicadorDetallado: React.FC = () => {

  const [form_values, set_form_values] = useState({
    id_armonizar: '',
    id_planPGAR: '',
    id_planPAI: '',
    nombre_planPGAR: '',
    nombre_planPAI: '',
    estado: '',
  });

  const {rows_armonizacion, fetch_data_armonizaciones, fetch_data_seguimiento_pgar} = useContext(DataContextPgar);
  const [array_data, set_array_data] = useState<Record<string, Record<string, Gauge[]>>>({});

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
        load_chart_data(data);
        console.log(data);
      }).catch((error: any) => {
        control_error(error);
      });
    }
  }, [form_values.id_planPAI, form_values.id_planPGAR]);


  const load_chart_data = (data: Eje[]) => {
    const array = data.reduce((acc: Record<string, Record<string, Gauge[]>>, curr: Eje) => {
      curr.porcentajes.forEach((p: Porcentaje) => {
        if (!acc[`Año ${p.año}`]) {
          acc[`Año ${p.año}`] = {};
        }
        if (!acc[`Año ${p.año}`][curr.nombre]) {
          acc[`Año ${p.año}`][curr.nombre] = [];
        }
        acc[`Año ${p.año}`][curr.nombre].push({ value: p.pvance_fisico, label: 'Porcentaje AFis' });
        acc[`Año ${p.año}`][curr.nombre].push({ value: p.pavance_fisico_acomulado, label: 'Porcentaje AFisA' });
        acc[`Año ${p.año}`][curr.nombre].push({ value: p.pavance_financiero, label: 'Porcentaje AFIN' });
        acc[`Año ${p.año}`][curr.nombre].push({ value: p.pavance_recursos_obligados, label: 'Porcentaje ARO' });
      });
      return acc;
    }, {});

    set_array_data(array);
  };
  // data.sort((a: any, b: any) => a.anio.localeCompare(b.anio));

  const gauges_data = [
    { value: 76, label: 'Avance Físico' },
    { value: 50, label: 'Avance Financiero' },
    { value: 50, label: 'Avance Financiero' },
    { value: 50, label: 'Avance Financiero' },
    { value: 50, label: 'Avance Financiero' },
    // ... more gauges
  ];


  // Estado inicial para la serie y opciones de la gráfica
  const [chart_data, set_chart_data] = useState<{
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    options: ApexOptions;
  }>({
      series: [{
          name: '0 A 180',
          data: [21, 22, 10,25],
      },
      {
          name: '181 A 360',
          data: [10, 20, 30, 17],
      },
      {
          name: 'MAS DE 360',
          data: [10, 20, 30, 23],
      },
      {
          name: 'MAS DE 360',
          data: [10, 20, 30, 43],
      }],
      options: {
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
        chart: {
          height: 350,
          type: 'radialBar',
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: '97%',
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: '#999',
                opacity: 1,
                blur: 2
              }
            },
          },
        }
        // xaxis: {
        //     categories: [
        //         ['0 a', '30 dias'],
        //         ['181 a', '360 dias'],
        //         ['mas de ', '360 dias'],
        //         ['mas de ', '360 dias']

        //         // ['Peter', 'Brown'],
        //         // ['Mary', 'Evans'],
        //         // ['David', 'Wilson'],
        //         // ['Lily', 'Roberts'],
        //     ],
        //     labels: {
        //         style: {
        //             fontSize: '12px'
        //         }
        //     }
        // }
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

        {/* {array_data.length > 0 && <Grid item xs={12} my={4} mx={2} sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {array_data.map((gauge, index) => (
            <Grid item xs={3} key={index}>
              <SemiCircleGauge value={gauge.value} label={gauge.label} />
          </Grid>
          ))}
        </Grid>
        } */}
        {/* {Object.entries(array_data).map(([year, ejes]) => (
          <Grid item xs={12} my={4} mx={2} key={year} sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
          }}>
            <h2 style={{display: 'flex'}}>{year}</h2>
            <section style={{display: 'flex'}}>
              {Object.entries(ejes).map(([eje, gauges]) => (
                <Grid item xs={3} key={eje}>
                  <h3>{eje}</h3>
                  {gauges.map((gauge: Gauge, index: number) => (
                    <SemiCircleGauge value={gauge.value} label={gauge.label} key={index} />
                  ))}
                </Grid>
              ))}
            </section>
          </Grid>
        ))} */}
        {Object.entries(array_data).map(([year, ejes], index) => (
        <>
          <h2 style={{margin: '3rem auto'}}>Año {index + 1}</h2>
          <Grid container spacing={2} mx={2} sx={{border: '1px solid #33B8FF', borderRadius: '1rem', padding: 'inherit'}}>
            {Object.entries(ejes).map(([eje, gauges]) => (
              <>
                <Grid item xs={3} sx={{display: 'flex', alignContent:'center'}}>
                  <h3 style={{margin: 'auto'}}>{eje}</h3>
                </Grid>
                {gauges.map((gauge, gaugeIndex) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={gaugeIndex}>
                    <SemiCircleGauge value={gauge.value} label={gauge.label} />
                  </Grid>
                ))}
              </>
            ))}
          </Grid>
        </>
      ))}
      </Grid>
    </>
  )
}