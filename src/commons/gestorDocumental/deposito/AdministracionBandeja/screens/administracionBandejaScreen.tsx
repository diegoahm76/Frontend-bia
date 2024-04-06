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
import { LoadingButton } from '@mui/lab';
import { initial_state_bandeja, } from "../../store/slice/indexDeposito";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { crear_bandeja, editar_bandeja, eliminar_bandeja, get_bandejas_id, mover_bandeja_seleccionada } from "../../store/thunks/deposito";
import DeleteIcon from '@mui/icons-material/Delete';
import FormInputController from "../../../../../components/partials/form/FormInputController";
import FormSelectController from "../../../../../components/partials/form/FormSelectController";
import ListadoBandejas from "../components/bandejasExistentes";
import MoverBandeja from "../components/MoverBandeja";

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const AdministrarBandejaScreen = () => {
    const { control: control_bandeja, reset, handleSubmit: handle_submit,
    } = useForm<IObjBandeja>();
    const { control: control_bandeja_destino, getValues: get_values_bandeja_destino, reset: reset_bandeja_destino, handleSubmit: handle_submit_bendaje_destino } = useForm<IObjBandeja>();
    const { control: control_estante } = useForm<IdEstanteDeposito>();
    const [bandeja, set_bandeja] = useState(false);
    const [mover_bandeja, set_mover_bandeja] = useState(false);
    const [action, set_action] = useState<string>("Guardar");
    const [selected_bandeja, set_selected_bandeja] = useState<IObjBandeja>(
        initial_state_bandeja
    );

    const dispatch = useAppDispatch();
    const { deposito_estante, bandejas } = useAppSelector(
        (state: { deposito: any }) => state.deposito
    );
    const [select_orden, set_select_orden] = useState(false);
    const [open_modal, set_open_modal] = useState(false);

    const handle_orden = () => {
        set_select_orden(true);
    };

    const handle_buscar = () => {
        set_open_modal(true);
    };
    const handle_close_buscar = () => {
        set_open_modal(false);
    };


    const handle_bandeja = () => {
        set_selected_bandeja(initial_state_bandeja)
        set_bandeja(true);
    };

    // habilitar mover bandeja
    const handle_boton_mover_bandeja = () => {
        set_mover_bandeja(true);
    };
    const handle_cerrar_ventana = () => {
        set_mover_bandeja(false);
    };




    // editar desde la tabla
    const handle_edit_click = (bandeja: IObjBandeja) => {
        console.log(bandeja)
        set_selected_bandeja(bandeja);
        set_bandeja(true);
        set_action("Editar");
    };
    // pasar el modal mover bandeja
    const handle_mover_bandeja = (bandeja_mover: IObjBandeja) => {
        set_mover_bandeja(true);
        reset_bandeja_destino(bandeja_mover)
        console.log(get_values_bandeja_destino('id_deposito'))

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
   

    const on_submit_elimnar = (data: IObjBandeja): void => {

        if (
            selected_bandeja.id_bandeja_estante !== null &&
            selected_bandeja.id_bandeja_estante !== undefined
        ) {
            void dispatch(
                eliminar_bandeja(
                    selected_bandeja.id_bandeja_estante)
            );
        }

    }


    const on_submit_mover_bandeja = (data: IObjBandeja): void => {
        console.log(data)
        const data_mover = {
            id_deposito_destino: data.id_deposito,
            id_estante_destino: data.id_estante_deposito


        };

        void dispatch(mover_bandeja_seleccionada(selected_bandeja.id_bandeja_estante, data_mover));

    }





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
                <Button variant="contained"
                    color="success"
                    onClick={handle_bandeja}>
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

                            <Grid container spacing={2} marginTop={2} justifyContent="flex-end">
                                <Button variant="contained"
                                    color="success"
                                    onClick={handle_boton_mover_bandeja}>
                                    Mover Bandeja
                                </Button>
                            </Grid>

                        </>
                    }



                </Grid>
            )}
            {mover_bandeja && (
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
                    <Title title="MOVER BANDEJA A OTRO ESTANTE" />


                    <FormInputController
                        xs={12}
                        md={3}
                        margin={0}
                        control_form={control_bandeja_destino}
                        control_name="nombre_deposito"
                        default_value=''
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={"Deposito de archivo destino"}
                    />
                    <FormInputController
                        xs={12}
                        md={3}
                        margin={0}
                        control_form={control_bandeja_destino}
                        control_name="identificacion_por_deposito"
                        default_value=''
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={"Estante destino"}
                    />

                    <Grid item xs={12} sm={4}>
                        <LoadingButton
                            variant="contained"
                            onClick={handle_buscar}
                            disabled={false}
                        >
                            Buscar
                        </LoadingButton>
                    </Grid>
                    <Grid container spacing={2} marginTop={2} justifyContent="flex-end">
                        <Grid item>
                            <Button variant="outlined"
                                color="success"
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                onClick={handle_submit_bendaje_destino(on_submit_mover_bandeja)}>
                                Aceptar
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined"
                                color="error"
                                onClick={handle_cerrar_ventana}>
                                Descartar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            )}

            {open_modal && (
                <Grid item xs={12} marginY={1}>
                    <MoverBandeja
                        control_bandeja_destino={control_bandeja_destino}
                        open={open_modal}
                        handle_close_buscar={handle_close_buscar}
                        get_values={get_values_bandeja_destino}
                        handle_mover_bandeja={handle_mover_bandeja}

                    />
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
            {selected_bandeja.identificacion_por_estante !== null &&
                <Grid item xs={12} md={2}>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => { on_submit_elimnar(selected_bandeja); }}
                    >
                        Eliminar
                    </Button>
                </Grid>
            }

            <Grid item xs={12} md={2}>
                <ButtonSalir />
            </Grid>
        </Grid>
    );

};

// eslint-disable-next-line no-restricted-syntax
export default AdministrarBandejaScreen;
