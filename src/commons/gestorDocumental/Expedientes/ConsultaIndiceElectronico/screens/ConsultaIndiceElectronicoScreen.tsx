import { Grid, Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { obtener_usuario_logueado } from "../../aperturaExpedientes/thunks/aperturaExpedientes";
import { useAppDispatch } from "../../../../../hooks";
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { ExpedienteSeleccionado } from "./ExpedienteSeleccionado";
import { Title } from "../../../../../components/Title";
import { IndiceSeleccionado } from "./IndiceSeleccionado";
import { VerCierreIndiceElectronico } from "./VerCierreIndiceElectronico";
import BuscarExpediente from "../../FirmaCierreIndiceElectronico/screens/BuscarExpediente";
import jsPDF from "jspdf";
import { logo_cormacarena_h } from "../../../../conservacion/Reportes/logos/logos";
import autoTable from "jspdf-autotable";
import { download_xls_props } from "./XLS_descargar_props";
dayjs.extend(dayOfYear);
const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
}

const class_button_purple = { borderColor: "#7d2181", color: '#7d2181' };

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaIndiceElectronicoScreen: React.FC = () => {
    const navigate = useNavigate();
    const [expediente, set_expediente] = useState<any>(null);
    const [indice, set_indice] = useState<any>(null);
    const [columns, set_columns] = useState<any>(null);
    const [indice_cierre, set_indice_cierre] = useState<any>(null);
    const [abrir_modal_buscar, set_abrir_modal_buscar] = useState<boolean>(false);
    const [limpiar, set_limpiar] = useState<boolean>(false);
    const [visor, set_visor] = useState<any>();
    const [doc, set_doc] = useState<jsPDF>(new jsPDF({ orientation: "landscape" }));
    const [doc_height, set_doc_height] = useState<number>(0);
    const [titulo_reporte, set_titulo_reporte] = useState<any>();

    useEffect(() => {
        if (limpiar) {
            set_expediente(null);
            set_indice(null);
            set_limpiar(false);
        }
    }, [limpiar]);

    const salir_expediente: () => void = () => {
        navigate('/home');
    }

    const generar_reporte_indice: () => void = () => {
        crear_encabezado();
        let page_position = 1;
        doc.setFontSize(11);
        // seccion informacion de expedientes
        doc.setFont("Arial", "bold"); // establece la fuente en Arial
        doc.line((doc.getTextWidth('Información del expediente') + 19.5), 30, doc.internal.pageSize.width - 20, 30);
        doc.line(18, 45, doc.internal.pageSize.width - 20, 45);
        doc.line(18, 30, 18, 45); // Linea vertical
        doc.line(18, 30, 19, 30);
        doc.line(doc.internal.pageSize.width - 20, 30, doc.internal.pageSize.width - 20, 45); // Linea vertical final
        doc.text('Información del expediente', 19, 31);
        doc.text('Título: ', 21, 36);
        doc.text('TRD asociada: ', 100, 36);
        doc.text('Serie documental: ', 170, 36);
        doc.text('Estado del expediente: ', 21, 42);
        doc.text('Fecha de cierre de expediente: ', 100, 42);
        doc.setFont("Arial", "normal"); // establece la fuente en Arial
        doc.text(expediente.titulo_expediente, 35, 36);
        doc.text(expediente.nombre_trd_origen, 127, 36);
        doc.text(`${expediente.nombre_serie_origen} ${expediente.nombre_subserie_origen !== null ? '/' + expediente.nombre_subserie_origen : ''}`, 202, 36);
        doc.text(expediente.estado === 'A' ? 'Abierto' : 'Cerrado', 62, 42);
        doc.text(dayjs(expediente.fecha_cierre_reapertura_actual).format('DD/MM/YYYY'), 154, 42);
        // seccion informacion de indice
        doc.setFont("Arial", "bold"); // establece la fuente en Arial
        doc.text('Información del índice electrónico del expediente', 19, 51);
        doc.line((doc.getTextWidth('Información del índice electrónico del expediente') + 19.5), 50, doc.internal.pageSize.width - 20, 50);
        doc.line(18, 60, doc.internal.pageSize.width - 20, 60);
        doc.line(18, 50, 18, 60); // Linea vertical
        doc.line(18, 50, 19, 50);
        doc.line(doc.internal.pageSize.width - 20, 50, doc.internal.pageSize.width - 20, 60); // Linea vertical final
        doc.text('Estado de índice electrónico del expediente: ', 21, 57);
        doc.text('Fecha de apertura de índice: ', 120, 57);
        doc.text('Fecha de cierre de índice: ', 200, 57);
        doc.setFont("Arial", "normal"); // establece la fuente en Arial
        doc.text(indice.abierto ? 'Abierto' : 'Cerrado', 97, 57);
        doc.text(dayjs(indice.fecha_indice_electronico).format('DD/MM/YYYY'), 170, 57);
        doc.text(dayjs(indice?.fecha_cierre).format('DD/MM/YYYY'), 245, 57);
        if (indice.docs_indice_electronico_exp.length > 0) {
            [indice].forEach((report: any) => {
                autoTable(doc, {
                    theme: 'plain',
                    columns: [
                        { header: 'Id documento', dataKey: 'id_doc_indice_electronico_exp' },
                        { header: 'Nombre documento', dataKey: 'nombre_documento' },
                        { header: 'Tipología documental', dataKey: 'nombre_tipologia' },
                        { header: 'Fecha de creación del documento', dataKey: 'fecha_creacion_doc' },
                        { header: 'Fecha de incoporación al expediente', dataKey: 'fecha_incorporacion_exp' },
                        { header: 'Valor huella', dataKey: 'valor_huella' },
                        { header: 'Función resumen', dataKey: 'funcion_resumen' },
                        { header: 'Orden de doc en expediente', dataKey: 'orden_doc_expediente' },
                        { header: 'Página inicio', dataKey: 'pagina_inicio' },
                        { header: 'Página final', dataKey: 'pagina_fin' },
                        { header: 'Formato', dataKey: 'formato' },
                        { header: 'Tamaño', dataKey: 'tamagno_kb' },
                        { header: 'Origen', dataKey: 'origen_archivo' },
                        { header: 'Es anexo', dataKey: 'es_un_archivo_anexo' },
                        { header: 'Documento principal', dataKey: 'documento_principal' },
                        { header: 'Tipología (no TRD)', dataKey: 'tipologia_no_creada_trd' },
                    ],
                    didDrawCell: (data) => {
                        doc.setLineWidth(0);
                        doc.setDrawColor(0, 0, 0);
                        doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height);
                        doc.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y);
                        if (data.row.index === data.table.body.length - 1) {
                            doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
                        }
                        if (data.column.index === data.table.columns.length - 1) {
                            doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
                        }
                    },
                    didDrawPage: (data) => {
                        if (data.pageNumber === doc.getNumberOfPages()) {
                            doc.setFont("Arial", "bold"); 
                            doc.text(`Firma del cierre de índice electrónico realizado el dia ${dayjs(indice_cierre.fecha_cierre).format('DD/MM/YYYY')} por ${indice_cierre.nombre_persona_firma_cierre}`, 21, doc.internal.pageSize.height - 15);
                            doc.text("Observaciones de la firma del cierre del índice: ", 21, doc.internal.pageSize.height - 10);
                            doc.text(indice_cierre.observacion_firme_cierre, (doc.getTextWidth('Observaciones de la firma del cierre del índice') + 25), doc.internal.pageSize.height - 10);
                        }
                    },
                    body: report.docs_indice_electronico_exp,
                    styles: { halign: 'center', fontSize: 5 },
                    startY: 65,
                    margin: 18,
                });
                if (doc.internal.pageSize.getHeight() > 250) {
                    doc.addPage();
                    page_position = page_position + 1;
                    doc.setPage(page_position);
                    crear_encabezado();
                }
            });
        } else {
            doc.setFont("Arial", "bold"); // establece la fuente en Arial
            doc.text(`Firma del cierre de índice electrónico realizado el dia ${dayjs(indice_cierre.fecha_cierre).format('DD/MM/YYYY')} por ${indice_cierre.nombre_persona_firma_cierre}`, 20, 65);
            doc.text("Observaciones de la firma del cierre del índice: ", 20, 70);
            doc.text(indice_cierre.observacion_firme_cierre, (doc.getTextWidth('Observaciones de la firma del cierre del índice') + 25), 70);
        }
        doc.save('índice electrónico documental.pdf');
        // set_visor(doc.output('datauristring'));
    };
    const crear_encabezado: () => void = () => {
        const reporte_seleccionado = 'Índice electrónico de expediente';
        const title = 'Índice electrónico de expediente';
        doc.setFont('Arial', 'normal');
        doc.setFontSize(12);
        doc.addImage(logo_cormacarena_h, doc.internal.pageSize.width - 45, 8, 40, 10);
        doc.setFont('Arial', 'bold'); // establece la fuente en Arial
        doc.text('Reporte', (doc.internal.pageSize.width - doc.getTextWidth('Reporte')) / 2, 10);
        doc.text(title, (doc.internal.pageSize.width - doc.getTextWidth(title)) / 2, 15);
        doc.setFont('Arial', 'normal'); // establece la fuente en Arial
        const fecha_generacion = `Fecha de generación de reporte ${dayjs().format('DD/MM/YYYY')}`;
        doc.text(fecha_generacion, doc.internal.pageSize.width - doc.getTextWidth(fecha_generacion) - 5, 5);
        set_titulo_reporte({ reporte_seleccionado, title });
        return { reporte_seleccionado, title };
    };
    return (
        <>
            <Grid container sx={class_css}>
                <Title title="Consulta de índice electrónico documental" />
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Box
                            component="form"
                            sx={{ mt: '20px', mb: '20px' }}
                            noValidate
                            autoComplete="off"
                        >
                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={2}
                                sx={{ mt: '20px' }}
                            >
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Expediente del índice a buscar"
                                        type={'text'}
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                        value={expediente?.titulo_expediente ?? ''}
                                    />
                                </Grid>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    startIcon={<SearchIcon />}
                                    onClick={() => { set_abrir_modal_buscar(true); }}
                                >
                                    Buscar expediente
                                </Button>
                                {abrir_modal_buscar && <BuscarExpediente is_modal_active={abrir_modal_buscar} set_is_modal_active={set_abrir_modal_buscar} set_expediente={set_expediente} set_indice={set_indice}></BuscarExpediente>}
                            </Stack>
                        </Box>
                    </Grid>

                </Grid>
            </Grid>
            {expediente !== null && <Grid
                container
                sx={class_css}
            >
                <ExpedienteSeleccionado expediente={expediente}></ExpedienteSeleccionado>
            </Grid>}
            {indice !== null && expediente?.estado === 'A' && <Grid
                container
                sx={class_css}
            >
                <IndiceSeleccionado indice={indice} set_columns={set_columns}></IndiceSeleccionado>
            </Grid>}
            {indice !== null && !indice?.abierto && expediente?.estado === 'A' && <Grid
                container
                sx={class_css}
            >
                <VerCierreIndiceElectronico indice={indice} set_indice_cierre={set_indice_cierre}></VerCierreIndiceElectronico>
            </Grid>}
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        sx={{ mt: '10px' }}
                    >
                        <Button variant="outlined" sx={class_button_purple} onClick={() => { generar_reporte_indice() }}>Exportar PDF</Button>
                        {download_xls_props({
                            nurseries: indice?.docs_indice_electronico_exp, columns: columns, expediente: [expediente], nombre_archivo: 'índice electrónico documental',
                            indice: [indice],
                            info_cierre: [indice_cierre]
                        })}
                        <Button
                            color="error"
                            variant='contained'
                            startIcon={<ClearIcon />}
                            onClick={() => { salir_expediente() }}
                        >
                            Salir
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}