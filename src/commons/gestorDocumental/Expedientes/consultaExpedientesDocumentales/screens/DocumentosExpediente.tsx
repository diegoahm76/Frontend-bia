import { Grid, Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { obtener_usuario_logueado } from "../../aperturaExpedientes/thunks/aperturaExpedientes";
import { useAppDispatch } from "../../../../../hooks";
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { Title } from "../../../../../components/Title";
import { BusquedaExpediente } from "./BusquedaExpediente";
import { InformacionExpediente } from "./InformacionExpediente";
dayjs.extend(dayOfYear);
const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocumentosExpediente: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <>
            <Grid item md={12} xs={12}>
                <Title title="Documentos de expedientes" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            Documentos de expedientes
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    )
}