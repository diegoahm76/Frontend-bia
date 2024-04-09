import React, { useEffect, useRef, useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import { Dayjs } from 'dayjs';
import { interface_busqueda_persona_solicita, interface_solicitud_por_id, interface_solicitudes_realizadas } from '../interfeces/types';
import TablaSolicitudesEnProceso from '../tables/TablaSolicitudesEnProceso';
import { useAppDispatch } from '../../../../hooks';
import { response_obtener_solicitudes_realizadas } from '../../autorizacion_solicitud_activos/interfaces/types';
import { control_error } from '../../../../helpers';
import { get_obtener_solicitudes_activos } from '../thunks/despacho_solicitudes';


interface props {
  set_accion: React.Dispatch<React.SetStateAction<string>>;
}


// eslint-disable-next-line @typescript-eslint/naming-convention
const SolicitudesEnProceso: React.FC<props> = ({
  set_accion,
}) => {
  const dispatch = useAppDispatch();

  const [id_solicitud_activo, set_id_solicitud_activo] = useState<number | null>(null);
  const [data_solicitudes_realizadas, set_data_solicitudes_realizadas] = useState<interface_solicitudes_realizadas[]>([]);
  const [loadding_tabla_solicitudes, set_loadding_tabla_solicitudes] = useState<boolean>(false);
  const [data_solicitud_ver_por_id, set_data_solicitud_ver_por_id] = useState<interface_solicitud_por_id>(Object);


  const [mostrar_modal_persona_solicita, set_mostrar_modal_persona_solicita] = useState<boolean>(false);

  // estado para controlar los filtros de busqueda
  const [estado, set_estado] = useState<string>('');
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs | null>(null);
  const [fecha_fin, set_fecha_fin] = useState<Dayjs | null>(null);
  const [data_persona_solicita, set_data_persona_solicita] = useState<interface_busqueda_persona_solicita>(Object);

  const get_obtener_solicitudes_activos_fc = () => {
    set_loadding_tabla_solicitudes(true);
    dispatch(get_obtener_solicitudes_activos(
      estado,
      fecha_inicio ? fecha_inicio.format('YYYY-MM-DD') : '',
      fecha_fin ? fecha_fin.format('YYYY-MM-DD') : '',
      data_persona_solicita?.id_persona ?? ''
    )).then((response: response_obtener_solicitudes_realizadas) => {
      if(Object.keys(response).length !== 0){
        set_loadding_tabla_solicitudes(false);
        set_data_solicitudes_realizadas(response.data);
      } else {
        set_loadding_tabla_solicitudes(false);
        control_error('No se encontraron solicitudes de activos');
        set_data_solicitudes_realizadas([]);
      }
    })
  }

  const solicites_obtenidas = useRef(false);
  useEffect(() => {
    if(!solicites_obtenidas.current){
      get_obtener_solicitudes_activos_fc();
      solicites_obtenidas.current = true;
    }
  }, []);

  const limpiar_filtros = () => {
    set_estado('');
    set_fecha_inicio(null);
    set_fecha_fin(null);
    set_data_persona_solicita({} as interface_busqueda_persona_solicita);
  }

  const consultar_solicitudes = () => {
    console.log('Consultar solicitudes');
  }

  return (
    <>
      <Grid item xs={12} lg={2.4}>
        <TextField
          fullWidth
          label='Persona que solicita:'
          value={data_persona_solicita?.nombre_completo ?? ''}
          disabled
          size='small'
        />
      </Grid>

      <Grid item xs={12} lg={2.4}>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={() => set_mostrar_modal_persona_solicita(true)}
        >
          Buscar Persona
        </Button>
      </Grid>

      <Grid item xs={12} lg={2.4}>
        <FormControl required size='small' fullWidth>
          <InputLabel>Estado: </InputLabel>
          <Select
            label="Estado :"
            value={estado}
            fullWidth
            onChange={(e: SelectChangeEvent) => set_estado(e.target.value)}
          >
            <MenuItem value={'R'}>Solicitado</MenuItem>
            <MenuItem value={'SA'}>Solicitud Autorizado</MenuItem>
            <MenuItem value={'DR'}>Despacho Rechazado</MenuItem>
            <MenuItem value={'DA'}>Despacho Autorizado</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={2.4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Desde:"
            value={fecha_inicio}
            onChange={(newValue) => {
              set_fecha_inicio(newValue);
            }
            }
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
              set_fecha_fin(newValue);
            }
            }
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid container spacing={2} item xs={12} sx={{
        display: "flex",
        justifyContent: "end",
      }}>
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
  );
}

// eslint-disable-next-line no-restricted-syntax
export default SolicitudesEnProceso;