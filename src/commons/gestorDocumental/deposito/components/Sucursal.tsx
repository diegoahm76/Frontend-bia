import { Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect } from 'react';
import { get_sucursales } from '../store/thunks/deposito';


interface IProps {
    control_deposito: any;
    get_values: any;
    open_modal: boolean;
    set_open_modal: any;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const Sucursales = ({ control_deposito, get_values, open_modal, set_open_modal }: IProps) => {
    const dispatch = useAppDispatch();
    const { sucursales } = useAppSelector((state) => state.deposito);
    useEffect(() => {
        void dispatch(get_sucursales());
    }, []);




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
                            title_label: 'Sucursal',
                        },
                        {
                            datum_type: 'select_controller',
                            xs: 12,
                            md: 6,
                            control_form: control_deposito,
                            control_name: 'id_sucursal_empresa',
                            default_value: '',
                            rules: { required_rule: { rule: true, message: 'requerido' } },
                            label: 'Sucursales',
                            disabled: false,
                            helper_text: 'debe seleccionar campo',
                            select_options: sucursales,
                            option_label: 'descripcion_sucursal',
                            option_key: 'id_sucursal_empresa',
                        },
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_deposito,
                            control_name: "activo",
                            default_value: "",
                            rules: {},
                            label: "Estado",
                            disabled: false,
                            helper_text: "",
                            select_options: [{ label: "ACTIVAR", value: "true" }, { label: "DESACTIVAR", value: "false" }],
                            option_label: "label",
                            option_key: "value",
                        },



                    ]}
                    title_table_modal=""
                    modal_form_filters={[]} modal_select_model_title={''} models={[]} columns_model={[]} />
            </Grid>
        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default Sucursales;




