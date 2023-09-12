/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, Grid, TextField } from '@mui/material';
import type React from 'react';
import { useEffect, type Dispatch, type SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { EditarEstadoCivil } from '../interfaces/interfaces';
import { control_error, control_success } from '../../../../../helpers';
import { editar_estado_civil } from '../Request/request';
import CancelIcon from '@mui/icons-material/Cancel';
import { Title } from '../../../../../components';
import EditIcon from '@mui/icons-material/Edit';
interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
    data: any;
    get_data: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ActualizarEstadoCivil: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, data, get_data }) => {
    const {
        register,
        reset,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        handleSubmit,
        watch,
        setValue: set_value,
        formState: { errors },
    } = useForm<EditarEstadoCivil>();

    const [is_loading, set_is_loading] = useState(false)

    const activo =
        watch('activo') ?? false;

    const handle_change_checkbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { checked } = event.target;
        set_value('activo', checked);
    };

    useEffect(() => {
        set_value('nombre', data?.nombre);
        set_value('activo', data?.activo);
        set_value('cod_estado_civil', data?.cod_estado_civil);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (is_modal_active && data) {
            reset(data);
        }
    }, [is_modal_active, data, reset]);

    const handle_close = (): void => {
        set_is_modal_active(false);
    }

    const on_submit = async (data: EditarEstadoCivil): Promise<any> => {
        try {
            set_is_loading(true)
            const datos_estado_civil = {
                nombre: data.nombre,
                activo: data.activo,
            }
            await editar_estado_civil(data.cod_estado_civil, datos_estado_civil as EditarEstadoCivil);
            set_is_modal_active(false);
            control_success('estado civil actualizado correctamente')
            void get_data()
            reset();
            set_is_loading(false)
        } catch (error: any) {
            set_is_loading(false);
            control_error(error.response.data.detail);
        }
    };

    return (
        <Dialog open={is_modal_active}
            onClose={handle_close}
            maxWidth="xl">
            <form onSubmit={handleSubmit(on_submit)} noValidate autoComplete="off">
                <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
                    <Title title={` Editar Estado civil`} />
                </Grid>
                <DialogTitle></DialogTitle>
                <Divider />
                <DialogContent sx={{ mb: '0px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Codigo Estado Civil"
                                fullWidth
                                size="small"
                                margin="dense"
                                required
                                autoFocus
                                defaultValue={data?.cod_estado_civil}
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
                                defaultValue={data?.nombre}
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
                                    label="Activo *"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="error"
                        startIcon={<CancelIcon />}
                        variant="outlined"
                        onClick={() => {
                            handle_close();
                            reset();
                        }}>Cancelar</Button>
                    <Button
                         startIcon={<EditIcon />}
                        variant="contained"
                        disabled={is_loading}
                        // color="success"
                        type='submit' >EDITAR</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
