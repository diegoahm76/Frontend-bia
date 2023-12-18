/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Button, Stack, Box, Stepper, Step, StepButton, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import CleanIcon from '@mui/icons-material/CleaningServices';
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
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResumenTramite: React.FC<IProps> = (props: IProps) => {
    const navigate = useNavigate();
    const [expediente, set_expediente] = useState<any>(null);
    const [documento, set_documento] = useState<any>(null);
    const [limpiar, set_limpiar] = useState<boolean>(false);

    useEffect(() => {
        if (limpiar) {
        }
    }, [limpiar]);

    const limpiar_formulario = (): void => {
        set_limpiar(true);
    }

    const salir_expediente: () => void = () => {
        navigate('/home');
    }

    return (
        <>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Título"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Tipo de expediente"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Año de apertura"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Titular"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={'N/A'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Etapa actual"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Fecha folio inicial"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={''}
                            />
                        </Grid>
                    </Grid>
        </>
    )
}