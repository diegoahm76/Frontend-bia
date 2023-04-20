/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, TextField } from '@mui/material';
import type React from 'react';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { control_error } from '../../../../helpers/controlError';
import { consultar_conf_alerta_persona, crear_confi_alerta } from '../../requets/Request';
import { type conf_alarma } from '../interfaces/interfaces';

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
    confi_alerta_persona:() => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearConfiAlertaDialog: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, confi_alerta_persona }) => {

    const [conf_alert_person, set_conf_alert_person] = useState<conf_alarma[]>([]);

    const confi_alerta_persona_crear = async (): Promise<void> => {
        try {
            const response = await consultar_conf_alerta_persona();
            const conf = response.map((con_alerta: conf_alarma) => ({
                id_confi_alerta_persona: con_alerta.id_confi_alerta_persona,
                nombre_variable_alarma: con_alerta.nombre_variable_alarma,
                mensaje_alarma_maximo: con_alerta.mensaje_alarma_maximo,
                mensaje_alarma_minimo: con_alerta.mensaje_alarma_minimo,
                mensaje_no_alarma: con_alerta.mensaje_no_alarma,
                frecuencia_alarma: con_alerta.frecuencia_alarma,

            }))

            set_conf_alert_person(conf);
        } catch (err) {
            control_error(err)
        }
    };

    useEffect(() => {
        void confi_alerta_persona_crear()
    }, []);


    const handle_close = (): void => {
        set_is_modal_active(false);
    }
    const {
        register,
        reset,
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

        const variable_seleccionada = data.nombre_variable_alarma;
        const alerta_existente = conf_alert_person.find(
            (alert: conf_alarma) => alert.nombre_variable_alarma === variable_seleccionada
        );

        if (alerta_existente != null) {
            control_error('La alerta ya existe, por lo tanto edita el mensaje en la editar')
        } else {
            void crear_confi_alerta(nueva_alerta);
            void confi_alerta_persona()
            set_is_modal_active(!is_modal_active);
        }
    }

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
            onClose={handle_close}
            maxWidth="xs">
            <Box component="form"
                onSubmit={handleSubmit(on_sumbit_alerta)}>
                <DialogTitle>Crear Configuración Alerta Estación</DialogTitle>
                <Divider />
                <DialogContent sx={{ mb: '0px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre Variable"
                                select
                                size="small"
                                margin="dense"
                                required
                                autoFocus
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
                                label="Mensaje Máximo"
                                size="small"
                                margin="dense"
                                required
                                autoFocus
                                fullWidth
                                {...register("mensaje_alarma_maximo", { required: true })}
                                error={Boolean(errors.mensaje_alarma_maximo)}
                                helperText={(errors.mensaje_alarma_maximo != null) ? "Este campo es obligatorio" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Mensaje Mínimo"
                                size="small"
                                margin="dense"
                                required
                                autoFocus
                                fullWidth
                                {...register("mensaje_alarma_minimo", { required: true })}
                                error={Boolean(errors.mensaje_alarma_minimo)}
                                helperText={(errors.mensaje_alarma_minimo != null) ? "Este campo es obligatorio" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Mensaje estable"
                                size="small"
                                margin="dense"
                                required
                                autoFocus
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
                                size="small"
                                margin="dense"
                                required
                                autoFocus
                                fullWidth
                                {...register("frecuencia_alarma", { required: true })}
                                error={Boolean(errors.frecuencia_alarma)}
                                helperText={(errors.frecuencia_alarma != null) ? "Este campo es obligatorio" : ""}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { reset(); handle_close(); }}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit(on_sumbit_alerta)}>Guardar</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
