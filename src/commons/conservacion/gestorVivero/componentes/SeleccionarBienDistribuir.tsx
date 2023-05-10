
import { useForm } from 'react-hook-form';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { type IObjItem, type IObjDistribucion, type IObjNursery } from "../interfaces/vivero";
import { get_items_despacho, set_current_bien, get_items_distribuidos } from '../store/slice/viveroSlice';
import { get_items_despacho_service, get_items_distribuidos_service, get_nurseries_closing_service, control_error } from '../store/thunks/gestorViveroThunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBienDistribuir = () => {


    const { control: control_bien, reset: reset_bien, getValues: get_values_bien } = useForm<IObjItem>();
    const { control: control_distribucion, reset: reset_distribucion, handleSubmit: handle_submit_distribucion} = useForm<IObjDistribucion>();
    const [aux_items_distribuidos, set_aux_items_distribuidos] = useState<IObjDistribucion[]>([]);
    const [action, set_action] = useState<string>("agregar");
   
    const { current_despacho, items_despacho, items_distribuidos, nurseries, current_bien } = useAppSelector((state) => state.nursery);
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
                    <>
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
                        </>
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
        dispatch(get_items_distribuidos(aux_items_distribuidos))
    }, [aux_items_distribuidos]);


    useEffect(() => {
        reset_bien(current_bien)
        set_action("agregar")
    }, [current_bien]);

    useEffect(() => {
        void dispatch(get_nurseries_closing_service());
    }, []);

    const on_submit_distribucion = (data: IObjDistribucion): void => {
        if(current_bien.id_bien !== null){
            if(get_values_bien("codigo_bien") === current_bien.codigo_bien){
                const bien: IObjDistribucion | undefined = aux_items_distribuidos.find((p) => p.id_bien === current_bien.id_bien && p.id_vivero === data.id_vivero)
                let asignada = (bien?.cantidad_asignada ?? 0)
                aux_items_distribuidos.forEach((option) => {
                    if (option.id_bien === current_bien.id_bien) {
                        asignada = asignada + (option.cantidad_asignada ?? 0)
                        console.log(asignada)
                    } 
                })
                if (action === "editar") {
                    asignada = asignada - ((bien?.cantidad_asignada ?? 0)*2)
                    console.log(asignada, bien?.cantidad_asignada )
                } else{
                    asignada = asignada - (bien?.cantidad_asignada ?? 0)

                }

                if ((data.cantidad_asignada??0) <= Math.abs(((current_bien.cantidad_restante ?? 0) - asignada)))
                {   
                    const vivero: IObjNursery | undefined = nurseries.find((p) => p.id_vivero === data.id_vivero);
                    const new_bien: IObjDistribucion = {
                        id_distribucion_item_despacho_entrante: null,
                        id_vivero: data.id_vivero,
                        id_bien: current_bien.id_bien,
                        cantidad_asignada: Number(data.cantidad_asignada),
                        cod_etapa_lote_al_ingresar: (get_values_bien("es_semilla_vivero") !== false)?"G":data.cod_etapa_lote_al_ingresar,
                        id_item_despacho_entrante: get_values_bien("id_item_despacho_entrante"),
                        vivero_nombre: vivero?.nombre ?? "",
                        unidad_medida: current_bien.unidad_medida ?? "",
                        codigo_bien: current_bien.codigo_bien ?? "",
                        nombre_bien: current_bien.nombre_bien ?? "",
                    }
                    if (bien === undefined) {
                        
                        set_aux_items_distribuidos([...aux_items_distribuidos, new_bien])
                    } else {
                        if (action === "editar") {
                            const aux_items: IObjDistribucion[] = []
                            aux_items_distribuidos.forEach((option) => {
                                if (option.id_bien === current_bien.id_bien && option.id_vivero === data.id_vivero) {
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
                } else{
                control_error("La cantidad asignada debe ser maximo "+ String(Math.abs(((current_bien.cantidad_restante ?? 0) - asignada))))
                }
            } else{
                control_error("Codigo de bien no coincide con el seleccionado")
            }
        } else{
            control_error("Debe seleccionar el bien")
        }
    };

    const edit_bien_distribuido = (item: IObjDistribucion): void => {
        const bien: IObjItem| undefined = items_despacho.find((p: IObjItem) => p.id_item_despacho_entrante === item.id_item_despacho_entrante)
        if(bien !== undefined){
            dispatch(set_current_bien(bien))
        }
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
                            rules: {required_rule: { rule: true, message: "Codigo bien requerido" }},
                            label: "Codigo bien",
                            type: "number",
                            disabled: true,
                            helper_text: "",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_bien,
                            control_name: "nombre_bien",
                            default_value: "",
                            rules: {required_rule: { rule: true, message: "Debe seleccionar un bien" }},
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
                            rules: {required_rule: { rule: true, message: "Debe seleccionar un bien" }},
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
                            md: 3,
                            control_form: control_distribucion,
                            control_name: "id_vivero",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Seleccione vivero" } },
                            label: "Vivero",
                            disabled: action === "editar",
                            helper_text: "debe seleccionar campo",
                            select_options: nurseries,
                            option_label: "nombre",
                            option_key: "id_vivero",
                        },
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_distribucion,
                            control_name: "cod_etapa_lote_al_ingresar",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Seleccione etapa de material vegetal" } },
                            label: "Etapa a ingresar",
                            disabled: action === "editar",
                            helper_text: "debe seleccionar campo",
                            select_options: [{label: "Producción", value: "P"}, {label: "Distribución", value: "D"}],
                            option_label: "label",
                            option_key: "value",
                            hidden_text: get_values_bien("es_semilla_vivero") !== false
                        }, 
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_distribucion,
                            control_name: "cantidad_asignada",
                            default_value: "",
                            rules: {required_rule: { rule: true, message: "Ingrese cantidad" }, min_rule: { rule: 0.01, message: "Cantidad debe ser mayor que 0" } },
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
                            rules: {required_rule: { rule: true, message: "Debe seleccionar bien" }},
                            label: "Unidad",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },

                    ]}
                    show_inputs= {(current_despacho.distribucion_confirmada !== true ?? true)}
                    title_list= {(current_despacho.distribucion_confirmada ?? false)?'Bienes distribuidos':'Bienes pre-distribuidos'}
                    list={aux_items_distribuidos}
                    add_item_list={handle_submit_distribucion(on_submit_distribucion)}
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
                
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarBienDistribuir;