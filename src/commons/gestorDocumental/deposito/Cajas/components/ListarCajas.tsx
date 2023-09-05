/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Avatar, Box, Grid, IconButton } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../Estantes/context/context';
// import { ButtonAdminCarpetas } from './ButtonAdminCarpetas';
import {
  set_current_cajas,
  set_current_mode_estantes,
} from '../../store/slice/indexDeposito';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';

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
              set_id_caja(params.row.id_caja_bandeja);
              set_orden(params.row.orden_ubicacion_por_bandeja);
              set_identificacion_caja(params.row.identificacion_por_bandeja);
              set_orden(params.row.orden_ubicacion_por_bandeja);
              dispatch(
                set_current_cajas({
                  ...cajas,
                  id_bandeja: params.row.id_bandeja_estante,
                  id_caja: params.row.id_caja_bandeja,
                  identificacion_caja: params.row.identificacion_por_bandeja,
                  orden_caja: params.row.orden_ubicacion_por_bandeja,
                  identificacion_bandeja: params.row.identificacion_bandeja,
                })
              );
              dispatch(
                set_current_mode_estantes({
                  ver: false,
                  crear: false,
                  editar: true,
                })
              );
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
                titleAccess="Editar caja"
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
    rows_cajas,
    id_bandeja,
    set_id_caja,
    set_orden,
    set_identificacion_caja,
    fetch_data_caja_bandeja,
  } = useContext(DataContext);

  const dispatch = useAppDispatch();

  const { cajas } = useAppSelector((state) => state.deposito);

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
      </Grid>
    </>
  );
};
