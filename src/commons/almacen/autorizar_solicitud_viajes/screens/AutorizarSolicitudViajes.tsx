import { Box, Button, Grid, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SolicitudesEnProceso from './SolicitudesEnProceso';
import { interface_inputs_resumen_solicitud, interface_resumen_solicitud } from '../interfaces/types';
import ResumenSolicitud from './ResumenSolicitud';
import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const AutorizarSolicitudViajes = () => {
  const navigate = useNavigate();

  const [position_tab, set_position_tab] = useState<string>('1');

  //estado para controlar el formulario segun la accion
  const [accion, set_accion] = useState<string>('null');

  const [inputs_resumen_solicitud, set_inputs_resumen_solicitud] = useState<interface_inputs_resumen_solicitud>(Object);

  //estado para guardar los datos de la solicitud seleccionada
  const [data_resumen_solicitud, set_data_resumen_solicitud] = useState<interface_resumen_solicitud>(Object);


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
      set_data_resumen_solicitud({} as interface_resumen_solicitud);
      set_inputs_resumen_solicitud({} as interface_inputs_resumen_solicitud);
      set_accion('null');
      set_position_tab('1');
    }
  }

  useEffect(()=>{
    if(accion === 'ver'){
      set_position_tab('2');

      // si no hay datos en data_resumen_solicitud no hacer nada
      if(!Object.keys(data_resumen_solicitud).length) return;
      
      // asignar los datos traidos de data_resumen_solicitud a los inputs_resumen_solicitud
      set_inputs_resumen_solicitud({
        fecha_solicitud: data_resumen_solicitud.solicitud_viaje.fecha_solicitud,
        fecha_partida: data_resumen_solicitud.solicitud_viaje.fecha_partida,
        hora_partida: data_resumen_solicitud.solicitud_viaje.hora_partida,
        fecha_retorno: data_resumen_solicitud.solicitud_viaje.fecha_retorno,
        hora_retorno: data_resumen_solicitud.solicitud_viaje.hora_retorno,
        fecha_aprobacion_responsable: data_resumen_solicitud.solicitud_viaje.fecha_aprobacion_responsable,
        fecha_rechazo: data_resumen_solicitud.solicitud_viaje.fecha_rechazo,
        direccion: data_resumen_solicitud.solicitud_viaje.direccion,
        indicaciones_destino: data_resumen_solicitud.solicitud_viaje.indicaciones_destino,
        nro_pasajeros: data_resumen_solicitud.solicitud_viaje.nro_pasajeros,
        requiere_carga: data_resumen_solicitud.solicitud_viaje.requiere_carga,
        requiere_compagnia_militar: data_resumen_solicitud.solicitud_viaje.requiere_compagnia_militar,
        estado_solicitud: data_resumen_solicitud.solicitud_viaje.estado_solicitud,
        consideraciones_adicionales: data_resumen_solicitud.solicitud_viaje.consideraciones_adicionales,
        motivo_viaje: data_resumen_solicitud.solicitud_viaje.motivo_viaje,
        justificacion_rechazo: data_resumen_solicitud.solicitud_viaje.justificacion_rechazo,
        cod_municipio: data_resumen_solicitud.solicitud_viaje.cod_municipio,
        cod_departamento: data_resumen_solicitud.solicitud_viaje.cod_departamento,
        nombre_conductor: data_resumen_solicitud.viajes_agendados.nombre_conductor,
        apellido_conductor: data_resumen_solicitud.viajes_agendados.apellido_conductor,
        telefono_celular_empresa: data_resumen_solicitud.viajes_agendados.telefono_celular_empresa,
        email_empresarial: data_resumen_solicitud.viajes_agendados.email_empresarial,
        tipo_documento: data_resumen_solicitud.viajes_agendados.tipo_documento,
        numero_documento: data_resumen_solicitud.viajes_agendados.numero_documento,
        placa: data_resumen_solicitud.viajes_agendados.placa,
        marca: data_resumen_solicitud.viajes_agendados.marca,
        nombre_vehiculo: data_resumen_solicitud.viajes_agendados.nombre,
        nombre_persona_autoriza: data_resumen_solicitud.viajes_agendados.nombre_persona_autoriza,
        viaje_autorizado: data_resumen_solicitud.viajes_agendados.viaje_autorizado,
        fecha_no_autorizado: data_resumen_solicitud.viajes_agendados.fecha_no_autorizado,
        observacion_autorizacion: data_resumen_solicitud.viajes_agendados.observacion_autorizacion,
        fecha_autorizacion: data_resumen_solicitud.viajes_agendados.fecha_autorizacion,
        ya_inicio: data_resumen_solicitud.viajes_agendados.ya_inicio,
        ya_llego: data_resumen_solicitud.viajes_agendados.ya_llego,
        estado_agendamieto: data_resumen_solicitud.viajes_agendados.estado,
        realizo_inspeccion: data_resumen_solicitud.viajes_agendados.realizo_inspeccion,
        personas_solicitud_viaje: data_resumen_solicitud.personas_solicitud_viaje,
      });
    }
  },[accion,data_resumen_solicitud])

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
                    set_data_resumen_solicitud={set_data_resumen_solicitud}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <Grid container spacing={2} rowSpacing={3}>
                  <ResumenSolicitud
                    inputs_resumen_solicitud={inputs_resumen_solicitud}
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
}

// eslint-disable-next-line no-restricted-syntax
export default AutorizarSolicitudViajes;