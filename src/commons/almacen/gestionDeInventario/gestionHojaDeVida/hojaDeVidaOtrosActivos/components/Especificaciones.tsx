import { Grid, } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';

import { set_current_others, set_others } from '../store/slices/indexCvOtrosActivos';
import { get_others_all_service } from '../store/thunks/cvOtrosActivosThunks';



interface IProps {
    title: string;
    control_other: any;
    get_values: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const EspecificacionesOtros = ({
    title,
    control_other,
    get_values
}: IProps) => {


    const { others, } = useAppSelector((state) => state.cvo);
    const dispatch = useAppDispatch();
    const columns_solicitudes: GridColDef[] = [


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
    const filter_other: any = (async () => {
        const cv_computer = get_values("id_bien")
        if (cv_computer !== null) {
            void dispatch(get_others_all_service())
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
                    set_current_model={set_current_others}
                    row_id={"id_bien"}
                    columns_model={columns_solicitudes}
                    models={others}
                    set_models={set_others}
                    show_search_button={false}
                    form_inputs={[
                        {
                            datum_type: "title",
                            title_label: title ?? "hh"
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 12,
                            control_form: control_other,
                            control_name: "caracteristicas_fisicas",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Especificaciones técnicas",
                            multiline_text: true,
                            rows_text: 4,
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },

                    ]}
                    modal_select_model_title='Buscar Computadores'
                    modal_form_filters={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_other,
                            control_name: "codigo_bien",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Código",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                        }
                    ]} get_filters_models={filter_other} />
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default EspecificacionesOtros;
