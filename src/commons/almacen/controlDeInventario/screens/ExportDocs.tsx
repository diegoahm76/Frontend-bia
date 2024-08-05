import { Box, Button, ButtonGroup, Grid, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { download_xls_props } from '../../../../documentos-descargar/XLS_descargar_props';
import { download_pdf_props } from '../../../../documentos-descargar/PDF_descargar_props';
import { download_new_pdf_props } from '../../../../documentos-descargar/PDF_descargar_new_library';

interface IProps {
    isEI?: boolean,
    cols: GridColDef[],
    resultado_busqueda: any,
    title: string,
    filtros: any,
    filtros_pdf: any,
    nombre_archivo: string
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
                    {/* {download_pdf_props({ nurseries: props.resultado_busqueda, columns: props.cols,filtrers: props.filtros_pdf, title: 'Tablero de control - Almacén',nombre_archivo: props.nombre_archivo })} */}
                    {download_new_pdf_props({ nurseries: props.resultado_busqueda, columns: props.cols,filtrers: props.filtros_pdf, title: props.title ,nombre_archivo: props.nombre_archivo, isEI: props.isEI})}
                    {download_xls_props({ nurseries: props.resultado_busqueda, columns: props.cols, filtrers: props.filtros, nombre_archivo: props.nombre_archivo })}
                </ButtonGroup>
            </Grid>
        </Box>
    )
}
// eslint-disable-next-line no-restricted-syntax
export default ExportDocs;
