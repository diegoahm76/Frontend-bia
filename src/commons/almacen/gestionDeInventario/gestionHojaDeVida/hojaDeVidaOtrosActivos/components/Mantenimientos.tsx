
import { Box, ButtonGroup, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Title } from '../../../../../../components/Title';
import { useAppSelector } from '../../../../../../hooks';
import { download_pdf } from '../../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../../documentos-descargar/XLS_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const Mantenimiento_other = () => {

    const { maintenance_other } = useAppSelector((state) => state.cvo);
    const columns_mantenimientos: GridColDef[] = [
        {
          field: 'tipo_descripcion',
          headerName: 'Tipo de mantenimiento',
          width: 250,
          cellClassName: 'truncate-cell',
          renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              {params.value}
            </div>
          ),
        },
        {
          field: 'fecha',
          headerName: 'Fecha de mantenimiento',
          width: 250,

          cellClassName: 'truncate-cell',
          renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              {params.row.fecha ? params.row.fecha : 'N/A'}
            </div>
          ),
        },
        {
          field: 'kilometraje_programado',
          headerName: 'Kilometraje Programado',
          width: 250,

          cellClassName: 'truncate-cell',
          renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              {params.row.kilometraje_programado ? params.row.kilometraje_programado : 'N/A'}
            </div>
          ),
        },
        {
          field: 'fecha_ejecutado',
          headerName: 'Fecha de ejecucion',
          width: 250,

          cellClassName: 'truncate-cell',
          renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              {params.row.fecha_ejecutado ? params.row.fecha_ejecutado.split('T')[0] : 'N/A'}
            </div>
          ),
        },
        {
          field: 'persona_realiza',
          headerName: 'Persona Realiza',
          width: 250,

          cellClassName: 'truncate-cell',
          renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              {params.row.persona_realiza ? params.row.persona_realiza : 'N/A'}
            </div>
          ),
        },
        {
          field: 'persona_diligencia',
          headerName: 'Persona Diligencia',
          width: 250,

          cellClassName: 'truncate-cell',
          renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              {params.row.persona_diligencia ? params.row.persona_diligencia : 'N/A'}
            </div>
          ),
        },
        {
          field: 'estado',
          headerName: 'Estado',

          width: 250,
          cellClassName: 'truncate-cell',
          renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              {params.value}
            </div>
          ),
        },
        {
          field: 'placa',
          headerName: 'Placa',

          width: 250,
          cellClassName: 'truncate-cell',
          renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              {params.value}
            </div>
          ),
        },
        {
          field: 'responsable',
          headerName: 'Responsable',
          width: 250,
          cellClassName: 'truncate-cell',
          renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              {params.value}
            </div>
          ),
        },
      ];



    return (
        <>
            <Grid container direction="row" padding={2} borderRadius={2}>
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    direction="row"
                    marginTop={2}
                >
                    <Box sx={{ width: '100%' }}>
                        <Title title="Mantenimientos" />
                        <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>

                            {download_xls({ nurseries: maintenance_other, columns: columns_mantenimientos })}
                            {download_pdf({ nurseries: maintenance_other, columns: columns_mantenimientos, title: "Mantenimientos" })}

                        </ButtonGroup>
                        {
                            (maintenance_other && maintenance_other.length > 0) ? (
                                <DataGrid
                                    density="compact"
                                    autoHeight
                                    columns={columns_mantenimientos ?? []}
                                    rows={maintenance_other ?? []}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    experimentalFeatures={{ newEditingApi: true }}
                                    getRowId={(row) => row.id_programacion_mantenimiento}
                                />
                            ) : (
                                <Typography variant="h6" component="h2">
                                    No hay datos disponibles
                                </Typography>
                            )
                        }

                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default Mantenimiento_other;



