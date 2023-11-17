import { Grid, Box, Button, Stack, TextField, Typography, Fab } from "@mui/material";
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
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
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
export const InformacionExpediente: React.FC = () => {
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
            <Grid item md={12} xs={12}>
                <Title title="Información de expedientes" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Título"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Código"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Sección / Subsección propietaria"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Serie"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Subserie"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="TDR"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Tipo de expediente"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Año de apertura"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Titular"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Etapa actual"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Fecha folio inicial"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Fecha folio final"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Unidad organizacional creadora"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Unidad organizacional responsable actual"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={'Texto de prueba'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                spacing={2}
                                sx={{ mt: '5px' }}

                            >
                                <Grid item xs={12} sm={2}>
                                    <Typography sx={{ fontSize: '18px', fontWeight: '420' }}> Estado </Typography>
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                            >
                                <Grid item xs={12} sm={4} sx={{ pointerEvents: 'none' }}>
                                    <Fab size="small" variant="extended" sx={true ? { marginX: '2px', marginY: '1px', backgroundColor: 'green', color: 'white', px: '20px' } : { marginX: '2px', marginY: '1px', backgroundColor: '#ff9800', color: 'black', px: '20px' }}>
                                        {true ? 'Abierto' : 'Cerrado'}
                                    </Fab>
                                </Grid>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container>
                <Grid item xs={12} sm={4}>
                    <Box
                        component="form"
                        sx={{ mt: '20px', mb: '20px' }}
                        noValidate
                        autoComplete="off"
                    >
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            spacing={2}
                            sx={{ mt: '20px' }}
                        >
                            <Button
                                color='primary'
                                variant='outlined'
                                startIcon={<ListOutlinedIcon />}
                                onClick={() => { set_abrir_modal_buscar(true); }}
                            >
                                Conceder acceso a expediente
                            </Button>
                            {/* {abrir_modal_buscar && <BuscarExpediente is_modal_active={abrir_modal_buscar} set_is_modal_active={set_abrir_modal_buscar} set_expediente={set_expediente} serie={serie}></BuscarExpediente>} */}
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Box
                        component="form"
                        sx={{ mt: '20px', mb: '20px' }}
                        noValidate
                        autoComplete="off"
                    >
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            spacing={2}
                            sx={{ mt: '20px' }}
                        >
                            <Button
                                color="primary"
                                variant="outlined"
                                startIcon={<CloudDownloadOutlinedIcon />}
                                onClick={() => { }}
                            >
                                Descargar expediente
                            </Button>
                            <Button
                                color="primary"
                                variant='outlined'
                                startIcon={<ListOutlinedIcon />}
                                onClick={() => { salir_expediente() }}
                            >
                                Ver índice electrónico
                            </Button>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
                </Box>
            </Grid>
        </>
    )
}