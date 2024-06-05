import { useEffect, useState, } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Grid } from '@mui/material';
import FormButton from "../../../../../components/partials/form/FormButton";
import { type IObjSolicitud } from "../../solicitudBienConsumo/interfaces/solicitudBienConsumo";
import SearchIcon from '@mui/icons-material/Search';
import { type AuthSlice } from '../../../../auth/interfaces';
import { useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { get_uni_organizacional, get_person_id_service, get_funcionario_id_service, rechazar_solicitud_service, get_bienes_solicitud } from '../../solicitudBienConsumo/store/solicitudBienConsumoThunks';
import dayjs, { Dayjs } from 'dayjs';
import RechazoSolicitud from '../../solicitudBienConsumo/components/DespachoRechazoSolicitud/RechazarSolicitud';
import { clear_bienes, clear_bienes_solicitud, clear_current_funcionario, clear_current_solicitud, clear_persona_solicita, set_current_solicitud, set_persona_solicita } from '../../solicitudBienConsumo/store/slices/indexSolicitudBienesConsumo';
import FuncionarioRechazo from '../../solicitudBienConsumo/components/DespachoRechazoSolicitud/PersonaRechazoSolicitud';
import BienRechazado from '../../solicitudBienConsumo/components/DespachoRechazoSolicitud/BienesRechazo';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import SeleccionarSolicitudRechazo from '../../solicitudBienConsumo/components/DespachoRechazoSolicitud/SeleccionarSolicitudRechazo';


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const RechazoSolicitudScreen = () => {
    const { userinfo } = useSelector((state: AuthSlice) => state.auth);
    const { control: control_solicitud_despacho, handleSubmit: handle_submit, reset: reset_solicitud_aprobacion, getValues: get_values } = useForm<IObjSolicitud>();
    const { current_solicitud, persona_solicita, current_funcionario } = useAppSelector((state: { solic_consumo: any; }) => state.solic_consumo);
    const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
    const handle_open_select_model = (): void => { set_open_search_modal(true); };

    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(get_uni_organizacional());
        // dispatch(set_persona_solicita({ nombre: userinfo.nombre, id_persona: userinfo.id_persona, unidad_organizacional: userinfo.nombre_unidad_organizacional }));
    }, []);

    useEffect(() => {
        if(current_solicitud?.id_solicitud_consumibles){
            reset_solicitud_aprobacion(current_solicitud);
            if ('persona_solicita' in current_solicitud) {
                reset_solicitud_aprobacion(current_solicitud);
            } else {
                if (current_solicitud.id_persona_solicita !== null && current_solicitud.id_persona_solicita !== undefined) {
                    void dispatch(get_person_id_service(current_solicitud.id_persona_solicita));
                }
            }
            if (current_solicitud.id_solicitud_consumibles !== null && current_solicitud.id_solicitud_consumibles !== undefined) {
                void dispatch(get_bienes_solicitud(current_solicitud.id_solicitud_consumibles))


                if (current_solicitud.id_solicitud_consumibles !== null) {
                    if (current_solicitud.id_funcionario_responsable_unidad !== current_funcionario.id_persona) {
                        void dispatch(get_funcionario_id_service(current_solicitud.id_funcionario_responsable_unidad));
                        //  console.log('')("ok");
                    }
                }
            }
        }else{
            reset_solicitud_aprobacion(current_solicitud)
            dispatch(clear_persona_solicita())
            dispatch(clear_current_funcionario())
        }
    }, [current_solicitud]);

    // useEffect(() => {
    //     dispatch(set_current_solicitud({ ...current_solicitud, nro_solicitud_por_tipo: nro_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional, id_funcionario_responsable_unidad: persona_solicita.id_persona }));
    // }, [nro_solicitud]);

    //TODO: Revisar
    useEffect(() => {
        dispatch(set_current_solicitud({ ...current_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional }));
    }, [persona_solicita]);




    const on_submit_despacho = (data: IObjSolicitud): void => {
        const form_data = {
            rechazada_almacen: true,
            justificacion_rechazo_almacen: data.justificacion_rechazo_almacen,
            fecha_rechazo_almacen: dayjs().format('YYYY-MM-DD'),
            // fecha_rechazo_almacen: new Date().toString(),
        };
        void dispatch(rechazar_solicitud_service(form_data, data.id_solicitud_consumibles || 0));
        //  console.log('')(form_data);
    };



    return (
        <Grid
            container
            spacing={2}
            marginTop={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >


            <Grid item xs={12} marginY={2}>
                <SeleccionarSolicitudRechazo
                    reset_solicitud_aprobacion={reset_solicitud_aprobacion}
                    title={"Información de la solicitud"}
                    control_solicitud_despacho={control_solicitud_despacho}
                    get_values={get_values}
                    open_modal={open_search_modal}
                    set_open_modal={set_open_search_modal} />

                <FuncionarioRechazo title={"Persona responsable"}
                    get_values_solicitud={get_values} />
                <BienRechazado />




                <RechazoSolicitud
                    title={"Rechazo de solicitud"}
                    control_solicitud_despacho={control_solicitud_despacho} reset_solicitud_aprobacion={reset_solicitud_aprobacion} get_values={get_values} />
            </Grid>




            <>
            <Grid    container
            spacing={2}
            marginTop={2}
            direction="row" justifyContent="flex-end"
            >


                <Grid item xs={6} md={2}>
                    <FormButton
                        variant_button="contained"
                        on_click_function={handle_submit(on_submit_despacho)}
                        icon_class={<SaveIcon />}
                        label="Guardar"
                        type_button="button" />
                </Grid>

                <Grid item xs={12} md={2}>
                    <FormButton
                        variant_button="contained"
                        on_click_function={handle_open_select_model}
                        icon_class={<SearchIcon />}
                        label={'Buscar solicitud'}
                        type_button="button"
                        disabled={false}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <ButtonSalir
                    />
                </Grid>
  </Grid>
            </>


        </Grid>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default RechazoSolicitudScreen;