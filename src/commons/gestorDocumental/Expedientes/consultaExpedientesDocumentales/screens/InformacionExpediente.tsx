import { Grid, Box, Button, Stack, TextField, Typography, Fab } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { Title } from "../../../../../components/Title";
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import ConcederAccesoExpediente from "../../ConcesionAccesoExpedientes/screens/ConcederAccesoExpediente";
dayjs.extend(dayOfYear);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InformacionExpediente: React.FC = () => {
    const navigate = useNavigate();
    const [expediente, set_expediente] = useState<any>(null);
    const [abrir_modal_conceder, set_abrir_modal_conceder] = useState<boolean>(false);

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
                                onClick={() => { set_abrir_modal_conceder(true); }}
                            >
                                Conceder acceso a expediente
                            </Button>
                            {abrir_modal_conceder && <ConcederAccesoExpediente is_modal_active={abrir_modal_conceder} set_is_modal_active={set_abrir_modal_conceder} expediente={expediente} ></ConcederAccesoExpediente>}
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