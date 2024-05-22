import { Button, FormLabel, Grid, OutlinedInput, Radio, TextField } from "@mui/material";
import { Title } from "../../../../components";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ElementosInspeccionar from "../components/ElementosInspeccionar";
import { cambio_input_radio } from "../thunks/cambio_input_radio";
import { useAppDispatch } from "../../../../hooks";
import { get_obtener_viajes_asociados, obtener_nombres_conductor, obtener_vehiculo_logueado } from "../thunks/inspeccion_vehiculos";
import { control_error } from "../../../../helpers";
import { create_inspeccion_vehiculo, data_busqueda_vehiculos, inputs_persona_seleccionada, interface_busqueda_persona_solicita, interface_resumen_solicitud, interface_viajes_asociados, response_conductor_logueado, response_vehiculo_logueado, response_viajes_asociados } from "../interfaces/types";
import TableViajesAsociados from "../tables/TableViajesAsociados";
import PersonasViajan from "../components/PersonasViajan";


// eslint-disable-next-line @typescript-eslint/naming-convention
const InspeccionVehiculos = () => {
  const dispatch = useAppDispatch();
  const [fecha_inspeccion, set_fecha_inspeccion] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_inspeccion, set_msj_error_fecha_inspeccion] = useState<string>("");
  const [vehiculo_agendable, set_vehiculo_agendable] = useState<string>('true');
  const [kilometraje, set_kilometraje] = useState<number>(0);
  const [mensaje_error_kilometraje, set_mensaje_error_kilometraje] = useState<string>("");
  const [nombres_conductor, set_nombres_conductor] = useState<string>('');
  const [documento_conductor, set_documento_conductor] = useState<string>('');
  const [celular_conductor, set_celular_conductor] = useState<string>('');
  const [correo_conductor, set_correo_conductor] = useState<string>('');
  const [fecha_nacimiento_conductor, set_fecha_nacimiento_conductor] = useState<Dayjs>(dayjs());
  const [id_conductor_logueado, set_id_conductor_logueado] = useState<number>(0);
  const [id_hoja_vida_vehiculo, set_id_hoja_vida_vehiculo] = useState<number>(0);
  const [refrescar_input_vehiculo_buscado, set_refrescar_input_vehiculo_buscado] = useState<boolean>(false);

  const [capacidad_extintor, set_capacidad_extintor] = useState<number>(0);
  const [fecha_vencimiento_extintor, set_fecha_vencimiento_extintor] = useState<Dayjs | null>(null);
  const [fecha_vencimiento_licencia, set_fecha_vencimiento_licencia] = useState<Dayjs | null>(null);
  const [fecha_vencimiento_soat, set_fecha_vencimiento_soat] = useState<Dayjs | null>(null);
  const [fecha_revision_tecnomecanica, set_fecha_revision_tecnomecanica] = useState<Dayjs | null>(null);

  const [vehiculo_arrendado_encontrado, set_vehiculo_arrendado_encontrado] = useState<data_busqueda_vehiculos>(Object);

  const [vehiculo_seleccionado, set_vehiculo_seleccionado] = useState<string>('');

  const [mostrar_busqueda_vehiculo, set_mostrar_busqueda_vehiculo] = useState<boolean>(false);

  const [data_inspeccion_vehiculo, set_data_inspeccion_vehiculo] = useState<create_inspeccion_vehiculo>(Object);

  // id del vehiculo conductor para hacer la peticion para traer la data a la tabla de viajes asociados
  const [id_vehiculo_conductor, set_id_vehiculo_conductor] = useState<number | null>(null);
  // Estado para saber si se esta haciendo la inspeccion de un vehiculo seleccionado en la tabla de viajes asociados
  const [inspeccionando_vehiculo, set_inspeccionando_vehiculo] = useState<boolean>(false);

  // id_solicitud_viaje para poder crear una inspeccion de viaje
  const [id_solicitud_viaje, set_id_solicitud_viaje] = useState<number | null>(null);

  // INputs de la busqueda de personas
  const [inputs_persona_seleccionada, set_inputs_persona_seleccionada] = useState<inputs_persona_seleccionada>(Object);
  // DAta de las personas seleccionadas para viajar
  const [data_personas_viajan, set_data_personas_viajan] = useState<interface_busqueda_persona_solicita[]>([]);

  const [data_viajes_asociados, set_data_viajes_asociados] = useState<interface_viajes_asociados[]>([]);

  /**
   * Función para obtener el vehículo logueado.
   */
  const obtener_vehiculo_logueado_fc: () => void = () => {
    dispatch(obtener_vehiculo_logueado())
      .then((response: response_vehiculo_logueado) => {
        if (!response?.success) {
          control_error('No se encontró el vehículo asignado del conductor');
          set_vehiculo_seleccionado('');
        } else {
          if (response?.data && response?.data[0] && response?.data[0][0]) {
            set_vehiculo_seleccionado(response.data[0][0]?.placa + ' - ' + response.data[0][0]?.marca);
            set_id_hoja_vida_vehiculo(response.data[0][0]?.id_hoja_vida_vehiculo);
            // enviamos el id_vehiculo_conductor para poder hacer una peticion con ese id y traer data para mostrar en una tabla
            set_id_vehiculo_conductor(response.data[0][0]?.id_vehiculo_conductor);
          } else {
            set_vehiculo_seleccionado('');
            set_id_hoja_vida_vehiculo(0);
          }
        }
      })
  }

  /**
 * Función para obtener el vehículo logueado.
 */
  const get_obtener_viajes_asociados_fc: () => void = () => {
    dispatch(get_obtener_viajes_asociados(id_vehiculo_conductor))
      .then((response: response_viajes_asociados) => {
        if (Object.keys(response).length !== 0) {
          if (Object.keys(response.data).length !== 0) {
            set_data_viajes_asociados(response.data);
          } else {
            control_error('No se encontraron viajes asociados al vehículo - conductor.');
            set_data_viajes_asociados([]);
          }
        } else {
          control_error('Error interno al obtener los viajes asociados al vehículo - conductor.');
          set_data_viajes_asociados([]);
        }
      }
      )
  }

  /**
   * Función para obtener los nombres del conductor.
   */
  const obtener_nombres_conductor_fc: () => void = () => {
    dispatch(obtener_nombres_conductor())
      .then((response: response_conductor_logueado) => {
        if (!response.success) {
          control_error('No se encontraron los nombres del conductor');
          set_nombres_conductor('');
        } else {
          set_nombres_conductor(response.data.nombre_completo);
          set_documento_conductor(response.data.numero_documento);
          set_celular_conductor(response.data.telefono_celular);
          set_correo_conductor(response.data.email);
          set_fecha_nacimiento_conductor(dayjs(response.data.fecha_nacimiento));
          set_id_conductor_logueado(response.data.id_persona_logueada);
        }
      })
  }

  useEffect(() => {
    if (Object.keys(vehiculo_arrendado_encontrado).length !== 0) {
      set_vehiculo_seleccionado(vehiculo_arrendado_encontrado.placa + ' - ' + vehiculo_arrendado_encontrado.nombre_marca);
      set_id_hoja_vida_vehiculo(vehiculo_arrendado_encontrado.id_hoja_de_vida);
    }
  }, [vehiculo_arrendado_encontrado, refrescar_input_vehiculo_buscado]);

  // obtener nombres del conductor y vehiculo logueado
  const servicios_obtenidos = useRef(false);
  useEffect(() => {
    if (!servicios_obtenidos.current) {
      obtener_vehiculo_logueado_fc();
      obtener_nombres_conductor_fc();
      servicios_obtenidos.current = true;
    }
  }, [servicios_obtenidos])

  // obtener viajes asociados al vehiculo
  const solicitudes_obtenidas = useRef(false);
  useEffect(() => {
    if (!solicitudes_obtenidas.current && id_vehiculo_conductor !== null) {
      get_obtener_viajes_asociados_fc();
      solicitudes_obtenidas.current = true;
    }
  }, [solicitudes_obtenidas, id_vehiculo_conductor])



  /**
   * Función para cambiar la fecha de inspección.
   * 
   * @param {Dayjs | null} date - La fecha de inspección seleccionada.
   * @returns {void}
   */
  const cambio_fecha_inspeccion = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_inspeccion(date);
      set_msj_error_fecha_inspeccion("");
    } else {
      set_msj_error_fecha_inspeccion("El campo Fecha inicio es obligatorio.");
    }
  };

  const cambio_fecha_vencimiento_soat = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_vencimiento_soat(date);
    }
  };

  /**
   * Función para cambiar la fecha de nacimiento del conductor.
   * 
   * @param {Dayjs | null} date - La fecha de nacimiento seleccionada.
   * @returns {void}
   */
  const cambio_fecha_nacimiento_conductor = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_nacimiento_conductor(date);
    }
  }

  /**
   * Función que se ejecuta cuando se produce un cambio en el campo de kilómetraje.
   * Actualiza el estado de kilómetraje y verifica si se debe mostrar un mensaje de error.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - El evento de cambio del campo de entrada.
   * @returns {void}
   */
  const cambio_kilometraje = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_kilometraje(Number(e.target.value));
    if (e.target.value !== null && e.target.value !== "")
      set_mensaje_error_kilometraje("");
  };


  // cambio fecha vencimiento tecnomecanica
  const cambio_fecha_vencimiento_tecnomecanica = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_revision_tecnomecanica(date);
    }
  };

  // cambio fecha vencimiento extintor
  const cambio_fecha_vencimiento_extintor = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_vencimiento_extintor(date);
    }
  };

  //cambio vencimiento licencia
  const cambio_fecha_vencimiento_licencia = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_vencimiento_licencia(date);
    }
  };

  /**
   * Restablece el vehículo logueado.
   */
  const restablecer_vehiculo_logueado = () => {
    set_vehiculo_arrendado_encontrado({} as data_busqueda_vehiculos);
    obtener_vehiculo_logueado_fc();
  }

  useEffect(() => {
    set_data_inspeccion_vehiculo((prev) => ({
      ...prev,
      id_hoja_vida_vehiculo: id_hoja_vida_vehiculo,
      kilometraje: kilometraje,
      es_agendable: vehiculo_agendable === 'true' ? true : false,
    }))
  }, [kilometraje, id_hoja_vida_vehiculo, vehiculo_seleccionado]);


  return (
    <>
      <Grid container item spacing={1} rowSpacing={4} xs={12} sx={{
        display: 'flex',
        borderRadius: '15px',
        mx: '10px auto',
        my: '20px',
        backgroundColor: '#FAFAFA',
        boxShadow: '0px 3px 6px #042F4A26',
        p: '40px',
      }}>
        <Title title="Datos básicos del conductor" />

        <Grid item xs={12} lg={4}>
          <TextField
            fullWidth
            label='Nombres del conductor:'
            value={nombres_conductor}
            id="nombres_conductor"
            required
            disabled
            size="small"
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <TextField
            fullWidth
            label='Numero de documento:'
            value={documento_conductor}
            id="nombres_conductor"
            required
            disabled
            size="small"
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <TextField
            fullWidth
            label='Número de celular:'
            value={celular_conductor}
            id="nombres_conductor"
            required
            disabled
            size="small"
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <TextField
            fullWidth
            label='Correo electrónico:'
            value={correo_conductor}
            id="nombres_conductor"
            required
            disabled
            size="small"
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disabled
              label='Fecha Nacimiento:'
              value={fecha_nacimiento_conductor}
              onChange={(newValue) => {
                cambio_fecha_nacimiento_conductor(newValue);
              }}
              renderInput={(params) => (
                <TextField required fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} lg={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disabled
              label='Fecha de inspeccion:'
              value={fecha_inspeccion}
              onChange={(newValue) => {
                cambio_fecha_inspeccion(newValue);
              }}
              renderInput={(params) => (
                <TextField required fullWidth size="small" {...params} />
              )}
              minDate={dayjs()}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>


      <Grid container item xs={12} spacing={1} rowSpacing={4} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        borderRadius: '15px',
        mx: '10px auto',
        my: '20px',
        px: '40px',
        py: '30px',
        backgroundColor: '#FAFAFA',
        boxShadow: '0px 3px 6px #042F4A26',
      }}>
        <Title title="Seleccionar vehículo" />

        <Grid item container xs={12} rowSpacing={1} columnSpacing={4}>
          <Grid item container xs={12} lg={8}>
            <TextField
              fullWidth
              label='Nombre del vehículo asignado:'
              required
              disabled
              value={vehiculo_seleccionado}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_vehiculo_seleccionado(e.target.value)}
              size="small"
            />
          </Grid>

          <Grid item container xs={12} lg={4}>
            <Button
              fullWidth
              color='primary'
              variant='contained'
              startIcon={<RestartAltIcon />}
              onClick={restablecer_vehiculo_logueado}
            >
              Seleccionar vehículo asignado
            </Button>
          </Grid>
        </Grid>
      </Grid>


      {!inspeccionando_vehiculo ?
        <Grid container item xs={12} spacing={2} sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          borderRadius: '15px',
          mx: '10px auto',
          my: '20px',
          px: '40px',
          py: '30px',
          backgroundColor: '#FAFAFA',
          boxShadow: '0px 3px 6px #042F4A26',
        }}>
          <Title title="Viajes asignados" />

          <TableViajesAsociados
            data_viajes_asociados={data_viajes_asociados}
            set_inspeccionando_vehiculo={set_inspeccionando_vehiculo}
            set_data_personas_viajan={set_data_personas_viajan}
            set_id_solicitud_viaje={set_id_solicitud_viaje}
          />
        </Grid>

        :

        <Grid item container columnSpacing={2} rowSpacing={3} xs={12} sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '15px',
          mx: '10px auto',
          my: '20px',
          px: '40px',
          py: '30px',
          backgroundColor: '#FAFAFA',
          boxShadow: '0px 3px 6px #042F4A26',
        }}>

          <Title title="Realizar inspección" />

          <Grid item xs={12} lg={4}>
            <TextField
              fullWidth
              label='Kilometraje*:'
              type={"number"}
              value={kilometraje === 0 ? '' : kilometraje}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={cambio_kilometraje}
            />
          </Grid>

          <Grid item xs={12} lg={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Fecha de vencimiento SOAT:'
                value={fecha_vencimiento_soat}
                onChange={(newValue) => { cambio_fecha_vencimiento_soat(newValue); }}
                renderInput={(params) => (
                  <TextField required fullWidth size="small" {...params} />
                )}
                minDate={dayjs()}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Fecha revision tecno mecanica:'
                value={fecha_revision_tecnomecanica}
                onChange={(newValue) => {
                  cambio_fecha_vencimiento_tecnomecanica(newValue);
                }}
                renderInput={(params) => (
                  <TextField required fullWidth size="small" {...params} />
                )}
                minDate={dayjs()}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Fecha vencimiento extintor:'
                value={fecha_vencimiento_extintor}
                onChange={(newValue) => {
                  cambio_fecha_vencimiento_extintor(newValue);
                }}
                renderInput={(params) => (
                  <TextField required fullWidth size="small" {...params} />
                )}
                minDate={dayjs()}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Fecha vencimiento licencia conducción:'
                value={fecha_vencimiento_licencia}
                onChange={(newValue) => {
                  cambio_fecha_vencimiento_licencia(newValue);
                }}
                renderInput={(params) => (
                  <TextField required fullWidth size="small" {...params} />
                )}
                minDate={dayjs()}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={4}>
            <TextField
              fullWidth
              label='Capacidad extintor: '
              type={"number"}
              value={capacidad_extintor === 0 ? '' : capacidad_extintor}
              // maximo hasta el numero 10
              inputProps={{ min: "0", max: "10" }}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => {
                  //maximo hasta el 10
                  if (Number(e.target.value) <= 10 && Number(e.target.value) >= 0) {
                    set_capacidad_extintor(Number(e.target.value));
                  }
                }
              }
            />
          </Grid>

          <Grid item xs={12} lg={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
            <b>¿El vehículo es agendable?: </b>
            <Grid item sx={{
              display: 'flex',
              alignItems: 'start'
            }}>
              <FormLabel sx={{ cursor: 'pointer' }}>
                <Radio
                  {...cambio_input_radio('true', vehiculo_agendable, set_vehiculo_agendable)}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: 34,
                    },
                  }}
                />
                Si
              </FormLabel>
              <FormLabel sx={{ cursor: 'pointer' }}>
                <Radio
                  {...cambio_input_radio('false', vehiculo_agendable, set_vehiculo_agendable)}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: 34,
                    },
                  }}
                />
                No
              </FormLabel>
            </Grid>
          </Grid>

          <PersonasViajan
            inputs_persona_seleccionada={inputs_persona_seleccionada}
            set_inputs_persona_seleccionada={set_inputs_persona_seleccionada}
            data_personas_viajan={data_personas_viajan}
            set_data_personas_viajan={set_data_personas_viajan}
            id_solicitud_viaje={id_solicitud_viaje}
          />

          <ElementosInspeccionar
            set_kilometraje={set_kilometraje}
            id_hoja_vida_vehiculo={id_hoja_vida_vehiculo}
            data_inspeccion_vehiculo={data_inspeccion_vehiculo}
            set_data_inspeccion_vehiculo={set_data_inspeccion_vehiculo}
            set_inspeccionando_vehiculo={set_inspeccionando_vehiculo}
            data_personas_viajan={data_personas_viajan}
            set_data_personas_viajan={set_data_personas_viajan}
            capacidad_extintor={capacidad_extintor}
            set_capacidad_extintor={set_capacidad_extintor}
            fecha_vencimiento_extintor={fecha_vencimiento_extintor}
            set_fecha_vencimiento_extintor={set_fecha_vencimiento_extintor}
            fecha_vencimiento_licencia={fecha_vencimiento_licencia}
            set_fecha_vencimiento_licencia={set_fecha_vencimiento_licencia}
            fecha_vencimiento_soat={fecha_vencimiento_soat}
            set_fecha_vencimiento_soat={set_fecha_vencimiento_soat}
            fecha_revision_tecnomecanica={fecha_revision_tecnomecanica}
            set_fecha_revision_tecnomecanica={set_fecha_revision_tecnomecanica}
          />
        </Grid>
      }
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default InspeccionVehiculos;