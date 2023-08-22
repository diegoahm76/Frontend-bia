import { useEffect, useState } from 'react';

import { Button, Grid, TextField } from '@mui/material';

import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
// import { useAppDispatch, } from '../../../../hooks';

import { api } from '../../../../api/axios';
import type { IList } from '../../../../interfaces/globalModels';
import { DialogGeneradorDeDirecciones } from '../../../../components/DialogGeneradorDeDirecciones';
interface IProps {
    control_deposito: any;


}


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SucursalDirecciones = ({ control_deposito, }: IProps) => {


    const [municipalities, set_municipalities] = useState<IList[]>([]);
    const [paises, set_paises] = useState<IList[]>([]);
    const [departamento, set_departamento] = useState<IList[]>([]);
    const [modal, set_modal] = useState(false);
    const [direccion, set_direccion] = useState('');
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_close = () => { set_modal(false) }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_open = () => { set_modal(true) }

    // const dispatch = useAppDispatch();
    const get_direccion_modal = (value: string): void => {
        set_direccion(value);
    };
    const text_choise_adapter: any = (dataArray: string[]) => {
        const data_new_format: IList[] = dataArray.map((dataOld) => ({
            label: dataOld[1],
            value: dataOld[0],
        }));
        return data_new_format;
    };

    useEffect(() => {
        const get_selects_options: any = async () => {
            try {
                const { data: municipalities_no_format } = await api.get(
                    'choices/municipios/'
                );

                const municipalities_format: IList[] = text_choise_adapter(
                    municipalities_no_format
                );

                set_municipalities(municipalities_format);
            } catch (err) {
                console.log(err);
            }
        };

        void get_selects_options();
    }, []);
    useEffect(() => {
        const get_selects_options: any = async () => {
            try {
                const { data: paises_no_format } = await api.get(
                    'choices/paises/'
                );

                const paises_format: IList[] = text_choise_adapter(
                    paises_no_format
                );

                set_paises(paises_format);
            } catch (err) {
                console.log(err);
            }
        };

        void get_selects_options();
    }, []);

    useEffect(() => {
        const get_selects_options: any = async () => {
            try {
                const { data: departamento_no_format } = await api.get(
                    'choices/departamentos/'
                );

                const departamento_format: IList[] = text_choise_adapter(
                    departamento_no_format
                );

                set_departamento(departamento_format);
            } catch (err) {
                console.log(err);
            }
        };

        void get_selects_options();
    }, []);




    return (
        <>
            <Grid container direction="row" padding={2} borderRadius={2}
                border={1} borderColor="lightgray" marginTop={2}>
                <BuscarModelo
                    set_current_model={undefined}
                    row_id={'id_bodega'}
                    border_show={false}
                    get_filters_models={null}
                    show_search_button={false}
                    form_inputs={[
                        {
                            datum_type: 'title',
                            title_label: 'DIRECCIÓN',
                        },

                        {
                            datum_type: 'select_controller',
                            xs: 12,
                            md: 6,
                            control_form: control_deposito,
                            control_name: 'cod_municipio',
                            default_value: '',
                            rules: { required_rule: { rule: true, message: 'requerido' } },
                            label: 'País',
                            disabled: false,
                            helper_text: 'debe seleccionar campo',
                            select_options: paises,
                            option_label: 'label',
                            option_key: 'value',
                        },

                        {
                            datum_type: 'select_controller',
                            xs: 12,
                            md: 6,
                            control_form: control_deposito,
                            control_name: 'cod_municipio',
                            default_value: '',
                            rules: { required_rule: { rule: true, message: 'requerido' } },
                            label: 'Departamento',
                            disabled: false,
                            helper_text: 'debe seleccionar campo',
                            select_options: departamento,
                            option_label: 'label',
                            option_key: 'value',
                        },

                        {
                            datum_type: 'select_controller',
                            xs: 12,
                            md: 6,
                            control_form: control_deposito,
                            control_name: 'cod_municipio',
                            default_value: '',
                            rules: { required_rule: { rule: true, message: 'requerido' } },
                            label: 'Municipio',
                            disabled: false,
                            helper_text: 'debe seleccionar campo',
                            select_options: municipalities,
                            option_label: 'label',
                            option_key: 'value',
                        },
                    ]} modal_select_model_title="Buscar bodega" modal_form_filters={[
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 2,
                            control_form: control_deposito,
                            control_name: 'id_bodega',
                            default_value: '',
                            rules: {},
                            label: 'Número de bodega',
                            type: 'number',
                            disabled: false,
                            helper_text: '',
                        },
                    ]} set_models={undefined} models={[]} columns_model={[]}
                />

                <DialogGeneradorDeDirecciones
                    open={modal}
                    openDialog={handle_close}
                    onChange={get_direccion_modal}
                    type={'direccion'} />

                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        required
                        size="small"
                        label="Dirección"
                        disabled
                        fullWidth
                        value={direccion}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        variant="contained"
                        onClick={handle_open}
                    >
                        Generar Dirección
                    </Button>
                </Grid>
            </Grid>

        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default SucursalDirecciones;
