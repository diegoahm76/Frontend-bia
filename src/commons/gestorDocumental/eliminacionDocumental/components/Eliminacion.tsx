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
export const Eliminacion: React.FC = () => {
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

    return (
        <>

            <>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        type="date"
                        size="small"
                        variant="outlined"
                        label=" Fecha publicación"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        type="date"
                        size="small"
                        variant="outlined"
                        label=" Fecha de eliminación"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <DataGrid
                        rows={configuraciones}
                        columns={columns}
                        pageSize={5}
                        autoHeight
                        getRowId={(row) => row.id_valores_variables}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Obsrervaciones"
                        fullWidth
                        disabled
                        multiline
                        rows={4}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="Obsrervaciones"

                    />
                </Grid>
            </>
            <Title title="Información  de expediente"></Title>

            <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Persona 1:</h4>
                <div>. 2:</div>
            </Grid>


            <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Códig:</h4>
                <div>. 2:</div>
            </Grid>
            <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Seccion/subsección 1:</h4>
                <div>. 2:</div>
            </Grid>
            <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Serie :</h4>
                <div>. 2:</div>
            </Grid>
            <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Subserie:</h4>
                <div>. 2:</div>
            </Grid>
            <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>TRD:</h4>
                <div>. 2:</div>
            </Grid>
            <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Tipo de expediente :</h4>
                <div>. 2:</div>
            </Grid>
            <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Año de apertura:</h4>
                <div>. 2:</div>
            </Grid>
            <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Titular:</h4>
                <div>. 2:</div>
            </Grid>
            <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Etapa actual:</h4>
                <div>. 2:</div>
            </Grid>
            <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Fecha folio inicial:</h4>
                <div>. 2:</div>
            </Grid>
            <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Fecha folio final:</h4>
                <div>. 2:</div>
            </Grid>
            <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Unidad organizacional creadora:</h4>
                <div>. 2:</div>
            </Grid>
            <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Unidad organizacional actual:</h4>
                <div>. 2:</div>
            </Grid>

            <Grid item xs={12} sm={12} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Estado </h4>
                <div>. 2:</div>
            </Grid>





        </>
    );
};