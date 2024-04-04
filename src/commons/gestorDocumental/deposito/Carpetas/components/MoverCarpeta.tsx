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
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import FormSelectController from '../../../../../components/partials/form/FormSelectController';
import { get_busqueda_avanzada, get_depositos, get_estantes_deposito } from '../../store/thunks/deposito';
import FormInputController from '../../../../../components/partials/form/FormInputController';
import SearchIcon from '@mui/icons-material/Search';

interface IProps {

    control_carpeta_destino: any;
    open: any;
    handle_close_buscar: any;
    get_values: any;
    handle_mover_carpeta: any;

}



const MoverCarpeta = ({ control_carpeta_destino, open, handle_close_buscar, get_values, handle_mover_carpeta }: IProps) => {
    const { deposito, cajas_lista } = useAppSelector((state) => state.deposito);
    //  console.log('')(cajas_lista)
    const dispatch = useAppDispatch();

    const columns: GridColDef[] = [
        {
            field: 'orden_carpeta',
            headerName: 'ÓRDEN DE LA CARPETA',
            sortable: true,
            width: 250,
        },
        {
            field: 'identificacion_deposito',
            headerName: 'IDENTIFICACIÓN DEL DEPÓSITO',
            sortable: true,
            width: 250,
        },
        {
            field: 'identificacion_estante',
            headerName: 'IDENTIFICACIÓN DEL ESTANTE',
            width: 250,
        },
        {
            field: 'identificacion_bandeja',
            headerName: 'IDENTIFICACIÓN DE LA BANDEJA',
            width: 250,
        },
        {
            field: 'identificacion_caja',
            headerName: 'IDENTIFICACIÓN DE LA CAJA',
            width: 250,
        },
        {
            field: 'identificacion_carpeta',
            headerName: 'IDENTIFICACIÓN DE LA CARPETA',
            width: 250,
        },
        {
            field: 'acciones',
            headerName: 'ACCIONES',
            width: 250,
            renderCell: (params) => (
                <Button
                    onClick={() => handle_mover_carpeta(params.row)}
                    startIcon={<EditIcon />}
                >

                </Button>
            ),

        },
    ];



    useEffect(() => {
        void dispatch(get_depositos())
    }, [])

    const mostrar_busqueda: any = async () => {
        const identificacion_deposito = get_values('identificacion_deposito') ?? '';
        const identificacion_estante = get_values('identificacion_estante') ?? '';
        const identificacion_bandeja = get_values('identificacion_bandeja') ?? '';
        const identificacion_caja = get_values('identificacion_caja') ?? '';
        const identificacion_carpeta = get_values('identificacion_carpeta') ?? '';
        const orden_estante = get_values('orden_estante') ?? '';
        void dispatch(get_busqueda_avanzada(identificacion_deposito, identificacion_estante, identificacion_bandeja, identificacion_caja, identificacion_carpeta, orden_estante))
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
            <Dialog fullWidth maxWidth="lg" open={open} onClose={handle_close_buscar} >
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
                           
                            marginTop: '20px',
                            marginLeft: '-5px',
                        }}
                    >
                        <Title title="Búsqueda avanzada de carpetas" />
                        <Grid container sx={{ mt: '10px', mb: '20px' }}>

                            <Grid container spacing={2}>

                                <FormSelectController
                                    xs={12}
                                    md={2}
                                    control_form={control_carpeta_destino}
                                    control_name={'identificacion_deposito'}
                                    default_value=''
                                    rules={{}}
                                    label='Depósito'
                                    disabled={false}
                                    helper_text=''
                                    select_options={deposito}
                                    option_label='identificacion_por_entidad'
                                    option_key='identificacion_por_entidad'
                                    multiple={false}
                                    hidden_text={false}
                                    auto_focus={false}
                                />
                                <FormInputController
                                    xs={12}
                                    md={2}
                                    margin={0}
                                    control_form={control_carpeta_destino}
                                    control_name="identificacion_estante"
                                    default_value=''
                                    rules={{}}
                                    type="text"
                                    disabled={false}
                                    helper_text=""
                                    hidden_text={null}
                                    label={"Estante"}
                                />
                                <FormInputController
                                    xs={12}
                                    md={2}
                                    margin={0}
                                    control_form={control_carpeta_destino}
                                    control_name="identificacion_bandeja"
                                    default_value=''
                                    rules={{}}
                                    type="text"
                                    disabled={false}
                                    helper_text=""
                                    hidden_text={null}
                                    label={"Bandeja"}
                                />
                                <FormInputController
                                    xs={12}
                                    md={2}
                                    margin={0}
                                    control_form={control_carpeta_destino}
                                    control_name="identificacion_caja"
                                    default_value=''
                                    rules={{}}
                                    type="text"
                                    disabled={false}
                                    helper_text=""
                                    hidden_text={null}
                                    label={"Caja"}
                                />
                                <FormInputController
                                    xs={12}
                                    md={2}
                                    margin={0}
                                    control_form={control_carpeta_destino}
                                    control_name="identificacion_carpeta"
                                    default_value=''
                                    rules={{}}
                                    type="text"
                                    disabled={false}
                                    helper_text=""
                                    hidden_text={null}
                                    label={"Carpeta"}
                                />
                                <FormInputController
                                    xs={12}
                                    md={2}
                                    margin={0}
                                    control_form={control_carpeta_destino}
                                    control_name="orden_estante"
                                    default_value=''
                                    rules={{}}
                                    type="text"
                                    disabled={false}
                                    helper_text=""
                                    hidden_text={null}
                                    label={"Òrden"}
                                />
                                <Grid container spacing={2} marginTop={2} justifyContent="flex-end">
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<SearchIcon />}

                                        onClick={mostrar_busqueda}

                                    >
                                        Buscar
                                    </LoadingButton>
                                </Grid>

                            </Grid>



                            <>
                                <Grid item xs={12}>
                                    <Title title="Resultados de la búsqueda" />
                                    {/* <Typography>Resultados de la búsqueda</Typography> */}
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ width: '100%' }}>
                                        <>
                                            <DataGrid
                                                density="compact"
                                                autoHeight
                                                columns={columns}
                                                pageSize={10}
                                                rowsPerPageOptions={[10]}
                                                rows={cajas_lista}
                                                getRowId={(row) => row.id_carpeta} />
                                        </>
                                    </Box>
                                </Grid>
                            </>



                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MoverCarpeta;