import { useEffect, type Dispatch, type SetStateAction, } from 'react';
import { Controller } from 'react-hook-form';
import { TextField, Dialog, DialogActions, DialogTitle, Stack, Button, Box, Divider, Grid, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import CloseIcon from '@mui/icons-material/Close';
import { get_uni_organizacional } from '../../store/solicitudBienConsumoThunks';
import { set_current_solicitud, set_persona_solicita } from '../../store/slices/indexSolicitudBienesConsumo';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../../../auth/interfaces';


interface IProps {
    action: string;
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
    control_solicitud: any;
    get_values: any

}





// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const AprobarSolicitudModal = ({
    action,
    is_modal_active,
    set_is_modal_active,
    control_solicitud,
    get_values
}: IProps) => {


    const dispatch = useAppDispatch();

    // eslint-disable-next-line @typescript-eslint/naming-convention

    const { userinfo } = useSelector((state: AuthSlice) => state.auth);
    const { aprobacion_solicitud, persona_solicita, current_solicitud } = useAppSelector((state: { solic_consumo: any; }) => state.solic_consumo);

    // const { control: control_aprobacion, handleSubmit: handle_submit, reset: reset_aprobacion } = useForm<FormValues>();
    const handle_close_aprobacion = (): void => { set_is_modal_active(false); };



    useEffect(() => {
        //  reset_aprobacion(aprobacion_solicitud);
        //  console.log('')(aprobacion_solicitud);
    }, [aprobacion_solicitud]);


    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        void dispatch(get_uni_organizacional());
        dispatch(set_persona_solicita({ nombre: userinfo.nombre, id_persona: userinfo.id_persona, unidad_organizacional: userinfo.nombre_unidad_organizacional }))
    }, [])




    useEffect(() => {
        dispatch(set_current_solicitud({ ...current_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional }))
    }, [persona_solicita]);



    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

    const estado = [
        {
            value: 'A',
            label: 'Aprobado',
        },
        {
            value: 'R',
            label: 'Rechazado',
        },

    ]



    // eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/explicit-function-return-type
    // const on_submit = async () => {
    //     try {
    //         // Realiza las validaciones necesarias antes de aprobar la solicitud

    //         // Llama a la función del thunk "aprobacion_solicitud_pendiente" pasando el ID de la solicitud
    //         await dispatch(aprobacion_solicitud_pendiente(current_solicitud.id));

    //         // Realiza cualquier otra acción necesaria después de aprobar la solicitud

    //         // Ejemplo de mostrar una notificación de éxito
    //         // Aquí puedes utilizar la librería de notificaciones de tu elección


    //     } catch (error) {
    //         // Maneja el error en caso de que la aprobación falle

    //         // Ejemplo de mostrar una notificación de error
    //         ;
    //     }

    // }


    return (
        <Dialog
            maxWidth="md"
            open={is_modal_active}
            fullWidth
            onClose={handle_close_aprobacion}
        >
            <Box
                component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises

            >
                <DialogTitle>{"Aprobación de solicitudes de consumo"}</DialogTitle>
                <Divider />

                <Grid container >
                    <Grid item xs={12} md={12} margin={1} >
                        <Controller
                            name="fecha_aprobacion"
                            control={control_solicitud}
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    margin="dense"
                                    fullWidth
                                    disabled
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

                    <Grid item xs={11} md={5} margin={1} >
                        <Controller
                            name="estado_aprobacion_responsable"
                            control={control_solicitud}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    margin="dense"
                                    fullWidth
                                    multiline
                                    select
                                    size="small"
                                    label="Estado de aprobación"
                                    variant="outlined"
                                    value={value}
                                    onChange={onChange}
                                    error={!(error == null)}
                                >
                                    {estado.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            )}
                        />


                    </Grid>
                    <Grid item xs={12} md={12} margin={1} >
                        <Controller
                            name="justificacion_rechazo_responsable"
                            control={control_solicitud}
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
                                    label="Justificación del estado de aprobación"
                                    variant="outlined"
                                    value={value}
                                    onChange={onChange}
                                    error={!(error == null)}
                                    helperText={
                                        error != null
                                            ? 'Es obligatorio ingresar la justificación'
                                            : 'Ingrese la justificación'
                                    }

                                />
                            )}
                        />


                    </Grid>
                    <Grid item xs={11} md={3} margin={1} >
                        <Controller
                            name="persona_solicita"
                            control={control_solicitud}
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    margin="dense"
                                    rows={4}
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


                        {action === 'Aprobar' &&
                            <Button
                                type="submit"
                                variant="contained"
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                //   onClick={handle_submit(on_submit)}
                                startIcon={<SaveIcon />}
                            >
                                GUARDAR

                            </Button>
                        }

                        <Button
                            type="submit"
                            onClick={handle_close_aprobacion}
                            variant="contained"
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
export default AprobarSolicitudModal;



