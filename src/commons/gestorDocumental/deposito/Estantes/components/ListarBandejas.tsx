/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Box, Grid } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/context';
import { ButtonAdminBandeja } from './ButtonAdminBandeja';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarBandejas: React.FC = () => {
  const columns_estantes: GridColDef[] = [
    {
      field: 'orden_ubicacion_por_estante',
      headerName: 'ORDEN',
      sortable: true,
      width: 250,
    },
    {
      field: 'identificacion_por_estante',
      headerName: 'IDENTIFICACIÓN',
      sortable: true,
      width: 250,
    },
  ];

  const { rows_bandejas, id_estante, fetch_data_bandejas_estantes } =
    useContext(DataContext);

  useEffect(() => {
    if (id_estante) {
      void fetch_data_bandejas_estantes();
    }
  }, [id_estante]);

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Bandejas" />
        </Grid>
        <>
          <Grid item xs={12}>
            <Box sx={{ height: 400, width: '100%' }}>
              <>
                <DataGrid
                  rows={rows_bandejas}
                  columns={columns_estantes}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  getRowId={(row) => uuidv4()}
                />
              </>
            </Box>
          </Grid>
        </>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <ButtonAdminBandeja />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
