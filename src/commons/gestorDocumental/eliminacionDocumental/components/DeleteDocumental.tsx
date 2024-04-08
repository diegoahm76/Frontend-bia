/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import type React from "react";
import { useEffect, useState } from "react";
import { Title } from "../../../../components";
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import { api, baseURL } from "../../../../api/axios";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { control_error, control_success } from "../../../../helpers";
import { RadioGroup, FormControlLabel, Radio, Typography, } from "@mui/material";
import { FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent, } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { HistoricoEliminacion } from "./HistoricoEliminacion";
import { miEstilo } from "../../Encuesta/interfaces/types";
import { Eliminacion } from "./Eliminacion";

interface ConfiguracionBasica {
    id_valores_variables: any;
    fecha_inicio: any;
    fecha_fin: any;
    valor: any;
    variables: any;
    nombre_tipo_cobro: any;
    nombre_tipo_rentaany: any;
    nombre_variable: any;
    descripccion: any;
}


const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: '#784af4',
        }),
        '& .QontoStepIcon-completedIcon': {
            color: '#784af4',
            zIndex: 1,
            fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
    }),
);

function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <SettingsIcon />,
        2: <GroupAddIcon />,
        3: <VideoLabelIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const steps = ['Histórico de eliminación', 'Eliminación   ', 'salir'];

export const DeleteDocumental: React.FC = () => {
    const [configuraciones, setConfiguraciones] = useState<ConfiguracionBasica[]>([]);
    const fetchConfiguraciones = async (): Promise<void> => {
        try {
            const url = "/recaudo/configuracion_baisca/valoresvariables/get/";
            const res = await api.get(url);
            const configuracionesData: ConfiguracionBasica[] = res.data?.data || [];
            setConfiguraciones(configuracionesData);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        void fetchConfiguraciones();
    }, []);

    const columns = [
        { field: 'nombre_tipo_renta', headerName: 'Tipo de Renta', width: 130, flex: 1 },
        { field: 'nombre_tipo_cobro', headerName: 'Tipo de Cobro', width: 130, flex: 1 },
        { field: 'descripccion', headerName: 'Descripción', width: 200, flex: 1 },
        { field: 'nombre_variable', headerName: 'varible', width: 130, flex: 1 },
        { field: 'estado', headerName: 'estado', width: 130, flex: 1 },
        { field: 'fecha_inicio', headerName: 'fecha inicio', width: 130, flex: 1 },
        { field: 'fecha_fin', headerName: 'Fecha fin', width: 130, flex: 1 },
        { field: 'valor', headerName: 'valor', width: 130, flex: 1 },
    ];

    /// TAP 
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getMessage = (step: number) => {
        switch (step) {
            case 0:
                return <>
                    <HistoricoEliminacion />
                </>
                    ;
            case 1:
                return <>
                    <Eliminacion />
                </>;
            default:
                return '';
        }
    };
    return (
        <>
            <Grid container
                spacing={2} m={2} p={2}
                sx={miEstilo}
            >

                <Title title="Eliminacion documental    "></Title>

                <Grid item xs={12} sm={12} marginTop={3}>
                    <Stack sx={{ width: '100%' }} spacing={4}>
                        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Stack>
                </Grid>



                <Grid item xs={12} sm={12} marginTop={3}>

                </Grid>
                {getMessage(activeStep)}



                <Grid item xs={12} sm={12} marginTop={3}>

                </Grid>


            </Grid>



            <Grid container
                spacing={2} m={2} p={2}
                sx={miEstilo}
            >

                <Grid item xs={4} sm={2}>
                    <Button fullWidth variant='contained' disabled={activeStep === 0} onClick={handleBack}>
                        Anterior
                    </Button>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <Button fullWidth variant='contained' disabled={activeStep === steps.length - 1} onClick={handleNext}>
                        Siguiente
                    </Button>

                </Grid>

            </Grid>
        </>
    );
};