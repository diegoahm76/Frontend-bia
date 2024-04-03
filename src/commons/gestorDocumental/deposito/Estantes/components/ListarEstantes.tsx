/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Avatar, Box, Grid, IconButton } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/context';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import {
  set_current_estantes,
  set_current_id_depo_est,
  set_current_mode_estantes,
} from '../../store/slice/indexDeposito';
// import { IdEstanteDeposito } from '../../interfaces/deposito';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarEstantes: React.FC = () => {
  const columns_estantes: GridColDef[] = [
    {
      field: 'orden_ubicacion_por_deposito',
      headerName: 'ORDEN',
      sortable: true,
      width: 250,flex:1,
    },
    {
      field: 'identificacion_por_deposito',
      headerName: 'IDENTIFICACIÓN',
      sortable: true,
      width: 250,flex:1,
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      width: 250,flex:1,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(
                set_current_mode_estantes({
                  ver: true,
                  crear: false,
                  editar: false,
                })
              );

              dispatch(
                set_current_id_depo_est({
                  ...deposito_estante,
                  id_estante_deposito: params.row.id_estante_deposito,
                  identificacion_por_deposito:
                    params.row.identificacion_por_deposito,
                })
              );
              set_id_estante(params.row.id_estante_deposito);
              //  console.log('')(params.row, 'params.row');
              dispatch(set_current_estantes(params.row));
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
                titleAccess="Seleccionar estante"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(
                set_current_id_depo_est({
                  ...deposito_estante,
                  id_estante_deposito: params.row.id_estante_deposito,
                  identificacion_por_deposito:
                    params.row.identificacion_por_deposito,
                })
              );

              dispatch(
                set_current_mode_estantes({
                  ver: false,
                  crear: false,
                  editar: true,
                })
              );
              dispatch(set_current_estantes(params.row));
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
                titleAccess="Editar estante"
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

  const { deposito_estante } = useAppSelector((state) => state.deposito);

  const {
    rows_estantes,
    id_deposito,
    set_id_estante,
    fetch_data_estantes_depositos,
  } = useContext(DataContext);

  const dispatch = useAppDispatch();

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
            <Box sx={{ width: '100%' }}>
              <>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_estantes}
                  columns={columns_estantes}
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
