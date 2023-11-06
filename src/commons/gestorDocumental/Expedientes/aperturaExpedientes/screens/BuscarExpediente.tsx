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
    TextField,
} from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { Controller, useForm } from 'react-hook-form';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { get_busqueda_avanzada_expediente_cerrado, get_tipologias, get_trd } from '../../cierreExpediente/store/thunks/cierreExpedientesthunks';
import { buscar_expediente, buscar_expediente_id } from '../thunks/aperturaExpedientes';
import dayjs from 'dayjs';

interface IProps {
    is_modal_active: boolean,
    set_is_modal_active: Dispatch<SetStateAction<boolean>>,
    set_expediente: any;
}

const BuscarExpediente: React.FC<IProps> = (props: IProps) => {

    const dispatch = useAppDispatch();
    const [expedientes, set_expedientes] = useState<any>([]);
    const [titulo, set_titulo] = useState<any>("");
    const [cod_und_series, set_cod_und_series] = useState<any>("");
    const [tdr_fecha, set_tdr_fecha] = useState<any>("");
    const [año_apertura, set_año_apertura] = useState<any>("");
    const [serie, set_serie] = useState<any>("");
    const [sub_serie, set_sub_serie] = useState<any>("");
    const [persona_titular, set_persona_titular] = useState<any>("");
    const [palabras_clave, set_palabras_clave] = useState<any>("");

    const cambio_titulo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_titulo(e.target.value);
    };
    const cambio_cod_und_series: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_cod_und_series(e.target.value);
    };
    const cambio_tdr_fecha: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_tdr_fecha(e.target.value);
    };
    const cambio_año_apertura: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_año_apertura(e.target.value);
    };
    const cambio_serie: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_serie(e.target.value);
    };
    const cambio_sub_serie: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_sub_serie(e.target.value);
    };
    const cambio_persona_titular: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_persona_titular(e.target.value);
    };
    const cambio_palabras_clave: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_palabras_clave(e.target.value);
    };

    const columns: GridColDef[] = [
        {
            field: 'codigo_exp_und_serie_subserie',
            headerName: 'CÓDIGO',
            sortable: true,
            width: 150,
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
            width: 150,
        },
        {
            field: 'nombre_subserie_origen',
            headerName: 'SUB SERIE',
            width: 200,
        },
        {
            field: 'fecha_apertura_expediente',
            headerName: 'AÑO',
            width: 100,
            valueGetter: (params) => dayjs(params.row.fecha_apertura_expediente).format('YYYY'),
        },
        {
            field: 'nombre_persona_titular',
            headerName: 'Persona titular',
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
        dispatch(buscar_expediente_id(expediente.id_expediente_documental)).then(((response: any) =>{
            if(response.data !== null && response.data !== undefined)
                props.set_expediente({expediente: [response.data]});
            else
                props.set_expediente(null);
        }));
    }

    const mostrar_busqueda_expediente: any = async () => {
        dispatch(buscar_expediente(tdr_fecha,año_apertura,serie,sub_serie,palabras_clave,titulo,cod_und_series,persona_titular)).then(((response: any) =>{
            if(response.data !== null && response.data !== undefined)
                set_expedientes(response.data);
            else
                set_expedientes([]);
        }));
    }

    return (
        <>
            <Dialog fullWidth maxWidth="lg"
                open={props.is_modal_active}
                onClose={() => { props.set_is_modal_active(false); }} >
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
                        }}
                    >
                        <Title title="Búsqueda de expedientes" />
                        <Grid container sx={{ mt: '10px'}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Titulo"
                                        variant="outlined"
                                        disabled={false}
                                        value={titulo}
                                        onChange={cambio_titulo}

                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Código Und. Serie. Subserie"
                                        variant="outlined"
                                        disabled={false}
                                        value={cod_und_series}
                                        onChange={cambio_cod_und_series}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="TRD/Fecha"
                                        variant="outlined"
                                        disabled={false}
                                        value={tdr_fecha}
                                        onChange={cambio_tdr_fecha}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mt: '1px'}}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Año de Apertura"
                                        variant="outlined"
                                        disabled={false}
                                        value={año_apertura}
                                        onChange={cambio_año_apertura}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Serie"
                                        variant="outlined"
                                        disabled={false}
                                        value={serie}
                                        onChange={cambio_serie}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Sub Serie"
                                        variant="outlined"
                                        disabled={false}
                                        value={sub_serie}
                                        onChange={cambio_sub_serie}

                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mt: '1px'}}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Persona titular"
                                        variant="outlined"
                                        disabled={false}
                                        value={persona_titular}
                                        onChange={cambio_persona_titular}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Palabras Clave"
                                        variant="outlined"
                                        disabled={false}
                                        value={palabras_clave}
                                        onChange={cambio_palabras_clave}

                                    />
                                </Grid>
                            </Grid>
                            <>
                                {expedientes.length > 0 && (
                                    <Grid item xs={12}>
                                        <Title title="Resultados de la búsqueda" />
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
                            <Grid container justifyContent="flex-end">
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
                                        onClick={() => { props.set_is_modal_active(false); }}>
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

export default BuscarExpediente;