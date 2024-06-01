/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';
import { Button, Grid, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { type IcvOthers as FormValues } from '../interfaces/CvOtrosActivos';
import { create_cv_others_service, delete_cv_others_service, get_maintenance_other, update_cv_other_service } from '../store/thunks/cvOtrosActivosThunks';
import SaveIcon from '@mui/icons-material/Save';
import SeleccionarOtros from '../components/BuscarElemento';
import EspecificacionesOtros from '../components/Especificaciones';
import EspecificacionesTec from '../components/EspecificacionesTec';
import FormButton from '../../../../../../components/partials/form/FormButton';
import { get_marca_service } from '../../hojaDeVidaComputo/store/thunks/cvComputoThunks';
import { Title } from '../../../../../../components';
import Mantenimiento_other from '../components/Mantenimientos';



// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearHojaVidaOtrosActivosScreen(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [action, set_action] = useState<string>("guardar");
    const { current_cv_other, current_other } = useAppSelector((state) => state.cvo);
    const { control: control_other, handleSubmit: handle_submit, reset: reset_other, getValues: get_values, watch } = useForm<FormValues>();
    useEffect(() => {
        void dispatch(get_marca_service());
    }, []);
    useEffect(() => {
        if (current_cv_other?.id_hoja_de_vida) {
            set_action("editar")
        }else{
            set_action("crear")
          }
        if (current_cv_other?.id_articulo !== null) {
            void dispatch(get_maintenance_other(current_cv_other.id_articulo ?? 0))
        }
    }, [current_cv_other]);

    const programacion_mantenimiento = (): void => {
        navigate('/app/almacen/gestion_inventario/mantenimiento_equipos/programacion_mantenimiento_otros_activos');
    };



    const on_submit = (data: FormValues): void => {
        const form_data: any = new FormData();
        form_data.append('caracteristicas_fisicas', data.caracteristicas_fisicas);
        form_data.append('doc_identificador_nro', data.doc_identificador_nro);
        form_data.append('especificaciones_tecnicas', data.especificaciones_tecnicas);
        form_data.append('observaciones_adicionales', data.observaciones_adicionales);
        form_data.append('id_marca', data.id_marca ?? null);
        form_data.append('id_articulo', (data.id_articulo || current_other?.id_bien || '').toString());
        if(data.ruta_imagen_foto && typeof data.ruta_imagen_foto  !== "string" ) {
            form_data.append('ruta_imagen_foto', data.ruta_imagen_foto);
        }
        if (data.id_hoja_de_vida === null) {
            void dispatch(create_cv_others_service(form_data, navigate));
        } else {
            void dispatch(update_cv_other_service(data.id_hoja_de_vida, form_data));

        }
    };
    const delete_hoja_vida = (): void => {

        if (current_cv_other.id_hoja_de_vida !== null && current_cv_other.id_hoja_de_vida !== undefined) {
            void dispatch(delete_cv_others_service(current_cv_other.id_hoja_de_vida));
        }
    };

    useEffect(() => {
    if(current_cv_other?.id_hoja_de_vida){
        reset_other(current_cv_other);
    }else{
        reset_other({
            id_hoja_de_vida: null,
            // id_articulo: null,
            codigo_bien: current_other?.codigo_bien ?? "",
            id_marca: null,
            doc_identificador_nro: current_other?.doc_identificador_nro ?? "",
            caracteristicas_fisicas: '',
            especificaciones_tecnicas: '',
            observaciones_adicionales: '',
            ruta_imagen_foto: '',
        })
    }

    }, [current_cv_other]);

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
                <h1>Hoja de vida otros activos</h1>
                <Grid item xs={12} md={12} marginTop={-2}>

                    <Title title={''}  ></Title>
                </Grid>

                <SeleccionarOtros />


                <EspecificacionesOtros
                    control_other={control_other}
                    get_values={get_values}
                    watch={watch}
                    title="Características físicas" />

                <EspecificacionesTec
                    control_other={control_other}
                    get_values={get_values}
                    title="Adicional" />
                <Mantenimiento_other />

                <Grid
                    container
                    direction="row" justifyContent="flex-end"
                    padding={2}
                    spacing={2}
                >
                    <Grid item xs={12} md={2}>
                        <FormButton
                            variant_button="contained"
                            on_click_function={handle_submit(on_submit)}
                            icon_class={action === "create" ? <EditIcon /> : <SaveIcon />}
                            label={action}
                            type_button="button"
                        />
                    </Grid>
                    {current_cv_other.id_hoja_de_vida !== null &&
                        <Grid item xs={12} md={2}>
                            <FormButton
                                variant_button="outlined"
                                on_click_function={delete_hoja_vida}
                                icon_class={<CloseIcon />}
                                label={"Eliminar"}
                                type_button="button"
                            />
                        </Grid>}

                    <Grid item xs={12} md={3}>
                        <Button
                            variant="contained"
                            onClick={programacion_mantenimiento}
                        >
                            Programar mantenimiento
                        </Button>
                    </Grid>
                </Grid>









            </Grid>
        </>
    );
}

