import { Grid, TextField, Box, Button, Stack, InputLabel, FormControl, Select, MenuItem, type SelectChangeEvent, FormHelperText, Fab } from "@mui/material";
import { Title } from "../../../../../components/Title";
import { SetStateAction, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppDispatch } from "../../../../../hooks";
import { obtener_tipo_archivo, obtener_tipologias_id_serie, obtener_tipos_recurso } from "../thunks/indexacionExpedientes";
import { CloudUpload } from '@mui/icons-material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface IProps {
    expediente: any,
    set_archivos: any,
    limpiar: boolean,
    serie: any
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ArchivoDocumento: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [fecha_incorporacion_exp, set_fecha_incorporacion_exp] = useState<Dayjs>(dayjs());
    const [fecha_creacion_doc, set_fecha_creacion_doc] = useState<Dayjs>(dayjs());
    const [tipologia_doc, set_tipologia_doc] = useState<any>("");
    const [nro_folio, set_nro_folio] = useState<any>("");
    const [tiene_consecutivo, set_tiene_consecutivo] = useState<any>("");
    const [tipo_archivo, set_tipo_archivo] = useState<any>("");
    const [prefijo, set_prefijo] = useState<any>("");
    const [año_doc, set_año_doc] = useState<Dayjs>(dayjs());
    const [consecutivo, set_consecutivo] = useState<any>("");
    const [tipo_recurso, set_tipo_recurso] = useState<any>("");
    const [tiene_replica, set_tiene_replica] = useState<any>("");
    const [nombre_documento, set_nombre_documento] = useState<any>("");
    const [asunto, set_asunto] = useState<any>("");
    const [descripcion, set_descripcion] = useState<any>("");
    const [palabras_clave, set_palabras_clave] = useState<string>("");
    const [lt_palabras_clave, set_lt_palabras_clave] = useState<any>([]);
    const [file_name, set_file_name] = useState('');
    const [archivo_principal, set_archivo_principal] = useState<any>({});
    const [archivos, set_archivos] = useState<any>([]);
    const [limpiar, set_limpiar] = useState<boolean>(false);
    // Listas
    const [lt_tipologias, set_lt_tipologias] = useState<any[]>([]);
    const [lt_tipo_archivo, set_lt_tipo_archivo] = useState<any[]>([]);
    const [lt_tipo_recurso, set_lt_tipo_recurso] = useState<any[]>([]);
    const lt_si_no = [{ id: 'S', nombre: 'Si' }, { id: 'N', nombre: 'No' }]
    // Erros
    const msj_error = "El campo es obligatorio.";
    const [error_fecha_creacion_doc, set_error_fecha_creacion_doc] = useState<boolean>(false);
    const [error_fecha_incorporacion_exp, set_error_fecha_incorporacion_exp] = useState<boolean>(false);
    const [error_tipologia_doc, set_error_tipologia_doc] = useState<boolean>(false);
    const [error_nro_folio, set_error_nro_folio] = useState<boolean>(false);
    const [error_tipo_archivo, set_error_tipo_archivo] = useState<boolean>(false);
    const [error_tipo_recurso, set_error_tipo_recurso] = useState<boolean>(false);
    const [error_año_doc, set_error_año_doc] = useState<boolean>(false);
    const [error_consecutivo, set_error_consecutivo] = useState<boolean>(false);

    const columns: GridColDef[] = [
        {
            field: 'orden',
            headerName: 'Orden de agregado',
            sortable: true,
            width: 150,
        },
        {
            field: 'archivo',
            headerName: 'Nombre asignado',
            sortable: true,
            width: 350,
            valueGetter: (params) => params.row.archivo.name,
        },
        {
            field: 'tipologia',
            headerName: 'Típologia',
            width: 350,
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 100,
            renderCell: (params) => (
                <Button onClick={() => eliminar_archivos(params.row)} startIcon={<ClearOutlinedIcon />} />
            ),
        },
    ];

    useEffect(() => {
        obtener_tipo_documento_fc();
        obtener_tipos_recurso_fc();
    }, []);

    useEffect(() => {
        if (props.serie !== "")
            obtener_tipologias_id_serie_fc();
    }, [props.serie]);

    useEffect(() => {
        if (palabras_clave !== "")
            set_lt_palabras_clave(palabras_clave.split(',', 5));
        else
            set_lt_palabras_clave([]);
    }, [palabras_clave]);

    const obtener_tipologias_id_serie_fc: () => void = () => {
        dispatch(obtener_tipologias_id_serie(props.serie.id_catserie_unidadorg)).then((response: any) => {
            set_lt_tipologias(response.data);
        })
    }
    const obtener_tipo_documento_fc: () => void = () => {
        dispatch(obtener_tipo_archivo()).then((response: any) => {
            set_lt_tipo_archivo(response);
        })
    }
    const obtener_tipos_recurso_fc: () => void = () => {
        dispatch(obtener_tipos_recurso()).then((response: any) => {
            set_lt_tipo_recurso(response);
        })
    }

    const cambio_tipologia_doc: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tipologia_doc(e.target.value);
        set_error_tipologia_doc(!(e.target.value !== null && e.target.value !== ""));
    }
    const cambio_tiene_consecutivo: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tiene_consecutivo(e.target.value);
        set_error_consecutivo(!(e.target.value !== null && e.target.value !== "") && tiene_consecutivo === 'S');
    }
    const cambio_tipo_archivo: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tipo_archivo(e.target.value);
        set_error_tipo_archivo(!(e.target.value !== null && e.target.value !== ""));
    }
    const cambio_tipo_recurso: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tipo_recurso(e.target.value);
        set_error_tipo_recurso(!(e.target.value !== null && e.target.value !== ""));
    }
    const cambio_tiene_replica: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tiene_replica(e.target.value);
    }
    const cambio_fecha_incorporacion_exp = (date: Dayjs | null): void => {
        if (date !== null)
            set_fecha_incorporacion_exp(date);
        set_error_fecha_incorporacion_exp(!(date !== null));
    }
    const cambio_fecha_creacion_doc = (date: Dayjs | null): void => {
        if (date !== null)
            set_fecha_creacion_doc(date);
        set_error_fecha_creacion_doc(!(date !== null));
    }
    const cambio_año_doc = (date: Dayjs | null): void => {
        if (date !== null)
            set_año_doc(date);
        set_error_año_doc(!(date !== null) && tiene_consecutivo === 'S');
    }
    const cambio_nro_folio: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_nro_folio(e.target.value);
        set_error_nro_folio(!(e.target.value !== null && e.target.value !== ""));
    }
    const cambio_prefijo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_prefijo(e.target.value);
    }
    const cambio_consecutivo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_consecutivo(e.target.value);
    }
    const cambio_palabras_clave: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        const palabras_clave_before = palabras_clave;
        set_palabras_clave(e.target.value);
        if ((palabras_clave_before.match(/\,/g) || []).length > 4)
            set_palabras_clave(palabras_clave_before.slice(0, -1))
    }

    const handle_file_selected = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const selected_file = event.target.files != null ? event.target.files[0] : null;
        if (selected_file != null) {
            set_archivo_principal(selected_file);
            set_file_name(selected_file.name);
        }
    };

    const agregar_archivos: any = () => {
        let archivos_grid: any[] = [...archivos];
        let orden = archivos_grid.length + 1;
        const data_json = {
            "fecha_incorporacion_doc_a_Exp": fecha_incorporacion_exp.format('YYYY-MM-DD'),
            "fecha_creacion_doc": fecha_creacion_doc.format('YYYY-MM-DD'),
            "id_tipologia_documental": parseInt(tipologia_doc),
            "nro_folios_del_doc": parseInt(nro_folio),
            "cod_origen_archivo": tipo_archivo,
            "codigo_radicado_prefijo": tiene_consecutivo === 'S' ? parseInt(prefijo) : null,
            "codigo_radicado_agno": tiene_consecutivo === 'S' ? año_doc.format('YYYY') : null,
            "codigo_radicado_consecutivo": tiene_consecutivo === 'S' ? consecutivo : null,
            "cod_categoria_archivo": tipo_recurso,
            "tiene_replica_fisica": (tiene_replica === 'S'),
            "nombre_asignado_documento": nombre_documento,
            "asunto": asunto,
            "descripcion": descripcion,
            "orden_en_expediente": orden,
            "palabras_clave_documento": palabras_clave
        }
        // const form_data = new FormData();
        // form_data.append('file', archivo_principal);
        const tipologia = lt_tipologias.find((t: any) => t.id_tipologia_documental === parseInt(tipologia_doc)).nombre;
        archivos_grid = [...archivos_grid, { orden: orden, archivo: archivo_principal, tipologia: tipologia, data_json: data_json }];
        set_archivos([...archivos_grid]);
        set_limpiar(true);
    }

    const eliminar_archivos: any = (archivo: any) => {
        let archivos_grid: any[] = [...archivos];
        archivos_grid.splice((archivo.orden - 1), 1);
        archivos_grid.forEach((archivo: any, index: number) => {
            archivo.orden = index + 1;
        });
        set_archivos([...archivos_grid]);
    }

    const limpiar_formulario = (): void => {
        set_limpiar(true);
    }

    useEffect(() => {
        if(props.limpiar)
            limpiar_formulario();
    }, [props.limpiar]);

    useEffect(() => {
        props.set_archivos([...archivos]);
    }, [archivos]);

    useEffect(() => {
        if (limpiar) {
            set_fecha_incorporacion_exp(dayjs());
            set_fecha_creacion_doc(dayjs());
            set_tipologia_doc("");
            set_nro_folio("");
            set_tiene_consecutivo("");
            set_tipo_archivo("");
            set_prefijo("");
            set_año_doc(dayjs());
            set_consecutivo("");
            set_tipo_recurso("");
            set_tiene_replica("");
            set_nombre_documento("");
            set_asunto("");
            set_descripcion("");
            set_palabras_clave("");
            set_lt_palabras_clave([]);
            set_file_name("");
            set_archivo_principal({});
            set_limpiar(false);
        }
    }, [limpiar]);

    return (
        <>
            {props.expediente !== null && <Grid item md={12} xs={12}>
                <Title title="Archivado de documento" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha de incorporación al expediente"
                                    value={fecha_incorporacion_exp}
                                    onChange={(newValue) => { cambio_fecha_incorporacion_exp(newValue) }}
                                    readOnly={false}
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            fullWidth
                                            error={error_fecha_incorporacion_exp}
                                            size="small"
                                            {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                            {error_fecha_incorporacion_exp && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha de creación documento"
                                    value={fecha_creacion_doc}
                                    onChange={(newValue) => { cambio_fecha_creacion_doc(newValue) }}
                                    readOnly={false}
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            fullWidth
                                            error={error_fecha_creacion_doc}
                                            size="small"
                                            {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                            {error_fecha_creacion_doc && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl required size='small' fullWidth>
                                <InputLabel>Tipología documental</InputLabel>
                                <Select
                                    label="Tipología documental"
                                    value={tipologia_doc ?? ""}
                                    onChange={cambio_tipologia_doc}
                                    readOnly={false}
                                    error={error_tipologia_doc}
                                >
                                    {lt_tipologias.map((m: any) => (
                                        <MenuItem key={m.id_tipologia_documental} value={m.id_tipologia_documental}>
                                            {m.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {error_tipologia_doc && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Número de folios"
                                type={'number'}
                                size="small"
                                required
                                InputProps={{
                                    readOnly: false,
                                }}
                                fullWidth
                                onChange={cambio_nro_folio}
                                value={nro_folio}
                                error={error_nro_folio}
                            />
                            {error_nro_folio && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl size='small' fullWidth>
                                <InputLabel>Tiene consecutivo de documento</InputLabel>
                                <Select
                                    label="Tiene consecutivo de documento"
                                    value={tiene_consecutivo ?? ""}
                                    onChange={cambio_tiene_consecutivo}
                                    readOnly={false}
                                >
                                    {lt_si_no.map((m: any) => (
                                        <MenuItem key={m.id} value={m.id}>
                                            {m.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl required size='small' fullWidth>
                                <InputLabel>Tipo de archivo</InputLabel>
                                <Select
                                    label="Tipo de archivo"
                                    value={tipo_archivo ?? ""}
                                    onChange={cambio_tipo_archivo}
                                    readOnly={false}
                                    error={error_tipo_archivo}
                                >
                                    {lt_tipo_archivo.map((m: any) => (
                                        <MenuItem key={m[0]} value={m[0]}>
                                            {m[1]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {error_tipo_archivo && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                        </Grid>
                        {tiene_consecutivo === 'S' && <Grid item xs={12} sm={4}>
                            <TextField
                                label="Prefijo"
                                type={'text'}
                                size="small"
                                InputProps={{
                                    readOnly: false,
                                }}
                                fullWidth
                                value={prefijo}
                                onChange={cambio_prefijo}
                            />
                        </Grid>}
                        {tiene_consecutivo === 'S' && <Grid item xs={12} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="año"
                                    views={['year']}
                                    value={año_doc}
                                    onChange={(newValue) => { cambio_año_doc(newValue) }}
                                    readOnly={false}
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            fullWidth
                                            size="small"
                                            {...params}
                                            error={error_año_doc}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                            {error_año_doc && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                        </Grid>}
                        {tiene_consecutivo === 'S' && <Grid item xs={12} sm={4}>
                            <TextField
                                label="Consecutivo"
                                type={'text'}
                                size="small"
                                InputProps={{
                                    readOnly: false,
                                }}
                                required
                                fullWidth
                                value={consecutivo}
                                onChange={cambio_consecutivo}
                                error={error_consecutivo}
                            />
                            {error_consecutivo && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                        </Grid>}
                        <Grid item xs={12} sm={6}>
                            <FormControl required size='small' fullWidth>
                                <InputLabel>Tipo de recurso</InputLabel>
                                <Select
                                    label="Tipo de recurso"
                                    value={tipo_recurso ?? ""}
                                    onChange={cambio_tipo_recurso}
                                    readOnly={false}
                                    error={error_tipo_recurso}
                                >
                                    {lt_tipo_recurso.map((m: any) => (
                                        <MenuItem key={m[0]} value={m[0]}>
                                            {m[1]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {error_tipo_recurso && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl required size='small' fullWidth>
                                <InputLabel>Tiene réplica física</InputLabel>
                                <Select
                                    label="Tiene réplica física"
                                    value={tiene_replica ?? ""}
                                    onChange={cambio_tiene_replica}
                                    readOnly={false}
                                >
                                    {lt_si_no.map((m: any) => (
                                        <MenuItem key={m.id} value={m.id}>
                                            {m.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Numero de documento"
                                type={'text'}
                                size="small"
                                InputProps={{
                                    readOnly: false,
                                }}
                                fullWidth
                                value={nombre_documento}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Asunto"
                                type={'text'}
                                size="small"
                                InputProps={{
                                    readOnly: false,
                                }}
                                fullWidth
                                value={asunto}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Descripción"
                                multiline
                                rows={3}
                                type={'text'}
                                size="small"
                                InputProps={{
                                    readOnly: false,
                                }}
                                fullWidth
                                value={descripcion}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                            >
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Palabras clave"
                                        type={'text'}
                                        size="small"
                                        fullWidth
                                        value={palabras_clave}
                                        onChange={cambio_palabras_clave}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        InputProps={{
                                            readOnly: false,
                                        }}
                                    />
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                            >
                                <Grid item xs={12} sm={6} sx={{ pointerEvents: 'none' }}>
                                    {lt_palabras_clave.map((lt: any, index: number) => (
                                        <Fab key={index} size="small" variant="extended" sx={{ marginX: '2px', marginY: '1px' }}>
                                            {lt}
                                        </Fab>
                                    ))}
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                            >
                                <Grid item xs={12} sm={5}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        size='medium'
                                        component="label"
                                        startIcon={<CloudUpload />}
                                    >
                                        {file_name !== '' ? file_name : 'Seleccionar documento'}
                                        <input
                                            hidden
                                            type="file"
                                            required
                                            autoFocus
                                            style={{ opacity: 0 }}
                                            onChange={handle_file_selected}
                                        />
                                    </Button>
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                            >
                                <Grid item xs={12} sm={3}>
                                    <Button
                                        variant="contained"
                                        color='primary'
                                        fullWidth
                                        size='small'
                                        component="label"
                                        onClick={() => { agregar_archivos() }}
                                    >
                                        Cargar anexo
                                    </Button>
                                </Grid>
                            </Stack>
                        </Grid>
                        {archivos.length !== 0 && <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                            >
                                <Grid item xs={10}>
                                    <Box sx={{ width: '100%' }}>
                                        <>
                                            <DataGrid
                                                density="compact"
                                                autoHeight
                                                columns={columns}
                                                pageSize={5}
                                                rowsPerPageOptions={[5]}
                                                rows={archivos}
                                                getRowId={(row) => row.orden} />
                                        </>
                                    </Box>
                                </Grid>
                            </Stack>
                        </Grid>}
                    </Grid>
                </Box>
            </Grid>}
        </>
    )
}