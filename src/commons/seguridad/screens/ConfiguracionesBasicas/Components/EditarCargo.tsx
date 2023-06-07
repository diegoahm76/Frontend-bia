/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, Grid, TextField } from '@mui/material';
import type React from 'react';
import { useEffect, type Dispatch, type SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { EditarCargo } from '../interfaces/interfaces';
import { control_error, control_success } from '../../../../../helpers';
import { editar_cargo } from '../Request/request';

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
    data_cargos: any;
    get_data: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ActualizarCargo: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, data_cargos, get_data }) => {

    const {
        register,
        reset,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        handleSubmit,
        watch,
        setValue: set_value,
        formState: { errors },
    } = useForm<EditarCargo>();

    const [is_loading, set_is_loading] = useState(false)

    const activo =
        watch('activo') ?? false;

    const handle_change_checkbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { checked } = event.target;
        set_value('activo', checked);
    };

    useEffect(() => {
        console.log(data_cargos)
        set_value('nombre', data_cargos?.nombre);
        set_value('activo', data_cargos?.activo);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (is_modal_active && data_cargos) {
            reset(data_cargos);
        }
    }, [is_modal_active, data_cargos, reset]);

    const handle_close = (): void => {
        set_is_modal_active(false);
    }

    const on_submit = async (data: EditarCargo): Promise<any> => {
        console.log(data)
        try {
            set_is_loading(true)
            const datos_cargos = {
                nombre: data.nombre,
                activo: data.activo,
            }
            await editar_cargo(data_cargos.id_cargo, datos_cargos as EditarCargo);
            set_is_modal_active(false);
            control_success('Cargo actualizado correctamente')
            void get_data()
            reset();
            set_is_loading(false)
        } catch (error) {
            set_is_loading(false)
            control_error('error al actualizar el cargo');
        }
    };

    return (
        <Dialog open={is_modal_active}
            onClose={handle_close}
            maxWidth="xl">
            <form onSubmit={handleSubmit(on_submit)} noValidate autoComplete="off">
                <DialogTitle>Editar Cargo</DialogTitle>
                <Divider />
                <DialogContent sx={{ mb: '0px' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre Cargo"
                                fullWidth
                                size="small"
                                margin="dense"
                                required
                                autoFocus
                                defaultValue={data_cargos?.nombre}
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
                                            {...register('activo', {
                                            })}
                                            checked={activo}
                                            onChange={handle_change_checkbox}
                                        />
                                    }
                                    label="¿Estado del cargo? *"
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
                    <Button
                        variant="contained"
                        disabled={is_loading}
                        color="success"
                        type='submit' >ACTUALIZAR</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
