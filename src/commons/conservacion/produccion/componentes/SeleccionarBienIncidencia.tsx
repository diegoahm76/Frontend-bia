
import { useForm } from 'react-hook-form';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import {  type IObjBienes, type IObjPreparacionBienes } from "../interfaces/produccion";
import { set_current_bien, set_bienes, set_preparacion_bienes } from '../store/slice/produccionSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { get_bienes_service, control_error } from '../store/thunks/produccionThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBienPreparacion = () => {

 
    const { control: control_bien, reset: reset_bien, getValues: get_values_bien} = useForm<IObjBienes>();
    const { control: control_preparacion, handleSubmit:handle_submit_preparacion, reset: reset_preparacion } = useForm<IObjPreparacionBienes>();
   
    const [action, set_action] = useState<string>("agregar");
    const [aux_insumos, set_aux_insumos] = useState<IObjPreparacionBienes[]>([]);
    const {  bienes, current_nursery, current_bien, preparacion_bienes } = useAppSelector((state) => state.produccion);

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
            field: 'cantidad_disponible_bien',
            headerName: 'Saldo disponible',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
    ];

    const columns_bienes_preparacion: GridColDef[] = [
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
            field: 'cantidad_a_consumir',
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
                                onClick={() => {
                                    edit_bien_preparacion(params.row)

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
                                    delete_bien_preparacion(params.row)
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

    const get_bienes: any = (async () => {
        const id_vivero = current_nursery.id_vivero
        if (id_vivero !== null && id_vivero !== undefined) {
            const codigo_bien = get_values_bien("codigo_bien") ?? ""
            const nombre = get_values_bien("nombre_bien")??""
            void dispatch(get_bienes_service(id_vivero, codigo_bien, nombre));
        }
    })

    useEffect(() => {
        // const id_vivero = current_nursery.id_vivero
        // if (id_vivero !== null && id_vivero !== undefined) {
        //     void dispatch(get_goods_service(id_vivero));
        // }
        set_action("agregar")
    }, [current_nursery]);

    useEffect(() => {
        set_aux_insumos(preparacion_bienes)
    }, [preparacion_bienes]);

    useEffect(() => {
        dispatch(set_preparacion_bienes(aux_insumos))
    }, [aux_insumos]);

    useEffect(() => {
        reset_bien(current_bien)
        set_action("agregar")
    }, [current_bien]);

    const on_submit_preparacion = (data: IObjPreparacionBienes): void => {   
        if(current_bien.id_bien !== null){
            if(get_values_bien("codigo_bien") === current_bien.codigo_bien){
                const bien: IObjPreparacionBienes | undefined = aux_insumos.find((p) => p.id_bien === current_bien.id_bien )
                let asignada = 0
                aux_insumos.forEach((option) => {
                    if (option.id_bien !== bien?.id_bien ) {
                        asignada = asignada + (option.cantidad_a_consumir ?? 0)
                    }
                })

                if ((data.cantidad_a_consumir??0) <= (current_bien.cantidad_disponible_bien ?? 0))
                {  
                    const new_bien: IObjPreparacionBienes = {
                        id_bien: current_bien.id_bien,
                        id_mezcla: null,
                        id_vivero: current_nursery.id_vivero,
                        nombre: current_bien.nombre_bien,
                        codigo_bien: current_bien.codigo_bien,
                        unidad_medida: current_bien.unidad_disponible,
                        tipo_bien: current_bien.tipo_bien,
                        cantidad_a_consumir: Number(data.cantidad_a_consumir),
                        saldo_disponible: current_bien.cantidad_disponible_bien,
                        observaciones: data.observaciones,
                    }
                    if (bien === undefined) {
                            set_aux_insumos([...aux_insumos, new_bien])
                            const restante = (current_bien.cantidad_disponible_bien ?? 0) - (new_bien.cantidad_a_consumir ?? 0) 
                            dispatch(set_current_bien({...current_bien, cantidad_disponible_bien: restante}))
                            reset_preparacion({id_bien: current_bien?.id_bien, cantidad_a_consumir: null, observaciones: null});
                       
                    } else {
                        if (action === "editar") {
                            const aux_items: IObjPreparacionBienes[] = []
                            aux_insumos.forEach((option) => {
                                if (option.id_bien === current_bien.id_bien) {
                                    aux_items.push(new_bien)
                                } else {
                                    aux_items.push(option)
                                }
                            })
                            set_aux_insumos(aux_items)
                            const restante = (current_bien.cantidad_disponible_bien ?? 0) - (new_bien.cantidad_a_consumir ?? 0) 
                            dispatch(set_current_bien({...current_bien, cantidad_disponible_bien: restante}))
                            reset_preparacion({id_bien: current_bien?.id_bien, cantidad_a_consumir: null, observaciones: null});
                            set_action("agregar")
                        } else {
                            control_error("El bien ya fue agregado")
                        }
                    }
                } else{
                    control_error("La cantidad asignada debe ser maximo "+ String(current_bien.cantidad_disponible_bien))
                    }
            } else{
                control_error("Codigo de bien no coincide con el seleccionado")
            }
        } else{
            control_error("Debe seleccionar el bien")
        }
    };

    const edit_bien_preparacion = (item: IObjPreparacionBienes): void => {
        set_action("editar")
        const bien: IObjBienes | undefined =bienes.find((p: IObjBienes) => p.id_bien === item.id_bien)
        const item_bien = aux_insumos.find((p) => p.id_bien === item.id_bien)
        reset_preparacion(item_bien)
        const aux_items: IObjPreparacionBienes[] = []
        aux_insumos.forEach((option) => {
            if (option.id_bien !== item.id_bien) {
                aux_items.push(option)
            }
        })
        if(bien !== undefined){
            dispatch(set_current_bien(bien))
        }
        set_aux_insumos(aux_items)
    };

    const delete_bien_preparacion = (item: IObjPreparacionBienes): void => {
        const bien: IObjBienes | undefined =bienes.find((p: IObjBienes) => p.id_bien === item.id_bien)
        if(bien !== undefined){
            dispatch(set_current_bien(bien))
        }
        reset_preparacion({id_bien: bien?.id_bien, cantidad_a_consumir: null, observaciones: null});
        const aux_items: IObjPreparacionBienes[] = []
        aux_insumos.forEach((option) => {
            if (option.id_bien !== item.id_bien) {
                aux_items.push(option)
            }
        })
        set_aux_insumos(aux_items)
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
                columns_model={columns_bienes}
                models={bienes}
                get_filters_models={get_bienes}
                set_models={set_bienes}
                button_submit_label='Buscar insumo'
                form_inputs={[
                    {
                        datum_type: "title",
                        title_label: "Seleccionar insumo"
                    },
                    {
                        datum_type: "input_controller",
                        xs: 12,
                        md: 3,
                        control_form: control_bien,
                        control_name: "codigo_bien",
                        default_value: "",
                        rules: { required_rule: { rule: true, message: "Codigo bien requerido" } },
                        label: "Codigo bien",
                        type: "text",
                        disabled: false,
                        helper_text: "",
                    },
                    {
                        datum_type: "input_controller",
                        xs: 12,
                        md: 6,
                        control_form: control_bien,
                        control_name: "nombre_bien",
                        default_value: "",
                        rules: { required_rule: { rule: true, message: "Debe seleccionar un bien" } },
                        label: "Nombre",
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
                        control_form: control_preparacion,
                        control_name: "cantidad_a_consumir",
                        default_value: "",
                        rules: { required_rule: { rule: true, message: "Debe ingresar cantidad" }, min_rule: { rule: 0.01, message: "La cantidad debe ser mayor a 0" }, max_rule: { rule: current_bien.cantidad_disponible_bien, message: 'La cqantidad no debe ser mayor que '+ String(current_bien.cantidad_disponible_bien) }},
                        label: "Cantidad Usada",
                        type: "text",
                        disabled: false,
                        helper_text: ""
                    },
                    {
                        datum_type: "input_controller",
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: "cantidad_disponible_bien",
                        default_value: "",
                        rules: { required_rule: { rule: true, message: "Debe seleccionar un bien" } },
                        label: "Cantidad disponible",
                        type: "text",
                        disabled: true,
                        helper_text: ""
                    },
                    {
                        datum_type: "input_controller",
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: "unidad_disponible",
                        default_value: "",
                        rules: { required_rule: { rule: true, message: "Debe seleccionar un bien" } },
                        label: "Unidad",
                        type: "text",
                        disabled: true,
                        helper_text: ""
                    },
                    {
                        datum_type: "input_controller",
                        xs: 12,
                        md: 6,
                        control_form: control_preparacion,
                        control_name: "observaciones",
                        default_value: "",
                        rules: { required_rule: { rule: true, message: "Observación requerida" } },
                        label: "Observacion",
                        type: "text",
                        multiline_text: true,
                        rows_text: 4,
                        disabled: false,
                        helper_text: ""
                      },

                ]}
                title_list='Insumos consumidos'
                list={aux_insumos}
                add_item_list={handle_submit_preparacion(on_submit_preparacion)}
                add_list_button_label={action}
                columns_list={columns_bienes_preparacion}
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
                        label: "Codigo bien",
                        type: "number",
                        disabled: false,
                        helper_text: "",
                    },
                    {
                        datum_type: "input_controller",
                        xs: 12,
                        md: 6,
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
export default SeleccionarBienPreparacion;