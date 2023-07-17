import { Grid } from '@mui/material';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';


import { useAppSelector, } from '../../../../../hooks';

import { set_current_entrega, set_entregas } from '../store/slice/indexEntrega';
import { type IEntrega } from '../interfaces/entregas';

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
const Seccion = ({ control_entrega, get_values }: IProps) => {
    // const [action, set_action] = useState<string>("agregar");


    const { entregas, } = useAppSelector((state: { entrega_otros: IEntrega; }) => state.entrega_otros)





    return (
        <>
            <Grid container direction="row" padding={2} borderRadius={2}>
                <BuscarModelo
                    set_current_model={set_current_entrega}
                    row_id={'id_entrada_almacen'}
                    models={entregas}
                    get_filters_models={null}
                    set_models={set_entregas}
                    show_search_button={false}
                    button_submit_label="Buscar entregas"
                    form_inputs={[
                        {
                            datum_type: 'title',
                            title_label: 'ENTREGA DE BIENES DE CONSUMO A VIVERO',
                        },
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 6,
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
                            datum_type: 'date_picker_controller',
                            xs: 12,
                            md: 6,
                            control_form: control_entrega,
                            control_name: 'fecha_despacho',
                            default_value: '',
                            rules: {

                            },
                            label: 'Fecha de despacho',
                            disabled: true,
                            helper_text: '',
                            format: 'YYYY-MM-DD',
                        },
                    ]}
                    modal_select_model_title="Buscar despacho"
                    modal_form_filters={[]} columns_model={[]} />
            </Grid>
        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default Seccion;


