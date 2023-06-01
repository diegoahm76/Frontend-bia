import { Grid, } from '@mui/material';
import BuscarModelo from "../../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { get_solicitudes_pendientes_despacho } from '../store/solicitudBienConsumoThunks';
import { set_current_solicitud, set_solicitudes } from '../store/slices/indexSolicitudBienesConsumo';
// import type { AuthSlice } from '../../../../auth/interfaces';
// import { useSelector } from 'react-redux';


interface IProps {
    control_solicitud_despacho: any;
    get_values: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarSolicitudDespacho = ({
    control_solicitud_despacho,
    get_values
}: IProps) => {

    // const { userinfo } = useSelector((state: AuthSlice) => state.auth);

    const { solicitudes } = useAppSelector((state) => state.solic_consumo);




    const dispatch = useAppDispatch();

    const columns_solicitudes_despacho: GridColDef[] = [
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
            field: 'fecha_aprobacion_responsable',
            headerName: 'Fecha de aprobación',
            width: 300,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },
        {
            field: 'nro_solicitud_por_tipo',
            headerName: 'Solicitud elaborada por:',
            width: 400,


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
        void dispatch(get_solicitudes_pendientes_despacho())
    })

    const search_solicitud: any = (async () => {
        const solicitud_id = get_values("id_solicitud_consumibles")
        if (solicitud_id !== null) {
            void dispatch(get_solicitudes_pendientes_despacho())
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
                    columns_model={columns_solicitudes_despacho}
                    models={solicitudes}
                    get_filters_models={get_solicitudes_filtro}
                    set_models={set_solicitudes}
                    button_submit_label='Buscar solicitud'
                    form_inputs={[

                        {
                            datum_type: "input_controller",
                            xs: 5,
                            md: 2,
                            control_form: control_solicitud_despacho,
                            control_name: "id_solicitud_consumibles",
                            default_value: "",
                            rules: {},
                            label: "ID",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                            on_blur_function: search_solicitud
                        },

                        {
                            datum_type: "input_controller",
                            xs: 5,
                            md: 3,
                            control_form: control_solicitud_despacho,
                            control_name: "fecha_solicitud",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Fecha de creación de la solicitud",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 5,
                            md: 3,
                            control_form: control_solicitud_despacho,
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
                            xs: 5,
                            md: 3,
                            control_form: control_solicitud_despacho,
                            control_name: "nombre_unidad_organizacional",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Unidad a la que pertenece:",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_solicitud_despacho,
                            control_name: "id_funcionario_responsable_unidad",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Funcionario responsable",
                            disabled: true,
                            helper_text: "",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 12,
                            control_form: control_solicitud_despacho,
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
                            control_form: control_solicitud_despacho,
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





                    ]}
                    modal_select_model_title='Buscar solicitud'
                    modal_form_filters={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_solicitud_despacho,
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
export default SeleccionarSolicitudDespacho;

