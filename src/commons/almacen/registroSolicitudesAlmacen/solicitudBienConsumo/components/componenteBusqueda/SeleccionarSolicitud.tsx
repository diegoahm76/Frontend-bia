
import { Chip, Grid, } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { get_solicitud_service, get_solicitudes_id_persona_service } from '../../store/solicitudBienConsumoThunks';
import { set_current_solicitud, set_solicitudes } from '../../store/slices/indexSolicitudBienesConsumo';
import type { AuthSlice } from '../../../../../../commons/auth/interfaces';
import { useSelector } from 'react-redux';



interface IProps {
    title: string;
    control_solicitud: any;
    get_values: any
    open_modal: boolean;
    set_open_modal: any;

}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarSolicitud = ({
    title,
    control_solicitud,
    get_values, open_modal,
    set_open_modal,
}: IProps) => {

    const { userinfo } = useSelector((state: AuthSlice) => state.auth);

    const { unidad_organizacional, solicitudes } = useAppSelector((state) => state.solic_consumo);


    const dispatch = useAppDispatch();

    const columns_solicitudes: GridColDef[] = [

        {
            field: 'fecha_solicitud',
            headerName: 'Fecha de solicitud',
            width: 400,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
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
        {
            field: 'solicitud_anulada_solicitante',
            headerName: 'Estado de la solicitud',
            width: 350,
            renderCell: (params) => {
                return params.row.solicitud_anulada_solicitante === false ? (
                    <Chip size="small" label="Abierta" color="success" variant="outlined" />
                ) : (
                    <Chip size="small" label="Anulada" color="error" variant="outlined" />
                );
            },

        },

    ];

    const get_solicitudes_filtro: any = (async () => {
        void dispatch(get_solicitudes_id_persona_service(userinfo.id_persona))
    })

    const search_solicitud: any = (async () => {
        const solicitud_id = get_values("id_solicitud_consumibles")
        if (solicitud_id !== null) {
            void dispatch(get_solicitud_service(solicitud_id))
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
                    set_current_model={set_current_solicitud}
                    row_id={"id_solicitud_consumibles"}
                    columns_model={columns_solicitudes}
                    models={solicitudes}
                    get_filters_models={get_solicitudes_filtro}
                    set_models={set_solicitudes}
                    show_search_button={false}
                    open_search_modal={open_modal}
                    set_open_search_modal={set_open_modal}
                    form_inputs={[
                        {
                            datum_type: "title",
                            title_label: title ?? "hh"

                        },

                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud,
                            control_name: "nro_solicitud_por_tipo",
                            default_value: "",
                            rules: {},
                            label: "Número solicitud",
                            type: "number",
                            disabled: true,
                            helper_text: "",
                            on_blur_function: search_solicitud
                        },

                        {
                            datum_type: 'date_picker_controller',
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud,
                            control_name: 'fecha_solicitud',
                            default_value: '',
                            rules: {

                            },
                            label: 'Fecha de entrega',
                            disabled: true,
                            helper_text: '',
                            format: 'YYYY-MM-DD',
                        },

                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 12,
                            control_form: control_solicitud,
                            control_name: "observacion",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
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
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Motivo de solicitud",
                            type: "text",
                            multiline_text: true,
                            rows_text: 4,
                            disabled: false,
                            helper_text: ""
                        },
                        // {
                        //     datum_type: "select_controller",
                        //     xs: 12,
                        //     md: 3,
                        //     control_form: control_solicitud,
                        //     control_name: "id_unidad_para_la_que_solicita",
                        //     default_value: "",
                        //     rules: { required_rule: { rule: true, message: "requerido" } },
                        //     label: "Unidad organizacional",
                        //     disabled: false,
                        //     helper_text: "debe seleccionar campo",
                        //     select_options: unidad_organizacional,
                        //     option_label: "nombre",
                        //     option_key: "id_unidad_organizacional"
                        // },


                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud,
                            control_name: "persona_solicita",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Solicitud elaborada por:",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud,
                            control_name: "nombre_unidad_organizacional",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Unidad a la que pertenece:",
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
                            rules: { required_rule: { rule: false, message: "requerido" } },
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
