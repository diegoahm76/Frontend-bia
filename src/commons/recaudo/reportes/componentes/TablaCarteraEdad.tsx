/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, Stack, TextField } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { type CarteraEdad } from '../interfaces/interfaces';
import { useSelector } from 'react-redux';
import { faker } from '@faker-js/faker';

interface RootState {
  reportes_recaudo: {
    reportes_recaudo: CarteraEdad[];
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaCarteraEdad: React.FC = () => {
  const [visible_rows, set_visible_rows] = useState(Array<CarteraEdad>);
  const [total, set_total] = useState(0);
  const { reportes_recaudo } = useSelector((state: RootState) => state.reportes_recaudo);

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
      field: 'identificacion',
      headerName: 'NIT',
      width: 170,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_deudor',
      headerName: 'Nombre Deudor',
      width: 200,
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
      field: 'resolucion',
      headerName: 'Resolución',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'id_rango',
      headerName: 'Edad',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor_sancion',
      headerName: 'Valor',
      width: 170,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  useEffect(() => {
    set_visible_rows(reportes_recaudo)
  }, [reportes_recaudo])

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
        ) : null
      }
    </Box>
  );
}
