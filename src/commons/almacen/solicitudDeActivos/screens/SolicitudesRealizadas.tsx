import React, { useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Tab, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import TablaSolicitudesRealizadas from '../tables/TablaSolicitudesRealizadas';
import { interface_solicitudes_realizadas } from '../interfaces/types';

interface props {
  accion: string;
  set_accion: React.Dispatch<React.SetStateAction<string>>;
  set_position_tab: React.Dispatch<React.SetStateAction<string>>;
  estado: string;
  set_id_solicitud_activo: React.Dispatch<React.SetStateAction<number | null>>;
  set_estado: React.Dispatch<React.SetStateAction<string>>;
  fecha_inicio: Dayjs | null;
  set_fecha_inicio: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  fecha_fin: Dayjs | null;
  set_fecha_fin: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  data_solicitudes_realizadas: interface_solicitudes_realizadas[];
  get_buscar_solicites_activos: () => void;
  justificacion_anulacion: string;
  set_justificacion_anulacion: React.Dispatch<React.SetStateAction<string>>;
  loadding_tabla_solicitudes_realizadas: boolean;
}


// eslint-disable-next-line @typescript-eslint/naming-convention
const SolicitudesRealizadas: React.FC<props> = ({
  accion,
  set_accion,
  set_position_tab,
  estado,
  set_id_solicitud_activo,
  set_estado,
  fecha_inicio,
  set_fecha_inicio,
  fecha_fin,
  set_fecha_fin,
  data_solicitudes_realizadas,
  get_buscar_solicites_activos,
  justificacion_anulacion,
  set_justificacion_anulacion,
  loadding_tabla_solicitudes_realizadas,
}) => {

  const cambio_fecha_inicio = (newValue: Dayjs | null) => {
    set_fecha_inicio(newValue);
  }

  const cambio_fecha_fin = (newValue: Dayjs | null) => {
    set_fecha_fin(newValue);
  }

  const consultar_solicitudes = () => {
    get_buscar_solicites_activos();
  }

  const limpiar_filtros = () => {
    set_estado('');
    set_fecha_inicio(null);
    set_fecha_fin(null);
  }

  return (
    <>
      {accion !== 'cancelar' ?
       (
        <>
          <Grid item xs={12} lg={2.4}>
            <FormControl required size='small' fullWidth>
              <InputLabel>Estado: </InputLabel>
              <Select
                label="Estado :"
                value={estado}
                fullWidth
                onChange={(e: SelectChangeEvent) => set_estado(e.target.value)}
              >
                <MenuItem value={'S'}>Solicitado</MenuItem>
                <MenuItem value={'R'}>Respondido</MenuItem>
                <MenuItem value={'SR'}>Solicitud Rechazada</MenuItem>
                <MenuItem value={'SA'}>Solicitud Autorizado</MenuItem>
                <MenuItem value={'DR'}>Despacho Rechazado</MenuItem>
                <MenuItem value={'DA'}>Despacho Autorizado</MenuItem>
                <MenuItem value={'F'}>Finalizado</MenuItem>
                <MenuItem value={'C'}>Cancelado</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={2.4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Desde:"
                value={fecha_inicio}
                onChange={(newValue) => {
                  cambio_fecha_inicio(newValue);
                }}
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={2.4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Hasta:"
                value={fecha_fin}
                onChange={(newValue) => {
                  cambio_fecha_fin(newValue);
                }}
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={2.4}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={consultar_solicitudes}
            >
              Buscar
            </Button>
          </Grid>

          <Grid item xs={12} lg={2.4}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              startIcon={<CleaningServicesIcon />}
              onClick={limpiar_filtros}
            >
              Limpiar
            </Button>
          </Grid>

          <Grid container item xs={12}>
            <TablaSolicitudesRealizadas
              set_position_tab={set_position_tab}
              set_accion={set_accion}
              set_id_solicitud_activo={set_id_solicitud_activo}
              data_solicitudes_realizadas={data_solicitudes_realizadas}
              loadding_tabla_solicitudes_realizadas={loadding_tabla_solicitudes_realizadas}
            />
          </Grid>
        </>
       )
       :
       (
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label='Justificación de cancelación:'
            value={justificacion_anulacion}
            onChange={(e) => set_justificacion_anulacion(e.target.value)}
            size='small'
          />
        </Grid>
       )
      }
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default SolicitudesRealizadas;