import { Chip, Grid, } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { get_solicitud_service_vivero, get_solicitudes_id_persona_service } from '../../store/solicitudBienConsumoThunks';
import { set_current_solicitud, set_solicitudes } from '../../store/slices/indexSolicitudBienesConsumo';
import type { AuthSlice } from '../../../../../auth/interfaces';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';


interface IProps {
    title?: string;
    control_solicitud_aprobacion_vivero: any;
    get_values: any
    open_modal: boolean;
    set_open_modal: any;
    reset_values: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarSolicitudAprobadaVivero = ({
    title,
    control_solicitud_aprobacion_vivero,
    get_values, open_modal,
    set_open_modal,
    reset_values
}: IProps) => {

    const { userinfo } = useSelector((state: AuthSlice) => state.auth);
    const { unidad_organizacional, solicitudes } = useAppSelector((state) => state.solic_consumo);

    const dispatch = useAppDispatch();

    const columns_solicitudes: GridColDef[] = [

        {
            field: 'nro_solicitud_por_tipo',
            headerName: 'Número solicitud',
            minWidth: 160,
            flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'fecha_solicitud',
            headerName: 'Fecha de solicitud',
            minWidth: 180,
            flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.row.fecha_solicitud.split('T')[0]}
                </div>
            ),
        },
        {
            field: 'persona_responsable',
            headerName: 'Responsable',
            minWidth: 350,
            flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nombre_unidad_organizacional_responsable',
            headerName: 'Unidad Org responsable',
            minWidth: 240,
            flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'persona_solicita',
            headerName: 'Persona Solicita',
            minWidth: 350,
            flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nombre_unidad_organizacional_solicita',
            headerName: 'Unidad Org solicita',
            minWidth: 240,
            flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nombre_unidad_organizacional_solicitante',
            headerName: 'Unidad Org solicitante',
            minWidth: 240,
            flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'observacion',
            headerName: 'Observación',
            minWidth: 200,
            flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },
        {
            field: 'solicitud_anulada_solicitante',
            headerName: 'Estado de la solicitud',
            minWidth: 180,
            flex: 1,
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
        const nro_solicitud_por_tipo = get_values("nro_solicitud_por_tipo")
        const fecha_desde = get_values("fecha_desde")
        const fecha_hasta = get_values("fecha_hasta")
        const formatted_fecha_desde = fecha_desde ? dayjs(fecha_desde).format('YYYY-MM-DD HH:mm:ss.SSS[Z]') : '';
        const formatted_fecha_hasta = fecha_hasta ? dayjs(fecha_hasta).format('YYYY-MM-DD HH:mm:ss.SSS[Z]') : '';
        void dispatch(get_solicitudes_id_persona_service(userinfo.id_persona, nro_solicitud_por_tipo, formatted_fecha_desde, formatted_fecha_hasta))
    })

    const search_solicitud: any = (async () => {
        const solicitud_id = get_values("id_solicitud_consumibles")
        if (solicitud_id !== null) {
            void dispatch(get_solicitud_service_vivero(solicitud_id))
        }
    })

    const clear_fields = () => {
        reset_values((prev: any) => {
            return {
                ...prev,
                nro_solicitud_por_tipo: "",
                fecha_desde: null,
                fecha_hasta: null
            }
        })
    }


    return (
        <>
            <Grid
                container
                direction="row"
                padding={2}
                borderRadius={2}

            >
                <BuscarModelo
                    clear_fields={clear_fields}
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
                            control_form: control_solicitud_aprobacion_vivero,
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
                            control_form: control_solicitud_aprobacion_vivero,
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
                            control_form: control_solicitud_aprobacion_vivero,
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
                            control_form: control_solicitud_aprobacion_vivero,
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
                            control_form: control_solicitud_aprobacion_vivero,
                            control_name: "persona_solicita",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Solicitud elaborada por:",
                            disabled: true,
                            helper_text: "",
                        },


                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud_aprobacion_vivero,
                            control_name: "nombre_unidad_organizacional_solicita",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Unidad para la cual se realiza la solicitud",
                            disabled: true,
                            helper_text: "",
                        },
                    ]}
                    modal_select_model_title='Buscar solicitud'
                    modal_form_filters={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_solicitud_aprobacion_vivero,
                            control_name: "nro_solicitud_por_tipo",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Número de solicitud",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                        },
                        {
                            datum_type: 'date_picker_controller',
                            xs: 12,
                            md: 3,
                            control_form: control_solicitud_aprobacion_vivero,
                            control_name: 'fecha_desde',
                            default_value: '',
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: 'Fecha desde',
                            helper_text: '',
                            format: 'YYYY-MM-DD',
                        },
                        {
                            datum_type: 'date_picker_controller',
                            xs: 12,
                            md: 3,
                            control_form: control_solicitud_aprobacion_vivero,
                            control_name: 'fecha_hasta',
                            default_value: '',
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: 'Fecha hasta',
                            helper_text: '',
                            format: 'YYYY-MM-DD',
                        },
                    ]}
                />
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarSolicitudAprobadaVivero;

