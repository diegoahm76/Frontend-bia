import { Box, ButtonGroup, Grid, Typography } from '@mui/material';
import { Title } from '../../../../../../components/Title';
import { useAppSelector } from '../../../../../../hooks';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { download_xls } from '../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const Mantenimiento_vehicle = () => {
  const { maintenance_vehicle } = useAppSelector((state) => state.cve);
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
          {params.value}
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
            <ButtonGroup
              style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
            >
              {download_xls({
                nurseries: maintenance_vehicle,
                columns: columns_mantenimientos,
              })}
              {download_pdf({
                nurseries: maintenance_vehicle,
                columns: columns_mantenimientos,
                title: 'Mantenimientos',
              })}
            </ButtonGroup>
            {maintenance_vehicle && maintenance_vehicle.length > 0 ? (
              <DataGrid
                density="compact"
                autoHeight
                rows={maintenance_vehicle ?? []}
                columns={columns_mantenimientos ?? []}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_programacion_mantenimiento}
              />
            ) : (
              <Typography variant="h6" component="h2">
                No hay datos disponibles
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default Mantenimiento_vehicle;
