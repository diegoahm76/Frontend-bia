/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from "react";
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
import { api } from "../../../../../api/axios";
import './ModalWorkFlow.css';  // Asegúrate de ajustar la ruta según la ubicación real del archivo

const steps = [
    { label: 'GUARDADO', value: 0 },
    {
        label: 'RADICADO',
        value: 0,

    },
    {
        label: 'EN VENTANILLA CON PENDIENTES', value: 0, subSteps: [
            {
                label: 'RADICADO INTERNO',
                value: 0,
                subSteps: [
                    { label: 'NUEVO SUBPASO', value: 0 },
                ],
            },
            // Agrega otros pasos específicos de la subrama aquí si es necesario
        ],
    },
    { label: 'EN VENTANILLA SIN PENDIENTES', value: 0 },
    {
        label: 'EN GESTION', value: 0, subSteps: [
            {
                label: 'RADICADO INTERNO',
                value: 0,
                subSteps: [
                    { label: 'NUEVO SUBPASO', value: 0 },
                ],
            },
        ],
    },
    { label: 'RESPONDIDA', value: 0 },
    { label: 'NOTIFICADA', value: 0 },
];



interface Iconsulta {
    arbol_solicitudes: any[];
}

interface ModalFlujoDeTrabajoProps {
    data: any;
    onClose: () => void;
}

export const ModalFlujoDeTrabajo: React.FC<ModalFlujoDeTrabajoProps> = ({ data, onClose }) => {
    const [estadoWordFlow, set_estadoWordFlow] = useState<Iconsulta>({ arbol_solicitudes: [] });

    console.log("estadoWordFlow", estadoWordFlow.arbol_solicitudes);
    console.log("data", data);
    const consulta_estado_word_flow = async (): Promise<void> => {
        try {
            let url = `gestor/pqr/listar_informacion_arbol/131/`;
            const res = await api.get(url);
            const Data_consulta = res.data;
            set_estadoWordFlow(Data_consulta);
        } catch (error) {
            console.error(error);
        }
    };

    const cerrarModal = () => {
        onClose();
    };

    const variable_poso = 2;

    useEffect(() => {
        consulta_estado_word_flow();
    }, []);

    return (
        <Dialog open={true} fullWidth maxWidth="xl" onClose={cerrarModal}>
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
                    <Stepper activeStep={variable_poso} alternativeLabel>
                        {steps.map(({ label, value, subSteps }, index) => (
                            <Step  key={label}>
                                <StepLabel
                                    icon={getStepIcon(index)}
                                    sx={{
                                        color: index === variable_poso ? 'green' : 'inherit',
                                        position: 'relative',
                                    }}
                                >
                                    {label}
                                    <div style={{ marginTop: 0 }}>{` ${value}`}</div>
                                    {subSteps && (
                                        <Stepper activeStep={0} alternativeLabel style={{ marginTop: 12 }}>
                                            {subSteps.map(({ label: subLabel, value: subValue }, subIndex) => (
                                                <Step key={subLabel}>
                                                    <StepLabel
                                                        icon={getSubStepIcon(subIndex, 'RADICADO INTERNO')}
                                                        sx={{
                                                            color: subIndex === 2 ? 'blue' : 'inherit',
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        <div style={{ marginTop: 5 }}>{`${index + 1}.${subIndex + 1}`}</div>
                                                        {subLabel}
                                                        <div style={{ marginTop: 5 }}>{`${subValue}`}</div>

                                                        {/* Añade líneas entre los iconos */}
                                                        {subIndex > 0 && (
                                                            <div className="stepper-line-vertical" style={{ top: '-12px' }} />
                                                        )}
                                                        {/* <div className="stepper-line" /> */}
                                                    </StepLabel>

                                                    {/* Agregar otro StepLabel debajo de "RADICADO INTERNO" */}
                                                    {subLabel === 'RADICADO INTERNO' && (
                                                        <Step>
                                                            <StepLabel
                                                                icon={getSubStepIcon(subIndex, 'OTRO SUBPASO')}
                                                                sx={{
                                                                    color: subIndex === 2 ? 'blue' : 'inherit',
                                                                    position: 'relative',
                                                                }}
                                                            >
                                                                <div style={{ marginTop: 5 }}>{`${index + 1}.${subIndex + 2}`}</div>
                                                                {'OTRO SUBPASO'}
                                                                {/* Agrega cualquier contenido adicional según tus necesidades */}
                                                                <div className="stepper-line" style={{ top: '-12px' }} />
                                                            </StepLabel>
                                                        </Step>
                                                    )}
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
    );
};

const getStepIcon = (index: any) => {
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


const getSubStepIcon = (subIndex: any, parentLabel: any) => {
    if (parentLabel === 'RADICADO INTERNO') {
        switch (subIndex) {
            case 0:
                return <NotificationsIcon />; // Ícono original para "RADICADO INTERNO"
            case 1:
                return <SettingsIcon />; // Nuevo ícono adicional para "RADICADO INTERNO"
            // Agrega más casos según sea necesario
            default:
                return null;
        }
    }


    // Si no, asigna íconos según el subíndice
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