import { Grid, } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { get_solicitud_documento_service, get_solicitud_service, } from '../../store/solicitudBienConsumoThunks';
import { set_current_solicitud, set_solicitudes } from '../../store/slices/indexSolicitudBienesConsumo';
// import type { AuthSlice } from '../../../../../auth/interfaces';
// import { useSelector } from 'react-redux';


interface IProps {
    title?: string;
    control_solicitud_aprobacion: any;
    get_values: any
    open_modal: boolean;
    set_open_modal: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarSolicitudAprobada = ({
    title,
    control_solicitud_aprobacion,
    get_values,
    open_modal,
    set_open_modal,
}: IProps) => {

    const { unidad_organizacional, solicitudes } = useAppSelector((state) => state.solic_consumo);
    const dispatch = useAppDispatch();

    const columns_solicitudes: GridColDef[] = [
        { field: 'id_solicitud_consumibles', headerName: 'ID', width: 100 },
        {
            field: 'fecha_solicitud',
            headerName: 'Fecha de solicitud',
            width: 300,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },



        {
            field: 'observacion',
            headerName: 'Observación',
            width: 400,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },

    ];

    const get_solicitudes_filtro: any = (async () => {
        //  console.log('')("ggggg")
        void dispatch(get_solicitud_documento_service())
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
                            xs: 6,
                            md: 6,
                            control_form: control_solicitud_aprobacion,
                            control_name: "nro_solicitud_por_tipo",
                            default_value: "",
                            rules: {},
                            label: "Numero solicitud",
                            type: "number",
                            disabled: true,
                            helper_text: "",
                            on_blur_function: search_solicitud
                        },
                        {
                            datum_type: 'date_picker_controller',
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud_aprobacion,
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
                            control_form: control_solicitud_aprobacion,
                            control_name: "observacion",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
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
                            control_form: control_solicitud_aprobacion,
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
                            datum_type: "input_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud_aprobacion,
                            control_name: "persona_solicita",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Solicitud elaborada por:",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },

                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud_aprobacion,
                            control_name: "id_unidad_para_la_que_solicita",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Unidad para la cual se realiza la solicitud",
                            disabled: true,
                            helper_text: "",
                            select_options: unidad_organizacional,
                            option_label: "nombre",
                            option_key: "id_unidad_organizacional"
                        },


                    ]}
                    modal_select_model_title='Buscar solicitud'
                    modal_form_filters={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_solicitud_aprobacion,
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
export default SeleccionarSolicitudAprobada;

