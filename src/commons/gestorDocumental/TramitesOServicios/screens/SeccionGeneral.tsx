/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Button, Stack, Box, Stepper, Step, StepButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Title } from "../../../../components/Title";
import React from "react";
import { TipoTramite } from "./TipoTramite";
import { DocumentosAnexos } from "./DocumentosAnexos";
import { ResumenTramite } from "./ResumenTramite";
import { Radicado } from "./Radicado";
const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
}
interface IProps {
    usuario: any,
}
const steps = ['Tipo de trámite', 'Documentos anexos del trámite - OPAS', 'Resumen del trámite','Radicación del trámite'];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeccionGeneral: React.FC<IProps> = (props: IProps) => {
    const [formulario_paso_uno, set_formulario_paso_uno] = useState<any>(null);
    const [limpiar, set_limpiar] = useState<boolean>(false);
    // Inicia Configuración Stepper
    const [activeStep, setActiveStep] = React.useState(0);
    const [nuevo_tramite, set_nuevo_tramite] = React.useState<boolean>(false);
    const [proceso_tramite, set_proceso_tramite] = React.useState<boolean>(false);
    const [resumen_tramite, set_resumen_tramite] = React.useState<boolean>(false);
    const [crear_tramite, set_crear_tramite] = React.useState<boolean>(false);
    const [crear_tramite_error, set_crear_tramite_error] = React.useState<boolean>(false);
    const [eliminar_tramite, set_eliminar_tramite] = React.useState<boolean>(false);
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
        if(activeStep === 0){
            set_crear_tramite(true);
        }
        if(activeStep !== 0){
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
        if (crear_tramite_error) {
            const newCompleted = completed;
            newCompleted[activeStep] = true;
            setCompleted(newCompleted);
            const newActiveStep = isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
            setActiveStep(newActiveStep);
        }
    }, [crear_tramite_error]);
    useEffect(() => {
        if (eliminar_tramite) {
            handleReset();
            set_crear_tramite(false);
            set_crear_tramite_error(false);
            set_eliminar_tramite(false);
            limpiar_formulario();
        }
    }, [eliminar_tramite]);
    useEffect(() => {
        if (limpiar) {
            set_limpiar(false);
        }
    }, [limpiar]);

    const limpiar_formulario = (): void => {
        set_limpiar(true);
    }

    const tramites = (nuevo: boolean, proceso: boolean, resumen: boolean): void => {
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
                    <Grid item xs={12} sm={4} textAlign={'center'}>
                        <Button
                            color="success"
                            variant="contained"
                            onClick={() => { tramites(true,false,false) }}
                        >
                            Nuevo trámite
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} textAlign={'center'}>
                        <Button
                            color='success'
                            variant="outlined"
                            onClick={() => { tramites(false,true,false) }}
                        >
                            Trámites en proceso
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} textAlign={'center'}>
                        <Button
                            color="warning"
                            variant="outlined"
                            onClick={() => { tramites(false,false,true) }}
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
                                            <TipoTramite usuario={props.usuario} crear_tramite={crear_tramite} set_formulario_paso_uno={set_formulario_paso_uno} set_crear_tramite={set_crear_tramite} set_crear_tramite_error={set_crear_tramite_error} limpiar={limpiar}></TipoTramite>
                                            </Grid>
                                        </Box>}
                                        {activeStep === 1 && <Box>
                                            <Grid container sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <DocumentosAnexos usuario={props.usuario}></DocumentosAnexos>
                                            </Grid>
                                        </Box>}
                                        {activeStep === 2 && <Box>
                                            <Grid container sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <ResumenTramite usuario={props.usuario} formulario_paso_uno={formulario_paso_uno} set_eliminar_tramite={set_eliminar_tramite}></ResumenTramite>
                                            </Grid>
                                        </Box>}
                                        {activeStep === 3 && <Box>
                                            <Grid container sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Radicado usuario={props.usuario} formulario_paso_uno={formulario_paso_uno}></Radicado>
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
                                                    activeStep !== 3 && <Button onClick={ handleComplete }>
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
            </Grid>}
        </>
    )
}