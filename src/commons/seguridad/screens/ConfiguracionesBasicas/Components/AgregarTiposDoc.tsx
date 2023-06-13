/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@mui/material';
import type React from 'react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { crear_tipos_doc } from '../Request/request';
import type { TiposDoc } from '../interfaces/interfaces';
import { control_error, control_success } from '../../../../../helpers';

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
    get_datos: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarTiposDoc: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, get_datos }) => {

    const [is_loading, set_is_loading] = useState(false);

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


    const on_submit_cargo: SubmitHandler<FieldValues> = async (data) => {
        try {
            set_is_loading(true);
            await crear_tipos_doc(data as TiposDoc);
            set_is_modal_active(false);
            control_success('Tipo de documento creado correctamente');
            await get_datos();
            reset();
            set_is_loading(false);
        } catch (error: any) {
            set_is_loading(false);
            control_error(error.response.data.detail);
        }
    };

    return (
        <Dialog open={is_modal_active}
            onClose={handle_close}
            maxWidth="xl">
            <Box component="form"
                onSubmit={handleSubmit(on_submit_cargo)}>
                <DialogTitle>Crear Tipo de Documento</DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Codigo Tipo Documento"
                                fullWidth
                                size="small"
                                margin="dense"
                                required
                                autoFocus
                                {...register("cod_tipo_documento", {
                                    required: true,
                                })}
                                error={Boolean(errors.cod_tipo_documento)}
                                helperText={
                                    (errors.cod_tipo_documento?.type === "required") ? "Este campo es obligatorio" : ''
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre Tipo Documento"
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
