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
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Radicado: React.FC<IProps> = (props: IProps) => {
    const [limpiar, set_limpiar] = useState<boolean>(false);

    useEffect(() => {
        if (limpiar) {
        }
    }, [limpiar]);

    const limpiar_formulario = (): void => {

    }

    return (
        <>
            <Grid item container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="button" gutterBottom>
                        Otro procedimiento administrativo radicado con éxito
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}