import { Grid, TextField, Box, Stack, Typography, Fab, Button } from "@mui/material";
import { Title } from "../../../../../components/Title";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { xmlFromJson } from "../../../../seguridad/screens/IndicesElectronicos/utils/xmlFromJson";
import { saveAs } from 'file-saver';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

const class_button_purple = {borderColor:"#7d2181", color:'#7d2181'};
interface IProps {
    indice: any,
    set_columns: any,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const IndiceSeleccionado: React.FC<IProps> = (props: IProps) => {
    const columns: GridColDef[] = [
        {
            field: 'id_doc_indice_electronico_exp',
            headerName: 'ID DOCUMENTO',
            sortable: true,
            width: 120,
        },
        {
            field: 'nombre_documento',
            headerName: 'NOMBRE DOCUMENTO',
            sortable: true,
            width: 200,
        },
        {
            field: 'nombre_tipologia',
            headerName: 'TIPOLOGÍA DOCUMENTAL',
            width: 200,
            valueGetter: (params) => params.row.nombre_tipologia ?? 'N/A',
        },
        {
            field: 'fecha_creacion_doc',
            headerName: 'FECHA DE CREACIÓN DE DOCUMENTO',
            width: 270,
            valueGetter: (params) => dayjs(params.row.fecha_creacion_doc).format('DD/MM/YYYY'),
        },
        {
            field: 'fecha_incorporacion_exp',
            headerName: 'FECHA DE INCORPORACIÓN AL EXPEDIENTE',
            width: 300,
            valueGetter: (params) => dayjs(params.row.fecha_incorporacion_exp).format('DD/MM/YYYY'),
        },
        {
            field: 'valor_huella',
            headerName: 'VALOR HUELLA',
            width: 150,
        },
        {
            field: 'funcion_resumen',
            headerName: 'FUNCIÓN RESUMEN',
            width: 150,
        },
        {
            field: 'orden_doc_expediente',
            headerName: 'ORDEN DE DOC EN EXPEDIENTE',
            width: 220,
        },
        {
            field: 'pagina_inicio',
            headerName: 'PAGINA INICIO',
            width: 120,
        },
        {
            field: 'pagina_fin',
            headerName: 'PAGINA FINAL',
            width: 120,
        },
        {
            field: 'formato',
            headerName: 'FORMATO',
            width: 90,
        },
        {
            field: 'tamagno_kb',
            headerName: 'TAMAÑO',
            width: 90,
        },
        {
            field: 'origen_archivo',
            headerName: 'ORIGEN',
            width: 110,
        },
        {
            field: 'es_un_archivo_anexo',
            headerName: 'ES ANEXO',
            width: 90,
            valueGetter: (params) => params.row.es_un_archivo_anexo ? 'Si' : 'No',
        },
        {
            field: 'tipologia_no_creada_trd',
            headerName: 'TIÓLOGÍA (NO TRD)',
            width: 150,
            valueGetter: (params) => params.row.tipologia_no_creada_trd ?? 'N/A',
        }

    ];
    useEffect(() => {
        props.set_columns(columns);
    },[])
    return (
        <>
            <Grid item md={12} xs={12}>
                <Title title="Información del índice" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={7}>
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                spacing={2}
                                sx={{ mt: '5px' }}

                            >
                                <Grid item xs={12} sm={8}>
                                    <Typography sx={{ fontSize: '18px', fontWeight: '420' }}> Estado de índice electrónico de expediente </Typography>
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                            >
                                <Grid item xs={12} sm={4} sx={{ pointerEvents: 'none' }}>
                                    <Fab size="small" variant="extended" sx={props.indice?.abierto ? { marginX: '2px', marginY: '1px', backgroundColor: 'green', color: 'white', px: '20px' } : { marginX: '2px', marginY: '1px', backgroundColor: '#ff9800', color: 'black', px: '20px' }}>
                                        {props.indice?.abierto ? 'Abierto' : 'Cerrado'}
                                    </Fab>
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha de apertura de índice"
                                    value={dayjs(props.indice?.fecha_indice_electronico)}
                                    inputFormat='DD/MM/YYYY'
                                    onChange={(newValue) => { }}
                                    readOnly={true}
                                    renderInput={(params) => (
                                        <TextField
                                            fullWidth
                                            size="small"
                                            {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha de cierre de índice"
                                    value={dayjs(props.indice?.fecha_cierre)}
                                    inputFormat='DD/MM/YYYY'
                                    onChange={(newValue) => { }}
                                    readOnly={true}
                                    renderInput={(params) => (
                                        <TextField
                                            fullWidth
                                            size="small"
                                            {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                        {props.indice !== null &&
                            <>
                                <Grid item xs={12}>
                                    <Box sx={{ width: '100%' }}>
                                        <DataGrid
                                            density="compact"
                                            autoHeight
                                            columns={columns}
                                            pageSize={5}
                                            rowsPerPageOptions={[10]}
                                            rows={props.indice?.docs_indice_electronico_exp}
                                            getRowId={(row) => row.id_doc_indice_electronico_exp} />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} textAlign={'end'}>
                                    <Button variant="outlined" sx={class_button_purple} 
                                                    onClick={() => {
                                                        const xml = xmlFromJson(props.indice);
                                                        console.log('xml', xml);
                                      
                                                        const blob = new Blob([xml], {
                                                          type: 'text/xml;charset=utf-8',
                                                        });
                                                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                                                        saveAs(blob, `archivo_${uuidv4().slice(0, 8)}.xml`);
                                                      }}
                                    >Generar XML</Button>
                                </Grid>
                            </>
                        }
                    </Grid>
                </Box>
            </Grid>
        </>
    )
}