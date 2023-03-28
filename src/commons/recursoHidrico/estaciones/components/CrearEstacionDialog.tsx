/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, TextField } from '@mui/material';
import type React from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { crear_estacion } from '../../requets/Request';

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

    const municipios_meta = [
        {
            value: '50251',
            label: 'El Castillo'
        },
        {
            value: '50270',
            label: 'El Dorado',
        },
        {
            value: '50287',
            label: 'Fuente De Oro',
        },
        {
            value: '50313',
            label: 'Granada',
        },
        {
            value: '50350',
            label: 'La Macarena',
        },
        {
            value: '50370',
            label: 'La Uribe',
        },
        {
            value: '50400',
            label: 'Lejanías',
        },
        {
            value: '50325',
            label: 'Mapiripan',
        },
        {
            value: '50330',
            label: 'Mesetas',
        },
        {
            value: '50450',
            label: 'Puerto Concordia',
        },
        {
            value: '50577',
            label: 'Puerto Lleras',
        },
        {
            value: '50590',
            label: 'Puerto Rico',
        },
        {
            value: '50683',
            label: 'San Juan De Arama',
        },
        {
            value: '50711',
            label: 'Vista Hermosa',
        },
        {
            value: '50001',
            label: 'Villavicencio',
        },
        {
            value: '50006',
            label: 'Acacias',
        },
        {
            value: '50110',
            label: 'Barranca De Upia',
        },
        {
            value: '50150',
            label: 'Castilla La Nueva',
        },
        {
            value: '50226',
            label: 'Cumaral',
        },
        {
            value: '50245',
            label: 'El Calvario',
        },
        {
            value: '50318',
            label: 'Guamal',
        },
        {
            value: '50606',
            label: 'Restrepo',
        },
        {
            value: '50680',
            label: 'San Carlos Guaroa',
        },
        {
            value: '50686',
            label: 'San Juanito',
        },
        {
            value: '50223',
            label: 'San Luis De Cubarral',
        },
        {
            value: '50689',
            label: 'San Martín',
        },
        {
            value: '50124',
            label: 'Cabuyaro',
        },
        {
            value: '50568',
            label: 'Puerto Gaitán',
        },
        {
            value: '50573',
            label: 'Puerto Lopez',
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
                                fullWidth
                                size="small"
                                margin="dense"
                                required
                                autoFocus
                                {...register("indicaciones_ubicacion", { required: true })}
                                error={Boolean(errors.indicaciones_ubicacion)}
                                helperText={(errors.indicaciones_ubicacion != null) ? "Este campo es obligatorio" : ""}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { reset(); handle_close(); }}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit(on_sumbit_estacion)}>Guardar</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
