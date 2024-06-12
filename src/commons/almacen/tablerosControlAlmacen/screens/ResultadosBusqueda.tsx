/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Grid, Box, Typography, Divider } from "@mui/material";
import { Title } from "../../../../components";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import ExportDocs from "../../controlDeInventario/screens/ExportDocs";
import clsx from 'clsx';
import dayjs from "dayjs";
interface IProps {
    resultado_busqueda: any[],
    seleccion_presentacion: string,
    seleccion_tablero_control: string,
    discriminar: boolean,
    titulo: string,
    nombre_archivo: string,
    filtros: any,
    filtros_pdf: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResultadosBusqueda: React.FC<IProps> = (props: IProps) => {
    const [columnas_mp, set_columnas_mp] = useState<GridColDef[]>([]);

    useEffect(() => {
        if (props.resultado_busqueda.length > 0) {
            switch (props.seleccion_tablero_control) {
                case 'CBU':
                    const columnas_cbu: GridColDef[] = [
                        {
                            field: 'codigo_bien_despachado',
                            headerName: 'Código bien',
                            minWidth: 140,
                            flex: 1,
                        },
                        {
                            field: 'nombre_bien_despachado',
                            headerName: 'Bien',
                            minWidth: 250,
                            flex: 1,
                        },
                        {
                            field: 'nombre_unidad_para_la_que_solicita',
                            headerName: 'Unidad organizacional',
                            minWidth: 250,
                            flex: 1,
                            valueGetter: (params) => params.row.nombre_unidad_para_la_que_solicita,
                        },
                        {
                            field: 'cantidad_despachada_unidad',
                            headerName: 'Cantidad despachada',
                            minWidth: 180,
                            flex: 1,
                            valueGetter: (params) => params.row.cantidad_despachada_unidad,
                        },
                        {
                            field: 'nombre_bodega',
                            headerName: 'Bodega',
                            minWidth: 200,
                            flex: 1,
                            valueGetter: (params) => params.row.nombre_bodega,
                        },
                        {
                            field: 'nombre_completo_funcionario_responsable',
                            headerName: 'Persona responsable',
                            minWidth: 200,
                            flex: 1,
                            valueGetter: (params) => params.row.nombre_completo_funcionario_responsable || 'N/A',
                        },
                        {
                            field: 'nombre_completo_persona_solicita',
                            headerName: 'Persona solicita',
                            minWidth: 200,
                            flex: 1,
                            valueGetter: (params) => params.row.nombre_completo_persona_solicita || 'N/A',
                        },
                        {
                            field: 'nombre_completo_persona_despacha',
                            headerName: 'Persona despacha',
                            minWidth: 200,
                            flex: 1,
                            valueGetter: (params) => params.row.nombre_completo_persona_despacha || 'N/A',
                        },
                        {
                            field: 'nombre_completo_persona_anula',
                            headerName: 'Persona anula',
                            minWidth: 200,
                            flex: 1,
                            valueGetter: (params) => params.row.nombre_completo_persona_anula || 'N/A',
                        },
                    ]
                    if (props.discriminar)
                        set_columnas_mp(columnas_cbu.filter((_, index) => index !== 2));
                    else
                        props.seleccion_presentacion === 'UND' ? set_columnas_mp(columnas_cbu) : set_columnas_mp(columnas_cbu);
                        // props.seleccion_presentacion === 'UND' ? set_columnas_mp(columnas_cbu) : set_columnas_mp([columnas_cbu[1], columnas_cbu[0], columnas_cbu[2]]);
                    break;
                case 'MP':
                    set_columnas_mp([
                        {
                            field: 'consecutivo',
                            headerName: 'Consecutivo',
                            minWidth: 120,
                            flex: 1,
                        },
                        {
                            field: 'codigo_bien',
                            headerName: 'Código bien',
                            minWidth: 140,
                            flex: 1,
                        },
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            minWidth: 220,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'tipo_activo',
                            headerName: 'Tipo de bien',
                            minWidth: 150,
                            valueGetter: (params) => params.row.tipo_activo,
                        },
                        {
                            field: 'serial_placa',
                            headerName: 'Serial / Placa',
                            minWidth: 150,
                            valueGetter: (params) => params.row.serial_placa,
                        },
                        {
                            field: 'tipo_mantenimiento',
                            headerName: 'Tipo mantenimiento',
                            minWidth: 170,
                            valueGetter: (params) => params.row.tipo_mantenimiento,
                        },
                        {
                            field: 'fecha_programada',
                            headerName: 'Fecha programada',
                            minWidth: 200,
                            cellClassName: (params: GridCellParams<any>) => {
                                if (params.row.dias_kilometros_vencidos === null || params.row.kilometraje_programado !== 'N/A') {
                                    return '';
                                }
                                //  console.log('')('fecha_programada: ', params.row.dias_kilometros_vencidos);
                                if(params.row.dias_kilometros_vencidos >= 1 && params.row.dias_kilometros_vencidos <= 5)
                                    return clsx("super-app",{positive: true});
                                if(params.row.dias_kilometros_vencidos >= 6 && params.row.dias_kilometros_vencidos <= 30)
                                    return clsx("super-app",{warning: true});
                                if(params.row.dias_kilometros_vencidos > 30)
                                    return clsx("super-app",{danger: true});
                                return '';
                            },
                            valueGetter: (params) => params.row.fecha_programada,
                        },
                        {
                            field: 'kilometraje_programado',
                            headerName: 'Kilómetraje programado',
                            minWidth: 200,
                            cellClassName: (params: GridCellParams<any>) => {
                                if (params.row.dias_kilometros_vencidos == null || params.row.fecha_programada !== 'N/A') {
                                    return '';
                                }
                                //  console.log('')('kilometraje_programado: ', params.row.dias_kilometros_vencidos);
                                if(params.row.dias_kilometros_vencidos > 0)
                                    return clsx("super-app",{danger: true});
                                return '';
                            },
                            valueGetter: (params) => params.row.kilometraje_programado,
                        },
                        {
                            field: 'kilometraje_actual',
                            headerName: 'Kilómetraje actual',
                            minWidth: 200,
                            valueGetter: (params) => params.row.kilometraje_actual,
                        },
                        {
                            field: 'dias_kilometros_vencidos',
                            headerName: 'Días vencido / Km vencido',
                            minWidth: 200,
                            valueGetter: (params) => params.row.dias_kilometros_vencidos,
                        },
                        {
                            field: 'persona_solicita',
                            headerName: 'Persona solicita',
                            minWidth: 200,
                            flex: 1,
                            valueGetter: (params) => params.row.persona_solicita || 'N/A',
                        },
                        {
                            field: 'persona_anula',
                            headerName: 'Persona anula',
                            minWidth: 200,
                            flex: 1,
                            valueGetter: (params) => params.row.persona_anula || 'N/A',
                        },
                        {
                            field: 'observaciones',
                            headerName: 'Observaciones',
                            minWidth: 200,
                            flex: 1,
                            valueGetter: (params) => params.row.observaciones || 'N/A',
                        },
                    ])
                    break;
                case 'CS':
                    set_columnas_mp([
                        {
                            field: 'cod_tipo_entrada_stock',
                            headerName: 'Código entrada',
                            minWidth: 120,
                            flex: 1,
                        },
                        {
                            field: 'codigo_bien',
                            headerName: 'Código bien',
                            minWidth: 140,
                            flex: 1,
                        },
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            minWidth: 250,
                            flex: 1,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'stock_minimo',
                            headerName: 'Stock mínimo',
                            minWidth: 200,
                            flex: 1,
                            cellClassName: (params: GridCellParams<any>) => {
                                if (params.row.stock_minimo === null || params.row.cantidad_existente === null) {
                                    return '';
                                }
                                if(params.row.cantidad_existente < params.row.stock_minimo)
                                    return clsx("super-app",{danger: true});
                                return '';
                            },
                            valueGetter: (params) => params.row.stock_minimo,
                        },
                        {
                            field: 'stock_maximo',
                            headerName: 'Stock máximo',
                            minWidth: 200,
                            flex: 1,
                            cellClassName: (params: GridCellParams<any>) => {
                                if (params.row.stock_maximo == null || params.row.cantidad_existente === null) {
                                    return '';
                                }
                                if(params.row.cantidad_existente > params.row.stock_maximo)
                                    return clsx("super-app",{positive_green: true});
                                return '';
                            },
                            valueGetter: (params) => params.row.stock_maximo,
                        },
                        {
                            field: 'cantidad_existente',
                            headerName: 'Cantidad existente',
                            minWidth: 200,
                            flex: 1,
                            cellClassName: (params: GridCellParams<any>) => {
                                if (params.row.stock_minimo === null || params.row.cantidad_existente === null) {
                                    return '';
                                }
                                if(params.row.cantidad_existente < params.row.stock_minimo)
                                    return clsx("super-app",{danger: true});
                                if(params.row.cantidad_existente > params.row.stock_maximo)
                                    return clsx("super-app",{positive_green: true});
                                return '';
                            },
                            valueGetter: (params) => params.row.cantidad_existente,
                        },
                        {
                            field: 'unidad_medida',
                            headerName: 'Unidad de medidad',
                            minWidth: 200,
                            flex: 1,
                            valueGetter: (params) => params.row.unidad_medida,
                        },
                        {
                            field: 'nombre_bodega_stock',
                            headerName: 'Bodega',
                            minWidth: 200,
                            flex: 1,
                            valueGetter: (params) => params.row.nombre_bodega_stock,
                        },
                        {
                            field: 'nombre_completo_responsable',
                            headerName: 'Persona responsable',
                            minWidth: 200,
                            flex: 1,
                            valueGetter: (params) => params.row.nombre_completo_responsable || 'N/A',
                        },
                        {
                            field: 'nombre_completo_persona_origen',
                            headerName: 'Persona origen',
                            minWidth: 200,
                            flex: 1,
                            valueGetter: (params) => params.row.nombre_completo_persona_origen || 'N/A',
                        },
                    ])
                    break;
                case 'MSI':
                    set_columnas_mp([
                        {
                            field: 'consecutivo',
                            headerName: 'Consecutivo',
                            minWidth: 120,
                        },
                        {
                            field: 'nombre_bodega',
                            headerName: 'Bodega',
                            minWidth: 300,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'codigo_bien',
                            headerName: 'Código bien',
                            minWidth: 140,
                            flex: 1,
                        },
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            minWidth: 300,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'tipo_activo',
                            headerName: 'Tipo de activo',
                            minWidth: 250,
                            valueGetter: (params) => params.row.tipo_activo,
                        },
                        {
                            field: 'cantidad_ingresada',
                            headerName: 'Cantidad ingresada',
                            minWidth: 250,
                            valueGetter: (params) => params.row.cantidad_ingresada,
                        },
                        {
                            field: 'placa_serial',
                            headerName: 'Placa / Serial',
                            minWidth: 140,
                        },
                        {
                            field: 'responsable_bodega',
                            headerName: 'Responsable bodega',
                            minWidth: 300,
                        },
                    ])
                    break;
                case 'MR':
                    set_columnas_mp([
                        {
                            field: 'consecutivo',
                            headerName: 'Consecutivo',
                            width: 120,
                        },
                        {
                            field: 'codigo_bien',
                            headerName: 'Código bien',
                            width: 160,
                        },
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            width: 250,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'cod_tipo_activo',
                            headerName: 'Tipo activo',
                            width: 250,
                            valueGetter: (params) => params.row.cod_tipo_activo,
                        },
                        {
                            field: 'serial_placa',
                            headerName: 'Serial / Placa',
                            width: 180,
                            valueGetter: (params) => params.row.serial_placa,
                        },
                        {
                            field: 'tipo_mantenimiento',
                            headerName: 'Tipo mantenimiento',
                            width: 180,
                            valueGetter: (params) => params.row.tipo_mantenimiento,
                        },
                        {
                            field: 'fecha_ejecutado',
                            headerName: 'Fecha mantenimiento',
                            width: 200,
                            valueGetter: (params) => dayjs(params.row.fecha_ejecutado).format('DD/MM/YYYY'),
                        },
                        {
                            field: 'realizado_por',
                            headerName: 'Realizado por',
                            width: 200,
                            valueGetter: (params) => params.row.realizado_por,
                        },
                        {
                            field: 'estado_final',
                            headerName: 'Estado final',
                            width: 250,
                            valueGetter: (params) => params.row.estado_final,
                        }
                    ])
                    break;
                case 'EI':
                    set_columnas_mp([
                        {
                            field: 'consecutivo',
                            headerName: 'Consecutivo',
                            minWidth: 120,
                            flex: 1,
                        },
                        {
                            field: 'nombre_bodega',
                            headerName: 'Bodega',
                            width: 300,
                            valueGetter: (params) => params.row.nombre_bodega
                        },
                        {
                            field: 'codigo_bien',
                            headerName: 'Código bien',
                            minWidth: 140,
                            flex: 1,
                        },
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            width: 300,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'cantidad_ingresada_total',
                            headerName: 'Cantidad ingresada total',
                            width: 300,
                            valueGetter: (params) => params.row.cantidad_ingresada_total
                        },
                        {
                            field: 'placa_serial',
                            headerName: 'Placa / Serial',
                            minWidth: 140,
                            flex: 1,
                        },
                        {
                            field: 'cod_tipo_activo',
                            headerName: 'Tipo Activo',
                            minWidth: 140,
                            flex: 1,
                        },
                        {
                            field: 'responsable_bodega',
                            headerName: 'Responsable bodega',
                            width: 300,
                            valueGetter: (params) => params.row.responsable_bodega
                        },
                    ]);
                    break;
                default:
                    break;
            }

        }
    }, [props?.resultado_busqueda, props?.seleccion_presentacion]);

    return (
        <>
            <Title title={props.titulo ?? 'N/A'} />
            <Box component="form" sx={{ mt: '20px','& .super-app.positive_green': { backgroundColor: '#C4DFAA' },  '& .super-app.positive': { backgroundColor: '#fdfd96' }, '& .super-app.warning': { backgroundColor: '#ffa07a' }, '& .super-app.danger': { backgroundColor: '#ff6961' }}} noValidate autoComplete="off">
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <ExportDocs cols={columnas_mp} resultado_busqueda={props.resultado_busqueda} filtros={props.filtros} nombre_archivo={props.nombre_archivo} filtros_pdf={props.filtros_pdf}></ExportDocs>
                        {
                            (props?.resultado_busqueda && props?.resultado_busqueda.length > 0) ? (
                                <DataGrid
                                    autoHeight
                                    rows={props.resultado_busqueda ?? []}
                                    columns={columnas_mp ?? []}
                                    getRowId={(row) => uuidv4()}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            ) : (
                                <Typography variant="h6" component="h2">
                                    No hay datos disponibles
                                </Typography>
                            )
                        }
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}