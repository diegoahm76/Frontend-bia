/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid } from '@mui/material';
import { useAppSelector } from '../../../../../hooks';
import { set_current_solicitud, set_solicitudes } from '../store/slices/indexSolicitudBienesConsumo';
import { type GridColDef } from '@mui/x-data-grid';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import { type IList } from '../../../../../interfaces/globalModels';

interface IProps {
    title: string;
    control_solicitud_despacho: any;
    get_values: any;



}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const RechazoSolicitud = ({
    title,
    control_solicitud_despacho,
    get_values,


}: IProps) => {

    // const dispatch = useAppDispatch();

    const { solicitudes } = useAppSelector((state) => state.solic_consumo);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const initial_options: IList[] = [
        {
            label: '',
            value: '',
        },
    ];

    //  const handle_close_despacho = (): void => { set_active(false); };

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

    // eslint-disable-next-line @typescript-eslint/no-redeclare


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
                    set_models={set_solicitudes}
                    button_submit_label='Solicitudes rechazadas'
                    form_inputs={[
                        {
                            datum_type: "title",
                            title_label: title ?? "hh"
                        },

                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 8,
                            control_form: control_solicitud_despacho,
                            control_name: "fecha_rechazo_almacen",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Fecha de ingreso",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 12,
                            control_form: control_solicitud_despacho,
                            control_name: "justificacion_rechazo_almacen",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Justificación de rechazo",
                            type: "text",
                            multiline_text: true,
                            rows_text: 4,
                            disabled: false,
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
                    ]} get_filters_models={undefined} />
            </Grid>




        </>

    );
};

// eslint-disable-next-line no-restricted-syntax
export default RechazoSolicitud;



