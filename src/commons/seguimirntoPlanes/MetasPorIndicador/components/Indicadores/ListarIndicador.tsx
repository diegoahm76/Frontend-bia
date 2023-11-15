/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Avatar, Box, Button, Chip, Grid, IconButton } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { useAppDispatch } from '../../../../../hooks';
import {
  set_current_indicador,
  set_current_mode_planes,
} from '../../../store/slice/indexPlanes';
import { DataContextIndicador } from '../../../Indicadores/context/context';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarIndicador: React.FC = () => {
  const columns_indicador: GridColDef[] = [
    {
      field: 'nombre_indicador',
      headerName: 'NOMBRE INDICADOR',
      sortable: true,
      width: 300,
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
      field: 'nombre_actividad',
      headerName: 'NOMBRE ACTIVIDAD',
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
                  editar: false,
                })
              );

              dispatch(set_current_indicador(params.row));
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
                titleAccess="Seleccionar indicador"
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

  const { rows_indicador, fetch_data_indicadores } =
    useContext(DataContextIndicador);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch_data_indicadores();
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
          <Title title="Listado de indicadores " />
        </Grid>
        <>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_indicador}
                  columns={columns_indicador}
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
