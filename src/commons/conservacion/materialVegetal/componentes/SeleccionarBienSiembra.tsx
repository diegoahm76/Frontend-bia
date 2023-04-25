
import { useForm } from 'react-hook-form';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { type IObjPlantingGoods } from "../interfaces/materialvegetal";
import { get_planting_goods, set_current_good } from '../store/slice/materialvegetalSlice';
import { get_planting_goods_service, control_error, get_goods_service } from '../store/thunks/materialvegetalThunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import FormButton from '../../../../components/partials/form/FormButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';

// const initial_state_item: IObjPlantingGoods = {
//     id_item_despacho_entrante: null,
//     id_siembra: null,
//     id_bien: null,
//     cantidad_entrante: null,
//     cantidad_distribuida: null,
//     codigo_bien: null,
//     nombre_bien: "",
//     cantidad_restante: null,
// }

// const initial_state_distribucion: IObjPlantingGoods = {
//     id_vivero: null,
//     cantidad_asignada: null,
// }

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBienDistribuir = () => {


    const { control: control_bien, reset: reset_bien, getValues: get_values_bien, watch } = useForm<IObjPlantingGoods>();
    const { control: control_siembra, reset: reset_siembra, getValues: get_values_siembra } = useForm<IObjPlantingGoods>();
    const [aux_planting_goods, set_aux_planting_goods] = useState<IObjPlantingGoods[]>([]);
    const [action, set_action] = useState<string>("agregar");

    const { current_planting, goods, planting_goods, current_nursery, current_good } = useAppSelector((state) => state.material_vegetal);
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
            field: 'cantidad_disponible_bien',
            headerName: 'Cantidad disponible',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'unidad_disponible',
            headerName: 'unidad',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },

    ];

    const columns_bienes_siembra: GridColDef[] = [
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
                    
                        <Tooltip title="Editar">
                            <IconButton
                                // onClick={() => {
                                //     edit_bien_distribuido(params.row)

                                // }}
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
                                // onClick={() => {
                                //     delete_bien_distribuido(params.row)
                                // }}
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


    const get_bienes: any = (async () => {
        const id_vivero = current_nursery.id_vivero
        console.log(current_nursery)
        if (id_vivero !== null && id_vivero !== undefined) {
            void dispatch(get_goods_service(id_vivero));
        }
    })

    useEffect(() => {
        const id_vivero = current_nursery.id_vivero
        if (id_vivero !== null && id_vivero !== undefined) {
            void dispatch(get_goods_service(id_vivero));
        }
        set_action("agregar")
    }, [current_nursery]);

    useEffect(() => {
        set_aux_planting_goods(planting_goods)
    }, [planting_goods]);

    useEffect(() => {
        console.log(aux_planting_goods)
    }, [aux_planting_goods]);

    useEffect(() => {
        set_action("agregar")
    }, [current_good]);

    const add_bien_siembra = (): void => {
        const bien: IObjPlantingGoods | undefined = aux_planting_goods.find((p) => p.id_bien_consumido === current_good.id_bien )
        const new_bien: IObjPlantingGoods = {
            id_consumo_siembra: null,
            id_siembra: current_planting.id_siembra,
            id_bien_consumido: current_good.id_bien,
            cantidad: Number(get_values_siembra("cantidad")),
            observaciones: get_values_siembra("observaciones"),
            id_mezcla_consumida: current_good.id_inventario_vivero,
            tipo_bien: current_good.tipo_bien,
            codigo_bien: current_good.codigo_bien,
            nombre_bien: current_good.nombre_bien,
        }
        if (bien === undefined) {
            set_aux_planting_goods([...aux_planting_goods, new_bien])
        } else {
            if (action === "editar") {
                const aux_items: IObjPlantingGoods[] = []
                aux_planting_goods.forEach((option) => {
                    if (option.id_bien_consumido === get_values_bien("id_bien_consumido")) {
                        aux_items.push(new_bien)
                    } else {
                        aux_items.push(option)
                    }
                })
                set_aux_planting_goods(aux_items)
                set_action("agregar")
            } else {
                control_error("El bien ya fue agregado o ya existe semilla")
            }
        }
    };

    // const edit_bien_distribuido = (item: IObjPlantingGoods): void => {
    //     reset_bien(goods.find((p: IObjPlantingGoods) => p.id_item_despacho_entrante === item.id_item_despacho_entrante))
    //     reset_siembra(aux_planting_goods.find((p) => p.id_bien === item.id_bien && p.id_vivero === item.id_vivero))
    //     set_action("editar")

    // };

    // const delete_bien_distribuido = (item: IObjPlantingGoods): void => {
    //     const aux_items: IObjPlantingGoods[] = []
    //     aux_planting_goods.forEach((option) => {
    //         if (option.id_bien !== item.id_bien || option.id_vivero !== item.id_vivero) {
    //             aux_items.push(option)
    //         }
    //     })
    //     set_aux_planting_goods(aux_items)
    // };

    const save_items: any = (async () => {
        const id_despacho = current_planting.id_siembra
        if (id_despacho !== null && id_despacho !== undefined) {
            // void dispatch(save_planting_goods_service(id_despacho, current_planting.observacion_distribucion ?? "", aux_planting_goods));
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
                    set_current_model={set_current_good}
                    row_id={"id_inventario_vivero"}
                    columns_model={columns_bienes}
                    models={goods}
                    get_filters_models={get_bienes}
                    set_models={get_planting_goods}
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
                            control_name: "cantidad_disponible_bien",
                            default_value: "",
                            rules: {},
                            label: "Cantidad disponible",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                    ]}
                    form_inputs_list={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_siembra,
                            control_name: "cantidad",
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
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 5,
                            control_form: control_siembra,
                            control_name: "observaciones",
                            default_value: "",
                            rules: {},
                            label: "Observación",
                            type: "text",
                            multiline_text: true,
                            rows_text: 4,
                            disabled: false,
                            helper_text: ""
                        },

                    ]}
                    title_list='Bienes consumidos'
                    list={aux_planting_goods}
                    add_item_list={add_bien_siembra}
                    add_list_button_label={action}
                    columns_list={columns_bienes_siembra}
                    row_list_id={"id_consumo_siembra"}
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