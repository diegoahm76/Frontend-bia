/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Grid, Box, Button, Stack } from "@mui/material";
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Title } from "../../../../components";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ExportDocs from "./ExportDocs";
interface IProps {
    resultado_busqueda: any[],
    titulo: string
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResultadosBusqueda: React.FC<IProps> = (props: IProps) => {
    const columnas_mp: GridColDef[] = [
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
    ]
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
                            pageSize={10}
                            rowsPerPageOptions={[10]} />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}