import { Chip, Grid } from '@mui/material';
import BuscarModelo from '../../../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { get_solicitudes_pendientes_despacho } from '../../store/solicitudBienConsumoThunks';
import {
    set_current_solicitud,
    set_solicitudes,
} from '../../store/slices/indexSolicitudBienesConsumo';
// import type { AuthSlice } from '../../../../auth/interfaces';
// import { useSelector } from 'react-redux';

interface IProps {
    title: string;
    control_solicitud_despacho: any;
    get_values: any;
    open_modal: boolean;
    set_open_modal: any;
    reset_solicitud_aprobacion: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarSolicitudRechazo = ({
    title,
    control_solicitud_despacho,
    get_values, open_modal,
    set_open_modal,
    reset_solicitud_aprobacion,
}: IProps) => {

    const clear_fields = () => {
        reset_solicitud_aprobacion((prev: any) => {
            return {
                ...prev,
                nro_solicitud_por_tipo: null
            }
        });
    }

    // const { userinfo } = useSelector((state: AuthSlice) => state.auth);

    const { solicitudes } = useAppSelector((state) => state.solic_consumo);

    const dispatch = useAppDispatch();

    const columns_solicitudes_despacho: GridColDef[] = [
        { field: 'nro_solicitud_por_tipo', headerName: 'Número de solicitud', width: 180, flex: 1, },
        {
            field: 'fecha_solicitud',
            headerName: 'Fecha de solicitud',
            width: 200, flex: 1.5,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'fecha_aprobacion_responsable',
            headerName: 'Fecha de aprobación',
            width: 200, flex: 1.5,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'persona_solicita',
            headerName: 'Solicitud elaborada por:',
            width: 300, flex: 2,
        },
        {
            field: 'observacion',
            headerName: 'Observación',
            width: 400, flex: 2,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'es_solicitud_de_conservacion',
            headerName: 'Solicitud de conservación',
            width: 400, flex: 1,
            renderCell: (params) => {
                return params.row.es_solicitud_de_conservacion === true ? (
                    <Chip size="small" label="SI" color="success" variant="outlined" />
                ) : (
                    <Chip size="small" label="NO" color="error" variant="outlined" />
                );
            },
        },
    ];

    const get_solicitudes_filtro: any = async () => {
        const param = get_values("nro_solicitud_por_tipo");
        void dispatch(get_solicitudes_pendientes_despacho(param));
    };

    return (
        <>
            <Grid container direction="row" padding={2} borderRadius={2}>
                <BuscarModelo
                    set_current_model={set_current_solicitud}
                    row_id={'id_solicitud_consumibles'}
                    columns_model={columns_solicitudes_despacho}
                    models={solicitudes}
                    get_filters_models={get_solicitudes_filtro}
                    set_models={set_solicitudes}
                    show_search_button={false}
                    open_search_modal={open_modal}
                    set_open_search_modal={set_open_modal}
                    clear_fields={clear_fields}
                    form_inputs={[
                        {
                            datum_type: 'title',
                            title_label: title ?? 'hh',
                        },

                        {
                            datum_type: 'date_picker_controller',
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud_despacho,
                            control_name: 'fecha_solicitud',
                            default_value: '',
                            rules: {

                            },
                            label: 'Fecha de solicitud',
                            disabled: true,
                            helper_text: '',
                            format: 'YYYY-MM-DD',
                        },
                        {
                            datum_type: 'date_picker_controller',
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud_despacho,
                            control_name: 'fecha_aprobacion_responsable',
                            default_value: null,
                            rules: {

                            },
                            label: 'Fecha de aprobación',
                            disabled: true,
                            helper_text: '',
                            format: 'YYYY-MM-DD',
                        },
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 12,
                            control_form: control_solicitud_despacho,
                            control_name: 'observacion',
                            default_value: '',
                            rules: { required_rule: { rule: false, message: 'requerido' } },
                            label: 'Observacion de solicitud',
                            type: 'text',
                            multiline_text: true,
                            rows_text: 4,
                            disabled: true,
                            helper_text: '',
                        },
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 12,
                            control_form: control_solicitud_despacho,
                            control_name: 'motivo',
                            default_value: '',
                            rules: { required_rule: { rule: false, message: 'requerido' } },
                            label: 'Motivo de solicitud',
                            type: 'text',
                            multiline_text: true,
                            rows_text: 4,
                            disabled: true,
                            helper_text: '',
                        },
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            control_form: control_solicitud_despacho,
                            control_name: 'persona_solicita',
                            default_value: '',
                            rules: { required_rule: { rule: false, message: 'requerido' } },
                            label: 'Solicitud elaborada por:',
                            type: 'text',
                            disabled: true,
                            helper_text: '',
                        },
                    ]}
                    modal_select_model_title="Buscar solicitud"
                    modal_form_filters={[
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 2,
                            control_form: control_solicitud_despacho,
                            control_name: 'nro_solicitud_por_tipo',
                            default_value: '',
                            rules: { required_rule: { rule: false, message: 'requerido' } },
                            label: 'Número de solicitud',
                            type: 'number',
                            disabled: false,
                            helper_text: '',
                        },
                    ]}
                />
            </Grid>
        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarSolicitudRechazo;
