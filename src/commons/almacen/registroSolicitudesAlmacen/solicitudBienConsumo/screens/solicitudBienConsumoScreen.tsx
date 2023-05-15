import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Grid } from '@mui/material';
import SeleccionarSolicitud from '../components/componenteBusqueda/SeleccionarSolicitud';
import FormButton from "../../../../../components/partials/form/FormButton";
import SaveIcon from '@mui/icons-material/Save';
import SeleccionarBienConsumo from "../components/componenteBusqueda/SeleccionarBienConsumo";
import { type IObjSolicitud } from "../interfaces/solicitudBienConsumo";
import type { AuthSlice } from '../../../../../commons/auth/interfaces';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { get_num_solicitud, get_uni_organizacional, get_medida_service, get_person_id_service, crear_solicitud_bien_consumo } from '../store/solicitudBienConsumoThunks';
import { Title } from '../../../../../components/Title';
import CloseIcon from '@mui/icons-material/Close';


import { set_current_solicitud, set_persona_solicita } from '../store/slices/indexSolicitudBienesConsumo';
import PersonaResponsable from '../components/componenteBusqueda/PersonaResponsable';


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SolicitudConsumoScreen = () => {
    const { userinfo } = useSelector((state: AuthSlice) => state.auth);
    const { control: control_solicitud, handleSubmit: handle_submit, reset: reset_solicitud, getValues: get_values } = useForm<IObjSolicitud>();
    const { nro_solicitud, current_solicitud, persona_solicita, bienes_solicitud, current_funcionario } = useAppSelector((state) => state.solic_consumo);
    const [action] = useState<string>("Crear solicitud de consumo")
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
        console.log(current_solicitud)
        reset_solicitud(current_solicitud)
        if ('persona_solicita' in current_solicitud) {
            reset_solicitud(current_solicitud)
        } else {
            if (current_solicitud.id_persona_solicita !== null && current_solicitud.id_persona_solicita !== undefined)
                void dispatch(get_person_id_service(current_solicitud.id_persona_solicita))

        }

    }, [current_solicitud]);

    useEffect(() => {
        dispatch(set_current_solicitud({ ...current_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional }))
    }, [persona_solicita]);

    useEffect(() => {
        const observacion = get_values("observacion")
        const motivo = get_values("motivo")
        const id_unidad_para_la_que_solicita = get_values("id_unidad_para_la_que_solicita")

        dispatch(set_current_solicitud({ ...current_solicitud, id_funcionario_responsable_unidad: current_funcionario.id_persona, observacion: observacion, motivo: motivo, id_unidad_para_la_que_solicita: id_unidad_para_la_que_solicita }))

    }, [current_funcionario]);

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const on_submit = (data: IObjSolicitud) => {

        const data_aux = {
            info_solicitud: { ...data },
            items_solicitud: bienes_solicitud.map((item, index) => ({
                ...item,
                nro_posicion: index,
            })),
        }

        void dispatch(crear_solicitud_bien_consumo(data_aux));

        // if (current_solicitud.id_solicitud_consumibles !== null && current_solicitud.id_solicitud_consumibles !== undefined) {


        // }
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
                boxShadow: '0px 3px 6px #042F4A26',

            }}
        >
            <Title title="Solicitud de consumo "></Title>
            <Grid item xs={12} marginY={2}>
                <SeleccionarSolicitud
                    control_solicitud={control_solicitud}
                    get_values={get_values}

                />
                <PersonaResponsable
                    title={"Funcionario responsable"}
                    get_values_solicitud={get_values} />

                <SeleccionarBienConsumo />


            </Grid>
            {/* <Grid item xs={12} md={4}>
                <FormButton
                    variant_button="contained"
                    on_click_function={handle_submit(on_submit)}
                    label={action}
                    icon_class={<SaveIcon />}
                    type_button="button"
                />

            </Grid> */}
            <Grid
                container
                direction="row"
                padding={2}
                spacing={2}
            >
                <Grid item xs={12} md={3}>
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
                        on_click_function={null}
                        icon_class={<CloseIcon />}
                        label={"Cancelar"}
                        type_button="button"
                    />
                </Grid>
            </Grid>
        </Grid>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default SolicitudConsumoScreen;
