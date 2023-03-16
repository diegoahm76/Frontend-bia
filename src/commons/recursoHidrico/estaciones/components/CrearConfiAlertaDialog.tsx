/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import type React from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { crear_confi_alerta } from '../../requets/Request';

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearConfiAlertaDialog: React.FC<IProps> = ({ is_modal_active, set_is_modal_active }) => {


    const handle_close = (): void => {
        set_is_modal_active(false);
    }
    const {
        register,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        handleSubmit,
        formState: { errors },
    } = useForm();

    const on_sumbit_alerta: SubmitHandler<FieldValues> = (data): void => {

        const nueva_alerta = {

            nombre_variable_alarma: data.nombre_variable_alarma,
            mensaje_alarma_maximo: data.mensaje_alarma_maximo,
            mensaje_alarma_minimo: data.mensaje_alarma_minimo,
            mensaje_no_alarma: data.mensaje_no_alarma,
            frecuencia_alarma: data.frecuencia_alarma,
        };

        void crear_confi_alerta(nueva_alerta);
        set_is_modal_active(!is_modal_active);
    };

    const tipo_estacion = [
        {
            value: 'TMP',
            label: 'Temperatura'
        },
        {
            value: 'HUR',
            label: 'Humedad',
        },
        {
            value: 'PRB',
            label: 'Presion barometrica'
        },
        {
            value: 'VDV',
            label: 'Velocidad del viento',
        },
        {
            value: 'DDV',
            label: 'Direccion del viento'
        },
        {
            value: 'PCT',
            label: 'Precipitacion',
        },
        {
            value: 'LMN',
            label: 'Luminosidad'
        },
        {
            value: 'NDA',
            label: 'Nivel del agua',
        },
        {
            value: 'VDA',
            label: 'velocidad del agua',
        },
    ]

    return (
        <Dialog open={is_modal_active}
            onClose={handle_close}>
            <Box component="form"
                onSubmit={handleSubmit(on_sumbit_alerta)}>
                <DialogTitle>Crear Configuracion Alerta Estación</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre Variable"
                                select
                                fullWidth
                                {...register("nombre_variable_alarma", { required: true })}
                                error={Boolean(errors.nombre_variable_alarma)}
                                helperText={(errors.nombre_variable_alarma != null) ? "Este campo es obligatorio" : ""}
                            >
                                {tipo_estacion.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Mensaje Maximo"
                                fullWidth
                                {...register("mensaje_alarma_maximo", { required: true })}
                                error={Boolean(errors.mensaje_alarma_maximo)}
                                helperText={(errors.mensaje_alarma_maximo != null) ? "Este campo es obligatorio" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Mensaje Minimo"
                                fullWidth
                                {...register("mensaje_alarma_minimo", { required: true })}
                                error={Boolean(errors.mensaje_alarma_minimo)}
                                helperText={(errors.mensaje_alarma_minimo != null) ? "Este campo es obligatorio" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Mensaje estable"
                                fullWidth
                                {...register("mensaje_no_alarma", { required: true })}
                                error={Boolean(errors.mensaje_no_alarma)}
                                helperText={(errors.mensaje_no_alarma != null) ? "Este campo es obligatorio" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Frecuencia de alerta"
                                type="number"
                                fullWidth
                                {...register("frecuencia_alarma", { required: true })}
                                error={Boolean(errors.frecuencia_alarma)}
                                helperText={(errors.frecuencia_alarma != null) ? "Este campo es obligatorio" : ""}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handle_close}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit(on_sumbit_alerta)}>Guardar</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
