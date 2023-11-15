import { Grid, TextField, Box, Stack, Accordion, AccordionSummary, Typography, AccordionDetails, Fab, Button } from "@mui/material";
import { Title } from "../../../../../components/Title";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../hooks";
import { obtener_usuario_logueado } from "../../aperturaExpedientes/thunks/aperturaExpedientes";
import SaveIcon from '@mui/icons-material/Save';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import moment from "moment";
import { enviar_codigo_verificación, validar_codigo_verificación } from "../thunks/FirmaCierreIndice";

interface IProps {
    expediente: any,
    indice: any,
    limpiar: boolean
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CierreIndiceElectronico: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [usuario, set_usuario] = useState<any>(null);
    const [codigo_verificacion, set_codigo_verificacion] = useState<string>("");
    const [observaciones, set_observaciones] = useState<string>("");
    const [deshabilitar, set_deshabilitar] = useState<boolean>(false);
    const [validar, set_validar] = useState<boolean|null>(null);
    const [countdown, set_countdown] = useState<number>();
    useEffect(() => {
        obtener_usuario_logueado_fc();
    }, []);

    const obtener_usuario_logueado_fc: () => void = () => {
        dispatch(obtener_usuario_logueado()).then((response: any) => {
            set_usuario(response);
        })
    }
    const cambio_codigo_verificacion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_codigo_verificacion(e.target.value);
    };
    const cambio_observaciones: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_observaciones(e.target.value);
    };

    const enviar_codigo_verificacion: () => void = () => {
        dispatch(enviar_codigo_verificación(props.indice?.id_indice_electronico_exp)).then((response: any) => {
            set_deshabilitar(false);
        })
        set_deshabilitar(true);
        const now = moment();
        const interval = setInterval(() => {
            const now_ciclo = moment();
            const then = now.add(60, 'second');
            const countdown = moment.duration(then.diff(now_ciclo)).seconds();
            set_countdown(countdown);
            if (countdown <= 0) {
                clearInterval(interval);
                set_deshabilitar(false);
                console.log('¡El tiempo ha terminado!');
            }
        }, 1000);
    }
    const validar_codigo_verificacion: () => void = () => {
        dispatch(validar_codigo_verificación(props.indice?.id_indice_electronico_exp,codigo_verificacion)).then((response: any) => {
            set_validar(true);
        })
    }

    useEffect(() => {
        if (props.limpiar) {
        }
    }, [props.limpiar]);

    return (
        <>
            {props.expediente !== null && <Grid item md={12} xs={12}>
                <Title title="Cierre de índice electrónico" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                            >
                                <Grid item xs={12} sm={2}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Fecha actual"
                                            value={dayjs()}
                                            onChange={(newValue) => { }}
                                            readOnly={true}
                                            renderInput={(params) => (
                                                <TextField
                                                    required
                                                    fullWidth
                                                    size="small"
                                                    {...params}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                            >
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        label="Usuario que firma el cierre"
                                        type={'text'}
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                        value={usuario?.nombre ?? ''}
                                    />
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={2}
                                sx={{ mt: '5px' }}

                            >
                                <Typography sx={{ fontSize: '18px', fontWeight: '420' }}> Se enviará un codigó de verificación a los siguientes medios de contacto </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Stack direction="row" justifyContent="center">
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Número telefónico"
                                        type={'text'}
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                        value={usuario?.telefono_celular}
                                    />
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Stack direction="row" justifyContent="center">
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Correo electrónico"
                                        type={'text'}
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                        value={usuario?.email}
                                    />
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Stack direction="row" justifyContent="center">
                                <Button
                                    color='primary'
                                    variant='outlined'
                                    startIcon={deshabilitar ? <CachedOutlinedIcon /> : <SendOutlinedIcon />}
                                    onClick={() => { enviar_codigo_verificacion() }}
                                    disabled={deshabilitar}
                                >
                                    {deshabilitar ? 'Volver a enviar código en ' + '(' + countdown + ')' : 'Enviar código'}
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Stack direction="row" justifyContent="center">
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Ingrese el código de verificación"
                                        type={'text'}
                                        size="small"
                                        fullWidth
                                        onChange={cambio_codigo_verificacion}
                                        value={codigo_verificacion}
                                    />
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                spacing={2}
                                sx={{ mt: '2px' }}

                            >
                                <Grid item xs={12} sm={3}>
                                <Button
                                    color='primary'
                                    variant='outlined'
                                    startIcon={<CheckOutlinedIcon />}
                                    onClick={() => { validar_codigo_verificacion()  }}
                                    disabled={deshabilitar}
                                >
                                    Validar
                                </Button>
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                            >
                                <Grid item xs={12} sm={4} sx={{ pointerEvents: 'none' }}>
                                    <Fab size="small" variant="extended" sx={validar ? { marginY: '3px', backgroundColor: 'green', color: 'white', px: '20px' } : { marginY: '3px', backgroundColor: '#ff9800', color: 'black', px: '20px' }}>
                                        {validar ? 'Correcto' : 'Incorrecto'}
                                    </Fab>
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Stack direction="row" justifyContent="center">
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Observaciones de la firma de cierre del índice"
                                        multiline
                                        rows={3}
                                        type={'text'}
                                        size="small"
                                        fullWidth
                                        disabled={!validar}
                                        onChange={cambio_observaciones}
                                        value={observaciones}
                                    />
                                </Grid>
                            </Stack>
                        </Grid>
                   {validar &&  <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                spacing={2}
                                sx={{ mt: '10px' }}
                            >
                                <Button
                                    color='success'
                                    variant='contained'
                                    startIcon={<SaveIcon />}
                                    onClick={() => {  }}
                                >
                                    Guardar cierre
                                </Button>
                            </Stack>
                        </Grid>}
                    </Grid>
                </Box>
            </Grid>}
        </>
    )
}