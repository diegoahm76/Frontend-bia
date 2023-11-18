
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from '../../../../../hooks';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { InformacionExpediente } from './InformacionExpediente';
import { SeleccionPersona } from './SeleccionPersona';
import { ConcesionesPermisosVigentes } from './ConcesionesPermisosVigentes';

interface IProps {
    is_modal_active: boolean,
    set_is_modal_active: Dispatch<SetStateAction<boolean>>,
    expediente: any;
}

const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const ConcederAccesoExpediente: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
    }, []);


    const columns: GridColDef[] = [
        {
            field: 'codigo_exp_Agno',
            headerName: 'AÑO',
            sortable: true,
            width: 250,
        },
        {
            field: 'codigo_exp_consec_por_agno',
            headerName: 'CONSECUTIVO',
            sortable: true,
            width: 250,
        },
        {
            field: 'titulo_expediente',
            headerName: 'TÍTULO EXPEDIENTE',
            width: 300,
        },
        {
            field: 'acciones',
            headerName: 'ACCIONES',
            width: 200,
            renderCell: (params) => (
                <Button onClick={() => seleccionar_expediente(params.row)} startIcon={<PlaylistAddCheckIcon />} />
            ),

        },
    ];

    const seleccionar_expediente: any = (expediente: any) => {

    }

    const mostrar_busqueda_expediente: any = async () => {

    }

    return (
        <>
            <Dialog fullWidth maxWidth="lg"
                open={props.is_modal_active}
                onClose={() => { props.set_is_modal_active(false); }} >
                    <DialogTitle>{'Conceder acceso a expedientes'}</DialogTitle>
                <DialogContent>
                <Grid
                container
                sx={class_css}
            >
                <InformacionExpediente expediente={props.expediente}></InformacionExpediente>
            </Grid>
                <Grid
                container
                sx={class_css}
            >
                <SeleccionPersona expediente={props.expediente}></SeleccionPersona>
            </Grid>
                <Grid
                container
                sx={class_css}
            >
                <ConcesionesPermisosVigentes expediente={props.expediente}></ConcesionesPermisosVigentes>
            </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default ConcederAccesoExpediente;