import { useEffect, type Dispatch, type SetStateAction } from 'react';
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    Stack,
} from '@mui/material';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import type { UpdateAutorizaNotificacion } from '../interfaces/globalModels';
import { control_error, control_success } from '../helpers';
import { editar_autorizacion_notificaciones } from '../commons/seguridad/request/Request';
import { Title } from './Title';
import { useForm } from 'react-hook-form';

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
    id_persona: number | undefined;
    data_autorizacion: UpdateAutorizaNotificacion
    on_result: (data: UpdateAutorizaNotificacion) => void
}

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const DialogAutorizaDatos: React.FC<IProps> = ({
    is_modal_active,
    set_is_modal_active,
    id_persona,
    data_autorizacion,
    on_result,
}: IProps) => {

    const {
        register,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        handleSubmit,
        // reset,
    } = useForm<UpdateAutorizaNotificacion>();

    const [notificaciones, set_notificaciones] = useState<UpdateAutorizaNotificacion>({
        acepta_autorizacion_email: false,
        acepta_autorizacion_sms: false,
    });
    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_close = (): void => {
        set_is_modal_active(false);
    };
    const handle_change_checkbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { id, checked } = event.target;
        set_notificaciones({
            ...notificaciones,
            [id]: checked,
        });
    };

    const on_submit_autorizacion = async (data: UpdateAutorizaNotificacion): Promise<any> => {
        try {
            set_is_loading(true);
            const data_autorizacion = {
                acepta_autorizacion_email: data.acepta_autorizacion_email,
                acepta_autorizacion_sms: data.acepta_autorizacion_sms,
            };
            await editar_autorizacion_notificaciones(id_persona, data_autorizacion);
            control_success('Se actualizó la autorización de notificaciones correctamente');
            set_is_loading(false);
            on_result(data_autorizacion)
            handle_close();
        } catch (error) {
            set_is_loading(false);
            control_error('lo sentimos, ocurrió un error al actualizar la autorización de notificaciones, por favor intenta nuevamente');
        }
    };

    useEffect(() => {
        set_notificaciones({
            ...notificaciones,
            acepta_autorizacion_email: data_autorizacion.acepta_autorizacion_email,
            acepta_autorizacion_sms: data_autorizacion.acepta_autorizacion_sms,
        });
    }, [data_autorizacion]);

    return (
        <>
            <Dialog
                open={is_modal_active}
                onClose={handle_close}
                fullWidth
                maxWidth={'sm'}
            >
                <DialogTitle>
                    <Title title="ACTUALIZACIÓN NOTIFICACIONES" />
                </DialogTitle>
                <Divider />
                <Grid
                    container
                    spacing={1}
                    m={2}
                    p={2}
                    sx={{
                        position: 'relative',
                        background: '#FAFAFA',
                        borderRadius: '15px',
                        p: '20px',
                        m: '10px 0 20px 0',
                        mb: '20px',
                        boxShadow: '0px 3px 6px #042F4A26',
                    }}
                >
                    <Box component="form"
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onSubmit={handleSubmit(on_submit_autorizacion)}
                    >
                        <Grid item xs={12}>
                            <FormControl
                                component="fieldset"
                                variant="standard"
                            >
                                <FormControlLabel
                                    label="¿Autoriza notificaciones judiciales por correo electrónico?"

                                    control={
                                        <Checkbox
                                            size="small"
                                            id='acepta_autorizacion_email'
                                            checked={notificaciones?.acepta_autorizacion_email}
                                            {...register('acepta_autorizacion_email')}
                                            onChange={handle_change_checkbox}
                                        />
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl
                                component="fieldset"
                                variant="standard"
                            >
                                <FormControlLabel
                                    label="¿Autoriza notifiaciones informativas a través de mensajes de texto?"
                                    control={
                                        <Checkbox
                                            size="small"
                                            id='acepta_autorizacion_sms'
                                            checked={notificaciones?.acepta_autorizacion_sms}
                                            {...register('acepta_autorizacion_sms')}
                                            onChange={handle_change_checkbox}
                                        />
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack
                                justifyContent="flex-end"
                                sx={{ m: '10px 0 0 0' }}
                                direction="row"
                                spacing={1}
                            >
                                <Button
                                    variant="outlined"
                                    size="medium"
                                    startIcon={<CancelIcon />}
                                    onClick={() => {
                                        handle_close();
                                    }}
                                >
                                    Cerrar
                                </Button>
                                <Button
                                    id="actualiza-natural"
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    startIcon={
                                        is_loading
                                            ? <CircularProgress size={20} key={1} className="align-middle ml-1" />
                                            : ""
                                    }
                                    aria-label="Actualizar"
                                    disabled={is_loading}
                                    size="medium"
                                >
                                    Actualizar
                                </Button>
                            </Stack>
                        </Grid>
                    </Box>
                </Grid>
            </Dialog>
        </>
    );
};
