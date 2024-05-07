/* eslint-disable @typescript-eslint/naming-convention */
import {
  Grid,
  Button,
  Stack,
  Box,
  Stepper,
  Step,
  StepButton,
  Typography,
  Avatar,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { TipoTramite } from './TipoTramite';
import { DocumentosAnexos } from './DocumentosAnexos';
import { ResumenTramite } from './ResumenTramite';
import { Radicado } from './Radicado';
import { TramitesEnProceso } from './TramitesEnProceso';
import { useNavigate } from 'react-router-dom';
import FeedIcon from '@mui/icons-material/Feed';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import InfoIcon from '@mui/icons-material/Info';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CallToActionIcon from '@mui/icons-material/CallToAction';
import Swal from 'sweetalert2';
import { FormContextMetadatos } from '../../../TramitesServicios/context/MetadatosContext';
import { Title } from '../../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { radicar_opa } from './thunks/TramitesOServicios';
import { MainPartRepresentacionPersona } from '../../representacionPersona/screen/MainRepresentacionPersona';
const class_css = {
  position: 'relative',
  background: '#FAFAFA',
  borderRadius: '15px',
  p: '20px',
  mb: '20px',
  boxShadow: '0px 3px 6px #042F4A26',
  display: 'flex',
  justifyContent: 'center',
};
const class_css_back = {
  position: 'relative',
  background: '#FAFAFA',
  borderRadius: '15px',
  p: '20px',
  mt: '2rem',
  mb: '2rem',
  boxShadow: '3px 3px 3px 3px #042F4A26',
};
interface IProps {
  usuario: any;
  usuario_cache: any;
}

const opas = [
  'Documentos anexos del trámite - Permisos menores',
  'Resumen del trámite - Permisos menores',
  'Radicación del trámite - Permisos menores',
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeccionGeneral: React.FC<IProps> = (props: IProps) => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* navigate declaration
  const navigate = useNavigate();
  const [formulario_paso_uno, set_formulario_paso_uno] = useState<any>(null);
  const [response_paso_1, set_response_paso_1] = useState<any>(null);
  const [radicado, set_radicado] = useState<any>(null);
  const [cargar_anexos, set_cargar_anexos] = useState<boolean>(false);
  const [anexar_error, set_anexar_error] = React.useState<boolean>(false);
  const [restablecer, set_restablecer] = React.useState<boolean>(false);
  const [limpiar, set_limpiar] = useState<boolean>(false);
  // Inicia Configuración Stepper
  const [steps, set_steps] = React.useState<any[]>(['Tipo de trámite']);
  const [activeStep, setActiveStep] = React.useState(0);
  const [tramite_servicio, set_tramite_servicio] = React.useState<any>('');
  const [nuevo_tramite, set_nuevo_tramite] = React.useState<boolean>(false);
  const [proceso_tramite, set_proceso_tramite] = React.useState<boolean>(false);
  const [resumen_tramite, set_resumen_tramite] = React.useState<boolean>(false);
  const [crear_tramite, set_crear_tramite] = React.useState<boolean>(false);
  const [crear_tramite_error, set_crear_tramite_error] =
    React.useState<boolean>(false);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>(
    {}
  );
  const { currentPersonaRespuestaUsuario } = useAppSelector(
    (state) => state.ResRequerimientoOpaSlice
  );
  const {representacion_legal} = useAppSelector((state) => state.auth);
  
  const { archivos, set_archivos, setForm } = useContext(FormContextMetadatos);
  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleComplete = () => {
    if (activeStep === 0) {
      if(currentPersonaRespuestaUsuario === null){
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: `Por favor, selecciona una persona antes de continuar.`,
          confirmButtonText: 'Entendido',
        });
        return;
      }
      set_crear_tramite(true);
    }
    if (activeStep === 1) {
      if (!archivos.length) {
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: `Por favor, crea anexos antes de continuar.`,
          confirmButtonText: 'Entendido',
        });
        return;
      }
      set_cargar_anexos(true);
    }
    if (activeStep === 2) {
      if (!response_paso_1?.id_solicitud_tramite) {
        // Asegúrate de que id_solicitud_tramite esté definido
        control_warning('Por favor, radica la opa antes de continuar.');
        return;
      }
      dispatch(radicar_opa(response_paso_1?.id_solicitud_tramite)).then(
        (response: any) => {
          if (response.success) {
            console.log('representación legal', representacion_legal)
            console.log('currentPersonaRespuestaUsuario', currentPersonaRespuestaUsuario)
            set_radicado(response.data);
            const newCompleted = completed;
            newCompleted[activeStep] = true;
            setCompleted(newCompleted);
            const newActiveStep =
              isLastStep() && !allStepsCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
            setActiveStep(newActiveStep);
            set_archivos([]);
            setForm({} as any);
          }
        }
      );
    }
    if (activeStep > 2) {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  // Finaliza Configuración Stepper
  useEffect(() => {
    if (crear_tramite_error || anexar_error) {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  }, [crear_tramite_error, anexar_error]);

  useEffect(() => {
    if (restablecer) {
      setActiveStep(0);
      setCompleted({});
      set_crear_tramite(false);
      set_crear_tramite_error(false);
      set_cargar_anexos(false);
      set_restablecer(false);
      set_limpiar(true);
      set_nuevo_tramite(false);
      set_proceso_tramite(false);
      set_resumen_tramite(false);
      set_steps(['Tipo de trámite']);
    }
  }, [restablecer]);

  useEffect(() => {
    if (tramite_servicio === 'P') {
      set_steps([...steps, ...opas]);
    } else {
      set_steps(['Tipo de trámite']);
      // if (tramite_servicio !== '')
      // window.location.href = 'http://localhost:3000/#/app/gestor_documental/expedientes/indexacion_expedientes';
    }
  }, [tramite_servicio]);

  useEffect(() => {
    if (limpiar) {
      set_limpiar(false);
    }
  }, [limpiar]);

  const tramites = (
    nuevo: boolean,
    proceso: boolean,
    resumen: boolean
  ): void => {
    handleReset();
    set_nuevo_tramite(nuevo);
    set_proceso_tramite(proceso);
    set_resumen_tramite(resumen);
  };

  return (
    <>
      <Grid container sx={class_css}>
        <Title title="Trámite y servicios (Permisos menores)" />
        <Grid container sx={class_css_back}>
          <Grid
            item
            xs={12}
            sm={props.usuario !== null ? 6 : 6}
            textAlign={'center'}
          >
            <Button
              color="success"
              variant="contained"
              startIcon={<FeedIcon />}
              onClick={() => {
                tramites(true, false, false);
              }}
            >
              Iniciar trámite de permiso menor
            </Button>
          </Grid>
          {/*{props.usuario !== null && (
            <Grid
              item
              xs={12}
              sm={props.usuario !== null ? 3 : 4}
              textAlign={'center'}
            >
              <Button
                variant="contained"
                color="error"
                startIcon={<QuestionAnswerIcon />}
                onClick={() => {
                  navigate(
                    `/app/gestor_documental/tramites/respuesta_requerimiento_opa/`
                  );
                }}
              >
                Responder requerimientos OPAS
              </Button>
            </Grid>
          )}*/}
          <Grid
            item
            xs={12}
            sm={props.usuario !== null ? 6: 6}
            textAlign={'center'}
          >
            <Button
              color="primary"
              variant="contained"
              startIcon={<AutoModeIcon />}
              onClick={() => {
                tramites(false, true, false);
              }}
            >
              Ver permisos menores en proceso
            </Button>
          </Grid>
        {/*  <Grid
            item
            xs={12}
            sm={props.usuario !== null ? 3 : 4}
            textAlign={'center'}
          >
            <Button
              color="warning"
              variant="contained"
              startIcon={<InfoIcon />}
              onClick={() => {
                tramites(false, false, true);
              }}
            >
              Trámites otorgados / negados
            </Button>
          </Grid>*/}
        </Grid>
      </Grid>
      {nuevo_tramite && (
        <Grid container sx={class_css}>
          <Title title="Nuevo trámite" />
          <Grid container spacing={2} sx={{ mt: '10px' }}>
            <Grid item xs={12} sm={12}>
              <Box sx={{ width: '100%' }}>
                <Stepper nonLinear activeStep={activeStep}>
                  {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                      <StepButton color="inherit">{label}</StepButton>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  <React.Fragment>
                    {activeStep === 0 && (
                      <>
                      <MainPartRepresentacionPersona/>
                    <Box>
                      <Grid
                        container
                        sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}
                      >
                        <TipoTramite
                          usuario={props.usuario}
                          crear_tramite={crear_tramite}
                          set_formulario_paso_uno={set_formulario_paso_uno}
                          set_crear_tramite={set_crear_tramite}
                          set_crear_tramite_error={set_crear_tramite_error}
                          limpiar={limpiar}
                          set_tramite_servicio={set_tramite_servicio}
                          set_response_paso_1={set_response_paso_1}
                        ></TipoTramite>
                      </Grid>
                    </Box>
                    </>
                    )}
                    {activeStep === 1 && (
                      <Box>
                        <Grid
                          container
                          sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}
                        >
                          <DocumentosAnexos
                            usuario={props.usuario}
                            cargar_anexos={cargar_anexos}
                            set_cargar_anexos={set_cargar_anexos}
                            response_paso_1={response_paso_1}
                            set_anexar_error={set_anexar_error}
                          ></DocumentosAnexos>
                        </Grid>
                      </Box>
                    )}
                    {activeStep === 2 && (
                      <Box>
                        <Grid
                          container
                          sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}
                        >
                          <ResumenTramite
                            formulario_paso_uno={formulario_paso_uno}
                          ></ResumenTramite>
                        </Grid>
                      </Box>
                    )}
                    {activeStep === 3 && (
                      <Box>
                        <Grid
                          container
                          sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}
                        >
                          <Radicado
                            usuario={props.usuario}
                            response_paso_1={response_paso_1}
                            radicado={radicado}
                            usuario_cache={props.usuario_cache}
                            set_restablecer={set_restablecer}
                          ></Radicado>
                        </Grid>
                      </Box>
                    )}
                    {tramite_servicio === 'P' && (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          pt: 2,
                          mt: '1.5rem',
                          mb: '1.5rem',
                        }}
                      >
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep !== 3 && (
                          <Button
                            variant={
                              completedSteps() === totalSteps() - 2
                                ? 'contained'
                                : 'outlined'
                            }
                            onClick={handleComplete}
                            startIcon={<CallToActionIcon />}
                          >
                            {completedSteps() === totalSteps() - 2
                              ? 'Radicar el trámite'
                              : 'Continuar al siguiente paso'}
                          </Button>
                        )}
                      </Box>
                    )}
                  </React.Fragment>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
      {proceso_tramite && (
        <TramitesEnProceso usuario={props.usuario}></TramitesEnProceso>
      )}
    </>
  );
};
