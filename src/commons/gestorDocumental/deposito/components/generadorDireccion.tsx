import { useEffect, useState } from 'react';

// import { useAppDispatch, } from '../../../../hooks';
import { api } from '../../../../api/axios';
import type { IList } from '../../../../interfaces/globalModels';
import { Title } from '../../../../components/Title';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
import FormSelectController from '../../../../components/partials/form/FormSelectController';
interface IProps {
    control_deposito: any;


}


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SucursalDirecciones = ({ control_deposito, }: IProps) => {


    const [municipalities, set_municipalities] = useState<IList[]>([]);
    const [paises, set_paises] = useState<IList[]>([]);
    const [departamento, set_departamento] = useState<IList[]>([]);


    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type


    // const dispatch = useAppDispatch();

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
                //  console.log('')(err);
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
                //  console.log('')(paises_format)

                set_paises(paises_format);
            } catch (err) {
                //  console.log('')(err);
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
                //  console.log('')(err);
            }
        };

        void get_selects_options();
    }, []);




    return (
        <>
            <Grid container spacing={2}>
                <Title title={"Dirección"}></Title>
                <FormSelectController
                    xs={12}
                    md={4}
                    control_form={control_deposito}
                    control_name='cod_pais_exterior'
                    default_value=''
                    rules={{}}
                    label='Pais'
                    disabled={false}
                    helper_text=''
                    select_options={paises}
                    option_label='label'
                    option_key='value'
                    multiple={false}
                    hidden_text={false}
                    auto_focus={false}
                />


                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Departamento</InputLabel>
                        <Controller
                            name="cod_departamento_nal" // Nombre del campo en tu formulario
                            control={control_deposito}
                            render={({ field }) => (
                                <Select {...field}
                                    style={{ height: '40px' }}>
                                    {departamento.map((depto) => (
                                        <MenuItem key={depto.value} value={depto.value}>
                                            {depto.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>
                </Grid>
                <FormSelectController
                    xs={12}
                    md={4}
                    control_form={control_deposito}
                    control_name='cod_municipio_nal'
                    default_value=''
                    rules={{}}
                    label='Municipio'
                    disabled={false}
                    helper_text=''
                    select_options={municipalities}
                    option_label='label'
                    option_key='value'
                    multiple={false}
                    hidden_text={false}
                    auto_focus={false}
                />




            </Grid>

        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default SucursalDirecciones;
