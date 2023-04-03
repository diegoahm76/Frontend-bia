/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, TextField } from '@mui/material';
import type React from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { crear_estacion } from '../../requets/Request';
import { municipios_meta } from '../interfaces/interfaces';

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
    estacion: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearEstacionDialog: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, estacion }) => {


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

    const on_sumbit_estacion: SubmitHandler<FieldValues> = (data): void => {

        const nueva_estacion = {

            nombre_estacion: data.nombre_estacion,
            cod_tipo_estacion: data.cod_tipo_estacion,
            latitud: data.latitud,
            longitud: data.longitud,
            cod_municipio: data.cod_municipio,
            indicaciones_ubicacion: data.indicaciones_ubicacion,
        };

        void crear_estacion(nueva_estacion);
        set_is_modal_active(!is_modal_active);
        void estacion()
        reset();
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
            onClose={handle_close}
            maxWidth="xs">
            <Box component="form"
                onSubmit={handleSubmit(on_sumbit_estacion)}>
                <DialogTitle>Crear Estación</DialogTitle>
                <Divider />
                <DialogContent sx={{ mb: '0px' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre Estación"
                                fullWidth
                                size="small"
                                margin="dense"
                                required
                                autoFocus
                                {...register("nombre_estacion", {
                                    required: true,
                                    pattern: /^[a-zA-Z\s]{3,30}$/
                                })}
                                error={Boolean(errors.nombre_estacion)}
                                helperText={
                                    (errors.nombre_estacion?.type === "required") ? "Este campo es obligatorio" :
                                        (errors.nombre_estacion?.type === "pattern") ? "El nombre debe tener de 3 a 30 caracteres y solo letras mayúsculas o minúsculas" : ""
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Tipo de Estación"
                                select
                                fullWidth
                                size="small"
                                margin="dense"
                                required
                                autoFocus
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
                                size="small"
                                margin="dense"
                                required
                                autoFocus
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
                                size="small"
                                margin="dense"
                                required
                                autoFocus
                                {...register("longitud", { required: true })}
                                error={Boolean(errors.longitud)}
                                helperText={(errors.longitud != null) ? "Este campo es obligatorio" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Municipio"
                                select
                                type="text"
                                fullWidth
                                size="small"
                                margin="dense"
                                required
                                autoFocus
                                {...register("cod_municipio", { required: true })}
                                error={Boolean(errors.cod_municipio)}
                                helperText={(errors.cod_municipio != null) ? "Este campo es obligatorio" : ""}
                            >
                                {municipios_meta.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Indicaciones de Ubicación"
                                multiline
                                fullWidth
                                size="small"
                                margin="dense"
                                required
                                autoFocus
                                {...register("indicaciones_ubicacion", {
                                    required: true,
                                    maxLength: 250
                                })}
                                inputProps={{ maxLength: 250 }}
                                error={Boolean(errors.indicaciones_ubicacion)}
                                helperText={(errors.indicaciones_ubicacion != null) ? "Este campo es obligatorio" : ""}
                            />

                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handle_close();
                        reset();
                    }}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit(on_sumbit_estacion)}>Guardar</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
