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
    formulario_paso_uno: any
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResumenTramite: React.FC<IProps> = (props: IProps) => {
    return (
        <>
            <Grid item container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="button" gutterBottom>
                        Resumen de la solicitud de permisos pendientes a radicar
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper elevation={2} sx={{padding:'5px', marginTop:'4px'}}>
                        <Typography variant="button" gutterBottom sx={{mr:'800px'}}>
                            {props.formulario_paso_uno?.desc_permiso_ambiental}
                        </Typography>
                        <Fab size="small" variant="extended" sx={{ marginX: '2px', marginY: '1px', backgroundColor: 'green', color: 'white', px: '20px' }}>Completado</Fab>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}