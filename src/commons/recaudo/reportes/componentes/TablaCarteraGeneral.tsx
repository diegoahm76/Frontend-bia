/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, Stack, TextField } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaCarteraGeneral: React.FC = () => {
  const [total, set_total] = useState(0);

  const visible_rows = [
    {
      codigo_contable: 1,
      concepto_deuda: 'Tasa Retributiva',
      valor_sancion: '30300000.00',
    },
    {
      codigo_contable: 2,
      concepto_deuda: 'Tasa Uso de Agua',
      valor_sancion: '12000000.00',
    },
    {
      codigo_contable: 3,
      concepto_deuda: 'Intereses Multas y Sanciones',
      valor_sancion: '75000000.00',
    },
    {
      codigo_contable: 4,
      concepto_deuda: 'Transferencia de Sector Eléctrico',
      valor_sancion: '13400000.00',
    },
  ];

  useEffect(() => {
    if(visible_rows.length !== 0) {
      let total = 0
      for(let i=0; i< visible_rows.length; i++){
        total = total + parseFloat(visible_rows[i].valor_sancion)
        set_total(total)
      }
    }
  }, [visible_rows])

  const columns: GridColDef[] = [
    {
      field: 'codigo_contable',
      headerName: 'Código Contable',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'concepto_deuda',
      headerName: 'Concepto Deuda',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor_sancion',
      headerName: 'Total',
      width: 170,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ width: '55%' }}>
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
              <Stack
                direction="row"
                display='flex'
                justifyContent='flex-end'
              >
                <Grid item xs={12} sm={2} mt='30px'>
                  <TextField
                    label={<strong>Total General</strong>}
                    size="small"
                    fullWidth
                    value={total}
                  />
                </Grid>
            </Stack>
            </Grid>
          </Grid>
    </Box>
  );
}
