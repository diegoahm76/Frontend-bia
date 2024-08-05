import { Box, Button, Grid, Tab } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import BusquedaFuncionarios from './BusquedaFuncionarios';
import { interface_activos_asociados, interface_busqueda_operario, interface_busqueda_responsable, interface_inputs_funcionarios, interface_inputs_operario, interface_inputs_responsable, interface_inputs_responsable_actual, interface_tipos_documentos, response_activos_asociados, response_tipos_documentos } from '../interfaces/types';
import ModalBusquedaFuncionarios from '../manners/ModalBusquedaFuncionarios';
import Articulos from './Articulos';
import { useDispatch } from 'react-redux';
import { get_obtener_activos_asociados_funcionario_actual, get_obtener_tipos_documentos, post_crear_reasignacion } from '../thunks/reasignacion_responsable';
import { control_error, control_success } from '../../../../helpers';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';
import CleanIcon from '@mui/icons-material/CleaningServices';




// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const ReasingnacionResponsable = () => {
  const dispatch = useDispatch();

  const [position_tab, set_position_tab] = useState<string>('1');

  // Form data
  const form_data = new FormData();

  // btn de loadding para guardar reasignacion
  const [loadding_btn_guardar_reasignacion, set_loadding_btn_guardar_reasignacion] = useState<boolean>(false);

  // tipo de funcionario que se va ah buscar en modal de buscar funcionarios
  const [tipo_funcionario, set_tipo_funcionario] = useState<string>(''); // ['reasignado', 'operario', 'actual']
  // estado para mostrar modal de busqueda de funcionarios
  const [mostrar_modal_busqueda_funcionarios, set_mostrar_modal_busqueda_funcionarios] = useState<boolean>(false);

  // ---- Estados de pagina 1  ------ //
  // Inputs Búsqueda funcionarios
  const [inputs_funcionarios, set_inputs_funcionarios] = useState<interface_inputs_funcionarios>(Object);
  const [inputs_responsable, set_inputs_responsable] = useState<interface_inputs_responsable>(Object);
  const [inputs_operario, set_inputs_operario] = useState<interface_inputs_operario>(Object);
  const [inputs_responsable_actual, set_inputs_responsable_actual] = useState<interface_inputs_responsable_actual>(Object);

  // Tipos de documentos
  const [tipos_documentos, set_tipos_documentos] = useState<interface_tipos_documentos[]>([]);
  // data de funcionario reasignado reasignado seleccionado
  const [funcionario_responsable_reasignado_seleccionado, set_funcionario_responsable_reasignado_seleccionado] = useState<interface_busqueda_responsable>(Object);
  // data de funcionario operario seleccionado
  const [funcionario_operario_seleccionado, set_funcionario_operario_seleccionado] = useState<interface_busqueda_operario>(Object);
  // data de funcionario responsable actual seleccionado
  const [funcionario_responsable_actual_seleccionado, set_funcionario_responsable_actual_seleccionado] = useState<interface_busqueda_responsable>(Object);
  // Observacion
  const [observacion, set_observacion] = useState<string>('');
  // File de anexo obcional
  const [data_anexo_opcional, set_data_anexo_opcional] = useState<any>(Object);


  // ---- Estados de pagina 2  ------ //
  // loadding para la tabla de activos asociados
  const [loadding_tabla_activos_asociados, set_loadding_tabla_activos_asociados] = useState<boolean>(false);
  // Data de los activos asociados a el funcionario actual
  const [data_activos_asociados, set_data_activos_asociados] = useState<interface_activos_asociados[]>([]);
  // DAta de los activos agregados para reasignar
  const [data_activos_asociados_agregados, set_data_activos_asociados_agregados] = useState<interface_activos_asociados[]>([]);


  useEffect(() => {
    // SI hay data de funcionario responsable seleccionado se rellenará los inputs
    console.log(funcionario_responsable_reasignado_seleccionado)
    console.log(funcionario_operario_seleccionado)
    if (funcionario_responsable_reasignado_seleccionado?.id_persona) {
      console.log('entrando')
      set_inputs_funcionarios({
        ...inputs_funcionarios,
        tp_documento_funcionario_responsable_reasignado: funcionario_responsable_reasignado_seleccionado.tipo_documento,
        documento_funcionario_responsable_reasignado: funcionario_responsable_reasignado_seleccionado.numero_documento,
        nombres_funcionario_responsable_reasignado: funcionario_responsable_reasignado_seleccionado.primer_nombre,
        apellidos_funcionario_responsable_reasignado: funcionario_responsable_reasignado_seleccionado.primer_apellido,
      });
      set_inputs_responsable({
        tp_documento_funcionario_responsable_reasignado: funcionario_responsable_reasignado_seleccionado.tipo_documento,
        documento_funcionario_responsable_reasignado: funcionario_responsable_reasignado_seleccionado.numero_documento,
        nombres_funcionario_responsable_reasignado: funcionario_responsable_reasignado_seleccionado.primer_nombre,
        apellidos_funcionario_responsable_reasignado: funcionario_responsable_reasignado_seleccionado.primer_apellido,
      });
    }
    // SI hay data de funcionario responsable seleccionado se rellenará los inputs
    if (Object.keys(funcionario_responsable_actual_seleccionado).length !== 0) {
      console.log('entrando ope')
      set_inputs_funcionarios({
        ...inputs_funcionarios,
        tp_documento_funcionario_responsable_actual: funcionario_responsable_actual_seleccionado.tipo_documento,
        documento_funcionario_responsable_actual: funcionario_responsable_actual_seleccionado.numero_documento,
        nombres_funcionario_responsable_actual: funcionario_responsable_actual_seleccionado.primer_nombre,
        apellidos_funcionario_responsable_actual: funcionario_responsable_actual_seleccionado.primer_apellido,
      });
      set_inputs_responsable_actual({
        tp_documento_funcionario_responsable_actual: funcionario_responsable_actual_seleccionado.tipo_documento,
        documento_funcionario_responsable_actual: funcionario_responsable_actual_seleccionado.numero_documento,
        nombres_funcionario_responsable_actual: funcionario_responsable_actual_seleccionado.primer_nombre,
        apellidos_funcionario_responsable_actual: funcionario_responsable_actual_seleccionado.primer_apellido,

      })
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
      set_inputs_operario({
        tp_documento_funcionario_operario: funcionario_operario_seleccionado.tipo_documento,
        documento_funcionario_operario: funcionario_operario_seleccionado.numero_documento,
        nombres_funcionario_operario: funcionario_operario_seleccionado.primer_nombre,
        apellidos_funcionario_operario: funcionario_operario_seleccionado.primer_apellido,
      });
    }


  }, [funcionario_operario_seleccionado, funcionario_responsable_reasignado_seleccionado, funcionario_responsable_actual_seleccionado]);

  // useEffect(() => {
  //   console.log(inputs_funcionarios)
  // }, [inputs_funcionarios])

  /**
 * Función para cambiar de tab - Pestaña
 */
  const handle_tablist_change = (event: React.SyntheticEvent, newValue: string) => {
    set_position_tab(newValue);
  }


  const get_obtener_tipos_documentos_fc = () => {
    dispatch(get_obtener_tipos_documentos())
      .then((response: response_tipos_documentos) => {
        if (Object.keys(response).length !== 0) {
          if (response.data.length !== 0) {
            set_tipos_documentos(response.data);
          } else {
            set_tipos_documentos([]);
            control_error('No se encontraron tipos de documentos');
          }
        } else {
          control_error('Error en el servidor al obtener tipos de documentos');
        }
      });
  }

  const ejecutar_servicios = useRef(false);
  useEffect(() => {
    if (!ejecutar_servicios.current) {
      get_obtener_tipos_documentos_fc();
      ejecutar_servicios.current = true;
    }
  }, [])


  const get_obtener_activos_asociados_funcionario_actual_fc = async (id_persona: string) => {
    set_loadding_tabla_activos_asociados(true);
    await dispatch(get_obtener_activos_asociados_funcionario_actual(id_persona))
      .then((response: response_activos_asociados) => {
        if (Object.keys(response).length !== 0) {
          if (response?.data?.length > 0) {
            set_data_activos_asociados(response.data);
            set_loadding_tabla_activos_asociados(false);
          } else {
            set_data_activos_asociados([]);
            set_loadding_tabla_activos_asociados(false);
            control_error('No se encontraron activos asociados al funcionario seleccionado');
          }
        } else {
          set_loadding_tabla_activos_asociados(false);
          control_error('Hubo un error al intentar obtener los activos asociados de la entrada seleccionada');
        }
      });
  }

  // Cargar los activos asociados a la entrada seleccionada
  useEffect(() => {
    if (Object.keys(funcionario_responsable_actual_seleccionado).length > 0) {
      get_obtener_activos_asociados_funcionario_actual_fc(funcionario_responsable_actual_seleccionado.id_persona.toString());
    }
  }, [funcionario_responsable_actual_seleccionado]);


  const btn_atras = () => {
    if (position_tab === '2') {
      set_position_tab('1');
    }
  }

  const btn_siguiente = () => {
    if (position_tab === '1') {
      set_position_tab('2');
    }
  }

  const limpiar_campos = () => {
    set_funcionario_responsable_reasignado_seleccionado({} as interface_busqueda_responsable);
    set_funcionario_operario_seleccionado({} as interface_busqueda_operario);
    set_funcionario_responsable_actual_seleccionado({} as interface_busqueda_responsable);
    set_observacion('');
    set_data_anexo_opcional({} as any);
    set_data_activos_asociados_agregados([]);
    set_data_activos_asociados([]);
    set_inputs_funcionarios({} as interface_inputs_funcionarios);
    set_inputs_responsable({} as interface_inputs_responsable);
    set_inputs_operario({} as interface_inputs_operario);
    set_inputs_responsable_actual({} as interface_inputs_responsable_actual);
  }

  const validar_formulario: () => Promise<boolean> = async () => {
    if (Object.keys(funcionario_responsable_reasignado_seleccionado).length === 0) {
      control_error('Debe seleccionar un funcionario responsable para reasignar');
      return false;
    }
    if (Object.keys(funcionario_responsable_actual_seleccionado).length === 0) {
      control_error('Debe seleccionar un funcionario responsable actual');
      return false;
    }
    if (Object.keys(funcionario_operario_seleccionado).length === 0) {
      control_error('Debe seleccionar un funcionario operario');
      return false;
    }
    if (observacion.trim() === '') {
      control_error('Debe ingresar una observación');
      return false;
    }
    return true;
  }

  const agregar_propiedades_form_data = async () => {
    form_data.append('observacion', observacion);
    form_data.append('id_funcionario_resp_asignado', funcionario_responsable_reasignado_seleccionado.id_persona.toString());
    form_data.append('id_persona_operario_asignado', funcionario_operario_seleccionado.id_persona.toString());
    if ('name' in data_anexo_opcional) {
      form_data.append('anexo_opcional', data_anexo_opcional);
    }
    form_data.append('bienes_despachados', JSON.stringify(data_activos_asociados_agregados.map((item, index) => {
      return {
        id_bien_despachado: item.id_bien,
        nro_posicion_despacho: index + 1
      }
    })));
  }

  const guardar_reasignacion = async () => {
    const validacion_form = await validar_formulario();

    if (validacion_form) {
      await agregar_propiedades_form_data();
      Swal.fire({
        title: '¿Está seguro de reasignar el responsable',
        showDenyButton: true,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#042F4A',
        cancelButtonColor: '#DE1616',
        icon: 'question',
      }).then((result: any) => {
        if (result.isConfirmed) {
          crear_reasignacion();
          return true;
        }
      });
    }
  }

  const crear_reasignacion = async () => {
    set_loadding_btn_guardar_reasignacion(true);

    await dispatch(post_crear_reasignacion(form_data))
      .then((response: any) => {
        if (Object.keys(response).length !== 0) {
          if (response.success) {
            control_success('Reasignación realizada con éxito');
            set_loadding_btn_guardar_reasignacion(false);
            limpiar_campos();
            set_position_tab('1');
          } else {
            if (response.detail) {
              control_error(response.detail)
              set_loadding_btn_guardar_reasignacion(false);
            } else {
              control_error('Error interna al intentar aprobar el despacho');
              set_loadding_btn_guardar_reasignacion(false);
            }
            set_loadding_btn_guardar_reasignacion(false);
          }
        } else {
          control_error('Error interno al intentar aprobar el despacho');
          set_loadding_btn_guardar_reasignacion(false);
        }
      }
      )
  }

  return (
    <>
      <ModalBusquedaFuncionarios
        tipo_funcionario={tipo_funcionario}
        set_mostrar_modal_busqueda_funcionarios={set_mostrar_modal_busqueda_funcionarios}
        mostrar_modal_busqueda_funcionarios={mostrar_modal_busqueda_funcionarios}
        set_funcionario_operario_seleccionado={set_funcionario_operario_seleccionado}
        set_funcionario_responsable_actual_seleccionado={set_funcionario_responsable_actual_seleccionado}
        set_funcionario_responsable_reasignado_seleccionado={set_funcionario_responsable_reasignado_seleccionado}
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
          <Title title='Reasignar responsable' />
          <Box
            component={'form'}
            sx={{ mt: '20px' }}
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', }}>
                <TabList sx={{ minWidth: '100%' }} onChange={handle_tablist_change}>
                  <Tab sx={{ minWidth: '50%' }} label={'Busqueda funcionarios'} value="1" />
                  <Tab sx={{ minWidth: '50%' }} label={'Articulos'} value="2" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <BusquedaFuncionarios
                    set_tipo_funcionario={set_tipo_funcionario}
                    inputs_funcionarios={inputs_funcionarios}
                    set_inputs_funcionarios={set_inputs_funcionarios}
                    inputs_responsable={inputs_responsable}
                    set_inputs_responsable={set_inputs_responsable}
                    inputs_operario={inputs_operario}
                    set_inputs_operario={set_inputs_operario}
                    inputs_responsable_actual={inputs_responsable_actual}
                    set_inputs_responsable_actual={set_inputs_responsable_actual}
                    tipos_documentos={tipos_documentos}
                    set_mostrar_modal_busqueda_funcionarios={set_mostrar_modal_busqueda_funcionarios}
                    set_funcionario_responsable_reasignado_seleccionado={set_funcionario_responsable_reasignado_seleccionado}
                    set_funcionario_operario_seleccionado={set_funcionario_operario_seleccionado}
                    observacion={observacion}
                    set_observacion={set_observacion}
                    set_data_anexo_opcional={set_data_anexo_opcional}
                    data_anexo_opcional={data_anexo_opcional}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <Articulos
                    set_tipo_funcionario={set_tipo_funcionario}
                    inputs_funcionarios={inputs_funcionarios}
                    set_inputs_funcionarios={set_inputs_funcionarios}
                    inputs_responsable={inputs_responsable}
                    set_inputs_responsable={set_inputs_responsable}
                    inputs_responsable_actual={inputs_responsable_actual}
                    set_inputs_responsable_actual={set_inputs_responsable_actual}
                    tipos_documentos={tipos_documentos}
                    set_mostrar_modal_busqueda_funcionarios={set_mostrar_modal_busqueda_funcionarios}
                    set_funcionario_responsable_actual_seleccionado={set_funcionario_responsable_actual_seleccionado}
                    loadding_tabla_activos_asociados={loadding_tabla_activos_asociados}
                    data_activos_asociados={data_activos_asociados}
                    set_data_activos_asociados={set_data_activos_asociados}
                    data_activos_asociados_agregados={data_activos_asociados_agregados}
                    set_data_activos_asociados_agregados={set_data_activos_asociados_agregados}
                  />
                </Grid>
              </TabPanel>

            </TabContext>
          </Box>
        </Grid>

        <Grid container item xs={12} sx={{
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
              disabled={loadding_btn_guardar_reasignacion}
              onClick={() => guardar_reasignacion()}
            >
              Guardar
            </Button>
          </Grid>

          <Grid item xs={12} lg={2}>
            <Button
              fullWidth
              color="error"
              variant="contained"
              disabled={position_tab === '1'}
              startIcon={<ArrowBackIosIcon />}
              onClick={btn_atras}
            >
              Atras
            </Button>
          </Grid>

          <Grid item xs={12} lg={2}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              disabled={position_tab === '2'}
              startIcon={<NavigateNextIcon />}
              onClick={btn_siguiente}
            >
              Siguiente
            </Button>
          </Grid>

          <Grid item xs={12} lg={2}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              startIcon={<CleanIcon />}
              onClick={limpiar_campos}
            >
              Limpiar
            </Button>
          </Grid>

        </Grid>

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default ReasingnacionResponsable;