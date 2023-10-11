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


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CierreExpedientesScreen = () => {


    const { control: control_cierre_expediente, getValues: get_values } = useForm<IObjExpedientes>();
    const { control: control_archivo_expediente, getValues: get_values_archivo, handleSubmit: handle_submit_archivo } = useForm<IObjArchivoExpediente>();

    const [open_modal, set_open_modal] = useState(false);
    const [open_modal_archivo, set_open_modal_archivo] = useState(false);
    const [current_date, set_current_date] = useState(new Date().toLocaleDateString());
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
    const columns: GridColDef[] = [
        {
            field: 'codigo_exp_und_serie_subserie',
            headerName: 'ÓRDEN AGREGADO',
            sortable: true,
            width: 200,
        },
        {
            field: 'nombre_trd_origen',
            headerName: 'NOMBRE ASIGNADO',
            sortable: true,
            width: 200,
        },
        {
            field: 'titulo_expediente',
            headerName: 'TIPOLOGÍA',
            width: 200,
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
                    control_name="nombre_metadato"
                    default_value=''
                    rules={{}}
                    type="text"
                    disabled={false}
                    helper_text=""
                    hidden_text={null}
                    label={"Nombre"}
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
                        //    handle_mover_carpeta={undefined} 
                        />
                    </Grid>
                )}
            </Grid>

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} marginTop={2} margin={2}>
                    <Controller
                        name="id_serie_origen"
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

                <Box sx={{ width: '50%' }} >
                    <>
                        <DataGrid
                            density="compact"
                            autoHeight
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            rows={[]} />
                    </>
                </Box>

            </Grid>


            <Grid container spacing={2} margin={8} justifyContent="flex-end">
                <LoadingButton
                    variant="contained"
                    onClick={handle_adjuntar_archivo}
                    disabled={false}
                >
                    Agregar
                </LoadingButton>
            </Grid>
            {open_modal_archivo && (
                <ArchivoSoporte
                    control_archivo_expediente={control_archivo_expediente}
                    open={open_modal_archivo}
                    handle_close_adjuntar_archivo={handle_close_adjuntar_archivo}
                    get_values_archivo={get_values_archivo}
                    handle_submit_archivo={handle_submit_archivo}
                />
            )}

        </Grid>
    )



};


// eslint-disable-next-line no-restricted-syntax
export default CierreExpedientesScreen;


