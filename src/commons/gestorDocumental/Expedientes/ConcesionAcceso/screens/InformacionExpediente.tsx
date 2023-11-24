
import { Box, Button, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { type GridColDef } from '@mui/x-data-grid';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import dayjs from 'dayjs';

interface IProps {
    expediente: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InformacionExpediente: React.FC<IProps> = (props: IProps) => {
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
            <Grid item md={12} xs={12}>
                <Title title="Información de expedientes" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                label="Título"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.titulo_expediente ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                label="Código"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.codigo_exp_und_serie_subserie ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                label="Año de apertura"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente !== null ? dayjs(props.expediente?.fecha_apertura_expediente).format('YYYY') : ''}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    );
};