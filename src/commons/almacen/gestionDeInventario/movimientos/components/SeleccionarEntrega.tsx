

import { Chip, Grid } from '@mui/material';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';

import { useAppDispatch, useAppSelector, } from '../../../../../hooks';
import { get_entregas_disponible, } from '../store/thunks/entregaThunks';
import { set_current_entrega, set_entregas } from '../store/slice/indexEntrega';

// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

interface IProps {
    control_entrega: any;
    get_values: any;
}
// interface IList {
//     value: string | number;
//     label: string | number;
// }

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarEntrega = ({ control_entrega, get_values }: IProps) => {
    // const [action, set_action] = useState<string>("agregar");

    const dispatch = useAppDispatch();

    const { entregas, } = useAppSelector((state) => state.entrega_otros)

    const columns_despacho: GridColDef[] = [
        { field: 'tipo_entrada', headerName: 'Tipo de entrada', width: 250 },
        {
            field: 'fecha_entrada',
            headerName: 'Fecha de entrada',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'observacion',
            headerName: 'Observación',
            width: 200,

        },
        {
            field: 'id_tipo_entrada',
            headerName: 'tipo entrada',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'es_despacho_conservacion',
            headerName: 'Es despacho de conservación',
            width: 350,
            renderCell: (params) => {
                return params.row.es_despacho_conservacion === true ? (
                    <Chip size="small" label="SI" color="success" variant="outlined" />
                ) : (
                    <Chip size="small" label="NO" color="error" variant="outlined" />
                );
            },
        },
    ];

    const get_entregas: any = async () => {
        console.log("buscar...");

        void dispatch(get_entregas_disponible()
        );

    };

    return (
        <>
            <Grid container direction="row" padding={2} borderRadius={2}>
                <BuscarModelo
                    set_current_model={set_current_entrega}
                    row_id={'id_entrada_almacen'}
                    columns_model={columns_despacho}
                    models={entregas}
                    get_filters_models={get_entregas}
                    set_models={set_entregas}
                    button_submit_label="Buscar entregas"
                    form_inputs={[
                        {
                            datum_type: 'title',
                            title_label: 'INFORMACIÓN DE LA ENTREGA',
                        },

                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 3,
                            control_form: control_entrega,
                            control_name: 'numero_despacho_consumo',
                            default_value: '',
                            rules: {},
                            label: 'Número entrega',
                            type: 'number',
                            disabled: true,
                            helper_text: '',
                        },

                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 3,
                            control_form: control_entrega,
                            control_name: 'fecha_despacho',
                            default_value: '',
                            rules: {},
                            label: 'Fecha de Entrega',
                            type: 'text',
                            disabled: true,
                            helper_text: '',
                        },
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 3,
                            control_form: control_entrega,
                            control_name: 'numero_entrada_almacen',
                            default_value: '',
                            rules: {},
                            label: 'Número entrada almacén',
                            type: 'text',
                            disabled: true,
                            helper_text: '',
                        },

                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 3,
                            control_form: control_entrega,
                            control_name: 'tipo_entrada',
                            default_value: '',
                            rules: {},
                            label: 'tipo de entrada',
                            type: 'text',
                            disabled: true,
                            helper_text: '',
                        },



                        // {
                        //     datum_type: 'input_controller',
                        //     xs: 12,
                        //     md: 4,
                        //     control_form: control_entrega,
                        //     control_name: 'persona_crea',
                        //     default_value: '',
                        //     rules: {},
                        //     label: 'Entrega realizada por',
                        //     type: 'text',
                        //     disabled: true,
                        //     helper_text: '',
                        // },




                    ]}
                    modal_select_model_title="Buscar Entregas"
                    modal_form_filters={[

                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_entrega,
                            control_name: "id_tipo_entrada",
                            default_value: "",
                            rules: {},
                            label: "Tipo de entrada",
                            helper_text: "",
                            disabled: false,
                            select_options: [{ label: "Donación", value: "Donación" }, { label: "Resarcimiento", value: 3 }],
                            option_label: "label",
                            option_key: "value"
                        },



                    ]}
                />
            </Grid>
        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarEntrega;


