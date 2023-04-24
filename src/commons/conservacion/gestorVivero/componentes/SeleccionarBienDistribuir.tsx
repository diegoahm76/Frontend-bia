
import { useForm } from 'react-hook-form';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { type IObjItem, type IObjDistribucion, type IObjNursery } from "../interfaces/vivero";
import { get_items_despacho } from '../store/slice/viveroSlice';
import { save_items_distribuidos_service, get_items_despacho_service, get_items_distribuidos_service, get_nurseries_closing_service, control_error } from '../store/thunks/gestorViveroThunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import FormButton from '../../../../components/partials/form/FormButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

// const initial_state_item: IObjItem = {
//     id_item_despacho_entrante: null,
//     id_despacho_entrante: null,
//     id_bien: null,
//     cantidad_entrante: null,
//     cantidad_distribuida: null,
//     codigo_bien: null,
//     nombre_bien: "",
//     cantidad_restante: null,
// }

// const initial_state_distribucion: IObjDistribucion = {
//     id_vivero: null,
//     cantidad_asignada: null,
// }

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBienDistribuir = () => {


    const { control: control_bien, reset: reset_bien, getValues: get_values_bien, watch } = useForm<IObjItem>();
    const { control: control_distribucion, reset: reset_distribucion, getValues: get_values_distribucion } = useForm<IObjDistribucion>();
    const [aux_items_distribuidos, set_aux_items_distribuidos] = useState<IObjDistribucion[]>([]);
    const [action, set_action] = useState<string>("agregar");

    const { current_despacho, items_despacho, items_distribuidos, nurseries } = useAppSelector((state) => state.nursery);
    const dispatch = useAppDispatch();

    const columns_bienes: GridColDef[] = [
        { field: 'id_bien', headerName: 'ID', width: 20 },
        {
            field: 'codigo_bien',
            headerName: 'Codigo',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nombre_bien',
            headerName: 'Nombre',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'cantidad_entrante',
            headerName: 'Cantidad entrante',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'cantidad_distribuida',
            headerName: 'Cantidad distribuida',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'cantidad_restante',
            headerName: 'Cantidad restante',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },

    ];

    const columns_bienes_distribuidos: GridColDef[] = [
        { field: 'id_bien', headerName: 'ID', width: 20 },
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
            field: 'cantidad_asignada',
            headerName: 'Cantidad asignada',
            width: 140,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'vivero_nombre',
            headerName: 'Vivero',
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
                    {current_despacho.distribucion_confirmada === false &&
                        <Tooltip title="Editar">
                            <IconButton
                                onClick={() => {
                                    edit_bien_distribuido(params.row)

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
                    }
                    {params.row.id_distribucion_item_despacho_entrante === null &&
                        <Tooltip title="Borrar">
                            <IconButton
                                onClick={() => {
                                    delete_bien_distribuido(params.row)
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
                    }
                </>
            ),
        },
    ];


    const get_bienes: any = (async () => {
        const id_despacho = current_despacho.id_despacho_entrante
        if (id_despacho !== null && id_despacho !== undefined) {
            void dispatch(get_items_despacho_service(id_despacho));
        }
    })

    useEffect(() => {
        const id_despacho = current_despacho.id_despacho_entrante
        if (id_despacho !== null && id_despacho !== undefined) {
            void dispatch(get_items_distribuidos_service(id_despacho));
        }
        set_action("agregar")
    }, [current_despacho]);

    useEffect(() => {
        set_aux_items_distribuidos(items_distribuidos)
    }, [items_distribuidos]);

    useEffect(() => {
        set_action("agregar")
    }, [watch("id_bien")]);

    useEffect(() => {
        void dispatch(get_nurseries_closing_service());
    }, []);

    const add_bien_distribuido = (): void => {
        const bien: IObjDistribucion | undefined = aux_items_distribuidos.find((p) => p.id_bien === get_values_bien("id_bien") && p.id_vivero === get_values_distribucion("id_vivero"))
        const vivero: IObjNursery | undefined = nurseries.find((p) => p.id_vivero === get_values_distribucion("id_vivero"));
        const new_bien: IObjDistribucion = {
            id_distribucion_item_despacho_entrante: null,
            id_vivero: get_values_distribucion("id_vivero"),
            id_bien: get_values_bien("id_bien"),
            cantidad_asignada: Number(get_values_distribucion("cantidad_asignada")),
            cod_etapa_lote_al_ingresar: "G",
            id_item_despacho_entrante: get_values_bien("id_item_despacho_entrante"),
            vivero_nombre: vivero?.nombre ?? "",
            unidad_medida: get_values_bien("unidad_medida") ?? "",
            codigo_bien: get_values_bien("codigo_bien") ?? "",
            nombre_bien: get_values_bien("nombre_bien") ?? "",
        }
        if (bien === undefined) {
            set_aux_items_distribuidos([...aux_items_distribuidos, new_bien])
        } else {
            if (action === "editar") {


                const aux_items: IObjDistribucion[] = []
                aux_items_distribuidos.forEach((option) => {
                    if (option.id_bien === get_values_bien("id_bien")) {
                        aux_items.push(new_bien)
                    } else {
                        aux_items.push(option)
                    }
                })
                set_aux_items_distribuidos(aux_items)
                set_action("agregar")
            } else {
                control_error("el bien ya se asigno en el vivero, seleccione la opcion de editar")
            }
        }
    };

    const edit_bien_distribuido = (item: IObjDistribucion): void => {
        reset_bien(items_despacho.find((p: IObjItem) => p.id_item_despacho_entrante === item.id_item_despacho_entrante))
        reset_distribucion(aux_items_distribuidos.find((p) => p.id_bien === item.id_bien && p.id_vivero === item.id_vivero))
        set_action("editar")

    };

    const delete_bien_distribuido = (item: IObjDistribucion): void => {
        const aux_items: IObjDistribucion[] = []
        aux_items_distribuidos.forEach((option) => {
            if (option.id_bien !== item.id_bien || option.id_vivero !== item.id_vivero) {
                aux_items.push(option)
            }
        })
        set_aux_items_distribuidos(aux_items)
    };

    const save_items: any = (async () => {
        const id_despacho = current_despacho.id_despacho_entrante
        if (id_despacho !== null && id_despacho !== undefined) {
            void dispatch(save_items_distribuidos_service(id_despacho, current_despacho.observacion_distribucion ?? "", aux_items_distribuidos));
        }
    });

    return (
        <>
            <Grid
                container
                direction="row"
                padding={2}
                borderRadius={2}
            >
                <BuscarModelo
                    row_id={"id_item_despacho_entrante"}
                    columns_model={columns_bienes}
                    models={items_despacho}
                    get_filters_models={get_bienes}
                    set_models={get_items_despacho}
                    reset_values={reset_bien}
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
                            rules: {},
                            label: "Codigo bien",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_bien,
                            control_name: "nombre_bien",
                            default_value: "",
                            rules: {},
                            label: "Nombre",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_bien,
                            control_name: "cantidad_restante",
                            default_value: "",
                            rules: {},
                            label: "Cantidad restante",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                    ]}
                    form_inputs_list={[

                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 5,
                            control_form: control_distribucion,
                            control_name: "id_vivero",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Vivero",
                            disabled: action === "editar",
                            helper_text: "debe seleccionar campo",
                            select_options: nurseries,
                            option_label: "nombre",
                            option_key: "id_vivero",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_distribucion,
                            control_name: "cantidad_asignada",
                            default_value: "",
                            rules: {},
                            label: "Cantidad",
                            type: "number",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_bien,
                            control_name: "unidad_medida",
                            default_value: "",
                            rules: {},
                            label: "Unidad",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },

                    ]}
                    title_list='Bienes pre-distribuidos'
                    list={aux_items_distribuidos}
                    add_item_list={add_bien_distribuido}
                    add_list_button_label={action}
                    columns_list={columns_bienes_distribuidos}
                    row_list_id={"id_distribucion_item_despacho_entrante"}
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
                            label: "Codigo bien",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_bien,
                            control_name: "nombre_bien",
                            default_value: "",
                            rules: {},
                            label: "Nombre",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                    ]}
                />
                <Grid
                    container
                    direction="row"
                    padding={2}
                    spacing={2}
                >
                    <Grid item xs={12} md={3}>
                        <FormButton
                            variant_button="contained"
                            on_click_function={save_items}
                            icon_class={<SaveIcon />}
                            label={"guardar"}
                            type_button="button"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormButton
                            variant_button="contained"
                            on_click_function={null}
                            icon_class={<CheckIcon />}
                            label={"Confirmar distribucion"}
                            type_button="button"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormButton
                            variant_button="outlined"
                            on_click_function={null}
                            icon_class={<CloseIcon />}
                            label={"Cancelar"}
                            type_button="button"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarBienDistribuir;