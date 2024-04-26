import { Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DataContextPgar } from "../../../SeguimientoPGAR/context/context";
import { Title } from "../../../../../components/Title";
import '../css/tableros_styles.css'
import { SemiCircleGauge } from "./SemiCircle";
import { get_tablero_por_eje } from "../services/services";
import { control_error } from "../../../../../helpers";
import React from "react";

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

  const [show_chart, set_show_chart] = useState(false);
  const {rows_armonizacion, fetch_data_armonizaciones, fetch_data_seguimiento_pgar} = useContext(DataContextPgar);
  const [array_data, set_array_data] = useState<Record<string, Record<string, Gauge[]>>>({});

  useEffect(() => {
    fetch_data_armonizaciones();
  }, []);

  const handle_change_armonizacion = (event: any) => {
    set_show_chart(false);
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
        let contador: number = 0;
        data.forEach((el: any) => {
          if(el.porcentajes.length == 0) contador++;
        });
        if(data.length ==  contador) control_error('No se encontraron datos');
        set_show_chart(true);
        load_chart_data(data);
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
        acc[`Año ${p.año}`][curr.nombre].push({ value: p.pvance_fisico, label: 'Porcentaje A. FIS' });
        acc[`Año ${p.año}`][curr.nombre].push({ value: p.pavance_fisico_acomulado, label: 'Porcentaje A. FIS AC' });
        acc[`Año ${p.año}`][curr.nombre].push({ value: p.pavance_financiero, label: 'Porcentaje A. FIN' });
        acc[`Año ${p.año}`][curr.nombre].push({ value: p.pavance_recursos_obligados, label: 'Porcentaje A. REC OBL' });
      });
      return acc;
    }, {});
    console.log(array)
    set_array_data(array);
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
          <Title title="Tablero de Control Detallado PGAR" />
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
        {show_chart && Object.entries(array_data).map(([year, ejes], index) => (
        <React.Fragment key={year} >
          <h2 className="title">Año {index + 1}</h2>
          <Grid className="anio-container" container spacing={2} mx={2}>
            {Object.entries(ejes).map(([eje, gauges]) => (
              <React.Fragment key={eje}>
                <Grid item xs={12} xl={3} sx={{display: 'flex', alignContent:'center'}}>
                  <h3 className="subtitle">{eje}</h3>
                </Grid>
                {gauges.map((gauge, gaugeIndex) => (
                  <Grid item xs={12} sm={6} lg={3} xl={2} key={gaugeIndex}>
                    <SemiCircleGauge value={gauge.value} label={gauge.label} />
                  </Grid>
                ))}
              </React.Fragment>
            ))}
          </Grid>
        </React.Fragment>
      ))}
      </Grid>
    </>
  )
}