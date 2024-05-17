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
                            field: 'nombre_unidad_para_la_que_solicita',
                            headerName: 'Unidad organizacional',
                            width: 400,
                            valueGetter: (params) => params.row.nombre_unidad_para_la_que_solicita,
                        },
                        {
                            field: 'nombre_bien_despachado',
                            headerName: 'Bien',
                            width: props.discriminar ? 550 : 400,
                            valueGetter: (params) => params.row.nombre_bien_despachado,
                        },
                        {
                            field: 'cantidad_despachada_unidad',
                            headerName: 'Cantidad despachada',
                            width: props.discriminar ? 550 : 300,
                            valueGetter: (params) => params.row.cantidad_despachada_unidad,
                        }]
                    if (props.discriminar)
                        set_columnas_mp([columnas_cbu[1], columnas_cbu[2]]);
                    else
                        props.seleccion_presentacion === 'UND' ? set_columnas_mp(columnas_cbu) : set_columnas_mp([columnas_cbu[1], columnas_cbu[0], columnas_cbu[2]]);
                    break;
                case 'MP':
                    set_columnas_mp([
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            width: 220,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'tipo_activo',
                            headerName: 'Tipo de bien',
                            width: 150,
                            valueGetter: (params) => params.row.tipo_activo,
                        },
                        {
                            field: 'serial_placa',
                            headerName: 'Serial / Placa',
                            width: 150,
                            valueGetter: (params) => params.row.serial_placa,
                        },
                        {
                            field: 'tipo_mantenimiento',
                            headerName: 'Tipo mantenimiento',
                            width: 170,
                            valueGetter: (params) => params.row.tipo_mantenimiento,
                        },
                        {
                            field: 'fecha_programada',
                            headerName: 'Fecha programada',
                            width: 200,
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
                            width: 200,
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
                            width: 200,
                            valueGetter: (params) => params.row.kilometraje_actual,
                        },
                        {
                            field: 'dias_kilometros_vencidos',
                            headerName: 'Días vencido / Km vencido',
                            width: 200,
                            valueGetter: (params) => params.row.dias_kilometros_vencidos,
                        }
                    ])
                    break;
                case 'CS':
                    set_columnas_mp([
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            width: 250,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'stock_minimo',
                            headerName: 'Stock miíimo',
                            width: 200,
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
                            width: 200,
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
                            width: 200,
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
                            width: 200,

                            valueGetter: (params) => params.row.unidad_medida,
                        }
                    ])
                    break;
                case 'MSI':
                    set_columnas_mp([
                        {
                            field: 'nombre_bodega',
                            headerName: 'Bodega',
                            width: 350,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            width: 300,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'tipo_activo',
                            headerName: 'Tipo de activo',
                            width: 250,
                            valueGetter: (params) => params.row.tipo_activo,
                        },
                        {
                            field: 'cantidad_ingresada',
                            headerName: 'Cantidad ingresada',
                            width: 250,
                            valueGetter: (params) => params.row.cantidad_ingresada,
                        }
                    ])
                    break;
                case 'MR':
                    set_columnas_mp([
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            width: 250,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'serial_placa',
                            headerName: 'Serial / Placa',
                            width: 250,
                            valueGetter: (params) => params.row.serial_placa,
                        },
                        {
                            field: 'tipo_mantenimiento',
                            headerName: 'Tipo mantenimiento',
                            width: 250,
                            valueGetter: (params) => params.row.tipo_mantenimiento,
                        },
                        {
                            field: 'fecha_ejecutado',
                            headerName: 'Fecha mantenimiento',
                            width: 250,
                            valueGetter: (params) => dayjs(params.row.fecha_ejecutado).format('DD/MM/YYYY'),
                        },
                        {
                            field: 'realizado_por',
                            headerName: 'Realizado por',
                            width: 250,
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
                            field: 'nombre_bodega',
                            headerName: 'Bodega',
                            width: 300,
                            valueGetter: (params) => params.row.nombre_bodega
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