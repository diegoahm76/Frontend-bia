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

interface IProps {

    control_carpeta_destino: any;
    open: any;
    handle_close_buscar: any;
    get_values: any;
    handle_mover_carpeta: any;

}



const Rotulo = ({ control_carpeta_destino, open, handle_close_buscar, get_values, handle_mover_carpeta }: IProps) => {
    const { deposito, cajas_lista } = useAppSelector((state) => state.deposito);
    console.log(cajas_lista)
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

            </Dialog>
        </>
    );
};

export default Rotulo;