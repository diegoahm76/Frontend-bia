import { Grid, } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { type IObjBienConsumo, type IObjBienesSolicitud } from "../interfaces/solicitudVivero";
import { useEffect, useState, } from "react";
import { type GridColDef } from "@mui/x-data-grid";
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
// import { get_bienes_consumo } from "../../store/solicitudBienConsumoThunks";
import { set_bienes, set_bienes_solicitud, set_current_bien } from "../store/slices/indexSolicitud";
import { useForm } from "react-hook-form";
import { get_bienes_service } from "../store/thunks/solicitudViveroThunks";







// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBienConsumo = () => {


    // const [action, set_action] = useState<string>("agregar");
    const { control: control_bien, reset: reset_bien, getValues: get_values_bien } = useForm<IObjBienConsumo>();
    const { control: control_bien_solicitud, handleSubmit: handle_submit_item_solicitud } = useForm<IObjBienesSolicitud>();
    const { unidades_medida, bienes, bienes_solicitud, current_bien, origin_nursery } = useAppSelector((state) => state.solic_consumo);
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
        console.log(current_bien)
        reset_bien(current_bien)
    }, [current_bien]);


    const columns_bienes: GridColDef[] = [
        { field: 'id_bien', headerName: 'ID', width: 20 },
        {
            field: 'codigo_bien',
            headerName: 'Código',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },


    ];
    const columns_bienes_solicitud: GridColDef[] = [
        { field: 'id_bien_consumido', headerName: 'ID', width: 20 },
        {
            field: 'codigo_bien',
            headerName: 'Codigo',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nombre_bien',
            headerName: 'Nombre',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'tipo_bien',
            headerName: 'Tipo',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'cantidad',
            headerName: 'Cantidad',
            width: 140,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'observaciones',
            headerName: 'Observacion',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 90,
            renderCell: (params) => (
                <>

                    {/* <Tooltip title="Editar">
                            <IconButton
                                onClick={() => {
                                    edit_bien_siembra(params.row)

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
                        </Tooltip> */}

                    {/* <Tooltip title="Borrar">
                            <IconButton
                                onClick={() => {
                                    delete_bien_siembra(params.row)
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
                     */}
                </>
            ),
        },
    ];

    const on_submit_item_solicitud = (data: IObjBienesSolicitud): void => {
        if (current_bien.id_bien !== null) {
            if (get_values_bien("codigo_bien") === current_bien.codigo_bien) {
                const bien: IObjBienesSolicitud | undefined = aux_bienes_solicitud.find((p) => p.id_bien === current_bien.id_bien)

                const new_bien: IObjBienesSolicitud = {
                    //  id_item_solicitud_consumible: null,
                    codigo_bien: current_bien.codigo_bien ?? "",
                    nombre_bien: current_bien.nombre ?? "",
                    id_bien: current_bien.id_bien ?? null,
                    cantidad: data.cantidad,
                    observaciones: data.observaciones,
                    //    id_unidad_medida: data.id_unidad_medida,
                    //  id_solicitud_consumibles: current_solicitud.id_solicitud_consumibles ?? null
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
                        // control_error("El bien ya fue agregado")
                    }
                }
            } else {
                //  control_error("Codigo de bien no coincide con el seleccionado")
            }
        } else {
            //  control_error("Debe seleccionar el bien")
        }

    };


    const get_bienes_filtro: any = (async () => {
        console.log("buscar...")
        const id_vivero = origin_nursery.id_vivero
        if (id_vivero !== null && id_vivero !== undefined) {
            const codigo_bien = get_values_bien("codigo_bien") ?? ""
            void dispatch(get_bienes_service(id_vivero, codigo_bien))
        }


    })

    const search_bien: any = (async () => {
        try {
            const id_vivero = origin_nursery.id_vivero
            if (id_vivero !== null && id_vivero !== undefined) {
                //  const codigo = get_values_bien("codigo_bien") ?? ""
                //   const data = await dispatch(get_bienes_service(id_vivero, codigo))
            }
        } catch (error) {
            console.error(error);
        }

    })



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
                    columns_model={columns_bienes}
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
                            md: 3,
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
                            datum_type: "select_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_bien_solicitud,
                            control_name: "id_unidad_medida",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Unidad ",
                            disabled: false,
                            helper_text: "debe seleccionar campo",
                            select_options: unidades_medida,
                            option_label: "nombre",
                            option_key: "id_unidad_medida"
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 5,
                            control_form: control_bien_solicitud,
                            control_name: "observaciones",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Observación requerido" } },
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
                    add_list_button_label={null}
                    columns_list={columns_bienes_solicitud}
                    row_list_id={"id_bien"}
                    modal_select_model_title='Buscar bien'
                    modal_form_filters={[
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
                        },
                    ]}
                />


            </Grid>
        </>
    );
}




// eslint-disable-next-line no-restricted-syntax
export default SeleccionarBienConsumo;