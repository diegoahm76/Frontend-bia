import { Grid, } from '@mui/material';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';

import { get_solicitud_service, } from '../store/thunks/solicitudViveroThunks';
import { set_current_solicitud, set_solicitudes } from '../store/slices/indexSolicitud';



interface IProps {
    title?: string;
    control_solicitud_aprobada: any;
    get_values: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarSolicitudAprobada = ({
    title,
    control_solicitud_aprobada,
    get_values
}: IProps) => {

    // const { userinfo } = useSelector((state: AuthSlice) => state.auth);

    const { unidad_organizacional, solicitudes, nurseries } = useAppSelector((state: { solicitud_vivero: any; }) => state.solicitud_vivero);


    const dispatch = useAppDispatch();

    const columns_solicitudes: GridColDef[] = [
        { field: 'id_solicitud_consumibles', headerName: 'ID', width: 20 },
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
            field: 'persona_solicita',
            headerName: 'Observación',
            width: 350,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },

    ];

    const get_solicitudes_filtro: any = (async () => {
        void dispatch(get_solicitud_service())
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
                    row_id={"id_solicitud_vivero"}
                    columns_model={columns_solicitudes}
                    models={solicitudes}
                    get_filters_models={get_solicitudes_filtro}
                    set_models={set_solicitudes}
                    button_submit_label={'Buscar solicitud'}
                    form_inputs={[

                        {
                            datum_type: "title",
                            title_label: title ?? "hh"

                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_solicitud_aprobada,
                            control_name: "nro_solicitud",
                            default_value: "",
                            rules: {},
                            label: "Numero solicitud",
                            type: "number",
                            disabled: true,
                            helper_text: "",
                        },

                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_solicitud_aprobada,
                            control_name: "id_vivero_solicitud",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Vivero Origen",
                            disabled: true,
                            helper_text: "debe seleccionar campo",
                            select_options: nurseries,
                            option_label: "nombre",
                            option_key: "id_vivero",
                        },

                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_solicitud_aprobada,
                            control_name: "nro_info_tecnico",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Informe técnico Nro:",
                            type: "text",
                            multiline_text: true,
                            disabled: true,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_solicitud_aprobada,
                            control_name: "fecha_solicitud",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Fecha de ingreso",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                        {
                            datum_type: "date_picker_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_solicitud_aprobada,
                            control_name: "fecha_retiro_material",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Fecha de retiro material",
                            disabled: true,
                            min_date: (new Date().toString()),
                            format: "YYYY-MM-DD",
                            helper_text: ""
                        },

                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 12,
                            control_form: control_solicitud_aprobada,
                            control_name: "observaciones",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Observacion de solicitud",
                            type: "text",
                            multiline_text: true,
                            rows_text: 4,
                            disabled: true,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 12,
                            control_form: control_solicitud_aprobada,
                            control_name: "motivo",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Motivo de solicitud",
                            type: "text",
                            multiline_text: true,
                            rows_text: 4,
                            disabled: true,
                            helper_text: ""
                        },
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_solicitud_aprobada,
                            control_name: "id_unidad_para_la_que_solicita",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Unidad organizacional",
                            disabled: true,
                            helper_text: "debe seleccionar campo",
                            select_options: unidad_organizacional,
                            option_label: "nombre",
                            option_key: "id_unidad_organizacional",
                        },


                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_solicitud_aprobada,
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
                            md: 3,
                            control_form: control_solicitud_aprobada,
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
                            control_form: control_solicitud_aprobada,
                            control_name: "id_solicitud_consumibles",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Número de solicitud",
                            type: "number",
                            disabled: true,
                            helper_text: "",
                        }
                    ]}
                />
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarSolicitudAprobada;
