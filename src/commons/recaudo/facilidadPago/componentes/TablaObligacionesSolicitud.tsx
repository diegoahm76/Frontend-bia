/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

interface RootState {
  obligaciones: {
    obligaciones: ObligacionesState[];
  }
}

interface ObligacionesState {
  id: number;
  nombreObligacion: string;
  fechaInicio: string;
  expediente: string;
  nroResolucion: string;
  valorCapital: number;
  valorIntereses: number;
  diasMora: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaObligacionesSolicitud: React.FC = () => {
  const { obligaciones } = useSelector((state: RootState) => state.obligaciones);

  /* const fac_pagos = [
    {
      id: 1,
      nombreObligacion: 'Permiso 1',
      fechaInicio: '01/01/2015',
      expediente: '378765',
      nroResolucion: '378765-143',
      valorCapital: 120000000,
      valorIntereses: 35000000,
      diasMora: 390,
    },
    {
      id: 2,
      nombreObligacion: 'Concesion Aguas',
      fechaInicio: '01/04/2015',
      expediente: '3342765',
      nroResolucion: '3342765-4546',
      valorCapital: 190700000,
      valorIntereses: 45000000,
      diasMora: 180,
    },
  ]; */

  const columns: GridColDef[] = [
    {
      field: 'nombreObligacion',
      headerName: 'Nombre Obligación',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fechaInicio',
      headerName: 'Fecha Inicio',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'expediente',
      headerName: 'Expediente',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nroResolucion',
      headerName: 'Nro Resolución',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valorCapital',
      headerName: 'Valor Capital',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valorIntereses',
      headerName: 'Valor Intereses',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'diasMora',
      headerName: 'Días Mora',
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
              <DataGrid
                autoHeight
                disableSelectionOnClick
                rows={obligaciones}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
