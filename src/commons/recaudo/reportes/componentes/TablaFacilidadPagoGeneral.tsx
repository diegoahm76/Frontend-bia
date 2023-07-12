/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type FacilidadGeneral } from '../interfaces/interfaces';
import { useSelector } from 'react-redux';
import { faker } from '@faker-js/faker';

interface RootState {
  reportes_recaudo: {
    reportes_recaudo: FacilidadGeneral;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaFacilidadPagoGeneral: React.FC = () => {
  const { reportes_recaudo } = useSelector((state: RootState) => state.reportes_recaudo);

  const visible_rows = [
    {
      tipo_cobro: 'Cobro Coactivo',
      total: reportes_recaudo.total_sanciones_coactivo,
    },
    {
      tipo_cobro: 'Cobro Persuasivo',
      total: reportes_recaudo.total_sanciones_persuasivo,
    },
    {
      tipo_cobro: <strong>Total General</strong>,
      total: <strong>{reportes_recaudo.total_general}</strong>,
    },
  ]

  const columns: GridColDef[] = [
    {
      field: 'tipo_cobro',
      headerName: 'Tipo Cobro',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'identificacion',
      headerName: 'NIT',
      width: 100,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_deudor',
      headerName: 'Nombre Deudor',
      width: 140,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'concepto_deudo',
      headerName: 'Concepto de Deuda',
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
      width: 120,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'resolucion',
      headerName: 'Resolución',
      width: 120,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'numero_factura',
      headerName: '# Factura',
      width: 120,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        )
      },
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {
        visible_rows.length !== 0 ? (
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
                    rows={visible_rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => faker.database.mongodbObjectId()}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ) : null
      }
    </Box>
  );
}
