
import { useEffect, useState } from 'react';
import { api } from '../../../../../../api/axios';
import { useForm } from 'react-hook-form';
import { Grid, } from '@mui/material';
import { type ToastContent, toast } from 'react-toastify';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { type InfoSolicitud } from "../../interfaces/solicitudBienConsumo";
import type { AuthSlice } from '../../../../../../commons/auth/interfaces';
import { useSelector } from 'react-redux';
import { set_info_solicitud } from '../../store/slices/indexSolicitudBienesConsumo';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { get_uni_organizacional } from '../../store/solicitudBienConsumoThunks';


const initial_state_solicitud: InfoSolicitud = {
    id_solicitud_consumibles: null,
    es_solicitud_de_conservacion: false,
    id_unidad_para_la_que_solicita: null,
    id_funcionario_responsable_unidad: null,
    motivo: "",
    observacion: "",
    id_persona_solicita: null,
    persona_solicita: "",
    fecha_solicitud: ""
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarSolicitud = () => {

    const { userinfo } = useSelector((state: AuthSlice) => state.auth);
    const { control: control_solicitud, reset: reset_solicitud, getValues: get_values, watch } = useForm<InfoSolicitud>();
    const { unidad_organizacional } = useAppSelector((state) => state.solic_consumo);
    const [solicitudes, set_solicitudes] = useState<InfoSolicitud[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(get_uni_organizacional());
    }, [])

    const unidad_selected = watch("id_unidad_para_la_que_solicita")

    const columns_solicitudes: GridColDef[] = [
        { field: 'id_solicitud_consumible', headerName: 'ID', width: 20 },
        {
            field: 'numero_despacho_consumo',
            headerName: '# despacho',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'motivo',
            headerName: 'Motivo',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {new Date(params.value).toDateString()}
                </div>
            ),
        },
        {
            field: 'observacion',
            headerName: 'Observación',
            width: 350,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },

    ];

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const control_error = (message: ToastContent = 'Algo pasó, intente de nuevo') =>
        toast.error(message, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        });

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const control_success = (message: ToastContent) =>
        toast.success(message, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        });

    useEffect(() => {
        reset_solicitud({ ...initial_state_solicitud, persona_solicita: userinfo.nombre, id_persona_solicita: userinfo.id_persona })
    }, []);

    useEffect(() => {
        console.log(unidad_selected)
    }, [unidad_selected]);


    const search_solicitud: any = (async () => {
        const number_solicitud = get_values("id_solicitud_consumibles") ?? ""
        try {
            const { data } = await api.get(

                `almacen/solicitudes/get-solicitud-by-id/${number_solicitud}/`
            );
            if ("data" in data) {
                if (data.data.length > 0) {
                    reset_solicitud(data.data)
                    control_success("Se selecciono la solicitud ")
                } else {
                    control_error(data.detail)
                }

            } else {
                control_error(data.detail)
            }
        } catch (err) {
            console.log(err);
        }
    })

    const get_solicitudes: any = (async () => {
        try {
            const { data } = await api.get(
                `conservacion/solicitudes/get-list/`
            );
            if ("data" in data) {
                if (data.data.length > 0) {
                    set_solicitudes(data.data)
                    control_success("Se encontraron solicitudes")
                } else {
                    control_error("No se encontraron solicitudes")
                    set_solicitudes([])
                }
            }
        } catch (err) {
            control_error("No se encontraron solicitudes")
            console.log(err);
        }
    })

    return (
        <>
            <Grid
                container
                direction="row"
                padding={2}
                borderRadius={2}

            >




                <BuscarModelo
                    set_current_model={set_info_solicitud}
                    row_id={"id_solicitud_consumible"}
                    columns_model={columns_solicitudes}
                    models={solicitudes}
                    get_filters_models={get_solicitudes}
                    set_models={set_solicitudes}
                    reset_values={reset_solicitud}
                    button_submit_label='Buscar solicitud'
                    form_inputs={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud,
                            control_name: "id_solicitud_consumibles",
                            default_value: "",
                            rules: {},
                            label: "Numero solicitud",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                            on_blur_function: search_solicitud
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud,
                            control_name: "fecha_solicitud",
                            default_value: "",
                            rules: {},
                            label: "Fecha de ingreso",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 12,
                            control_form: control_solicitud,
                            control_name: "observacion",
                            default_value: "",
                            rules: {},
                            label: "Observacion de solicitud",
                            type: "text",
                            multiline_text: true,
                            rows_text: 4,
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 12,
                            control_form: control_solicitud,
                            control_name: "motivo",
                            default_value: "",
                            rules: {},
                            label: "Motivo de solicitud",
                            type: "text",
                            multiline_text: true,
                            rows_text: 4,
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_solicitud,
                            control_name: "id_unidad_para_la_que_solicita",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Unidad organizacional",
                            disabled: false,
                            helper_text: "debe seleccionar campo",
                            select_options: unidad_organizacional,
                            option_label: "nombre",
                            option_key: "id_unidad_organizacional"
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud,
                            control_name: "persona_solicita",
                            default_value: "",
                            rules: {},
                            label: "Solicitud elaborada por:",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                    ]}
                    modal_select_model_title='Buscar solicitud'
                    modal_form_filters={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_solicitud,
                            control_name: "id_solicitud_consumibles",
                            default_value: "",
                            rules: {},
                            label: "Número de solicitud",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                        }
                    ]}
                />
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarSolicitud;