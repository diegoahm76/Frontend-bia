import { Box, Button, ButtonGroup, Grid, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import jsPDF from 'jspdf';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { useState } from 'react';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';

interface IProps {
    cols: GridColDef[],
    resultado_busqueda: any
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ExportDocs = (props: IProps) => {
    return (
        <Box
            component="form"
            sx={{ mb: '10px' }}
            noValidate
            autoComplete="off"
        >
            <Grid item xs={12} sm={12}>

                <ButtonGroup
                    style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
                >
                    {download_pdf({ nurseries: props.resultado_busqueda, columns: props.cols, title: 'Tablero de control - Almacén' })}
                    {download_xls({ nurseries: props.resultado_busqueda, columns: props.cols })}
                </ButtonGroup>
            </Grid>
        </Box>
    )
}
// eslint-disable-next-line no-restricted-syntax
export default ExportDocs;
