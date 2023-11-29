import { Grid, Box, Button, Stack, TextField, Accordion, AccordionSummary, Typography, AccordionDetails, Card, CardContent, CardActions } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch } from "../../../../../hooks";
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { Title } from "../../../../../components/Title";
import ConcederAccesoDocumento from "../../ConcesionAcceso/screens/ConcederAccesoDocumento";
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { obtener_documentos_expediente, obtener_metadata } from "../thunks/ConsultaExpedientes";
dayjs.extend(dayOfYear);
interface IProps {
    expediente: any,
    documento: any,
    set_documento: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocumentosExpediente: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [abrir_modal_conceder, set_abrir_modal_conceder] = useState<boolean>(false);
    const [metadata, set_metadata] = useState<any>(null);
    const [seleccion_documento, set_seleccion_documento] = useState<any>(null);
    const [expandir, set_expandir] = useState<string | false>(false);
    const [expandir_anexo, set_expandir_anexo] = useState<string | false>(false);
    const [filtro_uno, set_filtro_uno] = useState<any>("");
    const [filtro_dos, set_filtro_dos] = useState<any>("");

    const handle_change = (panel: string, anexos: number, documento: any) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        if (anexos !== 0)
            set_expandir(newExpanded ? panel : false);
        consultar_metadara(documento)
    };
    const handle_change_anexos = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        set_expandir_anexo(newExpanded ? panel : false);
    };

    const consultar_metadara = (anexo: any) => {
        set_seleccion_documento(anexo);
        dispatch(obtener_metadata(anexo.id_documento_de_archivo_exped)).then((response: any) => {
            if (response.success) {
                set_metadata(response.data);
            }
        });
    };

    const filtrar_documentos: any = async () => {
        dispatch(obtener_documentos_expediente(props.expediente.id_expediente_documental, '', filtro_uno, filtro_dos)).then(((response: any) => {
            response.data !== null ? props.set_documento(response.data) : props.set_documento(null);
        }));
    }

    const cambio_filtro_uno: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_filtro_uno(e.target.value);
    };
    const cambio_filtro_dos: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_filtro_dos(e.target.value);
    };


    useEffect(() => {
        set_metadata(null);
    }, [props.documento])

    return (
        <>
            <Grid item md={12} xs={12}>
                <Title title="Documentos de expedientes" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Grid item xs={12} sm={10}>
                                        <Title title="Filtrar" />
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                            spacing={2}
                                            sx={{ mt: '15px' }}
                                        >

                        <Grid item xs={12} sm={5}>
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
                            <Grid item xs={12} sm={5}>
                            <TextField
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Palabras Clave"
                                        variant="outlined"
                                        value={filtro_dos}
                                        onChange={cambio_filtro_dos}

                                    />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={filtrar_documentos}
                            >
                                Buscar
                            </Button>
                            </Grid>
                                        </Stack>
                                        </Grid>
                                        </Stack>
                                        </Grid>

                     {(props.documento !== null && props.documento !== undefined) &&   <Grid item xs={12} sm={8}>
                            {props.documento.map((c: any, index: number) => (
                                <Grid item xs={12} sm={12} key={index}>
                                    <Accordion expanded={expandir === 'panel' + index} onChange={handle_change('panel' + index, c.anexos.length, c)} sx={{ marginBottom: '2px' }}>
                                        <AccordionSummary expandIcon={c.anexos.length === 0 ? '' : <ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
                                            <TextSnippetOutlinedIcon sx={{ marginTop: '5px', marginRight: '10px', color: 'gray' }} />
                                            <Typography sx={{ fontSize: '15px', fontWeight: '420', display: 'inline-flex', flexDirection: 'row', marginTop: '7px' }}>
                                                {c.label}
                                            </Typography>
                                        </AccordionSummary>
                                        <Accordion expanded={expandir_anexo === 'panelAn' + (index + 1)} onChange={handle_change_anexos('panelAn' + (index + 1))} sx={{ marginBottom: '1px' }}>
                                            <AccordionSummary expandIcon={c.anexos.length === 0 ? '' : <ExpandMoreIcon />} aria-controls="panel1And-content" id="panel1And-header">
                                                <Typography sx={{ fontSize: '15px', fontWeight: '420', display: 'inline-flex', flexDirection: 'row', marginTop: '7px' }}>
                                                    Anexos
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {c.anexos.map((a: any, sub_index: number) => (
                                                    <Grid item xs={12} sm={12} key={sub_index}>
                                                        <Grid item xs={12} sm={12}>
                                                            <Typography sx={{ fontSize: '16px', fontWeight: '410', color: 'gray', display: 'inline-flex', flexDirection: 'row', cursor: 'pointer' }} onClick={() => consultar_metadara(c.anexos[sub_index])}>
                                                                <TextSnippetOutlinedIcon sx={{ marginRight: '10px', color: 'gray' }} />
                                                                {a.label}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                            </AccordionDetails>
                                        </Accordion>
                                    </Accordion>
                                </Grid>))}
                        </Grid>}
                        <Grid item xs={12} sm={4}>
                           {metadata !== null && <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 16, fontWeight: 410, marginBottom: '4px' }}>Documento seleccionado</Typography>
                                    <Grid container xs={12} sm={12}>
                                        <Grid item xs={12} sm={4}><Typography sx={{ fontSize: 14, fontWeight: 410 }}>Identificación:</Typography></Grid>
                                        <Grid item xs={12} sm={8}><Typography sx={{ fontSize: 14 }}>{metadata.identificacion_doc_en_expediente}</Typography></Grid>
                                        <Grid item xs={12} sm={8}><Typography sx={{ fontSize: 14, fontWeight: 410 }}>Fecha de creación del documento:</Typography></Grid>
                                        <Grid item xs={12} sm={4}><Typography sx={{ fontSize: 14 }}>{metadata.fecha_creacion_doc}</Typography></Grid>
                                        <Grid item xs={12} sm={9}><Typography sx={{ fontSize: 14, fontWeight: 410 }}>Fecha de incorporación al expediente:</Typography></Grid>
                                        <Grid item xs={12} sm={3}><Typography sx={{ fontSize: 14 }}>{metadata.fecha_incorporacion_doc_a_Exp}</Typography></Grid>
                                        <Grid item xs={12} sm={5}><Typography sx={{ fontSize: 14, fontWeight: 410 }}>Numero de anexos:</Typography></Grid>
                                        <Grid item xs={12} sm={7}><Typography sx={{ fontSize: 14 }}>{metadata.numero_anexos}</Typography></Grid>
                                        <Grid item xs={12} sm={3}><Typography sx={{ fontSize: 14, fontWeight: 410 }}>Origen:</Typography></Grid>
                                        <Grid item xs={12} sm={9}><Typography sx={{ fontSize: 14 }}>{metadata.origen_archivo}</Typography></Grid>
                                        <Grid item xs={12} sm={3}><Typography sx={{ fontSize: 14, fontWeight: 410 }}>Categoría:</Typography></Grid>
                                        <Grid item xs={12} sm={9}><Typography sx={{ fontSize: 14 }}>{metadata.categoria_archivo}</Typography></Grid>
                                        <Grid item xs={12} sm={5}><Typography sx={{ fontSize: 14, fontWeight: 410 }}>Tipología documental:</Typography></Grid>
                                        <Grid item xs={12} sm={7}><Typography sx={{ fontSize: 14 }}>{metadata.fecha_creacion_doc}</Typography></Grid>
                                        <Grid item xs={12} sm={4}><Typography sx={{ fontSize: 14, fontWeight: 410 }}>Número de folios:</Typography></Grid>
                                        <Grid item xs={12} sm={8}><Typography sx={{ fontSize: 14 }}>{metadata.nro_folios_del_doc}</Typography></Grid>
                                        <Grid item xs={12} sm={3}><Typography sx={{ fontSize: 14, fontWeight: 410 }}>Asunto:</Typography></Grid>
                                        <Grid item xs={12} sm={9}><Typography sx={{ fontSize: 14 }}>{metadata.asunto}</Typography></Grid>
                                        <Grid item xs={12} sm={3}><Typography sx={{ fontSize: 14, fontWeight: 410 }}>Descripción: </Typography></Grid>
                                        <Grid item xs={12} sm={9}><Typography sx={{ fontSize: 14 }}>{metadata.descripcion}</Typography></Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Grid container xs={12} sm={12}>
                                        <Grid item xs={12} sm={12}>
                                            <Box component="form" sx={{ mt: '10px', mb: '10px' }} noValidate autoComplete="off">
                                                <Stack direction="row" justifyContent="center" spacing={2}>
                                                    <Button
                                                        color='primary'
                                                        variant='outlined'
                                                        startIcon={<ListOutlinedIcon />}
                                                        onClick={() => { }}
                                                        href=""
                                                    >
                                                        Ver documento
                                                    </Button>
                                                    <Button
                                                        color='primary'
                                                        variant='outlined'
                                                        startIcon={<ListOutlinedIcon />}
                                                        href={metadata.ruta_archivo}
                                                        target="_blank"
                                                        download={metadata.identificacion_doc_en_expediente}
                                                    >
                                                        Descargar documento
                                                    </Button>
                                                </Stack>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <Box component="form" noValidate autoComplete="off" >
                                                <Stack direction="row" justifyContent="center" >
                                                    <Button
                                                        color='primary'
                                                        variant='outlined'
                                                        startIcon={<ListOutlinedIcon />}
                                                        onClick={() => { set_abrir_modal_conceder(true); }}
                                                    >
                                                        Conceder acceso a documento
                                                    </Button>
                                                    {abrir_modal_conceder && <ConcederAccesoDocumento is_modal_active={abrir_modal_conceder} set_is_modal_active={set_abrir_modal_conceder} documento={seleccion_documento} metadata={metadata} ></ConcederAccesoDocumento>}
                                                </Stack>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </Card>}
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    )
}