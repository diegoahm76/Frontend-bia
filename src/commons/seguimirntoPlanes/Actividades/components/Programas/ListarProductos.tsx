/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Avatar, Box, Grid, IconButton } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { useAppDispatch } from '../../../../../hooks';
import {
  set_current_mode_planes,
  set_current_producto,
} from '../../../store/slice/indexPlanes';
import { DataContextActividades } from '../../context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarProductos: React.FC = () => {
  const columns_productos: GridColDef[] = [
    {
      field: 'nombre_producto',
      headerName: 'NOMBRE DEL PRODUCTO',
      sortable: true,
      width: 300,
    },
    {
      field: 'numero_producto',
      headerName: 'NUMERO DEL PRODUCTO',
      sortable: true,
      width: 200,
    },
    {
      field: 'nombre_proyecto',
      headerName: 'NOMBRE DEL PROYECTO',
      sortable: true,
      width: 300,
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      width: 250,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(
                set_current_mode_planes({
                  ver: true,
                  crear: false,
                  editar: false,
                })
              );

              dispatch(set_current_producto(params.row));
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
                titleAccess="Seleccionar producto"
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

  const { rows_productos, fetch_data_producto } = useContext(
    DataContextActividades
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    void fetch_data_producto();
  }, []);

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
          <Title title="Listado de productos " />
        </Grid>
        <>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_productos}
                  columns={columns_productos}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
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
