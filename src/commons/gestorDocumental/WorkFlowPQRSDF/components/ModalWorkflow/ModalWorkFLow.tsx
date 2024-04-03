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
import './ModalWorkFlow.css';

interface SubStep {
    label: string;
    value?: number;
}

interface StepData {
    label: string;
    value: number;
    subSteps?: SubStep[];
}

interface Iconsultadostres {
    primer_nombre?: string;

}

interface Iconsultados {
    solicitud: string;
    fecha_registro: string;
    fecha_radicado?: string | null; // Añadido el tipo correcto aquí
    persona_asignada: Iconsultadostres[];
}

interface Iconsulta {
    arbol_solicitudes: Iconsultados[];
}

interface ModalFlujoDeTrabajoProps {
    data: any;
    onClose: () => void;
}


export const ModalFlujoDeTrabajo: React.FC<ModalFlujoDeTrabajoProps> = ({ data, onClose }) => {

    const [estadoWordFlow, set_estadoWordFlow] = useState<Iconsulta>({ arbol_solicitudes: [] });
    const seEncontroGUARDADO = estadoWordFlow.arbol_solicitudes.some(item => item.solicitud === "GUARDADO");
    const guardadoFechaRegistro = seEncontroGUARDADO ? estadoWordFlow.arbol_solicitudes.find(item => item.solicitud === "GUARDADO")?.fecha_registro || 0 : 0;

    const seEncontroRADICADO = estadoWordFlow.arbol_solicitudes.some(item => item.solicitud === "RADICADO");
    const guardadoFechaRegistroRADICADO = seEncontroRADICADO
        ? estadoWordFlow.arbol_solicitudes.find(item => item.solicitud === "RADICADO")?.fecha_radicado || ""
        : "";

    const seEncontroENVENTANILLACONPENDIENTES = estadoWordFlow.arbol_solicitudes.some(item => item.solicitud === "EN VENTANILLA CON PENDIENTES");
    const seEncontroENVENTANILLASINPENDIENTES = estadoWordFlow.arbol_solicitudes.some(item => item.solicitud === "EN VENTANILLA SIN PENDIENTES");


    const seEncontroENGESTION = estadoWordFlow.arbol_solicitudes.some(item => item.solicitud === "EN GESTION");
    const guardadoFechaRegistroENGESTION = seEncontroENGESTION
        ? (estadoWordFlow.arbol_solicitudes.find(item => item.solicitud === "EN GESTION")?.persona_asignada?.[0]?.primer_nombre || "")
        : "";



    const seEncontroRESPONDIDA = estadoWordFlow.arbol_solicitudes.some(item => item.solicitud === "RESPONDIDA");

    const cantidadTrue = [
        seEncontroGUARDADO,
        seEncontroRADICADO,
        seEncontroENVENTANILLACONPENDIENTES,
        seEncontroENVENTANILLASINPENDIENTES,
        seEncontroENGESTION,
        seEncontroRESPONDIDA
    ].filter(Boolean).length;


    console.log("variable_poso", seEncontroGUARDADO, seEncontroRADICADO, seEncontroENVENTANILLACONPENDIENTES, seEncontroENVENTANILLASINPENDIENTES, seEncontroENGESTION, seEncontroRESPONDIDA);
    const variable_poso = cantidadTrue-1;



    const steps = [
        { label: 'GUARDADO', value: guardadoFechaRegistro.toString() },
        {
            label: 'RADICADO',
            value: guardadoFechaRegistroRADICADO.toString(),
        },
        {
            label: 'EN VENTANILLA CON PENDIENTES', value: null, subSteps: [
                {
                    label: 'RADICADO INTERNO',
                    value: 0,
                    subSteps: [
                        { label: 'NUEVO SUBPASO', value: 0 },
                    ],
                },
            ],
        },
        { label: 'EN VENTANILLA SIN PENDIENTES', value: 0 },
        {
            label: 'EN GESTION', value: 0, subSteps: [
                {
                    label: 'RADICADO INTERNO',
                    value: guardadoFechaRegistroENGESTION.toString(),
                    subSteps: [
                        { label: 'NUEVO SUBPASO', value: 0 },
                    ],
                },
            ],
        },
        { label: 'RESPONDIDA', value: 0 },
        { label: 'NOTIFICADA', value: 0 },
    ];


    console.log("estadoWordFlow", estadoWordFlow.arbol_solicitudes);


    const consulta_estado_word_flow = async (): Promise<void> => {
        try {
            let url = `gestor/pqr/listar_informacion_arbol/${+data}/`;
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
                    <Title title="WordFlow" />
                </Grid>

                {/* Contenido */}
                <Box sx={{ width: '100%', marginTop: 5 }}>
                    <Stepper activeStep={variable_poso} alternativeLabel>
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    icon={getStepIcon(index)}
                                    sx={{
                                        color: index === variable_poso ? 'green' : 'inherit',
                                        position: 'relative',
                                    }}
                                >
                                    {step.label}
                                    <div style={{ marginTop: 0 }}>{` ${step.value}`}</div>
                                    {step.subSteps && (
                                        <Stepper activeStep={0} alternativeLabel style={{ marginTop: 12 }}>
                                            {step.subSteps.map((subStep, subIndex) => (
                                                <Step key={subStep.label}>
                                                    <StepLabel
                                                        icon={getSubStepIcon(subIndex, 'RADICADO INTERNO')}
                                                        sx={{
                                                            color: subIndex === 2 ? 'blue' : 'inherit',
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        <div style={{ marginTop: 5 }}>{`${index + 1}.${subIndex + 1}`}</div>
                                                        {subStep.label}
                                                        <div style={{ marginTop: 5 }}>{`${subStep.value}`}</div>
                                                        {subIndex > 0 && (
                                                            <div className="stepper-line-vertical" style={{ top: '-12px' }} />
                                                        )}
                                                    </StepLabel>
                                                    {subStep.label === 'RADICADO INTERNO' && (
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

                <Grid container spacing={2} justifyContent="flex-end">
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
