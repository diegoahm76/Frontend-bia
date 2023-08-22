import { Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';



interface IProps {
    control_deposito: any;
    get_values: any;
    open_modal: boolean;
    set_open_modal: any;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DepositoInfo = ({ control_deposito, get_values, open_modal, set_open_modal }: IProps) => {


    return (
        <>
            <Grid container direction="row" padding={2} borderRadius={2}>
                <BuscarModelo

                    row_id={''}
                    get_filters_models={null}
                    set_models={null}
                    show_search_button={false}
                    open_search_modal={open_modal}
                    set_open_search_modal={set_open_modal}
                    button_submit_label=""
                    form_inputs={[
                        {
                            datum_type: 'title',
                            title_label: 'DEPOSITOS',
                        },
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 6,
                            control_form: control_deposito,
                            control_name: 'nombre_deposito',
                            default_value: '',
                            rules: {},
                            label: 'Nombre del depósito',
                            type: 'number',
                            disabled: false,
                            helper_text: '',
                        },
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 6,
                            control_form: control_deposito,
                            control_name: 'identificacion_por_entidad',
                            default_value: '',
                            rules: {},
                            label: 'Identificación',
                            type: 'text',
                            disabled: false,
                            helper_text: '',
                        },


                    ]}
                    title_table_modal=""
                    modal_form_filters={[]} modal_select_model_title={''} models={[]} columns_model={[]} />


            </Grid>

        </>


    );
};

// eslint-disable-next-line no-restricted-syntax
export default DepositoInfo;




