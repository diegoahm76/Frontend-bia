/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Grid, Box, Typography, Divider } from "@mui/material";
import { Title } from "../../../../components";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ExportDocs from "./ExportDocs";
interface IProps {
    resultado_busqueda: any[],
    inventarios: any[],
    titulo: string,
    title: string,
    seleccion_tipo_consulta: string,
    nombre_archivo: string,
    agrupar: boolean,
    mostrar: boolean,
    agrupar_bodega: boolean
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResultadosBusqueda: React.FC<IProps> = (props: IProps) => {
    const [columnas_mp, set_columnas_mp] = useState<GridColDef[]>([]);
    const [propio, set_propio] = useState<any[]>([]);
    const [no_propio, set_no_propio] = useState<any[]>([]);

    useEffect(() => {
        if (props.resultado_busqueda.length > 0)
            switch (props.seleccion_tipo_consulta) {
                case 'TI':
                    set_columnas_mp([
                        {
                            field: 'nombre_bodega',
                            headerName: 'Bodega',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bodega,
                        },
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'nombre_marca',
                            headerName: 'Marca',
                            width: 150,
                            valueGetter: (params) => params.row.nombre_marca,
                        },
                        {
                            field: 'serial',
                            headerName: 'Serial',
                            width: 150,
                            valueGetter: (params) => params.row.serial,
                        },
                        {
                            field: 'nombre_tipo_entrada',
                            headerName: 'Origen',
                            width: 150,
                            valueGetter: (params) => params.row.nombre_tipo_entrada,
                        },
                        {
                            field: 'propiedad',
                            headerName: 'Propiedad',
                            width: 150,
                            valueGetter: (params) => params.row.propiedad,
                        },
                        {
                            field: 'fecha_ingreso',
                            headerName: 'Fecha de ingreso actual',
                            width: 200,
                            valueGetter: (params) => params.row.fecha_ingreso,
                        },
                        {
                            field: 'ubicacion',
                            headerName: 'Ubicación',
                            width: 150,
                            valueGetter: (params) => params.row.ubicacion,
                        },
                        {
                            field: 'responsable_actual',
                            headerName: 'Responsable actual',
                            width: 150,
                            valueGetter: (params) => params.row.responsable_actual,
                        },
                        {
                            field: 'estado_activo',
                            headerName: 'Estado',
                            width: 150,
                            valueGetter: (params) => params.row.estado_activo,
                        },
                        {
                            field: 'categoria',
                            headerName: 'Categoría',
                            width: 150,
                            valueGetter: (params) => params.row.categoria,
                        },
                        {
                            field: 'fecha_ultimo_movimiento',
                            headerName: 'Fecha ultimo movimiento',
                            width: 200,
                            valueGetter: (params) => params.row.fecha_ultimo_movimiento,
                        }
                    ])
                    break;
                case 'BE':
                    set_columnas_mp([
                        {
                            field: 'nombre_bodega',
                            headerName: 'Bodega',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bodega,
                        },
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'nombre_marca',
                            headerName: 'Marca',
                            width: 150,
                            valueGetter: (params) => params.row.nombre_marca,
                        },
                        {
                            field: 'serial',
                            headerName: 'Serial',
                            width: 150,
                            valueGetter: (params) => params.row.serial,
                        },
                        {
                            field: 'nombre_tipo_entrada',
                            headerName: 'Origen',
                            width: 150,
                            valueGetter: (params) => params.row.nombre_tipo_entrada,
                        },
                        {
                            field: 'propiedad',
                            headerName: 'Propiedad',
                            width: 150,
                            valueGetter: (params) => params.row.propiedad,
                        },
                        {
                            field: 'fecha_ingreso',
                            headerName: 'Fecha de ingreso actual',
                            width: 200,
                            valueGetter: (params) => params.row.fecha_ingreso,
                        },
                        {
                            field: 'ubicacion',
                            headerName: 'Ubicación',
                            width: 150,
                            valueGetter: (params) => params.row.ubicacion,
                        },
                        {
                            field: 'responsable_actual',
                            headerName: 'Responsable actual',
                            width: 150,
                            valueGetter: (params) => params.row.responsable_actual,
                        },
                        {
                            field: 'estado_activo',
                            headerName: 'Estado',
                            width: 150,
                            valueGetter: (params) => params.row.estado_activo,
                        },
                        {
                            field: 'fecha_ultimo_movimiento',
                            headerName: 'Fecha ultimo movimiento',
                            width: 200,
                            valueGetter: (params) => params.row.fecha_ultimo_movimiento,
                        }
                    ])
                    break;
                case 'IPC':
                    const i_propio = props.resultado_busqueda.findIndex((rb: any) => rb.propiedad === 'Propio');
                    i_propio !== -1 ? set_propio(props.resultado_busqueda[i_propio].inventario) : set_propio([]);
                    const i_no_propio = props.resultado_busqueda.findIndex((rb: any) => rb.propiedad === 'No propio');
                    i_no_propio !== -1 ? set_no_propio(props.resultado_busqueda[i_no_propio].inventario) : set_no_propio([]);
                    set_columnas_mp([
                        {
                            field: 'categoria',
                            headerName: 'Categoría',
                            width: 150,
                            valueGetter: (params) => params.row.categoria,
                        },
                        {
                            field: 'nombre_bodega',
                            headerName: 'Bodega',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bodega,
                        },
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'nombre_marca',
                            headerName: 'Marca',
                            width: 150,
                            valueGetter: (params) => params.row.nombre_marca,
                        },
                        {
                            field: 'serial',
                            headerName: 'Serial',
                            width: 150,
                            valueGetter: (params) => params.row.serial,
                        },
                        {
                            field: 'tipo_numero_origen',
                            headerName: 'Tipo y N° de documento de origen',
                            width: 150,
                            valueGetter: (params) => params.row.nombre_tipo_entrada,
                        },
                        {
                            field: 'fecha_ingreso',
                            headerName: 'Fecha de ingreso actual',
                            width: 200,
                            valueGetter: (params) => params.row.fecha_ingreso,
                        },
                        {
                            field: 'ubicacion',
                            headerName: 'Ubicación',
                            width: 150,
                            valueGetter: (params) => params.row.ubicacion,
                        },
                        {
                            field: 'responsable_actual',
                            headerName: 'Responsable actual',
                            width: 150,
                            valueGetter: (params) => params.row.responsable_actual,
                        },
                        {
                            field: 'estado_activo',
                            headerName: 'Estado',
                            width: 150,
                            valueGetter: (params) => params.row.estado_activo,
                        },
                        {
                            field: 'fecha_ultimo_movimiento',
                            headerName: 'Fecha ultimo movimiento',
                            width: 200,
                            valueGetter: (params) => params.row.fecha_ultimo_movimiento,
                        }
                    ])
                    break;
                case 'ISO':
                    set_columnas_mp([
                        {
                            field: 'tipo_numero_origen',
                            headerName: 'Tipo y N° de documento de origen',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_tipo_entrada,
                        },
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'nombre_marca',
                            headerName: 'Marca',
                            width: 120,
                            valueGetter: (params) => params.row.nombre_marca,
                        },
                        {
                            field: 'nombre_bodega',
                            headerName: 'Bodega',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bodega,
                        },
                        {
                            field: 'serial',
                            headerName: 'Serial',
                            width: 120,
                            valueGetter: (params) => params.row.serial,
                        },
                        {
                            field: 'fecha_ingreso',
                            headerName: 'Fecha de ingreso actual',
                            width: 200,
                            valueGetter: (params) => params.row.fecha_ingreso,
                        },
                        {
                            field: 'ubicacion',
                            headerName: 'Ubicación',
                            width: 150,
                            valueGetter: (params) => params.row.ubicacion,
                        },
                        {
                            field: 'responsable_actual',
                            headerName: 'Responsable actual',
                            width: 150,
                            valueGetter: (params) => params.row.responsable_actual,
                        },
                        {
                            field: 'estado_activo',
                            headerName: 'Estado',
                            width: 150,
                            valueGetter: (params) => params.row.estado_activo,
                        },
                        {
                            field: 'fecha_ultimo_movimiento',
                            headerName: 'Fecha ultimo movimiento',
                            width: 200,
                            valueGetter: (params) => params.row.fecha_ultimo_movimiento,
                        }
                    ])
                    break;
                case 'IP':
                    let columnas_ip: GridColDef[] = [
                        {
                            field: 'nombre_bodega',
                            headerName: 'Bodega',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bodega,
                        },
                        {
                            field: 'tipo_numero_origen',
                            headerName: 'Tipo y N° de documento de origen',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_tipo_entrada,
                        },
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'nombre_marca',
                            headerName: 'Marca',
                            width: 120,
                            valueGetter: (params) => params.row.nombre_marca,
                        },
                        {
                            field: 'fecha_ingreso',
                            headerName: 'Fecha de ingreso actual',
                            width: 200,
                            valueGetter: (params) => params.row.fecha_ingreso,
                        },
                        {
                            field: 'ubicacion',
                            headerName: 'Ubicación',
                            width: 150,
                            valueGetter: (params) => params.row.ubicacion,
                        },
                        {
                            field: 'responsable_actual',
                            headerName: 'Responsable actual',
                            width: 150,
                            valueGetter: (params) => params.row.responsable_actual,
                        },
                        {
                            field: 'estado_activo',
                            headerName: 'Estado',
                            width: 150,
                            valueGetter: (params) => params.row.estado_activo,
                        },
                        {
                            field: 'fecha_ultimo_movimiento',
                            headerName: 'Fecha ultimo movimiento',
                            width: 200,
                            valueGetter: (params) => params.row.fecha_ultimo_movimiento,
                        }
                    ];
                    if (!props.agrupar)
                        columnas_ip.push({ field: 'categoria', headerName: 'Categoría', width: 150, valueGetter: (params) => params.row.categoria });
                    set_columnas_mp(columnas_ip);
                    break;
                case 'ITB':
                    const columnas_itb: GridColDef[] = [
                        {
                            field: 'tipo_bien',
                            headerName: 'Tipo bien',
                            width: 300,
                            valueGetter: (params) => params.row.tipo_bien,
                        },
                        {
                            field: 'nombre_bodega',
                            headerName: 'Bodega',
                            width: 300,
                            valueGetter: (params) => params.row.nombre_bodega,
                        },
                        {
                            field: 'nombre_marca',
                            headerName: 'Marca',
                            width: 300,
                            valueGetter: (params) => params.row.nombre_marca,
                        },
                        {
                            field: 'cantidad',
                            headerName: 'Cantidad',
                            width: 120,
                            valueGetter: (params) => params.row.cantidad,
                        }
                    ];
                    const columnas_itb_mostrar: GridColDef[] = [
                        {
                            field: 'tipo_bien',
                            headerName: 'Tipo bien',
                            width: 450,
                            valueGetter: (params) => params.row.tipo_bien,
                        },
                        {
                            field: 'nombre_marca',
                            headerName: 'Marca',
                            width: 450,
                            valueGetter: (params) => params.row.nombre_marca,
                        },
                        {
                            field: 'cantidad',
                            headerName: 'Cantidad',
                            width: 120,
                            valueGetter: (params) => params.row.cantidad,
                        }
                    ];
                    props.mostrar ? set_columnas_mp(columnas_itb_mostrar) : set_columnas_mp(columnas_itb);
                    break;
                case 'TIC':
                    set_columnas_mp([
                        {
                            field: 'nombre_bodega',
                            headerName: 'Bodega',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bodega,
                        },
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'unidad_medida',
                            headerName: 'Unidad de medida',
                            width: 150,
                            valueGetter: (params) => params.row.unidad_medida,
                        },
                        {
                            field: 'stock_minimo',
                            headerName: 'Stock mínimo',
                            width: 150,
                            valueGetter: (params) => params.row.stock_minimo,
                        },
                        {
                            field: 'stock_maximo',
                            headerName: 'Stock máximo',
                            width: 140,
                            valueGetter: (params) => params.row.stock_maximo,
                        },
                        {
                            field: 'cantidad_existente',
                            headerName: 'Cantidad existente',
                            width: 140,
                            valueGetter: (params) => params.row.cantidad_existente,
                        },
                        {
                            field: 'solicitable_vivero',
                            headerName: 'Solicitable vivero',
                            width: 140,
                            valueGetter: (params) => params.row.solicitable_vivero,
                        },
                        {
                            field: 'tipo_consumo_vivero',
                            headerName: 'Tipo de consumo de vivero',
                            width: 200,
                            valueGetter: (params) => params.row.tipo_consumo_vivero,
                        }
                    ])
                    break;
                case 'BSV':
                    set_columnas_mp([
                        {
                            field: 'nombre_bodega',
                            headerName: 'Bodega',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bodega,
                        },
                        {
                            field: 'nombre_bien',
                            headerName: 'Bien',
                            width: 200,
                            valueGetter: (params) => params.row.nombre_bien,
                        },
                        {
                            field: 'unidad_medida',
                            headerName: 'Unidad de medida',
                            width: 150,
                            valueGetter: (params) => params.row.unidad_medida,
                        },
                        {
                            field: 'stock_minimo',
                            headerName: 'Stock mínimo',
                            width: 150,
                            valueGetter: (params) => params.row.stock_minimo,
                        },
                        {
                            field: 'stock_maximo',
                            headerName: 'Stock máximo',
                            width: 140,
                            valueGetter: (params) => params.row.stock_maximo,
                        },
                        {
                            field: 'tipo_consumo_vivero',
                            headerName: 'Tipo de consumo de vivero',
                            width: 200,
                            valueGetter: (params) => params.row.tipo_consumo_vivero,
                        },
                        {
                            field: 'nombre_cientifico',
                            headerName: 'Nombre científico',
                            width: 140,
                            valueGetter: (params) => params.row.nombre_cientifico,
                        },
                        {
                            field: 'cantidad_existente',
                            headerName: 'Cantidad existente',
                            width: 140,
                            valueGetter: (params) => params.row.cantidad_existente,
                        }
                    ])
                    break;
                default:
                    break;
            }
    }, [props.seleccion_tipo_consulta, props.resultado_busqueda]);

    return (
        <>
            <Title title={props.titulo} />
            {props.seleccion_tipo_consulta !== 'IPC' && props.seleccion_tipo_consulta !== 'IP' && props.seleccion_tipo_consulta !== 'ITB' && props.seleccion_tipo_consulta !== 'TIC' && props.seleccion_tipo_consulta !== 'BSV' && <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <ExportDocs cols={columnas_mp} resultado_busqueda={props.resultado_busqueda} filtros={undefined} title={''} nombre_archivo={""} filtros_pdf={undefined}></ExportDocs>
                        <DataGrid
                            autoHeight
                            rows={props.resultado_busqueda ?? []}
                            columns={columnas_mp ?? []}
                            getRowId={(row) => uuidv4()}
                            pageSize={5}
                            rowsPerPageOptions={[5]} />
                    </Grid>
                </Grid>
            </Box>}
            {props.seleccion_tipo_consulta === 'IPC' && <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <ExportDocs cols={columnas_mp} resultado_busqueda={props.inventarios} title={props.title} filtros={undefined} nombre_archivo={""} filtros_pdf={undefined}></ExportDocs>
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12} sx={{ mb: '20px' }}>
                                <Typography variant="h6" gutterBottom> Propio </Typography>
                                <DataGrid
                                    autoHeight
                                    rows={propio ?? []}
                                    columns={columnas_mp ?? []}
                                    getRowId={(row) => uuidv4()}
                                    pageSize={5}
                                    rowsPerPageOptions={[10]} />
                            </Grid>
                        </Grid>
                        <Grid item container spacing={2}>
                            <Divider />
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" gutterBottom> No propio </Typography>
                                <DataGrid
                                    autoHeight
                                    rows={no_propio ?? []}
                                    columns={columnas_mp ?? []}
                                    getRowId={(row) => uuidv4()}
                                    pageSize={5}
                                    rowsPerPageOptions={[10]} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>}
            {(props.seleccion_tipo_consulta === 'IP' && props.agrupar) && <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                <ExportDocs cols={columnas_mp} resultado_busqueda={props.inventarios} title={props.title} filtros={undefined} nombre_archivo={""} filtros_pdf={undefined}></ExportDocs>
                <Grid item container spacing={2}>
                    {props.resultado_busqueda.map((rb: any) => (
                        // eslint-disable-next-line react/jsx-key
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom> {rb.categoria} </Typography>
                            <DataGrid
                                autoHeight
                                rows={rb.inventario ?? []}
                                columns={columnas_mp ?? []}
                                getRowId={(row) => uuidv4()}
                                pageSize={5}
                                rowsPerPageOptions={[5]} />
                        </Grid>
                    ))}
                </Grid>
            </Box>}
            {(props.seleccion_tipo_consulta === 'IP' && !props.agrupar) && <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <ExportDocs cols={columnas_mp} resultado_busqueda={props.resultado_busqueda} title={props.title} filtros={undefined} nombre_archivo={""} filtros_pdf={undefined}></ExportDocs>
                        <Typography variant="h6" gutterBottom> No agrupado por categoría </Typography>
                        <DataGrid
                            autoHeight
                            rows={props.resultado_busqueda ?? []}
                            columns={columnas_mp ?? []}
                            getRowId={(row) => uuidv4()}
                            pageSize={5}
                            rowsPerPageOptions={[5]} />
                    </Grid>
                </Grid>
            </Box>}
            {(props.seleccion_tipo_consulta === 'ITB' && !props.mostrar) && <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                <ExportDocs cols={columnas_mp} resultado_busqueda={props.inventarios} filtros={[]} title={props.title} nombre_archivo={props.nombre_archivo} filtros_pdf={[]}></ExportDocs>
                <Grid item container spacing={2}>
                    {props.resultado_busqueda.map((rb: any) => (
                        // eslint-disable-next-line react/jsx-key
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom> {rb.nombre_bodega} </Typography>
                            <DataGrid
                                autoHeight
                                rows={rb.inventario ?? []}
                                columns={columnas_mp ?? []}
                                getRowId={(row) => uuidv4()}
                                pageSize={5}
                                rowsPerPageOptions={[5]} />
                        </Grid>
                    ))}
                </Grid>
            </Box>}
            {(props.seleccion_tipo_consulta === 'ITB' && props.mostrar) && <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <ExportDocs cols={columnas_mp} resultado_busqueda={props.resultado_busqueda} title={props.title} filtros={undefined} nombre_archivo={""} filtros_pdf={undefined}></ExportDocs>
                        <Typography variant="h6" gutterBottom> Para toda la entidad </Typography>
                        <DataGrid
                            autoHeight
                            rows={props.resultado_busqueda ?? []}
                            columns={columnas_mp ?? []}
                            getRowId={(row) => uuidv4()}
                            pageSize={5}
                            rowsPerPageOptions={[5]} />
                    </Grid>
                </Grid>
            </Box>}
            {((props.seleccion_tipo_consulta === 'TIC' || props.seleccion_tipo_consulta === 'BSV') && props.agrupar_bodega) && <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                <ExportDocs cols={columnas_mp} resultado_busqueda={props.inventarios} title={props.title} filtros={undefined} nombre_archivo={""} filtros_pdf={undefined}></ExportDocs>
                <Grid item container spacing={2}>
                    {props.resultado_busqueda.map((rb: any) => (
                        // eslint-disable-next-line react/jsx-key
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom> {rb.nombre_bodega}</Typography>
                            <DataGrid
                                autoHeight
                                rows={rb.inventario ?? []}
                                columns={columnas_mp ?? []}
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
                        <ExportDocs cols={columnas_mp} resultado_busqueda={props.resultado_busqueda} title={props.title} filtros={undefined} nombre_archivo={""} filtros_pdf={undefined}></ExportDocs>
                        <DataGrid
                            autoHeight
                            rows={props.resultado_busqueda ?? []}
                            columns={columnas_mp ?? []}
                            getRowId={() => uuidv4()}
                            pageSize={5}
                            rowsPerPageOptions={[5]} />
                    </Grid>
                </Grid>
            </Box>}
        </>
    );
}