import { Box, Button, CircularProgress, Grid, Tab } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { useAppDispatch } from '../../../../hooks';
import dayjs, { Dayjs } from 'dayjs';
import { interface_estado_autorizacion_solicitud_activos, interface_solicitiudes_en_proceso, interface_solicitud_por_id, response_obtener_solicitudes_realizadas } from '../interfaces/types';
import { control_error, control_success } from '../../../../helpers';
import ResumenSolicitud from './ResumenSolicitud';
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

  const [loadding_tabla_solicitudes, set_loadding_tabla_solicitudes] = useState<boolean>(false);
  const [position_tab, set_position_tab] = useState<string>('1');

  //estado para controlar el formulario segun la accion
  const [accion, set_accion] = useState<string>('null');

  // id solucitud de activo para poder editar o ver la solicitud
  const [id_solicitud_activo, set_id_solicitud_activo] = useState<number | null>(null);

  // Estados pantalla 1 - Solicitudes realizadas
  const [estado, set_estado] = useState<string>('');
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs | null>(null);
  const [fecha_fin, set_fecha_fin] = useState<Dayjs | null>(null);

  // Pantalla 2. Resumen de solicitud
  // Objeto donde se guarda los valores de cada input del formulario de resumen de solicitud
  const [data_form_resumen_solicitud, set_data_form_resumen_solicitud] = useState<interface_estado_autorizacion_solicitud_activos>(Object);

  // Datos de la solicitud por id
  const [data_solicitud_ver_por_id, set_data_solicitud_ver_por_id] = useState<interface_solicitud_por_id>(Object);


  // Datos de la tabla de solicitudes realizadas
  const [data_solicitudes_realizadas, set_data_solicitudes_realizadas] = useState<interface_solicitiudes_en_proceso[]>([
    undefined as unknown as interface_solicitiudes_en_proceso,
    undefined as unknown as interface_solicitiudes_en_proceso,
    undefined as unknown as interface_solicitiudes_en_proceso,
    undefined as unknown as interface_solicitiudes_en_proceso,
    undefined as unknown as interface_solicitiudes_en_proceso,
  ]);

  useEffect(() => {
    console.log(data_solicitud_ver_por_id);
  },[data_solicitud_ver_por_id, accion]);

  useEffect(() => {
    if(accion === 'ver'){
      set_position_tab('2');
      if(Object.keys(data_solicitud_ver_por_id).length !== 0){
        set_data_form_resumen_solicitud({
          es_solicitud_prestamo: data_solicitud_ver_por_id.solicitud_prestamo,
          fecha_devolucion: data_solicitud_ver_por_id.fecha_devolucion,
          fecha_solictud: data_solicitud_ver_por_id.fecha_solicitud,
          estado_solicitud: data_solicitud_ver_por_id.estado_solicitud,
          tipo_documento_solictante: data_solicitud_ver_por_id.tipo_documento_persona_solicitante,
          documento_solictante: data_solicitud_ver_por_id.numero_documento_persona_solicitante,
          nombres_solictante: data_solicitud_ver_por_id.primer_nombre_persona_solicitante,
          apellidos_solictante: data_solicitud_ver_por_id.primer_apellido_persona_solicitante,
          tipo_documento_responsable: data_solicitud_ver_por_id.tipo_documento_funcionario_resp_unidad,
          documento_responsable: data_solicitud_ver_por_id.numero_documento_funcionario_resp_unidad,
          nombres_responsable: data_solicitud_ver_por_id.primer_nombre_funcionario_resp_unidad,
          apellidos_responsable: data_solicitud_ver_por_id.primer_apellido_funcionario_resp_unidad,
          justificacion_rechazo: data_solicitud_ver_por_id.justificacion_rechazo_resp,
          fecha_aprobacion: data_solicitud_ver_por_id.fecha_aprobacion_resp,
          tipo_documento_operario: data_solicitud_ver_por_id.tipo_documento_persona_operario,
          documento_operario: data_solicitud_ver_por_id.numero_documento_persona_operario,
          nombres_operario: data_solicitud_ver_por_id.primer_nombre_persona_operario,
          apellidos_operario: data_solicitud_ver_por_id.primer_apellido_persona_operario,
          tipo_documento_persona_cierra_no_dispo_alma: data_solicitud_ver_por_id.tipo_documento_persona_cierra_no_dispo_alma,
          documento_persona_cierra_no_dispo_alma: data_solicitud_ver_por_id.numero_documento_persona_cierra_no_dispo_alma,
          nombres_persona_cierra_no_dispo_alma: data_solicitud_ver_por_id.primer_nombre_persona_cierra_no_dispo_alma,
          apellidos_persona_cierra_no_dispo_alma: data_solicitud_ver_por_id.primer_apellido_persona_cierra_no_dispo_alma,
          obser_cierre_no_dispo_alma: data_solicitud_ver_por_id.obser_cierre_no_dispo_alma,
          fecha_cierre_no_dispo_alma: data_solicitud_ver_por_id.fecha_cierre_no_dispo_alma,
          tipo_documento_persona_alma_rechaza: data_solicitud_ver_por_id.tipo_documento_persona_alma_rechaza,
          documento_persona_alma_rechaza: data_solicitud_ver_por_id.numero_documento_persona_alma_rechaza,
          nombres_persona_alma_rechaza: data_solicitud_ver_por_id.primer_nombre_persona_alma_rechaza,
          apellidos_persona_alma_rechaza: data_solicitud_ver_por_id.primer_apellido_persona_alma_rechaza,
          motivo: data_solicitud_ver_por_id.motivo,
          observacion: data_solicitud_ver_por_id.observacion,
          fecha_cierre_solicitud: data_solicitud_ver_por_id.fecha_cierra_solicitud,
          items_solicitud: data_solicitud_ver_por_id.items_solicitud,
        });
      }
    }
  },[accion,data_solicitud_ver_por_id]);


  const get_obtener_solicitudes_activos_fc = () => {
    set_loadding_tabla_solicitudes(true);
    dispatch(get_obtener_solicitudes_activos(
      estado,
      fecha_inicio ? fecha_inicio.format('YYYY-MM-DD') : '',
      fecha_fin ? fecha_fin.format('YYYY-MM-DD') : '',
      ''
    )).then((response: response_obtener_solicitudes_realizadas) => {
      if(Object.keys(response).length !== 0){
        set_loadding_tabla_solicitudes(false);
        set_data_solicitudes_realizadas(response.data);
      } else {
        set_loadding_tabla_solicitudes(false);
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
      set_data_form_resumen_solicitud({} as interface_estado_autorizacion_solicitud_activos);
      set_data_solicitud_ver_por_id({} as interface_solicitud_por_id);
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
                    accion={accion}
                    set_accion={set_accion}
                    estado={estado}
                    set_estado={set_estado}
                    id_solicitud_activo={id_solicitud_activo}
                    set_id_solicitud_activo={set_id_solicitud_activo}
                    fecha_inicio={fecha_inicio}
                    set_fecha_inicio={set_fecha_inicio}
                    fecha_fin={fecha_fin}
                    set_fecha_fin={set_fecha_fin}
                    set_data_solicitudes_realizadas={set_data_solicitudes_realizadas}
                    data_solicitudes_realizadas={data_solicitudes_realizadas}
                    get_obtener_solicitudes_activos_fc={get_obtener_solicitudes_activos_fc}
                    loadding_tabla_solicitudes={loadding_tabla_solicitudes}
                    set_data_solicitud_ver_por_id={set_data_solicitud_ver_por_id}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <Grid container spacing={2} rowSpacing={7}>
                  <ResumenSolicitud
                    accion={accion}
                    data_form_resumen_solicitud={data_form_resumen_solicitud}
                  />
                </Grid>
              </TabPanel>
            </TabContext>

            {accion !== 'rechazar' &&
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
            }
          </Box>
        </Grid>
 
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default AutorizacionSolicitudActivos;