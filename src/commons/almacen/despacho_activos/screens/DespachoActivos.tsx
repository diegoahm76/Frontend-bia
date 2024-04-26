import { Box, Button, Grid, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SolicitudesEnProceso from './SolicitudesEnProceso';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { interface_busqueda_articulos, interface_busqueda_bodegas, interface_busqueda_operario, interface_busqueda_responsable, interface_inputs_buscar_bodega, interface_inputs_funcionarios, interface_resumen_despacho_con_solicitud, interface_resumen_despacho_sin_solicitud, response_articulos_despacho_con_solicitud } from '../interfeces/types';
import BusquedaFuncionarios from './BusquedaFuncionarios';
import BusquedaArticulos from './BusquedaArticulos';
import SaveIcon from '@mui/icons-material/Save';
import { control_error, control_success } from '../../../../helpers';
import { useAppDispatch } from '../../../../hooks';
import { get_articulos_despacho_con_solicitud, post_crear_despacho_con_solicitud, post_crear_despacho_sin_solicitud } from '../thunks/despacho_solicitudes';
import ResumenDespachoConSolicitud from './ResumenDespachoConSolicitud';
import ResumenDespachoSinSolicitud from './ResumenDespachoSinSolicitud';

// eslint-disable-next-line @typescript-eslint/naming-convention
const DespachoActivos = () => {
  const dispatch = useAppDispatch();

  const [position_tab, set_position_tab] = useState<string>('1');
  const [accion, set_accion] = useState<string>('null'); // [null, ver, crear, editar]

  // Estado para saber si se está viendo los despachos sin solicitud
  const [despacho_sin_solicitud, set_despacho_sin_solicitud] = useState<boolean>(false);

  // loadding de btn guardar despacho, para evitar doble click
  const [loadding_btn_guardar_despacho, set_loadding_btn_guardar_despacho] = useState<boolean>(false);

  // al darle click en aprobar despacho con solicitud trae el id de la solicitud
  const [id_solicitud_activo, set_id_solicitud_activo] = useState<number | null>(null);

  const form_data = new FormData();

  // ---- Estados de pagina 1  ------ //
  // INput de justificacion de anulacion
  const [justificacion_anulacion, set_justificacion_anulacion] = useState<string>('');

  // ---- Estados de pagina 2  ------ //
  // Inputs Búsqueda funcionarios
  const [inputs_funcionarios, set_inputs_funcionarios] = useState<interface_inputs_funcionarios>(Object);
  // Inputs de busqueda de bodega
  const [inputs_buscar_bodega, set_inputs_buscar_bodega] = useState<interface_inputs_buscar_bodega>(Object);
  // INput OBservacion
  const [observacion, set_observacion] = useState<string>('');
  // Anexo file opcional
  const [data_anexo_opcional, set_data_anexo_opcional] = useState<any>(Object);
  // Data funcionario responsable seleccionado
  const [funcionario_responsable_seleccionado, set_funcionario_responsable_seleccionado] = useState<interface_busqueda_responsable>(Object);
  // Data funcionario operario seleccionado
  const [funcionario_operario_seleccionado, set_funcionario_operario_seleccionado] = useState<interface_busqueda_operario>(Object);
  // Data bodega seleccionada
  const [bodega_seleccionada, set_bodega_seleccionada] = useState<interface_busqueda_bodegas>(Object);


  // ---- Estados de pagina 3  ------ //
  //Data de la tabla de articulos agregados
  const [data_articulos_agregados_padres, set_data_articulos_agregados_padres] = useState<interface_busqueda_articulos[]>([]);


  // data cuando se da click en el icono de 'ojo' en la tabla para ver el despacho con solicitud
  const [data_solicitud_ver_por_id_con_solicitud, set_data_solicitud_ver_por_id_con_solicitud] = useState<interface_resumen_despacho_con_solicitud>(Object);
  // data cuando se da click en el icono de 'ojo' en la tabla para ver el despacho sin solicitu
  const [data_solicitud_ver_por_id_sin_solicitud, set_data_solicitud_ver_por_id_sin_solicitud] = useState<interface_resumen_despacho_sin_solicitud>(Object);


  useEffect(() => {
    // SI hay data de funcionario responsable seleccionado se rellenará los inputs
    if (Object.keys(funcionario_responsable_seleccionado).length !== 0) {
      set_inputs_funcionarios({
        ...inputs_funcionarios,
        tp_documento_funcionario_responsable: funcionario_responsable_seleccionado.tipo_documento,
        documento_funcionario_responsable: funcionario_responsable_seleccionado.numero_documento,
        nombres_funcionario_responsable: funcionario_responsable_seleccionado.primer_nombre,
        apellidos_funcionario_responsable: funcionario_responsable_seleccionado.primer_apellido,
      });
    }
    // Si hay data de funcionario operario seleccionado se rellenará los inputs
    if (Object.keys(funcionario_operario_seleccionado).length !== 0) {
      set_inputs_funcionarios({
        ...inputs_funcionarios,
        tp_documento_funcionario_operario: funcionario_operario_seleccionado.tipo_documento,
        documento_funcionario_operario: funcionario_operario_seleccionado.numero_documento,
        nombres_funcionario_operario: funcionario_operario_seleccionado.primer_nombre,
        apellidos_funcionario_operario: funcionario_operario_seleccionado.primer_apellido,
      });
    }
    // Si hay data de bodega seleccionada se rellenará los inputs
    if (Object.keys(bodega_seleccionada).length !== 0) {
      set_inputs_buscar_bodega({
        nombre_bodega: bodega_seleccionada.nombre,
        departamento: '',
        municipio: bodega_seleccionada.cod_municipio,
        direccion: bodega_seleccionada.direccion,
      });
    }
  }, [funcionario_operario_seleccionado, funcionario_responsable_seleccionado, bodega_seleccionada]);


  const get_articulos_despacho_con_solicitud_fc = async () => {
    await dispatch(get_articulos_despacho_con_solicitud(id_solicitud_activo))
      .then((response: response_articulos_despacho_con_solicitud) => {
        if (Object.keys(response).length !== 0) {
          if (response.success) {
            console.log(response.items);
            set_data_articulos_agregados_padres(response.items);
          } else {
            control_error('Error interno al intentar obtener los articulos de la solicitud');
          }
        } else {
          control_error('Error interno al intentar obtener los articulos de la solicitud');
        }
      }
      )
  }

  // useEffect para obtener los articulos del despacho con solicitud
  useEffect(() => {
    if (!despacho_sin_solicitud && accion === 'crear') {
      get_articulos_despacho_con_solicitud_fc();
    }
  }, [despacho_sin_solicitud, accion])


  const limpiar_campos = () => {
    set_inputs_funcionarios({} as interface_inputs_funcionarios);
    set_funcionario_responsable_seleccionado({} as interface_busqueda_responsable);
    set_funcionario_operario_seleccionado({} as interface_busqueda_operario);
    set_bodega_seleccionada({} as interface_busqueda_bodegas);
    set_inputs_buscar_bodega({} as interface_inputs_buscar_bodega);
    set_data_anexo_opcional({} as any);
    set_observacion('');
  }


  /**
   * Función para cambiar de tab - Pestaña
   */
  const handle_tablist_change = (event: React.SyntheticEvent, newValue: string) => {
    set_position_tab(newValue);
  }

  // Crear despacho sin solicitud
  const btn_ver_despachos_sin_solicitudes = () => {
    set_despacho_sin_solicitud(true);
  }

  /**
   * Función para crear un despacho sin solicitud
   */
  const btn_crear_despacho_sin_solicitud = () => {
    set_position_tab('2');
    set_accion('crear');
  }

  /**
   * Función para ir a la siguiente pantalla
   */
  const btn_siguiente = () => {
    if (position_tab === '2') {
      set_position_tab('3');
    }
  }

  /**
   * Función para regresar a la pantalla anterior
   */
  const btn_atras = () => {
    if (position_tab === '3') {
      set_position_tab('2');
    } else if (accion === 'ver_con_solicitud' && position_tab === '4') {
      set_position_tab('1');
      set_data_solicitud_ver_por_id_con_solicitud({} as interface_resumen_despacho_con_solicitud);
    } else if(accion === 'ver_sin_solicitud' && position_tab === '5') {
      set_position_tab('1');
      set_data_solicitud_ver_por_id_sin_solicitud({} as interface_resumen_despacho_sin_solicitud);
    }
  }

  /**
   * Función para salir de una crear o ver despacho sin solicitud
   */
  const btn_salir = () => {
    Swal.fire({
      title: '¿Está seguro de salir?',
      text: "Si sale se perderán los cambios realizados",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then((result: any) => {
      if (result.isConfirmed) {
        set_position_tab('1');
        set_accion('null');
        return true;
      }
    });
  }

  const validar_formulario: () => Promise<boolean> = async () => {
    if (Object.keys(funcionario_responsable_seleccionado).length === 0) {
      control_error('Debe seleccionar un funcionario responsable');
      return false;
    }
    if (Object.keys(funcionario_operario_seleccionado).length === 0) {
      control_error('Debe seleccionar un funcionario operario');
      return false;
    }
    if (Object.keys(bodega_seleccionada).length === 0) {
      control_error('Debe seleccionar una bodega');
      return false;
    }
    if (observacion === '') {
      control_error('Debe ingresar una observación');
      return false;
    }
    if (data_articulos_agregados_padres.length === 0) {
      control_error('Debe agregar al menos un articulo para despachar');
      return false;
    }
    // verificamos que almenos en un articulo de data_articulos_agregados_padres tenga la propiedad articulos_hijos
    const articulo_hijo_existente = data_articulos_agregados_padres.find(articulo => articulo.articulos_hijos);
    if (!articulo_hijo_existente) {
      control_error('Debe agregar al menos un activo a un articulo');
      return false;
    }

    return true;
  }

  const agregar_propiedades_form_data = async () => {
    if (!despacho_sin_solicitud) {
      form_data.append('id_solicitud_activo', id_solicitud_activo ? id_solicitud_activo.toString() : '');
    }

    form_data.append('observacion', observacion);
    form_data.append('id_bodega', bodega_seleccionada.id_bodega.toString());
    form_data.append('id_funcionario_resp_asignado', funcionario_responsable_seleccionado.id_persona.toString());
    form_data.append('id_persona_operario_asignado', funcionario_operario_seleccionado.id_persona.toString());
    //anexo opcional
    if ('name' in data_anexo_opcional) {
      form_data.append('anexo_opcional', data_anexo_opcional);
    }

    // activos despachados
    form_data.append('bienes_despachados', JSON.stringify(data_articulos_agregados_padres.flatMap((item) => {
      return item.articulos_hijos?.map((articulo_hijo, index) => {
        return {
          id_bien_despachado: articulo_hijo.id_bien_despachado,
          id_bodega: articulo_hijo.id_bodega,
          observacion: articulo_hijo.observaciones ?? '',
          ...(!despacho_sin_solicitud ? { id_bien_solicitado: item?.id_bien } : {}),
          nro_posicion_despacho: Number(index + 1)
        }
      }) || [];
    })));
  }

  const guardar_despacho = async () => {
    const validacion_form = await validar_formulario();

    if (despacho_sin_solicitud && validacion_form) {
      await agregar_propiedades_form_data();

      Swal.fire({
        title: '¿Está seguro de crear el despacho sin solicitud?',
        showDenyButton: true,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#042F4A',
        cancelButtonColor: '#DE1616',
        icon: 'question',
      }).then((result: any) => {
        if (result.isConfirmed) {
          crear_despacho_sin_solicitud();
          return true;
        }
      });
    } else if (!despacho_sin_solicitud && validacion_form) {
      // logica de aguardar despachos con solicitud
      await agregar_propiedades_form_data();
      Swal.fire({
        title: '¿Está seguro de aprobar este despacho?',
        showDenyButton: true,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#042F4A',
        cancelButtonColor: '#DE1616',
        icon: 'question',
      }).then((result: any) => {
        if (result.isConfirmed) {
          crear_despacho_con_solicitud();
          return true;
        }
      });
    }
  }

  async function crear_despacho_sin_solicitud() {
    set_loadding_btn_guardar_despacho(true);
    await dispatch(post_crear_despacho_sin_solicitud(form_data))
      .then((response: any) => {
        if (Object.keys(response).length !== 0) {
          if (response.success) {
            control_success('Despacho creado correctamente');
            set_loadding_btn_guardar_despacho(false);
            limpiar_campos();
            set_position_tab('1');
            set_accion('null');
          } else {
            if (response.detail) {
              control_error(response.detail)
              set_loadding_btn_guardar_despacho(false);
            } else {
              control_error('Error interno al intentar crear el despacho');
              set_loadding_btn_guardar_despacho(false);
            }
            set_loadding_btn_guardar_despacho(false);
          }
        } else {
          control_error('Error interno al intentar crear el despacho');
          set_loadding_btn_guardar_despacho(false);
        }
      }
      )
  }

  async function crear_despacho_con_solicitud() {
    set_loadding_btn_guardar_despacho(true);
    await dispatch(post_crear_despacho_con_solicitud(form_data))
      .then((response: any) => {
        if (Object.keys(response).length !== 0) {
          if (response.success) {
            control_success('Despacho aprobrado correctamente');
            set_loadding_btn_guardar_despacho(false);
            limpiar_campos();
            set_position_tab('1');
            set_accion('null');
          } else {
            if (response.detail) {
              control_error(response.detail)
              set_loadding_btn_guardar_despacho(false);
            } else {
              control_error('Error interno al intentar aprobar el despacho');
              set_loadding_btn_guardar_despacho(false);
            }
            set_loadding_btn_guardar_despacho(false);
          }
        } else {
          control_error('Error interno al intentar aprobar el despacho');
          set_loadding_btn_guardar_despacho(false);
        }
      }
      )
  }



  return (
    <>
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
          <Title title='Despachos de activos' />
          <Box
            component={'form'}
            sx={{ mt: '20px' }}
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', }}>
                <TabList sx={{ minWidth: '100%' }} onChange={handle_tablist_change}>
                  <Tab disabled={accion === 'ver' || accion === 'crear'} sx={{ minWidth: accion === 'ver_con_solicitud' ? '50%' : accion === 'ver_sin_solicitud' ? '50%' : '33.3%' }} label={despacho_sin_solicitud ? 'Despachos sin solicitud' : 'Despachos con solicitud'} value="1" />

                  {accion !== 'ver_con_solicitud' && accion !== 'ver_sin_solicitud' && <Tab disabled={accion === 'null'} sx={{ minWidth: '33.3%' }} label="Búsqueda funcionarios" value="2" />}

                  {accion !== 'ver_con_solicitud' && accion !== 'ver_sin_solicitud' && <Tab disabled={accion === 'null'} sx={{ minWidth: '33.3%' }} label="Búsqueda activos" value="3" />}

                  {accion === 'ver_con_solicitud' && <Tab sx={{ minWidth: '50%' }} label="Resumen despacho" value="4" />}

                  {accion === 'ver_sin_solicitud' && <Tab sx={{ minWidth: '50%' }} label="Resumen despacho" value="5" />}
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <SolicitudesEnProceso
                    accion={accion}
                    id_solicitud_activo={id_solicitud_activo}
                    set_accion={set_accion}
                    despacho_sin_solicitud={despacho_sin_solicitud}
                    set_position_tab={set_position_tab}
                    set_id_solicitud_activo={set_id_solicitud_activo}
                    set_data_solicitud_ver_por_id_con_solicitud={set_data_solicitud_ver_por_id_con_solicitud}
                    set_data_solicitud_ver_por_id_sin_solicitud={set_data_solicitud_ver_por_id_sin_solicitud}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <Grid container spacing={2} rowSpacing={7}>
                  <BusquedaFuncionarios
                    accion={accion}
                    inputs_funcionarios={inputs_funcionarios}
                    set_inputs_funcionarios={set_inputs_funcionarios}
                    set_funcionario_responsable_seleccionado={set_funcionario_responsable_seleccionado}
                    set_funcionario_operario_seleccionado={set_funcionario_operario_seleccionado}
                    set_bodega_seleccionada={set_bodega_seleccionada}
                    inputs_buscar_bodega={inputs_buscar_bodega}
                    set_inputs_buscar_bodega={set_inputs_buscar_bodega}
                    observacion={observacion}
                    set_observacion={set_observacion}
                    data_anexo_opcional={data_anexo_opcional}
                    set_data_anexo_opcional={set_data_anexo_opcional}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="3" sx={{ p: '20px 0' }}>
                <Grid container spacing={2} rowSpacing={7}>
                  <BusquedaArticulos
                    data_articulos_agregados_padres={data_articulos_agregados_padres}
                    set_data_articulos_agregados_padres={set_data_articulos_agregados_padres}
                    despacho_sin_solicitud={despacho_sin_solicitud}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="4" sx={{ p: '20px 0' }}>
                <Grid container spacing={2} rowSpacing={3}>
                  <ResumenDespachoConSolicitud
                    data_solicitud_ver_por_id_con_solicitud={data_solicitud_ver_por_id_con_solicitud}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="5" sx={{ p: '20px 0' }}>
                <Grid container spacing={2} rowSpacing={3}>
                  <ResumenDespachoSinSolicitud
                    data_solicitud_ver_por_id_sin_solicitud={data_solicitud_ver_por_id_sin_solicitud}
                  />
                </Grid>
              </TabPanel>

            </TabContext>

            <Grid container item xs={12} sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              marginTop: "20px",
              gap: 2,
            }}
            >
              {despacho_sin_solicitud && position_tab === '1' &&
                <Grid item xs={12} lg={3}>
                  <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    startIcon={<ArrowBackIosIcon />}
                    onClick={() => set_despacho_sin_solicitud(false)}
                  >
                    Regresar a despachos con solicitudes
                  </Button>
                </Grid>
              }

              {position_tab !== '1' && accion !== 'ver' &&
                <Grid item xs={12} lg={2}>
                  <Button
                    fullWidth
                    color="success"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    disabled={loadding_btn_guardar_despacho}
                    onClick={() => guardar_despacho()}
                  >
                    Guardar
                  </Button>
                </Grid>
              }

              {despacho_sin_solicitud && position_tab === '1' &&
                <Grid item xs={12} lg={3}>
                  <Button
                    fullWidth
                    color="success"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={btn_crear_despacho_sin_solicitud}
                  >
                    Crear despacho sin solicitud
                  </Button>
                </Grid>
              }

              {!despacho_sin_solicitud && position_tab === '1' &&
                <Grid item xs={12} lg={3}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    onClick={btn_ver_despachos_sin_solicitudes}
                  >
                    Ver despachos sin solicitudes
                  </Button>
                </Grid>
              }

              {position_tab === '2' &&
                <Grid item xs={12} lg={2}>
                  <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    startIcon={<CloseIcon />}
                    onClick={btn_salir}
                  >
                    Salir
                  </Button>
                </Grid>
              }

              {position_tab !== '1' &&
                <Grid item xs={12} lg={2}>
                  <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    disabled={position_tab === '2'}
                    startIcon={<ArrowBackIosIcon />}
                    onClick={btn_atras}
                  >
                    Atras
                  </Button>
                </Grid>
              }

              {position_tab !== '1' && accion !== 'ver' &&
                <Grid item xs={12} lg={2}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    disabled={position_tab === '3'}
                    startIcon={<NavigateNextIcon />}
                    onClick={btn_siguiente}
                  >
                    Siguiente
                  </Button>
                </Grid>
              }

            </Grid>
          </Box>
        </Grid>

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default DespachoActivos;