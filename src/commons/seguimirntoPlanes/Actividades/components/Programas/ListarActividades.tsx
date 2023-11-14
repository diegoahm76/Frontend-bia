/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Avatar, Box, Button, Chip, Grid, IconButton } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import {
  set_current_actividad,
  set_current_mode_planes,
} from '../../../store/slice/indexPlanes';
import { DataContextActividades } from '../../context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarActividades: React.FC = () => {

  const columns_actividads: GridColDef[] = [
    {
      field: 'nombre_actividad',
      headerName: 'NOMBRE ACTIVIDAD',
      sortable: true,
      width: 300,
    },
    {
      field: 'numero_actividad',
      headerName: 'NUMERO ACTIVIDAD',
      sortable: true,
      width: 120,
    },
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE PLAN',
      sortable: true,
      width: 300,
    },
    {
      field: 'nombre_producto',
      headerName: 'NOMBRE PRODUCTO',
      sortable: true,
      width: 300,
    },

    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      width: 200,
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
                  editar: true,
                })
              );
              dispatch(set_current_actividad(params.row));
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
              <EditIcon
                titleAccess="Editar actividad"
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

  const { rows_actividad, fetch_data_actividad } =
    useContext(DataContextActividades);

  const {
    producto: { id_producto }, 
  } = useAppSelector((state) => state.planes);

  console.log('id_producto', id_producto);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id_producto) {
      fetch_data_actividad();
    }
  }, [id_producto]);

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
          <Title title="Listado de actividads " />
        </Grid>
        <>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_actividad}
                  columns={columns_actividads}
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
            <Button
              variant="outlined"
              color="primary"
              disabled={false}
              onClick={() => {
                dispatch(
                  set_current_mode_planes({
                    ver: true,
                    crear: true,
                    editar: false,
                  })
                );
              }}
            >
              Agregar actividad
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
