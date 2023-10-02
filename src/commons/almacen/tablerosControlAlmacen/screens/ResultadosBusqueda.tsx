/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Grid, Box, Typography, Divider } from "@mui/material";
import { Title } from "../../../../components";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import ExportDocs from "../../controlDeInventario/screens/ExportDocs";
import clsx from 'clsx';
interface IProps {
    resultado_busqueda: any[],
    seleccion_presentacion: string,
    seleccion_tablero_control: string,
    discriminar: boolean,
    titulo: string,
    nombre_archivo: string,
    filtros: any
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
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'tipo_activo',
                            headerName: 'Tipo de bien',
                            width: 100,
                            valueGetter: (params) => params.row.tipo_activo,
                        },
                        {
                            field: 'serial_placa',
                            headerName: 'Serial / Placa',
                            width: 100,
                            valueGetter: (params) => params.row.serial_placa,
                        },
                        {
                            field: 'tipo_mantenimiento',
                            headerName: 'Tipo mantenimiento',
                            width: 140,
                            valueGetter: (params) => params.row.tipo_mantenimiento,
                        },
                        {
                            field: 'fecha_programada',
                            headerName: 'Fecha programada',
                            width: 140,
                            cellClassName: (params: GridCellParams<any>) => {
                                if (params.row.dias_kilometros_vencidos === null || params.row.kilometraje_programado !== 'N/A') {
                                    return '';
                                }
                                return clsx('super-app', {
                                    positive: params.row.dias_kilometros_vencidos > 0,
                                })
                            },
                            valueGetter: (params) => params.row.fecha_programada,
                        },
                        {
                            field: 'kilometraje_programado',
                            headerName: 'Kilómetraje programado',
                            width: 150,
                            cellClassName: (params: GridCellParams<any>) => {
                                if (params.row.dias_kilometros_vencidos == null || params.row.fecha_programada !== 'N/A') {
                                    return '';
                                }
                                return clsx('super-app', {
                                    positive: params.row.dias_kilometros_vencidos > 0,
                                })
                            },
                            valueGetter: (params) => params.row.kilometraje_programado,
                        },
                        {
                            field: 'kilometraje_actual',
                            headerName: 'Kilómetraje actual',
                            width: 140,
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
                default:
                    break;
            }

        }
    }, [props.resultado_busqueda, props.seleccion_presentacion]);

    return (
        <>
            <Title title={props.titulo} />
            <Box component="form" sx={{
                mt: '20px', '& .super-app.positive': { backgroundColor: '#d47483' }}} noValidate autoComplete="off">
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <ExportDocs cols={columnas_mp} resultado_busqueda={props.resultado_busqueda} filtros={props.filtros} nombre_archivo={props.nombre_archivo}></ExportDocs>
                        <DataGrid
                            autoHeight
                            rows={props.resultado_busqueda}
                            columns={columnas_mp}
                            getRowId={(row) => uuidv4()}
                            pageSize={5}
                            rowsPerPageOptions={[5]} />
                    </Grid>
                </Grid>
            </Box>
            {/* {((props.seleccion_tipo_consulta === 'TIC' || props.seleccion_tipo_consulta === 'BSV') && props.agrupar_bodega) && <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                <ExportDocs cols={columnas_mp} resultado_busqueda={props.inventarios}></ExportDocs>
                <Grid item container spacing={2}>
                    {props.resultado_busqueda.map((rb: any) => (
                        // eslint-disable-next-line react/jsx-key
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom> {rb.nombre_bodega}</Typography>
                            <DataGrid
                                autoHeight
                                rows={rb.inventario}
                                columns={columnas_mp}
                                getRowId={(row) => uuidv4()}
                                pageSize={5}
                                rowsPerPageOptions={[5]} />
                        </Grid>
                    ))}
                </Grid>
            </Box>}
            {((props.seleccion_tipo_consulta === 'TIC' || props.seleccion_tipo_consulta === 'BSV') && !props.agrupar_bodega) && <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <ExportDocs cols={columnas_mp} resultado_busqueda={props.resultado_busqueda}></ExportDocs>
                        <DataGrid
                            autoHeight
                            rows={props.resultado_busqueda}
                            columns={columnas_mp}
                            getRowId={(row) => uuidv4()}
                            pageSize={5}
                            rowsPerPageOptions={[5]} />
                    </Grid>
                </Grid>
            </Box>} */}
        </>
    );
}