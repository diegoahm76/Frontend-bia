import { useEffect, useState, } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Grid } from '@mui/material';
import FormButton from "../../../../../components/partials/form/FormButton";
import SaveIcon from '@mui/icons-material/Save';
import type { AuthSlice } from '../../../../auth/interfaces';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import SearchIcon from '@mui/icons-material/Search';
import { set_current_entrega, set_persona_entrega, } from '../store/slice/indexEntrega';
import { annul_despacho_service, crear_entrega, editar_entrega, get_bien_entrega_services, get_bienes_entrada, get_entregas_services, get_num_entrega, get_person_id_entrega, get_tipo_entrada } from '../store/thunks/entregaThunks';
import { get_uni_organizacional } from '../../../registroSolicitudesAlmacen/solicitudBienConsumo/store/solicitudBienConsumoThunks';
import type { IEntrega, IObjBienEntrega, IObjEntrada, IObjEntrega } from '../interfaces/entregas';
import SeleccionarEntrada from '../components/SeleccionarEntrada';
import SeleccionarBodega from '../components/SeleccionarBodega';
import ListadoBienesEntrega from '../components/ListadoBienesEntrega';
import Seccion from '../components/SeccionPrimera';
import SeleccionarBienEntrega from '../components/SeleccionarBienEntrega';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import AnularEliminar from '../../../../conservacion/componentes/AnularEliminar';
import { Block } from '@mui/icons-material';
// import Seccion from '../components/SeccionPrimera';



// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const EntregaScreen = () => {
    const { userinfo } = useSelector((state: AuthSlice) => state.auth);
    const { control: control_entrega, reset: reset_entrega, getValues: get_values, handleSubmit: handle_submit } = useForm<IObjEntrega>();
    const { control: control_entrada_entrega, reset: reset_entrada_entrega } = useForm<IObjEntrada>();
    const [action, set_action] = useState<string>('Guardar');
    const { nro_entrega, current_entrega, persona_entrega, current_entrada, bienes_entrega, } = useAppSelector((state: { entrega_otros: IEntrega; }) => state.entrega_otros);
    const { bodega_seleccionada } = useAppSelector((state: { bodegas: any }) => state.bodegas);
    const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
    const handle_open_select_model = (): void => { set_open_search_modal(true); };
    const dispatch = useAppDispatch();


    useEffect(() => {
        // console.log(current_solicitud)
        console.log(current_entrega);
        reset_entrega(current_entrega);
        if ('persona_crea' in current_entrega) {
            reset_entrega(current_entrega);
        } else {
            if (
                current_entrega.id_persona_despacha !== null &&
                current_entrega.id_persona_despacha !== undefined
            )
                void dispatch(
                    get_person_id_entrega(current_entrega.id_persona_despacha)
                ); // get persona entrega
        }
        if
            (
            current_entrega.id_entrada_almacen_cv !== null && current_entrega.id_entrada_almacen_cv !== undefined
        ) {
            void dispatch(get_bien_entrega_services(current_entrega.id_despacho_consumo))
        }
    }, [current_entrega]);



    useEffect(() => {
        void dispatch(get_uni_organizacional());
        void dispatch(get_num_entrega())
        void dispatch(get_tipo_entrada())
        void dispatch(get_entregas_services());
        dispatch(
            set_persona_entrega({
                nombre_completo: userinfo.nombre,
                id_persona: userinfo.id_persona,
            })
        );
    }, []);

    useEffect(() => {
        dispatch(
            set_current_entrega({
                ...current_entrega,
                id_persona_despacha: persona_entrega.id_persona,
                persona_crea: persona_entrega.nombre_completo ?? '',
            })
        );
    }, [persona_entrega]);

    useEffect(() => {
        dispatch(
            set_current_entrega({
                ...current_entrega,
                numero_despacho_consumo: nro_entrega,
                id_persona_despacha: persona_entrega.id_persona,
                persona_crea: persona_entrega.nombre_completo ?? '',
            })
        );
    }, [nro_entrega]);

    // entrada 
    useEffect(() => {
        if (current_entrada.id_entrada_almacen !== null && current_entrada.id_entrada_almacen !== undefined) {
            void dispatch(get_bienes_entrada(current_entrada.id_entrada_almacen));
            console.log(current_entrada)
        }
        reset_entrada_entrega(current_entrada)
    },
        [current_entrada]);

    const on_submit = (data: IObjEntrega): void => {
        const form_data: any = new FormData();
        if (
            current_entrega.id_despacho_consumo !== null &&
            current_entrega.id_despacho_consumo !== undefined
        ) {
            set_action('editar');

            const aux_items: IObjBienEntrega[] = [];
            bienes_entrega.forEach((element: IObjBienEntrega, index: number) => {
                aux_items.push({ ...element, numero_posicion_despacho: index });
            });

            form_data.append('data_entrega', JSON.stringify({ ...data }));
            form_data.append('ruta_archivo_doc_con_recibido', data.ruta_archivo_doc_con_recibido);
            form_data.append('data_items_entrega', JSON.stringify(aux_items));

            void dispatch(
                editar_entrega(
                    current_entrega.id_despacho_consumo,
                    form_data)
            );
        } else {
            set_action('crear');
            const fecha = new Date(data.fecha_despacho ?? '').toISOString();

            const data_edit: IObjEntrega = {
                ...data,
                id_bodega_general: bodega_seleccionada.id_bodega,
                fecha_despacho: fecha.slice(0, 10) + ' ' + fecha.slice(11, 19),
                id_entrada_almacen_cv: current_entrada.id_entrada_almacen,
                // ruta_archivo_doc_con_recibido: current_solicitud.ruta_archivo_info_tecnico,

            };
            const aux_items: IObjBienEntrega[] = [];
            bienes_entrega.forEach((element: IObjBienEntrega, index: number) => {
                aux_items.push({ ...element, numero_posicion_despacho: index });
            });
            const aux = {
                data_entrega: {
                    ...data_edit,
                },
                ruta_archivo_doc_con_recibido: data.ruta_archivo_doc_con_recibido,
                data_items_entrega: aux_items,
            };
            console.log(aux);
            form_data.append('data_entrega', JSON.stringify({ ...data_edit }));
            form_data.append(
                'ruta_archivo_doc_con_recibido',
                data.ruta_archivo_doc_con_recibido
            );
            form_data.append('data_items_entrega', JSON.stringify(aux_items));
            void dispatch(
                crear_entrega(form_data)
            );
        }
    };
    const on_submit_annul = (data: IObjEntrega): void => {
        const data_annul = {
            justificacion_anulacion: data.justificacion_anulacion,
        };
        console.log(data_annul);
        if (
            current_entrega.id_despacho_consumo !== null &&
            current_entrega.id_despacho_consumo !== undefined
        ) {
            void dispatch(
                annul_despacho_service(
                    current_entrega.id_despacho_consumo,
                    data_annul)
            );
        }
    };


    return (

        <Grid
            container
            spacing={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',

            }}
        >
            <Grid item xs={12} marginY={2}>
                <Seccion
                    control_entrega={control_entrega}
                    get_values={get_values}
                    open_modal={open_search_modal}
                    set_open_modal={set_open_search_modal}

                />
            </Grid>
            <Grid item xs={12} marginY={2}>
                <SeleccionarEntrada
                    control_entrada_entrega={control_entrada_entrega}
                    get_values={get_values}

                />
            </Grid>
            <Grid item xs={12} marginY={2}>
                <SeleccionarBodega
                />
            </Grid>
            <Grid item xs={12} marginY={2}>

                <ListadoBienesEntrega />
            </Grid>
            <Grid item xs={12} marginY={2}>

                <SeleccionarBienEntrega />
            </Grid>
            <Grid
                container
                direction="row"
                padding={2}
                spacing={2}
            >

                <Grid item xs={12} md={2}>
                    <FormButton
                        variant_button="contained"
                        on_click_function={handle_submit(on_submit)}
                        icon_class={<SaveIcon />}
                        label={action}
                        type_button="button"
                    />
                </Grid>
                <Grid item xs={6} md={2}>
                    <FormButton
                        variant_button="contained"
                        on_click_function={handle_open_select_model}
                        icon_class={<SearchIcon />}
                        label={'Buscar entrega'}
                        type_button="button"
                        disabled={false}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <AnularEliminar
                        action={
                            current_entrega.despacho_anulado === true
                                ? 'Detalle anulación'
                                : 'Anular'
                        }
                        button_icon_class={<Block />}
                        button_disabled={false}
                        modal_title={
                            current_entrega.despacho_anulado === true
                                ? 'Detalle anulación'
                                : 'Anular despacho'
                        }
                        button_submit_label={'Anular'}
                        button_submit_disabled={current_entrega.despacho_anulado}
                        button_submit_icon_class={<Block />}
                        button_submit_action={handle_submit(on_submit_annul)}
                        modal_inputs={[
                            {
                                datum_type: 'input_controller',
                                xs: 12,
                                md: 4,
                                control_form: control_entrada_entrega,
                                control_name: 'numero_despacho_consumo',
                                default_value: '',
                                rules: {},
                                label: 'Numero despacho',
                                type: 'number',
                                disabled: true,
                                helper_text: '',
                            },
                            {
                                datum_type: 'input_controller',
                                person: true,
                                xs: 12,
                                md: 4,
                                control_form: control_entrada_entrega,
                                control_name: 'persona_anula',
                                default_value: '',
                                rules: {
                                    required_rule: {
                                        rule: true,
                                        message: 'Debe seleccionar la personas que la creó',
                                    },
                                },
                                label: 'Anulación realizada por',
                                type: 'text',
                                disabled: true,
                                helper_text: '',
                            },
                            {
                                datum_type: 'date_picker_controller',
                                xs: 12,
                                md: 4,
                                control_form: control_entrada_entrega,
                                control_name: '',
                                default_value: new Date().toString(),
                                rules: { required_rule: { rule: true, message: 'requerido' } },
                                label: 'Fecha actual',
                                type: 'text',
                                disabled: true,
                                helper_text: '',
                            },
                            {
                                datum_type: 'input_controller',
                                xs: 12,
                                md: 12,
                                control_form: control_entrada_entrega,
                                control_name: 'justificacion_anulacion',
                                default_value: '',
                                rules: {
                                    required_rule: {
                                        rule: true,
                                        message: 'Observación requerida',
                                    },
                                },
                                label: 'Justificacion',
                                type: 'text',
                                multiline_text: true,
                                rows_text: 4,
                                disabled: false,
                                helper_text: '',
                            },
                        ]}
                    />


                </Grid>
                <Grid item xs={12} md={2}>
                    <ButtonSalir
                    />
                </Grid>


                <Grid item xs={6} md={3}>

                    {/* <Button
                        variant="outlined"
                        onClick={() => {
                            set_anular("Anular")
                            set_anular_solicitud(true);
                        }}


                    >
                        ANULACIÓN DE SOLICITUDES DE CONSUMO
                    </Button> */}


                </Grid>
                {/* <AnularSolicitudModal
                    is_modal_active={anular_solicitud}
                    set_is_modal_active={set_anular_solicitud}
                    action={anular}
                    control_solicitud={control_solicitud}
                    get_values={get_values}
                    on_submit={handle_submit(on_submit_anular)}
                /> */}
            </Grid>
        </Grid>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default EntregaScreen;

