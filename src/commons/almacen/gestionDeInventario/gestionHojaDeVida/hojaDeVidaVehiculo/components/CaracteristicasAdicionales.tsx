import { Grid, } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { useAppSelector } from '../../../../../../hooks';
import { set_current_vehicles, set_vehicles } from '../store/slices/indexCvVehiculo';


interface IProps {

    control_vehicle: any;
    get_values: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const EspecificacionAdicional = ({

    control_vehicle,
    get_values
}: IProps) => {


    const { vehicles, } = useAppSelector((state) => state.cve);




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
                    models={vehicles}
                    set_models={set_vehicles}
                    show_search_button={false}
                    form_inputs={[
                        {
                            datum_type: "title",
                            title_label: "Especificaciones adicionales"
                        },

                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "color",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Color",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },

                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "tiene_platon",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Tiene platón",
                            disabled: false,
                            helper_text: "",
                            select_options: [{ label: "SI", value: "true" }, { label: "NO", value: "false" },],
                            option_label: "label",
                            option_key: "value",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "capacidad_pasajeros",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Capacidad de pasajeros",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "linea",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Linea",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "tipo_combustible",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Tipo de combustible",
                            disabled: false,
                            helper_text: "",
                            select_options: [{ label: "Gasolina", value: "GAS" }, { label: "Diesel", value: "DIE" }, { label: "Gas Natural Vehicular", value: "GNV" }, { label: "Eléctrico", value: "ELE" }],
                            option_label: "label",
                            option_key: "value",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "numero_motor",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Número de motor",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "numero_chasis",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Número de chasis",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "cilindraje",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Cilindraje",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "transmision",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Transmición",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "dimension_llantas",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Dimensión de las llantas",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "capacidad_extintor",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Capacidad de extintor",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "tarjeta_operacion",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Tarjeta de operación",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 12,
                            control_form: control_vehicle,
                            control_name: "observaciones_adicionales",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Observaciónes adicionales",
                            type: "text",
                            multiline_text: true,
                            rows_text: 4,
                            disabled: false,
                            helper_text: ""
                        },









                    ]}
                    modal_select_model_title='Buscar Computadores'
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
                    ]} get_filters_models={[]} columns_model={[]} />
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default EspecificacionAdicional;
