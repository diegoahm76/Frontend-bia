import { Box, Button, Chip, CircularProgress, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Tab, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import dayjs, { Dayjs } from 'dayjs';
import { inputs_almacenista, inputs_funcionario_responsable, interface_busqueda_responsable, interface_obtener_activos_de_despachos, interface_obtener_despacho_activos, interface_tipos_estado_activo, response_busqueda_responsable, response_data_registro_devolucion, response_inf_almacenista, response_obtener_despacho_activos, response_obtener_ultimo_consecutivo, response_tipos_estado_activo } from '../interfaces/types';
import { control_error, control_success } from '../../../../helpers';
import { useDispatch } from 'react-redux';
import { get_data_registro_devolucion, get_obtener_despachos_activos, get_obtener_inf_almacenista, get_obtener_responsables, get_obtener_tipos_estado_activos, get_obtener_ultimo_consecutivo, post_crear_devolucion_activos } from '../thunks/devolucion_activos';
import ModalBusquedaResponsable from '../manners/ModalBusquedaResponsable';
import TablaDespachosActivos from '../tables/TablaDespachosActivos';
import TablaActivosDespacho from '../tables/TablaActivosDespacho';
import Swal from 'sweetalert2';



// eslint-disable-next-line @typescript-eslint/naming-convention
const DevolucionActivos: React.FC = () => {

  const dispatch = useDispatch();

  // Estado para mostrar el modal de búsqueda avanzada
  const [mostrar_busqueda_responsable, set_mostrar_busqueda_responsable] = useState<boolean>(false);
  // Estado para mostrar la tabla de activos de despachos
  const [mostrar_tabla_activos_despachos, set_mostrar_tabla_activos_despachos] = useState<boolean>(false);

  const [loadding_btn_buscar, set_loadding_btn_buscar] = useState<boolean>(false);

  // loadding tabla despachos activos
  const [loadding_tabla_despacho_activos, set_loadding_tabla_despacho_activos] = useState<boolean>(false);
  // loadding tabla activos de despachos
  const [loadding_tabla_activos_despachos, set_loadding_tabla_activos_despachos] = useState<boolean>(false);

  const [accion, set_accion] = useState<string>('null'); // [crear, editar, null]
  const [loadding, set_loadding] = useState<boolean>(false);
  const [consecutivo, set_consecutivo] = useState<number | null>(null);
  const [consecutivo_buscar, set_consecutivo_buscar] = useState<number>(0);
  const [fecha_devolucion, set_fecha_devolucion] = useState<Dayjs | null>(null);

  // Tipos estado activos
  const [tipos_estado_activos, set_tipos_estado_activos] = useState<interface_tipos_estado_activo[]>([]);
  // Data de inputs de almacenista
  const [inputs_almacenista, set_inputs_almacenista] = useState<inputs_almacenista>(Object);
  // Data de inputs de funcionario responsable
  const [inputs_funcionario_responsable, set_inputs_funcionario_responsable] = useState<inputs_funcionario_responsable>(Object);
  // Data de funcionario responsable seleccionado
  const [funcionario_responsable_seleccionado, set_funcionario_responsable_seleccionado] = useState<interface_busqueda_responsable>(Object);
  // Data de despachos activos del funcionario responsable
  const [data_despachos_activos, set_data_despachos_activos] = useState<interface_obtener_despacho_activos[]>([]);
  // Data de activos de despachos del funcionario responsable
  const [data_activos_despachos, set_data_activos_despachos] = useState<interface_obtener_activos_de_despachos[]>([]);
  // Id del despacho activo seleccionado
  const [id_despacho_activo_seleccionado, set_id_despacho_activo_seleccionado] = useState<number>(0);
  // Data del registro de devolución de activos por consecutivo buscado
  const [data_registro_devolucion, set_data_registro_devolucion] = useState<response_data_registro_devolucion>(Object);

  useEffect(() => {
    if (Object.keys(funcionario_responsable_seleccionado).length !== 0) {
      if(accion !== 'ver'){
        set_accion('crear');
      }
    }
  }, [funcionario_responsable_seleccionado,accion])

  const buscar_registro = () => {
    set_accion('ver');
    get_data_registro_devolucion_fc();
  };

  useEffect(() => {
    if (Object.keys(data_registro_devolucion).length !== 0 && accion === 'ver') {
      // Si hay informacion en data_registro_devolucion entonces se llena los campos del formulario y las tablas
      set_fecha_devolucion(dayjs(data_registro_devolucion.devolucion_activos.fecha_devolucion));
      set_inputs_funcionario_responsable({
        tipo_documento: data_registro_devolucion.despacho_activo.tipo_documento_funcionario_resp_asignado,
        numero_documento: data_registro_devolucion.despacho_activo.numero_documento_funcionario_resp_asignado,
      });
      set_inputs_almacenista({
        tipo_documento: data_registro_devolucion.almacenista_logueado?.tipo_documento ?? '',
        numero_documento: data_registro_devolucion.almacenista_logueado?.numero_documento ?? '',
        nombre_apellido: `${data_registro_devolucion.almacenista_logueado?.primer_nombre} ${data_registro_devolucion.almacenista_logueado?.primer_apellido}`,
      });
      set_funcionario_responsable_seleccionado({
        nombre_completo: data_registro_devolucion.devolucion_activos.nombre_persona_devolucion
      });
      set_data_despachos_activos(Array(data_registro_devolucion.despacho_activo));
      set_data_activos_despachos(data_registro_devolucion.item_despacho_activos.map((item) => {
        // se compara si el activo devuelto es igual al activo despachado segun id_item_despacho_activo y si es asi se retorna 
        // la data de item_despachos mas la jsutificacion y el cod_estado_activo_devolucion
        const activo_devuelto = data_registro_devolucion.activos_devueltos.find((activo) => activo.id_item_despacho_activo === item.id_item_despacho_activo);
        return {
          ...item,
          justificacion_devolucion: activo_devuelto?.justificacion_activo_devolucion,
          cod_estado_activo: activo_devuelto?.cod_estado_activo_devolucion,
        };
      })
      );
      set_mostrar_tabla_activos_despachos(true);
    }
  }, [data_registro_devolucion, accion]);

  const limpiar_formulario = () => {
    set_accion('null');
    set_loadding(false);
    set_consecutivo_buscar(0);
    set_loadding_btn_buscar(false);
    set_inputs_almacenista({} as inputs_almacenista);
    set_inputs_funcionario_responsable({} as inputs_funcionario_responsable);
    set_funcionario_responsable_seleccionado({} as interface_busqueda_responsable);
    set_data_despachos_activos([]);
    set_data_activos_despachos([]);
    set_id_despacho_activo_seleccionado(0);
    set_mostrar_tabla_activos_despachos(false);
  };

  /**
   * Obtener responsables de la solicitud de activos según el tipo y número de documento
   */
  const get_obtener_responsables_fc = () => {
    dispatch(get_obtener_responsables(
      inputs_funcionario_responsable.tipo_documento,
      inputs_funcionario_responsable.numero_documento,
      '',
      '',
      '',
      '',
    )).then((response: response_busqueda_responsable) => {
      if (Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_funcionario_responsable_seleccionado(response.data[0]);
          control_success('Funcionario encontrado');
        } else {
          set_funcionario_responsable_seleccionado({} as interface_busqueda_responsable);
          control_error('No se encontrarón el funcionario, pruebe con el botón de búsqueda avanzada');
        }
      } else {
        control_error('Error en el servidor al obtener los responsables de la solicitud de activos');
      }
    });
  }

  /**
   * Obtener último consecutivo de la salida especial
   */
  const get_obtener_ultimo_consecutivo_fc = () => {
    dispatch(get_obtener_ultimo_consecutivo())
      .then((response: response_obtener_ultimo_consecutivo) => {
        if (Object.keys(response).length !== 0) {
          if (response.success) {
            set_consecutivo(response.ultimo_consecutivo);
          } else {
            control_error('No se encontró el último consecutivo');
          }
        } else {
          control_error('Error en el servidor al obtener el último consecutivo');
        }
      }
      );
  }

  const get_data_registro_devolucion_fc = () => {
    set_loadding_btn_buscar(true);
    dispatch(get_data_registro_devolucion(consecutivo_buscar))
      .then((response: response_data_registro_devolucion) => {
        if (Object.keys(response).length !== 0) {
          if (response.success) {
            set_data_registro_devolucion(response);
            control_success('Registro de devolución encontrado');
            set_loadding_btn_buscar(false);
          } else {
            control_error('No se encontró el registro de devolución');
            set_loadding_btn_buscar(false);
          }
        } else {
          control_error('Error en el servidor al obtener el registro de devolución');
          set_loadding_btn_buscar(false);
        }
      }
      );
  }

  /**
   * Obtener información del almacenista
   */
  const get_obtener_inf_almacenista_fc = () => {
    dispatch(get_obtener_inf_almacenista())
      .then((response: response_inf_almacenista) => {
        if (Object.keys(response).length !== 0) {
          if (Object.keys(response.data).length !== 0) {
            set_inputs_almacenista({
              tipo_documento: response.data.tipo_documento,
              numero_documento: response.data.numero_documento,
              nombre_apellido: `${response.data.primer_nombre} ${response.data.primer_apellido}`,
            });
          } else {
            set_inputs_almacenista({} as inputs_almacenista);
            control_error('No se encontrarón información del almacenista');
          }
        } else {
          control_error('Error en el servidor al obtener la información del almacenista');
        }
      });
  }

  /**
   * Obtener tipos de estado de los activos
   */
  const get_obtener_tipos_estado_activos_fc = () => {
    dispatch(get_obtener_tipos_estado_activos())
      .then((response: response_tipos_estado_activo) => {
        if (Object.keys(response).length !== 0) {
          if (Object.keys(response.data).length !== 0) {
            set_tipos_estado_activos(response.data);
          } else {
            set_tipos_estado_activos([]);
            control_error('No se encontrarón los tipos de estado de los activos');
          }
        } else {
          control_error('Error en el servidor al obtener los tipos de estado de los activos');
        }
      });
  }

  /**
   * Obtener servicios al cargar el componente, solo se ejecuta una vez
   */
  const servicios_obtenidos = useRef(false);
  useEffect(() => {
    if (!servicios_obtenidos.current) {
      get_obtener_inf_almacenista_fc();
      get_obtener_ultimo_consecutivo_fc();
      get_obtener_tipos_estado_activos_fc();
      servicios_obtenidos.current = true;
    }
  }, [servicios_obtenidos]);


  /**
   * Obtener despachos activos del funcionario responsable seleccionado
   */
  const get_obtener_despachos_activos_fc = () => {
    set_loadding_tabla_despacho_activos(true);
    dispatch(get_obtener_despachos_activos(funcionario_responsable_seleccionado.id_persona?.toString()))
      .then((response: response_obtener_despacho_activos) => {
        if (Object.keys(response).length !== 0) {
          if (response.data?.length !== 0) {
            set_data_despachos_activos(response.data);
            set_loadding_tabla_despacho_activos(false);
            control_success('Despachos activos encontrados');
          } else {
            set_loadding_tabla_despacho_activos(false);
            set_data_despachos_activos([]);
            control_error('No se encontraron despachos de activos para el funcionario seleccionado');
          }
        } else {
          set_loadding_tabla_despacho_activos(false);
          control_error('Error en el servidor al obtener los despachos activos');
        }
      });
  }

  /**
   * Obtener despachos activos al seleccionar un funcionario responsable
   */
  useEffect(() => {
    if ('id_persona' in funcionario_responsable_seleccionado || Object.keys(funcionario_responsable_seleccionado).length !== 0) {
      if(accion !== 'ver'){
        get_obtener_despachos_activos_fc();
      }
    }
  }, [funcionario_responsable_seleccionado]);



  const busqueda_responsable = () => {
    if (!('tipo_documento' in inputs_funcionario_responsable) || inputs_funcionario_responsable.tipo_documento === '') {
      control_error('Debe seleccionar el tipo de documento');
      return;
    } else if (inputs_funcionario_responsable.numero_documento === '') {
      control_error('Debe ingresar el número de documento');
      return;
    }
    get_obtener_responsables_fc();
  }

  const validar_formulario: () => Promise<boolean> = async () => {
    if (consecutivo === 0) {
      control_error('No hay consecutivo de creación de devolución');
      return false;
    }
    if (Object.keys(funcionario_responsable_seleccionado).length === 0) {
      control_error('Debe seleccionar un funcionario responsable');
      return false;
    }
    if (Object.keys(data_activos_despachos).length === 0) {
      control_error('No hay activos de despachos seleccionados');
      return false;
    }
    // Mapeamos data_activos_despachados para verificar, si cod_estado_activo es 'D' o 'A' 
    // entonces la propiedad de justificacion tendra que tener un valor
    const activos_con_justificacion = data_activos_despachos.filter((activo) => {
      return activo.cod_estado_activo === 'D' || activo.cod_estado_activo === 'A';
    });
    if (activos_con_justificacion.length !== 0) {
      let justificacion_vacia = true;
      const activos_sin_justificacion = activos_con_justificacion.filter((activo) => {
        return activo.justificacion_devolucion === null || activo.justificacion_devolucion === '' || !('justificacion_devolucion' in activo);
      });
      if (activos_sin_justificacion.length !== 0) {
        control_error('Debe agregar una justificación en los activos con estado: "Defectuoso" o "Averiado"');
        justificacion_vacia = false;
        return false;
      }
      return justificacion_vacia;
    }

    // Mapeamos data_activos_despachados para verificar que todos los objetos tengan un valor en la propiedad cod_estado_activo
    const activos_sin_estado = data_activos_despachos.filter((activo) => {
      return activo.cod_estado_activo === null || activo.cod_estado_activo === '' || !('cod_estado_activo' in activo);
    });
    if (activos_sin_estado.length !== 0) {
      control_error('Debe seleccionar un estado para todos los activos');
      return false;
    }

    return true;
  }

  const onsubmit_form = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form_valido = await validar_formulario();
    if (form_valido) {
      Swal.fire({
        title: '¿Está seguro de guardar la devolución de activos',
        showDenyButton: true,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#042F4A',
        cancelButtonColor: '#DE1616',
        icon: 'question',
      }).then(async (result: any) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          set_loadding(true);
          dispatch(post_crear_devolucion_activos({
            id_despacho_activo: id_despacho_activo_seleccionado,
            id_persona_devolucion: funcionario_responsable_seleccionado.id_persona,
            activos_devolucionados: data_activos_despachos.map((activo) => ({
              id_item_despacho_activo: activo.id_item_despacho_activo,
              id_bien_despachado: activo.id_bien_despachado,
              cod_estado_activo_devolucion: activo.cod_estado_activo,
              justificacion_activo_devolucion: activo.justificacion_devolucion,
            })),
          })).then((response: any) => {
            if (Object.keys(response).length !== 0) {
              if (response.success) {
                control_success('Devolución de activos guardada correctamente');
                limpiar_formulario();
                get_obtener_ultimo_consecutivo_fc();
                set_loadding(false);
              } else {
                control_error('Error al guardar la devolución de activos');
                set_loadding(false);
              }
            } else {
              control_error('Error en el servidor al guardar la devolución de activos');
              set_loadding(false);
            }
          });
          return true;
        } else if (result.isDenied) {
          return false;
        }
      });
    }
  };


  return (
    <>
      <ModalBusquedaResponsable
        set_mostrar_busqueda_responsable={set_mostrar_busqueda_responsable}
        mostrar_busqueda_responsable={mostrar_busqueda_responsable}
        set_funcionario_responsable_seleccionado={set_funcionario_responsable_seleccionado}
        set_inputs_funcionario_responsable={set_inputs_funcionario_responsable}
      />

      <Grid container spacing={2} marginTop={2} sx={{
        position: "relative",
        background: "#FAFAFA",
        borderRadius: "15px",
        p: "40px",
        mb: "20px",
        boxShadow: "0px 3px 6px #042F4A26",
      }}
      >
        <Grid item xs={12}>
          <Title title="Devolución de activos" />

          <Box
            component={'form'}
            onSubmit={onsubmit_form}
            sx={{ mt: '20px', width: '100%' }}
          >
            <Grid container spacing={2} item xs={12}>
              <Grid container item xs={12} lg={3}>
                <TextField
                  fullWidth
                  disabled
                  label='Consecutivo creación:'
                  size='small'
                  value={consecutivo === null ? 'Cargando...' : consecutivo_buscar === 0 ? consecutivo : ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    set_consecutivo(Number(event.target.value));
                  }}
                />
              </Grid>

              <Grid container item xs={12} lg={3}>
                <TextField
                  type='number'
                  fullWidth
                  disabled={accion === 'crear' || loadding_btn_buscar}
                  label='Consecutivo a buscar:'
                  size='small'
                  value={consecutivo_buscar === 0 ? '' : consecutivo_buscar}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    set_consecutivo_buscar(Number(event.target.value));
                  }}
                />
              </Grid>

              <Grid container item xs={12} lg={2}>
                <Button
                  fullWidth
                  type='button'
                  variant='contained'
                  disabled={accion === 'crear' || loadding_btn_buscar}
                  color='primary'
                  startIcon={loadding_btn_buscar ? <CircularProgress size={25} /> : <SearchIcon />}
                  onClick={buscar_registro}
                >
                  {loadding_btn_buscar ? '' : 'Buscar Registro'}
                </Button>
              </Grid>

              <Grid container item xs={12} lg={4} sx={{
                display: "flex",
                justifyContent: "end",
              }}>
                <Grid item xs={12} lg={8}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disabled
                      label='Fecha devolución: '
                      value={fecha_devolucion}
                      onChange={() => { }} // Not implemented
                      renderInput={(params) => (
                        <TextField disabled required fullWidth size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>


              <Grid item xs={12} mt={4}>
                <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
                  <Chip label="INFORMACION DE ALMACENISTA" size="small" />
                </Divider>
              </Grid>

              <Grid container item xs={12} lg={3}>
                <TextField
                  fullWidth
                  disabled
                  label='Tipo de documento: '
                  size='small'
                  value={inputs_almacenista.tipo_documento ?? ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    set_inputs_almacenista((prev) => ({ ...prev, tipo_documento: event.target.value }));
                  }}
                />
              </Grid>

              <Grid container item xs={12} lg={3}>
                <TextField
                  fullWidth
                  disabled
                  label='Número de documento: '
                  size='small'
                  value={inputs_almacenista.numero_documento ?? ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    set_inputs_almacenista((prev) => ({ ...prev, numero_documento: event.target.value }));
                  }}
                />
              </Grid>

              <Grid container item xs={12} lg={6}>
                <TextField
                  fullWidth
                  disabled
                  label='Nombre completo: '
                  size='small'
                  value={inputs_almacenista.nombre_apellido ?? ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    set_inputs_almacenista((prev) => ({ ...prev, nombre: event.target.value }));
                  }}
                />
              </Grid>

              <Grid container spacing={2} my={4} item xs={12}>
                <Grid item xs={12}>
                  <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
                    <Chip label="FUNCIONARIO RESPONSABLE" size="small" />
                  </Divider>
                </Grid>

                <Grid item xs={12} lg={accion === 'ver' ? 6 : 4.5}>
                  <FormControl required size="small" fullWidth>
                    <InputLabel >Tipo documento responsable</InputLabel>
                    <Select
                      label='Tipo documento responsable'
                      value={inputs_funcionario_responsable.tipo_documento ?? ''}
                      disabled={accion === 'ver'}
                      onChange={(event: any) => {
                        set_inputs_funcionario_responsable((prev) => ({ ...prev, tipo_documento: event.target.value }));
                      }}
                    >
                      <MenuItem value="CC">Cédula de ciudadanía</MenuItem>
                      <MenuItem value="RC" >Registro civil</MenuItem>
                      <MenuItem value="TI" >Tarjeta de identidad</MenuItem>
                      <MenuItem value="CE" >Cédula de extranjería</MenuItem>
                      <MenuItem value="PA" >Pasaporte</MenuItem>
                      <MenuItem value="PE" >Permiso especial de permanencia</MenuItem>
                      <MenuItem value="NT" >NIT</MenuItem>
                      <MenuItem value="NU" >NUIP</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={accion === 'ver' ? 6 : 4.5}>
                  <TextField
                    fullWidth
                    label='Documento responsable'
                    value={inputs_funcionario_responsable.numero_documento ?? ''}
                    disabled={accion === 'ver'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      set_inputs_funcionario_responsable((prev) => ({ ...prev, numero_documento: event.target.value }));
                    }
                    }
                    size='small'
                  />
                </Grid>

                {accion !== 'ver' &&
                  <Grid item xs={12} lg={3}>
                    <Button
                      fullWidth
                      disabled={accion === 'ver'}
                      color="primary"
                      variant="contained"
                      startIcon={<SearchIcon />}
                      onClick={busqueda_responsable}
                    >
                      Buscar
                    </Button>
                  </Grid>
                }

                <Grid item xs={12} lg={accion === 'ver' ? 12 : 9}>
                  <TextField
                    fullWidth
                    disabled
                    label='Nombres responsable'
                    value={funcionario_responsable_seleccionado.nombre_completo ?? ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      set_inputs_funcionario_responsable((prev) => ({ ...prev, nombre_apellido: event.target.value }))
                    }
                    }
                    size='small'
                  />
                </Grid>

                {accion !== 'ver' &&
                  <Grid item xs={12} lg={3}>
                    <Button
                      fullWidth
                      disabled={accion === 'ver'}
                      color="primary"
                      variant="contained"
                      startIcon={<SearchIcon />}
                      onClick={() => set_mostrar_busqueda_responsable(true)}
                    >
                      Búsqueda avanzada
                    </Button>
                  </Grid>
                }
              </Grid>

            </Grid>

            {Object.keys(funcionario_responsable_seleccionado).length !== 0 &&
              <Grid container item xs={12}>
                <Grid item xs={12} my={2}>
                  <Title title="Despachos de activos encontrados" />
                </Grid>
                <TablaDespachosActivos
                  accion={accion}
                  data={data_despachos_activos}
                  loadding_tabla={loadding_tabla_despacho_activos}
                  set_data_activos_despachos={set_data_activos_despachos}
                  set_loadding_tabla_activos_despachos={set_loadding_tabla_activos_despachos}
                  set_mostrar_tabla_activos_despachos={set_mostrar_tabla_activos_despachos}
                  set_id_despacho_activo_seleccionado={set_id_despacho_activo_seleccionado}
                />
              </Grid>
            }

            {mostrar_tabla_activos_despachos &&
              <Grid container item xs={12}>
                <Grid item xs={12} my={2}>
                  <Title title="Activos despachados" />
                </Grid>
                <TablaActivosDespacho
                  accion={accion}
                  data={data_activos_despachos}
                  set_data={set_data_activos_despachos}
                  loadding_tabla={loadding_tabla_activos_despachos}
                  tipos_estado_activos={tipos_estado_activos}
                />
              </Grid>
            }

            <Grid item xs={12} sx={{
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
                  disabled={loadding || accion === 'ver'}
                  startIcon={loadding ? <CircularProgress size={25} /> : <SaveIcon />}
                  type='submit'
                >
                  {loadding ? '' : "Guardar"}
                </Button>
              </Grid>

              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  color="inherit"
                  variant="outlined"
                  startIcon={<CleanIcon />}
                  onClick={limpiar_formulario}
                >
                  Limpiar
                </Button>
              </Grid>
            </Grid>

          </Box>
        </Grid>
      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default DevolucionActivos;