/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Grid, TextField, Box, Button, Stack, InputLabel, FormControl, Select, MenuItem, type SelectChangeEvent, FormHelperText, Fab, Tooltip, IconButton, Avatar } from "@mui/material";
import { Title } from "../../../../../components/Title";
import { useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppDispatch } from "../../../../../hooks";
import { actualizar_documento, obtener_documento_id, obtener_tipo_archivo, obtener_tipologias_id_serie, obtener_tipos_archivos_permitidos, obtener_tipos_recurso } from "../thunks/indexacionExpedientes";
import { CloudUpload } from '@mui/icons-material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import SaveIcon from '@mui/icons-material/Save';
import { ModalMetadatos } from "../Components/ModalDatosNuevos/ModalMetadatos";
import { MetadatosContexIndexacionDocumentos } from "../Components/Context/MetadatosContexIndexacionDocumentos";

interface IProps {
    expediente: any,
    set_archivos: any,
    set_actualizar: any,
    configuracion: any,
    set_id_documento_seleccionado: any,
    limpiar: boolean,
    serie: any
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ArchivoDocumento: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [fecha_incorporacion_exp, set_fecha_incorporacion_exp] = useState<Dayjs>(dayjs());
    const [fecha_creacion_doc, set_fecha_creacion_doc] = useState<Dayjs>(dayjs());
    const [tipologia_doc, set_tipologia_doc] = useState<any>("");
    const [tipo_doc, set_tipo_doc] = useState<any>("");
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
    const [archivo_principal, set_archivo_principal] = useState<File | null>(null);
    const [archivos, set_archivos] = useState<any>([]);
    const [limpiar, set_limpiar] = useState<boolean>(false);
    const [creado_automaticamente, set_creado_automaticamente] = useState<boolean>(false);
    const [actualizar, set_actualizar] = useState<boolean>(false);
    const [anulado, set_anulado] = useState<boolean>(false);

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
    const [error_nombre_documento, set_error_nombre_documento] = useState<boolean>(false);
    const [error_asunto, set_error_asunto] = useState<boolean>(false);
    const [error_tiene_replica, set_error_tiene_replica] = useState<boolean>(false);

    const columns: GridColDef[] = [
        {
            field: 'orden_en_expediente',
            headerName: 'Orden de agregado',
            sortable: true,
            width: 150,
        },
        {
            field: 'nombre_asignado_documento',
            headerName: 'Nombre asignado',
            sortable: true,
            width: 300,
        },
        {
            field: 'tipologia',
            headerName: 'Típologia',
            width: 200,
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 200,
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 200,
            renderCell: (params) => (
                <>
                    {params.row.orden_en_expediente !== 1 && !anulado && <Tooltip title="Bajar fila">
                        <IconButton
                            onClick={() => {
                                bajar_fila(params.row);
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 24,
                                    height: 24,
                                    background: '#fff',
                                    border: '2px solid',
                                }}
                                variant="rounded"
                            >
                                <ArrowDownwardOutlinedIcon
                                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                                />

                            </Avatar>
                        </IconButton>
                    </Tooltip>}
                    {params.row.orden_en_expediente !== 1 && !anulado && <Tooltip title="Subir fila">
                        <IconButton
                            onClick={() => {
                                subir_fila(params.row);
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 24,
                                    height: 24,
                                    background: '#fff',
                                    border: '2px solid',
                                }}
                                variant="rounded"
                            >
                                <ArrowUpwardOutlinedIcon
                                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                                />
                            </Avatar>
                        </IconButton>
                    </Tooltip>}
                    {actualizar && <Tooltip title="Selecionar documento">
                        <IconButton
                            onClick={() => {
                                seleccionar_archivos(params.row);
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 24,
                                    height: 24,
                                    background: '#fff',
                                    border: '2px solid',
                                }}
                                variant="rounded"
                            >

                                <PlaylistAddCheckIcon
                                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                                />

                            </Avatar>
                        </IconButton>
                    </Tooltip>}
                    {actualizar && !anulado && <Tooltip title="Guardar edición">
                        <IconButton
                            onClick={() => {
                                actualizar_documentos(params.row);
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 24,
                                    height: 24,
                                    background: '#fff',
                                    border: '2px solid',
                                }}
                                variant="rounded"
                            >

                                <SaveIcon
                                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                                />

                            </Avatar>
                        </IconButton>
                    </Tooltip>}
                    {!actualizar && !anulado && <Tooltip title="Eliminar">
                        <IconButton
                            onClick={() => {
                                eliminar_archivos(params.row);
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 24,
                                    height: 24,
                                    background: '#fff',
                                    border: '2px solid',
                                }}
                                variant="rounded"
                            >

                                <ClearOutlinedIcon
                                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                                />

                            </Avatar>
                        </IconButton>
                    </Tooltip>}
                </>

                // <Button onClick={() => eliminar_archivos(params.row)} startIcon={<ClearOutlinedIcon />} />
            ),
        },
    ];

    useEffect(() => {
        obtener_tipo_documento_fc();
        obtener_tipos_recurso_fc();
    }, []);

    useEffect(() => {
        console.log(props.configuracion?.expediente);
        if (props.configuracion !== null)
            props.configuracion?.expediente.length > 0 ? set_anulado(props.configuracion?.expediente[0]?.anulado) : set_anulado(false);
    }, [props.configuracion]);

    useEffect(() => {
        if (props.serie !== "")
            obtener_tipologias_id_serie_fc();
    }, [props, props.serie]);
    useEffect(() => {
        if (props.serie !== "")
            obtener_tipologias_id_serie_fc();
    }, [props]);
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
        if ((e.target.value !== null && e.target.value !== "")) {
            const tipo = lt_tipologias.find((t: any) => t.id_tipologia_documental === e.target.value);
            dispatch(obtener_tipos_archivos_permitidos(tipo.cod_tipo_medio_doc)).then((response: any) => {
                let tipos = '';
                response.data.forEach((tipo_archivo: any) => {
                    tipos = tipos + "." + tipo_archivo.nombre + ',';
                });
                set_tipo_doc(tipos.slice(0, -1));
            })
        }
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
        set_error_tiene_replica(!(e.target.value !== null && e.target.value !== ""));
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
    const cambio_nombre_documento: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_nombre_documento(e.target.value);
        set_error_nombre_documento(!(e.target.value !== null && e.target.value !== ""));
    }
    const cambio_asunto: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_asunto(e.target.value);
        set_error_asunto(!(e.target.value !== null && e.target.value !== ""));
    }
    const cambio_descripcion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_descripcion(e.target.value);
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


    const { formValues } = useContext(MetadatosContexIndexacionDocumentos);

    const agregar_archivos: any = () => {
        if (validar_formulario()) {
            let archivos_grid: any[] = [...archivos];
            let orden = archivos_grid.length + 1;
            const data_json = {
                "fecha_incorporacion_doc_a_Exp": fecha_incorporacion_exp.format('YYYY-MM-DD'),
                "fecha_creacion_doc": fecha_creacion_doc.format('YYYY-MM-DD'),
                "id_tipologia_documental": parseInt(tipologia_doc),
                "nro_folios_del_doc": parseInt(nro_folio),
                "cod_origen_archivo": tipo_archivo,
                "codigo_radicado_prefijo": tiene_consecutivo === 'S' ? prefijo : null,
                "codigo_radicado_agno": tiene_consecutivo === 'S' ? año_doc.format('YYYY') : null,
                "codigo_radicado_consecutivo": tiene_consecutivo === 'S' ? consecutivo : null,
                "cod_categoria_archivo": tipo_recurso,
                "tiene_replica_fisica": (tiene_replica === 'S'),
                "nombre_asignado_documento": nombre_documento,
                "asunto": asunto,
                "descripcion": descripcion,
                "orden_en_expediente": orden,
                "palabras_clave_documento": palabras_clave,



                "crear_obligacion": formValues.agregar_documento,
                "id_rango": formValues.id_rango_edad,
                "id_codigo_contable": formValues.id_codigo_contable,
                "nombre": formValues.nombre,
                "monto_inicial": formValues.valor,
                "id_etapa": formValues.id_etapa,
                "id_subestapa": formValues.subEtapas,
                "tipo_cobro": formValues.id_tipo_atributo,
                "id_tipo": formValues.tipoTexto

            }
            const tipologia = lt_tipologias.find((t: any) => t.id_tipologia_documental === parseInt(tipologia_doc)).nombre;
            archivos_grid = [...archivos_grid, { orden_en_expediente: orden, nombre_asignado_documento: nombre_documento, archivo: archivo_principal, tipologia: tipologia, data_json: data_json, estado: anulado ? 'Anulado' : 'Activo' }];
            set_archivos([...archivos_grid]);
            set_limpiar(true);
        }
    }

    const bajar_fila: any = (archivo: any) => {
        let archivos_grid: any[] = [...archivos].slice();
        const contador_archivos = archivos_grid.length;
        const nueva_posicion = archivo.orden_en_expediente;
        if (contador_archivos > 1 && nueva_posicion !== 1) {
            archivos_grid[nueva_posicion - 1].orden_en_expediente = nueva_posicion + 1;
            archivos_grid[nueva_posicion].orden_en_expediente = nueva_posicion;
            archivos_grid = [...archivos_grid.sort((a, b) => a.orden_en_expediente - b.orden_en_expediente)];
        } else
            return
        set_archivos([...archivos_grid]);
    }
    const subir_fila: any = (archivo: any) => {
        let archivos_grid: any[] = [...archivos].slice();
        const contador_archivos = archivos_grid.length;
        const nueva_posicion = archivo.orden_en_expediente;
        if (contador_archivos > 2 && (nueva_posicion - 1) !== 1) {
            archivos_grid[nueva_posicion - 1].orden_en_expediente = nueva_posicion - 1;
            archivos_grid[nueva_posicion - 2].orden_en_expediente = nueva_posicion;
            archivos_grid = [...archivos_grid.sort((a, b) => a.orden_en_expediente - b.orden_en_expediente)];
        } else
            return
        set_archivos([...archivos_grid]);
    }
    const seleccionar_archivos: any = (archivo: any) => {
        props.set_id_documento_seleccionado(archivo.id_documento_de_archivo_exped);
        dispatch(
            (archivo.id_documento_de_archivo_exped)).then((response: any) => {
                if (response.succes) {
                    set_fecha_incorporacion_exp(dayjs(response.data.fecha_incorporacion_doc_a_Exp));
                    set_fecha_creacion_doc(dayjs(response.data.fecha_creacion_doc));
                    set_tipologia_doc(response.data.id_tipologia_documental);
                    set_nro_folio(response.data.nro_folios_del_doc);
                    set_tiene_consecutivo(response.data.tiene_consecutivo_documento ? 'S' : 'N');
                    set_tipo_archivo(response.data.cod_origen_archivo);
                    set_prefijo(response.data.codigo_radicado_prefijo);
                    set_año_doc(dayjs(response.data.codigo_radicado_agno));
                    set_consecutivo(response.data.codigo_radicado_consecutivo);
                    set_tipo_recurso(response.data.cod_categoria_archivo);
                    set_tiene_replica(response.data.tiene_replica_fisica ? 'S' : 'N');
                    set_nombre_documento(response.data.nombre_asignado_documento);
                    set_asunto(response.data.asunto);
                    set_descripcion(response.data.descripcion);
                    set_palabras_clave(response.data.palabras_clave_documento);
                    set_creado_automaticamente(response.data.creado_automaticamente);
                } else {

                }
            });
    }
    const actualizar_documentos: any = (archivo: any) => {
        if (validar_formulario()) {
            const data_json = {
                "fecha_creacion_doc": fecha_creacion_doc.format('YYYY-MM-DD'),
                "fecha_incorporacion_doc_a_Exp": fecha_incorporacion_exp.format('YYYY-MM-DD'),
                "descripcion": descripcion,
                "asunto": asunto,
                "nombre_asignado_documento": nombre_documento,
                // "id_persona_titular": "1",
                "cod_categoria_archivo": tipo_recurso,
                "tiene_replica_fisica": (tiene_replica === 'S'),
                "nro_folios_del_doc": parseInt(nro_folio),
                "cod_origen_archivo": tipo_archivo,
                "palabras_clave_documento": palabras_clave
            };
            dispatch(actualizar_documento(archivo.id_documento_de_archivo_exped, data_json)).then((response: any) => {
                if (response.success)
                    set_limpiar(true);
            });;
        }
    }

    const eliminar_archivos: any = (archivo: any) => {
        let archivos_grid: any[] = [...archivos];
        archivos_grid.splice((archivo.orden_en_expediente - 1), 1);
        archivos_grid.forEach((archivo: any, index: number) => {
            archivo.orden_en_expediente = index + 1;
        });
        set_archivos([...archivos_grid]);
    }

    const validar_formulario = (): boolean => {
        set_error_fecha_incorporacion_exp(fecha_creacion_doc === null);
        set_error_fecha_creacion_doc(fecha_creacion_doc === null);
        set_error_tipologia_doc(tipologia_doc === '');
        set_error_nro_folio(nro_folio === '');
        set_error_tipo_archivo(tipo_archivo === '');
        set_error_tipo_recurso(tipo_recurso === '');
        set_error_nombre_documento(nombre_documento === '');
        set_error_asunto(asunto === '');
        set_error_tiene_replica(tiene_replica === '');
        set_error_año_doc(error_año_doc === null && tiene_consecutivo === 'S');
        set_error_consecutivo(error_consecutivo === null && tiene_consecutivo === 'S');
        return !(fecha_creacion_doc === null || fecha_creacion_doc === null || tipologia_doc === '' || nro_folio === '' || tipo_archivo === '' || tipo_recurso === ''
            || nombre_documento === '' || asunto === '' || tiene_replica === '' || (error_año_doc === null && tiene_consecutivo === 'S') || (error_consecutivo === null && tiene_consecutivo === 'S'));
    }

    const limpiar_formulario = (): void => {
        set_limpiar(true);
    }

    useEffect(() => {
        if (props.limpiar)
            limpiar_formulario();
    }, [props.limpiar]);

    useEffect(() => {
        props.set_archivos([...archivos]);
    }, [archivos]);

    useEffect(() => {
        if (props.expediente !== null && props.expediente !== undefined) {
            if (props.expediente) {
                props.expediente.documentos_agregados.map((doc: any) => { doc.estado = anulado ? 'Anulado' : 'Activo'; });
                set_archivos(props.expediente.documentos_agregados);
                set_actualizar(props.expediente.documentos_agregados.length > 0);
                props.set_actualizar(props.expediente.documentos_agregados.length > 0);
            }
        }
    }, [props.expediente]);

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
            set_archivo_principal(null);
            set_limpiar(false);
        }
    }, [limpiar]);

    return (
        <>
            {/*{props.expediente !== null &&*/} <Grid item md={12} xs={12}>
                <Title title="Archivado de documento" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha de incorporación al expediente"
                                    value={fecha_incorporacion_exp}
                                    onChange={(newValue) => { cambio_fecha_incorporacion_exp(newValue) }}
                                    // readOnly={creado_automaticamente}
                                    inputFormat='DD/MM/YYYY'
                                    disabled={anulado}
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
                                    //readOnly={creado_automaticamente}
                                    inputFormat='DD/MM/YYYY'
                                    disabled={anulado}
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
                                    // readOnly={actualizar}
                                    // disabled={anulado}
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
                                disabled={anulado}
                                /*InputProps={{
                                    readOnly: creado_automaticamente,
                                }}*/
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
                                    disabled={anulado}
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
                                    disabled={anulado}
                                    // readOnly={creado_automaticamente}
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
                                disabled={anulado}
                                /*InputProps={{
                                    readOnly: actualizar,
                                }}*/
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
                                    //readOnly={actualizar}
                                    disabled={anulado}
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
                                disabled={anulado}
                                /*InputProps={{
                                    readOnly: actualizar,
                                }}*/
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
                                    disabled={anulado}
                                    //readOnly={creado_automaticamente}
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
                                    disabled={anulado}
                                    //readOnly={creado_automaticamente}
                                    error={error_tiene_replica}
                                >
                                    {lt_si_no.map((m: any) => (
                                        <MenuItem key={m.id} value={m.id}>
                                            {m.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {error_tiene_replica && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Nombre de documento"
                                type={'text'}
                                size="small"
                                disabled={anulado}
                                /*InputProps={{
                                    readOnly: creado_automaticamente,
                                }}*/
                                fullWidth
                                value={nombre_documento}
                                required
                                onChange={cambio_nombre_documento}
                                error={error_nombre_documento}
                            />
                            {error_nombre_documento && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Asunto"
                                type={'text'}
                                size="small"
                                required
                                disabled={anulado}
                                /*InputProps={{
                                    readOnly: creado_automaticamente,
                                }}*/
                                fullWidth
                                value={asunto}
                                onChange={cambio_asunto}
                                error={error_asunto}
                            />
                            {error_asunto && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Descripción"
                                multiline
                                rows={3}
                                type={'text'}
                                size="small"
                                disabled={anulado}
                                /*InputProps={{
                                    readOnly: creado_automaticamente,
                                }}*/
                                fullWidth
                                value={descripcion}
                                onChange={cambio_descripcion}
                            />
                        </Grid>
                        
                        <ModalMetadatos />

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
                                        disabled={anulado}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    /*InputProps={{
                                        readOnly: creado_automaticamente,
                                    }}*/
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
                        {/*{(!actualizar && !anulado) &&*/} <Grid item xs={12} sm={12}>
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
                                            accept="tipo_doc"
                                            required
                                            autoFocus
                                            style={{ opacity: 0 }}
                                            onChange={handle_file_selected}
                                        />
                                    </Button>
                                </Grid>
                            </Stack>
                        </Grid>
                        { /*  } */}
                        {/*{(!actualizar && !anulado) &&*/} <Grid item xs={12} sm={12}>
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

                        { /* } */}
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
                                                getRowId={(row) => row.orden_en_expediente} />
                                        </>
                                    </Box>
                                </Grid>
                            </Stack>
                        </Grid>}
                    </Grid>
                </Box>
            </Grid>

            { /* } */}
        </>
    )
}