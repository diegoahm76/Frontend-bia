/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, Grid, TextField } from '@mui/material';
import type React from 'react';
import { useEffect, type Dispatch, type SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { EditarTiposDoc } from '../interfaces/interfaces';
import { control_error, control_success } from '../../../../../helpers';
import { editar_tipos_doc } from '../Request/request';
import { Title } from '../../../../../components';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
    data: any;
    get_data: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ActualizarTipoDoc: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, data, get_data }) => {
    const {
        register,
        reset,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        handleSubmit,
        watch,
        setValue: set_value,
        formState: { errors },
    } = useForm<EditarTiposDoc>();

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

    const on_submit = async (datos: EditarTiposDoc): Promise<any> => {
        try {
            set_is_loading(true)
            await editar_tipos_doc(data.cod_tipo_documento, datos);
            set_is_modal_active(false);
            control_success('Tipos de Documento actualizado correctamente')
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
                    <Title title={`Editar Tipo de Documento `} />
                </Grid>
                <DialogTitle></DialogTitle>
                <Divider />
                <DialogContent sx={{ mb: '0px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre Tipo de Documento"
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
                        variant="contained"
                        disabled={is_loading}
                        // color="success"
                        type='submit'
                        startIcon={<EditIcon />}
                         >EDITAR</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
