import { Box, Button, CircularProgress, Grid, Tab } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { useAppDispatch } from '../../../../hooks';
import dayjs, { Dayjs } from 'dayjs';
import { interface_articulos_agregados, interface_busqueda_articulo, interface_busqueda_operario, interface_busqueda_responsable, interface_solicitiudes_en_proceso, interface_solicitudes_realizadas, interface_unidades_medidas, response_obtener_solicitudes_realizadas, response_solicitud_obtenida_por_id, response_unidades_medidas } from '../interfaces/types';
import { control_error, control_success } from '../../../../helpers';
import BusquedaFuncionarios from './BusquedaFuncionarios';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import SolicitudesEnProceso from './SolicitudesEnProceso';
import { useNavigate } from 'react-router-dom';
import { get_obtener_solicitudes_activos } from '../thunks/autorizacion_solicitud_activos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// eslint-disable-next-line @typescript-eslint/naming-convention
const AutorizacionSolicitudActivos = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loadding, set_loadding] = useState<boolean>(false);
  const [position_tab, set_position_tab] = useState<string>('1');

  //estado para controlar el formulario segun la accion
  const [accion, set_accion] = useState<string>('null');

  // id solucitud de activo para poder editar o ver la solicitud
  const [id_solicitud_activo, set_id_solicitud_activo] = useState<number | null>(null);

  // Estados pantalla 1 - Solicitudes realizadas
  const [estado, set_estado] = useState<string>('');
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs | null>(null);
  const [fecha_fin, set_fecha_fin] = useState<Dayjs | null>(null);


  // Estados pantalla 2 - Solicitudes de activos
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
  const [data_articulos_agregados, set_data_articulos_agregados] = useState<interface_articulos_agregados[]>([]);
  

  // Datos de la tabla de solicitudes realizadas
  const [data_solicitudes_realizadas, set_data_solicitudes_realizadas] = useState<interface_solicitiudes_en_proceso[]>([
    undefined as unknown as interface_solicitiudes_en_proceso,
    undefined as unknown as interface_solicitiudes_en_proceso,
    undefined as unknown as interface_solicitiudes_en_proceso,
    undefined as unknown as interface_solicitiudes_en_proceso,
    undefined as unknown as interface_solicitiudes_en_proceso,
  ]);

  useEffect(() => {
    console.log(id_solicitud_activo);
  },[id_solicitud_activo]);

  /* 
  const get_obtener_solicitudes_realizadas_fc = () => {
    dispatch(get_obtener_solicitudes_realizadas(id_solicitud_activo))
    .then((response: response_solicitud_obtenida_por_id) => {
      if(Object.keys(response).length !== 0){
        if(response.success === true){

          set_motivo(response.data.motivo);
          set_observaciones(response.data.observacion);
          set_data_articulos_agregados([]);
        }
      } else {
        control_error('No se encontraron solicitudes');
      }
    })
  }

  useEffect(() => {
    if(accion === 'ver'){
      get_obtener_solicitudes_realizadas_fc();
    } else {
      set_id_solicitud_activo(null);
    }
  },[accion]);
   */


  const get_obtener_solicitudes_activos_fc = () => {
    dispatch(get_obtener_solicitudes_activos(
      estado,
      fecha_inicio ? fecha_inicio.format('YYYY-MM-DD') : '',
      fecha_fin ? fecha_fin.format('YYYY-MM-DD') : '',
      ''
    )).then((response: response_obtener_solicitudes_realizadas) => {
      if(Object.keys(response).length !== 0){
        set_data_solicitudes_realizadas(response.data);
      } else {
        control_error('No se encontraron solicitudes');
        set_data_solicitudes_realizadas([]);
      }
    })
  }


  const solicites_obtenidas = useRef(false);
  useEffect(() => {
    if(!solicites_obtenidas.current){
      get_obtener_solicitudes_activos_fc();
      solicites_obtenidas.current = true;
    }
  }, []);

  const handle_tablist_change = (event: React.SyntheticEvent, newValue: string) => {
    set_position_tab(newValue);
  };

  const btn_salir = () => {
    if(position_tab === '1'){
      Swal.fire({
        title: '¿Esta seguro de salir del modulo?',
        showDenyButton: true,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#042F4A',
        cancelButtonColor: '#DE1616',
        icon: 'question',
      }).then( async(result: any) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate('/almacen/solicitudes-activos');
          return true;
        } else if(result.isDenied){
          return false;
        }
      });
    } else if(position_tab === '2'){
      set_accion('null');
      set_position_tab('1');
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
          <Title title='Autorización de solicitudes de activos'></Title>
          <Box
            component={'form'}
            sx={{ mt: '20px' }}
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider',  width: '100%', }}>
                <TabList sx={{ minWidth: '100%' }} onChange={handle_tablist_change}>
                  <Tab disabled={accion === 'ver'} sx={{ minWidth: '50%' }} label="Solicitudes en proceso" value="1" />
                  <Tab disabled={accion === 'null'} sx={{ minWidth: '50%' }} label="Resumen de la solicitud" value="2" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <SolicitudesEnProceso
                    set_position_tab={set_position_tab}
                    set_accion={set_accion}
                    estado={estado}
                    set_estado={set_estado}
                    set_id_solicitud_activo={set_id_solicitud_activo}
                    fecha_inicio={fecha_inicio}
                    set_fecha_inicio={set_fecha_inicio}
                    fecha_fin={fecha_fin}
                    set_fecha_fin={set_fecha_fin}
                    set_data_solicitudes_realizadas={set_data_solicitudes_realizadas}
                    data_solicitudes_realizadas={data_solicitudes_realizadas}
                    get_obtener_solicitudes_activos_fc={get_obtener_solicitudes_activos_fc}
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
                    funcionario_operario_seleccionado={funcionario_operario_seleccionado}
                    tipo_documento_solicito={tipo_documento_solicito}
                    set_tipo_documento_solicito={set_tipo_documento_solicito}
                    documento_solicito={documento_solicito}
                    set_documento_solicito={set_documento_solicito}
                    nombres_solicito={nombres_solicito}
                    set_nombres_solicito={set_nombres_solicito}
                    apellidos_solicito={apellidos_solicito}
                    set_apellidos_solicito={set_apellidos_solicito}
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
              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  color="error"
                  variant="contained"
                  startIcon={position_tab === '1' ? <CloseIcon /> : <ArrowBackIosIcon />}
                  onClick={btn_salir}
                >
                  {position_tab === '1' ? 'Salir' : 'Atras'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
 
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default AutorizacionSolicitudActivos;