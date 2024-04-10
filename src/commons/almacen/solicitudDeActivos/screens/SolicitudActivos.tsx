import { Box, Button, CircularProgress, Grid, Tab } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SolicitudesRealizadas from './SolicitudesRealizadas';
import { useAppDispatch } from '../../../../hooks';
import { get_buscar_solicitudes_activos, get_obtener_solicitudes_realizadas, get_obtener_unidades_medidas, post_crear_solicitud_activos, put_editar_solicitud_activos, put_cancelar_solicitud } from '../thunks/solicitud_activos';
import dayjs, { Dayjs } from 'dayjs';
import { interface_articulos_agregados, interface_articulos_obtenidos_por_id, interface_busqueda_articulo, interface_busqueda_operario, interface_busqueda_responsable, interface_solicitudes_realizadas, interface_unidades_medidas, response_obtener_solicitudes_realizadas, response_solicitud_obtenida_por_id, response_unidades_medidas } from '../interfaces/types';
import { control_error, control_success } from '../../../../helpers';
import BusquedaFuncionarios from './BusquedaFuncionarios';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BusquedaArticulos from './BusquedaArticulos';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { convertir_cod_estado, validar_busqueda_articulos, validar_form_seleccion_funcionarios } from '../validations/validations';
import AddIcon from '@mui/icons-material/Add';
import { GridFilterModel } from '@mui/x-data-grid';



// eslint-disable-next-line @typescript-eslint/naming-convention
const SolicitudActivos = () => {
  const dispatch = useAppDispatch();

  const [loadding, set_loadding] = useState<boolean>(false);
  const [loadding_tabla_solicitudes_realizadas, set_loadding_tabla_solicitudes_realizadas] = useState<boolean>(false);
  const [position_tab, set_position_tab] = useState<string>('1');

  //estado para controlar el formulario segun la accion
  const [accion, set_accion] = useState<string>('null');

  // id solucitud de activo para poder editar o ver la solicitud
  const [id_solicitud_activo, set_id_solicitud_activo] = useState<number | null>(null);

  // Estados pantalla 1 - Solicitudes realizadas
  const [estado, set_estado] = useState<string>('');
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs | null>(null);
  const [fecha_fin, set_fecha_fin] = useState<Dayjs | null>(null);
  const [justificacion_anulacion, set_justificacion_anulacion] = useState<string>('');


  // Estados pantalla 2 - Busqueda funcionarios
  const [switch_solicitud_prestamo, set_switch_solicitud_prestamo] = useState<boolean>(false);
   // Datos del funcionario quien solicito
   const [tipo_documento_solicito, set_tipo_documento_solicito] = useState<string>('');
   const [documento_solicito, set_documento_solicito] = useState<string>('');
   const [nombres_solicito, set_nombres_solicito] = useState<string>('');
   const [apellidos_solicito, set_apellidos_solicito] = useState<string>('');
  // Datos del funcionario responsable
  const [tipo_documento_responsable, set_tipo_documento_responsable] = useState<string>('');
  const [documento_responsable, set_documento_responsable] = useState<string>('');
  const [nombres_responsable, set_nombres_responsable] = useState<string>('');
  const [apellidos_responsable, set_apellidos_responsable] = useState<string>('');
  // Datos del funcionario operario
  const [tipo_documento_operario, set_tipo_documento_operario] = useState<string>('');
  const [documento_operario, set_documento_operario] = useState<string>('');
  const [nombres_operario, set_nombres_operario] = useState<string>('');
  const [apellidos_operario, set_apellidos_operario] = useState<string>('');
  const [motivo, set_motivo] = useState<string>('');
  const [observaciones, set_observaciones] = useState<string>('');
  // Datos de la busqueda de funcionarios cuando se selecciona en los modales
  const [funcionario_responsable_seleccionado, set_funcionario_responsable_seleccionado] = useState<interface_busqueda_responsable>(Object);
  const [funcionario_operario_seleccionado, set_funcionario_operario_seleccionado] = useState<interface_busqueda_operario>(Object);
  // Estados cuando se esta viendo la solicitud
  const [fecha_devolucion_ver, set_fecha_devolucion_ver] = useState<Dayjs | null>(null);
  const [fecha_solicitud, set_fecha_solicitud] = useState<Dayjs | null>(null);
  const [fecha_cierre_solicitud, set_fecha_cierre_solicitud] = useState<Dayjs | null>(null);
  const [estado_solicitud, set_estado_solicitud] = useState<string>('');


  // Estados Pantalla 3 - Busqueda de articulos
  const [codigo_articulo, set_codigo_articulo] = useState<string>('');
  const [nombre_articulo, set_nombre_articulo] = useState<string>('');
  // Datos que se ingresan adicionalmente al seleccionar un articulo
  const [tipo_unidad_medida, set_tipo_unidad_medida] = useState<string>('');
  const [cantidad_articulo, set_cantidad_articulo] = useState<number>(0);
  const [fecha_devolucion, set_fecha_devolucion] = useState<Dayjs | null>(null);
  const [observacion, set_observacion] = useState<string>('');
  const [unidades_medidas, set_unidades_medidas] = useState<interface_unidades_medidas[]>([]);
  // Datos del articulo seleccionado del modal
  const [articulo_encontrado, set_articulo_encontrado] = useState<interface_busqueda_articulo>(Object); // se guarda el articulo seleccionado
  // Datos de los articulos agregados a la tabla
  const [data_articulos_agregados, set_data_articulos_agregados] = useState<interface_articulos_agregados[] | interface_articulos_obtenidos_por_id[]>([]);
  
  
  // Datos de la tabla de solicitudes realizadas
  const [data_solicitudes_realizadas, set_data_solicitudes_realizadas] = useState<interface_solicitudes_realizadas[]>([
    undefined as unknown as interface_solicitudes_realizadas,
    undefined as unknown as interface_solicitudes_realizadas,
    undefined as unknown as interface_solicitudes_realizadas,
    undefined as unknown as interface_solicitudes_realizadas,
    undefined as unknown as interface_solicitudes_realizadas,
  ]);

  // Si la accion es editar, entonces se filtra el tipo de unidad de medida del articulo seleccionado para mostrarlo en el campo
  useEffect(() => {
    if(accion === 'editar'){
      unidades_medidas.map((unidad_medida) => {
        if(articulo_encontrado.nombre_unidad_medida === unidad_medida.nombre){
          set_tipo_unidad_medida(unidad_medida.abreviatura);
        }
      });
    }
  },[accion, articulo_encontrado, unidades_medidas]);



  const get_obtener_solicitudes_realizadas_fc = () => {
    dispatch(get_obtener_solicitudes_realizadas(id_solicitud_activo))
    .then((response: response_solicitud_obtenida_por_id) => {
      if(Object.keys(response).length !== 0){
        if(response.success === true){
          set_switch_solicitud_prestamo(response.data.solicitud_prestamo);
          set_fecha_solicitud(dayjs(response.data.fecha_solicitud));
          set_fecha_devolucion_ver(response.data.fecha_devolucion ? dayjs(response.data.fecha_devolucion) : null);
          set_estado_solicitud(convertir_cod_estado(response.data?.estado_solicitud) ?? '');

          set_tipo_documento_solicito(response.data.tipo_documento_persona_solicita);
          set_documento_solicito(response.data.numero_documento_persona_solicita);
          set_nombres_solicito(response.data.primer_nombre_persona_solicita);
          set_apellidos_solicito(response.data.primer_apellido_persona_solicita);

          set_tipo_documento_responsable(response.data.tipo_documento_funcionario_resp_unidad);
          set_documento_responsable(response.data.numero_documento_funcionario_resp_unidad);
          set_nombres_responsable(response.data.primer_nombre_funcionario_resp_unidad);
          set_apellidos_responsable(response.data.primer_apellido_funcionario_resp_unidad);

          set_tipo_documento_operario(response.data.tipo_documento_persona_operario);
          set_documento_operario(response.data.numero_documento_persona_operario);
          set_nombres_operario(response.data.primer_nombre_persona_operario);
          set_apellidos_operario(response.data.primer_apellido_persona_operario);

          set_motivo(response.data.motivo);
          set_observaciones(response.data.observacion);
          set_data_articulos_agregados(response.data.items);        
        }
      } else {
        control_error('No se encontraron solicitudes');
      }
    })
  }

  useEffect(() => {
    if(accion === 'ver' || accion === 'editar'){
      get_obtener_solicitudes_realizadas_fc();
    }
  },[accion]);

  const get_buscar_solicites_activos = () => {
    set_loadding_tabla_solicitudes_realizadas(true);
    dispatch(get_buscar_solicitudes_activos(
      fecha_inicio ? fecha_inicio.format('YYYY-MM-DD') : '',
      fecha_fin ? fecha_fin.format('YYYY-MM-DD') : '',
      estado
    )).then((response: response_obtener_solicitudes_realizadas) => {
      if(Object.keys(response).length !== 0){
        set_data_solicitudes_realizadas(response.data);
        set_loadding_tabla_solicitudes_realizadas(false);
      } else {
        control_error('No se encontraron solicitudes');
        set_data_solicitudes_realizadas([]);
        set_loadding_tabla_solicitudes_realizadas(false);
      }
    })
  }

  const solicites_obtenidas = useRef(false);
  useEffect(() => {
    if(!solicites_obtenidas.current){
      get_buscar_solicites_activos();
      solicites_obtenidas.current = true;
    }
  }, [accion]);

  const get_obtener_unidades_medidas_fc = () => {
    dispatch(get_obtener_unidades_medidas())
    .then((response: response_unidades_medidas) => {
      if(Object.keys(response).length !== 0){
        if(response.success === true){
          set_unidades_medidas(response.data);
        } else {
          control_error('No se encontraron unidades de medida');
        }
      } else {
        control_error('Hubo un error al obtener las unidades de medida');
        set_unidades_medidas([]);
      }
    })
  }

  const unidades_medidas_obtenidas = useRef(false);
  useEffect(() => {
    if(!unidades_medidas_obtenidas.current && position_tab === '3'){
      get_obtener_unidades_medidas_fc();
      unidades_medidas_obtenidas.current = true;
    }
  }, [position_tab]);

  const handle_tablist_change = (event: React.SyntheticEvent, newValue: string) => {
    set_position_tab(newValue);
  };

  const limpiar_formularios_pantallas = () => {
    set_position_tab('1');
    set_accion('null');
    set_estado('');
    set_fecha_inicio(null);
    set_fecha_fin(null);
    set_switch_solicitud_prestamo(false);
    set_tipo_documento_responsable('');
    set_documento_responsable('');
    set_nombres_responsable('');
    set_apellidos_responsable('');
    set_tipo_documento_operario('');
    set_documento_operario('');
    set_nombres_operario('');
    set_apellidos_operario('');
    set_motivo('');
    set_observaciones('');
    set_funcionario_responsable_seleccionado({} as interface_busqueda_responsable);
    set_funcionario_operario_seleccionado({} as interface_busqueda_operario);
    set_codigo_articulo('');
    set_nombre_articulo('');
    set_tipo_unidad_medida('');
    set_cantidad_articulo(0);
    set_fecha_devolucion(null);
    set_observacion('');
    set_articulo_encontrado({} as interface_busqueda_articulo);
    set_data_articulos_agregados([]);
  }

  const [btn_continuar_disabled, set_btn_continuar_disabled] = useState<boolean>(false);

  useEffect(() => {
    if(position_tab === '3') {
      set_btn_continuar_disabled(true);
    } else {
      set_btn_continuar_disabled(false);
    }
    if(position_tab === '1' && accion !== 'null'){
      set_accion('null');
    }
  },[position_tab]);

  const btn_continuar = async() => {

    if(position_tab === '1' && accion === 'null'){
      set_accion('crear');
    }

    if(position_tab === '1') {
      set_position_tab('2');
    }
    
    if(position_tab === '2') {
      const form_seleccion_funcionarios = await validar_form_seleccion_funcionarios(
        accion,
        funcionario_operario_seleccionado,
        funcionario_responsable_seleccionado,
        motivo,
        observaciones
      );
      if(!form_seleccion_funcionarios){
        set_btn_continuar_disabled(false);
        set_position_tab('2');
        return;
      } else {
        set_position_tab('3');
      }
    }

    if(position_tab === '2') {
      const form_busqueda_articulos = await validar_busqueda_articulos(
        accion,
        articulo_encontrado,
        cantidad_articulo,
        fecha_devolucion,
        observacion
      );
      if(form_busqueda_articulos){
        set_position_tab('3');
        set_btn_continuar_disabled(true);
      } else {
        set_btn_continuar_disabled(false);
      }
    }
  }

  const btn_salir = () => {
    if(accion !== 'ver'){
      Swal.fire({
        title: '¿Se borrarán los datos ingresados, si sale de la pantalla?',
        showDenyButton: true,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#042F4A',
        cancelButtonColor: '#DE1616',
        icon: 'question',
      }).then( async(result: any) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          set_position_tab('1');
          limpiar_formularios_pantallas();
          
          return true;
        } else if(result.isDenied){
          return false;
        }
      });
    } else {
      set_position_tab('1');
      limpiar_formularios_pantallas();
    }
  }


  const onsubmit_form = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(accion === 'cancelar') {
      cancelar_solicitud_activos();
      return;
    }

    const form_seleccion_funcionarios = await validar_form_seleccion_funcionarios(
      accion,
      funcionario_operario_seleccionado,
      funcionario_responsable_seleccionado,
      motivo,
      observaciones
    );
    const form_busqueda_articulos = await validar_busqueda_articulos(
      accion,
      articulo_encontrado,
      cantidad_articulo,
      fecha_devolucion,
      observacion
    );

    if(form_seleccion_funcionarios && form_busqueda_articulos){
      if(accion === 'crear'){
        crear_solucion_activos();
      } else if(accion === 'editar') {
        editar_solicitud_activos();
      }
    }
  };

  const cancelar_solicitud_activos = () => {
    if(justificacion_anulacion === ''){
      control_error('El campo justificación de anulación es obligatorio');
      return;
    }

    Swal.fire({
      title: '¿Está seguro de cancelar la solicitud?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then(async(result) => {
      if (result.isConfirmed) {
        await dispatch(put_cancelar_solicitud(id_solicitud_activo,{
            justificacion_anulacion: justificacion_anulacion
          })).then((response: any) => {
            if(Object.keys(response).length !== 0){
              if(response.success){
                control_success('Solicitud cancelada correctamente');
                set_position_tab('1');
                limpiar_formularios_pantallas();
                set_justificacion_anulacion('');
                set_id_solicitud_activo(null);
                get_buscar_solicites_activos();
                solicites_obtenidas.current = false;
              } else {
                control_error('Hubo un error al cancelar la solicitud, recargue la página e intente nuevamente');
              }
            } else {
              control_error('Hubo un error al cancelar la solicitud');
            }
          }); 
      }
    });
  }

  const crear_solucion_activos = () => {
    Swal.fire({
      title: '¿Está seguro de crear la solicitud de activos?',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then( async(result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(post_crear_solicitud_activos({
          motivo: motivo,
          observacion: observaciones,
          id_funcionario_resp_unidad: funcionario_responsable_seleccionado.id_persona,
          id_persona_operario: funcionario_operario_seleccionado.id_persona,
          solicitud_prestamo: switch_solicitud_prestamo,
          items: data_articulos_agregados.map((articulo: any) => {
            return {
              id_bien: articulo.id_bien,
              cantidad: articulo.cantidad_articulo,
              fecha_devolucion: dayjs(articulo.fecha_devolucion).format('YYYY-MM-DD'),
              observacion: articulo.observacion,
              id_unidad_medida: articulo.id_unidad_medida
            }
          })
        })).then((response: any) => {
          if(Object.keys(response).length !== 0){
            if(response.success){
              control_success('Solicitud de activos creada correctamente');
              set_position_tab('1');
              limpiar_formularios_pantallas();
              get_buscar_solicites_activos();
              solicites_obtenidas.current = false;
            } else {
              control_error('Hubo un error al crear la solicitud de activos, recargue la página e intente nuevamente');
            }
          } else {
            control_error('Hubo un error al crear la solicitud de activos');
          }
        });

        set_position_tab('1');
        limpiar_formularios_pantallas();
        
        return true;
      } else if(result.isDenied){
        return false;
      }
    });
  }

  const editar_solicitud_activos = () => {
    Swal.fire({
      title: '¿Está seguro de editar la solicitud de activos?',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then( async(result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await dispatch(put_editar_solicitud_activos(id_solicitud_activo,{
          motivo: motivo,
          observacion: observaciones,
          id_funcionario_resp_unidad: funcionario_responsable_seleccionado.id_persona,
          id_persona_operario: funcionario_operario_seleccionado.id_persona,
          solicitud_prestamo: switch_solicitud_prestamo,
          items: (data_articulos_agregados as interface_articulos_agregados[]).map((articulo) => {
            return {
              id_bien: articulo.id_bien,
              fecha_devolucion: dayjs(articulo?.fecha_devolucion).format('YYYY-MM-DD'),
              observacion: articulo.observacion,
              id_unidad_medida: articulo.id_unidad_medida,
              nro_posicion: articulo?.nro_posicion,
              cantidad: articulo?.cantidad
            }
          })
        })).then((response: any) => {
          if(Object.keys(response).length !== 0){
            if(response.success){
              control_success('Solicitud de activos editada correctamente');
              set_position_tab('1');
              limpiar_formularios_pantallas();
              get_buscar_solicites_activos();
              solicites_obtenidas.current = false;
            } else {
              control_error('Hubo un error al editar la solicitud de activos, recargue la página e intente nuevamente');
            }
          } else {
            control_error('Hubo un error al editar la solicitud de activos');
          }
        });

        set_position_tab('1');
        limpiar_formularios_pantallas();
        set_id_solicitud_activo(null);
        
        return true;
      } else if(result.isDenied){
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
          <Title title="Solicitud de activos"></Title>
          <Box
            component={'form'}
            onSubmit={onsubmit_form}
            sx={{ mt: '20px' }}
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider',  width: '100%', }}>
                <TabList sx={{ minWidth: '100%' }} onChange={handle_tablist_change}>
                  <Tab disabled={accion !== 'null'} sx={{ minWidth: '33.3%' }} label="Solicitudes realizadas" value="1" />
                  <Tab disabled={accion === 'null' || accion === 'cancelar'} sx={{ minWidth: '33.3%' }} label={accion !== 'ver' ? "Selección de funcionarios" : "Funcionarios responsables"} value="2" />
                  <Tab disabled={accion === 'null' || accion === 'cancelar'} sx={{ minWidth: '33.3%' }} label={accion !== 'ver' ? "Búsqueda de  artículos" : "Artículos solicitados"} value="3" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <SolicitudesRealizadas
                    accion={accion}
                    set_accion={set_accion}
                    set_position_tab={set_position_tab}
                    estado={estado}
                    set_estado={set_estado}
                    set_id_solicitud_activo={set_id_solicitud_activo}
                    fecha_inicio={fecha_inicio}
                    set_fecha_inicio={set_fecha_inicio}
                    fecha_fin={fecha_fin}
                    set_fecha_fin={set_fecha_fin}
                    data_solicitudes_realizadas={data_solicitudes_realizadas}
                    get_buscar_solicites_activos={get_buscar_solicites_activos}
                    justificacion_anulacion={justificacion_anulacion}
                    set_justificacion_anulacion={set_justificacion_anulacion}
                    loadding_tabla_solicitudes_realizadas={loadding_tabla_solicitudes_realizadas}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <Grid container spacing={2} rowSpacing={7}>
                  <BusquedaFuncionarios
                    accion={accion}
                    switch_solicitud_prestamo={switch_solicitud_prestamo}
                    set_switch_solicitud_prestamo={set_switch_solicitud_prestamo}
                    tipo_documento_responsable={tipo_documento_responsable}
                    set_tipo_documento_responsable={set_tipo_documento_responsable}
                    documento_responsable={documento_responsable}
                    set_documento_responsable={set_documento_responsable}
                    nombres_responsable={nombres_responsable}
                    set_nombres_responsable={set_nombres_responsable}
                    apellidos_responsable={apellidos_responsable}
                    set_apellidos_responsable={set_apellidos_responsable}
                    tipo_documento_operario={tipo_documento_operario}
                    set_tipo_documento_operario={set_tipo_documento_operario}
                    documento_operario={documento_operario}
                    set_documento_operario={set_documento_operario}
                    nombres_operario={nombres_operario}
                    set_nombres_operario={set_nombres_operario}
                    apellidos_operario={apellidos_operario}
                    set_apellidos_operario={set_apellidos_operario}
                    motivo={motivo}
                    set_motivo={set_motivo}
                    observaciones={observaciones}
                    set_observaciones={set_observaciones}
                    funcionario_responsable_seleccionado={funcionario_responsable_seleccionado}
                    set_funcionario_responsable_seleccionado={set_funcionario_responsable_seleccionado}
                    funcionario_operario_seleccionado={funcionario_operario_seleccionado}
                    set_funcionario_operario_seleccionado={set_funcionario_operario_seleccionado}
                    tipo_documento_solicito={tipo_documento_solicito}
                    set_tipo_documento_solicito={set_tipo_documento_solicito}
                    documento_solicito={documento_solicito}
                    set_documento_solicito={set_documento_solicito}
                    nombres_solicito={nombres_solicito}
                    set_nombres_solicito={set_nombres_solicito}
                    apellidos_solicito={apellidos_solicito}
                    set_apellidos_solicito={set_apellidos_solicito}
                    set_fecha_devolucion_ver={set_fecha_devolucion_ver}
                    fecha_devolucion_ver={fecha_devolucion_ver}
                    set_fecha_solicitud={set_fecha_solicitud}
                    fecha_solicitud={fecha_solicitud}
                    set_estado_solicitud={set_estado_solicitud}
                    set_fecha_cierre_solicitud={set_fecha_cierre_solicitud}
                    fecha_cierre_solicitud={fecha_cierre_solicitud}
                    estado_solicitud={estado_solicitud}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="3" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <BusquedaArticulos
                    accion={accion}
                    unidades_medidas={unidades_medidas}
                    codigo_articulo={codigo_articulo}
                    set_codigo_articulo={set_codigo_articulo}
                    nombre_articulo={nombre_articulo}
                    set_nombre_articulo={set_nombre_articulo}
                    tipo_unidad_medida={tipo_unidad_medida}
                    set_tipo_unidad_medida={set_tipo_unidad_medida}
                    cantidad_articulo={cantidad_articulo}
                    set_cantidad_articulo={set_cantidad_articulo}
                    fecha_devolucion={fecha_devolucion}
                    set_fecha_devolucion={set_fecha_devolucion}
                    observacion={observacion}
                    set_observacion={set_observacion}
                    articulo_encontrado={articulo_encontrado}
                    set_articulo_encontrado={set_articulo_encontrado}
                    data_articulos_agregados={data_articulos_agregados}
                    set_data_articulos_agregados={set_data_articulos_agregados}
                  />
                </Grid>
              </TabPanel>
            </TabContext>

            <Grid item xs={12}  sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                marginTop: "20px",
                gap: 2,
              }}
              >
              {accion !== 'null' && 
                <Grid item xs={12} lg={2}>
                  <Button
                    fullWidth
                    color="success"
                    variant="contained"
                    disabled={loadding || accion === 'ver'}
                    startIcon={loadding ? <CircularProgress size={25} /> :<SaveIcon />}
                    type='submit'
                  >
                    {!loadding ? accion === 'crear' || accion === 'cancelar' ? "Guardar" : 'Actualizar' : ''}
                  </Button>
                </Grid>
              }
              
              {accion !== 'null' && 
                <Grid item xs={12} lg={2}>
                  <Button
                    fullWidth
                    disabled={position_tab === '1' && accion === 'null'}
                    color="error"
                    variant="contained"
                    startIcon={ position_tab === '2' && accion !== 'null' ? <CloseIcon /> :<ChevronLeftIcon />}
                    onClick={()=>{
                      if(position_tab === '2' && accion !== 'null'){
                        btn_salir();
                      } else if (position_tab === '1' && accion === 'cancelar'){
                        set_justificacion_anulacion('');
                        set_accion('null');
                      } else {
                        set_position_tab(position_tab === '1' ? '1' : (parseInt(position_tab) - 1).toString())
                      }
                    }}
                  >
                    {position_tab === '2' && accion !== 'null' ? 'Salir' : 'Atrás'}
                  </Button>
                </Grid>
              }

              {accion !== 'cancelar' &&
                <Grid item xs={12} lg={position_tab === '1' ? 3 : 2}>
                  <Button
                    fullWidth
                    type='button'
                    disabled={btn_continuar_disabled}
                    variant='contained'
                    color={position_tab === '1' && accion === 'null' ? 'success' : 'primary'}
                    endIcon={accion === 'null' && position_tab === '1' ? <AddIcon /> :  <KeyboardArrowRightIcon />}
                    onClick={()=>btn_continuar()}
                  >
                    {position_tab === '1' && accion === 'null' ? 'Crear nueva solicitud' : 'Continuar' }
                  </Button>
                </Grid>
              }

              {position_tab !== '1' && 
                <Grid item xs={12} lg={2}>
                  <Button
                    fullWidth
                    color="inherit"
                    variant="outlined"
                    disabled={accion === 'ver'}
                    startIcon={<CleanIcon />}
                    onClick={limpiar_formularios_pantallas}
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
};

// eslint-disable-next-line no-restricted-syntax
export default SolicitudActivos;