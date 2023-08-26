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
import { image_data2_1, image_data_1 } from "../../../recursoHidrico/estaciones/imagenes/imagenes";
import dayjs from "dayjs";
import { logo_cormacarena_h } from "../logos/logos";
import BuscarPlantas from "./BuscarPlantas";
import { historico_bajas, historico_cambios_etapa, historico_distribuciones, historico_ingreso_cuarentena, historico_levantamiento_cuarentena, historico_siembras, historico_traslados } from "../thunks/HistoricoMovimientos";

const lista_reporte = [{ name: 'Movimientos de Bajas de Herramientas, Insumos y Semillas', value: 'MHIS' }, { name: 'Distribución de Despachos Entrantes a Viveros', value: 'DDEV' }, { name: 'Registros de Siembras', value: 'RES' }, { name: 'Cambio de Etapa de Material Vegetal', value: 'CEMV' }, { name: 'Ingreso a Cuarentena de Material Vegeta', value: 'ICMV' }, { name: 'Levantamiento de Cuarentena de Material Vegetal', value: 'LCMV' }, { name: 'Traslados Entre Viveros', value: 'TEV' }];
// eslint-disable-next-line @typescript-eslint/naming-convention
export const HistoricoMovimientosScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Variables globales
    const [visor, set_visor] = useState<any>();
    const [titulo_reporte, set_titulo_reporte] = useState<any>();
    const [reporte, set_reporte] = useState<any[]>([]);
    const [seleccion_vivero, set_seleccion_vivero] = useState<string>("");
    const [lista_viveros, set_lista_viveros] = useState<any[]>([]);
    const [seleccion_reporte, set_seleccion_reporte] = useState<string>("");
    const [numero_lote, set_numero_lote] = useState<string | number>("");
    const [año_lote, set_año_lote] = useState<string | number>("");
    const [seleccion_planta, set_seleccion_planta] = useState<any>(0);
    const [fecha_desde, set_fecha_desde] = useState<Date | null>(null);
    const [fecha_hasta, set_fecha_hasta] = useState<Date | null>(null);
    const [reporte_consolidado, set_reporte_consolidado] = useState<boolean>(false);
    const [abrir_modal_bien, set_abrir_modal_bien] = useState<boolean>(false);
    // eslint-disable-next-line new-cap
    const [doc, set_doc] = useState<jsPDF>(new jsPDF());
    const [doc_height, set_doc_height] = useState<number>(0);

    useEffect(() => {
        // set_reporte([]);
        // set_seleccion_vivero("");
        // set_seleccion_reporte("");
        // set_seleccion_planta(0);
        // set_fecha_desde(null);
        // set_fecha_hasta(null);
        // set_reporte_consolidado(false);
        // set_abrir_modal_bien(false);
        obtener_viveros_fc();
    }, []);

    const obtener_viveros_fc: () => void = () => {
        dispatch(obtener_viveros()).then((response: any) => {
            const viveros_activos = response.data.filter((resp: { activo: boolean; }) => resp.activo);
            set_lista_viveros(viveros_activos);
        })
    }
    const historico_bajas_fc: () => void = () => {
        dispatch(historico_bajas({ seleccion_vivero: 1, seleccion_planta: 309, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD'), reporte_consolidado })).then((response: any) => {
            set_reporte(response.data);
        })
    }
    const historico_distribuciones_fc: () => void = () => {
        dispatch(historico_distribuciones({ seleccion_vivero, seleccion_planta:'', fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD'), reporte_consolidado })).then((response: any) => {
            set_reporte(response.data);

        })
    }
    const historico_siembras_fc: () => void = () => {
        dispatch(historico_siembras({ seleccion_vivero, seleccion_planta: 316, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD'), reporte_consolidado })).then((response: any) => {
            set_reporte(response.data);
        })
    }
    const historico_cambios_etapa_fc: () => void = () => {
        dispatch(historico_cambios_etapa({ seleccion_vivero: 96, seleccion_planta: 316, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD'), reporte_consolidado })).then((response: any) => {
            set_reporte(response.data);
        })
    }
    const historico_ingreso_cuarentena_fc: () => void = () => {
        dispatch(historico_ingreso_cuarentena({ seleccion_vivero: 96, seleccion_planta: 316, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD'), reporte_consolidado })).then((response: any) => {
            set_reporte(response.data);
        })
    }
    const historico_levantamiento_cuarentena_fc: () => void = () => {
        dispatch(historico_levantamiento_cuarentena({ seleccion_vivero: 96, seleccion_planta: 316, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD'), reporte_consolidado })).then((response: any) => {
            set_reporte(response.data);
        })
    }
    const historico_traslados_fc: () => void = () => {
        dispatch(historico_traslados({ seleccion_vivero: 96, seleccion_planta: 316, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD'), reporte_consolidado })).then((response: any) => {
            set_reporte(response.data);
        })
    }

    const cambio_seleccion_vivero: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_seleccion_vivero(e.target.value);
    }
    const cambio_reporte: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_seleccion_reporte(e.target.value);
    }

    const handle_change_fecha_desde = (date: Date | null): void => {
        set_fecha_desde(date);
    };

    const handle_change_fecha_hasta = (date: Date | null): void => {
        set_fecha_hasta(date);
    };

    const cambio_numero_lote: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_numero_lote(e.target.value);
    };

    const cambio_año_lote: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_año_lote(e.target.value);
    };

    const descargar_pdf = () => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        doc.save(`${(titulo_reporte.reporte_seleccionado !== null && titulo_reporte.reporte_seleccionado !== undefined) ? titulo_reporte.reporte_seleccionado.name : ''}.pdf`);
    }

    const handle_export_pdf = () => {
        // eslint-disable-next-line new-cap
        set_doc(new jsPDF());
        set_doc_height(doc.internal.pageSize.getHeight());
        if (seleccion_reporte === 'MHIS') {
            historico_bajas_fc();
        }
        if (seleccion_reporte === 'DDEV') {
            historico_distribuciones_fc();
        }
        if (seleccion_reporte === 'CEMV') {
            historico_siembras_fc();
        }
        if (seleccion_reporte === 'ICMV') {
            historico_cambios_etapa_fc();
        }
        if (seleccion_reporte === 'LCMV') {
            // generar_reporte_el();
        }
        if (seleccion_reporte === 'TEV') {
            // generar_reporte_el();
        }
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
        const title_width = doc.getTextWidth(title);
        const x_pos = (doc.internal.pageSize.width - title_width) / 2;
        doc.addImage(logo_cormacarena_h, 160, 10, 40, 15)
        // doc.addImage(image_data2_1, img_x, img_y, img_width, img_height,);;
        doc.setFont("Arial", "bold"); // establece la fuente en Arial
        doc.text(title, x_pos, 15);
        doc.text(seleccion_planta.nombre ?? "", ((doc.internal.pageSize.width - doc.getTextWidth('planta 1')) / 2), 20);
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

    const salir_entrada: () => void = () => {
        navigate('/home');
    }

    useEffect(() => {
        if (reporte.length > 0) {
            if (seleccion_reporte === 'MHIS') {
                generar_historico_bajas();
            }
            if (seleccion_reporte === 'DDEV') {
                generar_historico_distribuciones();
            }
            if (seleccion_reporte === 'CEMV') {
                // generar_reporte_eap();
            }
            if (seleccion_reporte === 'ICMV') {
                // generar_reporte_el();
            }
            if (seleccion_reporte === 'LCMV') {
                // generar_reporte_el();
            }
            if (seleccion_reporte === 'TEV') {
                // generar_reporte_el();
            }
        }
    }, [reporte]);

    const generar_historico_bajas: () => void = () => {
        const reporte_titulo: { reporte_seleccionado: any, title: string } = crear_encabezado();
        let coordendas = 0;
        let page_position = 1;
        doc.line(5, 35, (doc.internal.pageSize.width - 5), 35);
        doc.text('Fecha', 16, 34);
        doc.text('Vivero', ((doc.internal.pageSize.width/2)-15), 34);
        doc.text('Número de baja', (doc.internal.pageSize.width - 60), 34);
        reporte.forEach((report: any) => {
            if ((43 + coordendas) > doc_height) {
                page_position = page_position + 1;
                nueva_pagina(doc, reporte_titulo.title, page_position);
                coordendas = 0;
            }
            // Cliclo
            const nombre_vivero = (report.nombre_vivero !== null && report.nombre_vivero !== undefined) ? report.nombre_vivero : 'Consolidado';
            doc.circle(10, 40 + coordendas, 2, 'FD');// Circulo x vivero
            doc.setFont("Arial", "bold"); // establece la fuente en Arial
            doc.text(dayjs(report.fecha_baja).format('DD/MM/YYYY'), 14, 41 + coordendas);
            doc.text(nombre_vivero, ((doc.internal.pageSize.width/2)-21), 41 + coordendas);
            doc.text(report.nro_baja_por_tipo.toString(), (doc.internal.pageSize.width - 50), 41 + coordendas, { align: 'right' });
            doc.setFont("Arial", "normal"); // establece la fuente en Arial
            doc.line(10, 40 + coordendas, 10, 50 + coordendas);// Linea horizontal
            doc.line(10, 50 + coordendas, 20, 50 + coordendas);// Linea vertical
            doc.line(60, 50 + coordendas, (doc.internal.pageSize.width - 60), 50 + coordendas);// Linea central de tabla
            // Tabla
            autoTable(doc, {
                theme: 'plain',
                columns: [{ header: 'Bien implicado', dataKey: 'numero_registros' }, { header: 'Cantidad dada de baja', dataKey: 'cantidad_mortalidad' }],
                body: [{ 'numero_registros': 'Semilla de girasol', 'cantidad_mortalidad': '30 Kg' + ' Und'}],
                styles: { halign: 'center' },
                startY: 43 + coordendas,
                margin: 60
            })
            doc.line(5, 60 + coordendas, (doc.internal.pageSize.width - 5), 60 + coordendas);// 30 Linea inferior
            coordendas = coordendas + 25;
        });
        set_visor(doc.output('datauristring'));
    }

    const generar_historico_distribuciones: () => void = () => {
        const page = doc.internal.pageSize.getHeight();
        const reporte_titulo: { reporte_seleccionado: any, title: string } = crear_encabezado();
        let coordendas = 0;
        let page_position = 1;
        let coordenada_y = 30;
        doc.line(5, 35, (doc.internal.pageSize.width - 5), 35);
        doc.text('Fecha', 16, 34);
        doc.text('Vivero', ((doc.internal.pageSize.width/2)-15), 34);
        doc.text('Número despacho', (doc.internal.pageSize.width - 60), 34);
        reporte.forEach((report: any) => {
            const nombre_vivero = (report.nombre_vivero !== null && report.nombre_vivero !== undefined) ? report.nombre_vivero : 'Consolidado';
            const reporte_dos = jso_object_detalle(report.bienes_distribuidos, nombre_vivero);
            // Cliclo
            coordenada_y = reporte_dos.length === 1 ? (45 + coordendas + 20) : reporte_dos.length === 2 ? (45 + coordendas + 30) : (45 + coordendas + (reporte_dos.length * 10));
            if (coordenada_y >= (page - 35) || coordendas >= (page - 35)) {
                doc.text('Fecha', 16, 34);
                doc.text('Vivero', ((doc.internal.pageSize.width/2)-15), 34);
                doc.text('Número despacho', (doc.internal.pageSize.width - 60), 34);
                page_position = page_position + 1;
                nueva_pagina(doc, reporte_titulo.title, page_position);
                coordendas = 0;
                coordenada_y = 30;
            }
            doc.circle(10, 40 + coordendas, 2, 'FD');// Circulo x vivero
            doc.setFont("Arial", "bold"); // establece la fuente en Arial
            doc.text(dayjs(report.fecha_baja).format('DD/MM/YYYY'), 14, 41 + coordendas);
            doc.text(nombre_vivero, ((doc.internal.pageSize.width/2)-21), 41 + coordendas);
            doc.text(report.numero_despacho.toString(), (doc.internal.pageSize.width - 50), 41 + coordendas);
            doc.setFont("Arial", "normal"); // establece la fuente en Arial
            doc.line(10, 40 + coordendas, 10, 50 + coordendas);// Linea horizontal
            doc.line(10, 50 + coordendas, 20, 50 + coordendas);// Linea vertical
            doc.line(30, 50 + coordendas, (doc.internal.pageSize.width - 40), 50 + coordendas);// Linea central de tabla
            // Tabla
            autoTable(doc, {
                theme: 'plain',
                columns: [{ header: 'Bien implicado', dataKey: 'nombre_bien' }, 
                          { header: 'Cantidad', dataKey: 'cantidad_asignada' }, 
                          { header: 'Vivero destino', dataKey: 'vivero_destino' }, 
                          { header: 'Etapa a la que ingresa', dataKey: 'etapa_ingresa' }],
                          body: reporte_dos,
                styles: { halign: 'center' },
                startY: 43 + coordendas,
                margin: 30
            });
            if(coordenada_y !== 30){
                doc.line(5, coordenada_y, (doc.internal.pageSize.width - 5), coordenada_y);// 30 Linea inferior
                coordendas = coordenada_y - 30;
            }
            else{
                if(page !== 1){
                    coordendas = reporte_dos.length === 1 ? (coordenada_y+10) : reporte_dos.length === 2 ? (coordenada_y + 15) : (coordenada_y + (reporte_dos.length * 5));
                    coordenada_y = reporte_dos.length === 1 ? (20 + coordendas) : reporte_dos.length === 2 ? (65 + coordendas) : (coordendas + (reporte_dos.length * 9));
                    doc.line(5, coordenada_y, (doc.internal.pageSize.width - 5), coordenada_y);// 30 Linea inferior
                }
            }
        });
        set_visor(doc.output('datauristring'));
    }
    const jso_object_detalle: (array: any, nombre_vivero: string) => any = (array: any, nombre_vivero: string) => {
        let resultado_json: any = [];
        array.forEach((data: any) => {
            resultado_json = [...resultado_json,{'nombre_bien': data.nombre_bien, 
            'cantidad_asignada': data.cantidad_asignada + ' ' + data.unidad_medida,
            'vivero_destino': nombre_vivero,
            'etapa_ingresa':data.etapa_ingresa,
            }]
        });
        return resultado_json;
    }

    const realizar_analistica: () => void = () => {

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
                    <Title title="Filtros de búsqueda" />
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl size='small' fullWidth>
                                    <InputLabel>Reporte</InputLabel>
                                    <Select
                                        value={seleccion_reporte}
                                        label="Tipo de bien"
                                        onChange={cambio_reporte}
                                    >
                                        {lista_reporte.map((lr: any) => (
                                            <MenuItem key={lr.value} value={lr.value}>
                                                {lr.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl size='small' fullWidth>
                                    <InputLabel>Vivero</InputLabel>
                                    <Select
                                        value={seleccion_vivero}
                                        label="Vivero"
                                        onChange={cambio_seleccion_vivero}
                                    >
                                        {lista_viveros.map((vive: any) => (
                                            <MenuItem key={vive.id_vivero} value={vive.id_vivero}>
                                                {vive.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
                                            disabled
                                        />

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
                                                    <TextField required fullWidth size="small" {...params} />
                                                )}
                                                maxDate={fecha_hasta}
                                            />
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
                                                    <TextField required fullWidth size="small" {...params} />
                                                )}
                                                minDate={fecha_desde}
                                                disabled={fecha_desde == null}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    spacing={2}>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        // startIcon={<SearchIcon />}
                                        onClick={handle_export_pdf}
                                    >
                                        Ver movimientos
                                    </Button>
                                </Stack>
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
                        <Box
                            component="form"
                            sx={{ mb: '20px' }}
                            noValidate
                            autoComplete="off"
                        >
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    spacing={2}>
                                    <Button
                                        color='success'
                                        variant='outlined'
                                        onClick={descargar_pdf}
                                    >
                                        Exportar PDF
                                    </Button>
                                    <Button
                                        color='error'
                                        variant='outlined'
                                        onClick={descargar_pdf}
                                    >
                                        Exportar XLS
                                    </Button>
                                </Stack>
                            </Grid>
                        </Box>
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
            <Grid container justifyContent="flex-end">
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
            </Grid>
        </>
    );
}
