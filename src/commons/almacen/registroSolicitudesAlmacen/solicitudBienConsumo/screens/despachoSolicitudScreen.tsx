import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Grid } from '@mui/material';
import FormButton from "../../../../../components/partials/form/FormButton";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { type IObjSolicitud } from "../interfaces/solicitudBienConsumo";
import type { AuthSlice } from '../../../../auth/interfaces';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { get_uni_organizacional, get_person_id_service, get_funcionario_id_service, rechazar_solicitud_service, } from '../store/solicitudBienConsumoThunks';
import { Title } from '../../../../../components/Title';
import { set_current_solicitud, set_persona_solicita } from '../store/slices/indexSolicitudBienesConsumo';
import SeleccionarSolicitudDespacho from '../components/SeleccionarSolicitudesDespacho';
import RechazoSolicitud from '../components/RechazarSolicitud';
import SaveIcon from '@mui/icons-material/Save';


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DespachoBienesConsumoScreen = () => {
    const { userinfo } = useSelector((state: AuthSlice) => state.auth);
    const { control: control_solicitud_despacho, handleSubmit: handle_submit, reset: reset_solicitud_aprobacion, getValues: get_values } = useForm<IObjSolicitud>();
    const [action] = useState<string>("Despachar");

    const { nro_solicitud, current_solicitud, persona_solicita, current_funcionario } = useAppSelector((state) => state.solic_consumo);
    const [show_rechazo_solicitud, set_show_rechazo_solicitud] = useState(false);
    const [show_buttons, set_show_buttons] = useState(true);


    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(get_uni_organizacional());
        dispatch(set_persona_solicita({ nombre: userinfo.nombre, id_persona: userinfo.id_persona, unidad_organizacional: userinfo.nombre_unidad_organizacional }))
    }, [])

    useEffect(() => {
        dispatch(set_current_solicitud({ ...current_solicitud, nro_solicitud_por_tipo: nro_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional, id_funcionario_responsable_unidad: persona_solicita.id_persona }))
    }, [nro_solicitud]);

    useEffect(() => {
        // console.log(current_solicitud)
        reset_solicitud_aprobacion(current_solicitud)
        if ('persona_solicita' in current_solicitud) {
            reset_solicitud_aprobacion(current_solicitud)
        } else {
            if (current_solicitud.id_persona_solicita !== null && current_solicitud.id_persona_solicita !== undefined)
                void dispatch(get_person_id_service(current_solicitud.id_persona_solicita))

        }
        if (current_solicitud.id_solicitud_consumibles !== null) {
            if (current_solicitud.id_funcionario_responsable_unidad !== current_funcionario.id_persona) {
                void dispatch(get_funcionario_id_service(current_solicitud.id_funcionario_responsable_unidad))
                console.log("ok")
            }
        }

    }, [current_solicitud]);
    useEffect(() => {
        dispatch(set_current_solicitud({ ...current_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional }))
    }, [persona_solicita]);


    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_rechazo_solicitud = () => {
        set_show_rechazo_solicitud(!show_rechazo_solicitud);
        set_show_buttons(false);
    };
    const on_submit_despacho = (data: IObjSolicitud): void => {

        const form_data = {

            rechazada_almacen: true,
            justificacion_rechazo_almacen: data.justificacion_rechazo_almacen,
            fecha_rechazo_almacen: data.fecha_rechazo_almacen
        }

        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        void dispatch(rechazar_solicitud_service(form_data, data.id_solicitud_consumibles))
        console.log(form_data)
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
                boxShadow: '0px 3px 6px #042F4A26',

            }}
        >
            <Title title="Listado de solicitudes aprobadas por despachar " />

            <Grid item xs={12} marginY={2}>
                <SeleccionarSolicitudDespacho control_solicitud_despacho={control_solicitud_despacho} get_values={get_values}


                />

                {show_rechazo_solicitud && <RechazoSolicitud
                    control_solicitud_despacho={control_solicitud_despacho} get_values={get_values}
                />}


            </Grid>

            <Grid container direction="row" padding={2} spacing={2}>
                {show_buttons && (
                    <>
                        <Grid item xs={8} md={3}>

                            <FormButton
                                variant_button="contained"
                                on_click_function={handle_submit}
                                icon_class={<SendIcon />}
                                label={action}
                                type_button="button"
                            />
                        </Grid>
                        <Grid item xs={8} md={3}>

                            <Button
                                variant="outlined"
                                onClick={handle_rechazo_solicitud}

                            >
                                RECHAZO DE SOLICITUD
                            </Button>

                        </Grid>

                    </>
                )}
            </Grid>
            <Button

                variant="contained"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handle_submit(on_submit_despacho)}
                startIcon={<SaveIcon />}>

                GUARDAR
            </Button>


            <Button
                variant="outlined"
                //   onClick={handle_close_despacho}
                startIcon={<CloseIcon />}
                style={{ marginLeft: '1rem' }}
            >
                CERRAR
            </Button>
        </Grid>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default DespachoBienesConsumoScreen;
