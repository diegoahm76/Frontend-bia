import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Grid } from '@mui/material';
import FormButton from "../../../../../components/partials/form/FormButton";
import { type IObjSolicitud } from "../interfaces/solicitudBienConsumo";
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { get_uni_organizacional, get_person_id_service, get_funcionario_id_service, aprobacion_solicitud_pendiente, get_bienes_solicitud, get_solicitud_documento_service, } from '../store/solicitudBienConsumoThunks';
import { set_current_solicitud, } from '../store/slices/indexSolicitudBienesConsumo';
import SeleccionarSolicitudAprobada from '../components/componentesAprobacion/SeleccionarSolicitudAprobacion';
import SeleccionarBienAprobado from '../components/componentesAprobacion/SeleccionarBienAprobado';
import FuncionarioAprobacion from '../components/componentesAprobacion/SeleccionarPersonaAprobada';
import Aprobacion from '../components/componentesAprobacion/Aprobacion';
import SearchIcon from '@mui/icons-material/Search';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';



// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const AprobacionSolicitudConsumoScreen = () => {
    //  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
    const { control: control_solicitud_aprobacion, handleSubmit: handle_submit, reset: reset_solicitud_aprobacion, getValues: get_values } = useForm<IObjSolicitud>();
    const [action] = useState<string>("Guardar");
    const { current_solicitud, persona_solicita, current_funcionario } = useAppSelector((state: { solic_consumo: any; }) => state.solic_consumo);
    const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
    const handle_open_select_model = (): void => { set_open_search_modal(true); };

    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(get_uni_organizacional());
        void dispatch(get_solicitud_documento_service())

    }, [])



    useEffect(() => {
        // //  console.log('')(current_solicitud)
        reset_solicitud_aprobacion(current_solicitud)
        if ('persona_solicita' in current_solicitud) {
            reset_solicitud_aprobacion(current_solicitud)
        } else {
            if (current_solicitud.id_persona_solicita !== null && current_solicitud.id_persona_solicita !== undefined)
                void dispatch(get_person_id_service(current_solicitud.id_persona_solicita))

        }
        if (current_solicitud.id_solicitud_consumibles !== null && current_solicitud.id_solicitud_consumibles !== undefined) {
            void dispatch(get_bienes_solicitud(current_solicitud.id_solicitud_consumibles))


            if (current_solicitud.id_funcionario_responsable_unidad !== current_funcionario.id_persona) {
                void dispatch(get_funcionario_id_service(current_solicitud.id_funcionario_responsable_unidad ?? 0))
            }
        }

    }, [current_solicitud]);

    useEffect(() => {
        dispatch(set_current_solicitud({ ...current_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional, id_unidad_org_del_responsable: persona_solicita.id_unidad_organizacional_actual }))
    }, [persona_solicita]);


    useEffect(() => {
        const observacion = get_values("observacion")
        const motivo = get_values("motivo")
        const id_unidad_para_la_que_solicita = get_values("id_unidad_para_la_que_solicita")
        if (current_funcionario.id_persona !== current_solicitud.id_funcionario_responsable_unidad) {
            dispatch(set_current_solicitud({ ...current_solicitud, id_funcionario_responsable_unidad: current_funcionario.id_persona, observacion, motivo, id_unidad_para_la_que_solicita }))
        }

    }, [current_funcionario]);

    const on_submit_aprobacion = (data: IObjSolicitud): void => {

        const form_data = {

            estado_aprobacion_responsable: data.estado_aprobacion_responsable,
            justificacion_rechazo_responsable: data.justificacion_rechazo_responsable,
            fecha_aprobacion_responsable: new Date().toString(),
        }

        void dispatch(aprobacion_solicitud_pendiente(form_data, data.id_solicitud_consumibles))
        //  console.log('')(form_data)
    }


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

            }}  >

            <Grid item xs={12} marginY={2}>

                <SeleccionarSolicitudAprobada
                    title={"Aprobación de solicitudes"} control_solicitud_aprobacion={control_solicitud_aprobacion} get_values={get_values}
                    open_modal={open_search_modal}
                    set_open_modal={set_open_search_modal}
                />
                <FuncionarioAprobacion
                    title={"Persona responsable"}
                    get_values_solicitud={get_values} />

                <SeleccionarBienAprobado />
                <Aprobacion
                    title={"Información del estado de la solicitud"} control_solicitud_aprobacion={control_solicitud_aprobacion} get_values={get_values} />


            </Grid>
            <Grid
                container
                direction="row"
                padding={2}
                spacing={2}
                justifyContent="flex-end"
            >

                <Grid item xs={12} md={2}>

                    <FormButton
                        variant_button="contained"
                        on_click_function={handle_submit(on_submit_aprobacion)}
                        icon_class={<SaveIcon />}
                        label={action}
                        type_button="button"
                    />
                </Grid>
                <Grid item xs={12} md={2.5}>
                    <FormButton
                        variant_button="contained"
                        on_click_function={handle_open_select_model}
                        icon_class={<SearchIcon />}
                        label={'Buscar solicitud'}
                        type_button="button"
                        disabled={false}
                    />
                </Grid>
                <Grid item xs={6} md={1.3}>
                    <ButtonSalir
                    />

                </Grid>




            </Grid>
        </Grid>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default AprobacionSolicitudConsumoScreen;
