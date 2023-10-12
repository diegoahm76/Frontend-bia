import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, Grid, TextField, } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Title } from '../../../../../components/Title';
import FormDatePickerController from '../../../../../components/partials/form/FormDatePickerController';
import { Controller, useForm } from 'react-hook-form';
import { IObjArchivoExpediente, IObjCierreExpediente, IObjExpedientes } from '../interfaces/cierreExpedientes';
import FormInputController from '../../../../../components/partials/form/FormInputController';
import { LoadingButton } from '@mui/lab';
import BuscarExpediente from '../components/buscarExpediente';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ArchivoSoporte from '../components/archivoSoporte';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { get_archivos_id_expediente } from '../store/thunks/cierreExpedientesthunks';


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CierreExpedientesScreen = () => {
    const { current_archivo_expediente, archivos_por_expedientes } = useAppSelector((state) => state.cierre_expedientes);

    const { control: control_cierre_expediente, getValues: get_values, reset: reset_cierre_expediente } = useForm<IObjCierreExpediente>();
    const { control: control_archivo_expediente, getValues: get_values_archivo, handleSubmit: handle_submit_archivo, reset: reset_archivo_expediente } = useForm<IObjArchivoExpediente>();

    const [open_modal, set_open_modal] = useState(false);
    const [open_modal_archivo, set_open_modal_archivo] = useState(false);
    const [current_date, set_current_date] = useState(new Date().toLocaleDateString());
    const [selected_expediente, set_selected_expediente] = useState<IObjExpedientes>();
    const dispatch = useAppDispatch();


    useEffect(() => {
        const interval = setInterval(() => {
            set_current_date(new Date().toLocaleDateString());
        }, 60000);
        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);


    const handle_buscar = () => {
        set_open_modal(true);
    };
    const handle_close_buscar = () => {
        set_open_modal(false);
    };

    const handle_adjuntar_archivo = () => {
        set_open_modal_archivo(true);
    };
    const handle_close_adjuntar_archivo = () => {
        set_open_modal_archivo(false);
    };
    useEffect(() => {
        reset_archivo_expediente(current_archivo_expediente)
    }, [current_archivo_expediente]);

    const handle_selected_expediente = (expediente: IObjExpedientes) => {
        set_selected_expediente(expediente);
        // set_carpeta(true);
    };

    useEffect(() => {
        console.log(selected_expediente)
        reset_cierre_expediente(selected_expediente);
    }, [selected_expediente]);

    useEffect(() => {
        if (selected_expediente && typeof selected_expediente.id_expediente_documental === 'number') {
            console.log(selected_expediente);
            reset_cierre_expediente(selected_expediente);
            void dispatch(get_archivos_id_expediente(selected_expediente.id_expediente_documental));
        }
    }, [selected_expediente]);

    const columns: GridColDef[] = [
        {
            field: 'orden_en_expediente',
            headerName: 'ÓRDEN AGREGADO',
            sortable: true,
            width: 350,
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


    ];




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
                <Title title="CIERRE DE EXPEDIENTES" /><FormInputController
                    xs={12}
                    md={4}
                    margin={0}
                    control_form={control_cierre_expediente}
                    control_name="titulo_expediente"
                    default_value=''
                    rules={{}}
                    type="text"
                    disabled={false}
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
                    md={3}
                    margin={0}
                    control_form={control_cierre_expediente}
                    control_name={'fecha_actual'}
                    default_value={current_date}
                    rules={{}}
                    label={'Fecha'}
                    disabled={true}
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
                <Grid item xs={12} sm={6} marginTop={2} margin={2}>
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
                                rows={2}
                                label="Observación"
                                variant="outlined"
                                disabled={false}
                                defaultValue={value}
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}

                            >

                            </TextField>
                        )}
                    />
                </Grid>
                {selected_expediente?.id_expediente_documental && (

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
                )}

                {selected_expediente?.id_expediente_documental && (
                    <Box sx={{ width: '50%' }} >
                        <>
                            <DataGrid
                                density="compact"
                                autoHeight
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                rows={archivos_por_expedientes}
                                getRowId={(row) => row.orden_en_expediente} />
                        </>
                    </Box>
                )}
            </Grid>

            {selected_expediente?.id_expediente_documental && (
                <Grid container spacing={2} margin={8} justifyContent="flex-end">
                    <LoadingButton
                        variant="contained"
                        onClick={handle_adjuntar_archivo}
                        disabled={false}
                    >
                        Agregar
                    </LoadingButton>
                </Grid>
            )}
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

        </Grid>
    )



};


// eslint-disable-next-line no-restricted-syntax
export default CierreExpedientesScreen;


