import { Grid, } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { get_solicitudes_id_persona_service } from '../../store/solicitudBienConsumoThunks';
import { set_current_solicitud, set_solicitudes } from '../../store/slices/indexSolicitudBienesConsumo';
import type { AuthSlice } from '../../../../../auth/interfaces';
import { useSelector } from 'react-redux';
import dayjs, { Dayjs } from 'dayjs';


interface IProps {

    control_solicitud_aprobacion: any;
    get_values: any;
    title: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const Aprobacion = ({

    control_solicitud_aprobacion,
    get_values, title,
}: IProps) => {

    const { userinfo } = useSelector((state: AuthSlice) => state.auth);

    const { solicitudes } = useAppSelector((state) => state.solic_consumo);




    const dispatch = useAppDispatch();

    const columns_solicitudes: GridColDef[] = [
        { field: 'id_solicitud_consumibles', headerName: 'ID', width: 100 },
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
        void dispatch(get_solicitudes_id_persona_service(userinfo.id_persona))
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
                    form_inputs={[
                        {
                            datum_type: "title",
                            title_label: title ?? ""

                        },

                        {
                            datum_type: "date_picker_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud_aprobacion,
                            control_name: "fecha_aprobacion_responsable",
                            default_value: dayjs().format('YYYY-MM-DD'),
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Fecha de aprobación",
                            type: "text",
                            multiline_text: true,
                            disabled: true,
                            helper_text: "",
                            format: 'YYYY-MM-DD',
                        },


                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud_aprobacion,
                            control_name: "estado_aprobacion_responsable",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Estado de aprobación",
                            disabled: false,
                            helper_text: "debe seleccionar campo",
                            select_options: [{ label: "Aprobado", value: "A" }, { label: "Rechazado", value: "R" }],
                            option_label: "label",
                            option_key: "value",

                        },

                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 12,
                            control_form: control_solicitud_aprobacion,
                            control_name: "justificacion_rechazo_responsable",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Justificación del rechazo",
                            type: "text",
                            multiline_text: true,
                            rows_text: 4,
                            disabled: false,
                            helper_text: "",

                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 12,
                            control_form: control_solicitud_aprobacion,
                            control_name: "persona_solicita",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Solicitud aprobada por:",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },

                        // {
                        //     datum_type: "input_controller",
                        //     xs: 12,
                        //     md: 3,
                        //     control_form: control_solicitud_aprobacion,
                        //     control_name: "persona_solicita",
                        //     default_value: "",
                        //     rules: { required_rule: { rule: false, message: "requerido" } },
                        //     label: "Solicitud aprobada por:",
                        //     type: "text",
                        //     disabled: true,
                        //     helper_text: ""
                        // },


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
export default Aprobacion;

