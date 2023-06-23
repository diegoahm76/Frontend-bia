import { Grid, } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { get_computers_all_service } from '../store/thunks/cvComputoThunks';
import { set_computers, set_current_computer } from '../store/slices/indexCvComputo';



interface IProps {
    title: string;
    control_computo: any;
    get_values: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const Especificaciones = ({
    title,
    control_computo,
    get_values
}: IProps) => {


    const { computers, marcas } = useAppSelector((state) => state.cv);



    const dispatch = useAppDispatch();

    const columns_solicitudes: GridColDef[] = [
        { field: 'id_bien', headerName: 'ID', width: 200 },

        {
            field: 'codigo_bien',
            headerName: 'Código',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },
        {
            field: 'cod_tipo_activo',
            headerName: 'Tipo de bien',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },

    ];
    const filter_computer: any = (async () => {
        const cv_computer = get_values("id_bien")
        if (cv_computer !== null) {
            void dispatch(get_computers_all_service())
        }
    })


    const search_computer: any = (async () => {
        const cv_computer = get_values("id_bien")
        if (cv_computer !== null) {
            void dispatch(get_computers_all_service())
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
                    set_current_model={set_current_computer}
                    row_id={"id_bien"}
                    columns_model={columns_solicitudes}
                    models={computers}
                    set_models={set_computers}
                    show_search_button={false}
                    form_inputs={[
                        {
                            datum_type: "title",
                            title_label: title ?? "hh"
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_computo,
                            control_name: "codigo_bien",
                            default_value: "",
                            rules: {},
                            label: "Codigo bien",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                            on_blur_function: search_computer
                        },
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_computo,
                            control_name: "id_marca",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Marcas",
                            disabled: false,
                            helper_text: "debe seleccionar campo",
                            select_options: marcas,
                            option_label: "nombre",
                            option_key: "id_marca"
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_computo,
                            control_name: "doc_identificador_nro",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Serie",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },

                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_computo,
                            control_name: "estado",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Estado del equipo",
                            disabled: false,
                            helper_text: "debe seleccionar campo",
                            select_options: [{ label: "Óptimo", value: "O" }, { label: "Defectuoso", value: "D" }, { label: "Averiado", value: "A" }],
                            option_label: "label",
                            option_key: "label",

                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_computo,
                            control_name: "color",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Color",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_computo,
                            control_name: "tipo_de_equipo",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Tipo de equipo",
                            type: "text",
                            disabled: true,
                            helper_text: "Portatil, Tablet, All-in-on"
                        },
                    ]}
                    modal_select_model_title='Buscar Computadores'
                    modal_form_filters={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_computo,
                            control_name: "codigo_bien",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Código",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                        }
                    ]} get_filters_models={filter_computer} />
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default Especificaciones;
