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
import { Controller, useForm } from 'react-hook-form';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { Title } from '../../../../components/Title';
import { get_trd_reporte_documentacion } from '../store/thunks/reporteDocumentacionthunks';

interface IProps {

    control_trd: any;
    open: any;
    handle_close_buscar: any;
    get_values: any;
    handle_selected_trd: any;

}




const BuscarTrd = ({ control_trd, open, handle_close_buscar, get_values, handle_selected_trd }: IProps) => {

    const { trd } = useAppSelector((state: { reportes_documentacion: any; }) => state.reportes_documentacion);
    const dispatch = useAppDispatch();


    useEffect(() => {
        void dispatch(get_trd_reporte_documentacion())
        //  console.log('')(trd)

    }, [])

    const columns: GridColDef[] = [
        {
            field: 'nombre',
            headerName: 'NOMBRE',
            sortable: true,
            width: 400,
        },
        {
            field: 'version',
            headerName: 'VERSIÓN',
            sortable: true,
            width: 300,
        },

        {
            field: 'acciones',
            headerName: 'ACCIÓN',
            width: 300,
            renderCell: (params) => (
                <Button
                    onClick={() => handle_selected_trd(params.row)}
                    startIcon={<PlaylistAddCheckIcon />}
                    title="Seleccionar"
                >

                </Button>
            ),

        },
    ];








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
                        <Title title="SELECCIONE UNA TABLA DE RETENCIÓN DOCUMENTAL" />
                        <Grid container sx={{ mt: '10px', mb: '20px' }}>








                            <>

                                <Grid item xs={12}>
                                    <Box sx={{ width: '100%' }}>
                                        <>
                                            <DataGrid
                                                density="compact"
                                                autoHeight
                                                columns={columns}
                                                pageSize={10}
                                                rowsPerPageOptions={[10]}
                                                rows={trd}
                                                getRowId={(row) => row.id_trd} />
                                        </>
                                    </Box>
                                </Grid>


                            </>
                            <Grid container spacing={2} marginTop={2} justifyContent="flex-end">


                                <Grid item margin={2}>
                                    <Button variant="outlined"
                                        color="error"
                                        onClick={handle_close_buscar}>
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

export default BuscarTrd;