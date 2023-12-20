/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Button, Stack, Box, Stepper, Step, StepButton, Typography, TextField, Tooltip, IconButton, Avatar, Fab, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Title } from "../../../../components/Title";
import React from "react";
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
    formulario_paso_uno: any,
    set_eliminar_tramite: any,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResumenTramite: React.FC<IProps> = (props: IProps) => {
    const [expediente, set_expediente] = useState<any>(null);
    const [documento, set_documento] = useState<any>(null);
    const [limpiar, set_limpiar] = useState<boolean>(false);

    useEffect(() => {
        console.log(props.formulario_paso_uno)
    }, [props.formulario_paso_uno]);

    const eliminar_archivos: any = () => {
        props.set_eliminar_tramite(true);
    }

    return (
        <>
            <Grid item container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="button" gutterBottom>
                        Resumen de la solicitud de permisos pendientes a radicar
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={2} sx={{padding:'5px', marginTop:'4px'}}>
                        <Typography variant="button" gutterBottom>
                            {props.formulario_paso_uno?.desc_permiso_ambiental}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Tooltip title="Eliminar">
                        <IconButton onClick={() => { eliminar_archivos();}}>
                            <Avatar
                                sx={{
                                    width: 45,
                                    height: 32,
                                    background: '#d32f2f',
                                    border: '1px solid',
                                }}
                                variant="rounded"
                            >
                                <DeleteOutlineOutlinedIcon
                                    sx={{ color: 'white', width: '20px', height: '20px' }}
                                />
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Fab size="small" variant="extended" sx={true ? { marginX: '2px', marginY: '1px', backgroundColor: 'green', color: 'white', px: '20px' } : { marginX: '2px', marginY: '1px', backgroundColor: '#ff9800', color: 'black', px: '20px' }}>
                        {true ? 'Completado' : 'Sin completar'}
                    </Fab>
                </Grid>
            </Grid>
        </>
    )
}