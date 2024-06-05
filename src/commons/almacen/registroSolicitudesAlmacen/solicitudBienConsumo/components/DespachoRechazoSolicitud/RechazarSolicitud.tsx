/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid } from '@mui/material';
import { useAppSelector } from '../../../../../../hooks';
import { set_current_solicitud, set_solicitudes } from '../../store/slices/indexSolicitudBienesConsumo';
import BuscarModelo from '../../../../../../components/partials/getModels/BuscarModelo';
import { type IList } from '../../../../../../interfaces/globalModels';
import dayjs, { Dayjs } from 'dayjs';

interface IProps {
    title: string;
    control_solicitud_despacho: any;
    reset_solicitud_aprobacion: any;
    get_values: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const RechazoSolicitud = ({
    title,
    control_solicitud_despacho,
    reset_solicitud_aprobacion,
    get_values,
}: IProps) => {

    const clear_fields = () => {
        reset_solicitud_aprobacion();
    }

    // const dispatch = useAppDispatch();

    const { solicitudes } = useAppSelector((state) => state.solic_consumo);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const initial_options: IList[] = [
        {
            label: '',
            value: '',
        },
    ];

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
                    models={solicitudes}
                    set_models={set_solicitudes}
                    show_search_button={false}
                    form_inputs={[
                        {
                            datum_type: "title",
                            title_label: title ?? "hh"
                        },


                        {
                            datum_type: 'date_picker_controller',
                            xs: 12,
                            md: 12,
                            control_form: control_solicitud_despacho,
                            control_name: 'fecha_rechazo_almacen',
                            default_value: dayjs().format('YYYY-MM-DD'),
                            rules: {},
                            label: 'Fecha de entrega',
                            disabled: true,
                            helper_text: '',
                            format: 'YYYY-MM-DD',
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
                    modal_select_model_title='Buscar solicitud jeja'
                    modal_form_filters={[
                        // {
                        //     datum_type: "input_controller",
                        //     xs: 12,
                        //     md: 2,
                        //     control_form: control_solicitud_despacho,
                        //     control_name: "id_solicitud_consumibles",
                        //     default_value: "",
                        //     rules: { required_rule: { rule: false, message: "requerido" } },
                        //     label: "Número de solicitud",
                        //     type: "number",
                        //     disabled: false,
                        //     helper_text: "",
                        // }
                    ]} get_filters_models={undefined} columns_model={[]} clear_fields={clear_fields}/>
            </Grid>




        </>

    );
};

// eslint-disable-next-line no-restricted-syntax
export default RechazoSolicitud;



