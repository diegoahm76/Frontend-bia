import React, { useEffect, useRef, useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import { Dayjs } from 'dayjs';
import { interface_busqueda_persona_responsable, interface_busqueda_persona_solicita, interface_solicitud_por_id, interface_solicitudes_realizadas } from '../interfeces/types';
import { useAppDispatch } from '../../../../hooks';
import { response_obtener_solicitudes_realizadas } from '../../autorizacion_solicitud_activos/interfaces/types';
import { control_error } from '../../../../helpers';
import { get_obtener_despachos_con_solicitud, get_obtener_despachos_sin_solicitud, get_obtener_tipos_estados } from '../thunks/despacho_solicitudes';
import { Title } from '../../../../components';
import ModalBusquedaPersona from '../manners/ModalBusquedaPersona';
import TablaDespachosConSolicitud from '../tables/TablaDespachosConSolicitud';
import TablaDespachosSinSolicitudes from '../tables/TablaDespachosSinSolicitudes';


interface props {
  set_accion: React.Dispatch<React.SetStateAction<string>>;
  despacho_sin_solicitud: boolean;
}


// eslint-disable-next-line @typescript-eslint/naming-convention
const SolicitudesEnProceso: React.FC<props> = ({
  set_accion,
  despacho_sin_solicitud,
}) => {
  const dispatch = useAppDispatch();

  const [id_solicitud_activo, set_id_solicitud_activo] = useState<number | null>(null);
  const [loadding_tabla_solicitudes, set_loadding_tabla_solicitudes] = useState<boolean>(false);
  const [data_solicitud_ver_por_id, set_data_solicitud_ver_por_id] = useState<interface_solicitud_por_id>(Object);
  
  const [data_despachos_con_solicitud, set_data_despachos_con_solicitud] = useState<interface_solicitudes_realizadas[]>([]);


  
  //------------------------------------------------------------------------------------//
  //FALTA IMPLEMENTAR LA DATA DE DESPACHOS SIN SOLICITUD, POR AHORA SE DEJA VACIO
  const [data_despachos_sin_solicitud, set_data_despachos_sin_solicitud] = useState<interface_solicitudes_realizadas[]>([]);
  //------------------------------------------------------------------------------------//
  


  const [mostrar_modal_buscar_persona, set_mostrar_modal_buscar_persona] = useState<boolean>(false);
  
  // estado para controlar los filtros de busqueda
  const [estado, set_estado] = useState<string>('');
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs | null>(null);
  const [fecha_fin, set_fecha_fin] = useState<Dayjs | null>(null);
  // Data de la persona que solicita - cuando se busca una persona para filtrar las solicitudes
  const [data_persona_solicita, set_data_persona_solicita] = useState<interface_busqueda_persona_solicita>(Object);
  // Data de la persona responsable - cuando se busca una persona para filtrar las solicitudes
  const [data_persona_responsable, set_data_persona_responsable] = useState<interface_busqueda_persona_responsable>(Object);
  
  // estados de las solicitudes de activos retornadas por el servidor
  const [tipos_estados_solicitud, set_tipos_estados_solicitud] = useState<any[]>([]);


  const get_obtener_solicitudes_activos_fc = () => {
    set_loadding_tabla_solicitudes(true);
    dispatch(get_obtener_despachos_con_solicitud(
      estado,
      fecha_inicio ? fecha_inicio.format('YYYY-MM-DD') : '',
      fecha_fin ? fecha_fin.format('YYYY-MM-DD') : '',
      data_persona_solicita?.id_persona ?? ''
    )).then((response: response_obtener_solicitudes_realizadas) => {
      if (Object.keys(response).length !== 0) {
        set_loadding_tabla_solicitudes(false);
        set_data_despachos_con_solicitud(response.data);
      } else {
        set_loadding_tabla_solicitudes(false);
        control_error('No se encontraron solicitudes de activos');
        set_data_despachos_con_solicitud([]);
      }
    })
  }

  const get_obtener_despachos_sin_solictud_fc = () => {
    set_loadding_tabla_solicitudes(true);
    dispatch(get_obtener_despachos_sin_solicitud(
      estado,
      fecha_inicio ? fecha_inicio.format('YYYY-MM-DD') : '',
      fecha_fin ? fecha_fin.format('YYYY-MM-DD') : '',
      data_persona_responsable.id_persona ?? ''
    )).then((response: response_obtener_solicitudes_realizadas) => {
      if (Object.keys(response).length !== 0) {
        set_loadding_tabla_solicitudes(false);
        set_data_despachos_con_solicitud(response.data);
      } else {
        set_loadding_tabla_solicitudes(false);
        control_error('No se encontraron solicitudes de activos');
        set_data_despachos_con_solicitud([]);
      }
    })
  }

  const get_obtener_tipos_estados_fc = () => {
    dispatch(get_obtener_tipos_estados())
      .then((response: any) => {
        if (Object.keys(response).length !== 0) {
          if (response.length !== 0) {
            console.log(response);

            set_tipos_estados_solicitud(response);
          } else {
            set_tipos_estados_solicitud([]);
            control_error('No se encontraron estados de solicitud');
          }
        } else {
          control_error('Error en el servidor al obtener tipos de estados de solicitud');
        }
      }
    );
  }

  const servicios_obtenidos = useRef(false);
  useEffect(() => {
    if (!servicios_obtenidos.current) {
      if(despacho_sin_solicitud){
        get_obtener_despachos_sin_solictud_fc();
        servicios_obtenidos.current = false;
      } else {
        get_obtener_solicitudes_activos_fc();
        servicios_obtenidos.current = false;
      }
      get_obtener_tipos_estados_fc();
      servicios_obtenidos.current = true;
    }
  }, [despacho_sin_solicitud]);

  const limpiar_filtros = () => {
    set_estado('');
    set_fecha_inicio(null);
    set_fecha_fin(null);
    set_data_persona_solicita({} as interface_busqueda_persona_solicita);
  }

  const consultar_solicitudes = () => {
    get_obtener_solicitudes_activos_fc();
  }

  return (
    <>
      <ModalBusquedaPersona
        mostrar_modal_buscar_persona={mostrar_modal_buscar_persona}
        set_mostrar_modal_buscar_persona={set_mostrar_modal_buscar_persona}
        set_data_persona_solicita={set_data_persona_solicita}
      />
      <Grid item xs={12} lg={2.4}>
        <TextField
          fullWidth
          label={despacho_sin_solicitud ? 'Persona responsable' : 'Persona solicita'}
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
          onClick={() => set_mostrar_modal_buscar_persona(true)}
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
            {Object.keys(tipos_estados_solicitud).length === 0 ?
              <MenuItem value={''}>Cargando...</MenuItem>
              :
              tipos_estados_solicitud.map((item: any, index: number) => {
                return (
                  <MenuItem key={index} value={item[0]}>{item[1]}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={2.4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha solicitud desde:"
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
            label="Fecha solicitud hasta:"
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
        <Grid item my={2} xs={12}>
          <Title title={despacho_sin_solicitud ? 'Despachos sin solicitudes' : 'Despachos con solicitudes'} />
        </Grid>
        {despacho_sin_solicitud ?
          <TablaDespachosSinSolicitudes
            set_accion={set_accion}
            set_id_solicitud_activo={set_id_solicitud_activo}
            data_despachos_sin_solicitud={data_despachos_sin_solicitud}
            loadding_tabla_solicitudes={loadding_tabla_solicitudes}
            get_obtener_solicitudes_activos_fc={get_obtener_solicitudes_activos_fc}
            set_data_solicitud_ver_por_id={set_data_solicitud_ver_por_id}
          />
          :
          <TablaDespachosConSolicitud
            set_accion={set_accion}
            set_id_solicitud_activo={set_id_solicitud_activo}
            data_despachos_con_solicitud={data_despachos_con_solicitud}
            loadding_tabla_solicitudes={loadding_tabla_solicitudes}
            get_obtener_solicitudes_activos_fc={get_obtener_solicitudes_activos_fc}
            set_data_solicitud_ver_por_id={set_data_solicitud_ver_por_id}
          />
        }
      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default SolicitudesEnProceso;