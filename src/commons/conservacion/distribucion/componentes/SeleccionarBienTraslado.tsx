
import { useForm } from 'react-hook-form';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { type IObjGoods, type IObjTransferGoods } from "../interfaces/distribucion";
import { set_transfer_goods, set_current_good } from '../store/slice/distribucionSlice';
import { control_error, get_goods_service } from '../store/thunks/distribucionThunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBienSiembra = () => {


    const { control: control_bien, reset: reset_bien, getValues: get_values_bien} = useForm<IObjGoods>();
    const { control: control_traslado, handleSubmit:handle_submit_traslado, reset: reset_traslado } = useForm<IObjTransferGoods>();
    const [aux_transfer_goods, set_aux_transfer_goods] = useState<IObjTransferGoods[]>([]);
    
    const [action, set_action] = useState<string>("agregar");

    const { current_transfer, goods, transfer_goods, origin_nursery, current_good } = useAppSelector((state) => state.distribucion);
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
            field: 'nombre',
            headerName: 'Nombre',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'agno_lote',
            headerName: 'Año lote',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nro_lote',
            headerName: '# lote',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'cod_etapa_lote',
            headerName: 'Etapa lote',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'saldo_disponible',
            headerName: 'Cantidad disponible',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        

    ];

    const columns_bienes_siembra: GridColDef[] = [
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
            field: 'nombre',
            headerName: 'Nombre',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'agno_lote_origen',
            headerName: 'Año lote origen',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nro_lote_origen',
            headerName: '# lote origen',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'cod_etapa_lote_origen',
            headerName: 'Etapa origen',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        
        {
            field: 'cantidad_a_trasladar',
            headerName: 'Cantidad  a trasladar',
            width: 140,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'altura_lote_destion_en_cms',
            headerName: 'Altura final',
            width: 140,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'agno_lote_destino_MV',
            headerName: 'Año lote destino',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nro_lote_destino_MV',
            headerName: '# lote destino',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'cod_etapa_lote_destino_MV',
            headerName: 'Etapa destino',
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
                                    edit_bien_traslado(params.row)

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
                                    delete_bien_traslado(params.row)
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
        const id_vivero = origin_nursery.id_vivero
        if (id_vivero !== null && id_vivero !== undefined) {
            const codigo_bien = get_values_bien("codigo_bien") ?? ""
            const nombre = get_values_bien("nombre")??""
            const tipo_bien = get_values_bien("cod_tipo_elemento_vivero")??""
            void dispatch(get_goods_service(id_vivero, codigo_bien, nombre, tipo_bien));
        }
    })

    useEffect(() => {
        // const id_vivero = origin_nursery.id_vivero
        // if (id_vivero !== null && id_vivero !== undefined) {
        //     void dispatch(get_goods_service(id_vivero));
        // }
        set_action("agregar")
    }, [origin_nursery]);

    useEffect(() => {
        set_aux_transfer_goods(transfer_goods)
    }, [transfer_goods]);

    useEffect(() => {
        dispatch(set_transfer_goods(aux_transfer_goods))
    }, [aux_transfer_goods]);

    useEffect(() => {
        reset_bien(current_good)
        set_action("agregar")
    }, [current_good]);
    
    const on_submit_traslado = (data: IObjTransferGoods): void => {   
        if(current_good.id_bien !== null){
            if(get_values_bien("codigo_bien") === current_good.codigo_bien){
                const bien: IObjTransferGoods | undefined = aux_transfer_goods.find((p) => p.id_bien_origen === current_good.id_bien )
                let asignada = 0
                aux_transfer_goods.forEach((option) => {
                    if (option.id_bien_origen !== bien?.id_bien_origen ) {
                        asignada = asignada + (option.cantidad_a_trasladar ?? 0)
                    }
                })
                if ((data.cantidad_a_trasladar??0) <= (current_good.saldo_disponible ?? 0))
                {  
                    const new_bien: IObjTransferGoods = {
                        id_item_traslado_viveros: null,
                        agno_lote_origen: current_good.agno_lote,
                        nro_lote_origen: current_good.nro_lote,
                        cod_etapa_lote_origen: current_good.cod_etapa_lote,
                        agno_lote_destino_MV: data.agno_lote_destino_MV,
                        nro_lote_destino_MV: data.nro_lote_destino_MV ?? null,
                        cod_etapa_lote_destino_MV: data.cod_etapa_lote_destino_MV,
                        cantidad_a_trasladar: Number(data.cantidad_a_trasladar),
                        altura_lote_destion_en_cms: Number(data.altura_lote_destion_en_cms),
                        id_traslado: current_transfer.id_traslado,
                        id_bien_origen: current_good.id_bien,
                        codigo_bien: current_good.codigo_bien,
                        nombre: current_good.nombre,
                        es_semilla_vivero: current_good.es_semilla_vivero,
                        nro_posicion: null
                    }

                    if (bien === undefined) {
                            set_aux_transfer_goods([...aux_transfer_goods, new_bien])
                            const restante = (current_good.saldo_disponible ?? 0) - (new_bien.cantidad_a_trasladar ?? 0) 
                            dispatch(set_current_good({...current_good, saldo_disponible: restante}))
                        
                    } else {
                        if (action === "editar") {
                            const aux_items: IObjTransferGoods[] = []
                            aux_transfer_goods.forEach((option) => {
                                if (option.id_bien_origen === current_good.id_bien) {
                                    aux_items.push(new_bien)
                                } else {
                                    aux_items.push(option)
                                }
                            })
                            set_aux_transfer_goods(aux_items)
                            const restante = (current_good.saldo_disponible ?? 0) - (new_bien.cantidad_a_trasladar ?? 0) 
                            dispatch(set_current_good({...current_good, saldo_disponible: restante}))
                            set_action("agregar")
                        } else {
                            control_error("El bien ya fue agregado")
                        }
                    }
                } else{
                    control_error("La cantidad asignada debe ser maximo "+ String(current_good.saldo_disponible))
                    }
            } else{
                control_error("Codigo de bien no coincide con el seleccionado")
            }
        } else{
            control_error("Debe seleccionar el bien")
        }
    };

    const edit_bien_traslado = (item: IObjTransferGoods): void => {
        set_action("editar")
        const bien: IObjGoods | undefined =goods.find((p: IObjGoods) => p.id_bien === item.id_bien_origen)
        const item_bien = aux_transfer_goods.find((p) => p.id_bien_origen === item.id_bien_origen)
        reset_traslado(item_bien)
        const aux_items: IObjTransferGoods[] = []
        let restante = 0 
        aux_transfer_goods.forEach((option) => {
            if (option.id_bien_origen !== item.id_bien_origen) {
                aux_items.push(option)
            }
        })
        if(bien !== undefined){
            restante = (bien.saldo_disponible ?? 0) + (item_bien?.cantidad_a_trasladar?? 0)
            dispatch(set_current_good({...bien, saldo_disponible: restante}))
        }
        set_aux_transfer_goods(aux_items)
    };

    const delete_bien_traslado = (item: IObjTransferGoods): void => {
        const aux_items: IObjTransferGoods[] = []
        aux_transfer_goods.forEach((option) => {
            if (option.id_bien_origen !== item.id_bien_origen) {
                aux_items.push(option)
            }
        })
        set_aux_transfer_goods(aux_items)
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
                    set_current_model={set_current_good}
                    row_id={"id_inventario_vivero"}
                    columns_model={columns_bienes}
                    models={goods}
                    get_filters_models={get_bienes}
                    set_models={set_transfer_goods}
                    button_submit_label='Buscar bien'
                    button_submit_disabled= {origin_nursery.id_vivero === null}
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
                            rules: { required_rule: { rule: true, message: "Codigo bien requerido" } },
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
                            control_name: "nombre",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Debe seleccionar un bien" } },
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
                            control_name: "saldo_disponible",
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
                            md: 3,
                            control_form: control_bien,
                            control_name: "agno_lote",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "Debe seleccionar un bien" } },
                            label: "Año lote",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_bien,
                            control_name: "cod_etapa_lote",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Etapa de lote",
                            helper_text: "",
                            disabled: true,
                            select_options: [{ label: "Producción", value: "P" }, { label: "Distribucción", value: "D" }],
                            option_label: "label",
                            option_key: "value",
                          },
                    ]}
                    form_inputs_list={[
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_traslado,
                            control_name: "cod_etapa_lote_destino_MV",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Etapa de lote destino",
                            helper_text: "debe seleccionar campo",
                            select_options: [{ label: "Producción", value: "P" }, { label: "Distribucción", value: "D" }],
                            option_label: "label",
                            option_key: "value",
                            hidden_text: current_good.es_semilla_vivero !== false
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_traslado,
                            control_name: "altura_lote_destion_en_cms",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Ingrese la altura" } },
                            label: "Altura planta (cms)",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                            hidden_text: current_good.es_semilla_vivero !== false
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_traslado,
                            control_name: "cantidad_a_trasladar",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Ingrese cantidad" }, min_rule: { rule: 0.01, message: "Cantidad debe ser mayor que 0" }, max_rule: { rule: current_good.saldo_disponible, message: "La cantidad disponible es "+String(current_good.saldo_disponible) +"" }  },
                            label: "Cantidad a trasladar",
                            type: "number",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 1,
                            control_form: control_bien,
                            control_name: "unidad_disponible",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Debe seleccionar bien" } },
                            label: "Unidad",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },

                    ]}
                    title_list='Bienes trasladados'
                    list={aux_transfer_goods}
                    add_item_list={handle_submit_traslado(on_submit_traslado)}
                    add_list_button_label={"agregar"}
                    columns_list={columns_bienes_siembra}
                    row_list_id={"id_item_traslado_viveros"}
                    modal_select_model_title='Buscar bien'
                    modal_form_filters={[
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_bien,
                            control_name: "cod_tipo_elemento_vivero",
                            default_value: "",
                            rules: { },
                            label: "Tipo de bien",
                            disabled: false,
                            helper_text: "",
                            select_options: [{label: "Semillas", value: "Semillas"}, {label: "Insumos", value: "Insumos"}, {label: "Plantas", value: "Plantas"}, {label: "Herramientas", value: "Herramientas"}],
                            option_label: "label",
                            option_key: "value",
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
export default SeleccionarBienSiembra;