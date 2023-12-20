import { Grid, TextField, Box, Stack, Typography } from "@mui/material";
import { Title } from "../../../../../components/Title";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../hooks";
import { obtener_cierre_indice } from "../thunks/FirmaCierreIndice";

interface IProps {
    indice: any
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VerCierreIndiceElectronico: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [indice_cierre, set_indice_cierre] = useState<any>(null);

    useEffect(() => {
        dispatch(obtener_cierre_indice(props.indice?.id_indice_electronico_exp)).then((response: any) => {
            set_indice_cierre(response.data);
        })
    }, []);

    return (
        <>
            {props.indice !== null && <Grid item md={12} xs={12}>
                <Title title="Información de cierre de índice electrónico" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={6}>

                            <TextField
                                label="Usuario que firmó el cierre"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={indice_cierre?.nombre_persona_firma_cierre ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha de la firma del cierre"
                                    value={dayjs(indice_cierre?.fecha_cierre)}
                                    onChange={(newValue) => { }}
                                    inputFormat='DD/MM/YYYY'
                                    disabled={true}
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
                        <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={2}
                                sx={{ mt: '5px' }}

                            >
                                <Typography sx={{ fontSize: '18px', fontWeight: '420' }}> Se verificó el código a través de los siguientes medios de contacto </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Número telefónico"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={indice_cierre?.telefono_celular ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Correo electrónico"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={indice_cierre?.email ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Observaciones de la firma de cierre del índice"
                                multiline
                                rows={2}
                                type={'text'}
                                size="small"
                                fullWidth
                                disabled={true}
                                value={indice_cierre?.observacion_firme_cierre ?? ''}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>}
        </>
    )
}