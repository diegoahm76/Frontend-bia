import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Box, Button, Grid, Tab } from '@mui/material';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ConfiguracionGeneral from './ConfiguracionGeneral';
import dayjs, { Dayjs } from 'dayjs';
import { interface_activos_asociados, interface_anexo_opcional, interface_entradas_relacionadas, interface_form_inf_tercero, interface_inf_tercero, interface_registro_por_consecutivo, response_activos_asociados, response_entradas_relacionadas, response_interface_registro_por_consecutivo } from '../interfaces/types';
import DetallesActivos from './DetallesActivos';
import { control_error, control_success } from '../../../../helpers';
import { useDispatch } from 'react-redux';
import { get_obtener_activos_asociados, get_obtener_entradas_relacionadas, post_crear_salida_especial } from '../thunks/salida_especial_activos';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';



// eslint-disable-next-line @typescript-eslint/naming-convention
const SalidaEspecialActivos: React.FC = () => {
  const dispatch = useDispatch();

  const [position_tab, set_position_tab] = useState<string>('1');
  const [loadding, set_loadding] = useState<boolean>(false);
  const [accion, set_accion] = useState<string>('null');

  // Form data para enviar los datos al backend
  const form_data = new FormData();

  const [loadding_registro_baja, set_loadding_registro_baja] = useState<boolean>(false);

  // Pantalla 1 - Configuración general
  const [consecutivo, set_consecutivo] = useState<number | null>(null);
  const [consecutivo_buscar, set_consecutivo_buscar] = useState<number>(0);
  const [fecha_salida, set_fecha_salida] = useState<Dayjs | null>(dayjs());
  const [form_inf_tercero, set_form_inf_tercero] = useState<interface_form_inf_tercero>(Object);
  const [referencia_salida, set_referencia_salida] = useState<string>('');
  const [concepto, set_concepto] = useState<string>('');
  const [data_anexos_opcionales, set_data_anexos_opcionales] = useState<interface_anexo_opcional[]>([]);
  const [data_anexos_agregados, set_data_anexos_agregados] = useState<File[]>([]);
  // Datos de la inf persona tercero seleccionado del modal
  const [data_inf_tercero_seleccionado, set_data_inf_tercero_seleccionado] = useState<interface_inf_tercero>(Object);

  // Entradas relacionadas al tercero seleccionado
  const [data_entradas_relacionadas, set_data_entradas_relacionadas] = useState<interface_entradas_relacionadas[]>([]);

  // Pantalla 2 - Detalles y activos
  const [loadding_tabla_activos_asociados, set_loadding_tabla_activos_asociados] = useState<boolean>(false);
  // Entrada relacionada seleccionada
  const [entrada_relacionada_seleccionada, set_entrada_relacionada_seleccionada] = useState<interface_entradas_relacionadas>(Object);
  // Activos asociados a la entrada seleccionada
  const [data_activos_asociados, set_data_activos_asociados] = useState<interface_activos_asociados[]>([]);
  // Activos asociados agregados desde la tabla de activos asociados
  const [data_activos_asociados_agregados, set_data_activos_asociados_agregados] = useState<interface_activos_asociados[]>([]);


  // Data de el registro por consecutivo
  const [data_registro_por_consecutivo, set_data_registro_por_consecutivo] = useState<response_interface_registro_por_consecutivo>(Object);

  useEffect(() => {
    // Agregamos toda la data de data_registro_por_consecutivo a sus respectivos campos solo si accion es igual a ver
    if (accion === 'ver') {
      if (Object.keys(data_registro_por_consecutivo).length === 0) return;

      set_concepto(data_registro_por_consecutivo.salida_especial.concepto);
      set_referencia_salida(data_registro_por_consecutivo.salida_especial.referencia_salida);
      set_fecha_salida(dayjs(data_registro_por_consecutivo.salida_especial.fecha_salida));
      set_data_anexos_opcionales(data_registro_por_consecutivo.anexos?.map((item: any) => {
        return {
          id_anexo: item.id_anexo_doc_alma,
          id_salida_espec_arti: item.id_salida_espec_arti,
          nombre_anexo: item.nombre_anexo,
          nro_folios: item.nro_folios,
          descripcion_anexo: item.descripcion_anexo,
          fecha_creacion_anexo: item.fecha_creacion_anexo,
          id_archivo_digital: item.id_archivo_digital
        }
      }));
      set_data_activos_asociados_agregados(data_registro_por_consecutivo.bienes?.map((item: any) => {
        return {
          id_item_entrada_almacen: item.id_item_entrada_almacen,
          id_entrada_almacen: item.id_entrada_almacen,
          id_bien: item.id_bien,
          codigo: item.codigo_bien,
          serial_placa: item.serie_placa,
          nombre: item.nombre_bien,
          marca: item.nombre_marca,
        }
      }));
      set_form_inf_tercero({
        tipo_documento: data_registro_por_consecutivo.informacion_tercero[0].tipo_documento,
        documento: data_registro_por_consecutivo.informacion_tercero[0].numero_documento,
        nombres_apellidos: data_registro_por_consecutivo.informacion_tercero[0].nombre
      });
      /*set_entrada_relacionada_seleccionada(data_registro_por_consecutivo.salida_especial);
      set_data_activos_asociados_agregados(data_registro_por_consecutivo.bienes);
      set_data_anexos_agregados(data_registro_por_consecutivo.archivos_digitales);
      set_data_inf_tercero_seleccionado(data_registro_por_consecutivo.salida_especial);*/
    }

  }, [accion, data_registro_por_consecutivo])

  useEffect(() => {
    if (accion !== 'ver') {
      if (Object.keys(data_inf_tercero_seleccionado).length !== 0) {
        set_accion('crear');
      } else if (referencia_salida.trim() !== '') {
        set_accion('crear');
      } else if (concepto.trim() !== '') {
        set_accion('crear');
      } else if (form_inf_tercero.tipo_documento !== undefined && form_inf_tercero.tipo_documento !== '') {
        set_accion('crear');
      } else if (form_inf_tercero.documento !== undefined && form_inf_tercero.documento !== '') {
        set_accion('crear');
      }
    }
  }, [accion, data_inf_tercero_seleccionado, concepto, referencia_salida, form_inf_tercero]);


  const get_obtener_entradas_relacionadas_fc = async (id_persona: string) => {
    await dispatch(get_obtener_entradas_relacionadas(id_persona))
      .then((response: response_entradas_relacionadas) => {
        if (Object.keys(response).length !== 0) {
          if (response.data.length > 0) {
            set_data_entradas_relacionadas(response.data);
            control_success('Entradas relacionadas obtenidas correctamente');
          } else {
            set_data_entradas_relacionadas([]);
            control_error('No se encontraron entradas relacionadas');
          }
        } else {
          control_error('Hubo un error al intentar obtener las entradas relacionadas');
        }
      });
  }

  const get_obtener_activos_asociados_fc = async (id_entrada_almacen: string) => {
    set_loadding_tabla_activos_asociados(true);
    await dispatch(get_obtener_activos_asociados(id_entrada_almacen))
      .then((response: response_activos_asociados) => {
        if (Object.keys(response).length !== 0) {
          if (response.data.length > 0) {
            set_data_activos_asociados(response.data);
            set_loadding_tabla_activos_asociados(false);
          } else {
            set_data_activos_asociados([]);
            set_loadding_tabla_activos_asociados(false);
            control_error('No se encontraron activos asociados con la que seleccionó');
          }
        } else {
          set_loadding_tabla_activos_asociados(false);
          control_error('Hubo un error al intentar obtener los activos asociados de la entrada seleccionada');
        }
      });
  }

  // Cargar los activos asociados a la entrada seleccionada
  useEffect(() => {
    if (Object.keys(entrada_relacionada_seleccionada).length > 0) {
      get_obtener_activos_asociados_fc(entrada_relacionada_seleccionada.id_entrada_almacen.toString());
    }
  }, [entrada_relacionada_seleccionada]);

  // Cargar datos de la inf persona tercero seleccionado del modal
  useEffect(() => {
    if (Object.keys(data_inf_tercero_seleccionado).length > 0) {
      set_form_inf_tercero({
        id_persona_tercero: data_inf_tercero_seleccionado.id_persona,
        tipo_documento: data_inf_tercero_seleccionado.tipo_documento,
        documento: data_inf_tercero_seleccionado.numero_documento,
        nombres: `${data_inf_tercero_seleccionado.primer_nombre ?? ''} ${data_inf_tercero_seleccionado.segundo_nombre ?? ''}`,
        apellidos: `${data_inf_tercero_seleccionado.primer_apellido ?? ''} ${data_inf_tercero_seleccionado.segundo_apellido ?? ''}`
      });

      // Obtener entradas relacionadas del tercero seleccionado
      get_obtener_entradas_relacionadas_fc(data_inf_tercero_seleccionado.id_clase_tercero_persona.toString());
    }
  }, [data_inf_tercero_seleccionado]);

  const handle_tablist_change = (event: SyntheticEvent, newValue: string): void => {
    set_position_tab(newValue);
    if (newValue === '1') {
      /* AQUI SE PUEDEN HACER ACCIONES EN DADO CASO QUE SE SELECIONE UNA PAGINA O LA OTRA */
    }
  };

  const limpiar_formulario = () => {
    set_position_tab('1');
    set_accion('null');
    set_consecutivo_buscar(0);
    set_concepto('');
    set_referencia_salida('');
    set_form_inf_tercero({} as interface_form_inf_tercero);
    set_data_inf_tercero_seleccionado({} as interface_inf_tercero);
    set_data_entradas_relacionadas([]);
    set_data_activos_asociados([]);
    set_data_activos_asociados_agregados([]);
    set_data_anexos_opcionales([]);
    set_data_anexos_agregados([]);
    set_data_registro_por_consecutivo({} as response_interface_registro_por_consecutivo);
  }

  const btn_continuar = () => {
    set_position_tab('2');
  }

  const validar_formulario = async() => {
    if (concepto.trim() === '') {
      control_error('El concepto es requerido');
      return false;
    }
    if (referencia_salida.trim() === '') {
      control_error('La referencia de la salida es requerida');
      return false;
    }
    if (Object.keys(data_inf_tercero_seleccionado).length === 0) {
      control_error('Debe seleccionar un tercero');
      return false;
    }
    if (Object.keys(entrada_relacionada_seleccionada).length === 0) {
      control_error('Debe seleccionar una entrada relacionada');
      return false;
    }
    if (data_activos_asociados_agregados.length === 0) {
      control_error('Debe seleccionar al menos un activo');
      return false;
    }
    return true;
  }

  const onsubmit_form = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ordenar_data_anexos();

    const form_validado = await validar_formulario();

    if(form_validado){
      Swal.fire({
        title: '¿Está seguro que desea registrar esta salida especial?',
        showDenyButton: true,
        confirmButtonText: `Si`,
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#042F4A',
        cancelButtonColor: '#DE1616',
        icon: 'question',
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          crear_salida_especial_activos();
          return true;
        } else if (result.isDenied) {
          return false;
        }
      });
    }
  }

  function crear_salida_especial_activos() {
    set_loadding(true);

    form_data.append('referencia_salida', referencia_salida);
    form_data.append('concepto_salida', concepto);
    form_data.append('id_entrada_almacen', entrada_relacionada_seleccionada.id_entrada_almacen?.toString());
    form_data.append('activos_incluidos', data_activos_asociados_agregados.map(item => item.id_bien).join(","));
    form_data.append('anexos', JSON.stringify(data_anexos_opcionales.map((item) => {
      return {
        nombre_anexo: item.nombre_anexo,
        nro_folios: item.nro_folios,
        descripcion_anexo: item.descripcion_anexo,
      }
    })));

    // Agregar los archivos al form data - Se envian varias keys con el mismo nombre para que el backend
    // pueda recibir varios archivos
    let files = data_anexos_agregados.map(item => new File([item], item.name, { type: item.type }));
    files.forEach(file => form_data.append('anexo_opcional', file));


    dispatch(post_crear_salida_especial(form_data))
      .then((response: any) => {
        if (Object.keys(response).length !== 0) {
          if (response.success) {
            control_success('Salida especial registrada correctamente');
            set_position_tab('1');
            set_loadding(false);
            limpiar_formulario();
          } else {
            control_error('Hubo un error al intentar registrar la salida especial');
            set_loadding(false);
          }
        } else {
          control_error('Hubo un error al intentar registrar la salida especial');
          set_loadding(false);
        }
      });
  }

  // Ordena los anexos y el array de files para enviar
  function ordenar_data_anexos() {
    if (data_anexos_agregados.length > 0) {
      set_data_anexos_agregados([...data_anexos_agregados].sort((a, b) => b.lastModified - a.lastModified));
    }
    if (data_anexos_opcionales.length > 0) {
      set_data_anexos_opcionales([...data_anexos_opcionales].sort((a, b) => (b.id_file ?? 0) - (a.id_file ?? 0)));
    }
  }

  const btn_salir = () => {
    Swal.fire({
      title: '¿Está seguro que desea salir?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        limpiar_formulario();
        set_accion('null');
        return true;
      } else if (result.isDenied) {
        return false;
      }
    });
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
          <Title title="Registrar salida especial activos" />
          <Box
            component={'form'}
            onSubmit={onsubmit_form}
            noValidate
            sx={{ mt: '20px' }}
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', }}>
                <TabList sx={{ minWidth: '100%' }} onChange={handle_tablist_change}>
                  <Tab sx={{ minWidth: '50%' }} label="Configuración general" value="1" />
                  <Tab sx={{ minWidth: '50%' }} label="Detalles y activos" value="2" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <ConfiguracionGeneral
                    form_data={form_data}
                    set_loadding_registro_baja={set_loadding_registro_baja}
                    loadding_registro_baja={loadding_registro_baja}
                    set_accion={set_accion}
                    accion={accion}
                    set_consecutivo={set_consecutivo}
                    consecutivo={consecutivo}
                    set_consecutivo_buscar={set_consecutivo_buscar}
                    consecutivo_buscar={consecutivo_buscar}
                    fecha_salida={fecha_salida}
                    concepto={concepto}
                    set_concepto={set_concepto}
                    referencia_salida={referencia_salida}
                    set_referencia_salida={set_referencia_salida}
                    set_form_inf_tercero={set_form_inf_tercero}
                    form_inf_tercero={form_inf_tercero}
                    set_data_inf_tercero_seleccionado={set_data_inf_tercero_seleccionado}
                    data_anexos_opcionales={data_anexos_opcionales}
                    set_data_anexos_opcionales={set_data_anexos_opcionales}
                    data_entradas_relacionadas={data_entradas_relacionadas}
                    data_anexos_agregados={data_anexos_agregados}
                    set_data_anexos_agregados={set_data_anexos_agregados}
                    ordenar_data_anexos={ordenar_data_anexos}
                    set_data_registro_por_consecutivo={set_data_registro_por_consecutivo}
                    data_registro_por_consecutivo={data_registro_por_consecutivo}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <DetallesActivos
                  accion={accion}
                  data_entradas_relacionadas={data_entradas_relacionadas}
                  data_activos_asociados={data_activos_asociados}
                  set_data_activos_asociados={set_data_activos_asociados}
                  data_activos_asociados_agregados={data_activos_asociados_agregados}
                  set_data_activos_asociados_agregados={set_data_activos_asociados_agregados}
                  set_entrada_relacionada_seleccionada={set_entrada_relacionada_seleccionada}
                  loadding_tabla_activos_asociados={loadding_tabla_activos_asociados}
                  data_registro_por_consecutivo={data_registro_por_consecutivo}
                />
              </TabPanel>
            </TabContext>

            <Grid item xs={12} sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              marginTop: "20px",
              gap: 2,
            }}
            >
              {accion !== 'ver' &&
                <Grid item xs={12} lg={2}>
                  <Button
                    fullWidth
                    color="success"
                    variant="contained"
                    disabled={loadding || accion === 'ver'}
                    startIcon={loadding ? <CircularProgress size={25} /> : <SaveIcon />}
                    type='submit'
                  >
                    {loadding ? '' : accion === 'ver' ? "Guardar" : accion === 'crear' ? 'Guardar' : accion === 'null' && 'Guardar'}
                  </Button>
                </Grid>
              }

              {accion === 'ver' &&
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

              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  disabled={position_tab === '1'}
                  color="error"
                  variant="contained"
                  startIcon={<ChevronLeftIcon />}
                  onClick={() => { set_position_tab(position_tab === '1' ? '1' : (parseInt(position_tab) - 1).toString()) }}
                >
                  Atrás
                </Button>
              </Grid>

              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  type='button'
                  variant='contained'
                  disabled={loadding || position_tab === '2'}
                  color='primary'
                  endIcon={<KeyboardArrowRightIcon />}
                  onClick={() => btn_continuar()}
                >
                  Continuar
                </Button>
              </Grid>

              {accion !== 'ver' &&
                <Grid item xs={12} lg={2}>
                  <Button
                    fullWidth
                    color="inherit"
                    variant="outlined"
                    startIcon={<CleanIcon />}
                    disabled={accion === 'ver' || loadding}
                    onClick={limpiar_formulario}
                  >
                    Limpiar
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
export default SalidaEspecialActivos;
