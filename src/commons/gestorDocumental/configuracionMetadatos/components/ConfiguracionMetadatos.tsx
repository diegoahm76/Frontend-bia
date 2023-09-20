import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import { Title } from '../../../../components/Title';
import FormInputController from '../../../../components/partials/form/FormInputController';
import AddIcon from '@mui/icons-material/Add';
import type { IMetadatos, } from '../interfaces/Metadatos';
import { Controller, useForm } from 'react-hook-form';
import FormSelectController from '../../../../components/partials/form/FormSelectController';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { api } from '../../../../api/axios';
import InfoIcon from '@mui/icons-material/Info';
import { IList } from '../../../../interfaces/globalModels';
import { crear_metadato, get_valores_metadato } from '../store/thunks/metadatos';





// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ConfiguracionMetadatos = () => {
    const { control: control_metadatos, reset, handleSubmit: handle_submit, watch } = useForm<IMetadatos>();
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const { valores_metadatos } = useAppSelector((state) => state.metadatos);
    const [tipos_datos, set_tipos_datos] = useState<IList[]>([]);
    const [agregar_valor, set_agregar_valor] = useState(false);
    const dispatch = useAppDispatch();
    const text_choise_adapter: any = (dataArray: string[]) => {
        const data_new_format: IList[] = dataArray.map((dataOld) => ({
            label: dataOld[1],
            value: dataOld[0],
        }));
        return data_new_format;
    };
    const selected_tipo_dato = watch('cod_tipo_dato_alojar');

    useEffect(() => {
        const get_selects_options: any = async () => {
            try {
                const { data: tipos_datos_no_format } = await api.get(
                    'gestor/choices/tipo-dato-alojar/'
                );

                const tipos_datos_format: IList[] = text_choise_adapter(
                    tipos_datos_no_format
                );

                set_tipos_datos(tipos_datos_format);
            } catch (err) {
                console.log(err);
            }
        };

        void get_selects_options();
        void dispatch(get_valores_metadato())
    }, []);

    const handle_valor = () => {
        set_agregar_valor(true)
    }


    const on_submit = (data: IMetadatos): void => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions


        const data_aux = {
            ...data,
            longitud_dato_alojar: data.longitud_dato_alojar ? Number(data.longitud_dato_alojar) : undefined,
            valor_minimo: data.valor_minimo ? Number(data.valor_minimo) : undefined,
            valor_maximo: data.valor_maximo ? Number(data.valor_maximo) : undefined,
            orden_aparicion: data.orden_aparicion ? Number(data.orden_aparicion) : undefined,
        };


        void dispatch(crear_metadato(data_aux))


    }



    return (
        <>
            <Grid container spacing={2}>
                <Title title=" Configuración de Metadatos" />

                <FormInputController
                    xs={12}
                    md={6}
                    margin={0}
                    control_form={control_metadatos}
                    control_name="nombre_metadato"
                    default_value=''
                    rules={{}}
                    type="text"
                    disabled={false}
                    helper_text=""
                    hidden_text={null}
                    label={"Nombre"}
                />


                <FormInputController
                    xs={12}
                    md={6}
                    margin={0}
                    control_form={control_metadatos}
                    control_name="nombre_a_mostrar"
                    default_value=''
                    rules={{}}
                    type="text"
                    disabled={false}
                    helper_text=""
                    hidden_text={null}
                    label={"Nombre para mostrar al usuario"}
                />


                <FormInputController
                    xs={12}
                    md={12}
                    margin={0}
                    control_form={control_metadatos}
                    control_name="descripcion"
                    default_value=''
                    rules={{}}
                    type="text"
                    multiline_text={true}
                    rows_text={3}
                    disabled={false}
                    helper_text=""
                    hidden_text={null}
                    label={"Descripción"}
                />

                <FormSelectController
                    xs={12}
                    md={2}
                    control_form={control_metadatos}
                    control_name={'cod_tipo_dato_alojar'}
                    default_value={0}
                    rules={{}}
                    label='Tipo de dato'
                    disabled={false}
                    helper_text=''
                    select_options={tipos_datos}
                    option_label='label'
                    option_key='value'
                    multiple={false}
                    hidden_text={false}
                    auto_focus={false}
                />
                <FormInputController
                    xs={12}
                    md={2}
                    margin={0}
                    control_form={control_metadatos}
                    control_name="longitud_dato_alojar"
                    default_value=''
                    rules={{}}
                    type='number'
                    disabled={false}
                    hidden_text={null}
                    label={"Longitud de dato"}
                    helper_text={''} />




                <FormInputController
                    xs={12}
                    md={2}
                    margin={0}
                    control_form={control_metadatos}
                    control_name="valor_minimo"
                    default_value=''
                    rules={{}}
                    type='number'
                    disabled={selected_tipo_dato === 'Tx' || selected_tipo_dato === 'Fe'}
                    hidden_text={null}
                    label={"Valor minimo"}
                    helper_text={''} />


                <FormInputController
                    xs={12}
                    md={2}
                    margin={0}
                    control_form={control_metadatos}
                    control_name="valor_maximo"
                    default_value=''
                    rules={{}}
                    type='number'
                    disabled={selected_tipo_dato === 'Tx' || selected_tipo_dato === 'Fe'}
                    helper_text=""
                    hidden_text={null}
                    label={"Valor máximo"}
                />

                <FormInputController
                    xs={12}
                    md={2}
                    margin={0}
                    control_form={control_metadatos}
                    control_name="orden_aparicion"
                    default_value=''
                    rules={{}}
                    type='number'
                    disabled={false}
                    hidden_text={null}
                    label={"Órden de aparición"}
                    helper_text={''}
                />




            </Grid>

            <Grid container spacing={2} alignItems="center">

                <Grid item xs={12} sm={2} marginTop={2}>
                    <Controller
                        name="esObligatorio"
                        control={control_metadatos}
                        defaultValue={true}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                select
                                size="small"
                                label="¿Es Obligatorio?"
                                variant="outlined"
                                disabled={false}
                                defaultValue={value}
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}
                            >
                                <MenuItem value="true">SI</MenuItem>
                                <MenuItem value="false">NO</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={2} marginTop={2}>
                    <Controller
                        name="aplica_para_documento"
                        control={control_metadatos}
                        defaultValue={true}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                select
                                size="small"
                                label="¿Aplica para documento?"
                                variant="outlined"
                                disabled={false}
                                defaultValue={value}
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}
                            >
                                <MenuItem value="true">SI</MenuItem>
                                <MenuItem value="false">NO</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={2} marginTop={2}>
                    <Controller
                        name="aplica_para_expediente"
                        control={control_metadatos}
                        defaultValue={true}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                select
                                size="small"
                                label="¿Aplica para expediente?"
                                variant="outlined"
                                disabled={false}
                                defaultValue={value}
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}
                            >
                                <MenuItem value="true">SI</MenuItem>
                                <MenuItem value="false">NO</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>


                <Grid item xs={12} sm={2} marginTop={2} spacing={4}>
                    <InputLabel htmlFor="activo" >Estado</InputLabel>
                    <Controller
                        name="activo"
                        control={control_metadatos}
                        // defaultValue=""
                        // rules={{ required: false }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={value}
                                            onChange={(e) => {
                                                onChange(e.target.checked);
                                            }}
                                            // name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        value ? (
                                            <Typography variant="body2">
                                                <strong>Activar</strong>
                                                <Tooltip title="Activar" placement="right">
                                                    <InfoIcon
                                                        sx={{
                                                            width: '1.2rem',
                                                            height: '1.2rem',
                                                            ml: '0.5rem',
                                                            color: 'green',
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Typography>
                                        ) : (
                                            <Typography variant="body2">
                                                <strong>Desactivar</strong>
                                                <Tooltip title="Desactivar" placement="right">
                                                    <InfoIcon
                                                        sx={{
                                                            width: '1.2rem',
                                                            height: '1.2rem',
                                                            ml: '0.5rem',
                                                            color: 'orange',
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Typography>
                                        )
                                    }
                                />
                            </FormControl>
                        )}
                    />
                </Grid>



            </Grid>
            <Grid container spacing={2} alignItems="center">

                <Grid item xs={12} sm={4} marginTop={2}>
                    <Button variant="contained"
                        startIcon={<AddIcon />}
                        color="success"
                        onClick={handle_valor}>
                        Añadir lista de Valores
                    </Button>
                </Grid>
            </Grid>
            {agregar_valor && (
                <Grid container spacing={2} marginTop={2}>


                    <FormSelectController
                        xs={12}
                        md={2}
                        control_form={control_metadatos}
                        control_name={'valor_a_mostrar'}
                        default_value=''
                        rules={{}}
                        label='Valor'
                        disabled={false}
                        helper_text=''
                        select_options={valores_metadatos}
                        multiple={false}
                        hidden_text={false}
                        auto_focus={false}
                        option_key={''} option_label={''} />

                </Grid>
            )}

            <Grid
                container
                direction="row"
                padding={2}
                spacing={2}
            >
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button variant="contained"
                            color="success"
                            onClick={handle_submit(on_submit)}>
                            Guardar
                        </Button>
                    </Grid>
                </Grid>

            </Grid>


        </>


    );
};

// eslint-disable-next-line no-restricted-syntax
export default ConfiguracionMetadatos;
