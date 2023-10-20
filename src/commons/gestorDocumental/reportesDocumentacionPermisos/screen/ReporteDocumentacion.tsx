import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, FilledTextFieldProps, Grid, MenuItem, OutlinedTextFieldProps, StandardTextFieldProps, TextField, TextFieldVariants, } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DatePicker } from '@mui/lab';
import { Typography } from '@mui/material';
import { JSX } from 'react/jsx-runtime';
import { Title } from '../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { IObjSubserieSerie, IObjTrd } from '../interfaces/reporteDocumentacion';
import BuscarTrd from '../components/buscarTrd';
import { get_series_subseries } from '../store/thunks/reporteDocumentacionthunks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ReportesDocumentacionScreen = () => {

    const { serie_subserie } = useAppSelector((state: { reportes_documentacion: any; }) => state.reportes_documentacion);
    const { control: control_trd, getValues: get_values, reset: reset_trd, handleSubmit: handle_cierre_expediente } = useForm<IObjTrd>();

    const { control: control_serie_subserie, } = useForm<IObjSubserieSerie>();

    const [selected_trd, set_selected_trd] = useState<IObjTrd>();
    const [open_modal, set_open_modal] = useState(false);

    const dispatch = useAppDispatch();

    const handle_buscar = () => {
        set_open_modal(true);
    };
    const handle_close_buscar = () => {
        set_open_modal(false);
    };

    const handle_selected_trd = (trd: IObjTrd) => {
        set_selected_trd(trd);

    };

    useEffect(() => {
        if (selected_trd && typeof selected_trd.id_trd === 'number') {
            console.log(selected_trd)
            reset_trd(selected_trd);

            if (selected_trd.id_trd) {
                dispatch(get_series_subseries(selected_trd.id_trd));
            }
        }
    }, [selected_trd]);



    useEffect(() => {

    }, []);
















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
                alignItems: 'center'

            }}
        >
            <Grid container spacing={2} justifyContent="center" >
                <Title title="REPORTES DE PERMISOS DE DOCUMENTACIÓN" />
                <Grid item xs={12} sm={3.5} marginTop={2}  >

                    <Button
                        variant="contained"
                        onClick={handle_buscar}
                        disabled={false}
                    >
                        BUSCAR TABLA DE RETENCIÓN DOCUMENTAL
                    </Button>

                </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="center" >
                <Grid item xs={12} sm={3.5} marginTop={2} margin={2} >
                    <Controller
                        name="nombre"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Tabla de Retención Documental - Nombre"
                                variant="outlined"
                                disabled={true}
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={3} marginTop={2} margin={2} >
                    <Controller
                        name="version"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Versión"
                                variant="outlined"
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                disabled={true}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>



            </Grid>

            {open_modal && (
                <Grid item xs={12} marginY={1}>
                    <BuscarTrd
                        control_trd={control_trd}
                        open={open_modal}
                        handle_close_buscar={handle_close_buscar}
                        get_values={get_values}
                        handle_selected_trd={handle_selected_trd}

                    />
                </Grid>
            )}
            <Grid container spacing={2} justifyContent="center" >

                <Grid item xs={12} sm={3.5} marginTop={2} margin={2} >
                    <Controller
                        name="nombre_ccd"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Cuadro de Documentación Documental"
                                variant="outlined"
                                disabled={true}
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={3} marginTop={2} margin={2} >
                    <Controller
                        name="version_ccd"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Versión"
                                variant="outlined"
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                disabled={true}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>


            </Grid>
            <Grid container spacing={2} justifyContent="center" >

                <Grid item xs={12} sm={3.5} marginTop={2} margin={2} >
                    <Controller
                        name="tablas_control_acceso.nombre"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Tablas de Control de Acceso"
                                variant="outlined"
                                disabled={true}
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={3} marginTop={2} margin={2} >
                    <Controller
                        name="tablas_control_acceso.version"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Versión"
                                variant="outlined"
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                disabled={true}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>


            </Grid>

            <Grid container spacing={2} justifyContent="center" >

                <Grid item xs={12} sm={3.5} marginTop={2} margin={2} >
                    <Controller
                        name="nombre_organigrama"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Organigrama"
                                variant="outlined"
                                disabled={true}
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={3} marginTop={2} margin={2} >
                    <Controller
                        name="version_organigrama"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Versión"
                                variant="outlined"
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                disabled={true}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>


            </Grid>

            <Grid container spacing={2} justifyContent="center" >

                <Grid item xs={12} sm={3.5} marginTop={2} margin={2} >
                    <Controller
                        name="id_unidad_organizacional"
                        control={control_serie_subserie}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                margin="dense"
                                fullWidth
                                select
                                size="small"
                                label="Sección - Subsección"
                                variant="outlined"
                                disabled={false}
                                defaultValue={value}
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            >
                                {serie_subserie.map((option: IObjSubserieSerie) => (
                                    <MenuItem key={option.id_unidad_organizacional} value={`${option.id_unidad_organizacional} - ${option.nombre}`}>
                                        {`${option.id_unidad_organizacional} - ${option.nombre}`}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>



            </Grid>




        </Grid>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default ReportesDocumentacionScreen;


