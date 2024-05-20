/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Avatar, Button, Chip, Grid, IconButton, Tooltip, } from '@mui/material';
import { Title } from '../../../../components/Title';
import FormSelectController from '../../../../components/partials/form/FormSelectController';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import type { IObjDestinatario, } from '../interfaces/alerta';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { get_uni_organizacional } from '../../../almacen/registroSolicitudesAlmacen/solicitudBienConsumo/store/solicitudBienConsumoThunks';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { crear_persona, eliminar_persona_alerta, get_busqueda_persona, get_perfil_sistema, get_persona_alerta, get_tipo_doc } from '../store/thunks/alertas';
import FormInputController from '../../../../components/partials/form/FormInputController';
import { LoadingButton } from '@mui/lab';
import BusquedaAvanzada from './Busqueda';

// eslint-disable-next-line @typescript-eslint/naming-convention
const Destinatario = () => {

    const { control: control_destinatario, handleSubmit: handle_submit, getValues: get_values, reset: reset_destinario } = useForm<IObjDestinatario>();

    const { unidad_organizacional } = useAppSelector((state: { solic_consumo: any; }) => state.solic_consumo);
    const { current_configuracion, destinatario, perfil_sistema, tipo_documento, current_destinatario } = useAppSelector((state) => state.alerta);
    const [lider, set_lider] = useState(false);
    const [open_modal, set_open_modal] = useState(false);
    const [profesional, set_profesional] = useState(false);
    const [persona, set_persona] = useState(false);
    const dispatch = useAppDispatch();



    const colums_persona_alerta: GridColDef[] = [
        {
            field: 'destinatario',
            headerName: 'DESTINATARIO',
            width: 250,
            valueGetter: (params) => params.row.datos_reordenados.destinatario,
        },
        {
            field: 'detalle',
            headerName: 'DETALLE',
            width: 250,
            valueGetter: (params) => params.row.datos_reordenados.detalle,
        },
        {
            field: 'nombre',
            headerName: 'NOMBRE',
            width: 250,
            valueGetter: (params) => params.row.datos_reordenados.nombre,
        },
        {
            field: 'principal',
            headerName: 'PRINCIPAL',
            width: 250,
            renderCell: (params) => {

                return params.row.es_responsable_directo === true ? (
                    <Chip size="small" label="Si" color="success" variant="outlined" />
                ) : (
                    <Chip size="small" label="No" color="error" variant="outlined" />
                );
            },
        },
        {
            field: 'acciones',
            headerName: 'ACCIONES',
            width: 250,
            renderCell: (params) => (
                <>


                    <Tooltip title="Eliminar">
                        <IconButton
                            onClick={() => {
                                dispatch(eliminar_persona_alerta(params.row.id_persona_alertar, current_configuracion.cod_clase_alerta ?? ''))
                                //  console.log('')(params.row)
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
                                    sx={{ color: 'error.main', width: '18px', height: '18px' }}
                                />

                            </Avatar>
                        </IconButton>
                    </Tooltip>

                </>
            ),

        },

    ];


    const handle_busqueda = (destinatario_busqueda: IObjDestinatario) => {
        reset_destinario(destinatario_busqueda)
        //  console.log('')(destinatario_busqueda)

    };
    //  console.log('')(destinatario)
    //  console.log('')(current_destinatario)

    const handle_lider = () => {
        set_lider(true);
        set_profesional(false);
        set_persona(false);

    }
    const handle_profesional = () => {
        set_profesional(true);
        set_lider(false);
        set_persona(false);
    }

    const handle_persona = () => {
        set_persona(true);
        set_profesional(false);
        set_lider(false);
    }
    const handle_buscar = () => {
        set_open_modal(true);
    };
    const handle_close_buscar = () => {
        set_open_modal(false);
    };


    useEffect(() => {
        if (current_configuracion.cod_clase_alerta !== null && current_configuracion.cod_clase_alerta !== undefined) {
            void dispatch(get_persona_alerta(current_configuracion.cod_clase_alerta))
        }

    }, [current_configuracion.cod_clase_alerta])


    useEffect(() => {

        void dispatch(get_uni_organizacional())
        void dispatch(get_perfil_sistema())
        void dispatch(get_tipo_doc())


    }, [])


    const on_submit_mostrar_busqueda = (data: IObjDestinatario): void => {
        //  console.log('')(data)
        void dispatch(get_busqueda_persona(data.tipo_documento ?? '', data.numero_documento ?? ''));


    }

    useEffect(() => {
        reset_destinario(current_destinatario)
    }, [current_destinatario])



    const on_submit_programar = (data: IObjDestinatario): void => {
        //  console.log('')(data)
        const data_programar = {
            ...data,
            cod_clase_alerta: current_configuracion.cod_clase_alerta,
        };

        void dispatch(crear_persona(data_programar));
        void dispatch(get_persona_alerta(current_configuracion.cod_clase_alerta ?? ''))

    }


    return (
        <Grid
            container
            spacing={2}
            m={2}
            p={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                m: '10px 0 20px 0',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >
            <Grid item xs={12}>
                <Title title="Destinatario" />
            </Grid>

            <Grid item >
                <Button variant="contained"
                    color="primary"
                    onClick={handle_lider}>
                    A LIDER DE UNIDAD
                </Button>
            </Grid>
            <Grid item >
                <Button variant="contained"
                    color="primary"
                    onClick={handle_profesional}>
                    A PERFIL PROFESIONAL
                </Button>
            </Grid>
            <Grid item >
                <Button variant="contained"
                    color="primary"
                    onClick={handle_persona}>
                    A PERSONA ESPECIFICA
                </Button>
            </Grid>


            {lider && (
                <Grid item xs={12}>
                    <FormSelectController
                        xs={12}
                        md={6}
                        control_form={control_destinatario}
                        control_name={'id_unidad_org_lider'}
                        default_value=''
                        rules={{}}
                        disabled={false}
                        helper_text=''
                        select_options={unidad_organizacional}
                        option_label='nombre_unidad_org_actual_admin_series'
                        option_key='id_unidad_organizacional'
                        multiple={false}
                        hidden_text={false}
                        auto_focus={false}
                        label={'Unidad Organizacional'} />
                </Grid>
            )}
            {profesional && (
                <Grid item xs={12}>
                    <FormSelectController
                        xs={12}
                        md={6}
                        control_form={control_destinatario}
                        control_name={'perfil_sistema'}
                        default_value=''
                        rules={{}}
                        disabled={false}
                        helper_text=''
                        select_options={perfil_sistema}
                        option_label='label'
                        option_key='value'
                        multiple={false}
                        hidden_text={false}
                        auto_focus={false}
                        label={'Perfiles del Sistema'} />
                </Grid>
            )}

            {persona && (

                <Grid item container spacing={2} >
                    <FormSelectController
                        xs={12}
                        md={2}
                        control_form={control_destinatario}
                        control_name={'tipo_documento'}
                        default_value=''
                        rules={{ required_rule: { rule: true, message: 'Debe seleccionar tipo de documento' } }}
                        disabled={false}
                        helper_text=''
                        select_options={tipo_documento}
                        option_label='label'
                        option_key='value'
                        multiple={false}
                        hidden_text={false}
                        auto_focus={false}
                        label={'Tipo de documento'} />



                    <FormInputController
                        xs={12}
                        md={2}
                        control_form={control_destinatario}
                        control_name="numero_documento"
                        default_value=''
                        rules={{ required_rule: { rule: true, message: 'Debe seleccionar número de documento' } }}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={"Número de documento"}
                    />
                    <FormInputController
                        xs={12}
                        md={3}
                        control_form={control_destinatario}
                        control_name="nombre_completo"
                        default_value=''
                        rules={{}}
                        type="text"
                        disabled={true}
                        helper_text=""
                        hidden_text={null}
                        label={"Nombre completo"}
                    />


                    <Grid item xs={12} sm={2}>
                        <LoadingButton
                            variant="contained"
                            onClick={handle_submit(on_submit_mostrar_busqueda)}
                            disabled={false}
                        >
                            Buscar
                        </LoadingButton>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <LoadingButton
                            variant="outlined"
                            onClick={handle_buscar}
                            disabled={false}
                        >
                            Busqueda avanzada
                        </LoadingButton>
                    </Grid>
                </Grid>

            )
            }
            {open_modal && (
                <Grid item xs={12} marginY={1}>
                    <BusquedaAvanzada
                        control_destinatario={control_destinatario}
                        open={open_modal}
                        handle_close_buscar={handle_close_buscar}
                        get_values={get_values}
                        handle_busqueda={handle_busqueda}
                    />
                </Grid>
            )}


            <Grid item xs={12}>
                <DataGrid
                    autoHeight
                    rows={destinatario}
                    columns={colums_persona_alerta}
                    getRowId={(row) => uuidv4()}
                    pageSize={10}
                    rowsPerPageOptions={[10]} />
            </Grid>

            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Button variant="contained"
                        color="success"
                        onClick={handle_submit(on_submit_programar)}>
                        Guardar
                    </Button>
                </Grid>

            </Grid>

        </Grid >
    );
};

// eslint-disable-next-line no-restricted-syntax
export default Destinatario;