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
import { get_depositos, get_estantes_deposito } from '../../store/thunks/deposito';

interface IProps {

    control_bandeja: any;
    open: any;
    handle_close_buscar: any;
    get_values: any;

}



const MoverBandeja = ({ control_bandeja, open, handle_close_buscar, get_values }: IProps) => {
    const { deposito, estantes } = useAppSelector((state) => state.deposito);
    console.log(deposito)
    const [selected_deposito_id, set_selected_deposito_id] = useState("");
    const dispatch = useAppDispatch();

    const columns: GridColDef[] = [
        {
            field: 'orden_ubicacion_por_deposito',
            headerName: 'ÓRDEN DEL ESTANTE',
            sortable: true,
            width: 200,
        },
        {
            field: 'identificacion_por_deposito',
            headerName: 'IDENTIFICACIÓN DEL ESTANTE',
            sortable: true,
            width: 250,
        },
        {
            field: 'nombre_deposito',
            headerName: 'DEPÓSITO DE ARCHIVO',
            width: 250,
        },
        {
            field: 'acciones',
            headerName: 'ACCIONES',
            width: 250,
            renderCell: (params) => (
                <Button
                    //   onClick={() => handle_edit_click(params.row)}
                    startIcon={<EditIcon />}
                >

                </Button>
            ),

        },
    ];



    useEffect(() => {
        void dispatch(get_depositos())
    }, [])

    const mostrar_estante: any = async () => {
        const id = get_values('id_deposito') ?? '';
        void dispatch(get_estantes_deposito(id))
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
                            boxShadow: '0px 3px 6px #042F4A26',
                            marginTop: '20px',
                            marginLeft: '-5px',
                        }}
                    >
                        <Title title="Búsqueda avanzada estantes" />
                        <Grid container sx={{ mt: '10px', mb: '20px' }}>

                            <Grid container spacing={2}>

                                <FormSelectController
                                    xs={12}
                                    md={4}
                                    control_form={control_bandeja}
                                    control_name={'id_deposito'}
                                    default_value=''
                                    rules={{}}
                                    label='Depósito'
                                    disabled={false}
                                    helper_text=''
                                    select_options={deposito}
                                    option_label='nombre_deposito'
                                    option_key='id_deposito'
                                    multiple={false}
                                    hidden_text={false}
                                    auto_focus={false}
                                />
                                <Grid item xs={12} sm={6} md={3} container justifyContent="end">
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={mostrar_estante}

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
                                                rows={estantes}
                                                getRowId={(row) => row.id_estante_deposito} />
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

export default MoverBandeja;