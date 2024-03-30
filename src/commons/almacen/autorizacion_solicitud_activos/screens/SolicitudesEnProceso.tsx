import React, { useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Tab, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import TablaSolicitudesEnProceso from '../tables/TablaSolicitudesEnProceso';
import { interface_solicitud_por_id, interface_solicitudes_realizadas } from '../interfaces/types';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Swal from 'sweetalert2';
import { useAppDispatch } from '../../../../hooks';
import { put_rechazar_solicitud_activo } from '../thunks/autorizacion_solicitud_activos';
import { control_error, control_success } from '../../../../helpers';

interface props {
  accion: string;
  set_accion: React.Dispatch<React.SetStateAction<string>>;
  estado: string;
  set_id_solicitud_activo: React.Dispatch<React.SetStateAction<number | null>>;
  id_solicitud_activo: number | null;
  set_estado: React.Dispatch<React.SetStateAction<string>>;
  fecha_inicio: Dayjs | null;
  set_fecha_inicio: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  fecha_fin: Dayjs | null;
  set_fecha_fin: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  data_solicitudes_realizadas: interface_solicitudes_realizadas[];
  get_obtener_solicitudes_activos_fc: () => void;
  set_data_solicitudes_realizadas: React.Dispatch<React.SetStateAction<interface_solicitudes_realizadas[]>>;
  loadding_tabla_solicitudes: boolean;
  set_data_solicitud_ver_por_id: React.Dispatch<React.SetStateAction<interface_solicitud_por_id>>;
}


// eslint-disable-next-line @typescript-eslint/naming-convention
const SolicitudesEnProceso: React.FC<props> = ({
  accion,
  set_accion,
  estado,
  id_solicitud_activo,
  set_id_solicitud_activo,
  set_estado,
  fecha_inicio,
  set_fecha_inicio,
  fecha_fin,
  set_fecha_fin,
  data_solicitudes_realizadas,
  get_obtener_solicitudes_activos_fc,
  loadding_tabla_solicitudes,
  set_data_solicitud_ver_por_id,
}) => {
  const dispatch = useAppDispatch();

  const [justificacion_rechazo, set_justificacion_rechazo] = useState<string>('');


  const cambio_fecha_inicio = (newValue: Dayjs | null) => {
    set_fecha_inicio(newValue);
  }

  const cambio_fecha_fin = (newValue: Dayjs | null) => {
    set_fecha_fin(newValue);
  }

  const consultar_solicitudes = () => {
    get_obtener_solicitudes_activos_fc();
  }

  const limpiar_filtros = () => {
    set_estado('');
    set_fecha_inicio(null);
    set_fecha_fin(null);
  }

  const rechazar_solicitud = () => {
    Swal.fire({
      title: '¿Esta seguro de rechazar la solicitud',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then( async(result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(put_rechazar_solicitud_activo(id_solicitud_activo, {justificacion_rechazo: justificacion_rechazo}))
          .then((response: any) => {
            if(Object.keys(response).length !== 0){
              if(response.success){
                control_success('Solicitud rechazada correctamente');
                get_obtener_solicitudes_activos_fc();
                set_justificacion_rechazo('');
                set_accion('null');
              } else {
                control_error('No se pudo rechazar la solicitud');
                get_obtener_solicitudes_activos_fc();
              }
            } else {
              control_error('Hubo un error al intentar rechazar la solicitud');
            }
        })
        return true;
      } else if(result.isDenied){
        return false;
      }
    });
  }

  return (
    <>
      {accion !== 'rechazar' &&
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
            <TablaSolicitudesEnProceso
              set_accion={set_accion}
              set_id_solicitud_activo={set_id_solicitud_activo}
              data_solicitudes_realizadas={data_solicitudes_realizadas}
              loadding_tabla_solicitudes={loadding_tabla_solicitudes}
              get_obtener_solicitudes_activos_fc={get_obtener_solicitudes_activos_fc}
              set_data_solicitud_ver_por_id={set_data_solicitud_ver_por_id}
            />
          </Grid>
        </>
      }

      {accion === 'rechazar' &&
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label='Justificación de rechazo:'
              value={justificacion_rechazo}
              onChange={(e) => set_justificacion_rechazo(e.target.value)}
              size='small'
            />
          </Grid>

          <Grid item xs={12}  sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              marginTop: "20px",
              gap: 2,
            }}
            >
            <Grid item xs={12} lg={2}>
              <Button
                fullWidth
                color="success"
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={rechazar_solicitud}
              >
                Guardar
              </Button>
            </Grid>
            <Grid item xs={12} lg={2}>
              <Button
                fullWidth
                color="error"
                variant="contained"
                startIcon={<ArrowBackIosIcon />}
                onClick={() => {
                  set_justificacion_rechazo('');
                  set_accion('null');
                }}
              >
                Atras
              </Button>
            </Grid>
          </Grid>
        </Grid>
      }
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default SolicitudesEnProceso;