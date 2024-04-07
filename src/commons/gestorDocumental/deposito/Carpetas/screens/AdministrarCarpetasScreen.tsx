/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import "react-datepicker/dist/react-datepicker.css";
import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { ButtonSalir } from "../../../../../components/Salir/ButtonSalir";
import CloseIcon from '@mui/icons-material/Close';
import { IObjRotuloCarpeta, type IObjCarpeta, } from "../../interfaces/deposito";
import FormButton from "../../../../../components/partials/form/FormButton";
import { useForm } from "react-hook-form";
import { Title } from "../../../../../components/Title";
import { useEffect, useState } from "react";
import { LoadingButton } from '@mui/lab';
import { initial_state_bandeja, initial_state_carpeta, } from "../../store/slice/indexDeposito";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import FormInputController from "../../../../../components/partials/form/FormInputController";
import FormSelectController from "../../../../../components/partials/form/FormSelectController";
import type { IBuscarCaja } from "../../Cajas/types/types";
import { editar_carpeta, crear_carpeta, eliminar_carpeta, get_carpeta_id, mover_carpeta_seleccionada, get_rotulo_carpeta } from "../../store/thunks/deposito";
import ListadoCarpetas from "../components/CarpetasExistentes";
import MoverCarpeta from "../components/MoverCarpeta";
import DeleteIcon from '@mui/icons-material/Delete';
import Rotulo from "../components/Rotulo";

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const AdministrarCarpetasScreen = () => {
    const { control: control_carpeta, reset,
        handleSubmit: handle_submit } = useForm<IObjCarpeta>();

    const { control: control_carpeta_destino, reset: reset_carpeta_destino,
        getValues: get_values_carpeta_destino, handleSubmit: handle_submit_carpeta_destino } = useForm<IObjCarpeta>();

    const { control: control_rotulo } = useForm<IObjRotuloCarpeta>();
    const { control: control_caja } = useForm<IBuscarCaja>();
    const [carpeta, set_carpeta] = useState(false);
    const [mover_carpeta, set_mover_carpeta] = useState(false);
    const [action, set_action] = useState<string>("Guardar");
    const [selected_carpeta, set_selected_carpeta] = useState<IObjCarpeta>(
        initial_state_carpeta
    );


    const dispatch = useAppDispatch();
    const { cajas, carpetas,  } = useAppSelector(
        (state: { deposito: any }) => state.deposito
    );
    const [select_orden, set_select_orden] = useState(false);
    const [open_modal, set_open_modal] = useState(false);
    const [open_modal_rotulo, set_open_modal_rotulo] = useState(false);
    const handle_orden = () => {
        set_select_orden(true);
    };

    const handle_buscar = () => {
        set_open_modal(true);
    };

    const handle_rotulo = () => {
        set_open_modal_rotulo(true);
    };
    const handle_rotulo_cerrar = () => {
        set_open_modal_rotulo(false);
    };

    const handle_close_buscar = () => {
        set_open_modal(false);
    };


    const handle_carpeta = () => {
        set_selected_carpeta(initial_state_bandeja)
        set_carpeta(true);
    };

    // habilitar mover carpeta
    const handle_boton_mover_carpeta = () => {
        set_mover_carpeta(true);
    };
    const handle_cerrar_ventana = () => {
        set_mover_carpeta(false);
    };




    // editar desde la tabla
    const handle_edit_click = (carpeta: IObjCarpeta) => {
        set_selected_carpeta(carpeta);
        set_carpeta(true);
        set_action("Editar");
    };
    // pasar el modal mover carpeta
    const handle_mover_carpeta = (carpeta_mover: IObjCarpeta) => {
        set_mover_carpeta(true);
        reset_carpeta_destino(carpeta_mover)
        console.log(carpeta_mover)

    };


    useEffect(() => {
        console.log(selected_carpeta)
        reset(selected_carpeta);
        console.log(cajas)
    }, [selected_carpeta]);

    const on_submit = (data: IObjCarpeta): void => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (action === "Editar" && selected_carpeta) {
            const data_edit = {
                ...selected_carpeta,
                ...data,

            };
            console.log(data_edit)
            void dispatch(
                editar_carpeta(selected_carpeta.id_carpeta_caja, data_edit)
            );
        } else {
            const data_aux = {
                ...data,
                id_caja_bandeja: cajas.id_caja

            };
            console.log(selected_carpeta)
            void dispatch(crear_carpeta(data_aux));
        }

        set_selected_carpeta(initial_state_carpeta);
        set_action("Guardar");
        void dispatch(get_carpeta_id(cajas.id_caja
            ))
    };

    useEffect(() => {
        // Asegúrate de que selected_carpeta.id_carpeta no es undefined
        if (cajas.id_carpeta !== undefined) {
          void dispatch(get_rotulo_carpeta(cajas.id_carpeta));
        }
      }, [cajas.id_carpeta])
    const on_submit_elimnar = (data: IObjCarpeta): void => {

        if (
            selected_carpeta.id_carpeta_caja !== null &&
            selected_carpeta.id_carpeta_caja !== undefined
        ) {
            void dispatch(
                eliminar_carpeta(
                    selected_carpeta.id_carpeta_caja)
            );
        }

    }


    const on_submit_mover_carpeta = (data: IObjCarpeta): void => {
        console.log(data)
        const data_mover = {
            identificacion_caja_destino: data.identificacion_caja,
            identificacion_bandeja_destino: data.identificacion_bandeja,
            identificacion_estante_destino: data.identificacion_estante,
            identificacion_deposito_destino: data.identificacion_deposito,



        };

        void dispatch(mover_carpeta_seleccionada(selected_carpeta.id_carpeta_caja, data_mover));
        console.log(selected_carpeta);

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
            <Title title="CARPETAS POR CAJAS" />

            <Grid item xs={12} sm={3}>
                <FormInputController
                    xs={11}
                    md={12}
                    margin={0}
                    control_form={control_caja}
                    control_name=""
                    default_value={cajas.nombre_deposito}
                    rules={{}}
                    type="text"
                    disabled={true}
                    helper_text=""
                    hidden_text={null}
                    label={"Depósito"}
                />
            </Grid>

            <Grid item xs={12} sm={3}>
                <FormInputController
                    xs={11}
                    md={12}
                    margin={0}
                    control_form={control_caja}
                    control_name=""
                    default_value={cajas.identificacion_estante}
                    rules={{}}
                    type="text"
                    disabled={true}
                    helper_text=""
                    hidden_text={null}
                    label={"Estante"}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <FormInputController
                    xs={11}
                    md={12}
                    margin={0}
                    control_form={control_caja}
                    control_name=""
                    default_value={cajas.identificacion_bandeja}
                    rules={{}}
                    type="text"
                    disabled={true}
                    helper_text=""
                    hidden_text={null}
                    label={"Bandeja"}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <FormInputController
                    xs={11}
                    md={12}
                    margin={0}
                    control_form={control_caja}
                    control_name=""
                    default_value={cajas.identificacion_caja}
                    rules={{}}
                    type="text"
                    disabled={true}
                    helper_text=""
                    hidden_text={null}
                    label={"Caja"}
                />
            </Grid>

            <Grid container spacing={2} marginTop={2} justifyContent="flex-end">
                <Button variant="contained"
                    color="success"
                    onClick={handle_carpeta}>
                    Agregar Carpeta
                </Button>
            </Grid>

            {carpeta && (
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
                    <Title title="CARPETA" />


                    <FormInputController
                        xs={12}
                        md={3}
                        margin={0}
                        control_form={control_carpeta}
                        control_name="identificacion_por_caja"
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
                        control_form={control_carpeta}
                        control_name="orden_ubicacion_por_caja"
                        default_value=''
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={"Órden"}
                    />

                    {selected_carpeta.id_carpeta_caja !== null &&
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
                                    control_form={control_carpeta}
                                    control_name={'orden_ubicacion_por_caja'}
                                    default_value=''
                                    rules={{}}
                                    label='Nuevo órden'
                                    disabled={!select_orden}
                                    helper_text=''
                                    select_options={carpetas}
                                    option_label='orden_ubicacion_por_caja'
                                    option_key='orden_ubicacion_por_caja'
                                    multiple={false}
                                    hidden_text={false}
                                    auto_focus={false}
                                />
                            </Grid>

                            <Grid container spacing={2} marginTop={2} justifyContent="flex-end">
                                <Button variant="contained"
                                    color="success"
                                    onClick={handle_boton_mover_carpeta}>
                                    Mover Carpeta
                                </Button>
                            </Grid>

                        </>
                    }



                </Grid>
            )}
            {mover_carpeta && (
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
                    <Title title="MOVER CARPETA A OTRA CAJA" />


                    <FormInputController
                        xs={12}
                        md={3}
                        margin={0}
                        control_form={control_carpeta_destino}
                        control_name="identificacion_deposito"
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
                        control_form={control_carpeta_destino}
                        control_name="identificacion_estante"
                        default_value=''
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={"Estante destino"}
                    />
                    <FormInputController
                        xs={12}
                        md={3}
                        margin={0}
                        control_form={control_carpeta_destino}
                        control_name="identificacion_bandeja"
                        default_value=''
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={"Bandeja destino"}
                    />
                    <FormInputController
                        xs={12}
                        md={3}
                        margin={0}
                        control_form={control_carpeta_destino}
                        control_name="identificacion_caja"
                        default_value=''
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={"Caja destino"}
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
                                onClick={handle_submit_carpeta_destino(on_submit_mover_carpeta)}>
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
                    <MoverCarpeta
                        control_carpeta_destino={control_carpeta_destino}
                        open={open_modal}
                        handle_close_buscar={handle_close_buscar}
                        get_values={get_values_carpeta_destino}
                        handle_mover_carpeta={handle_mover_carpeta}
                    />
                </Grid>
            )}

            <Grid item xs={12} marginY={1}>
                <ListadoCarpetas

                    handle_edit_click={handle_edit_click}

                />
            </Grid>
            <Grid item xs={12} md={2}>
                <FormButton
                    variant_button="contained"
                    on_click_function={handle_submit(on_submit)}
                    icon_class={<SaveIcon />}
                    label={action}
                    type_button="button" />
            </Grid>
            {selected_carpeta.id_carpeta_caja !== null &&
                <Grid item xs={12} md={2}>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => { on_submit_elimnar(selected_carpeta); }}
                    >
                        Eliminar
                    </Button>
                </Grid>
            }
            {open_modal_rotulo && (
                <Dialog open={open_modal_rotulo} onClose={handle_rotulo_cerrar}>
                    <DialogTitle>
                        Generar Rótulo

                    </DialogTitle>
                    <DialogContent>
                        <Rotulo control_rotulo={control_rotulo} open={open_modal_rotulo} selected_carpeta={selected_carpeta}/>
                    </DialogContent>
                </Dialog>
            )}

            <Grid item xs={12} sm={4}>
                <LoadingButton
                    variant="contained"
                    onClick={handle_rotulo}
                    disabled={false}
                >
                    Generar Rótulo
                </LoadingButton>
            </Grid>

            <Grid item xs={12} md={2}>
                <ButtonSalir />
            </Grid>
        </Grid>
    );

};

// eslint-disable-next-line no-restricted-syntax
export default AdministrarCarpetasScreen;