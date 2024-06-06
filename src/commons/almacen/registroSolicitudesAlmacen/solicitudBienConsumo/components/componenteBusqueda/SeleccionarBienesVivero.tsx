import { Avatar, Grid, IconButton, Tooltip, } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks";
import { type IObjBienViveroConsumo, type IObjBienesSolicitud } from "../../interfaces/solicitudBienConsumo";
//  import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState, } from "react";
import { type GridColDef } from "@mui/x-data-grid";
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
// import { get_bienes_consumo } from "../../store/solicitudBienConsumoThunks";
import { set_bienes_solicitud, set_bienes_vivero, set_current_bien_vivero } from "../../store/slices/indexSolicitudBienesConsumo";
import { useForm } from "react-hook-form";
import { control_error, get_bienes_consumo_vivero_codigo_bien, get_bienes_vivero_consumo } from "../../store/solicitudBienConsumoThunks";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';





// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBienConsumoVivero = () => {


    // const [action, set_action] = useState<string>("agregar");
    const { control: control_bien, reset: reset_bien, getValues: get_values_bien, reset: reset_bien_solicitud } = useForm<IObjBienViveroConsumo>();
    const { control: control_bien_solicitud_vivero, handleSubmit: handle_submit_item_solicitud } = useForm<IObjBienesSolicitud>();
    const { unidades_medida, bienes_vivero, bienes_solicitud, current_bien_vivero, current_solicitud_vivero } = useAppSelector((state) => state.solic_consumo);
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
        //  console.log('')(current_bien_vivero)
        reset_bien(current_bien_vivero)
    }, [current_bien_vivero]);


    const columns_bienes: GridColDef[] = [
        // { field: 'id_bien', headerName: 'ID', width: 100 },
        {
            field: 'codigo_bien',
            headerName: 'Código',
            width: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 200, flex: 2,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'cod_tipo_elemento_vivero',
            headerName: 'Tipo bien',
            width: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.row.cod_tipo_elemento_vivero === "IN" ? "Insumo" : params.row.cod_tipo_elemento_vivero === "MV" ? "Material Vegetal" : "Herramienta"}
                </div>
            ),
        },

    ];
    const columns_bienes_solicitud: GridColDef[] = [

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
            width: 250,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'tipo_bien',
            headerName: 'Tipo bien',
            width: 200, flex: 1,
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
            width: 250,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 100,
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
        if (current_bien_vivero.id_bien !== null) {
            if (get_values_bien("codigo_bien") === current_bien_vivero.codigo_bien) {
                const bien: IObjBienesSolicitud | undefined = aux_bienes_solicitud.find((p) => p.id_bien === current_bien_vivero.id_bien)

                const new_bien: IObjBienesSolicitud = {
                    id_item_solicitud_consumible: null,
                    codigo_bien: current_bien_vivero.codigo_bien ?? "",
                    nombre_bien: current_bien_vivero.nombre ?? "",
                    id_bien: current_bien_vivero.id_bien ?? null,
                    cantidad: data.cantidad,
                    observaciones: data.observaciones,
                    id_unidad_medida: data.id_unidad_medida,
                    id_solicitud_consumibles: current_solicitud_vivero.id_solicitud_consumibles ?? null
                }

                if (bien === undefined) {
                    set_aux_bienes_solicitud([...aux_bienes_solicitud, new_bien])

                } else {
                    if (action === "editar") {
                        const aux_items: IObjBienesSolicitud[] = []
                        aux_bienes_solicitud.forEach((option) => {
                            if (option.id_bien === current_bien_vivero.id_bien) {
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
                control_error("Codigo de bien no coincide con el seleccionado")
            }
        } else {
            control_error("Debe seleccionar el bien")
        }

    };


    const get_bienes_filtro: any = (async () => {
        //  console.log('')("buscar...")
        const codigo_bien = get_values_bien("codigo_bien") ?? ""
        const nombre = get_values_bien("nombre") ?? ""
        const nombre_cientifico = get_values_bien("nombre_cientifico") ?? ""
        const cod_tipo_elemento_vivero = get_values_bien("cod_tipo_elemento_vivero") ?? ""
        if (codigo_bien !== null && codigo_bien !== undefined && nombre !== null && nombre !== undefined && nombre_cientifico !== null && nombre_cientifico !== undefined && cod_tipo_elemento_vivero !== null && cod_tipo_elemento_vivero !== undefined) {

            void dispatch(get_bienes_vivero_consumo(codigo_bien, nombre, nombre_cientifico, cod_tipo_elemento_vivero))
        }
    })

    const search_bien: any = (async () => {
        const codigo_bien = get_values_bien("codigo_bien")
        if (codigo_bien !== null && codigo_bien !== undefined) {
            void dispatch(get_bienes_consumo_vivero_codigo_bien(codigo_bien))
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

        set_aux_bienes_solicitud(aux_items)
    };
    const delete_bien_solicitud = (item: IObjBienesSolicitud): void => {
        const bien: IObjBienViveroConsumo | undefined = bienes_vivero.find((p: IObjBienViveroConsumo) => p.id_bien === item.id_bien)
        //  console.log('')("bien", bien)
        if (bien !== undefined) {
            //  console.log('')(bien)
            dispatch(set_current_bien_vivero(bien))
        }
        const aux_items: IObjBienesSolicitud[] = []
        aux_bienes_solicitud.forEach((option) => {
            if (option.id_bien !== item.id_bien) {
                aux_items.push(option)
            }
        })
        set_aux_bienes_solicitud(aux_items)

    };

    const clear_fields = (): void => {
        reset_bien_solicitud(prev => {
            return {
                ...prev,
                codigo_bien: "",
                nombre: "",
                cod_tipo_elemento_vivero: ""
            }

        })
    }

    return (
        <>
            <Grid
                container
                direction="row"
                padding={2}
                borderRadius={2}
            >
                <BuscarModelo
                    clear_fields={clear_fields}
                    set_current_model={set_current_bien_vivero}
                    row_id={"id_bien"}
                    columns_model={columns_bienes}
                    models={bienes_vivero}
                    get_filters_models={get_bienes_filtro}
                    set_models={set_bienes_vivero}
                    button_submit_label='Buscar bien'
                    form_inputs={[
                        {
                            datum_type: "title",
                            title_label: "Seleccione bien vivero"
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
                            disabled: true,
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
                            disabled: true,
                            helper_text: "",
                        },
                    ]}
                    form_inputs_list={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_bien_solicitud_vivero,
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
                            control_form: control_bien_solicitud_vivero,
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
                            control_form: control_bien_solicitud_vivero,
                            control_name: "observaciones",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Observación requerido" } },
                            label: "Observación",
                            type: "text",
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
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_bien,
                            control_name: "cod_tipo_elemento_vivero",
                            default_value: "",
                            rules: {},
                            label: "Tipo de bien",
                            disabled: false,
                            helper_text: "",
                            select_options: [{ label: "Insumos", value: "IN" }, { label: "Material Vegetal", value: "MV" }, { label: "Herramientas", value: "HE" }],
                            option_label: "label",
                            option_key: "value",
                        },
                    ]}
                />


            </Grid>
        </>
    );
}




// eslint-disable-next-line no-restricted-syntax
export default SeleccionarBienConsumoVivero;