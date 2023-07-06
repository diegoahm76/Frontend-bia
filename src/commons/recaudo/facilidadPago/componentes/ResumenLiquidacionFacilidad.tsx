import { Grid, Box, Stack } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { faker } from '@faker-js/faker';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResumenLiquidacionFacilidad: React.FC = () => {

  const rows_resumen_inicial = [
    {
      parametro: 'Capital Total Inicial',
      valor: '567078000',
    },
    {
      parametro: 'Abono Facilidad',
      valor: '123000',
    },
  ]

  const columns_resumen_inicial: GridColDef[] = [
    {
      field: 'parametro',
      headerName: 'Resumen Inicial',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor',
      headerName: '',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  const rows_resumen_facilidad = [
    {
      parametro: 'Saldo Capital',
      valor: '117000000',
    },
    {
      parametro: 'Intereses de Mora',
      valor: '123000000',
    },
    {
      parametro: <strong>Deuda Total</strong>,
      valor: '240000000',
    },
  ]

  const columns_resumen_facilidad: GridColDef[] = [
    {
      field: 'parametro',
      headerName: 'Resumen para la Facilidad de Pago',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor',
      headerName: '',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  const rows_abono = [
    {
      parametro: 'Abono a Capital',
      valor: '417000000',
    },
    {
      parametro: 'Abono a Intereses',
      valor: '157000000',
    },
    {
      parametro: <strong>Total Abono</strong>,
      valor: '575000000',
    },
  ]

  const columns_abono: GridColDef[] = [
    {
      field: 'parametro',
      headerName: 'Aplicación del Abono',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor',
      headerName: '',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  const rows_cuota = [
    {
      parametro: 'Capital Distribuidos en Cuotas',
      valor: '50000000',
    },
    {
      parametro: 'Intereses Distribuidos en Cuotas',
      valor: '35000000',
    },
    {
      parametro: <strong>Total Cuota</strong>,
      valor: '85000000',
    },
  ]

  const columns_cuota: GridColDef[] = [
    {
      field: 'parametro',
      headerName: 'Distribución Cuota Mensual',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor',
      headerName: '',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Grid item>
            <Box sx={{ width: '100%' }}>
              <h3>3. Resumen de la Facilidad</h3>
              <Stack
                direction="row"
                justifyContent="space-around"
                spacing={2}
                sx={{ mt: '30px' }}
              >
                <DataGrid
                  autoHeight
                  disableSelectionOnClick
                  rows={rows_resumen_inicial}
                  columns={columns_resumen_inicial}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => faker.database.mongodbObjectId()}
                />
                <DataGrid
                  autoHeight
                  disableSelectionOnClick
                  rows={rows_abono}
                  columns={columns_abono}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => faker.database.mongodbObjectId()}
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-around"
                spacing={2}
                sx={{ mt: '30px' }}
              >
                <DataGrid
                  autoHeight
                  disableSelectionOnClick
                  rows={rows_resumen_facilidad}
                  columns={columns_resumen_facilidad}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => faker.database.mongodbObjectId()}
                />
                <DataGrid
                  autoHeight
                  disableSelectionOnClick
                  rows={rows_cuota}
                  columns={columns_cuota}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => faker.database.mongodbObjectId()}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
