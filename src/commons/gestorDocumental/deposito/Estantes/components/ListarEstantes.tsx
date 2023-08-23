/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Avatar, Box, Grid, IconButton } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarEstantes: React.FC = () => {
  const columns_estantes: GridColDef[] = [
    {
      field: 'orden_ubicacion_por_deposito',
      headerName: 'ORDEN',
      sortable: true,
      width: 250,
    },
    {
      field: 'identificacion_por_deposito',
      headerName: 'IDENTIFICACIÓN',
      sortable: true,
      width: 250,
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      width: 250,
      renderCell: (params) => (
        <>
          {/* <IconButton
          size="small"
          onClick={() => {
            console.log(params.row, 'params.row')
            reset({
              orden_ubicacion_por_deposito:
                params.row.orden_ubicacion_por_deposito,
              orden_estante: params.row.orden_ubicacion_por_entidad,
              nombre_deposito: params.row.nombre_deposito,
            });
            set_id_deposito(params.row.id_deposito);
            handle_close();
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
              titleAccess="Seleccionar"
              sx={{
                color: 'primary.main',
                width: '18px',
                height: '18px',
              }}
            />
          </Avatar>
        </IconButton> */}
          <IconButton size="small" onClick={() => {}}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <EditIcon
                titleAccess="Editar instrumento"
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

  const { rows_estantes, id_deposito, fetch_data_estantes_depositos } =
    useContext(DataContext);

  useEffect(() => {
    if (id_deposito) {
      void fetch_data_estantes_depositos();
    }
  }, [id_deposito]);

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
          <Title title="Listado de estantes por depósito de archivos" />
        </Grid>
        <>
          <Grid item xs={12}>
            <Box sx={{ height: 400, width: '100%' }}>
              <>
                <DataGrid
                  rows={rows_estantes}
                  columns={columns_estantes}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  getRowId={(row) => uuidv4()}
                />
              </>
            </Box>
          </Grid>
        </>
      </Grid>
    </>
  );
};
