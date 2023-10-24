/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    MenuItem,
    TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { Controller, useForm } from 'react-hook-form';
import { control_error } from '../../../../../helpers';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { get_busqueda_avanzada_expediente_cerrado, get_tipologias, get_trd } from '../../cierreExpediente/store/thunks/cierreExpedientesthunks';

interface IProps {

    control_reapertura_expediente: any;
    open: any;
    handle_close_buscar_reapertura: any;
    get_values: any;
    handle_selected_expediente: any;

}



const BuscarExpedienteReapertura = ({ control_reapertura_expediente, open, handle_close_buscar_reapertura, get_values, handle_selected_expediente }: IProps) => {

    const { expedientes } = useAppSelector((state) => state.cierre_expedientes);
    const dispatch = useAppDispatch();


    useEffect(() => {
        void dispatch(get_trd())
        void dispatch(get_tipologias())
    }, [])

    const columns: GridColDef[] = [
        {
            field: 'codigo_exp_und_serie_subserie',
            headerName: 'CÓDIGO',
            sortable: true,
            width: 200,
        },
        {
            field: 'nombre_trd_origen',
            headerName: 'TRD',
            sortable: true,
            width: 200,
        },
        {
            field: 'titulo_expediente',
            headerName: 'TITULO',
            width: 200,
        },
        {
            field: 'nombre_unidad_org',
            headerName: 'UNIDAD ORGANIZACIONAL',
            width: 250,
        },
        {
            field: 'nombre_serie_origen',
            headerName: 'SERIE',
            width: 200,
        },
        {
            field: 'nombre_subserie_origen',
            headerName: 'SUB SERIE',
            width: 200,
        },
        {
            field: 'fecha_apertura_expediente',
            headerName: 'AÑO',
            width: 200,
        },
        {
            field: 'acciones',
            headerName: 'ACCIONES',
            width: 200,
            renderCell: (params) => (
                <Button
                    onClick={() => handle_selected_expediente(params.row)}
                    startIcon={<PlaylistAddCheckIcon />}
                >

                </Button>
            ),

        },
    ];




    const mostrar_busqueda_expediente: any = async () => {
        const titulo_expediente = get_values('titulo_expediente') ?? '';
        const codigos_uni_serie_subserie = get_values('codigos_uni_serie_subserie') ?? '';
        const trd_nombre = get_values('trd_nombre') ?? '';
        const fecha_apertura_expediente = get_values('fecha_apertura_expediente') ?? '';
        const id_serie_origen = get_values('id_serie_origen') ?? '';
        const id_subserie_origen = get_values('id_subserie_origen') ?? '';
        void dispatch(get_busqueda_avanzada_expediente_cerrado(titulo_expediente, trd_nombre, codigos_uni_serie_subserie, fecha_apertura_expediente, id_serie_origen, id_subserie_origen));

    }



    return (
        <>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"

                >
                    Buscar
                </Button>
            </Grid>
            <Dialog fullWidth maxWidth="lg" open={open} onClose={handle_close_buscar_reapertura} >
                <DialogContent>
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
                            marginTop: '20px',
                            marginLeft: '-5px',
                        }}
                    >
                        <Title title="BÚSQUEDA DE EXPEDIENTES CERRADOS" />
                        <Grid container sx={{ mt: '10px', mb: '20px' }}>

                            <Grid container justifyContent="center">
                                <Grid item xs={12} sm={3.5} marginTop={2} margin={2}>
                                    <Controller
                                        name="titulo_expediente"
                                        control={control_reapertura_expediente}
                                        rules={{ required: true }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                fullWidth
                                                size="small"
                                                label="Titulo"
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

                                <Grid item xs={12} sm={3.5} marginTop={2} margin={2}>
                                    <Controller
                                        name="codigo_exp_und_serie_subserie"
                                        control={control_reapertura_expediente}
                                        rules={{ required: true }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                fullWidth
                                                size="small"
                                                label="Código Und. Serie. Subserie"
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

                                <Grid item xs={12} sm={3.5} marginTop={2} margin={2} >
                                    <Controller
                                        name="trd_nombre"
                                        control={control_reapertura_expediente}
                                        defaultValue=""
                                        rules={{ required: true }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                margin="dense"
                                                fullWidth
                                                size="small"
                                                label="TRD/Fecha"
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

                            </Grid>


                            <Grid container justifyContent="center">
                                <Grid item xs={12} sm={3.5} margin={2}>
                                    <Controller
                                        name="fecha_apertura_expediente"
                                        control={control_reapertura_expediente}
                                        rules={{ required: true }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                fullWidth
                                                size="small"
                                                label="Año de Apertura"
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

                                <Grid item xs={12} sm={3.5} marginTop={2} margin={2}>
                                    <Controller
                                        name="id_serie_origen"
                                        control={control_reapertura_expediente}
                                        rules={{ required: true }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                fullWidth
                                                size="small"
                                                label="Serie"
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

                                <Grid item xs={12} sm={3.5} marginTop={2} margin={2} >
                                    <Controller
                                        name="id_subserie_origen"
                                        control={control_reapertura_expediente}
                                        rules={{ required: true }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                fullWidth
                                                size="small"
                                                label="Sub Serie"
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
                                <Grid item xs={12} sm={6} marginTop={2} margin={2}>
                                    <Controller
                                        name="palabras_clave_expediente"
                                        control={control_reapertura_expediente}
                                        rules={{ required: true }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                fullWidth
                                                size="small"
                                                label="Palabras Clave"
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








                            </Grid>



                            <>
                                {expedientes.length > 0 && (
                                    <Grid item xs={12}>
                                        <Title title="Resultados de la búsqueda" />
                                        {/* <Typography>Resultados de la búsqueda</Typography> */}
                                    </Grid>
                                )}
                                {expedientes.length > 0 && (
                                    <Grid item xs={12}>
                                        <Box sx={{ width: '100%' }}>
                                            <>
                                                <DataGrid
                                                    density="compact"
                                                    autoHeight
                                                    columns={columns}
                                                    pageSize={10}
                                                    rowsPerPageOptions={[10]}
                                                    rows={expedientes}
                                                    getRowId={(row) => row.id_expediente_documental} />
                                            </>
                                        </Box>
                                    </Grid>
                                )}

                            </>
                            <Grid container spacing={2} marginTop={2} justifyContent="flex-end">
                                <Grid item margin={2}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={mostrar_busqueda_expediente}

                                    >
                                        Buscar
                                    </Button>
                                </Grid>

                                <Grid item margin={2}>
                                    <Button variant="outlined"
                                        color="error"
                                        onClick={handle_close_buscar_reapertura}>
                                        Salir
                                    </Button>
                                </Grid>
                            </Grid>


                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BuscarExpedienteReapertura;