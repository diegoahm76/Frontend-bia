/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Button, Stack, Box, Stepper, Step, StepButton, Typography, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { Title } from "../../../../components/Title";
import React from "react";
import { TipoTramite } from "./TipoTramite";
import { DocumentosAnexos } from "./DocumentosAnexos";
import { ResumenTramite } from "./ResumenTramite";
import { Radicado } from "./Radicado";
import { radicar_opa } from "../thunks/TramitesOServicios";
import { useAppDispatch } from "../../../../hooks";
const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
}
const class_css_back = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '3px 3px 3px 3px #042F4A26',
}
interface IProps {
    usuario: any,
    usuario_cache: any,
}

const opas = ['Documentos anexos del trámite - OPAS', 'Resumen del trámite', 'Radicación del trámite'];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeccionGeneral: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
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
    const [crear_tramite_error, set_crear_tramite_error] = React.useState<boolean>(false);
    const [completed, setCompleted] = React.useState<{ [k: number]: boolean; }>({});
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
            set_crear_tramite(true);
        }
        if (activeStep === 1) {
            set_cargar_anexos(true);
        }
        if (activeStep === 2) {
            dispatch(radicar_opa(response_paso_1?.id_solicitud_tramite)).then((response: any) => {
                if(response.success){
                    set_radicado(response.data)
                    const newCompleted = completed;
                    newCompleted[activeStep] = true;
                    setCompleted(newCompleted);
                    const newActiveStep = isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
                    setActiveStep(newActiveStep);;
                }     
            });
        }
        if (activeStep > 2) {
            const newCompleted = completed;
            newCompleted[activeStep] = true;
            setCompleted(newCompleted);
            const newActiveStep = isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
            setActiveStep(newActiveStep);;
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
            const newActiveStep = isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
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
        if (tramite_servicio === 'O') {
            set_steps([...steps, ...opas]);
        } else {
            if (tramite_servicio !== '')
                window.location.href = 'http://localhost:3000/#/app/gestor_documental/expedientes/indexacion_expedientes';
        }
    }, [tramite_servicio]);

    useEffect(() => {
        if (limpiar) {
            set_limpiar(false);
        }
    }, [limpiar]);

    const tramites = (nuevo: boolean, proceso: boolean, resumen: boolean): void => {
        handleReset();
        set_nuevo_tramite(nuevo);
        set_proceso_tramite(proceso);
        set_resumen_tramite(resumen);
    }


    return (
        <>
            <Grid
                container
                sx={class_css}
            >
                <Title title="Trámite o servicio" />
                <Grid container spacing={2} sx={{ mt: '10px' }}>
                    {props.usuario !== null &&
                        <Grid container xs={12} sm={12}>
                            <Grid item xs={12} sm={1.5} textAlign={'end'} sx={{ my: '5px', paddingLeft: '20px' }}>
                                <Avatar sx={{ bgcolor: 'gray', padding: '50px' }}>N</Avatar>
                            </Grid>
                            <Grid container xs={12} sm={10.5}>
                                <Grid item xs={12} sm={12}>
                                    <Typography noWrap>
                                        <Typography>{props.usuario_cache.nombre} <strong style={{ fontSize: 11 }}>{'CC' + '1.121.869.905'}</strong></Typography>
                                        <Typography>{'Representante legal de '}</Typography>
                                        <Typography>{props.usuario_cache.nombre_unidad_organizacional}</Typography>
                                        <Typography>{props.usuario_cache.email}</Typography>
                                        <Typography>{props.usuario_cache.telefono_celular}</Typography>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ my: '5px' }}>
                                    <Button variant="contained" color="primary">
                                        Cambiar entorno
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6} textAlign={'center'} sx={{ my: '5px' }}>
                                    <Button variant="contained" color="error" onClick={() => { }}>
                                        Solicitudes y requerimientos
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                </Grid>
                <Grid
                    container
                    sx={class_css_back}
                >
                    <Grid item xs={12} sm={4} textAlign={'center'}>
                        <Button
                            color="success"
                            variant="contained"
                            onClick={() => { tramites(true, false, false) }}
                        >
                            Nuevo trámite
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} textAlign={'center'}>
                        <Button
                            color='success'
                            variant="outlined"
                            onClick={() => { tramites(false, true, false) }}
                        >
                            Trámites en proceso
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} textAlign={'center'}>
                        <Button
                            color="warning"
                            variant="outlined"
                            onClick={() => { tramites(false, false, true) }}
                        >
                            Trámites otorgados / negados
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
            {nuevo_tramite && <Grid
                container
                sx={class_css}
            >
                <Title title="Nuevo trámite" />
                <Grid container spacing={2} sx={{ mt: '10px' }}>
                    <Grid item xs={12} sm={12}>
                        <Box sx={{ width: '100%' }}>
                            <Stepper nonLinear activeStep={activeStep}>
                                {steps.map((label, index) => (
                                    <Step key={label} completed={completed[index]}>
                                        <StepButton color="inherit">
                                            {label}
                                        </StepButton>
                                    </Step>
                                ))}
                            </Stepper>
                            <div>
                                {allStepsCompleted() ? (
                                    <React.Fragment>
                                        <Typography sx={{ mt: 2, mb: 1 }}>
                                            All steps completed - you&apos;re finished
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button onClick={handleReset}>Restablecer</Button>
                                        </Box>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        {activeStep === 0 && <Box>
                                            <Grid container sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                <TipoTramite usuario={props.usuario} crear_tramite={crear_tramite} set_formulario_paso_uno={set_formulario_paso_uno} set_crear_tramite={set_crear_tramite} set_crear_tramite_error={set_crear_tramite_error} limpiar={limpiar} set_tramite_servicio={set_tramite_servicio} set_response_paso_1={set_response_paso_1}></TipoTramite>
                                            </Grid>
                                        </Box>}
                                        {activeStep === 1 && <Box>
                                            <Grid container sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                <DocumentosAnexos usuario={props.usuario} cargar_anexos={cargar_anexos} set_cargar_anexos={set_cargar_anexos} response_paso_1={response_paso_1} set_anexar_error={set_anexar_error}></DocumentosAnexos>
                                            </Grid>
                                        </Box>}
                                        {activeStep === 2 && <Box>
                                            <Grid container sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                <ResumenTramite formulario_paso_uno={formulario_paso_uno}></ResumenTramite>
                                            </Grid>
                                        </Box>}
                                        {activeStep === 3 && <Box>
                                            <Grid container sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                <Radicado usuario={props.usuario} response_paso_1={response_paso_1} radicado={radicado} usuario_cache={props.usuario_cache} set_restablecer={set_restablecer}></Radicado>
                                            </Grid>
                                        </Box>}
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            {activeStep !== steps.length &&
                                                (completed[activeStep] ? (
                                                    <Typography variant="subtitle2" sx={{ display: 'inline-block', mt: '7px' }}>
                                                        {steps[activeStep]} fue completado.
                                                    </Typography>
                                                ) : (
                                                    activeStep !== 3 && <Button variant={completedSteps() === totalSteps() - 2 ? 'contained':'outlined' } onClick={handleComplete}>
                                                        {completedSteps() === totalSteps() - 2 ? 'Radicar' : 'Siguiente'}
                                                    </Button>
                                                ))}
                                        </Box>
                                    </React.Fragment>
                                )}
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            }
        </>
    )
}