/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import "react-datepicker/dist/react-datepicker.css";
import { Button, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { ButtonSalir } from "../../../../../components/Salir/ButtonSalir";
import { useNavigate } from "react-router-dom";
import type { IObjBandeja, IdEstanteDeposito } from "../../interfaces/deposito";
import FormButton from "../../../../../components/partials/form/FormButton";
import { useForm } from "react-hook-form";
import { Title } from "../../../../../components/Title";
import { useEffect, useState } from "react";
import { initial_state_bandeja, } from "../../store/slice/indexDeposito";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { crear_bandeja, editar_bandeja, get_bandejas_id } from "../../store/thunks/deposito";
import FormInputController from "../../../../../components/partials/form/FormInputController";
import FormSelectController from "../../../../../components/partials/form/FormSelectController";
import ListadoBandejas from "../components/bandejasExistentes";

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const AdministrarBandejaScreen = () => {
    const {
        control: control_bandeja,
        reset,
        handleSubmit: handle_submit,
    } = useForm<IObjBandeja>();
    const { control: control_estante } = useForm<IdEstanteDeposito>();
    const [bandeja, set_bandeja] = useState(false);
    const [action, set_action] = useState<string>("Guardar");
    const [selected_bandeja, set_selected_bandeja] = useState<IObjBandeja>(
        initial_state_bandeja
    );
    const [select_orden, set_select_orden] = useState(false);
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_orden = () => {
        set_select_orden(true);
    };
    const dispatch = useAppDispatch();
    const { deposito_estante, bandejas } = useAppSelector(
        (state: { deposito: any }) => state.deposito
    );

    const handle_bandeja = () => {
        set_selected_bandeja(initial_state_bandeja)
        set_bandeja(true);
    };



    const handle_edit_click = (bandeja: IObjBandeja) => {
        set_selected_bandeja(bandeja);
        set_bandeja(true);
        set_action("Editar");
    };

    useEffect(() => {
        console.log(selected_bandeja)
        reset(selected_bandeja);
    }, [selected_bandeja]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!deposito_estante?.id_estante_deposito) {
            navigate(
                "/app/gestor_documental/configuracion_datos_basicos/archivo/estantes",
                {
                    replace: true,
                }
            );
        }
    }, []);


    const on_submit = (data: IObjBandeja): void => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (action === "Editar" && selected_bandeja) {
            const data_edit = {
                ...selected_bandeja,
                ...data,

            };
            console.log(data_edit)
            void dispatch(
                editar_bandeja(selected_bandeja.id_bandeja_estante, data_edit)
            );
        } else {
            const data_aux = {
                ...data,
                id_estante_deposito: deposito_estante.id_estante_deposito

            };
            void dispatch(crear_bandeja(data_aux));
        }

        set_selected_bandeja(initial_state_bandeja);
        set_action("Guardar");
        console.log(deposito_estante)
        void dispatch(get_bandejas_id(deposito_estante.id_estante_deposito))
    };

    return (
        <Grid
            container
            spacing={2}
            marginTop={2}
            sx={{
                position: "relative",
                background: "#FAFAFA",
                borderRadius: "15px",
                p: "20px",
                mb: "20px",
                boxShadow: "0px 3px 6px #042F4A26",
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
                    default_value={deposito_estante.nombre_deposito}
                    rules={{}}
                    type="text"
                    disabled={true}
                    helper_text=""
                    hidden_text={null}
                    label={"Depósito"}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormInputController
                    xs={11}
                    md={12}
                    margin={2}
                    control_form={control_estante}
                    control_name=""
                    default_value={deposito_estante.identificacion_por_deposito}
                    rules={{}}
                    type="text"
                    disabled={true}
                    helper_text=""
                    hidden_text={null}
                    label={"Estante"}
                />
            </Grid>
            <Grid container spacing={2} marginTop={2} justifyContent="flex-end">
                <Button variant="contained" onClick={handle_bandeja}>
                    Agregar Bandeja
                </Button>
            </Grid>

            {bandeja && (
                <Grid
                    container
                    spacing={2}
                    marginTop={2}
                    sx={{
                        position: "relative",
                        background: "#FAFAFA",
                        borderRadius: "15px",
                        p: "20px",
                        mb: "20px",
                        boxShadow: "0px 3px 6px #042F4A26",
                    }}
                >
                    <Title title="BANDEJA" />


                    <FormInputController
                        xs={12}
                        md={3}
                        margin={0}
                        control_form={control_bandeja}
                        control_name="identificacion_por_estante"
                        default_value=''
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={"Identificación"}
                    />
                    <FormInputController
                        xs={12}
                        md={2}
                        margin={0}
                        control_form={control_bandeja}
                        control_name="orden_ubicacion_por_estante"
                        default_value=''
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={"Órden"}
                    />

                    {selected_bandeja.id_bandeja_estante !== null &&
                        <>

                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="contained"
                                    onClick={handle_orden}
                                    disabled={false}
                                >
                                    Cambiar órden
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormSelectController
                                    xs={12}
                                    md={4}
                                    control_form={control_bandeja}
                                    control_name={'orden_ubicacion_por_estante'}
                                    default_value=''
                                    rules={{}}
                                    label='Nuevo órden'
                                    disabled={!select_orden}
                                    helper_text=''
                                    select_options={bandejas}
                                    option_label='orden_ubicacion_por_estante'
                                    option_key='orden_ubicacion_por_estante'
                                    multiple={false}
                                    hidden_text={false}
                                    auto_focus={false}
                                />
                            </Grid>

                        </>
                    }



                </Grid>
            )}

            <Grid item xs={12} marginY={1}>
                <ListadoBandejas

                    handle_edit_click={handle_edit_click}
                />
            </Grid>
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
