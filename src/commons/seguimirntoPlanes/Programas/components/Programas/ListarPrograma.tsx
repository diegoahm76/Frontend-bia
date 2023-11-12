/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Avatar, Box, Button, Chip, Grid, IconButton } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import {
  set_current_programa,
  set_current_mode_planes,
} from '../../../store/slice/indexPlanes';
import { DataContextprograma } from '../../context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarPrograma: React.FC = () => {
  const columns_programas: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE DEL PLAN',
      sortable: true,
      width: 300,
    },
    {
      field: 'nombre_programa',
      headerName: 'NOMBRE DEL PROGRAMA',
      sortable: true,
      width: 300,
    },
    {
      field: 'porcentaje_1',
      headerName: 'PORCENTAJE 1',
      sortable: true,
      width: 100,
    },
    {
      field: 'porcentaje_2',
      headerName: 'PORCENTAJE 2',
      sortable: true,
      width: 100,
    },
    {
      field: 'porcentaje_3',
      headerName: 'PORCENTAJE 3',
      sortable: true,
      width: 100,
    },
    {
      field: 'porcentaje_4',
      headerName: 'PORCENTAJE 4',
      sortable: true,
      width: 100,
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
              dispatch(set_current_programa(params.row));
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
                titleAccess="Editar programa"
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

  const {
    rows_programa,
    fetch_data_programa,
  } = useContext(DataContextprograma);

  const {
    plan: { id_plan },
  } = useAppSelector((state) => state.planes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id_plan) {
      fetch_data_programa();
    }
  }, [id_plan]);

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
          <Title title="Listado de programas " />
        </Grid>
        <>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_programa}
                  columns={columns_programas}
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
              Agregar Programa
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
