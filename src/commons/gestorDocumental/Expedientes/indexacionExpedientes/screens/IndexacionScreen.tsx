import { Grid, Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { obtener_usuario_logueado } from "../../aperturaExpedientes/thunks/aperturaExpedientes";
import { useAppDispatch } from "../../../../../hooks";
import { useNavigate } from "react-router-dom";
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { SerieDocumentalScreen } from "./SerieDocumentalScreen";
import AnularExpedienteModal from "../../aperturaExpedientes/screens/AnularExpediente";
import BuscarExpediente from "./BuscarExpediente";
import { ExpedienteSeleccionado } from "./ExpedienteSeleccionado";
import { ArchivoDocumento } from "./ArchivoDocumento";
import { actualizar_documento, borrar_documento, crear_indexacion_documentos } from "../thunks/indexacionExpedientes";
dayjs.extend(dayOfYear);
const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const IndexacionScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [expediente, set_expediente] = useState<any>(null);
    const [configuracion, set_configuracion] = useState<any>(null);
    const [usuario, set_usuario] = useState<any>(null);
    const [abrir_modal_anular, set_abrir_modal_anular] = useState<boolean>(false);
    const [abrir_modal_buscar, set_abrir_modal_buscar] = useState<boolean>(false);
    const [limpiar, set_limpiar] = useState<boolean>(false);
    const [archivos, set_archivos] = useState<any>([]);

    // Sección apertura
    const [tdr, set_tdr] = useState<any>({});
    const [seccion, set_seccion] = useState<string>("");
    const [serie, set_serie] = useState<any>("");

    useEffect(() => {
        obtener_usuario_logueado_fc();
    }, []);

    const borrar_documento_fc: () => void = () => {
        dispatch(borrar_documento(expediente.expediente[0].id_expediente_documental)).then((response: any)=>{
            if(response.success)
                limpiar_formulario();
        });
    }

    const obtener_usuario_logueado_fc: () => void = () => {
        dispatch(obtener_usuario_logueado()).then((response: any) => {
            set_usuario(response);
        })
    }

    const limpiar_formulario = (): void => {
        set_limpiar(true);
    }

    const salir_expediente: () => void = () => {
        navigate('/home');
    }

    const crear_obj_indexacion = (): void => {
        if (archivos.length !== 0) {
            const data_documentos: any[] = archivos.map((obj:any) => obj.data_json);
            const data_archivos: File[] = archivos.map((obj:any) => obj.archivo);
            const form_data = new FormData();
            form_data.append('data_documentos', JSON.stringify(data_documentos));
            // form_data.append('archivos', data_archivos[0]);
            data_archivos.forEach((archivo: File) => { form_data.append("archivos", archivo); });
            dispatch(crear_indexacion_documentos(form_data, expediente?.expediente[0].id_expediente_documental)).then((response: any) => {
                // if(response.success)
                //     set_expediente({expediente: [response.data]});
            });
        } else {
            const documento_obj = {
                "fecha_creacion_doc": "2023-10-31",
                "fecha_incorporacion_doc_a_Exp": "2023-10-31",
                "descripcion": "test update oscar",
                "asunto": "test oscar",
                "nombre_asignado_documento": "excel_oscar",
                "id_persona_titular": "1",
                "cod_categoria_archivo": "TX",
                "tiene_replica_fisica": false,
                "nro_folios_del_doc": "10",
                "cod_origen_archivo": "E",
                "palabras_clave_documento": "oscar|prueba|test|otro|algo"
            }
            dispatch(actualizar_documento(12, documento_obj)).then((response: any) => {
                if(response.success){

                }
                    set_expediente({expediente: [response.data]});
            });
        }
    };

    useEffect(() => {
        if (limpiar) {
            set_archivos([]);
            set_expediente(null);
            set_configuracion(null);
            set_limpiar(false);
        }
    }, [limpiar]);

    return (
        <>
            <Grid
                container
                sx={class_css}
            >
                <SerieDocumentalScreen set_expediente={set_expediente} set_serie={set_serie} set_seccion={set_seccion} set_tdr={set_tdr} limpiar={limpiar} set_configuracion={set_configuracion}></SerieDocumentalScreen>
            </Grid>
            {expediente !== null && <Grid
                container
                sx={class_css}
            >
                <ExpedienteSeleccionado expediente={expediente} limpiar={limpiar} configuracion={configuracion}></ExpedienteSeleccionado>
            </Grid>}
            {expediente !== null && <Grid
                container
                sx={class_css}
            >
                <ArchivoDocumento expediente={expediente} limpiar={limpiar} serie={serie} set_archivos={set_archivos} configuracion={configuracion}></ArchivoDocumento>
            </Grid>}
            <Grid container>
                <Grid item xs={12} sm={4}>
                    <Box
                        component="form"
                        sx={{ mt: '20px', mb: '20px' }}
                        noValidate
                        autoComplete="off"
                    >
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            spacing={2}
                            sx={{ mt: '20px' }}
                        >
                          <Button
                                color='primary'
                                variant='contained'
                                startIcon={<SearchIcon />}
                                onClick={() => { set_abrir_modal_buscar(true); }}
                            >
                                Buscar documento
                            </Button>
                            {abrir_modal_buscar && <BuscarExpediente is_modal_active={abrir_modal_buscar} set_is_modal_active={set_abrir_modal_buscar} set_expediente={set_expediente} serie={serie}></BuscarExpediente>}
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Box
                        component="form"
                        sx={{ mt: '20px', mb: '20px' }}
                        noValidate
                        autoComplete="off"
                    >
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            spacing={2}
                            sx={{ mt: '20px' }}
                        >
                            {expediente !== null && <Button
                                color='success'
                                variant='contained'
                                startIcon={<SaveIcon />}
                                onClick={() => { crear_obj_indexacion() }}
                            >
                                {expediente?.length !== 0 ? 'Actualizar' : 'Guardar'}
                            </Button>}
                            <Button
                                // color='inherit'
                                variant="outlined"
                                startIcon={<CleanIcon />}
                                onClick={() => { limpiar_formulario() }}
                            >
                                Limpiar
                            </Button>
                            {true && expediente !== null && <Button
                                sx={{ background: '#ff9800' }}
                                variant='contained'
                                startIcon={<ClearIcon />}
                                onClick={() => { set_abrir_modal_anular(true) }}
                            >
                                Anular documento
                            </Button>}
                            {<AnularExpedienteModal is_modal_active={abrir_modal_anular} set_is_modal_active={set_abrir_modal_anular} title={"Anular expediente"} user_info={usuario} id_expediente={1}></AnularExpedienteModal>}
                            {true && expediente !== null && <Button
                                variant='contained'
                                startIcon={<ClearIcon />}
                                onClick={() => { borrar_documento_fc() }}
                                sx={{ background: '#ff6961' }}
                            >
                                Borrar documento
                            </Button>}
                            <Button
                                color="error"
                                variant='contained'
                                startIcon={<ClearIcon />}
                                onClick={() => { salir_expediente() }}
                            >
                                Salir
                            </Button>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}