/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Avatar, Box, Grid, IconButton } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../Estantes/context/context';
import { ButtonAdminCarpetas } from './ButtonAdminCarpetas';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarCajas: React.FC = () => {
  const columns_cajas: GridColDef[] = [
    {
      field: 'orden_ubicacion_por_bandeja',
      headerName: 'ORDEN',
      sortable: true,
      width: 250,
    },
    {
      field: 'identificacion_por_bandeja',
      headerName: 'IDENTIFICACIÓN',
      sortable: true,
      width: 250,
    },
    {
      field: 'Acciones',
      headerName: 'ACCIONES',
      sortable: true,
      width: 250,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              console.log(params.row, 'params.row');
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <ChecklistOutlinedIcon
                titleAccess="Seleccionar caja"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  const { rows_cajas, id_bandeja, fetch_data_caja_bandeja } =
    useContext(DataContext);

  useEffect(() => {
    if (id_bandeja) {
      void fetch_data_caja_bandeja();
    }
  }, [id_bandeja]);

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
          <Title title="Listado de cajas por bandeja" />
        </Grid>
        <>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_cajas}
                  columns={columns_cajas}
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
