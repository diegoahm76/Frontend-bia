import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Grid } from '@mui/material';
import SeleccionarSolicitud from '../components/componenteBusqueda/SeleccionarSolicitud';
import FormButton from "../../../../../components/partials/form/FormButton";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import SeleccionarBienConsumo from "../components/componenteBusqueda/SeleccionarBienConsumo";
import { type IObjSolicitud } from "../interfaces/solicitudBienConsumo";
import type { AuthSlice } from '../../../../../commons/auth/interfaces';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { get_num_solicitud, get_uni_organizacional, get_medida_service, get_person_id_service, crear_solicitud_bien_consumo, editar_solicitud, get_funcionario_id_service, anular_solicitud_service, get_bienes_solicitud, } from '../store/solicitudBienConsumoThunks';

import { set_current_solicitud, set_persona_solicita } from '../store/slices/indexSolicitudBienesConsumo';
import PersonaResponsable from '../components/componenteBusqueda/PersonaResponsable';
import AnularSolicitudModal from '../components/DespachoRechazoSolicitud/AnularSolicitud';
import { Title } from '../../../../../components/Title';



// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SolicitudConsumoScreen = () => {
    const { userinfo } = useSelector((state: AuthSlice) => state.auth);
    const { control: control_solicitud, handleSubmit: handle_submit, reset: reset_solicitud, getValues: get_values } = useForm<IObjSolicitud>();
    const { nro_solicitud, current_solicitud, persona_solicita, bienes_solicitud, current_funcionario } = useAppSelector((state) => state.solic_consumo);
    const [action, set_action] = useState<string>("Crear");
    const [anular, set_anular] = useState<string>("Anular");
    const [anular_solicitud, set_anular_solicitud] =
        useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(get_uni_organizacional());
        void dispatch(get_num_solicitud());
        void dispatch(get_medida_service());
        dispatch(set_persona_solicita({ nombre: userinfo.nombre, id_persona: userinfo.id_persona, unidad_organizacional: userinfo.nombre_unidad_organizacional }))

    }, [])

    useEffect(() => {
        dispatch(set_current_solicitud({ ...current_solicitud, nro_solicitud_por_tipo: nro_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional, }))
    }, [nro_solicitud]);

    useEffect(() => {
        // console.log(current_solicitud)
        reset_solicitud(current_solicitud)
        if ('persona_solicita' in current_solicitud) {
            reset_solicitud(current_solicitud)
        } else {
            if (current_solicitud.id_persona_solicita !== null && current_solicitud.id_persona_solicita !== undefined)
                void dispatch(get_person_id_service(current_solicitud.id_persona_solicita))

        }
        if (current_solicitud.id_solicitud_consumibles !== null && current_solicitud.id_solicitud_consumibles !== undefined) {
            set_action("editar")
            void dispatch(get_bienes_solicitud(current_solicitud.id_solicitud_consumibles))
            if (current_solicitud.id_funcionario_responsable_unidad !== current_funcionario.id_persona) {
                void dispatch(get_funcionario_id_service(current_solicitud.id_funcionario_responsable_unidad))
                console.log("ok")
            }
        }

    }, [current_solicitud]);

    useEffect(() => {
        dispatch(set_current_solicitud({ ...current_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional }))
    }, [persona_solicita]);

    useEffect(() => {
        const observacion = get_values("observacion")
        const motivo = get_values("motivo")
        const id_unidad_para_la_que_solicita = get_values("id_unidad_para_la_que_solicita")
        if (current_funcionario.id_persona !== current_solicitud.id_funcionario_responsable_unidad) {
            dispatch(set_current_solicitud({ ...current_solicitud, id_funcionario_responsable_unidad: current_funcionario.id_persona, observacion, motivo, id_unidad_para_la_que_solicita }))
        }

    }, [current_funcionario]);
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const on_submit = (data: IObjSolicitud) => {
        if (current_solicitud.id_solicitud_consumibles !== null && current_solicitud.id_solicitud_consumibles !== undefined) {
            set_action("editar")


            const data_aux = {
                info_solicitud: { ...data, fecha_anulacion_solicitante: null },
                items_solicitud: bienes_solicitud.map((item: any, index: any) => ({
                    ...item,
                    nro_posicion: index,
                })),
            }
            void dispatch(editar_solicitud(current_solicitud.id_solicitud_consumibles, data_aux))
        } else {
            set_action("crear")
            const data_aux = {
                info_solicitud: { ...data, fecha_anulacion_solicitante: null },
                items_solicitud: bienes_solicitud.map((item: any, index: any) => ({
                    ...item,
                    nro_posicion: index,
                })),
            }
            void dispatch(crear_solicitud_bien_consumo(data_aux));
        }


    };
    const on_submit_anular = (data: IObjSolicitud): void => {

        const form_data = {
            solicitud_anulada_solicitante: true,
            justificacion_anulacion_solicitante: data.justificacion_anulacion_solicitante
        }

        void dispatch(anular_solicitud_service(form_data, data.id_solicitud_consumibles));

    };




    return (


        <Grid
            container
            spacing={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                mt: '23px',
                boxShadow: '0px 3px 6px #042F4A26',

            }}
        >
            <Title title="Solicitud de consumo "></Title>
            <Grid item xs={12} marginY={2}>
                <SeleccionarSolicitud
                    control_solicitud={control_solicitud}
                    get_values={get_values} title={''}
                />
                {current_solicitud.solicitud_anulada_solicitante !== true &&
                    <>
                        <PersonaResponsable
                            title={"Funcionario responsable"}
                            get_values_solicitud={get_values} />

                        <SeleccionarBienConsumo />
                    </>
                }

            </Grid>
            <Grid
                container
                direction="row"
                padding={2}
                spacing={2}
            >
                <Grid item xs={12} md={4} >
                    <FormButton
                        variant_button="contained"
                        on_click_function={handle_submit(on_submit)}
                        icon_class={<SaveIcon />}
                        label={action}
                        type_button="button"
                    />
                </Grid>

                <Grid item xs={6} md={2}>

                    <FormButton
                        variant_button="outlined"
                        on_click_function={reset_solicitud}
                        icon_class={<CloseIcon />}
                        label={"Cancelar"}
                        type_button="button"
                    />
                </Grid>
                <Grid item xs={12} md={5}>

                    <Button
                        variant="outlined"
                        onClick={() => {
                            set_anular("Anular")
                            set_anular_solicitud(true);
                        }}


                    >
                        ANULACIÓN DE SOLICITUDES DE CONSUMO
                    </Button>

                </Grid>
                <AnularSolicitudModal
                    is_modal_active={anular_solicitud}
                    set_is_modal_active={set_anular_solicitud}
                    action={anular}
                    control_solicitud={control_solicitud}
                    get_values={get_values}
                    on_submit={handle_submit(on_submit_anular)}
                />
            </Grid>
        </Grid>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default SolicitudConsumoScreen;


