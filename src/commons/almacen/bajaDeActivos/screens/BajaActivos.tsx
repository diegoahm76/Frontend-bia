import { Box, Button, Grid, Tab } from '@mui/material';
import React, { SyntheticEvent, useState, useEffect, useRef } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ConfiguracionGeneral from './ConfiguracionGeneral';
import DetallesAnexo from './DetallesAnexo';
import dayjs, { Dayjs } from 'dayjs';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useAppDispatch } from "../../../../hooks";
import { get_obtener_consecutivo, get_obtener_registro_baja, post_enviar_baja_activos, put_editar_baja_activos } from '../thunks/baja_activos';
import { interface_busqueda_avanzada_bienes, response_obtener_consecutivo } from '../interfaces/types';
import { control_error, control_success } from '../../../../helpers';
import CircularProgress from '@mui/material/CircularProgress';
import { control_info } from '../../../gestorDocumental/alertasgestor/utils/control_error_or_success';
import Swal from 'sweetalert2';
import AnexosOpcionales from './AnexosOpcionales';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';



/**
 * Componente BajaActivos - Modulo de baja de activos
 * El cual contiene dos pestañas, una para la configuracion general y otra para los detalles y anexos
 * 
 * Este modulo edita, crea y ve el registro de baja de activos.
 * Se maneja un estado de 'accion' que puede ser 'crear', 'editar' o 'ver'
 * 
 * En la pestaña de configuracion general se encuentra el formulario para el registro de baja de activos
 * 
 * En la pestaña de detalles y anexos se encuentra el formulario para los detalles y 
 * anexos del registro de baja de activos
 *  
 * @returns 
 * @void
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
const BajaActivos: React.FC = () => {
  const dispatch = useAppDispatch();

  const [position_tab, set_position_tab] = useState<string>('1');
  const [formulario_valido, set_formulario_valido] = useState<boolean>(false);

  const  [loadding, set_loadding] = useState<boolean>(false);
  const  [loadding_registro_baja, set_loadding_registro_baja] = useState<boolean>(false);

  const [accion, set_accion] = useState<string>('crear'); // [crear, editar, ver]

  //Pagina 1 - Estados - Configuracion general
  const [fecha_registro, set_fecha_registro] = useState<Dayjs | null>(dayjs());
  const [concepto, set_concepto] = useState<string>('');
  const [consecutivo, set_consecutivo] = useState<number | null>(null);
  const [consecutivo_buscar, set_consecutivo_buscar] = useState<number>(0);
  const [id_baja_activo, set_id_baja_activo] = useState<number | null>(null);

  //Pagina 2 - Estados - Detalles y anexos
  const [fecha_anexo_obligatorio, set_fecha_anexo_obligatorio] = useState<Dayjs | null>(dayjs());
  const [numero_folios, set_numero_folios] = useState<number>(0);
  const [descripcion_anexo_obligatorio, set_descripcion_anexo_obligatorio] = useState<string>('');
  const [data_anexo_obligatorio, set_data_anexo_obligatorio] = useState<any>(Object);
  const [hay_anexo_seleccionado, set_hay_anexo_seleccionado] = useState<boolean>(false);

  //Pagina 2 - data de la tabla de bienes seleccionados
  const [bienes_seleccionados, set_bienes_seleccionados] = useState<interface_busqueda_avanzada_bienes[]>([]);

  //FormData de todo el formulario del modulo, para mas adelante agregar los campos del formulario
  const form_data = new FormData();

  //Si el usuario ingresa un consecutivo para buscar,
  //Estado que guarda el registro de baja de activos encontrado
  const [data_registro_baja, set_data_registro_baja] = useState<any>(Object);


  /**
   * Hook que se ejecuta cuando el estado de la accion cambia
   * Si la accion es 'editar' y el objeto data_registro_baja no esta vacio, entonces 
   * se llenaran los campos del formulario
   * con la informacion del registro de baja de activos
   * @returns
   * @void
   */
  useEffect(() => {
    if(accion === 'editar' && Object.keys(data_registro_baja).length !== 0) {
      console.log(dayjs(data_registro_baja.anexos[0].fecha_creacion_anexo));
      set_hay_anexo_seleccionado(true);
      set_fecha_registro(dayjs(data_registro_baja.fecha_baja));
      set_concepto(data_registro_baja.concepto);
      set_bienes_seleccionados(data_registro_baja.items);
      set_fecha_anexo_obligatorio(dayjs(data_registro_baja.anexos[0].fecha_creacion_anexo));
      set_numero_folios(data_registro_baja.anexos[0].nro_folios);
      set_descripcion_anexo_obligatorio(data_registro_baja.anexos[0].descripcion_anexo);
    }
  },[data_registro_baja, accion]);

  //Si el consecutivo a buscar es 0, entonces se limpiaran todos los campos del formulario
  useEffect(() => {
    if(consecutivo_buscar === 0) {
      set_accion('crear');
      set_data_registro_baja({} as any);
      if(accion === 'editar'){
        set_hay_anexo_seleccionado(false);
        limpiar_formulario();
      }
    }
  }),[consecutivo_buscar, accion];
  useEffect(() => {
    console.log(hay_anexo_seleccionado);
  },[hay_anexo_seleccionado]);


  /**
   * Hook que se ejecuta cuando el consecutivo encontrado es diferente al que se busca
   * Si el consecutivo encontrado es diferente al que se busca, se limpiaran todos los campos del formulario
   * y se mostrara una alerta
   * @returns
   * @boolean
   */
  const alerta_consecutivo = useRef<boolean>(false);
  useEffect(() => {
    if(accion === 'editar') {
      if(consecutivo !== consecutivo_buscar) {
        set_hay_anexo_seleccionado(false);
        set_data_registro_baja({} as any);
        set_fecha_registro(dayjs());
        set_concepto('');
        set_fecha_anexo_obligatorio(dayjs());
        set_numero_folios(0);
        set_descripcion_anexo_obligatorio('');
        set_data_anexo_obligatorio({} as any);
        set_bienes_seleccionados([]);
        if(!alerta_consecutivo.current) {
          control_info('Si cambia el consecutivo mientras edita o ve el registro, se limpiaran todos los campos del formulario');
          alerta_consecutivo.current = true;
        }
      }
      
    }
  },[consecutivo, consecutivo_buscar]);


  /**
   * Funcion que obtiene el consecutivo de la baja de activos
   * @returns
   * @async
   */
  const get_obtener_consecutivo_fc = async() => {
    dispatch(get_obtener_consecutivo())
      .then((response: response_obtener_consecutivo) => {
        if(Object.keys(response).length !== 0 && response.success === true) {
          set_consecutivo(response.data.consecutivo_por_baja);
          set_consecutivo(response.data.consecutivo_por_baja);
        } else {
          set_consecutivo(null);
          set_consecutivo(null);
          control_error('No se pudo obtener el consecutivo');
        }
      }
    )
  }

  /**
   * Funcion que obtiene el consecutivo de la baja de activos solo una vez
   * usando el hook useRef para que no se ejecute en cada renderizado
   * @returns
   * @void
   */
  const consecutivo_obtenido = useRef<boolean>(false);
  useEffect(() => {
    if(!consecutivo_obtenido.current) {
      get_obtener_consecutivo_fc();
      consecutivo_obtenido.current = true;
    }
  },[]);
  
  /**
   * Funcion que obtiene el registro de baja de activos
   * @returns
   * @async
   * @void
   */
  const get_obtener_registro_baja_fc = async() => {
    dispatch(get_obtener_registro_baja(consecutivo_buscar))
      .then((response: any) => {
        if(Object.keys(response).length !== 0) {
          if(response.success) {
            set_data_registro_baja(response.data);
            set_id_baja_activo(response.data.id_baja_activo);
            set_loadding_registro_baja(false);
            alerta_consecutivo.current = false;
            control_success('Se encontró la baja de activos asociada al consecutivo proporcionado');
          } else {
            set_data_registro_baja({} as any);
            set_id_baja_activo(null);
            set_loadding_registro_baja(false);
            set_accion('crear');
            alerta_consecutivo.current = false;
            control_error('No se encontró la baja de activos asociada al consecutivo proporcionado');
          }
        } else {
          set_data_registro_baja({} as any);
          set_id_baja_activo(null);
          console.log(response);
        }
      }
    )
  }
  
  /**
   * Funcion que cambia el valor de la pestaña seleccionada
   * @param event 
   * @param newValue 
   */
  const handle_tablist_change = (event: SyntheticEvent, newValue: string): void => {
    set_position_tab(newValue);
    if (newValue === '1') {
      /* AQUI SE PUEDEN HACER ACCIONES EN DADO CASO QUE SE SELECIONE UNA PAGINA O LA OTRA */
    }
  };

  /**
   * Funcion que limpia el formulario
   * @returns
   * @void
   */
  const limpiar_formulario = () => {
    set_fecha_registro(dayjs());
    set_concepto('');
    set_consecutivo_buscar(0);
    set_fecha_anexo_obligatorio(dayjs());
    set_numero_folios(0);
    set_descripcion_anexo_obligatorio('');
    set_data_anexo_obligatorio({} as any);
    set_bienes_seleccionados([]);
  }

  /**
   * Funcion que valida los campos del formulario de detalles y anexos
   * @returns 
   * @boolean
   */
  const validar_from_detalles_anexos: ()=>Promise<boolean> = async() => {
    if(concepto === '' && position_tab !== '1') {
      control_error('El concepto en Configuración General, no puede estar vacio');
      return false;
    } else if (numero_folios === 0) {
      control_error('Numero de folios del anexo obligatorio no puede estar vacio');
      return false;
    } else if(descripcion_anexo_obligatorio === ''){
      control_error('La descripcion del anexo obligatorio no puede estar vacio');
      return false;
    } else if(bienes_seleccionados?.length === 0){
      control_error('No se han seleccionado bienes');
      return false;
    } else if(accion === 'crear' && !('name' in data_anexo_obligatorio)){
      control_error('No se ha seleccionado un anexo obligatorio');
      return false;
    } else if(bienes_seleccionados.some((bien) => bien.justificacion_baja_activo?.trim() === '')){
      control_error('No puede haber bienes sin justificación de baja de activo en la tabla de bienes seleccionados');
      return false;
    }
    return true;
  }

  const validar_form_configuracion_general: ()=> Promise<boolean> = async() => {
    if(concepto === ''){
      control_error('El campo concepto no puede estar vacio');
      set_formulario_valido(false);
      return false;
    }
    return true;
  }


  /**
   * Funcion que envia el formulario de baja de activos
   * @returns
   * @async
   * @param event
   */
  const onsubmit_form = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Validar campos de todo el formulario del modulo
    const form_detalles_anexos_valido = await validar_from_detalles_anexos();

    if(formulario_valido && form_detalles_anexos_valido) {
      form_data.append('concepto', concepto);
      form_data.append('nro_folios', numero_folios.toString());
      form_data.append('descripcion_anexo', descripcion_anexo_obligatorio);
      form_data.append('bienes', JSON.stringify(bienes_seleccionados.map((bien)=>{
        return {
          id_bien: bien.id_bien,
          justificacion_baja_activo: bien.justificacion_baja_activo,
        }
      })));

      /** 
       * Si la accion es 'crear' entonces se envia el anexo obligatoriamente
       * Si la accion es 'editar' entonces se envia el anexo si hay un anexo seleccionado ya que es
       * opcional enviar anexo en la edicion
      */
      if(accion === 'crear') {
        form_data.append('anexo', data_anexo_obligatorio);
      } else if(accion === 'editar') {
        if('name' in data_anexo_obligatorio) {
          form_data.append('anexo', data_anexo_obligatorio);
        }
      }

      /**
       * Si la accion es 'crear' entonces se envia el formulario
       * Si la accion es 'editar' entonces se edita el formulario
       */
      if(accion === 'crear') {
        enviar_baja_activos();
      } else if(accion === 'editar') {
        editar_baja_activos();
      }

    } else {
      set_loadding(false);
    }
  }

  /**
   * Funcion que envia el formulario de baja de activos
   * @returns
   * @async
   */
  const enviar_baja_activos = () => {
    Swal.fire({
      title: '¿Está seguro que desea enviar este registro de baja de activos?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then( async(result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        set_loadding(true);
        await dispatch(post_enviar_baja_activos(form_data))
          .then((response: any) => {
            if(Object.keys(response).length !== 0 && response.success) {
              console.log(response);
              set_loadding(false);
              control_success('Se envio la baja de activos');
              limpiar_formulario();
              get_obtener_consecutivo_fc();
              set_position_tab('1');
            } else {
              set_loadding(false);
              control_error('No se pudo enviar la baja de activos');
            }
          }
          );
        return true;
      } else if(result.isDenied){
        set_loadding(false);
        return false;
      }
    });
  }


  /**
   * Funcion que edita el formulario de baja de activos
   * @returns
   * @async
   */
  const editar_baja_activos = () => {
    Swal.fire({
      title: '¿Está seguro que desea editar este registro de baja de activos?',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then( async(result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        set_loadding(true);
        await dispatch(put_editar_baja_activos(consecutivo?.toString() ,form_data))
          .then((response: any) => {
            if(Object.keys(response).length !== 0 && response.success) {
              console.log(response);
              set_loadding(false);
              control_success('Se envio la edicion de la baja de activos');
              limpiar_formulario();
              set_position_tab('1');
            } else {
              set_loadding(false);
              control_error('No se pudo enviar la edicion de la baja de activos');
            }
          }
          );
        return true;
      } else if(result.isDenied){
        set_loadding(false);
        return false;
      }
    });
  }

  const [btn_continuar_disabled, set_btn_continuar_disabled] = useState<boolean>(false);

  useEffect(() => {
    if(position_tab === '2' && accion === 'crear') {
      set_btn_continuar_disabled(true);
    } else {
      set_btn_continuar_disabled(false);
    }
    if(position_tab === '1' && accion === 'crear') {
      set_btn_continuar_disabled(false);
    }
    if(position_tab === '3') {
      set_btn_continuar_disabled(true);
    }
  },[position_tab]);

  const btn_continuar = async() => {
    const form_configuracion_general_valido = await validar_form_configuracion_general();
    
    if(position_tab === '1' && !form_configuracion_general_valido) {
      set_btn_continuar_disabled(false);
      set_position_tab('1');
      set_formulario_valido(false);
      return;
    } else {
      set_formulario_valido(true);
      set_position_tab('2');
    }

    if(position_tab === '2' && accion !== 'crear') {
      const form_detalles_anexos_valido = await validar_from_detalles_anexos();
      if(form_detalles_anexos_valido){
        set_position_tab('3');
        set_btn_continuar_disabled(true);
      } else {
        set_btn_continuar_disabled(false);
      }
    }
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
          <Title title="Registro de baja de activos"></Title>
          <Box
            component={'form'}
            onSubmit={onsubmit_form}
            sx={{ mt: '20px' }}
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider',  width: '100%', }}>
                <TabList sx={{ minWidth: '100%' }} onChange={handle_tablist_change}>
                  <Tab sx={{ minWidth: accion === 'ver' || accion === 'editar' ? '33.3%' : '50%'}} label="Configuración general" value="1" />
                  <Tab sx={{ minWidth: accion === 'ver' || accion === 'editar' ? '33.3%' : '50%'}} disabled={!formulario_valido} label="Detalles y anexo" value="2" />
                  {accion !== 'ver' ? accion === 'editar' &&
                    <Tab sx={{ minWidth: '33.3%' }} disabled={!formulario_valido} label="Anexos opcionales" value="3" />
                    : null
                  }
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <ConfiguracionGeneral
                    set_loadding_registro_baja={set_loadding_registro_baja}
                    loadding_registro_baja={loadding_registro_baja}
                    set_accion={set_accion}
                    accion={accion}
                    fecha_registro={fecha_registro}
                    set_fecha_registro={set_fecha_registro}
                    concepto={concepto}
                    set_concepto={set_concepto}
                    consecutivo={consecutivo}
                    set_consecutivo={set_consecutivo}
                    set_formulario_valido={set_formulario_valido}
                    set_position_tab={set_position_tab}
                    set_consecutivo_buscar={set_consecutivo_buscar}
                    consecutivo_buscar={consecutivo_buscar}
                    get_obtener_registro_baja_fc={get_obtener_registro_baja_fc}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <DetallesAnexo 
                  accion={accion}
                  fecha_anexo_obligatorio={fecha_anexo_obligatorio}
                  set_fecha_anexo_obligatorio={set_fecha_anexo_obligatorio}
                  numero_folios={numero_folios}
                  set_numero_folios={set_numero_folios}
                  descripcion_anexo_obligatorio={descripcion_anexo_obligatorio}
                  set_descripcion_anexo_obligatorio={set_descripcion_anexo_obligatorio}
                  bienes_seleccionados={bienes_seleccionados}
                  set_bienes_seleccionados={set_bienes_seleccionados}
                  data_anexo_obligatorio={data_anexo_obligatorio}
                  set_data_anexo_obligatorio={set_data_anexo_obligatorio}
                  set_hay_anexo_seleccionado={set_hay_anexo_seleccionado}
                  hay_anexo_seleccionado={hay_anexo_seleccionado}
                />
              </TabPanel>

              {accion !== 'ver' ? accion === 'editar' &&
                <TabPanel value="3" sx={{ p: '20px 0' }}>
                  <AnexosOpcionales
                    id_baja_activo={id_baja_activo}
                  />
                </TabPanel>
                : null
              }
            </TabContext>

            <Grid item xs={12}  sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                marginTop: "20px",
                gap: 2,
              }}
              >
              {position_tab !== '3' &&
                <Grid item xs={12} lg={2}>
                  <Button
                    fullWidth
                    color="success"
                    variant="contained"
                    disabled={loadding || position_tab === '1'}
                    startIcon={loadding ? <CircularProgress size={25} /> :<SaveIcon />}
                    type='submit'
                  >
                    {!loadding ? accion === 'crear' ? "Guardar" : 'Actualizar' : ''}
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
                  onClick={()=>{set_position_tab(position_tab === '1' ? '1' : (parseInt(position_tab) - 1).toString())}}
                >
                  Atras
                </Button>
              </Grid>

              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  type='button'
                  disabled={btn_continuar_disabled}
                  variant='contained'
                  color='primary'
                  endIcon={<KeyboardArrowRightIcon />}
                  onClick={()=>btn_continuar()}
                >
                  Continuar
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
export default BajaActivos;