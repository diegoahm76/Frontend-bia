/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Box, Grid } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../Estantes/context/context';
import { ButtonAdminCarpetas } from './ButtonAdminCarpetas';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarCarpetas: React.FC = () => {
  const columns_carpetas: GridColDef[] = [
    {
      field: 'orden_ubicacion_por_caja',
      headerName: 'ORDEN',
      sortable: true,
      width: 250,
    },
    {
      field: 'identificacion_por_caja',
      headerName: 'IDENTIFICACIÓN',
      sortable: true,
      width: 250,
    },
  ];

  const { rows_carpetas, id_caja, fetch_data_caja_carpeta } =
    useContext(DataContext);

    //  console.log('')(rows_carpetas, 'rows_carpetas')

  useEffect(() => {
    if (id_caja) {
      void fetch_data_caja_carpeta();
    }
  }, [id_caja]);

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
          <Title title="Carpetas" />
        </Grid>
        <>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_carpetas}
                  columns={columns_carpetas}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => uuidv4()}
                />
              </>
            </Box>
          </Grid>
        </>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <ButtonAdminCarpetas />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
