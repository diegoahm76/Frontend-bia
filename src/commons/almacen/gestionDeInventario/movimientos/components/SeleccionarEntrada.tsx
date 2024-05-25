import { Grid } from '@mui/material';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector, } from '../../../../../hooks';
import { get_entradas_disponible, } from '../store/thunks/entregaThunks';
import { set_current_entrada, set_entradas, } from '../store/slice/indexEntrega';

interface IProps {
    control_entrada_entrega: any;
    get_values: any;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarEntrada = ({ control_entrada_entrega, get_values }: IProps) => {

    const dispatch = useAppDispatch();

    const { entradas } = useAppSelector((state) => state.entrega_otros)

    const columns_entrada: GridColDef[] = [
        { field: 'numero_entrada_almacen', headerName: 'Número de entrada', width: 250 },
        { field: 'tipo_entrada', headerName: 'Tipo de entrada', width: 250 },

        {
            field: 'fecha_entrada',
            headerName: 'Fecha de entrada',
            width: 250,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },

        {
            field: 'observacion',
            headerName: 'Observación',
            width: 350,

        },

    ];

    const get_entradas: any = async () => {
        //  console.log('')("buscar...");
        const numero_entrada = get_values('numero_entrada_almacen') ?? '';
        const id_tipo_entrada = get_values('id_tipo_entrada') ?? '';
        void dispatch(get_entradas_disponible(numero_entrada, id_tipo_entrada));

    };

    return (
        <>
            <Grid container direction="row" padding={2} borderRadius={2}>
                <BuscarModelo
                    set_current_model={set_current_entrada}
                    row_id={'id_entrada_almacen'}
                    columns_model={columns_entrada}
                    models={entradas}
                    get_filters_models={get_entradas}
                    set_models={set_entradas}
                    title_table_modal={'Resultados de la búsqueda'}
                    button_submit_label="Buscar entradas"
                    form_inputs={[
                        {
                            datum_type: 'title',
                            title_label: 'Información de entrada',
                        },
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 4,
                            control_form: control_entrada_entrega,
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
                            md: 5,
                            control_form: control_entrada_entrega,
                            control_name: 'tipo_entrada',
                            default_value: '',
                            rules: {},
                            label: 'Tipo de entrada',
                            type: 'text',
                            disabled: true,
                            helper_text: '',

                        },

                    ]}
                    modal_select_model_title="Buscar Entradas"
                    modal_form_filters={[

                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_entrada_entrega,
                            control_name: "id_tipo_entrada",
                            default_value: "",
                            rules: {},
                            label: "Tipo de entrada",
                            helper_text: "",
                            disabled: false,
                            select_options: [{ label: "Donación", value: 2 }, { label: "Resarcimiento", value: 3 }, { label: "Compensación", value: 4 }],
                            option_label: "label",
                            option_key: "value"
                        },

                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 2,
                            control_form: control_entrada_entrega,
                            control_name: 'numero_entrada_almacen',
                            default_value: '',
                            rules: {},
                            label: 'Número de entrada de almacén',
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
export default SeleccionarEntrada;


