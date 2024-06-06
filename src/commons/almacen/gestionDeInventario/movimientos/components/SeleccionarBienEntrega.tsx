import { useForm } from 'react-hook-form';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import SeleccionarModeloDialogForm from '../../../../../components/partials/getModels/SeleccionarModeloDialogForm';
import { type GridColDef } from '@mui/x-data-grid';

import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import type {
    IEntrega,
    IObjBien,
    IObjBienEntrega,
    IObjBienesEntrada,
} from '../interfaces/entregas';
import {
    initial_state_bien_selected,
    initial_state_current_bien,
    set_bien_selected,
    set_bienes_entrada,
    set_bienes_entrega,
    set_current_bien,
} from '../store/slice/indexEntrega';
import {
    control_error,
    get_bien_code_service,
} from '../store/thunks/entregaThunks';
import { get_bienes_consumo } from '../../../registroSolicitudesAlmacen/solicitudBienConsumo/store/solicitudBienConsumoThunks';
interface IProps {
    get_values: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBienEntrega = ({ get_values }: IProps) => {
    const {
        control: control_bien,
        reset: reset_bien,
        getValues: get_values_bien,
    } = useForm<IObjBien>();
    const {
        control: control_entrega,
        handleSubmit: handle_submit_entrega,
        reset: reset_entrega,
    } = useForm<IObjBienEntrega>();

    const [bienes_aux, set_bienes_aux] = useState<any>([]);
    const [select_model_is_active, set_select_model_is_active] =
        useState<boolean>(false);
    const [action, set_action] = useState<string>('agregar');
    const [aux_insumos, set_aux_insumos] = useState<IObjBienEntrega[]>([]);
    const [aux_bien_selected, set_aux_bien_selected] =
        useState<IObjBienesEntrada>();

    const dispatch = useAppDispatch();

    const {
        current_bien,
        bienes,
        bien_selected,
        bienes_entrega,
        current_entrega,
        current_entrada,
    } = useAppSelector((state: { entrega_otros: IEntrega; }) => state.entrega_otros);

    // tabla de bienes solicitud de consumo
    const columns_bienes: GridColDef[] = [
        {
            field: 'codigo_bien',
            headerName: 'Código',
            width: 250,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 250,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'bodega',
            headerName: 'Bodega',
            width: 300,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },

        {
            field: 'cantidad_disponible',
            headerName: 'Cantidad disponible',
            width: 250,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
    ];

    // tabla de la entrega realizada
    const columns_bienes_despacho: GridColDef[] = [
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
            field: 'cantidad_despachada',
            headerName: 'Cantidad despachada',
            width: 150,
        },

        {
            field: 'bodega',
            headerName: 'Bodega',
            width: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },

        {
            field: 'observacion',
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
            width: 90,
            renderCell: (params) => (
                <>
                    <Tooltip title="Borrar">
                        <IconButton
                            onClick={() => {
                                delete_bien_entrega(params.row);
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

    const search_bien: any = async () => {
        try {
            const fecha = new Date(get_values('fecha_despacho') ?? '').toISOString();
            //  console.log('')(fecha.slice(0, 10) + ' ' + fecha.slice(11, 19));
            const data = await dispatch(
                get_bien_code_service(
                    bien_selected?.codigo_bien ?? '',
                    fecha.slice(0, 10) + ' ' + fecha.slice(11, 19)
                )
            );
            dispatch(set_bien_selected(initial_state_bien_selected));
            set_bienes_aux(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        //  console.log('')(bienes_aux);
        if ('success' in bienes_aux) {
            if (bienes_aux.success === true) {
                if ('data' in bienes_aux) {
                    if (bienes_aux.data.length > 1) {
                        set_select_model_is_active(true);
                    }
                }
            }
        }
    }, [bienes_aux]);

    useEffect(() => {
        reset_bien(current_bien);
        set_action('agregar');
    }, [current_bien]);

    useEffect(() => {
        if (current_bien.id_bien === null) {
            reset_bien(current_bien);
        }
    }, [current_entrega]);

    useEffect(() => {
        if (bien_selected.id_bien !== null) {
            set_aux_bien_selected(bien_selected);
            //  console.log('')(bien_selected);
            dispatch(set_current_bien(initial_state_current_bien));
            search_bien();
        }
    }, [bien_selected]);
    useEffect(() => {
        if (aux_bien_selected?.id_bien !== null) {
            //  console.log('')(aux_bien_selected);
        }
    }, [aux_bien_selected]);

    useEffect(() => {
        set_aux_insumos(bienes_entrega);
    }, [bienes_entrega]);

    useEffect(() => {
        dispatch(set_bienes_entrega(aux_insumos));
    }, [aux_insumos]);

    const on_submit_entrega = (data: IObjBienEntrega): void => {
        if (current_bien.id_bien !== null) {
            if (get_values_bien('codigo_bien') === current_bien.codigo_bien) {
                const bien: IObjBienEntrega | undefined = aux_insumos.find(
                    (p) =>
                        p.id_bien_despachado === current_bien.id_bien &&
                        p.id_bodega === current_bien.id_bodega
                );
                let asignada = 0;

                aux_insumos.forEach((option) => {
                    if (option.id_bien_despachado === bien?.id_bien_despachado) {
                        asignada = asignada + (option.cantidad_despachada ?? 0);
                    }
                });
                asignada = asignada + Number(data.cantidad_despachada ?? 0);

                if (
                    (data.cantidad_despachada ?? 0) <=
                    (current_bien.cantidad_disponible ?? current_bien.cantidad ?? 0)
                ) {
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    if (asignada <= (aux_bien_selected?.cantidad_disponible ?? 0)) {
                        const new_bien: IObjBienEntrega = {
                            id_item_despacho_consumo: data.id_item_despacho_consumo ?? null,
                            id_entrada_almacen_bien:
                                current_entrada.id_entrada_almacen ?? null,
                            id_bien_despachado: current_bien.id_bien ?? null,
                            id_bien: current_bien.id_bien ?? null,
                            id_despacho_consumo: current_entrega.id_despacho_consumo ?? null,
                            id_bodega: current_bien.id_bodega ?? null,
                            cantidad_despachada: Number(data.cantidad_despachada),
                            observacion: data.observacion,
                            nombre_bien: current_bien.nombre,
                            codigo_bien: current_bien.codigo_bien,
                            unidad_medida: current_bien.unidad_medida ?? null,
                            bodega: current_bien.bodega ?? null,
                        };
                        //  console.log('')(new_bien);
                        if (bien === undefined) {
                            set_aux_insumos([...aux_insumos, new_bien]);
                            const restante =
                                (current_bien.cantidad_disponible ?? 0) -
                                (new_bien.cantidad_despachada ?? 0);
                            dispatch(
                                set_current_bien({
                                    ...current_bien,
                                    cantidad_disponible: restante,
                                })
                            );
                            reset_entrega({
                                id_bien_despachado: current_bien?.id_bien,
                                cantidad_despachada: null,
                                observacion: null,
                            });
                        } else {
                            if (action === 'editar') {
                                const aux_items: IObjBienEntrega[] = [];
                                aux_insumos.forEach((option) => {
                                    if (option.id_bien_despachado === current_bien.id_bien) {
                                        aux_items.push(new_bien);
                                    } else {
                                        aux_items.push(option);
                                    }
                                });
                                set_aux_insumos(aux_items);
                                const restante =
                                    (current_bien.cantidad_disponible ?? 0) -
                                    (new_bien.cantidad_despachada ?? 0);
                                dispatch(
                                    set_current_bien({
                                        ...current_bien,
                                        cantidad_disponible: restante,
                                    })
                                );
                                reset_entrega({
                                    id_bien_despachado: current_bien?.id_bien,
                                    cantidad_despachada: null,
                                    observacion: null,
                                });
                                set_action('agregar');
                            } else {
                                control_error('El bien ya fue agregado');
                            }
                        }
                    } else {
                        control_error(
                            'La cantidad asignada debe ser máximo ' +
                            String(aux_bien_selected?.cantidad_disponible)
                        );
                    }
                } else {
                    control_error(
                        'La cantidad asignada debe ser máximo ' +
                        String(current_bien.cantidad_disponible ?? current_bien.cantidad)
                    );
                }
            } else {
                control_error('Codigo de bien no coincide con el seleccionado');
            }
        } else {
            control_error('Debe seleccionar el bien');
        }
    };

    const delete_bien_entrega = (item: IObjBienEntrega): void => {
        const bien: IObjBien | undefined = bienes.find(
            (p: IObjBien) => p.id_bien === item.id_bien
        );

        if (bien !== undefined) {
            const restante =
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                (bien.cantidad_disponible ?? 0) + (item?.cantidad_despachada ?? 0);
            if (item.id_item_despacho_consumo !== null) {
                dispatch(set_current_bien({ ...bien, cantidad_disponible: restante }));
            } else {
                dispatch(set_current_bien(bien));
            }
        }
        reset_entrega({
            ...item,
            id_bien: bien?.id_bien,
            cantidad_despachada: null,
            observacion: null,
        });
        const aux_items: IObjBienEntrega[] = [];
        aux_insumos.forEach((option) => {
            if (
                !(
                    option.id_bien === item.id_bien && option.id_bodega === item.id_bodega
                )
            ) {
                aux_items.push(option);
            }
        });
        set_aux_insumos(aux_items);
    };

    const get_bienes_filtro: any = (async () => {
        //  console.log('')("buscar...")
        const codigo_bien = get_values_bien("codigo_bien")
        const nombre = get_values_bien("nombre")
        // if (codigo_bien !== null && codigo_bien !== undefined && nombre !== null && nombre !== undefined) {
            //TODO: Validar si este es el service
            void dispatch(get_bienes_consumo(codigo_bien, nombre))
        // }
    })

    return (
        <>
            <Grid container direction="row" padding={2} borderRadius={2}>
                <BuscarModelo
                    set_current_model={set_current_bien}
                    row_id={'id_inventario'}
                    columns_model={columns_bienes}
                    models={bienes}
                    get_filters_models={get_bienes_filtro}
                    set_models={set_bienes_entrada}
                    button_submit_label="Buscar bien"
                    form_inputs={[
                        {
                            datum_type: 'title',
                            title_label: 'Seleccione bien',
                        },
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 3,
                            control_form: control_bien,
                            control_name: 'codigo_bien',
                            default_value: '',
                            rules: {
                                required_rule: {
                                    rule: true,
                                    message: 'Código bien requerido',
                                },
                            },
                            label: 'Código bien',
                            type: 'number',
                            disabled: true,
                            helper_text: '',
                        },

                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 5,
                            control_form: control_bien,
                            control_name: 'nombre',
                            default_value: '',
                            rules: {
                                required_rule: {
                                    rule: true,
                                    message: 'Debe seleccionar un bien',
                                },
                            },
                            label: 'Nombre',
                            type: 'text',
                            disabled: true,
                            helper_text: '',
                        },
                    ]}
                    form_inputs_list={[
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 2,
                            control_form: control_entrega,
                            control_name: 'cantidad_despachada',
                            default_value: '',
                            rules: {
                                required_rule: {
                                    rule: true,
                                    message: 'Debe ingresar cantidad',
                                },
                                min_rule: {
                                    rule: 0.01,
                                    message: 'La cantidad debe ser mayor a 0',
                                },
                                max_rule: {
                                    rule: current_bien.cantidad_disponible,
                                    message:
                                        'La cantidad asignada total, debe ser máximo' +
                                        String(current_bien.cantidad_disponible),
                                },
                            },
                            label: 'Cantidad Usada',
                            type: 'number',
                            disabled: false,
                            helper_text: '',
                        },
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 2,
                            control_form: control_bien,
                            control_name: 'cantidad_disponible',
                            default_value: '',
                            rules: {
                                required_rule: {
                                    rule: true,
                                    message: 'Debe seleccionar un bien',
                                },
                            },
                            label: 'Cantidad disponible',
                            type: 'text',
                            disabled: true,
                            helper_text: '',
                        },
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 2,
                            control_form: control_bien,
                            control_name: 'unidad_medida',
                            default_value: '',
                            rules: {
                                required_rule: {
                                    rule: true,
                                    message: 'Debe seleccionar un bien',
                                },
                            },
                            label: 'Unidad',
                            type: 'text',
                            disabled: true,
                            helper_text: '',
                        },
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 2,
                            control_form: control_bien,
                            control_name: 'bodega',
                            default_value: '',
                            rules: {},
                            label: 'Bodega',
                            type: 'text',
                            disabled: true,
                            helper_text: '',
                        },
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 4,
                            control_form: control_entrega,
                            control_name: 'observacion',
                            default_value: '',
                            rules: {
                                required_rule: { rule: true, message: 'Observación requerida' },
                            },
                            label: 'Observacion',
                            type: 'text',
                            disabled: false,
                            helper_text: '',
                        },
                    ]}
                    title_list="Bienes entregados"
                    list={aux_insumos}
                    add_item_list={handle_submit_entrega(on_submit_entrega)}
                    add_list_button_label={action}
                    columns_list={columns_bienes_despacho}
                    row_list_id={'id_item_despacho_consumo'}
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

                <SeleccionarModeloDialogForm
                    set_current_model={set_current_bien}
                    is_modal_active={select_model_is_active}
                    set_is_modal_active={set_select_model_is_active}
                    modal_title={'Seleccionar bodega para despachar'}
                    form_filters={[]}
                    set_models={set_bienes_entrada}
                    get_filters_models={null}
                    models={bienes}
                    columns_model={columns_bienes}
                    row_id={'id_inventario'}
                    title_table_modal={'Resultados de la busqueda'}
                />
            </Grid>
        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarBienEntrega;
