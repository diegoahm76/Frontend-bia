/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField, Box, Button, Stack, FormHelperText, Switch, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Title } from "../../../../components";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { obtener_viveros } from "../../dashBoardViveros/thunks/DashBoardViveros";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import dayjs from "dayjs";
import { logo_cormacarena_h } from "../logos/logos";
import { reporte_estado_actividad, reporte_evolucion_lote, reporte_mortalidad, reporte_plantas_sd } from "../thunks/SubsistemaConservacion";
import BuscarPlantas from "./BuscarPlantas";
import ReportesXLS from "./reportesXLS";
import { DialogNoticacionesComponent } from "../../../../components/DialogNotificaciones";

const lista_reporte = [{ name: 'Mortalidad de Planta', value: 'MP' }, { name: 'Plantas Solicitadas vs Plantas Despachadas', value: 'PSPD' }, { name: 'Estado y Actividad de Planta', value: 'EAP' }, { name: 'Evolución por Lote', value: 'EL' }];
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SubsistemaConservacionScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Variables globales
    const [visor, set_visor] = useState<any>();
    const [titulo_reporte, set_titulo_reporte] = useState<any>();
    const [reporte, set_reporte] = useState<any[]>([]);
    const [lista_viveros, set_lista_viveros] = useState<any[]>([]);
    const [seleccion_vivero, set_seleccion_vivero] = useState<string>("");
    const [seleccion_reporte, set_seleccion_reporte] = useState<string>("");
    const [numero_lote, set_numero_lote] = useState<string | number>("");
    const [año_lote, set_año_lote] = useState<string | number>("");
    const [seleccion_planta, set_seleccion_planta] = useState<any>(0);
    const [fecha_desde, set_fecha_desde] = useState<Date | null>(null);
    const [fecha_hasta, set_fecha_hasta] = useState<Date | null>(null);
    const [reporte_consolidado, set_reporte_consolidado] = useState<boolean>(false);
    const [abrir_modal_bien, set_abrir_modal_bien] = useState<boolean>(false);
    // Errors
    const mensaje_error = "El campo es obligatorio.";
    const [error_reporte, set_error_reporte] = useState<boolean>(false);
    const [error_vivero, set_error_vivero] = useState<boolean>(false);
    const [error_planta, set_error_planta] = useState<boolean>(false);
    const [error_fecha_desde, set_error_fecha_desde] = useState<boolean>(false);
    const [error_fecha_hasta, set_error_fecha_hasta] = useState<boolean>(false);
    const [error_año_lote, set_error_año_lote] = useState<boolean>(false);
    const [error_numero_lote, set_error_numero_lote] = useState<boolean>(false);
    // Notificaciones
    const [titulo_notificacion, set_titulo_notificacion] = useState<string>("");
    const [mensaje_notificacion, set_mensaje_notificacion] = useState<string>("");
    const [tipo_notificacion, set_tipo_notificacion] = useState<string>("");
    const [abrir_modal, set_abrir_modal] = useState<boolean>(false);
    const [dialog_notificaciones_is_active, set_dialog_notificaciones_is_active] = useState<boolean>(false);
    // eslint-disable-next-line new-cap
    const [doc, set_doc] = useState<jsPDF>(new jsPDF());
    const [doc_height, set_doc_height] = useState<number>(doc.internal.pageSize.getHeight());

    useEffect(() => {
        obtener_viveros_fc();
    }, []);

    const limpiar_formulario: () => void = () => {
        set_reporte([]);
        set_seleccion_vivero("");
        set_seleccion_reporte("");
        set_seleccion_planta(0);
        set_fecha_desde(null);
        set_fecha_hasta(null);
        set_reporte_consolidado(false);
        set_abrir_modal_bien(false);
    }

    const obtener_viveros_fc: () => void = () => {
        dispatch(obtener_viveros()).then((response: any) => {
            const viveros_activos = response.data.filter((resp: { activo: boolean; }) => resp.activo);
            set_lista_viveros(viveros_activos);
        })
    }

    const reporte_mortalidad_fc: () => void = () => {
        dispatch(reporte_mortalidad({ seleccion_vivero, seleccion_planta, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD'), reporte_consolidado })).then((response: any) => {
            set_reporte(response.data);
            if (response.data.length === 0)
                generar_notificación_reporte('Notificación', 'info', 'No se encontró información con los filtros seleccionados.', true);
        })
    }
    const reporte_plantas_sd_fc: () => void = () => {
        dispatch(reporte_plantas_sd({ seleccion_vivero, seleccion_planta, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD'), reporte_consolidado })).then((response: any) => {
            set_reporte(response.data);
            if (response.data.length === 0)
                generar_notificación_reporte('Notificación', 'info', 'No se encontró información con los filtros seleccionados.', true);

        })
    }
    const reporte_estado_actividad_fc: () => void = () => {
        dispatch(reporte_estado_actividad({ seleccion_vivero, seleccion_planta, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD'), reporte_consolidado })).then((response: any) => {
            set_reporte(response.data);
            if (response.data.length === 0)
                generar_notificación_reporte('Notificación', 'info', 'No se encontró información con los filtros seleccionados.', true);

        })
    }
    const reporte_evolucion_lote_fc: () => void = () => {
        dispatch(reporte_evolucion_lote({ seleccion_vivero, seleccion_planta, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD'), reporte_consolidado, numero_lote, año_lote })).then((response: any) => {
            set_reporte(response.data);
            if (response.data.length === 0)
                generar_notificación_reporte('Notificación', 'info', 'No se encontró información con los filtros seleccionados.', true);

        })
    }

    const cambio_seleccion_vivero: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_seleccion_vivero(e.target.value);
        set_error_vivero(e.target.value === "");
        if (e.target.value === "Todos")
            set_reporte_consolidado(false);
    }
    const cambio_reporte: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_seleccion_reporte(e.target.value);
        set_error_reporte(e.target.value === "");
        if (e.target.value !== 'EL') {
            set_error_año_lote(false);
            set_error_numero_lote(false);
            set_error_planta(false);
            set_error_vivero(false);
        }
    }

    const handle_change_fecha_desde = (date: Date | null): void => {
        set_fecha_desde(date);
        set_error_fecha_desde(date === null);
    };

    const handle_change_fecha_hasta = (date: Date | null): void => {
        set_fecha_hasta(date);
        set_error_fecha_hasta(date === null);
    };

    const cambio_numero_lote: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_numero_lote(e.target.value);
        set_error_numero_lote(e.target.value === "");
    };

    const cambio_año_lote: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_año_lote(e.target.value);
        set_error_año_lote(e.target.value === "");
    };

    const handle_export_pdf = () => {
        // eslint-disable-next-line new-cap
        set_doc(new jsPDF());
        set_visor(null);
        set_doc_height(doc.internal.pageSize.getHeight());
        if (seleccion_reporte === 'MP') {
            reporte_mortalidad_fc();
        }
        if (seleccion_reporte === 'PSPD') {
            reporte_plantas_sd_fc();
        }
        if (seleccion_reporte === 'EAP') {
            reporte_estado_actividad_fc();
        }
        if (seleccion_reporte === 'EL') {
            reporte_evolucion_lote_fc();
        }
    }

    const generar_notificación_reporte = (titulo: string, tipo: string, mensaje: string, active: boolean) => {
        set_titulo_notificacion(titulo);
        set_tipo_notificacion(tipo);
        set_mensaje_notificacion(mensaje)
        set_dialog_notificaciones_is_active(active);
        set_abrir_modal(active);
    }

    const nueva_pagina: (doc: jsPDF, title: string, page_position: number) => void = (doc: jsPDF, title: string, page_position: number) => {
        doc.addPage();
        doc.setPage(page_position);
        crear_encabezado();
    }

    const crear_encabezado: () => { reporte_seleccionado: any, title: string } = () => {
        const reporte_seleccionado = lista_reporte.find((r: any) => r.value === seleccion_reporte);
        const title = (`Reporte - ${(reporte_seleccionado !== null && reporte_seleccionado !== undefined) ? reporte_seleccionado.name : ''}`);
        doc.setFont('Arial', 'normal');
        doc.setFontSize(12);
        const img_width = 140;
        const img_height = 15;
        const img_x = (doc.internal.pageSize.width - img_width) / 2;
        const img_y = doc.internal.pageSize.getHeight() - img_height - 10; // Aquí se resta 10 unidades para dejar algo de espacio entre la imagen y el borde inferior de la página
        doc.addImage(logo_cormacarena_h, 160, 10, 40, 15)
        // doc.addImage(image_data2_1, img_x, img_y, img_width, img_height,);;
        doc.setFont("Arial", "bold"); // establece la fuente en Arial
        doc.text(title, ((doc.internal.pageSize.width - doc.getTextWidth(title)) / 2), 15);
        doc.text(seleccion_planta.nombre ?? "", ((doc.internal.pageSize.width - doc.getTextWidth(seleccion_planta.nombre)) / 2), 20);
        const fechas = `${dayjs(fecha_desde).format('DD/MM/YYYY')} - ${dayjs(fecha_hasta).format('DD/MM/YYYY')}`;
        doc.text(fechas, ((doc.internal.pageSize.width - doc.getTextWidth(fechas)) / 2), 25);
        doc.setFont("Arial", "normal"); // establece la fuente en Arial
        const fecha_generacion = `Fecha de generación de reporte ${dayjs().format('DD/MM/YYYY')}`;
        doc.text(fecha_generacion, ((doc.internal.pageSize.width - doc.getTextWidth(fecha_generacion)) - 5), 5);
        doc.line(5, 30, (doc.internal.pageSize.width - 5), 30);
        doc.line(5, 35, (doc.internal.pageSize.width - 5), 35);
        set_titulo_reporte({ reporte_seleccionado, title });
        return { reporte_seleccionado, title };
    }

    const set_json_model: (data: any) => any = (data: any) => {
        const json_return: any = [];
        data.forEach((json: any) => {
            json_return.push([{
                "tipo_origen": "Donación",
                "cantidad": json.entradas.cantidad_donacion !== null && json.entradas.cantidad_donacion !== undefined ? json.entradas.cantidad_donacion + ' Und' : '0 Und',
                "cantidad_produccion": json.entradas.cantidad_donacion_produccion !== null && json.entradas.cantidad_donacion !== undefined ? json.entradas.cantidad_donacion + ' Und' : '0 Und',
                "cantidad_distribucion": json.entradas.cantidad_donacion_distribucion !== null && json.entradas.cantidad_donacion !== undefined ? json.entradas.cantidad_donacion + ' Und' : '0 Und'
            },
            {
                "tipo_origen": "Resarcimiento",
                "cantidad": json.entradas.cantidad_resarcimiento !== null && json.entradas.cantidad_resarcimiento_distribucion !== undefined ? json.entradas.cantidad_resarcimiento_distribucion + ' Und' : '0 Und',
                "cantidad_produccion": json.entradas.cantidad_resarcimiento_produccion !== null && json.entradas.cantidad_resarcimiento_distribucion !== undefined ? json.entradas.cantidad_resarcimiento_distribucion + ' Und' : '0 Und',
                "cantidad_distribucion": json.entradas.cantidad_resarcimiento_distribucion !== null && json.entradas.cantidad_resarcimiento_distribucion !== undefined ? json.entradas.cantidad_resarcimiento_distribucion + ' Und' : '0 Und'
            },
            {
                "tipo_origen": "Compensación",
                "cantidad": json.entradas.cantidad_compensacion !== null && json.entradas.cantidad_compensacion_distribucion !== undefined ? json.entradas.cantidad_compensacion_distribucion + ' Und' : '0 Und',
                "cantidad_produccion": json.entradas.cantidad_compensacion_produccion !== null && json.entradas.cantidad_compensacion_distribucion !== undefined ? json.entradas.cantidad_compensacion_distribucion + ' Und' : '0 Und',
                "cantidad_distribucion": json.entradas.cantidad_compensacion_distribucion !== null && json.entradas.cantidad_compensacion_distribucion !== undefined ? json.entradas.cantidad_compensacion_distribucion + ' Und' : '0 Und',
            },
            {
                "tipo_origen": "Compras / No Especificado",
                "cantidad": json.entradas.cantidad_compras_no_especificado !== null && json.entradas.cantidad_compras_no_especificado_distribucion !== undefined ? json.entradas.cantidad_compras_no_especificado_distribucion + ' Und' : '0 Und',
                "cantidad_produccion": json.entradas.cantidad_compras_no_especificado_produccion !== null && json.entradas.cantidad_compras_no_especificado_distribucion !== undefined ? json.entradas.cantidad_compras_no_especificado_distribucion + ' Und' : '0 Und',
                "cantidad_distribucion": json.entradas.cantidad_compras_no_especificado_distribucion !== null && json.entradas.cantidad_compras_no_especificado_distribucion !== undefined ? json.entradas.cantidad_compras_no_especificado_distribucion + ' Und' : '0 Und'
            }]

            );
        });
        return json_return;
    }

    const validar_formulario: () => void = () => {
        set_error_reporte(seleccion_reporte === "");
        set_error_fecha_desde(fecha_desde === null);
        set_error_fecha_hasta(fecha_hasta === null);
        set_error_planta(seleccion_planta === 0);
        if (seleccion_reporte === "EL") {
            set_error_vivero(seleccion_vivero === "");
            set_error_numero_lote(numero_lote === "")
            set_error_año_lote(año_lote === "")
        }
        if (seleccion_reporte !== "") {
            if (fecha_desde !== null && fecha_hasta !== null && seleccion_planta !== 0)
                handle_export_pdf();
            if (seleccion_reporte === "EL" && fecha_desde !== null && fecha_hasta !== null && seleccion_vivero !== "" && numero_lote !== "" && año_lote !== "" && seleccion_planta !== 0)
                handle_export_pdf();
        }
    }

    const salir_entrada: () => void = () => {
        navigate('/home');
    }

    useEffect(() => {
        set_error_planta(seleccion_planta === "");
    }, [seleccion_planta]);

    useEffect(() => {
        if (reporte.length > 0) {
            if (seleccion_reporte === 'MP') {
                generar_reporte_mortalidad();
            }
            if (seleccion_reporte === 'PSPD') {
                generar_reporte_pspd();
            }
            if (seleccion_reporte === 'EAP') {
                generar_reporte_eap();
            }
            if (seleccion_reporte === 'EL') {
                generar_reporte_el();
            }
        }
    }, [reporte]);

    const generar_reporte_mortalidad: () => void = () => {
        const reporte_titulo: { reporte_seleccionado: any, title: string } = crear_encabezado();
        let coordendas = 0;
        let page_position = 1;
        reporte.forEach((report: any) => {
            // Cliclo
            const nombre_vivero = (report.nombre_vivero !== null && report.nombre_vivero !== undefined) ? report.nombre_vivero : 'Consolidado';
            doc.circle(10, 40 + coordendas, 2, 'FD');// Circulo x vivero
            doc.setFont("Arial", "bold"); // establece la fuente en Arial
            doc.text(nombre_vivero, 14, 41 + coordendas);
            doc.setFont("Arial", "normal"); // establece la fuente en Arial
            doc.line(10, 40 + coordendas, 10, 50 + coordendas);// Linea horizontal
            doc.line(10, 50 + coordendas, 20, 50 + coordendas);// Linea vertical
            doc.line(30, 50 + coordendas, (doc.internal.pageSize.width - 30), 50 + coordendas);// Linea central de tabla
            // Tabla
            autoTable(doc, {
                theme: 'plain',
                head: [['Número de registros', 'Cantidad mortalidad', 'Mortalidad durante cuarentena']],
                columns: [{ header: 'Número de registros', dataKey: 'numero_registros' }, { header: 'Cantidad mortalidad', dataKey: 'cantidad_mortalidad' }, { header: 'Mortalidad durante cuarentena', dataKey: 'mortalidad_cuarentena' }],
                body: [{ 'numero_registros': report.numero_registros, 'cantidad_mortalidad': report.cantidad_mortalidad + ' Und', 'mortalidad_cuarentena': (report.mortalidad_cuarentena !== null && report.mortalidad_cuarentena !== undefined) ? report.mortalidad_cuarentena + ' Und' : '0 Und' }],
                styles: { halign: 'center' },
                startY: 43 + coordendas,
                margin: 32
            })
            doc.line(5, 60 + coordendas, (doc.internal.pageSize.width - 5), 60 + coordendas);// 30 Linea inferior
            coordendas = coordendas + 25;
            if ((43 + coordendas) > doc_height) {
                page_position = page_position + 1;
                nueva_pagina(doc, reporte_titulo.title, page_position);
                coordendas = 0;
            }
        });
        set_visor(doc.output('datauristring'));
    }
    const generar_reporte_pspd: () => void = () => {
        const reporte_titulo: { reporte_seleccionado: any, title: string } = crear_encabezado();
        let coordendas = 0;
        let page_position = 1;
        reporte.forEach((report: any) => {
            // Cliclo
            const nombre_vivero = (report.nombre_vivero !== null && report.nombre_vivero !== undefined) ? report.nombre_vivero : 'Consolidado';
            doc.circle(10, 40 + coordendas, 2, 'FD');// Circulo x vivero
            doc.setFont("Arial", "bold"); // establece la fuente en Arial
            doc.text(nombre_vivero, 14, 41 + coordendas);
            doc.setFont("Arial", "normal"); // establece la fuente en Arial
            doc.line(10, 40 + coordendas, 10, 50 + coordendas);// Linea horizontal
            doc.line(10, 50 + coordendas, 20, 50 + coordendas);// Linea vertical
            doc.line(30, 50 + coordendas, (doc.internal.pageSize.width - 30), 50 + coordendas);// Linea central de tabla
            // Tabla
            autoTable(doc, {
                theme: 'plain',
                head: [['Número de solicitudes', 'Cantidad total solicitada', 'Cantidad total despachada']],
                columns: [{ header: 'Número de solicitudes', dataKey: 'numero_solicitudes' }, { header: 'Cantidad total solicitada', dataKey: 'cantidad_total_solicitada' }, { header: 'Cantidad total despachada', dataKey: 'cantidad_total_despachada' }],
                body: [{ 'numero_solicitudes': report.numero_solicitudes, 'cantidad_total_solicitada': report.cantidad_total_solicitada + ' Und', 'cantidad_total_despachada': (report.cantidad_total_despachada !== null && report.cantidad_total_despachada !== undefined) ? report.cantidad_total_despachada + ' Und' : '0 Und' }], styles: { halign: 'center' },
                startY: 43 + coordendas,
                margin: 32
            })
            doc.line(5, 60 + coordendas, (doc.internal.pageSize.width - 5), 60 + coordendas);// 30 Linea inferior
            coordendas = coordendas + 25;
            if ((43 + coordendas) > doc_height) {
                page_position = page_position + 1;
                nueva_pagina(doc, reporte_titulo.title, page_position);
                coordendas = 0;
            }
        });
        set_visor(doc.output('datauristring'));
    }
    const generar_reporte_eap: () => void = () => {
        const reporte_titulo: { reporte_seleccionado: any, title: string } = crear_encabezado();
        let coordendas = 0;
        let page_position = 1;
        const report_data = set_json_model(reporte);
        reporte.forEach((report: any, index: number) => {
            const nombre_vivero = (report.nombre_vivero !== null && report.nombre_vivero !== undefined) ? report.nombre_vivero : 'Consolidado';
            doc.circle(10, 40 + coordendas, 2, 'FD');// Circulo x vivero
            doc.setFont("Arial", "bold"); // establece la fuente en Arial
            doc.text(nombre_vivero, 14, 41 + coordendas);
            doc.setFont("Arial", "normal"); // establece la fuente en Arial
            doc.line(10, 40 + coordendas, 10, 50 + coordendas);// Linea vertical
            doc.line(10, 50 + coordendas, 15, 50 + coordendas);// Linea horizontal
            doc.text('Entradas', 21, 51 + coordendas);
            doc.line(37, 50 + coordendas, (doc.internal.pageSize.width - 20), 50 + coordendas);// Linea superior central
            doc.setFont("Arial", "bold"); // establece la fuente en Arial
            doc.setFontSize(11);
            doc.text('Etapa inicial', (doc.internal.pageSize.width - 75), 54 + coordendas);
            doc.setFontSize(12);
            // -----------------------------------------------------------------------------
            doc.line(17, 50 + coordendas, 17, 135 + coordendas);// Linea vertical
            doc.line(20, 60 + coordendas, (doc.internal.pageSize.width - 30), 60 + coordendas);// Linea central de tabla
            doc.line((doc.internal.pageSize.width - 20), 50 + coordendas, (doc.internal.pageSize.width - 20), 135 + coordendas);// Linea horizontal
            doc.line(17, 50 + coordendas, 20, 50 + coordendas);// Linea horizontal pequeña
            autoTable(doc, {
                theme: 'plain',
                columns: [
                    { header: 'Tipo de origen', dataKey: 'tipo_origen' },
                    { header: 'Cantidad', dataKey: 'cantidad' },
                    { header: 'Producción', dataKey: 'cantidad_produccion' },
                    { header: 'Distribución', dataKey: 'cantidad_distribucion' }
                ],
                body: report_data[index],
                styles: { halign: 'center' },
                startY: 53 + coordendas,
                margin: 32
            });
            doc.line(34, 98.5 + coordendas, (doc.internal.pageSize.width - 20), 98.5 + coordendas);// Linea superior central
            doc.line(34, 99.5 + coordendas, (doc.internal.pageSize.width - 20), 99.5 + coordendas);// Linea superior central
            doc.line(17, 98.5 + coordendas, 21, 98.5 + coordendas);// Linea superior central
            doc.line(17, 99.5 + coordendas, 21, 99.5 + coordendas);// Linea superior central
            doc.text('Salidas', 21, 100 + coordendas);
            doc.line(50, 107 + coordendas, (doc.internal.pageSize.width - 48), 107 + coordendas);// Linea central de tabla
            autoTable(doc, {
                theme: 'plain',
                columns: [
                    { header: 'Unidades despachadas', dataKey: 'unidades_despachadas' },
                    { header: 'Unidades Mortalidad', dataKey: 'unidades_mortalidad' }
                ],
                body: [{
                    'unidades_despachadas': (report.salidas.unidades_despachadas !== null && report.salidas.unidades_despachadas !== undefined) ? report.salidas.unidades_despachadas + ' Und' : '0 Und',
                    'unidades_mortalidad': (report.salidas.unidades_mortalidad !== null && report.salidas.unidades_mortalidad !== undefined) ? report.salidas.unidades_mortalidad + ' Und' : '0 Und'
                }
                ],
                styles: { halign: 'center' },
                startY: 100 + coordendas,
                margin: 32
            });
            doc.line(41, 116.5 + coordendas, (doc.internal.pageSize.width - 20), 116.5 + coordendas);// Linea superior central
            doc.line(41, 117.5 + coordendas, (doc.internal.pageSize.width - 20), 117.5 + coordendas);// Linea superior central
            doc.line(17, 116.5 + coordendas, 21, 116.5 + coordendas);// Linea superior central
            doc.line(17, 117.5 + coordendas, 21, 117.5 + coordendas);// Linea superior central
            doc.text('Actualidad', 21, 118 + coordendas);
            const e_actual = 'Existencia actual (' + dayjs().format('DD/MM/YYYY') + ')';
            doc.text(e_actual, ((doc.internal.pageSize.width - doc.getTextWidth(e_actual)) / 2), 122 + coordendas);
            doc.line(55, 127 + coordendas, (doc.internal.pageSize.width - 56), 127 + coordendas);// Linea central de tabla
            autoTable(doc, {
                theme: 'plain',
                columns: [
                    { header: 'Producción', dataKey: 'cantidad_produccion' },
                    { header: 'Distribución', dataKey: 'cantidad_distribucion' }
                ],
                body: [{
                    'cantidad_produccion': (report.actualidad.cantidad_produccion !== null && report.actualidad.cantidad_produccion !== undefined) ? report.actualidad.cantidad_produccion + ' Und' : '0 Und',
                    'cantidad_distribucion': (report.actualidad.cantidad_distribucion !== null && report.actualidad.cantidad_distribucion !== undefined) ? report.actualidad.cantidad_distribucion + ' Und' : '0 Und'
                }
                ],
                styles: { halign: 'center' },
                startY: 121 + coordendas,
                margin: 32
            });
            doc.line(17, 135 + coordendas, (doc.internal.pageSize.width - 20), 135 + coordendas);// 30 Linea inferior
            coordendas = coordendas + 100;
            if ((120 + coordendas) > doc_height) {
                page_position = page_position + 1;
                nueva_pagina(doc, reporte_titulo.title, page_position);
                coordendas = 0;
            }
        });
        set_visor(doc.output('datauristring'));
    }
    const generar_reporte_el: () => void = () => {
        const reporte_titulo: { reporte_seleccionado: any, title: string } = crear_encabezado();
        let coordendas = 0;
        let page_position = 1;
        let coordenada_y = 40;
        reporte.forEach((report: any) => {
            const page = doc.internal.pageSize.getHeight();
            coordenada_y = report.bienes_consumidos.length === 1 ? (60 + coordendas + 20) : report.bienes_consumidos.length === 2 ? (60 + coordendas + 30) : (60 + coordendas + (report.bienes_consumidos.length * 10));
            if (coordenada_y >= (page - 50) || coordendas >= (page - 50)) {
                page_position = page_position + 1;
                nueva_pagina(doc, reporte_titulo.title, page_position);
                coordendas = 0;
                coordenada_y = 40;
            }
            doc.text('Descripción', 24, coordenada_y);
            doc.rect(24, 2 + coordenada_y, 150, 20, 'S');
            let break_line = 6;
            const resultado: any = [];
            if (report.descripcion.length > 78) {
                break_line = 3;
                for (let i = 0; i < report.descripcion.length; i += 78) {
                    resultado.push(report.descripcion.substr(i, 78));
                    if (report.descripcion.substr(i, 78).length >= 78)
                        break_line = break_line + 3;
                }
            } else {
                resultado.push(report.descripcion);
            }
            doc.text(resultado, 25, break_line + coordenada_y);
            doc.line(5, 24 + coordenada_y, (doc.internal.pageSize.width - 5), 24 + coordenada_y);// 30 Linea inferior
            //
            doc.circle(10, 40 + coordendas, 2, 'FD');// Circulo x vivero
            doc.setFont("Arial", "bold"); // establece la fuente en Arial
            doc.text(dayjs(report.fecha_incidencia).format('DD/MM/YYYY'), 14, 41 + coordendas);
            doc.setFont("Arial", "normal"); // establece la fuente en Arial
            const fecha_registro = 'Registrado en el sistema: ' + dayjs(report.fecha_registro).format('DD/MM/YYYY');
            doc.text(fecha_registro, ((doc.internal.pageSize.width - doc.getTextWidth(fecha_registro)) - 5), 41 + coordendas);
            doc.setFont("Arial", "normal"); // establece la fuente en Arial
            doc.line(10, 40 + coordendas, 10, 50 + coordendas);// Linea horizontal
            doc.line(10, 50 + coordendas, 20, 50 + coordendas);// Linea vertical
            doc.line(50, 50 + coordendas, (doc.internal.pageSize.width - 48), 50 + coordendas);// Linea central de tabla
            doc.setFont("Arial", "bold"); // establece la fuente en Arial
            // Tabla
            autoTable(doc, {
                theme: 'plain',
                columns: [{ header: 'Consecutivo', dataKey: 'consecutivo' }, { header: 'Nombre', dataKey: 'nombre_incidencia' }, { header: 'Tipo', dataKey: 'tipo_incidencia' }],
                body: [{ 'consecutivo': report.consecutivo, 'nombre_incidencia': report.nombre_incidencia, 'tipo_incidencia': report.tipo_incidencia }], styles: { halign: 'center' },
                startY: 43 + coordendas,
                margin: 32
            });
            doc.line(60, 67 + coordendas, (doc.internal.pageSize.width - 47), 67 + coordendas);// Linea central de tabla
            autoTable(doc, {
                theme: 'plain',
                columns: [{ header: 'Bienes consumidos', dataKey: 'nombre' }, { header: 'Cantidad', dataKey: 'cantidad_consumida', title: 'lt' }],
                body: report.bienes_consumidos,
                styles: { halign: 'center' },
                startY: 60 + coordendas,
                margin: 32
            });
            coordendas = coordenada_y - 30;
        });
        set_visor(doc.output('datauristring'));
    }

    return (
        <>
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item md={12} xs={12}>
                    <Title title="Compendios" />
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl required size='small' fullWidth>
                                    <InputLabel>Reporte</InputLabel>
                                    <Select
                                        value={seleccion_reporte}
                                        label="Reporte"
                                        onChange={cambio_reporte}
                                        error={error_reporte}
                                    >
                                        {lista_reporte.map((lr: any) => (
                                            <MenuItem key={lr.value} value={lr.value}>
                                                {lr.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {error_reporte && (<FormHelperText error >{mensaje_error}</FormHelperText>)}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl required={seleccion_reporte === 'EL'} size='small' fullWidth>
                                    <InputLabel>Vivero</InputLabel>
                                    <Select
                                        value={seleccion_vivero}
                                        label="Vivero"
                                        onChange={cambio_seleccion_vivero}
                                        error={error_vivero}
                                    >
                                        {seleccion_reporte !== 'EL' && <MenuItem value={"Todos"}>Todos</MenuItem>}
                                        {lista_viveros.map((vive: any) => (
                                            <MenuItem key={vive.id_vivero} value={vive.id_vivero}>
                                                {vive.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {error_vivero && (<FormHelperText error >{mensaje_error}</FormHelperText>)}
                            </Grid>
                        </Grid>
                    </Box>
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={7}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Planta"
                                            type={'text'}
                                            size="small"
                                            fullWidth
                                            value={seleccion_planta.nombre ?? ""}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            required
                                            error={error_planta}
                                        />
                                        {error_planta && (<FormHelperText error >{mensaje_error}</FormHelperText>)}
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    spacing={2}
                                >
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        startIcon={<SearchIcon />}
                                        onClick={() => { set_abrir_modal_bien(true); }}
                                        disabled={seleccion_vivero === "" && seleccion_reporte === "EL"}
                                    >
                                        Buscar planta
                                    </Button>
                                    {abrir_modal_bien && (
                                        <BuscarPlantas
                                            is_modal_active={abrir_modal_bien}
                                            set_is_modal_active={set_abrir_modal_bien}
                                            title={"Busqueda de plantas"}
                                            seleccion_planta={set_seleccion_planta}
                                            vivero={seleccion_vivero}
                                            reporte={seleccion_reporte} />
                                    )}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                    {(seleccion_reporte === 'EL') && <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Lote número"
                                            type={'text'}
                                            size="small"
                                            fullWidth
                                            value={numero_lote}
                                            InputProps={{
                                                type: "number"
                                            }}
                                            onChange={cambio_numero_lote}
                                            required={seleccion_reporte === 'EL'}
                                            error={error_numero_lote}
                                        />
                                        {error_numero_lote && (<FormHelperText error >{mensaje_error}</FormHelperText>)}

                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Año del lote"
                                            type={'text'}
                                            size="small"
                                            fullWidth
                                            value={año_lote}
                                            InputProps={{
                                                type: "number"
                                            }}
                                            onChange={cambio_año_lote}
                                            required={seleccion_reporte === 'EL'}
                                            error={error_año_lote}
                                        />
                                        {error_año_lote && (<FormHelperText error >{mensaje_error}</FormHelperText>)}

                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>}
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Fecha desde"
                                                value={fecha_desde}
                                                onChange={(newValue) => {
                                                    handle_change_fecha_desde(newValue);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField required fullWidth size="small" {...params} error={error_fecha_desde} />
                                                )}
                                                maxDate={fecha_hasta}
                                            />
                                            {error_fecha_desde && (<FormHelperText error >{mensaje_error}</FormHelperText>)}
                                        </LocalizationProvider>
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Fecha hasta"
                                                value={fecha_hasta}
                                                onChange={(newValue) => {
                                                    handle_change_fecha_hasta(newValue);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField required fullWidth size="small" {...params} error={error_fecha_hasta} />
                                                )}
                                                minDate={fecha_desde}
                                                disabled={fecha_desde == null}
                                            />
                                            {error_fecha_hasta && (<FormHelperText error >{mensaje_error}</FormHelperText>)}
                                        </LocalizationProvider>
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                    {(seleccion_reporte !== 'EL' && seleccion_vivero !== 'Todos') && <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    spacing={2}>
                                    <span style={{ margin: '7px' }}>Reporte consolidado</span><Switch color="primary" onChange={() => { set_reporte_consolidado(!reporte_consolidado); }} />
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>}
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={10}  >
                                <Stack
                                    direction="row"
                                    marginLeft={21}
                                    justifyContent="center"
                                    spacing={2}>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        // startIcon={<SearchIcon />}
                                        onClick={validar_formulario}
                                    >
                                        Generar reporte
                                    </Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={1}>
                                <Button
                                    color='error'
                                    
                                    variant='contained'
                                    startIcon={<ClearIcon />}
                                    onClick={salir_entrada}
                                >
                                    Salir
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            {reporte.length > 0 && <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid container justifyContent="flex-end">
                    <Grid item xs={12}>
                        <ReportesXLS doc={doc} titulo_reporte={titulo_reporte} reporte={reporte} tipo_reporte={seleccion_reporte}></ReportesXLS>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                        >
                            <embed src={visor} type="application/pdf" width="100%" height='1080px' />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>}
            {/* <Grid container justifyContent="flex-end">
                <Grid item xs={7}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        sx={{ mt: '20px', mr: '60px' }}
                    >
                        <Button
                            color='error'
                            variant='contained'
                            startIcon={<ClearIcon />}
                            onClick={salir_entrada}
                        >
                            Salir
                        </Button>
                    </Stack>
                </Grid>
            </Grid> */}
            {dialog_notificaciones_is_active && (
                <DialogNoticacionesComponent
                    titulo_notificacion={titulo_notificacion}
                    abrir_modal={abrir_modal}
                    tipo_notificacion={tipo_notificacion}
                    mensaje_notificacion={mensaje_notificacion}
                    abrir_dialog={set_abrir_modal} />
            )}
        </>
    );
}
