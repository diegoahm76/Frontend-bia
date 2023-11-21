import { Grid, TextField, Box, Stack, Typography, Fab } from "@mui/material";
import { Title } from "../../../../../components/Title";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface IProps {
    expediente: any
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ExpedienteSeleccionado: React.FC<IProps> = (props: IProps) => {
    return (
        <>
            {props.expediente !== null && <Grid item md={12} xs={12}>
                <Title title="Información del expediente" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Tabla de retención documental"
                                type={'text'}
                                size="small"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                value={props.expediente?.nombre_trd_origen ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Serie documental"
                                type={'text'}
                                size="small"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                value={props.expediente?.nombre_serie_origen}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                spacing={2}
                                sx={{ mt: '5px' }}

                            >
                                <Grid item xs={12} sm={4}>
                                    <Typography sx={{ fontSize: '18px', fontWeight: '420' }}> Estado de expediente </Typography>
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                            >
                                <Grid item xs={12} sm={4} sx={{ pointerEvents: 'none' }}>
                                    <Fab size="small" variant="extended" sx={props.expediente?.estado === 'A' ? { marginX: '2px', marginY: '1px', backgroundColor: 'green', color: 'white', px: '20px' } : { marginX: '2px', marginY: '1px', backgroundColor: '#ff9800', color: 'black', px: '20px' }}>
                                        {props.expediente?.estado === 'A' ? 'Abierto' : 'Cerrado'}
                                    </Fab>
                                </Grid>
                            </Stack>
                        </Grid>
                        {props.expediente?.fecha_cierre_reapertura_actual !== null && <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={2}
                                sx={{ mt: '10px' }}
                            >
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Fecha de cierre de expediente"
                                            value={dayjs(props.expediente?.fecha_cierre_reapertura_actual)}
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
                        </Grid>}
                    </Grid>
                </Box>
            </Grid>}
        </>
    )
}