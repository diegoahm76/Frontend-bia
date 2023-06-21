/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';
import { Grid, Box, DialogTitle, DialogActions, Button, Stack, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { type IcvOthers as FormValues } from '../interfaces/CvOtrosActivos';
import { create_cv_others_service } from '../store/thunks/cvOtrosActivosThunks';
import SaveIcon from '@mui/icons-material/Save';
import SeleccionarOtros from '../components/BuscarElemento';
import EspecificacionesOtros from '../components/Especificaciones';
import EspecificacionesTec from '../components/EspecificacionesTec';



// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearHojaVidaOtrosActivosScreen(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [action] = useState<string>("create");
    const { current_cv_other, current_other } = useAppSelector((state) => state.cvo);
    const { control: control_other, handleSubmit: handle_submit, reset: reset_other, getValues: get_values } = useForm<FormValues>();
    useEffect(() => {
        reset_other(current_cv_other);
        console.log(current_cv_other)
    }, [current_other]);

    const on_submit = (data: FormValues): void => {
        const form_data: any = new FormData();
        form_data.append('caracteristicas_fisicas', data.caracteristicas_fisicas);
        form_data.append('doc_identificador_nro', data.doc_identificador_nro);
        form_data.append('especificaciones_tecnicas', data.especificaciones_tecnicas);
        form_data.append('observaciones_acionales', data.observaciones_adicionales);
        form_data.append('id_marca', data.id_marca);
        form_data.append('id_bien', (data.id_bien ?? "").toString());
        // form_data.append('ruta_imagen_foto', file === null ? '' : file);

        void dispatch(create_cv_others_service(form_data, navigate));


    };

    return (
        <>

            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >

                <Box
                    component="form"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onSubmit={
                        action === 'create'
                            ? handle_submit(on_submit)
                            : handle_submit(on_submit)
                    }
                >
                    <DialogTitle>
                        {action === 'create'
                            ? ''
                            : action === 'detail'
                                ? 'Detalle  Hoja de vida'
                                : 'Editar hoja de '}
                    </DialogTitle>

                    <SeleccionarOtros control_other={control_other}
                        get_values={get_values} />


                    <EspecificacionesOtros
                        control_other={control_other}
                        get_values={get_values}
                        title="CARACTERISTICAS FÍSICAS" />

                    <EspecificacionesTec
                        control_other={control_other}
                        get_values={get_values}
                        title="ADICIONAL" />



                    <DialogActions>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
                        >
                            <Button
                                variant="outlined"
                                //   onClick={handle_close_cv_com_is_active}
                                startIcon={<CloseIcon />}
                            >
                                CERRAR
                            </Button>
                            {action === 'create' ? (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                >
                                    GUARDAR
                                </Button>
                            ) : action === 'edit' ? (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                >
                                    EDITAR
                                </Button>
                            ) : null}
                        </Stack>
                    </DialogActions>
                </Box>




            </Grid>
        </>
    );
}

