/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import 'react-datepicker/dist/react-datepicker.css';
import { Button, Grid, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import { useNavigate } from 'react-router-dom';
import type { IObjBandeja, IdEstanteDeposito } from '../../interfaces/deposito';
import FormButton from '../../../../../components/partials/form/FormButton';

import { Controller, useForm } from 'react-hook-form';
import { Title } from '../../../../../components/Title';
import { useEffect, useState } from 'react';
// import ListadoBandejas from "../components/bandejasExistentes";
import { initial_state_bandeja } from '../../store/slice/indexDeposito';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { crear_bandeja, editar_bandeja } from '../../store/thunks/deposito';
import FormInputController from '../../../../../components/partials/form/FormInputController';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const AdministrarBandejaScreen = () => {

    const { control: control_bandeja, reset, handleSubmit: handle_submit } = useForm<IObjBandeja>();
    const { control: control_estante } = useForm<IdEstanteDeposito>();
    const [bandeja, set_bandeja] = useState(false);
    const [action, set_action] = useState<string>("Guardar");
    const [selected_bandeja, set_selected_bandeja] = useState<IObjBandeja>(initial_state_bandeja);
    const dispatch = useAppDispatch();
    const { deposito_estante } = useAppSelector((state: { deposito: any; }) => state.deposito);
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_bandeja = () => {
        set_bandeja(true);
    };

    console.log(deposito_estante, 'sssss');
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    // const handle_edit_click = (bandeja: IObjBandeja) => {
    //     set_selected_bandeja(bandeja);
    //     set_action("Editar");
    // };

    useEffect(() => {
        reset(selected_bandeja);
    }, [selected_bandeja]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!deposito_estante?.id_estante_deposito) {
            navigate(
                '/app/gestor_documental/configuracion_datos_basicos/archivo/estantes',
                {
                    replace: true,
                }
            );
        }
    }, []);

    console.log(deposito_estante?.nombre_deposito);
    const on_submit = (data: IObjBandeja): void => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (action === 'Editar' && selected_bandeja) {
            const data_edit = {
                ...selected_bandeja,
                ...data,
            };
            void dispatch(
                editar_bandeja(selected_bandeja.id_estante_deposito, data_edit)
            );
        } else {
            const data_aux = {
                ...data,
            };
            void dispatch(crear_bandeja(data_aux));
        }

        set_selected_bandeja(initial_state_bandeja);
        set_action('Guardar');
    };

    return (
        <Grid
            container
            spacing={2}
            marginTop={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >
            <Grid
                container
                spacing={2}
                marginTop={2}
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Title title="ADMINISTRAR BANDEJAS DE ESTANTES" />

                <Grid item xs={12} sm={6}>
                    <FormInputController
                        xs={11}
                        md={12}
                        margin={2}
                        control_form={control_estante}
                        control_name="persona"
                        default_value={deposito_estante.id_estante_deposito ?? ''}
                        rules={{}}
                        type="text"
                        disabled={true}
                        helper_text=""
                        hidden_text={null}
                        label={''}
                    />
                </Grid>
                <Grid container spacing={2} marginTop={2} justifyContent="flex-end">
                    <Button variant="contained" onClick={handle_bandeja}>
                        Agregar Bandeja
                    </Button>
                </Grid>
            </Grid>
            {bandeja && (
                <Grid
                    container
                    spacing={2}
                    marginTop={2}
                    sx={{
                        position: 'relative',
                        background: '#FAFAFA',
                        borderRadius: '15px',
                        p: '20px',
                        mb: '20px',
                        boxShadow: '0px 3px 6px #042F4A26',
                    }}
                >
                    <Title title="BANDEJAS" />
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="identificacion_por_estante"
                            control={control_bandeja}
                            defaultValue=""
                            // rules={{ required: false }}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    // margin="dense"
                                    fullWidth
                                    label="Identificación"
                                    size="small"
                                    variant="outlined"
                                    value={value}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                        onChange(e.target.value);
                                        // console.log(e.target.value);
                                    }}
                                    error={!(error == null)}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            )}

            <Grid
                container
                spacing={2}
                marginTop={2}
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',

                }}
            >
                <Title title="ADMINISTRAR BANDEJAS DE ESTANTES" />


                <Grid item xs={12} sm={6}>
                    <FormInputController
                        xs={11}
                        md={12}
                        margin={2}
                        control_form={control_estante}
                        control_name=""
                        default_value={deposito_estante.id_estante_deposito ?? ''}
                        rules={{}}
                        type="text"
                        disabled={true}
                        helper_text=""
                        hidden_text={null} label={""} />


                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormInputController
                        xs={11}
                        md={12}
                        margin={2}
                        control_form={control_estante}
                        control_name="persona"
                        default_value={deposito_estante.id_deposito ?? ''}
                        rules={{}}
                        type="text"
                        disabled={true}
                        helper_text=""
                        hidden_text={null} label={""} />


                </Grid>
                <Grid container
                    spacing={2}
                    marginTop={2}
                    justifyContent='flex-end'

                >
                    <Button
                        variant="contained"
                        onClick={handle_bandeja}
                    >
                        Agregar Bandeja
                    </Button>
                </Grid>

            </Grid>
            {bandeja && (
                <Grid
                    container
                    spacing={2}
                    marginTop={2}
                    sx={{
                        position: 'relative',
                        background: '#FAFAFA',
                        borderRadius: '15px',
                        p: '20px',
                        mb: '20px',
                        boxShadow: '0px 3px 6px #042F4A26',

                    }}
                >
                    <Title title="BANDEJAS" />
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="identificacion_por_estante"
                            control={control_bandeja}
                            defaultValue=''
                            // rules={{ required: false }}
                            render={({
                                field: { onChange, value },
                                fieldState: { error }
                            }) => (
                                <TextField
                                    // margin="dense"
                                    fullWidth
                                    label="Identificación"
                                    size="small"
                                    variant="outlined"
                                    value={value}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                        onChange(e.target.value);
                                        // console.log(e.target.value);
                                    }}
                                    error={!(error == null)}

                                />
                            )}
                        />
                    </Grid>


                </Grid>
            )}

            {/* <Grid item xs={12} marginY={1}>

                <ListadoBandejas
                    bandejas={selected_bandeja}
                    get_values={get_values}
                    handle_edit_click={handle_edit_click}
                />
            </Grid> */}

            <Grid item xs={12} md={2}>
                <FormButton
                    variant_button="contained"
                    on_click_function={handle_submit(on_submit)}
                    icon_class={<SaveIcon />}
                    label={action}
                    type_button="button"
                />
            </Grid>

            <Grid item xs={12} md={2}>
                <ButtonSalir />
            </Grid>
        </Grid>
    );

};

// eslint-disable-next-line no-restricted-syntax
export default AdministrarBandejaScreen;
