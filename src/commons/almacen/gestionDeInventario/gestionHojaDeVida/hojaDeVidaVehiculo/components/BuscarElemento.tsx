import { Grid, } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { get_vehicles_all_service } from '../store/thunks/cvVehiclesThunks';
import { set_current_vehicles, set_vehicles } from '../store/slices/indexCvVehiculo';


interface IProps {
    control_vehicle: any;
    get_values: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarVehiculo = ({
    control_vehicle,
    get_values
}: IProps) => {


    const { vehicles } = useAppSelector((state) => state.cve);
    const dispatch = useAppDispatch();

    const columns_solicitudes: GridColDef[] = [
        // { field: 'id_bien', headerName: 'ID', width: 200 },

        {
            field: 'codigo_bien',
            headerName: 'Código',
            width: 200,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 200,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },
        {
            field: 'cod_tipo_activo',
            headerName: 'Tipo de bien',
            width: 200,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },

    ];
    const filter_vehicle: any = (async () => {
        const cv_vehicle = get_values("id_bien")
        if (cv_vehicle !== null) {
            void dispatch(get_vehicles_all_service())
        }
    })


    const search_vehicle: any = (async () => {
        const cv_vehicle = get_values("id_bien")
        if (cv_vehicle !== null) {
            void dispatch(get_vehicles_all_service())
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
                    set_current_model={set_current_vehicles}
                    row_id={"id_bien"}
                    columns_model={columns_solicitudes}
                    models={vehicles}
                    set_models={set_vehicles}
                    button_submit_label='Buscar Vehículos'
                    form_inputs={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "id_bien",
                            default_value: "",
                            rules: {},
                            label: "ID",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                            on_blur_function: search_vehicle
                        },

                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "nombre",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Nombre",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                    ]}
                    modal_select_model_title='Buscar Vehículos'
                    modal_form_filters={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_vehicle,
                            control_name: "codigo_bien",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Código",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                        }
                    ]} get_filters_models={filter_vehicle} />
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarVehiculo;
