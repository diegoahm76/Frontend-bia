import { Box, Button, CircularProgress, Grid, Tab } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SolicitudesRealizadas from './SolicitudesRealizadas';
import { useAppDispatch } from '../../../../hooks';
import { get_buscar_solicitudes_activos } from '../thunks/solicitud_activos';
import dayjs, { Dayjs } from 'dayjs';
import { interface_articulos_agregados, interface_busqueda_articulo, interface_busqueda_operario, interface_busqueda_responsable, interface_solicitudes_realizadas, response_solicitudes_realizadas } from '../interfaces/types';
import { control_error, control_success } from '../../../../helpers';
import BusquedaFuncionarios from './BusquedaFuncionarios';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BusquedaArticulos from './BusquedaArticulos';



// eslint-disable-next-line @typescript-eslint/naming-convention
const SolicitudActivos = () => {
  const dispatch = useAppDispatch();

  const [loadding, set_loadding] = useState<boolean>(false);
  const [position_tab, set_position_tab] = useState<string>('1');

  //estado para controlar el formulario segun la accion
  const [accion, set_accion] = useState<string>('crear');

  // Estados pantalla 1 - Solicitudes realizadas
  const [estado, set_estado] = useState<string>('');
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs | null>(null);
  const [fecha_fin, set_fecha_fin] = useState<Dayjs | null>(null);


  // Estados pantalla 2 - Solicitudes de activos
  const [switch_solicitud_prestamo, set_switch_solicitud_prestamo] = useState<boolean>(false);
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
  // Datos del articulo seleccionado del modal
  const [articulo_encontrado, set_articulo_encontrado] = useState<interface_busqueda_articulo>(Object); // se guarda el articulo seleccionado
  // Datos de los articulos agregados a la tabla
  const [data_articulos_agregados, set_data_articulos_agregados] = useState<interface_articulos_agregados[]>([]);
  

  // Datos de la tabla de solicitudes realizadas
  const [data_solicitudes_realizadas, set_data_solicitudes_realizadas] = useState<interface_solicitudes_realizadas[]>([
    undefined as unknown as interface_solicitudes_realizadas,
    undefined as unknown as interface_solicitudes_realizadas,
    undefined as unknown as interface_solicitudes_realizadas,
    undefined as unknown as interface_solicitudes_realizadas,
    undefined as unknown as interface_solicitudes_realizadas,
  ]);


  const get_buscar_solicites_activos = () => {
    dispatch(get_buscar_solicitudes_activos(
      fecha_inicio ? fecha_inicio.format('YYYY-MM-DD') : '',
      fecha_fin ? fecha_fin.format('YYYY-MM-DD') : '',
      estado
    )).then((response: response_solicitudes_realizadas) => {
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
      get_buscar_solicites_activos();
      solicites_obtenidas.current = true;
    }
  }, []);


  const [formulario_valido, set_formulario_valido] = useState(false);

  const handle_tablist_change = (event: React.SyntheticEvent, newValue: string) => {
    set_position_tab(newValue);
  };

  const limpiar_formulario = () => {
    set_position_tab('1');
  }

  const onsubmit_form = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };


  const [btn_continuar_disabled, set_btn_continuar_disabled] = useState<boolean>(false);

  useEffect(() => {
    if(position_tab === '3') {
      set_btn_continuar_disabled(true);
    } else {
      set_btn_continuar_disabled(false);
    }
  },[position_tab]);

  const validar_form_seleccion_funcionarios = async() => {
    if(Object.keys(funcionario_operario_seleccionado).length === 0){
      control_error('Debe seleccionar un funcionario responsable');
      return false;
    }
    if(Object.keys(funcionario_operario_seleccionado).length === 0){
      control_error('Debe seleccionar un funcionario operario');
      return false;
    }
    if(motivo === ''){
      control_error('El campo motivo es obligatorio');
      return false;
    }
    if(observaciones === ''){
      control_error('El campo observaciones es obligatorio');
      return false;
    }
    return true;
  }

  const validar_busqueda_articulos = async() => {
    //validar que se haya seleccionado al menos un articulo
    return true;
  }


  const btn_continuar = async() => {
    if(position_tab === '1') {
      set_position_tab('2');
    }
    
    if(position_tab === '2') {
      const form_seleccion_funcionarios = await validar_form_seleccion_funcionarios();
      if(!form_seleccion_funcionarios){
        set_btn_continuar_disabled(false);
        set_position_tab('2');
        set_formulario_valido(false);
        return;
      } else {
        set_position_tab('3');
      }
    }

    if(position_tab === '2') {
      const form_busqueda_articulos = await validar_busqueda_articulos();
      if(form_busqueda_articulos){
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
          <Title title="Solicitud de activos"></Title>
          <Box
            component={'form'}
            onSubmit={onsubmit_form}
            sx={{ mt: '20px' }}
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider',  width: '100%', }}>
                <TabList sx={{ minWidth: '100%' }} onChange={handle_tablist_change}>
                  <Tab sx={{ minWidth: '33.3%' }} label="Solicitudes realizadas" value="1" />
                  <Tab sx={{ minWidth: '33.3%' }} label="Selección de funcionarios" value="2" />
                  <Tab sx={{ minWidth: '33.3%' }} label="Búsqueda de  artículos" value="3" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <SolicitudesRealizadas
                    estado={estado}
                    set_estado={set_estado}
                    fecha_inicio={fecha_inicio}
                    set_fecha_inicio={set_fecha_inicio}
                    fecha_fin={fecha_fin}
                    set_fecha_fin={set_fecha_fin}
                    set_data_solicitudes_realizadas={set_data_solicitudes_realizadas}
                    data_solicitudes_realizadas={data_solicitudes_realizadas}
                    get_buscar_solicites_activos={get_buscar_solicites_activos}
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
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="3" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <BusquedaArticulos
                    accion={accion}
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
              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  color="success"
                  variant="contained"
                  disabled={loadding}
                  startIcon={loadding ? <CircularProgress size={25} /> :<SaveIcon />}
                  type='submit'
                >
                  {!loadding ? accion === 'crear' ? "Guardar" : 'Actualizar' : ''}
                </Button>
              </Grid>
              
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
};

// eslint-disable-next-line no-restricted-syntax
export default SolicitudActivos;