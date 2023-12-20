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
dayjs.extend(dayOfYear);
const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
}

const mock = {
    "id_indice_electronico_exp": 1,
    "abierto": false,
    "fecha_indice_electronico": "2023-09-07T00:00:00",
    "fecha_cierre": "2023-11-17T14:55:41.955491",
    "docs_indice_electronico_exp": [
        {
            "id_doc_indice_electronico_exp": 1,
            "id_doc_archivo_exp": 9,
            "identificación_doc_exped": "2023S0000000009",
            "nombre_documento": "ArchivoFinal22",
            "id_tipologia_documental": 43,
            "nombre_tipologia": "Actas",
            "fecha_creacion_doc": "2023-11-01T00:00:00",
            "fecha_incorporacion_exp": "2023-10-09T22:59:19.672645",
            "valor_huella": "92d3fe1e36e4188155afa31e797c098f",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 9,
            "pagina_inicio": 1,
            "pagina_fin": 10,
            "formato": "pdf",
            "tamagno_kb": 784,
            "cod_origen_archivo": "D",
            "origen_archivo": "Digitalizado",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        },
        {
            "id_doc_indice_electronico_exp": 2,
            "id_doc_archivo_exp": 10,
            "identificación_doc_exped": "2021C3120000010",
            "nombre_documento": "ArchivoFinal2ee",
            "id_tipologia_documental": 43,
            "nombre_tipologia": "Actas",
            "fecha_creacion_doc": "2023-11-01T00:00:00",
            "fecha_incorporacion_exp": "2023-10-11T15:20:39.952830",
            "valor_huella": "b94ede7618d11472f05cae9e049ea77a",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 10,
            "pagina_inicio": 11,
            "pagina_fin": 20,
            "formato": "pdf",
            "tamagno_kb": 30,
            "cod_origen_archivo": "D",
            "origen_archivo": "Digitalizado",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        },
        {
            "id_doc_indice_electronico_exp": 3,
            "id_doc_archivo_exp": 11,
            "identificación_doc_exped": "2020S0000000011",
            "nombre_documento": "ArchivoFinal22",
            "id_tipologia_documental": 43,
            "nombre_tipologia": "Actas",
            "fecha_creacion_doc": "2023-11-01T00:00:00",
            "fecha_incorporacion_exp": "2023-10-11T16:33:55.776239",
            "valor_huella": "92d3fe1e36e4188155afa31e797c098f",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 11,
            "pagina_inicio": 21,
            "pagina_fin": 30,
            "formato": "pdf",
            "tamagno_kb": 784,
            "cod_origen_archivo": "D",
            "origen_archivo": "Digitalizado",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        },
        {
            "id_doc_indice_electronico_exp": 4,
            "id_doc_archivo_exp": 12,
            "identificación_doc_exped": "2020S0000000012",
            "nombre_documento": "Nuevo",
            "id_tipologia_documental": null,
            "fecha_creacion_doc": "2023-10-11T00:00:00",
            "fecha_incorporacion_exp": "2023-10-11T21:37:18.509611",
            "valor_huella": "816be98a002af277024f449e703a2ff2",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 12,
            "pagina_inicio": 31,
            "pagina_fin": 31,
            "formato": "pdf",
            "tamagno_kb": 59,
            "cod_origen_archivo": "E",
            "origen_archivo": "Electronico",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        },
        {
            "id_doc_indice_electronico_exp": 5,
            "id_doc_archivo_exp": 13,
            "identificación_doc_exped": "2020S0000000013",
            "nombre_documento": "ArchivoFinal22",
            "id_tipologia_documental": 43,
            "nombre_tipologia": "Actas",
            "fecha_creacion_doc": "2023-11-01T00:00:00",
            "fecha_incorporacion_exp": "2023-10-11T21:40:02.258405",
            "valor_huella": "92d3fe1e36e4188155afa31e797c098f",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 13,
            "pagina_inicio": 32,
            "pagina_fin": 41,
            "formato": "pdf",
            "tamagno_kb": 784,
            "cod_origen_archivo": "D",
            "origen_archivo": "Digitalizado",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        },
        {
            "id_doc_indice_electronico_exp": 6,
            "id_doc_archivo_exp": 14,
            "identificación_doc_exped": "2023S0000000014",
            "nombre_documento": "Nuevo",
            "id_tipologia_documental": null,
            "fecha_creacion_doc": "2023-10-11T00:00:00",
            "fecha_incorporacion_exp": "2023-10-11T21:54:09.056354",
            "valor_huella": "816be98a002af277024f449e703a2ff2",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 14,
            "pagina_inicio": 42,
            "pagina_fin": 42,
            "formato": "pdf",
            "tamagno_kb": 59,
            "cod_origen_archivo": "E",
            "origen_archivo": "Electronico",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        },
        {
            "id_doc_indice_electronico_exp": 8,
            "id_doc_archivo_exp": 16,
            "identificación_doc_exped": "2021C3120000016",
            "nombre_documento": "NA",
            "id_tipologia_documental": null,
            "fecha_creacion_doc": "2023-10-24T14:54:24",
            "fecha_incorporacion_exp": "2023-10-24T19:54:25.184395",
            "valor_huella": "816be98a002af277024f449e703a2ff2",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 16,
            "pagina_inicio": 53,
            "pagina_fin": 53,
            "formato": "pdf",
            "tamagno_kb": 59,
            "cod_origen_archivo": "F",
            "origen_archivo": "Fisico",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        },
        {
            "id_doc_indice_electronico_exp": 10,
            "id_doc_archivo_exp": 18,
            "identificación_doc_exped": "2023S0000000018",
            "nombre_documento": "ArchivoFinal Z",
            "id_tipologia_documental": null,
            "fecha_creacion_doc": "2023-10-27T20:33:26",
            "fecha_incorporacion_exp": "2023-10-28T01:33:27.954605",
            "valor_huella": "bdff62ec705a7f8c7a2d10bfaf72f9ee",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 18,
            "pagina_inicio": 64,
            "pagina_fin": 73,
            "formato": "pdf",
            "tamagno_kb": 268,
            "cod_origen_archivo": "D",
            "origen_archivo": "Digitalizado",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        },
        {
            "id_doc_indice_electronico_exp": 12,
            "id_doc_archivo_exp": 20,
            "identificación_doc_exped": "2023S0000000020",
            "nombre_documento": "ArchivoFinal o",
            "id_tipologia_documental": null,
            "fecha_creacion_doc": "2023-10-27T20:35:03",
            "fecha_incorporacion_exp": "2023-10-28T01:35:04.550983",
            "valor_huella": "bdff62ec705a7f8c7a2d10bfaf72f9ee",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 20,
            "pagina_inicio": 84,
            "pagina_fin": 93,
            "formato": "pdf",
            "tamagno_kb": 268,
            "cod_origen_archivo": "D",
            "origen_archivo": "Digitalizado",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        },
        {
            "id_doc_indice_electronico_exp": 13,
            "id_doc_archivo_exp": 21,
            "identificación_doc_exped": "2023S0000000021",
            "nombre_documento": "ArchivoFinal22",
            "id_tipologia_documental": null,
            "fecha_creacion_doc": "2023-10-27T20:57:42",
            "fecha_incorporacion_exp": "2023-10-28T01:57:43.939744",
            "valor_huella": "bdff62ec705a7f8c7a2d10bfaf72f9ee",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 21,
            "pagina_inicio": 94,
            "pagina_fin": 103,
            "formato": "pdf",
            "tamagno_kb": 268,
            "cod_origen_archivo": "D",
            "origen_archivo": "Digitalizado",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        },
        {
            "id_doc_indice_electronico_exp": 14,
            "id_doc_archivo_exp": 22,
            "identificación_doc_exped": "2023S0000000022",
            "nombre_documento": "Ny",
            "id_tipologia_documental": null,
            "fecha_creacion_doc": "2023-10-28T08:30:42",
            "fecha_incorporacion_exp": "2023-10-28T13:30:43.387924",
            "valor_huella": "bdff62ec705a7f8c7a2d10bfaf72f9ee",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 22,
            "pagina_inicio": 104,
            "pagina_fin": 104,
            "formato": "pdf",
            "tamagno_kb": 268,
            "cod_origen_archivo": "D",
            "origen_archivo": "Digitalizado",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        },
        {
            "id_doc_indice_electronico_exp": 15,
            "id_doc_archivo_exp": 23,
            "identificación_doc_exped": "2021C3120000023",
            "nombre_documento": "NuevoT",
            "id_tipologia_documental": null,
            "fecha_creacion_doc": "2023-10-28T14:28:55",
            "fecha_incorporacion_exp": "2023-10-28T19:28:56.148406",
            "valor_huella": "bdff62ec705a7f8c7a2d10bfaf72f9ee",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 23,
            "pagina_inicio": 105,
            "pagina_fin": 105,
            "formato": "pdf",
            "tamagno_kb": 268,
            "cod_origen_archivo": "F",
            "origen_archivo": "Fisico",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        },
        {
            "id_doc_indice_electronico_exp": 16,
            "id_doc_archivo_exp": 24,
            "identificación_doc_exped": "2023S0000000024",
            "nombre_documento": "ArchivoOct",
            "id_tipologia_documental": null,
            "fecha_creacion_doc": "2023-10-30T08:37:18",
            "fecha_incorporacion_exp": "2023-10-30T13:37:19.165441",
            "valor_huella": "bdff62ec705a7f8c7a2d10bfaf72f9ee",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 24,
            "pagina_inicio": 106,
            "pagina_fin": 106,
            "formato": "pdf",
            "tamagno_kb": 268,
            "cod_origen_archivo": "D",
            "origen_archivo": "Digitalizado",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        },
        {
            "id_doc_indice_electronico_exp": 17,
            "id_doc_archivo_exp": 25,
            "identificación_doc_exped": "2023S0000000025",
            "nombre_documento": "Ne",
            "id_tipologia_documental": null,
            "fecha_creacion_doc": "2023-10-30T08:39:20",
            "fecha_incorporacion_exp": "2023-10-30T13:39:20.655402",
            "valor_huella": "bdff62ec705a7f8c7a2d10bfaf72f9ee",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 25,
            "pagina_inicio": 107,
            "pagina_fin": 107,
            "formato": "pdf",
            "tamagno_kb": 268,
            "cod_origen_archivo": "E",
            "origen_archivo": "Electronico",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        },
        {
            "id_doc_indice_electronico_exp": 18,
            "id_doc_archivo_exp": 26,
            "identificación_doc_exped": "2023S0000000026",
            "nombre_documento": "MP",
            "id_tipologia_documental": null,
            "fecha_creacion_doc": "2023-10-30T09:23:42",
            "fecha_incorporacion_exp": "2023-10-30T14:23:42.767596",
            "valor_huella": "bdff62ec705a7f8c7a2d10bfaf72f9ee",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 26,
            "pagina_inicio": 108,
            "pagina_fin": 108,
            "formato": "pdf",
            "tamagno_kb": 268,
            "cod_origen_archivo": "F",
            "origen_archivo": "Fisico",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        },
        {
            "id_doc_indice_electronico_exp": 20,
            "id_doc_archivo_exp": 28,
            "identificación_doc_exped": "2021C3120000028",
            "nombre_documento": "New",
            "id_tipologia_documental": null,
            "fecha_creacion_doc": "2023-10-30T11:12:23",
            "fecha_incorporacion_exp": "2023-10-30T16:12:25.365692",
            "valor_huella": "bdff62ec705a7f8c7a2d10bfaf72f9ee",
            "funcion_resumen": "MD5",
            "orden_doc_expediente": 28,
            "pagina_inicio": 110,
            "pagina_fin": 110,
            "formato": "pdf",
            "tamagno_kb": 268,
            "cod_origen_archivo": "F",
            "origen_archivo": "Fisico",
            "es_un_archivo_anexo": false,
            "id_doc_indice_Anexo": null,
            "documento_principal": null,
            "tipologia_no_creada_trd": null
        }
    ]
}


const class_button_purple = { borderColor: "#7d2181", color: '#7d2181' };

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaIndiceElectronicoScreen: React.FC = () => {
    const navigate = useNavigate();
    const [expediente, set_expediente] = useState<any>(null);
    const [indice, set_indice] = useState<any>(null);
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
        debugger
        indice
        expediente
        indice_cierre
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
        // doc.save('prueba.pdf');
        set_visor(doc.output('datauristring'));
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
                <IndiceSeleccionado indice={indice}></IndiceSeleccionado>
            </Grid>}
            {indice !== null && !indice?.abierto && expediente?.estado === 'A' && <Grid
                container
                sx={class_css}
            >
                <VerCierreIndiceElectronico indice={indice} set_indice_cierre={set_indice_cierre}></VerCierreIndiceElectronico>
            </Grid>}
            <Box component="form" noValidate autoComplete="off">
                <embed
                    src={visor}
                    type="application/pdf"
                    width="100%"
                    height="500px"
                />
            </Box>
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        sx={{ mt: '10px' }}
                    >
                        <Button variant="outlined" sx={class_button_purple} onClick={() => { generar_reporte_indice() }}>Exportar PDF</Button>
                        <Button variant="outlined" sx={class_button_purple}>Exportar XLS</Button>
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