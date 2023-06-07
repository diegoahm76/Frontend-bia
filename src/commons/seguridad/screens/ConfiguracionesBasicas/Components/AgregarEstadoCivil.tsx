/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, Grid, TextField } from '@mui/material';
import type React from 'react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { crear_estado_civil } from '../Request/request';
import type { GetEstadoCivil } from '../interfaces/interfaces';
import { control_success } from '../../../../../helpers';

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
    get_datos: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarEstadoCivil: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, get_datos }) => {

    const [is_loading, set_is_loading] = useState(false);

    const handle_close = (): void => {
        set_is_modal_active(false);
    }
    const {
        register,
        reset,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const activo =
        watch('activo') ?? false;
    const precargado =
        watch('precargado') ?? false;
    const item_ya_usado =
        watch('item_ya_usado') ?? false;

    const on_submit_cargo: SubmitHandler<FieldValues> = async (data) => {
        try {
            set_is_loading(true);
            await crear_estado_civil(data as GetEstadoCivil);
            set_is_modal_active(false);
            control_success('Estado civil creado correctamente');
            await get_datos();
            reset();
            set_is_loading(false);
        } catch (error) {
            set_is_loading(false);
            // Manejo de errores
            console.error('Ha ocurrido un error al crear el estado civil');
            // Puedes mostrar un mensaje de error o realizar alguna acción adicional aquí
        }
    };

    return (
        <Dialog open={is_modal_active}
            onClose={handle_close}
            maxWidth="xl">
            <Box component="form"
                onSubmit={handleSubmit(on_submit_cargo)}>
                <DialogTitle>Crear Estado Civil</DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                label="Codigo Estado Civil"
                                fullWidth
                                size="small"
                                margin="dense"
                                required
                                autoFocus
                                {...register("cod_estado_civil", {
                                    required: true,
                                })}
                                error={Boolean(errors.cod_estado_civil)}
                                helperText={
                                    (errors.cod_estado_civil?.type === "required") ? "Este campo es obligatorio" : ''
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre Estado Civil"
                                fullWidth
                                size="small"
                                margin="dense"
                                required
                                autoFocus
                                {...register("nombre", {
                                    required: true,
                                })}

                                error={Boolean(errors.nombre)}
                                helperText={
                                    (errors.nombre?.type === "required") ? "Este campo es obligatorio" : ''
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl
                                component="fieldset"
                                variant="standard"
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id='activo'
                                            {...register('activo', {
                                            })}
                                            checked={activo}
                                        />
                                    }
                                    label="Estado del estado civil "
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl
                                component="fieldset"
                                variant="standard"
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id='precargado'
                                            {...register('precargado', {
                                            })}
                                            checked={precargado}
                                        />
                                    }
                                    label="Precargado "
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl
                                component="fieldset"
                                variant="standard"
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id='item_ya_usado'
                                            {...register('item_ya_usado', {
                                            })}
                                            checked={item_ya_usado}
                                        />
                                    }
                                    label="Item ya usado "
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handle_close();
                        reset();
                    }}>Cancelar</Button>
                    <Button variant="contained"
                        disabled={is_loading}
                        color="success"
                        type='submit'
                    >Guardar</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
