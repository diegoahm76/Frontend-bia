import { Box, Button, ButtonGroup, Grid, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import jsPDF from 'jspdf';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { useState } from 'react';

interface IProps {
    doc: jsPDF,
    titulo_reporte: any,
    reporte: any,
    tipo_reporte: string
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ReportesXLS = (props: IProps) => {
    const [columns, set_columns] = useState<GridColDef[]>([]);
    const button_style = {
        color: 'white',
        backgroundColor: 'red',
        // border: '3px solid black',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px'
    };
    const columnas_mp: GridColDef[] = [
        {
            field: 'nombre_vivero',
            headerName: 'NOMBRE VIVERO',
            width: 250,
            valueGetter: (params) => params.row.nombre_vivero,
        },
        {
            field: 'numero_registros',
            headerName: 'NUMERO DE REGISTROS',
            width: 250,
            valueGetter: (params) => params.row.numero_registros,
        },
        {
            field: 'cantidad_mortalidad',
            headerName: 'CANTIDAD MORTALIDAD',
            width: 250,
            valueGetter: (params) => params.row.cantidad_mortalidad,
        },
        {
            field: 'unidad_medida_abreviatura',
            headerName: 'UNIDAD DE MEDIDA',
            width: 250,
            valueGetter: (params) => params.row.unidad_medida_abreviatura,
        },
        {
            field: 'mortalidad_cuarentena',
            headerName: 'MORTALIDAD DURANTE CUARENTENA',
            width: 250,
            valueGetter: (params) => params.row.mortalidad_cuarentena,
        }
    ]
    const descargar_xls = () => {
        if (props.tipo_reporte === 'MP') {
            generar_columnas_mortalidad();
        }
        if (props.tipo_reporte === 'PSPD') {
            generar_columnas_pspd();
        }
        if (props.tipo_reporte === 'EAP') {
            generar_columnas_eap();
        }
        if (props.tipo_reporte === 'EL') {
            generar_columnas_el();
        }
    }

    const generar_columnas_mortalidad = () => {
        set_columns([
            {
                field: 'nombre_vivero',
                headerName: 'NOMBRE VIVERO',
                width: 250,
                valueGetter: (params) => params.row.nombre_vivero,
            },
            {
                field: 'numero_registros',
                headerName: 'NUMERO DE REGISTROS',
                width: 250,
                valueGetter: (params) => params.row.numero_registros,
            },
            {
                field: 'cantidad_mortalidad',
                headerName: 'CANTIDAD MORTALIDAD',
                width: 250,
                valueGetter: (params) => params.row.cantidad_mortalidad,
            },
            {
                field: 'unidad_medida_abreviatura',
                headerName: 'UNIDAD DE MEDIDA',
                width: 250,
                valueGetter: (params) => params.row.unidad_medida_abreviatura,
            },
            {
                field: 'mortalidad_cuarentena',
                headerName: 'MORTALIDAD DURANTE CUARENTENA',
                width: 250,
                valueGetter: (params) => params.row.mortalidad_cuarentena,
            }
        ]);
    }

    const generar_columnas_pspd = () => {
    }
    const generar_columnas_eap = () => {
    }
    const generar_columnas_el = () => {
    }
    const descargar_pdf = () => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        props.doc.save(`${(props.titulo_reporte.reporte_seleccionado !== null && props.titulo_reporte.reporte_seleccionado !== undefined) ? props.titulo_reporte.reporte_seleccionado.name : ''}.pdf`);
    }
    return (
        <Box
            component="form"
            sx={{ mb: '20px' }}
            noValidate
            autoComplete="off"
        >
            <Grid item xs={12} sm={12}>

                <ButtonGroup
                    style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
                >
                    <Button style={button_style} onClick={descargar_pdf}>
                        <img style={{ width: 45 }} src="../image/botones/PDF.png" alt="PDF Button" />
                    </Button>
                    {/* {download_xls({ nurseries: props.reporte, columns: columnas_mp })} */}
                </ButtonGroup>
            </Grid>
        </Box>
    )
}
// eslint-disable-next-line no-restricted-syntax
export default ReportesXLS;
