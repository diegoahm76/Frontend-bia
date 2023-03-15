/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import type React from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { crearEstacion } from '../../requets/Request';

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearEstacionDialog: React.FC<IProps> = ({ is_modal_active, set_is_modal_active }) => {

    
    const handle_close = (): void => {
        set_is_modal_active(false);
    }
    const {
        register,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        handleSubmit,
        formState: { errors },
    } = useForm();

    const on_sumbit_estacion: SubmitHandler<FieldValues> = (data): void => {

        const nueva_estacion = {

            nombre_estacion: data.nombre_estacion,
            cod_tipo_estacion: data.cod_tipo_estacion,
            latitud: data.latitud,
            longitud: data.longitud,
            cod_municipio: data.cod_municipio,
            indicaciones_ubicacion: data.indicaciones_ubicacion,
        };

        void crearEstacion(nueva_estacion);
        set_is_modal_active(!is_modal_active);
    };

    const tipo_estacion = [
        {
            value: 'AG',
            label: 'Agua'
        },
        {
            value: 'AI',
            label: 'Aire',
        },
    ]

    return (
        <Dialog open={is_modal_active}
            onClose={handle_close}>
            <Box component="form"
                onSubmit={handleSubmit(on_sumbit_estacion)}>
                <DialogTitle>Crear Estación</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre Estación"
                                fullWidth
                                {...register("nombre_estacion", { required: true })}
                                error={Boolean(errors.nombre_estacion)}
                                helperText={(errors.nombre_estacion != null) ? "Este campo es obligatorio" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Tipo de Estación"
                                select
                                fullWidth
                                {...register("cod_tipo_estacion", { required: true })}
                                error={Boolean(errors.cod_tipo_estacion)}
                                helperText={(errors.cod_tipo_estacion != null) ? "Este campo es obligatorio" : ""}
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
                                label="Latitud"
                                type="number"
                                fullWidth
                                {...register("latitud", { required: true })}
                                error={Boolean(errors.latitud)}
                                helperText={(errors.latitud != null) ? "Este campo es obligatorio" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Longitud"
                                type="number"
                                fullWidth
                                {...register("longitud", { required: true })}
                                error={Boolean(errors.longitud)}
                                helperText={(errors.longitud != null) ? "Este campo es obligatorio" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Municipio"
                                type="text"
                                fullWidth
                                {...register("cod_municipio", { required: true })}
                                error={Boolean(errors.cod_municipio)}
                                helperText={(errors.cod_municipio != null) ? "Este campo es obligatorio" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Indicaciones de Ubicación"
                                fullWidth
                                {...register("indicaciones_ubicacion", { required: true })}
                                error={Boolean(errors.indicaciones_ubicacion)}
                                helperText={(errors.indicaciones_ubicacion != null) ? "Este campo es obligatorio" : ""}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handle_close}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit(on_sumbit_estacion)}>Guardar</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
