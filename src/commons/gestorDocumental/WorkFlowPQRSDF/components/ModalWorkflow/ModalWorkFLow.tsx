/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from "react";
import { Button, Grid, Dialog } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Title } from "../../../../../components/Title";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CheckIcon from "@mui/icons-material/Check";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SettingsIcon from "@mui/icons-material/Settings";
import EmailIcon from "@mui/icons-material/Email";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';

const steps = [
    { label: 'GUARDADO', value: 0 },
    {
        label: 'RADICADO',
        value: 0,
        subSteps: [
            { label: 'RADICADO INTERNO', value: 0 },
            // Agrega otros pasos específicos de la subrama aquí si es necesario
        ],
    },
    { label: 'EN VENTANILLA CON PENDIENTES', value: 0 },
    { label: 'EN VENTANILLA SIN PENDIENTES', value: 0 },
    { label: 'EN GESTION', value: 0 },
    { label: 'RESPONDIDA', value: 0 },
    { label: 'NOTIFICADA', value: 0 },
];

export const ModalFlujoDeTrabajo = () => {
    const [estaModalAbierta, setEstaModalAbierta] = useState(false);

    const cerrarModal = () => {
        setEstaModalAbierta(false);
    };


    const varaible_poso=2;
    return (
        <>
            <Grid item xs={12} sm={5} md={3.6} lg={2.5}>
                <Button
                    startIcon={<ClearIcon />}
                    fullWidth
                    style={{ width: "90%", marginTop: 15, backgroundColor: "orange" }}
                    variant="contained"
                    onClick={() => { setEstaModalAbierta(true) }} >
                    Consultar
                </Button>
            </Grid>

            <Dialog open={estaModalAbierta} fullWidth maxWidth="xl" onClose={cerrarModal}>
                <Grid
                    container
                    sx={{
                        position: 'relative',
                        background: '#FAFAFA',
                        borderRadius: '15px',
                        p: '20px',
                        mb: '20px',
                        boxShadow: '0px 3px 6px #042F4A26',
                    }}
                >
                    <Grid item xs={12}>
                        <Title title="Consultar Años Anteriores" />
                    </Grid>

                    {/* Contenido */}
                    <Box sx={{ width: '100%', marginTop: 5 }}>
                        <Stepper activeStep={varaible_poso} alternativeLabel>
                            {steps.map(({ label, value, subSteps }, index) => (
                                <Step key={label}>
                                    <StepLabel
                                        icon={getStepIcon(index)}
                                        sx={{
                                            color: index === varaible_poso ? 'green' : 'inherit',
                                        }}
                                    >
                                        {label}
                                        <div style={{ marginTop: 5 }}>{` ${value}`}</div>
                                        {subSteps && (
                                            <Stepper activeStep={0} alternativeLabel style={{ marginTop: 12 }}>
                                                {subSteps.map(({ label: subLabel, value: subValue }, subIndex) => (
                                                    <Step key={subLabel}>
                                                        <StepLabel
                                                            icon={getSubStepIcon(subIndex)}
                                                            sx={{
                                                                color: subIndex === 2 ? 'blue' : 'inherit',
                                                            }}
                                                        >
                                                            <div style={{ marginTop: 5 }}>{`${index + 1}.${subIndex + 1}`}</div>
                                                            {subLabel}
                                                            <div style={{ marginTop: 5 }}>{`${subValue}`}</div>
                                                        </StepLabel>
                                                    </Step>
                                                ))}
                                            </Stepper>
                                        )}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

                    <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                        <Button
                            startIcon={<ClearIcon />}
                            fullWidth
                            style={{ width: "90%", marginTop: 15 }}
                            variant="contained"
                            color="error"
                            onClick={cerrarModal}
                        >
                            Salir
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
};

const getStepIcon = (index:any) => {
    switch (index) {
        case 0:
            return <SaveOutlinedIcon />;
        case 1:
            return <DescriptionOutlinedIcon />;
        case 2:
            return <AssignmentLateOutlinedIcon />;
        case 3:
            return <AssignmentTurnedInIcon />;
        case 4:
            return <SettingsIcon />;
        case 5:
            return <ChatIcon />;
        case 6:
            return <NotificationsIcon />;
        default:
            return null;
    }
};

const getSubStepIcon = (subIndex:any) => {
    switch (subIndex) {
        case 0:
            return <CheckIcon />;
        case 1:
            return <AssignmentIcon />;
        case 2:
            return <HourglassEmptyIcon />;
        case 3:
            return <AssignmentTurnedInIcon />;
        case 4:
            return <SettingsIcon />;
        case 5:
            return <EmailIcon />;
        case 6:
            return <ClearIcon />;
        default:
            return null;
    }
};
