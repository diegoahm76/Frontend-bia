/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
// import { obtener_usuario_logueado } from "../aperturaExpedientes/thunks/aperturaExpedientes";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import dayOfYear from 'dayjs/plugin/dayOfYear';
// import { SerieDocumentalScreen } from "./SerieDocumentalScreen";
//  import { ExpedienteSeleccionado } from "./ExpedienteSeleccionado";
// import { ArchivoDocumento } from "./ArchivoDocumento";
// import { borrar_documento, crear_archivado } from "../thunks/indexacionExpedientes";
// import AnularDocumnetoModal from "./AnularDocumento";
import { obtener_usuario_logueado } from "../../Expedientes/aperturaExpedientes/thunks/aperturaExpedientes";
import { SerieDocumentalScreen } from "../../Expedientes/indexacionExpedientes/screens/SerieDocumentalScreen";
import { ExpedienteSeleccionado } from "../../Expedientes/indexacionExpedientes/screens/ExpedienteSeleccionado";
import { ArchivoDocumento } from "../../Expedientes/indexacionExpedientes/screens/ArchivoDocumento";
import AnularDocumnetoModal from "../../Expedientes/indexacionExpedientes/screens/AnularDocumento";
import { borrar_documento, crear_archivado } from "../../Expedientes/indexacionExpedientes/thunks/indexacionExpedientes";
import { Archibo } from "./Archibo";
import { useParams } from 'react-router-dom';

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
export const Series: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [expediente, set_expediente] = useState<any>(null);
    const [id_documento_seleccionado, set_id_documento_seleccionado] = useState<any>(null);
    const [configuracion, set_configuracion] = useState<any>(null);
    const [usuario, set_usuario] = useState<any>(null);
    const [abrir_modal_anular, set_abrir_modal_anular] = useState<boolean>(false);
    const [abrir_modal_buscar, set_abrir_modal_buscar] = useState<boolean>(false);
    const [limpiar, set_limpiar] = useState<boolean>(false);
    const [archivos, set_archivos] = useState<any>([]);
    const [actualizar, set_actualizar] = useState<boolean>(false);
    const [anulado, set_anulado] = useState<boolean>(false);

    // Sección apertura
    const [tdr, set_tdr] = useState<any>({});
    const [seccion, set_seccion] = useState<string>("");
    const [serie, set_serie] = useState<any>("");

    useEffect(() => {
        obtener_usuario_logueado_fc();
    }, []);

    useEffect(() => {
        if (configuracion !== null)
            configuracion?.expediente.length > 0 ? set_anulado(configuracion?.expediente[0]?.anulado) : set_anulado(false);
    }, [configuracion]);

    const borrar_documento_fc: () => void = () => {
        dispatch(borrar_documento(id_documento_seleccionado)).then((response: any) => {
            if (response.success)
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
        if (!actualizar) {
            const data_documentos: any[] = archivos.map((obj: any) => obj.data_json);
            const data_archivos: File[] = archivos.map((obj: any) => obj.archivo);
            const form_data = new FormData();
            form_data.append('data_documentos', JSON.stringify(data_documentos));
            // form_data.append('archivos', data_archivos[0]);
            data_archivos.forEach((archivo: File) => { form_data.append("archivos", archivo); });
            dispatch(crear_archivado(form_data, expediente?.id_expediente_documental)).then((response: any) => {
                if (response.success)
                    set_limpiar(true);
            });
        }
    };

    useEffect(() => {
        if (limpiar) {
            set_archivos([]);
            set_limpiar(false);
            set_expediente(null);
            set_configuracion(null);
        }
    }, [limpiar]);

    // const { currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas } = useAppSelector(state.BandejaTareasSlice)

    const { currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas } = useAppSelector((state) => state.BandejaTareasSlice);
    return (
        <>
            <Grid
                container
                sx={class_css}
            >
               

           
                {/* <button onClick={() => console.log({ currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas })} >Haz clic aquí</button> */}

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
                <Archibo currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas={currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas} limpiar_formulario={limpiar_formulario} expediente={expediente} limpiar={limpiar} serie={serie} set_archivos={set_archivos} configuracion={configuracion} set_actualizar={set_actualizar} set_id_documento_seleccionado={set_id_documento_seleccionado}></Archibo>
            </Grid>}
            {/* <Grid container                 sx={class_css}
>
                <Grid item xs={12} sm={12}>
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
                            {(expediente !== null && !actualizar && !anulado) && <Button
                                color='success'
                                variant='contained'
                                startIcon={<SaveIcon />}
                                onClick={() => { crear_obj_indexacion() }}
                            >
                                Guardar
                            </Button>}
                            <Button
                                // color='inherit'
                                variant="outlined"
                                startIcon={<CleanIcon />}
                                onClick={() => { limpiar_formulario() }}
                            >
                                Limpiar
                            </Button>
                            
                            {<AnularDocumnetoModal is_modal_active={abrir_modal_anular} set_is_modal_active={set_abrir_modal_anular} title={"Anular expediente"} user_info={usuario} id_expediente={id_documento_seleccionado}></AnularDocumnetoModal>}
                          
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
            </Grid> */}
        </>
    )
}