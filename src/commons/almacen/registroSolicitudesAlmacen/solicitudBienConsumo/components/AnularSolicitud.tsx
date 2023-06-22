import { type Dispatch, type SetStateAction } from 'react';
import { Controller } from 'react-hook-form';
import { TextField, Dialog, DialogActions, DialogTitle, Stack, Button, Box, Divider, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { type IList } from '../../../../../interfaces/globalModels';


interface IProps {
    action: string;
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
    control_solicitud: any;
    get_values: any;
    on_submit: any;
}




// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const AnularSolicitudModal = ({
    action,
    is_modal_active,
    set_is_modal_active,
    control_solicitud,
    get_values,
    on_submit
}: IProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const initial_options: IList[] = [
        {
            label: '',
            value: '',
        },
    ];

    const handle_close_aprobacion = (): void => { set_is_modal_active(false); };

    return (
        <Dialog
            maxWidth="md"
            open={is_modal_active}
            fullWidth
            onClose={handle_close_aprobacion}
        >
            <Box


            >
                <DialogTitle>{"Anulación de solicitudes de consumo"}</DialogTitle>
                <Divider />

                <Grid container >
                    <Grid item xs={12} md={12} margin={1} >
                        <Controller
                            name="fecha_anulacion_solicitante"
                            control={control_solicitud}
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    margin="dense"
                                    fullWidth
                                    size="small"
                                    label="Fecha de aulación"
                                    variant="outlined"
                                    value={value}
                                    onChange={onChange}
                                    error={!(error == null)}

                                />
                            )}
                        />


                    </Grid>
                    <Grid item xs={11} md={12} margin={1} >
                        <Controller
                            control={control_solicitud}
                            name="justificacion_anulacion_solicitante"
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    margin="dense"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    size="small"
                                    label="Justificación de la anulación"
                                    variant="outlined"
                                    value={value}
                                    onChange={onChange}
                                    error={!(error == null)}
                                    helperText={
                                        error != null
                                            ? 'Es obligatorio ingresar un motivo'
                                            : 'Ingrese el motivo'
                                    }
                                />
                            )}
                        />


                    </Grid>
                    <Grid item xs={12} md={12} margin={1} >
                        <Controller
                            name="persona_solicita"
                            control={control_solicitud}
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                    label="Anulación elaborada por:"
                                    variant="outlined"
                                    value={value}
                                    onChange={onChange}
                                    disabled
                                    error={!(error == null)}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Divider />
                <DialogActions>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ mr: '15px', mb: '10px', mt: '10px' }}
                    >

                        <Button
                            type="button"
                            variant="contained"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onClick={on_submit}
                            startIcon={<SaveIcon />}>
                            GUARDAR
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handle_close_aprobacion}
                            startIcon={<CloseIcon />}
                        >
                            CERRAR
                        </Button>



                    </Stack>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default AnularSolicitudModal;



