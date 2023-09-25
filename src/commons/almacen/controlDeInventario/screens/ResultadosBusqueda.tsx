/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Grid, Box} from "@mui/material";
import { Title } from "../../../../components";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ExportDocs from "./ExportDocs";
interface IProps {
    resultado_busqueda: any[],
    titulo: string,
    seleccion_tipo_consulta: string
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResultadosBusqueda: React.FC<IProps> = (props: IProps) => {
  const [columnas_mp, set_columnas_mp] = useState<GridColDef[]>([]);
  const [propio, set_propio] = useState<any[]>([]);
  const [no_propio, set_no_propio] = useState<any[]>([]);

    useEffect(() => {
        if(props.resultado_busqueda.length > 0)
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
            
                default:
                break;
            }
    },[props.seleccion_tipo_consulta, props.resultado_busqueda]);
    // const columnas_mp: GridColDef[] = [
    //     {
    //         field: 'nombre_bodega',
    //         headerName: 'Bodega',
    //         width: 200,
    //         valueGetter: (params) => params.row.nombre_bodega,
    //     },
    //     {
    //         field: 'nombre_bien',
    //         headerName: 'Bien',
    //         width: 200,
    //         valueGetter: (params) => params.row.nombre_bien,
    //     },
    //     {
    //         field: 'nombre_marca',
    //         headerName: 'Marca',
    //         width: 150,
    //         valueGetter: (params) => params.row.nombre_marca,
    //     },
    //     {
    //         field: 'serial',
    //         headerName: 'Serial',
    //         width: 150,
    //         valueGetter: (params) => params.row.serial,
    //     },
    //     {
    //         field: 'nombre_tipo_entrada',
    //         headerName: 'Origen',
    //         width: 150,
    //         valueGetter: (params) => params.row.nombre_tipo_entrada,
    //     },
    //     {
    //         field: 'propiedad',
    //         headerName: 'Propiedad',
    //         width: 150,
    //         valueGetter: (params) => params.row.propiedad,
    //     },
    //     {
    //         field: 'fecha_ingreso',
    //         headerName: 'Fecha de ingreso actual',
    //         width: 200,
    //         valueGetter: (params) => params.row.fecha_ingreso,
    //     },
    //     {
    //         field: 'ubicacion',
    //         headerName: 'Ubicación',
    //         width: 150,
    //         valueGetter: (params) => params.row.ubicacion,
    //     },
    //     {
    //         field: 'responsable_actual',
    //         headerName: 'Responsable actual',
    //         width: 150,
    //         valueGetter: (params) => params.row.responsable_actual,
    //     },
    //     {
    //         field: 'estado_activo',
    //         headerName: 'Estado',
    //         width: 150,
    //         valueGetter: (params) => params.row.estado_activo,
    //     },
    //     {
    //         field: 'categoria',
    //         headerName: 'Categoría',
    //         width: 150,
    //         valueGetter: (params) => params.row.categoria,
    //     },
    //     {
    //         field: 'fecha_ultimo_movimiento',
    //         headerName: 'Fecha ultimo movimiento',
    //         width: 200,
    //         valueGetter: (params) => params.row.fecha_ultimo_movimiento,
    //     }
    // ]
    return (
        <>
            <Title title={props.titulo} />
{ props.seleccion_tipo_consulta !== 'IPC'      &&     <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <ExportDocs cols={columnas_mp} resultado_busqueda={props.resultado_busqueda}></ExportDocs>
                        <DataGrid
                            autoHeight
                            rows={props.resultado_busqueda}
                            columns={columnas_mp}
                            getRowId={(row) => uuidv4()}
                            pageSize={10}
                            rowsPerPageOptions={[10]} />
                    </Grid>
                </Grid>
            </Box>}
{   props.seleccion_tipo_consulta === 'IPC'      &&         <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <ExportDocs cols={columnas_mp} resultado_busqueda={props.resultado_busqueda}></ExportDocs>
{       propio.length > 0 &&                 

<Grid item container spacing={2}>
<Grid item xs={12} sm={12}>
    Propio
<DataGrid
                            autoHeight
                            rows={propio}
                            columns={columnas_mp}
                            getRowId={(row) => uuidv4()}
                            pageSize={10}
                            rowsPerPageOptions={[10]} />
                                                </Grid>
                </Grid>}
                            {no_propio.length > 0 &&       
                            <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                No propio
                                        <DataGrid
                            autoHeight
                            rows={no_propio}
                            columns={columnas_mp}
                            getRowId={(row) => uuidv4()}
                            pageSize={10}
                            rowsPerPageOptions={[10]} />
                                                </Grid>
                </Grid>}
                    </Grid>
                </Grid>
            </Box>}
        </>
    );
}