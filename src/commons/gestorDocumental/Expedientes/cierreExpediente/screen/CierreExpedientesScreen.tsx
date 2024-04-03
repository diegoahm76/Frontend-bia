import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, Grid, IconButton, TextField, Tooltip, } from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Title } from '../../../../../components/Title';
import { Controller, useForm } from 'react-hook-form';
import { IObjArchivoExpediente, IObjCierreExpediente as FormValues, IObjExpedientes, IObjCierreExpediente } from '../interfaces/cierreExpedientes';
import FormInputController from '../../../../../components/partials/form/FormInputController';
import { LoadingButton } from '@mui/lab';
import BuscarExpediente from '../components/buscarExpediente';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ArchivoSoporte from '../components/archivoSoporte';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { cerrar_expediente, delete_file, get_archivos_id_expediente } from '../store/thunks/cierreExpedientesthunks';
import FormDatePickerController from '../../../../../components/partials/form/FormDatePickerController';
import { initial_state_current_archivo_expediente, set_current_archivo_expediente } from '../store/slice/indexCierreExpedientes';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CierreExpedientesScreen = () => {
    const { current_archivo_expediente, archivos_por_expedientes } = useAppSelector((state) => state.cierre_expedientes);

    const { control: control_cierre_expediente, getValues: get_values, reset: reset_cierre_expediente, handleSubmit: handle_cierre_expediente } = useForm<IObjCierreExpediente>();
    const { control: control_archivo_expediente, getValues: get_values_archivo, handleSubmit: handle_submit_archivo, reset: reset_archivo_expediente } = useForm<IObjArchivoExpediente>();

    const [open_modal, set_open_modal] = useState(false);
    const [open_modal_archivo, set_open_modal_archivo] = useState(false);
    const [selected_expediente, set_selected_expediente] = useState<IObjExpedientes>();
    const dispatch = useAppDispatch();



    const handle_buscar = () => {
        set_open_modal(true);
    };
    const handle_close_buscar = () => {
        set_open_modal(false);
    };

    const handle_adjuntar_archivo = () => {
        set_open_modal_archivo(true);
        dispatch(set_current_archivo_expediente(initial_state_current_archivo_expediente))
    };
    const handle_close_adjuntar_archivo = () => {
        set_open_modal_archivo(false);
    };


    useEffect(() => {
        reset_archivo_expediente(current_archivo_expediente)
    }, [current_archivo_expediente]);

    const handle_selected_expediente = (expediente: IObjExpedientes) => {
        set_selected_expediente(expediente);

    };

    useEffect(() => {
        //  console.log('')(selected_expediente)
        reset_cierre_expediente(selected_expediente);
    }, [selected_expediente]);




    const handle_selected_arrchivo_expediente = (archivo: IObjArchivoExpediente) => {
        dispatch(set_current_archivo_expediente(archivo));
        set_open_modal_archivo(true);


    };




    useEffect(() => {
        if (selected_expediente && typeof selected_expediente.id_expediente_documental === 'number') {
            //  console.log('')(selected_expediente);
            reset_cierre_expediente(selected_expediente);
            void dispatch(get_archivos_id_expediente(selected_expediente.id_expediente_documental));
        }
    }, [selected_expediente]);

    const columns: GridColDef[] = [
        {
            field: 'orden_en_expediente',
            headerName: 'ÓRDEN AGREGADO',
            sortable: true,
            width: 200,
        },
        {
            field: 'nombre_asignado_documento',
            headerName: 'NOMBRE ASIGNADO',
            sortable: true,
            width: 350,
        },
        {
            field: 'nombre_tipologia',
            headerName: 'TIPOLOGÍA',
            width: 350,
        },
        {
            field: 'Editar',
            headerName: 'EDITAR',
            width: 100,
            renderCell: (params) => (
                <>
                    <Tooltip title="Editar">
                        <Button
                            onClick={() => handle_selected_arrchivo_expediente(params.row)}
                            startIcon={<EditIcon />}
                        >

                        </Button>
                    </Tooltip>

                </>
            ),

        },
        {
            field: 'acciones',
            headerName: 'ELIMINAR',
            width: 100,
            renderCell: (params) => (
                <>

                    <Tooltip title="Eliminar">
                        <Button
                            aria-label="delete"
                            size="small"


                            onClick={() => {
                                if (current_archivo_expediente.id_expediente_documental !== undefined && current_archivo_expediente.id_expediente_documental !== null) {
                                    dispatch(delete_file(params.row.id_documento_de_archivo_exped, current_archivo_expediente.id_expediente_documental))
                                }

                            }}
                        >
                            <DeleteIcon
                                titleAccess="Eliminar"
                                sx={{
                                    color: 'red',
                                    width: '18px',
                                    height: '18px',
                                }}
                            />
                        </Button>
                    </Tooltip>
                </>
            ),

        },


    ];

    const on_submit_cerrar_expediente = (data: FormValues): void => {
        if (selected_expediente && typeof selected_expediente.id_expediente_documental === 'number') {
            const form_data: any = new FormData();
            const current_date = new Date();
            const formatted_date = `${current_date.getFullYear()}-${(current_date.getMonth() + 1).toString().padStart(2, '0')}-${current_date.getDate().toString().padStart(2, '0')}`;
            const formatted_time = `${current_date.getHours().toString().padStart(2, '0')}:${current_date.getMinutes().toString().padStart(2, '0')}:${current_date.getSeconds().toString().padStart(2, '0')}`;
            const formatted_date_time = `${formatted_date} ${formatted_time}`;
            form_data.append('fecha_actual', formatted_date_time);
            form_data.append('id_expediente_doc', selected_expediente.id_expediente_documental)
            form_data.append('justificacion_cierre_reapertura', data.justificacion_cierre_reapertura)
            void dispatch(cerrar_expediente(form_data));

        }



    }


    return (

        <Grid
            container
            spacing={2}
            marginTop={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',

            }}
        >


            <Grid container spacing={2} justifyContent="center">
                <Title title="CIERRE DE EXPEDIENTES" />
                <FormInputController
                    xs={12}
                    md={4}
                    margin={0}
                    control_form={control_cierre_expediente}
                    control_name="titulo_expediente"
                    default_value=''
                    rules={{}}
                    type="text"
                    disabled={true}
                    helper_text=""
                    hidden_text={null}
                    label={"Expediente"}
                />

                <Grid item xs={12} sm={4}>
                    <LoadingButton
                        variant="contained"
                        onClick={handle_buscar}
                        disabled={false}
                    >
                        Buscar
                    </LoadingButton>
                </Grid>


                <FormDatePickerController
                    xs={12}
                    md={3.5}
                    margin={2}
                    control_form={control_cierre_expediente}
                    control_name={'fecha_actual'}
                    default_value={''}
                    rules={{}}
                    label={'Fecha de creación Documento'}
                    disabled={false}
                    format={'YYYY-MM-DD'}
                    helper_text={''}
                />

                {open_modal && (
                    <Grid item xs={12} marginY={1}>
                        <BuscarExpediente
                            control_cierre_expediente={control_cierre_expediente}
                            open={open_modal}
                            handle_close_buscar={handle_close_buscar}
                            get_values={get_values}
                            handle_selected_expediente={handle_selected_expediente}

                        />
                    </Grid>
                )}
            </Grid>

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={11.5} marginTop={2} margin={2}>
                    <Controller
                        name="justificacion_cierre_reapertura"
                        control={control_cierre_expediente}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                multiline
                                label="Observación"
                                variant="outlined"
                                disabled={false}
                                defaultValue={value}
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                                InputProps={{ classes: { input: 'autogrow-input' } }}

                            >

                            </TextField>
                        )}
                    />
                </Grid>
                {selected_expediente?.id_expediente_documental &&
                    <>
                        <Grid item xs={12} sm={6} margin={2}>
                            <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                                <small
                                    style={{
                                        color: 'black',
                                        fontSize: '1rem',

                                    }}
                                >
                                    ARCHIVOS DE SOPORTE
                                </small>
                            </label>
                        </Grid>

                        <Box sx={{ width: '70%' }} >
                            <Title title="RESULTADOS DE LA BÚSQUEDA" />
                            <>
                                <DataGrid
                                    density="compact"
                                    autoHeight
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    rows={archivos_por_expedientes ?? []}
                                    getRowId={(row) => row.orden_en_expediente} />
                            </>
                        </Box>

                        <Grid container spacing={2} margin={8} justifyContent="center">
                            <LoadingButton
                                variant="contained"
                                onClick={handle_adjuntar_archivo}
                                disabled={false}
                            >
                                Agregar Archivo
                            </LoadingButton>
                        </Grid>
                    </>
                }
            </Grid>


            {open_modal_archivo && (
                <ArchivoSoporte
                    control_archivo_expediente={control_archivo_expediente}
                    open={open_modal_archivo}
                    handle_close_adjuntar_archivo={handle_close_adjuntar_archivo}
                    get_values_archivo={get_values_archivo}
                    handle_submit_archivo={handle_submit_archivo}
                    selected_expediente={selected_expediente}
                    set_selected_expediente={set_selected_expediente}
                />
            )}
            <Grid container spacing={2} marginTop={2} justifyContent="flex-end">
                <Grid item margin={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handle_cierre_expediente(on_submit_cerrar_expediente)}

                    >
                        Guardar Cierre
                    </Button>
                </Grid>

                <Grid item margin={2}>
                    <Button variant="contained"
                        color="error"
                        onClick={handle_close_buscar}>
                        Salir
                    </Button>
                </Grid>
            </Grid>

        </Grid>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default CierreExpedientesScreen;


