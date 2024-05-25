import { Box, Button, CircularProgress, Grid, Tab } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { useAppDispatch } from '../../../../hooks';
import dayjs, { Dayjs } from 'dayjs';
import { interface_articulos_despachados, interface_busqueda_persona_solicita, interface_estado_autorizacion_solicitud_activos, interface_inputs_resumen_despacho, interface_persona_solicita_modal, interface_solicitiudes_en_proceso, interface_solicitud_por_id, response_obtener_solicitudes_realizadas } from '../interfaces/types';
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


  const [position_tab, set_position_tab] = useState<string>('1');

  //estado para controlar el formulario segun la accion
  const [accion, set_accion] = useState<string>('null');

  // Pantalla 2. Resumen de solicitud
  // Objeto donde se guarda los valores de cada input del formulario de resumen de solicitud
  const [data_form_resumen_solicitud, set_data_form_resumen_solicitud] = useState<interface_estado_autorizacion_solicitud_activos>(Object);
  const [inputs_resumen_despacho, set_inputs_resumen_despacho] = useState<interface_inputs_resumen_despacho>(Object);
  const [data_articulos_despachados, set_data_articulos_despachados] = useState<interface_articulos_despachados[]>([]);

  // Datos de la solicitud por id
  const [data_solicitud_ver_por_id, set_data_solicitud_ver_por_id] = useState<interface_solicitud_por_id>(Object);


  // Datos de la tabla de solicitudes realizadas

  useEffect(() => {
    console.log(data_solicitud_ver_por_id);
  }, [data_solicitud_ver_por_id, accion]);

  useEffect(() => {
    if (accion === 'ver') {
      set_position_tab('2');
      if (Object.keys(data_solicitud_ver_por_id).length !== 0) {
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
          justificacion_rechazo_resp: data_solicitud_ver_por_id.justificacion_rechazo_resp,
          fecha_aprobacion_resp: data_solicitud_ver_por_id.fecha_aprobacion_resp,
          justificacion_rechazo_almacen: data_solicitud_ver_por_id.justificacion_rechazo_almacen,
          fecha_rechazo_almacen: data_solicitud_ver_por_id.fecha_rechazo_almacen,
        });

        if (Object.keys(data_solicitud_ver_por_id.despachos).length !== 0) {
          const primer_despacho = data_solicitud_ver_por_id.despachos[0];
          set_inputs_resumen_despacho({
            fecha_despacho: primer_despacho.fecha_despacho,
            motivo: primer_despacho.observacion,
            tp_documento_pers_despacha: primer_despacho.tipo_documento_persona_despacha,
            documento_pers_despacha: primer_despacho.numero_documento_persona_despacha,
            nombres_pers_despacha: primer_despacho.primer_nombre_persona_despacha,
            apellidos_pers_despacha: primer_despacho.primer_apellido_persona_despacha,
            tp_documento_pers_anula: primer_despacho.tipo_documento_persona_solicitante,
            documento_pers_anula: primer_despacho.numero_documento_persona_solicitante,
            nombres_pers_anula: primer_despacho.primer_nombre_persona_solicitante,
            apellidos_pers_anula: primer_despacho.primer_apellido_persona_solicitante,
            justificacion: primer_despacho.justificacion_anulacion ?? '',
            fecha_anulacion: primer_despacho.fecha_anulacion
          });
        } else {
          control_error('No se encontraron despachos para esta solicitud');
        }

        if (Object.keys(data_solicitud_ver_por_id.items_despacho).length !== 0) {
          set_data_articulos_despachados(data_solicitud_ver_por_id.items_despacho.map((despacho) => {
            return {
              id_item_solicitud_activo: despacho.id_item_despacho_activo,
              id_bien: despacho.id_bien_despachado,
              nombre_bien: despacho.nombre_bien_despachado,
              cantidad: despacho.cantidad_despachada,
              id_unidad_medida: despacho.id_uni_medida_solicitada,
              abreviatura_unidad_medida: despacho.abreviatura_uni_medida_solicitada,
              nombre_unidad_medida: despacho.nombre_uni_medida_solicitada,
              observacion: despacho.observacion,
              nro_posicion: despacho.nro_posicion_despacho,
            }
          }));
        }
      }
    }
  }, [accion, data_solicitud_ver_por_id]);

  const handle_tablist_change = (event: React.SyntheticEvent, newValue: string) => {
    set_position_tab(newValue);
  };

  const btn_salir = () => {
    if (position_tab === '1') {
      Swal.fire({
        title: '¿Esta seguro de salir del modulo?',
        showDenyButton: true,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#042F4A',
        cancelButtonColor: '#DE1616',
        icon: 'question',
      }).then(async (result: any) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate('/almacen/solicitudes-activos');
          return true;
        } else if (result.isDenied) {
          return false;
        }
      });
    } else if (position_tab === '2') {
      set_accion('null');
      set_position_tab('1');
      set_data_form_resumen_solicitud({} as interface_estado_autorizacion_solicitud_activos);
      set_data_solicitud_ver_por_id({} as interface_solicitud_por_id);
      set_inputs_resumen_despacho({} as interface_inputs_resumen_despacho);
      set_data_articulos_despachados([]);
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

              <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', }}>
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
                    set_data_solicitud_ver_por_id={set_data_solicitud_ver_por_id}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <Grid container spacing={2} rowSpacing={7}>
                  <ResumenSolicitud
                    accion={accion}
                    data_form_resumen_solicitud={data_form_resumen_solicitud}
                    inputs_resumen_despacho={inputs_resumen_despacho}
                    data_articulos_despachados={data_articulos_despachados}
                  />
                </Grid>
              </TabPanel>
            </TabContext>

            {accion !== 'rechazar' &&
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
                    color="error"
                    variant="contained"
                    startIcon={position_tab === '1' ? <CloseIcon /> : <ArrowBackIosIcon />}
                    onClick={btn_salir}
                  >
                    {position_tab === '1' ? 'Salir' : 'Atrás'}
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