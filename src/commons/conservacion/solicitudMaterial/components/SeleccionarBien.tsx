import { Avatar, Grid, IconButton, Tooltip, } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { type IObjBienConsumo, type IObjBienesSolicitud } from "../interfaces/solicitudVivero";
import { useEffect, useState, } from "react";
import { type GridColDef } from "@mui/x-data-grid";
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
// import { get_bienes_consumo } from "../../store/solicitudBienConsumoThunks";
import { set_bienes, set_bienes_solicitud, set_current_bien } from "../store/slices/indexSolicitud";
import { useForm } from "react-hook-form";
import { control_error, get_bienes_service, get_bienes_service_codigo } from "../store/thunks/solicitudViveroThunks";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';






// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBienConsumo = () => {


    // const [action, set_action] = useState<string>("agregar");
    const { control: control_bien, reset: reset_bien, getValues: get_values_bien } = useForm<IObjBienConsumo>();
    const { control: control_bien_solicitud, handleSubmit: handle_submit_item_solicitud, reset: reset_bien_solicitud } = useForm<IObjBienesSolicitud>();
    const { bienes, bienes_solicitud, current_bien, current_nursery, current_solicitud } = useAppSelector((state) => state.solicitud_vivero);
    const [aux_bienes_solicitud, set_aux_bienes_solicitud] = useState<IObjBienesSolicitud[]>([]);
    const [action, set_action] = useState<string>("crear");

    // const [item_solicitudes, set_item_solicitudes] = useState<ItemSolicitudConsumible[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        set_aux_bienes_solicitud(bienes_solicitud)
    }, [bienes_solicitud]);

    useEffect(() => {
        dispatch(set_bienes_solicitud(aux_bienes_solicitud))
    }, [aux_bienes_solicitud]);

    useEffect(() => {
        //  console.log('')(current_bien)
        reset_bien(current_bien)
    }, [current_bien]);

    const columns_bienes_mv: GridColDef[] = [
        // { field: 'id_bien', headerName: 'ID', width: 20 },
        {
            field: 'codigo_bien',
            headerName: 'Código',
            width: 200,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 200,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nombre_cientifico',
            headerName: 'Nombre científico',
            width: 200,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'saldo_total_produccion',
            headerName: 'Saldo producción',
            width: 200,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'saldo_total_distribucion',
            headerName: 'Saldo distribución',
            width: 200,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'saldo_total_apartado',
            headerName: 'Saldo apartado',
            width: 200,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
    ];
    const columns_bienes_insumo: GridColDef[] = [
        // { field: 'id_bien', headerName: 'ID', width: 20 },
        {
            field: 'codigo_bien',
            headerName: 'Código',
            width: 200,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 200,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'saldo_disponible',
            headerName: 'Saldo disponible',
            width: 200,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
    ];
    const columns_bienes_solicitud: GridColDef[] = [
        // { field: 'id_bien_consumido', headerName: 'ID', width: 20 },
        {
            field: 'codigo_bien',
            headerName: 'Código',
            width: 150,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nombre_bien',
            headerName: 'Nombre',
            width: 150,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'cantidad',
            headerName: 'Cantidad',
            width: 140,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'observaciones',
            headerName: 'Observación',
            width: 150,flex:1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 90,flex:1,
            renderCell: (params) => (
                <>

                    <Tooltip title="Editar">
                            <IconButton
                                onClick={() => {
                                    edit_bien_solicitud(params.row)

                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        background: '#fff',
                                        border: '2px solid',
                                    }}
                                    variant="rounded"
                                >
                                    <EditIcon
                                        sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                                    />

                                </Avatar>
                            </IconButton>
                        </Tooltip> 

                    <Tooltip title="Borrar">
                            <IconButton
                                onClick={() => {
                                    delete_bien_solicitud(params.row)
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        background: '#fff',
                                        border: '2px solid',
                                    }}
                                    variant="rounded"
                                >
                                    <DeleteIcon
                                        sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                                    />

                                </Avatar>
                            </IconButton>
                        </Tooltip>
                     
                </>
            ),
        },
    ];

    const on_submit_item_solicitud = (data: IObjBienesSolicitud): void => {
        if (current_bien.id_bien !== null) {
            if (get_values_bien("codigo_bien") === current_bien.codigo_bien) {
                const bien: IObjBienesSolicitud | undefined = aux_bienes_solicitud.find((p) => p.id_bien === current_bien.id_bien)

                const new_bien: IObjBienesSolicitud = {
                    id_item_solicitud_viveros: data.id_item_solicitud_viveros ?? null,
                    id_solicitud_viveros: current_solicitud.id_solicitud_vivero,
                    codigo_bien: current_bien.codigo_bien ?? "",
                    nombre_bien: current_bien.nombre ?? "",
                    id_bien: current_bien.id_bien ?? null,
                    cantidad: data.cantidad,
                    observaciones: data.observaciones,
                }

                if (bien === undefined) {
                    set_aux_bienes_solicitud([...aux_bienes_solicitud, new_bien])

                } else {
                    if (action === "editar") {
                        const aux_items: IObjBienesSolicitud[] = []
                        aux_bienes_solicitud.forEach((option) => {
                            if (option.id_bien === current_bien.id_bien) {
                                aux_items.push(new_bien)
                            } else {
                                aux_items.push(option)
                            }
                        })
                        set_aux_bienes_solicitud(aux_items)
                        set_action("agregar")
                    } else {
                        control_error("El bien ya fue agregado")
                    }
                }
            } else {
                control_error("Código de bien no coincide con el seleccionado")
            }
        } else {
            control_error("Debe seleccionar el bien")
        }

    };


    const get_bienes_filtro: any = (async () => {
        const id_vivero = current_nursery.id_vivero
        if (id_vivero !== null && id_vivero !== undefined) {
            const tipo_bien = get_values_bien("tipo_bien") ?? ""
            const codigo_bien = get_values_bien("codigo_bien") ?? ""
            const nombre = get_values_bien("nombre") ?? ""
            void dispatch(get_bienes_service(id_vivero, tipo_bien, codigo_bien, nombre))
        }
    })

    const search_bien: any = (async () => {
        const id_vivero = current_nursery.id_vivero
        if (id_vivero !== null && id_vivero !== undefined) {
            const codigo_bien = get_values_bien("codigo_bien") ?? ""
            void dispatch(get_bienes_service_codigo(id_vivero, codigo_bien))
        }
    })

    const edit_bien_solicitud = (item: IObjBienesSolicitud): void => {
        set_action("editar")
        const item_bien = aux_bienes_solicitud.find((p) => p.id_bien === item.id_bien)
        reset_bien_solicitud(item_bien)
        const aux_items: IObjBienesSolicitud[] = []
        aux_bienes_solicitud.forEach((option) => {
            if (option.id_bien !== item.id_bien) {
                aux_items.push(option)
            }
        })
        // if(bien !== undefined){
        //     restante = (bien.cantidad_disponible_bien ?? 0) + (item_bien?.cantidad?? 0)
        //     dispatch(set_current_good({...bien, cantidad_disponible_bien: restante}))
        // }
        set_aux_bienes_solicitud(aux_items)
    };

    const delete_bien_solicitud = (item: IObjBienesSolicitud): void => {
        const bien: IObjBienConsumo | undefined =bienes.find((p: IObjBienConsumo) => p.id_bien === item.id_bien)
        //  console.log('')("bien",bien)
        if(bien !== undefined){
            //  console.log('')(bien)
            dispatch(set_current_bien(bien))
        }
        const aux_items: IObjBienesSolicitud[] = []
        aux_bienes_solicitud.forEach((option) => {
            if (option.id_bien !== item.id_bien) {
                aux_items.push(option)
            }
        })
        set_aux_bienes_solicitud(aux_items)
        // if(item.id_item_solicitud_viveros !== null && item.id_item_solicitud_viveros !== undefined){
        //     void dispatch(delete_item_solicitud_service(current_solicitud.id_solicitud_vivero, [item]))
        // }
    };



    return (
        <>
            <Grid
                container
                direction="row"
                padding={2}
                borderRadius={2}
            >
                <BuscarModelo
                    set_current_model={set_current_bien}
                    row_id={"id_bien"}
                    columns_model={get_values_bien("tipo_bien") === "MV"? columns_bienes_mv : columns_bienes_insumo}
                    models={bienes}
                    get_filters_models={get_bienes_filtro}
                    set_models={set_bienes}
                    button_submit_label='Buscar bien'
                    form_inputs={[
                        {
                            datum_type: "title",
                            title_label: "Seleccione bien"
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_bien,
                            control_name: "codigo_bien",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Código bien requerido" } },
                            label: "Código bien",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                            on_blur_function: search_bien
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_bien,
                            control_name: "nombre",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Debe seleccionar un bien" } },
                            label: "Nombre",
                            type: "text",
                            disabled: false,
                            helper_text: "",
                        },
                    ]}
                    form_inputs_list={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_bien_solicitud,
                            control_name: "cantidad",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Ingrese cantidad" } },
                            label: "Cantidad",
                            type: "number",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_bien,
                            control_name: "unidad_medida",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Debe seleccionar bien" } },
                            label: "Unidad de medida",
                            disabled: true,
                            helper_text: "",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_bien_solicitud,
                            control_name: "observaciones",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Observación requerida" } },
                            label: "Observación",
                            type: "text",
                            multiline_text: true,
                            rows_text: 4,
                            disabled: false,
                            helper_text: ""
                        },
                    ]}
                    title_list='Bienes consumidos'
                    list={aux_bienes_solicitud}
                    add_item_list={handle_submit_item_solicitud(on_submit_item_solicitud)}
                    add_list_button_label={"Agregar"}
                    columns_list={columns_bienes_solicitud}
                    row_list_id={"id_bien"}
                    modal_select_model_title='Buscar bien'
                    modal_form_filters={[
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_bien,
                            control_name: "tipo_bien",
                            default_value: "MV",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Tipo bien",
                            helper_text: "",
                            disabled: false,
                            select_options: [{ label: "Planta", value: "MV" },{ label: "Insumo", value: "IN" }],
                            option_label: "label",
                            option_key: "value"
                          },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_bien,
                            control_name: "codigo_bien",
                            default_value: "",
                            rules: {},
                            label: "Código bien",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_bien,
                            control_name: "nombre",
                            default_value: "",
                            rules: {},
                            label: "Nombre",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        }
                    ]}
                />


            </Grid>
        </>
    );
}




// eslint-disable-next-line no-restricted-syntax
export default SeleccionarBienConsumo;