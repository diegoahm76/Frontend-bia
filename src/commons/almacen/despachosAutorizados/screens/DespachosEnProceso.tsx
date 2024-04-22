import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import { Dayjs } from 'dayjs';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { useDispatch } from 'react-redux';
import { control_error } from '../../../../helpers';
import { interface_busqueda_persona_solicita, interface_obtener_despachos, interface_resumen_solicitud_despacho, response_obtener_despachos } from '../interfaces/types';
import ModalBusquedaPersona from '../manners/ModalBusquedaPersona';
import { get_obtener_despachos, get_obtener_tipos_estados } from '../thunks/despachos_autorizados';
import ModalRechazarDespachoConSolicitud from '../manners/ModalRechazarDespachoConSolicitud';
import TablaDespachosSolicitudes from '../tables/TablaDespachosSolicitudes';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';






interface props {
  accion: string;
  set_accion: Dispatch<SetStateAction<string>>;
  set_position_tab: Dispatch<SetStateAction<string>>;
  set_id_solicitud_activo: Dispatch<SetStateAction<number | null>>;
  set_data_resumen_solicitud_despacho: Dispatch<SetStateAction<interface_resumen_solicitud_despacho>>
  id_solicitud_activo: number | null;
  data_anexo_opcional: any;
  set_data_anexo_opcional: Dispatch<SetStateAction<any>>;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const DespachosEnProceso: FC<props> = ({
  accion,
  set_accion,
  set_position_tab,
  set_id_solicitud_activo,
  set_data_resumen_solicitud_despacho,
  id_solicitud_activo,
  data_anexo_opcional,
  set_data_anexo_opcional
}) => {
  const dispatch = useDispatch();

  // estado boolean para mostrar el modal de buscar persona
  const [mostrar_modal_buscar_persona, set_mostrar_modal_buscar_persona] = useState<boolean>(false);
  // estado boolean para mostar el modal de jsutificacion de anulacion
  const [mostar_modal_rechazar_solicitud, set_mostar_modal_rechazar_solicitud] = useState<boolean>(false);
  // loadding de la tabla de solicitudes
  const [loadding_tabla_solicitudes, set_loadding_tabla_solicitudes] = useState<boolean>(false);

  // ----- Estados pagina 1 - Despachos con solicitudes ----- //
  // estado del input de estado
  const [estado, set_estado] = useState<string>('');
  // tipos de estado del choice de estado
  const [tipos_estados_solicitud, set_tipos_estados_solicitud] = useState<any[]>([]);
  // estado de la fecha de inicio
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs | null>(null);
  // estado de la fecha de fin
  const [fecha_fin, set_fecha_fin] = useState<Dayjs | null>(null);
  // Data de la persona responsable - cuando se busca una persona para filtrar las solicitudes
  const [data_persona_solicita, set_data_persona_solicita] = useState<interface_busqueda_persona_solicita>(Object);

  // Data despachos obtenidos
  const [data_despachos_solicitudes, set_data_despachos_solicitudes] = useState<interface_obtener_despachos[]>([]);



  /**
 * Se obtienen los despachos sin solicitud
 */
  const get_obtener_despachos_fc = () => {
    set_loadding_tabla_solicitudes(true);
    dispatch(get_obtener_despachos(
      estado,
      fecha_inicio ? fecha_inicio.format('YYYY-MM-DD') : '',
      fecha_fin ? fecha_fin.format('YYYY-MM-DD') : '',
      data_persona_solicita.id_persona ?? ''
    )).then((response: response_obtener_despachos) => {
      if (Object.keys(response).length !== 0) {
        set_loadding_tabla_solicitudes(false);
        set_data_despachos_solicitudes(response.data);
      } else {
        set_loadding_tabla_solicitudes(false);
        control_error('No se encontraron solicitudes de activos');
        set_data_despachos_solicitudes([]);
      }
    })
  }


  const get_obtener_tipos_estados_fc = () => {
    dispatch(get_obtener_tipos_estados())
      .then((response: any) => {
        if (Object.keys(response).length !== 0) {
          if (response.length !== 0) {
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
      get_obtener_tipos_estados_fc();
      get_obtener_despachos_fc();
      servicios_obtenidos.current = true;
    }
  }, []);

  const handle_file_upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selected_file = files[0];

      set_data_anexo_opcional(selected_file);
    } else {
      set_data_anexo_opcional({} as any);
    }
  };


  /**
 * Limpiar los filtros de busqueda
 */
  const limpiar_filtros = () => {
    set_estado('');
    set_fecha_inicio(null);
    set_fecha_fin(null);
  }

  /**
   * Consultar las solicitudes de activos
   */
  const consultar_solicitudes = () => {
    get_obtener_despachos_fc();
  }

  useEffect(() => {
    if (accion === 'rechazar') {
      set_mostar_modal_rechazar_solicitud(true);
      set_accion('null');
    }
    console.log(estado)
  }, [accion, estado])


  return (
    <>
      <ModalBusquedaPersona
        mostrar_modal_buscar_persona={mostrar_modal_buscar_persona}
        set_mostrar_modal_buscar_persona={set_mostrar_modal_buscar_persona}
        set_data_persona_solicita={set_data_persona_solicita}
      />

      <ModalRechazarDespachoConSolicitud
        set_mostar_modal_rechazar_solicitud={set_mostar_modal_rechazar_solicitud}
        mostar_modal_rechazar_solicitud={mostar_modal_rechazar_solicitud}
        get_obtener_despachos_fc={get_obtener_despachos_fc}
        id_solicitud_activo={id_solicitud_activo}
      />

      <Grid item xs={12} lg={2.4}>
        <TextField
          fullWidth
          label='Persona responsable: '
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
            {
              Object.keys(tipos_estados_solicitud).length === 0 ?
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
          <Title title={'Solicitudes en proceso'} />
        </Grid>
        <TablaDespachosSolicitudes
          set_accion={set_accion}
          set_position_tab={set_position_tab}
          data_despachos_solicitudes={data_despachos_solicitudes}
          loadding_tabla_solicitudes={loadding_tabla_solicitudes}
          set_id_solicitud_activo={set_id_solicitud_activo}
          set_data_resumen_solicitud_despacho={set_data_resumen_solicitud_despacho}
          get_obtener_despachos_fc={get_obtener_despachos_fc}
          set_data_anexo_opcional={set_data_anexo_opcional}
        />
      </Grid>

      {accion === 'editar' &&
        <Grid item xs={12} sx={{
          display: "flex",
          justifyContent: "center",
        }}>
          <Grid item xs={12} lg={3}>
            <Button
              fullWidth
              component="label"
              role={undefined}
              variant={('name' in data_anexo_opcional) ? 'contained' : 'outlined'}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              {!('name' in data_anexo_opcional) ? 'Archivo de soporte' : 'Actualizar anexo soporte'}
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handle_file_upload}
                accept=".pdf, .doc, .docx" // Puedes ajustar las extensiones permitidas según tus necesidades
              />
            </Button>
          </Grid>
        </Grid>
      }
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default DespachosEnProceso;