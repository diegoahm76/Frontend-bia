
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect } from 'react';
import { get_sucursales } from '../store/thunks/deposito';
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import FormSelectController from '../../../../components/partials/form/FormSelectController';



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
            <Grid container spacing={2}>
                <Title title="Sucursales" />

                <FormSelectController
                    xs={12}
                    md={8}
                    control_form={control_deposito}
                    control_name={'id_sucursal_entidad'}
                    default_value=''
                    rules={{}}
                    label='Sucursal'
                    disabled={false}
                    helper_text=''
                    select_options={sucursales}
                    option_label='descripcion_sucursal'
                    option_key='id_sucursal_empresa'
                    multiple={false}
                    hidden_text={false}
                    auto_focus={false}
                />
                <FormSelectController
                    xs={12}
                    md={4}
                    control_form={control_deposito}
                    control_name={'activo'}
                    default_value=''
                    rules={{}}
                    label='Estado'
                    disabled={false}
                    helper_text=''
                    select_options={[{ 'label': 'Activo', 'value': true }, { 'label': 'Inactivo', 'value': false }]}
                    option_label='label'
                    option_key='value'
                    multiple={false}
                    hidden_text={false}
                    auto_focus={false}
                />
            </Grid>





        </>
    )
}
// eslint-disable-next-line no-restricted-syntax
export default Sucursales;




