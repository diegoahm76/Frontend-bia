/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@mui/material';
import type React from 'react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { crear_estado_civil } from '../Request/request';
import type { GetEstadoCivil } from '../interfaces/interfaces';
import { control_error, control_success } from '../../../../../helpers';
import { Title } from '../../../../../components';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
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
        formState: { errors },
    } = useForm();


    const on_submit_cargo: SubmitHandler<FieldValues> = async (data) => {
        try {
            set_is_loading(true);
            await crear_estado_civil(data as GetEstadoCivil);
            set_is_modal_active(false);
            control_success('Estado civil creado correctamente');
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
                <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3} >
                    <Title title={`Crear Estado Civil `} />
                </Grid>
                <DialogTitle></DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container spacing={2}>
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
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="error"
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={() => {
                            handle_close();
                            reset();
                        }}>Cancelar</Button>
                    <Button variant="contained"
                        disabled={is_loading}
                        color="success"
                        type='submit'
                        startIcon={<SaveIcon />}
                    >Guardar</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
