import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Title } from '../../../../components';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SolicitarViaje from './SolicitarViaje';
import TableSolicitudViajes from '../tables/TableSolicitudViajes';
import { data_solicitud_viaje, interface_solicitar_viaje } from '../interfaces/types';
import { useAppDispatch } from '../../../../hooks';
import { get_obtener_estados_solicitud, listar_municipios, obtener_solicitudes, obtener_solicitudes_params } from '../thunks/viajes';
import { control_error } from '../../../../helpers';


// eslint-disable-next-line @typescript-eslint/naming-convention
const SolicitudViaje: React.FC = () => {
  const dispatch = useAppDispatch();
  const [mostrar_solicitud_viaje, set_mostrar_solicitud_viaje] = useState<boolean>(false);
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs | null>(null);
  const [msj_error_fecha_inicio, set_msj_error_fecha_inicio] = useState<string>("");
  const [fecha_fin, set_fecha_fin] = useState<Dayjs | null>(null);
  const [msj_error_fecha_fin, set_msj_error_fecha_fin] = useState<string>("");
  const [estado, set_estado] = useState<string>("");
  const [msj_error_estado, set_msj_error_estado] = useState<string>("");
  const [refrescar_tabla, set_refrescar_tabla] = useState<boolean>(false);
  const [accion, set_accion] = useState<string>('');
  const [municipios, set_municipios] = useState<any>([])

  const [tipos_estados_solicitud, set_tipos_estados_solicitud] = useState<any[]>([]);


  const [data_solicitudes_viajes, set_data_solicitudes_viajes] = useState<data_solicitud_viaje[]>([]);
  const [id_solicitud_editar, set_id_solicitud_editar] = useState<number>(0);

  /**
  * Gestiona el cambio de la fecha de inicio.
  * @param date - Objeto de tipo Dayjs que representa la nueva fecha de fin o null.
  * @returns void
  */
  const cambio_fecha_inicio = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_inicio(date);
      set_msj_error_fecha_inicio("");
    } else {
      set_msj_error_fecha_inicio("El campo Fecha inicio es obligatorio.");
    }
  };

  /**
  * Gestiona el cambio de la fecha de fin.
  * @param date - Objeto de tipo Dayjs que representa la nueva fecha de fin o null.
  * @returns void
  */
  const cambio_fecha_fin = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_fin(date);
      set_msj_error_fecha_fin("");
    } else {
      set_msj_error_fecha_fin("El campo Fecha inicio es obligatorio");
    }
  };

  /**
   * Gestiona el cambio de estado a través de un evento de selección.
   * 
   * @param event - Objeto que representa el evento de cambio de selección.
   * @returns void
   */
  const cambio_estado: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_estado(e.target.value);
    if (e.target.value === null && e.target.value === "")
      set_msj_error_estado("Selecciona un estado");
  }


  /**
   * Obtiene la lista de municipios del servidor y actualiza el estado correspondiente.
   * 
   * @returns {void}
   */
  const obtener_municipios: () => void = async () => {
    await dispatch(listar_municipios()).then((response: { success: boolean, detail: string, data: any }) => {
      set_municipios(response);
      return;
    })
  }

  const get_obtener_estados_solicitud_fc: () => void = async () => {
    dispatch(get_obtener_estados_solicitud())
      .then((response: any) => {
        if (Object.keys(response).length !== 0) {
          set_tipos_estados_solicitud(response);
        }
        return;
      })
  }

  // Efecto secundario que se ejecuta al montar el componente para obtener la lista de municipios
  const servicios_obtenidos = useRef(false);
  useEffect(() => {
    if (!servicios_obtenidos.current) {
      obtener_municipios();
      get_obtener_estados_solicitud_fc();
      servicios_obtenidos.current = true;
    }
  }, [])


  /**
  * Obtiene las solicitudes de viaje y actualiza el estado local con la información obtenida.
  * 
  * @returns void
  */
  const obtener_solicitudes_fc: () => void = () => {
    dispatch(obtener_solicitudes()).then((response: any) => {
      if (response.data.length !== 0) {
        set_data_solicitudes_viajes(
          response.data.map((solicitud: data_solicitud_viaje) => {
            const municipio_encontrado = municipios.find(
              ([codigo]: any) => codigo === solicitud.cod_municipio
            );
            const nombre_municipio = municipio_encontrado ? municipio_encontrado[1] : '';

            return {
              estado_solicitud:
                solicitud.estado_solicitud === 'ES'
                  ? 'En espera'
                  : solicitud.estado_solicitud === 'RE'
                    ? 'Respondida'
                    : solicitud.estado_solicitud === 'RC'
                      ? 'Rechazada'
                      : solicitud.estado_solicitud === 'FN' && 'Finalizada',
              fecha_solicitud: dayjs(solicitud.fecha_solicitud).format(
                'DD/MM/YYYY'
              ),
              nro_pasajeros: solicitud.nro_pasajeros,
              fecha_partida: dayjs(solicitud.fecha_partida).format('DD/MM/YYYY'),
              fecha_retorno: dayjs(solicitud.fecha_retorno).format('DD/MM/YYYY'),
              cod_municipio: nombre_municipio,
              id_solicitud: solicitud.id_solicitud_viaje,
            }
          })
        );
      }
    })
  }


  /**
   * Obtiene las solicitudes de viaje con parámetros específicos y actualiza el estado local con la información obtenida.
   * 
   * @returns void
   * @param estado - Estado de las solicitudes de viaje a obtener.
   * @param fecha_inicio - Fecha de inicio del rango temporal en formato 'YYYY-MM-DDT00:00:ss.SSSSSS'.
   * @param fecha_fin - Fecha de fin del rango temporal en formato 'YYYY-MM-DDT23:59:59.SSSSSS'.
   */
  const obtener_solicitudes_params_fc: () => void = () => {
    dispatch(obtener_solicitudes_params(
      estado,
      fecha_inicio?.format('YYYY-MM-DDT00:00:ss.SSSSSS') ?? '',
      fecha_fin?.format('YYYY-MM-DDT23:59:59.SSSSSS') ?? ''
    ))
      .then((response: any) => {
        console.log(response);
        if (response.data.length === 0) {
          control_error('No se encontraron solicitudes con filtros seleccionados');
          set_data_solicitudes_viajes([]);
        } else {
          set_data_solicitudes_viajes(
            response.data.map((solicitud: data_solicitud_viaje) => {
              const municipio_encontrado = municipios.find(
                ([codigo]: any) => codigo === solicitud.cod_municipio
              );
              const nombre_municipio = municipio_encontrado ? municipio_encontrado[1] : '';

              return ({
                estado_solicitud:
                  solicitud.estado_solicitud === 'ES'
                    ? 'En espera'
                    : solicitud.estado_solicitud === 'RE'
                      ? 'Respondida'
                      : solicitud.estado_solicitud === 'RC'
                        ? 'Rechazada'
                        : solicitud.estado_solicitud === 'FN' && 'Finalizada',
                fecha_solicitud: dayjs(solicitud.fecha_solicitud).format(
                  'DD/MM/YYYY'
                ),
                nro_pasajeros: solicitud.nro_pasajeros,
                fecha_partida: dayjs(solicitud.fecha_partida).format('DD/MM/YYYY'),
                fecha_retorno: dayjs(solicitud.fecha_retorno).format('DD/MM/YYYY'),
                cod_municipio: nombre_municipio,
                id_solicitud: solicitud.id_solicitud_viaje,
              })
            })
          );
        }
      })
  }

  /**
  * Realiza la validación del formulario y devuelve una promesa con un valor booleano.
  * 
  * @returns Promise<boolean | undefined>
  */
  const validacion_formulario: () => Promise<boolean | undefined> = async () => {
    const fecha_manana = dayjs().add(0, 'day');

    if (fecha_inicio?.isValid() === false) {
      set_msj_error_fecha_inicio('Ingrese una fecha de inicio válida');
      control_error('Ingrese una fecha de inicio válida')
      return false;
    } else if (fecha_inicio?.isAfter(fecha_manana)) {
      set_msj_error_fecha_inicio('La fecha de inicio no puede ser mayor a la de hoy');
      control_error('La fecha de inicio no pude ser mayor a la de hoy');
      return false;
    } else if (fecha_fin?.isBefore(fecha_inicio)) {
      set_msj_error_fecha_inicio('La fecha final no puede ser menor a la fecha inicio');
      control_error('La fecha final no puede ser menor a la fecha inicio');
      return false;
    }
    return true;
  }

  /**
  * Maneja la acción de envío del formulario, realizando una validación previa.
  * 
  * @param e - Objeto que representa el evento de envío del formulario.
  * @returns void
  */
  const handle_submit: (e: React.FormEvent) => void = async (e) => {
    e.preventDefault();
    const formulario_valido = await validacion_formulario();
    if (formulario_valido) {
      obtener_solicitudes_params_fc();
    }
  }

  /**
  * Efecto secundario que se ejecuta al cambiar el estado de 'refrescar_tabla'.
  */
  const solicitudes_obtenidas = useRef(false);
  useEffect(() => {
    if (!solicitudes_obtenidas.current || municipios.length !== 0) {
      obtener_solicitudes_fc();
      solicitudes_obtenidas.current = true;
    }
  }, [refrescar_tabla, municipios, servicios_obtenidos.current, solicitudes_obtenidas.current]);


  return (
    <>
      <Grid
        container
        spacing={2}
        marginTop={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '30px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Title title='Solicitudes de viajes' />
        <Grid
          container
          sx={{
            marginTop: '10px'
          }}
        >

          <Box
            component="form"
            onSubmit={handle_submit}
            sx={{ width: '100%', my: '10px' }}
          >
            <Grid container item spacing={1} rowSpacing={2} xs={12}>
              <Grid item xs={12} md={3}>
                <FormControl required size='small' fullWidth>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    fullWidth
                    label="Estado"
                    value={estado}
                    onChange={cambio_estado}
                    error={msj_error_estado !== ""}
                  >
                    {tipos_estados_solicitud?.length !== 0 ?
                      tipos_estados_solicitud?.map((estado: any) => (
                        <MenuItem key={estado[0]} value={estado[0]}>
                          {estado[1]}
                        </MenuItem>
                      ))
                      :
                      <MenuItem value=''>Cargando...</MenuItem>
                    }
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha inicio solicitud:"
                    value={fecha_inicio}
                    onChange={(newValue) => { cambio_fecha_inicio(newValue); }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        error={msj_error_fecha_inicio !== ''}
                        size="small"
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha fin solicitud:"
                    value={fecha_fin}
                    onChange={(newValue) => { cambio_fecha_fin(newValue); }}
                    renderInput={(params) => (
                      <TextField
                        error={msj_error_fecha_fin !== ''}
                        fullWidth
                        size="small"
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  startIcon={<SearchIcon />}
                  type='submit'
                >
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Grid item width={'100%'} display={'flex'} justifyContent={'center'}>
            <TableSolicitudViajes
              set_accion={set_accion}
              set_refrescar_tabla={set_refrescar_tabla}
              refrescar_tabla={refrescar_tabla}
              data_row_solicitud_viaje={data_solicitudes_viajes}
              obtener_solicitudes_fc={obtener_solicitudes_fc}
              set_mostrar_solicitud_viaje={set_mostrar_solicitud_viaje}
              set_id_solicitud_editar={set_id_solicitud_editar}
            />
          </Grid>

          <Grid item width={'100%'} display={'flex'} justifyContent={'center'}>
            {!mostrar_solicitud_viaje &&
              <Button
                color='success'
                variant='contained'
                startIcon={<AddIcon />}
                onClick={() => {
                  set_accion('crear')
                  set_mostrar_solicitud_viaje(true)
                }
                }
              >
                Crear nueva solicitud
              </Button>
            }
          </Grid>
        </Grid>
      </Grid>

      {mostrar_solicitud_viaje &&
        <SolicitarViaje
          id_solicitud_editar={id_solicitud_editar}
          accion={accion}
          set_refrescar_tabla={set_refrescar_tabla}
          refrescar_tabla={refrescar_tabla}
          set_mostrar_solicitud_viaje={set_mostrar_solicitud_viaje} />
      }
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default SolicitudViaje;