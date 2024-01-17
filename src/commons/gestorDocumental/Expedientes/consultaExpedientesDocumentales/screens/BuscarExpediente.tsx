
import { Box, Button, Dialog, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from '../../../../../hooks';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import dayjs, { Dayjs } from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import { buscar_expediente_id } from '../../aperturaExpedientes/thunks/aperturaExpedientes';
import { obtener_trd_actual_retirados } from '../../indexacionExpedientes/thunks/indexacionExpedientes';
import { BuscadorPersonaDialog } from '../../../../almacen/gestionDeInventario/gestionHojaDeVida/mantenimiento/components/RegistroMantenimiento/RegistroMantenimientoGeneral/BuscadorPersonaDialog';
import { obtener_documentos, obtener_documentos_expediente, obtener_expedientes } from '../thunks/ConsultaExpedientes';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface IProps {
    is_modal_active: boolean,
    set_is_modal_active: Dispatch<SetStateAction<boolean>>,
    set_expediente: any;
    set_documento: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const BuscarExpediente: React.FC<IProps> = (props: IProps) => {

    const dispatch = useAppDispatch();
    const [expedientes, set_expedientes] = useState<any>([]);
    const [documentos, set_documentos] = useState<any>([]);
    const [filtro_uno, set_filtro_uno] = useState<any>("");
    const [filtro_dos, set_filtro_dos] = useState<any>("");
    const [tdr, set_tdr] = useState<any>("");
    const [busqueda, set_busqueda] = useState<any>("");
    const [lt_tdr, set_lt_tdr] = useState<any[]>([]);
    const [año_apertura, set_año_apertura] = useState<any>("");
    const [fecha_incorporacion, set_fecha_incorporacion] = useState<Dayjs | null>(null);
    const [filtro_tres, set_filtro_tres] = useState<any>("");
    const [filtro_cuatro, set_filtro_cuatro] = useState<any>("");
    const [persona_titular, set_persona_titular] = useState<any>("");
    const [persona, set_persona] = useState<any>("");
    const [filtro_cinco, set_filtro_cinco] = useState<any>("");
    const [filtro_seis, set_filtro_seis] = useState<any>("");
    const [abrir_modal_persona, set_abrir_modal_persona] = useState<boolean>(false);

    useEffect(() => {
        obtener_trd_actual_fc();
    }, []);

    useEffect(() => {
        if (persona !== "") {
            set_persona_titular(persona.nombre_completo);
        }
    }, [persona]);

    const obtener_trd_actual_fc: () => void = () => {
        dispatch(obtener_trd_actual_retirados()).then((response: any) => {
            set_lt_tdr(response.data);
        })
    }

    const cambio_filtro_uno: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_filtro_uno(e.target.value);
    };
    const cambio_filtro_dos: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_filtro_dos(e.target.value);
    };
    const cambio_tdr: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tdr(e.target.value);
    }
    const cambio_busqueda: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_busqueda(e.target.value);
        limpiar();
    }
    const cambio_fecha_incorporacion = (date: Dayjs | null): void => {
        set_fecha_incorporacion(date);
    }
    const cambio_año_apertura: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_año_apertura(e.target.value);
    };
    const cambio_filtro_tres: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_filtro_tres(e.target.value);
    };
    const cambio_filtro_cuatro: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_filtro_cuatro(e.target.value);
    };
    const cambio_persona_titular: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_persona_titular(e.target.value);
    };
    const cambio_filtro_cinco: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_filtro_cinco(e.target.value);
    };
    const cambio_filtro_seis: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_filtro_seis(e.target.value);
    };

    const columns: GridColDef[] = [
        {
            field: 'codigo_exp_und_serie_subserie',
            headerName: 'CÓDIGO',
            sortable: true,
            width: 150,
            valueGetter: (params) => params.row.codigo_exp_und_serie_subserie + '.' +  params.row.codigo_exp_Agno + (params.row.codigo_exp_consec_por_agno !== null ? '.' +  params.row.codigo_exp_consec_por_agno : ""),
        },
        {
            field: 'nombre_trd_origen',
            headerName: 'TRD',
            sortable: true,
            width: 200,
        },
        {
            field: 'filtro_uno_expediente',
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
            field: 'fecha_incorporacion_expediente',
            headerName: 'AÑO',
            width: 100,
            valueGetter: (params) => dayjs(params.row.fecha_incorporacion_expediente).format('YYYY'),
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
                <Button onClick={() => seleccionar_exp_o_doc(params.row)} startIcon={<PlaylistAddCheckIcon />} />
            ),

        },
    ];
    const columns_doc: GridColDef[] = [
        {
            field: 'identificacion_doc_en_expediente',
            headerName: 'ID DOCUMENTO',
            sortable: true,
            width: 120,
        },
        {
            field: 'nombre_asignado_documento',
            headerName: 'NOMBRE DOCUMENTO',
            sortable: true,
            width: 180,
        },
        {
            field: 'nombre_tipologia',
            headerName: 'TIPOLOGÍA DOCUMENTAL',
            width: 150,
        },
        {
            field: 'fecha_creacion_doc',
            headerName: 'FECHA CREACIÓN DEL DOCUMENTO',
            width: 200,
            valueGetter: (params) => dayjs(params.row.fecha_creacion_doc).format('DD/MM/YYYY'),
        },
        {
            field: 'fecha_incorporacion_doc_a_Exp',
            headerName: 'FECHA INCORPORACIÓN AL EXPEDIENTE',
            width: 200,
            valueGetter: (params) => dayjs(params.row.fecha_incorporacion_doc_a_Exp).format('DD/MM/YYYY'),
        },
        {
            field: 'orden_en_expediente',
            headerName: 'ORDEN DE DOC EN EXPEDIENTE',
            width: 200,
        },
        {
            field: 'pagina_inicio',
            headerName: 'PÁGINA INICIO',
            width: 100,
        },
        {
            field: 'pagina_fin',
            headerName: 'PÁGINA FINAL',
            width: 100,
        },
        {
            field: 'formato',
            headerName: 'FORMATO',
            width: 100,
        },
        {
            field: 'tamagno_kb',
            headerName: 'TAMAÑO',
            width: 100,
        },
        {
            field: 'origen_archivo',
            headerName: 'ORIGEN',
            width: 100,
        },
        {
            field: 'es_un_archivo_anexo',
            headerName: 'ES ANEXO',
            width: 300,
            valueGetter: (params) => params.row.es_un_archivo_anexo ? 'Si' : 'No',
        },
        {
            field: 'acciones',
            headerName: 'ACCIONES',
            width: 200,
            renderCell: (params) => (
                <Button onClick={() => seleccionar_exp_o_doc(params.row)} startIcon={<PlaylistAddCheckIcon />} />
            ),
        },
    ];

    const seleccionar_exp_o_doc: any = (exp_o_doc: any) => {
        dispatch(buscar_expediente_id(exp_o_doc.id_expediente_documental)).then(((response: any) => {
            response.data !== null ? props.set_expediente(response.data) : props.set_expediente(null);
            props.set_is_modal_active(false);
        }));
        const filtro_id_documento = exp_o_doc?.id_documento_de_archivo_exped === null || exp_o_doc?.id_documento_de_archivo_exped === undefined ? '' : exp_o_doc?.id_documento_de_archivo_exped;
        dispatch(obtener_documentos_expediente(exp_o_doc.id_expediente_documental, filtro_id_documento, '', '')).then(((response: any) => {
            response.data !== null ? props.set_documento(response.data) : props.set_documento(null);
            props.set_is_modal_active(false);
        }));
    }

    const mostrar_busqueda_expediente: any = async () => {
        const personal_local = persona !== "" ? persona.id_persona : "";
        dispatch(obtener_expedientes(tdr, año_apertura, filtro_tres, filtro_cuatro, filtro_cinco, filtro_uno, filtro_dos, personal_local, filtro_seis)).then(((response: any) => {
            response.data !== null ? set_expedientes(response.data) : set_expedientes([]);
        }));
    }
    const mostrar_busqueda_documentos: any = async () => {
        const fecha_incorporacion_local = fecha_incorporacion !== null ? dayjs(fecha_incorporacion).format('YYYY-MM-DD') : "";
        dispatch(obtener_documentos(filtro_uno, filtro_dos, filtro_tres, fecha_incorporacion_local, filtro_cuatro, filtro_cinco)).then(((response: any) => {
            response.data !== null ? set_documentos(response.data) : set_documentos([]);
        }));
    }
    const limpiar: any = async () => {
        set_expedientes([]);
        set_documentos([]);
        set_filtro_uno("");
        set_filtro_dos("");
        set_tdr("");
        set_año_apertura("");
        set_fecha_incorporacion(null);
        set_filtro_tres("");
        set_filtro_cuatro("");
        set_persona_titular("");
        set_persona("");
        set_filtro_cinco("");
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
                        <Title title="Búsqueda de avanzada" />
                        <Grid container sx={{ mt: '10px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <Box
                                        component="form"
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <Stack direction="row" justifyContent="center" >
                                            <Grid item xs={12} sm={4}>
                                                <FormControl size='small' fullWidth>
                                                    <InputLabel>Búsqueda por</InputLabel>
                                                    <Select
                                                        label="Búsqueda por"
                                                        value={busqueda}
                                                        onChange={cambio_busqueda}
                                                        readOnly={false}
                                                    >
                                                        {[{ id: 'E', nombre: 'Expedientes' }, { id: 'D', nombre: 'Documentos de expedientes' }].map((m: any) => (
                                                            <MenuItem key={m.id} value={m.id}>
                                                                {m.nombre}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                        </Stack>
                                    </Box>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {busqueda === 'E' && <Grid
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
                        <Title title="Filtros" />
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
                                        value={filtro_uno}
                                        onChange={cambio_filtro_uno}
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
                                        value={filtro_dos}
                                        onChange={cambio_filtro_dos}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl size='small' fullWidth>
                                        <InputLabel>TDR - actual</InputLabel>
                                        <Select
                                            label="TDR - actual"
                                            value={tdr ?? ""}
                                            onChange={cambio_tdr}
                                            readOnly={false}
                                        >
                                            {lt_tdr.map((m: any) => (
                                                <MenuItem key={m.id_trd} value={m.id_trd}>
                                                    {m.nombre + ' - '}{m.version}{m.fecha_retiro_produccion !== null ? '/' + dayjs(m.fecha_retiro_produccion).format('DD-MM-YYYY') : ''}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mt: '1px' }}>
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
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Serie"
                                        variant="outlined"
                                        value={filtro_tres}
                                        onChange={cambio_filtro_tres}

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
                                        value={filtro_cuatro}
                                        onChange={cambio_filtro_cuatro}

                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mt: '1px' }}>
                            <Grid item xs={12} sm={3}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Consecutivo"
                                        variant="outlined"
                                        value={filtro_seis}
                                        onChange={cambio_filtro_seis}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Persona titular"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={persona_titular}
                                        onChange={cambio_persona_titular}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        startIcon={<SearchIcon />}
                                        onClick={() => { set_abrir_modal_persona(true); }}
                                    >
                                        Buscar
                                    </Button>
                                    {abrir_modal_persona && (
                                        <BuscadorPersonaDialog
                                            is_modal_active={abrir_modal_persona}
                                            set_is_modal_active={set_abrir_modal_persona}
                                            title={"Busqueda de persona responsable"}
                                            set_persona={set_persona} />
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Palabras Clave"
                                        variant="outlined"
                                        value={filtro_cinco}
                                        onChange={cambio_filtro_cinco}

                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>}
                    {busqueda === 'D' && <Grid
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
                        <Title title="Filtros" />
                        <Grid container sx={{ mt: '10px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Número de identificación"
                                        variant="outlined"
                                        value={filtro_uno}
                                        onChange={cambio_filtro_uno}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Título"
                                        variant="outlined"
                                        value={filtro_dos}
                                        onChange={cambio_filtro_dos}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Tipología documental"
                                        variant="outlined"
                                        value={filtro_tres}
                                        onChange={cambio_filtro_tres}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Fecha de incorporación a expediente"
                                            value={fecha_incorporacion}
                                            onChange={(newValue) => { cambio_fecha_incorporacion(newValue); }}
                                            renderInput={(params) => (
                                                <TextField
                                                    required
                                                    fullWidth
                                                    size="small"
                                                    {...params}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Asunto"
                                        variant="outlined"
                                        value={filtro_cuatro}
                                        onChange={cambio_filtro_cuatro}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Palabras Clave"
                                        variant="outlined"
                                        value={filtro_cinco}
                                        onChange={cambio_filtro_cinco}

                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>}
                    <>
                        {expedientes?.length > 0 && (
                            <Grid item xs={12}>
                                <Title title="Resultados de la búsqueda" />
                            </Grid>
                        )}
                        {expedientes?.length > 0 && (
                            <Grid item xs={12}>
                                <Box sx={{ width: '100%' }}>
                                    <>
                                        <DataGrid
                                            density="compact"
                                            autoHeight
                                            columns={columns}
                                            pageSize={10}
                                            rowsPerPageOptions={[5]}
                                            rows={expedientes}
                                            getRowId={(row) => row.id_expediente_documental} />
                                    </>
                                </Box>
                            </Grid>
                        )}
                    </>
                    <>
                        {documentos?.length > 0 && (
                            <Grid item xs={12}>
                                <Title title="Resultados de la búsqueda" />
                            </Grid>
                        )}
                        {documentos?.length > 0 && (
                            <Grid item xs={12}>
                                <Box sx={{ width: '100%' }}>
                                    <>
                                        <DataGrid
                                            density="compact"
                                            autoHeight
                                            columns={columns_doc}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                            rows={documentos}
                                            getRowId={(row) => row.id_documento_de_archivo_exped} />
                                    </>
                                </Box>
                            </Grid>
                        )}

                    </>
                    {busqueda !== '' && <Grid container justifyContent="flex-end">
                        <Grid item margin={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={busqueda === 'E' ? mostrar_busqueda_expediente : mostrar_busqueda_documentos}
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
                    </Grid>}
                </DialogContent>
            </Dialog>
        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default BuscarExpediente;