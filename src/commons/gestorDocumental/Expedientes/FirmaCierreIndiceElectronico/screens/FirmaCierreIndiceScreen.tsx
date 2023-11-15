import { Grid, Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { obtener_usuario_logueado } from "../../aperturaExpedientes/thunks/aperturaExpedientes";
import { useAppDispatch } from "../../../../../hooks";
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { ExpedienteSeleccionado } from "./ExpedienteSeleccionado";
import { Title } from "../../../../../components/Title";
import BuscarExpediente from "./BuscarExpediente";
import { IndiceSeleccionado } from "./IndiceSeleccionado";
import { CierreIndiceElectronico } from "./CierreIndiceElectronico";
import { VerCierreIndiceElectronico } from "./VerCierreIndiceElectronico";
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
export const FirmaCierreIndiceScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [expediente, set_expediente] = useState<any>(null);
    const [indice, set_indice] = useState<any>(null);
    const [abrir_modal_buscar, set_abrir_modal_buscar] = useState<boolean>(false);
    const [limpiar, set_limpiar] = useState<boolean>(false);

    const salir_expediente: () => void = () => {
        navigate('/home');
    }

    return (
        <>
            <Grid container sx={class_css}>
                <Title title="Cierre de índice electrónico documental" />
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Box
                            component="form"
                            sx={{ mt: '20px', mb: '20px' }}
                            noValidate
                            autoComplete="off"
                        >
                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={2}
                                sx={{ mt: '20px' }}
                            >
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Expediente del índice a buscar"
                                        type={'text'}
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                        value={expediente?.titulo_expediente ?? ''}
                                    />
                                </Grid>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    startIcon={<SearchIcon />}
                                    onClick={() => { set_abrir_modal_buscar(true); }}
                                >
                                    Buscar expediente
                                </Button>
                                {abrir_modal_buscar && <BuscarExpediente is_modal_active={abrir_modal_buscar} set_is_modal_active={set_abrir_modal_buscar} set_expediente={set_expediente} set_indice={set_indice}></BuscarExpediente>}
                            </Stack>
                        </Box>
                    </Grid>

                </Grid>
            </Grid>
            {expediente !== null && <Grid
                container
                sx={class_css}
            >
                <ExpedienteSeleccionado expediente={expediente}></ExpedienteSeleccionado>
            </Grid>}
            {expediente !== null && <Grid
                container
                sx={class_css}
            >
                <IndiceSeleccionado indice={indice}></IndiceSeleccionado>
            </Grid>}
            {indice !== null && indice?.abierto && <Grid
                container
                sx={class_css}
            >
                <CierreIndiceElectronico indice={indice} limpiar={limpiar} expediente={expediente}></CierreIndiceElectronico>
            </Grid>}
            {indice !== null && !indice?.abierto && <Grid
                container
                sx={class_css}
            >
                <VerCierreIndiceElectronico indice={indice}></VerCierreIndiceElectronico>
            </Grid>}
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        sx={{ mt: '10px' }}
                    >
                        <Button
                            color="error"
                            variant='contained'
                            startIcon={<ClearIcon />}
                            onClick={() => { salir_expediente() }}
                        >
                            Salir
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}