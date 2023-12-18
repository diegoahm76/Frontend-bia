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
    const [limpiar, set_limpiar] = useState<boolean>(false);
    // Inicia Configuración Stepper
    const [activeStep, setActiveStep] = React.useState(0);
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
    const handleNext = () => {
        const newActiveStep = isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
        setActiveStep(newActiveStep);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };
    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };
    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };
    // Finaliza Configuración Stepper
    useEffect(() => {
        if (limpiar) {
        }
    }, [limpiar]);

    const limpiar_formulario = (): void => {
        set_limpiar(true);
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
                            onClick={() => { limpiar_formulario() }}
                        >
                            Nuevo trámite
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} textAlign={'center'}>
                        <Button
                            color='success'
                            variant="outlined"
                            onClick={() => { limpiar_formulario() }}
                        >
                            Trámites en proceso
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} textAlign={'center'}>
                        <Button
                            color="warning"
                            variant="outlined"
                            onClick={() => { limpiar_formulario() }}
                        >
                            Trámites otorgados / negados
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
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
                                        <StepButton color="inherit" onClick={handleStep(index)}>
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
                                            <TipoTramite usuario={props.usuario}></TipoTramite>
                                            </Grid>
                                        </Box>}
                                        {activeStep === 1 && <Box>
                                            <Grid container sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <DocumentosAnexos usuario={props.usuario}></DocumentosAnexos>
                                            </Grid>
                                        </Box>}
                                        {activeStep === 2 && <Box>
                                            <Grid container sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <ResumenTramite usuario={props.usuario}></ResumenTramite>
                                            </Grid>
                                        </Box>}
                                        {activeStep === 3 && <Box>
                                            <Grid container sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <ResumenTramite usuario={props.usuario}></ResumenTramite>
                                            </Grid>
                                        </Box>}
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Button
                                                color="inherit"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                sx={{ mr: 1 }}
                                            >
                                                anterior
                                            </Button>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            {activeStep !== (steps.length - 1) && <Button onClick={handleNext} sx={{ mr: 1 }}>
                                                Siguiente
                                            </Button>}
                                            {activeStep !== steps.length &&
                                                (completed[activeStep] ? (
                                                    <Typography variant="subtitle2" sx={{ display: 'inline-block', mt: '7px' }}>
                                                        {steps[activeStep]} fue completado.
                                                    </Typography>
                                                ) : (
                                                    <Button onClick={handleComplete}>
                                                        {completedSteps() === totalSteps() - 1
                                                            ? 'Finalizar'
                                                            : 'Guardar'}
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
        </>
    )
}