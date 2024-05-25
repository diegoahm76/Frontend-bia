/* eslint-disable @typescript-eslint/naming-convention */

import { Box, Button, Dialog, DialogContent, Grid, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from '../../../../hooks';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
// import { buscar_expediente, buscar_expediente_id } from 'thunks/aperturaExpedientes';
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material';
import { api } from '../../../../api/axios';
import { Title } from '../../../../components';
import { buscar_expediente, buscar_expediente_id } from '../../Expedientes/aperturaExpedientes/thunks/aperturaExpedientes';
export interface SerieSubserie {
    id_catserie_unidadorg: number;
    id_serie_doc: number;
    nombre_serie_doc: string;
    id_subserie_doc: number | null;
    nombre_subserie_doc: string | null; 
  }
  export interface UnidadOrganizaciona {
    id_unidad_organizacional: number;
    nombre: string; 
  }
interface IProps {
    is_modal_active: boolean,
    set_is_modal_active: Dispatch<SetStateAction<boolean>>,
    set_expediente: any;
    serie: any;
    set_select_expediente: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ReubicacioBusquda: React.FC<IProps> = (props: IProps) => {

    const dispatch = useAppDispatch();
    const [expedientes, set_expedientes] = useState<any>([]);
    const [titulo, set_titulo] = useState<any>("");
    const [cod_und_series, set_cod_und_series] = useState<any>("");
    const [cod_und_seriess, set_cod_und_seriess] = useState<any>("");

    const [tdr_fecha, set_tdr_fecha] = useState<any>("");
    const [año_apertura, set_año_apertura] = useState<any>("");
    const [serie, set_serie] = useState<any>("");
    const [sub_serie, set_sub_serie] = useState<any>("");
    const [persona_titular, set_persona_titular] = useState<any>("");
    const [palabras_clave, set_palabras_clave] = useState<any>("");

    useEffect(() => {
        if (props.serie !== "") {
            set_cod_und_series(props.serie.codigo_unidad_organizacional);
            set_serie(props.serie.nombre_serie);
            set_sub_serie(props.serie.nombre_subserie ?? '');
        }
    }, [props.serie]);

    const cambio_titulo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_titulo(e.target.value);
    };

    const cambio_cod_und_seriess: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_cod_und_seriess(e.target.value);
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
            valueGetter: (params) => params.row.codigo_exp_und_serie_subserie + '.' + params.row.codigo_exp_Agno + (params.row.codigo_exp_consec_por_agno !== null ? '.' + params.row.codigo_exp_consec_por_agno : ""),
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
        dispatch(buscar_expediente_id(expediente.id_expediente_documental)).then(((response: any) => {
            if (response.data !== null && response.data !== undefined)
                props.set_expediente({ expediente: [response.data] });
            else
                props.set_expediente(null);
            props.set_select_expediente(expediente)
            props.set_is_modal_active(false);
        }));
    }

    const mostrar_busqueda_expediente: any = async () => {
        dispatch(buscar_expediente(tdr_fecha, año_apertura, serie, sub_serie, palabras_clave, titulo, cod_und_series, persona_titular)).then(((response: any) => {
            if (response.data !== null && response.data !== undefined)
                set_expedientes(response.data);
            else
                set_expedientes([]);
        }));
    }

    const [unidades, setUnidades] = useState<UnidadOrganizaciona[]>([]);

    const fetchUnidades = async () => {
        try {
            const url = "/gestor/configuracion-tipos-expendientes/seccion-subseccion/get/";
            const res = await api.get(url);
            const unidadesData = res.data.data;
            setUnidades(unidadesData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUnidades();
    }, []);

    const [seriesSubseries, setSeriesSubseries] = useState<SerieSubserie[]>([]);

    const fetchSeriesSubseries = async () => {
        try {
            const url = `/gestor/configuracion-tipos-expendientes/serie-subserie-unidad/get/${cod_und_seriess}/`;
            const res = await api.get(url);
            const data = res.data.data;
            setSeriesSubseries(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchSeriesSubseries();
    }, [cod_und_seriess]);
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
                        <Title title="Búsqueda de expedientes " />
                        <Grid container sx={{ mt: '10px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Titulo"
                                        variant="outlined"
                                        value={titulo}
                                        onChange={cambio_titulo}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="unidad-organizacional-select-label">Unidad Organizacional</InputLabel>
                                        <Select
                                            labelId="unidad-organizacional-select-label"
                                            id="unidad-organizacional-select"
                                            value={cod_und_seriess}
                                            label="Unidad Organizacional"
                                            onChange={cambio_cod_und_seriess}
                                        >
                                            {unidades.map((unidad) => (
                                                <MenuItem key={unidad.id_unidad_organizacional} value={unidad.id_unidad_organizacional}>
                                                    {unidad.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="serie-subserie-select-label">Serie</InputLabel>
                                        <Select
                                            labelId="serie-subserie-select-label"
                                            id="serie-subserie-select"
                                            value={serie}
                                            label="Serie"
                                            onChange={cambio_serie}
                                        >
                                            {seriesSubseries.map((item) => (
                                                <MenuItem key={item.id_catserie_unidadorg} value={item.nombre_serie_doc}>
                                                    {item.nombre_serie_doc}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>



                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="serie-subserie-select-label">Subserie</InputLabel>
                                        <Select
                                            labelId="serie-subserie-select-label"
                                            id="serie-subserie-select"
                                            value={sub_serie}
                                            label="Subserie"
                                            onChange={cambio_sub_serie}
                                        >
                                            {seriesSubseries.map((item) => (
                                                // Verificar si item.nombre_subserie_doc es un valor válido antes de usarlo
                                                item.nombre_subserie_doc !== null && item.nombre_subserie_doc !== undefined && (
                                                    <MenuItem key={item.id_catserie_unidadorg} value={item.nombre_subserie_doc}>
                                                        {item.nombre_subserie_doc}
                                                    </MenuItem>
                                                )
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="TRD/Fecha"
                                        variant="outlined"
                                        value={tdr_fecha}
                                        onChange={cambio_tdr_fecha}
                                    />
                                </Grid>
                       
                            <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Año de Apertura"
                                        variant="outlined"
                                        value={año_apertura}
                                        onChange={cambio_año_apertura}

                                    />
                                </Grid>
                                </Grid>
                            <Grid container spacing={2} sx={{ mt: '1px' }}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Persona titular"
                                        variant="outlined"
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
                                        startIcon={<SearchIcon />}
                                        color="primary"
                                        onClick={mostrar_busqueda_expediente}
                                    >
                                        Buscar
                                    </Button>
                                </Grid>

                                <Grid item margin={2}>
                                    <Button variant="outlined"
                                        color="error"
                                        startIcon={<ClearIcon />}
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

// eslint-disable-next-line no-restricted-syntax
export default ReubicacioBusquda;