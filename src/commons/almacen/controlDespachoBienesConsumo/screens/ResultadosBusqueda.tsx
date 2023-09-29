/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Grid, Box, Typography, Divider } from "@mui/material";
import { Title } from "../../../../components";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ExportDocs from "../../controlDeInventario/screens/ExportDocs";
interface IProps {
    resultado_busqueda: any[],
    seleccion_presentacion: string,
    titulo: string
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResultadosBusqueda: React.FC<IProps> = (props: IProps) => {
    const [columnas_mp, set_columnas_mp] = useState<GridColDef[]>([]);
    const [propio, set_propio] = useState<any[]>([]);
    const [no_propio, set_no_propio] = useState<any[]>([]);

    useEffect(() => {
        if (props.resultado_busqueda.length > 0) {
            if (props.seleccion_presentacion === 'und')
                set_columnas_mp([
                    {
                        field: 'nombre_unidad_para_la_que_solicita',
                        headerName: 'Unidad organizacional',
                        width: 400,
                        valueGetter: (params) => params.row.nombre_unidad_para_la_que_solicita,
                    },
                    {
                        field: 'nombre_bien_despachado',
                        headerName: 'Bien',
                        width: 400,
                        valueGetter: (params) => params.row.nombre_bien_despachado,
                    },
                    {
                        field: 'cantidad_despachada_unidad',
                        headerName: 'Cantidad despachada',
                        width: 300,
                        valueGetter: (params) => params.row.cantidad_despachada_unidad,
                    }
                ])
            else
                set_columnas_mp([
                    {
                        field: 'nombre_bien_despachado',
                        headerName: 'Bien',
                        width: 400,
                        valueGetter: (params) => params.row.nombre_bien_despachado,
                    },
                    {
                        field: 'nombre_unidad_para_la_que_solicita',
                        headerName: 'Unidad organizacional',
                        width: 400,
                        valueGetter: (params) => params.row.nombre_unidad_para_la_que_solicita,
                    },
                    {
                        field: 'cantidad_despachada_unidad',
                        headerName: 'Cantidad despachada',
                        width: 300,
                        valueGetter: (params) => params.row.cantidad_despachada_unidad,
                    }
                ])
        }
    }, [props.resultado_busqueda,props.seleccion_presentacion]);

    return (
        <>
            <Title title={props.titulo} />
            <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
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