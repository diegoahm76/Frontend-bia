import { Button, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Title } from "../../../../../components/Title";
import { ApexOptions } from "apexcharts";
import { DataContextPgar } from "../../../SeguimientoPGAR/context/context";
import { get_tablero_por_objetivo_ejes } from "../services/services";
import '../css/tableros_styles.css'
import { control_error } from "../../../../../helpers";
import { get_ejes_estrategicos_id_objetivo } from "../../../SeguimientoPGAR/services/services";
import { Gradient } from "./Gradient";
import React from "react";
import { Gauge } from "../models/interfaces";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaIndicadorObjetivoyEje: React.FC = () => {

  const [form_values, set_form_values] = useState({
    id_armonizar: '',
    id_planPGAR: '',
    id_planPAI: '',
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

  const [show_loader, set_show_loader] = useState(false);
  const [show_chart, set_show_chart] = useState(false);
  const [obj_data, set_obj_data] = useState<Record<string, Gauge[]>>({});
  const {rows_armonizacion, fetch_data_armonizaciones} = useContext(DataContextPgar);

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
        id_objetivo: '',
        id_eje_estrategico: '',
        nombre_planPGAR: armonizacion_select.nombre_planPGAR,
        nombre_planPAI: armonizacion_select.nombre_planPAI,
        objetivoPGAR: armonizacion_select.objetivoPGAR,
        ejesEstrategicosPAI: armonizacion_select.ejesEstrategicosPAI,
        estado: armonizacion_select.estado,
      });
    }
  }

  const handle_change_objetivo = (event: any) => {
    set_show_chart(false);
    set_form_values({
      ...form_values,
      id_objetivo: event.target.value,
      id_eje_estrategico: '',
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

  const handle_change_eje = (event: any) => {
    set_form_values({
      ...form_values,
      id_eje_estrategico: event.target.value,
    });
  }

  useEffect(() => {
    if(form_values.id_eje_estrategico && form_values.id_planPAI) {
      set_show_chart(false);
      set_show_loader(true);
      get_tablero_por_objetivo_ejes(Number(form_values.id_planPAI), Number(form_values.id_eje_estrategico)).then((data: any) => {
        set_obj_data(handle_search(data[0]));
      }).catch((error: any) => {
        set_show_loader(false);
        control_error(error);
      });
    }
  }, [form_values.id_eje_estrategico, form_values.id_planPAI])

  const handle_search = (obj: any) => {
    let resultado: any = {};
    if(obj.porcentajes.length !== 0) {
      for (let porcentaje of obj.porcentajes) {
        let anio_key = 'Año ' + porcentaje.año;
        let valores = [
          {label: 'Porcentaje A. FIS', value: porcentaje.pvance_fisico},
          {label: 'Porcentaje A. FIS AC', value: porcentaje.pavance_fisico_acomulado},
          {label: 'Porcentaje A. FIN', value: porcentaje.pavance_financiero},
          {label: 'Porcentaje A. REC OBL', value: porcentaje.pavance_recursos_obligados}
        ];
        resultado[anio_key] = valores;
      }
      set_show_chart(true);
      set_show_loader(false);
    }else{
      set_show_loader(false);
      control_error('No se encontraron datos');
    }
    return resultado;
  }

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
          <Title title="Tablero de Control PGAR por Objetivo y Eje Estratégico" />
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
              <MenuItem value="">
                <em>Seleccione una opción</em>
              </MenuItem>
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
              <MenuItem value="">
                <em>Seleccione una opción</em>
              </MenuItem>
              {form_values.ejesEstrategicosPGAR.map((tipos: any) => (
                <MenuItem key={tipos.id_eje_estrategico} value={tipos.id_eje_estrategico}>
                  {tipos.nombre}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Seleccione un Eje Estratégico</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} my={4} mx={2} sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
        {show_loader && <div className="loader"></div>}
        {show_chart && <Grid className="anio-container" container spacing={2} mx={2}>
          {Object.entries(obj_data).map(([anio, data]) => (
              <React.Fragment key={anio}>
                <Grid item xs={12} xl={3} sx={{display: 'flex', alignContent:'center'}}>
                  <h3 className="anio-text-chart">{anio}</h3>
                </Grid>
                {data.map((gauge, gaugeIndex) => (
                  <Grid item xs={12} sm={6} lg={3} xl={2} key={gaugeIndex}>
                    <Gradient value={gauge.value} label={gauge.label} />
                  </Grid>
                ))}
                </React.Fragment>
            ))}
          </Grid>}
        </Grid>
      </Grid>
    </>
  )
}