/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Grid,
  IconButton,
} from '@mui/material';
import { Title } from '../../../../../../components/Title';
import {
  DataGrid,
  type GridColDef,
  type GridValueFormatterParams,
} from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { DataContextRubros } from '../../context/context';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '../../../../../../hooks';
import {
  set_current_mode_planes,
  set_current_rubro,
} from '../../../../store/slice/indexPlanes';
import { download_xls } from '../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarRubros: React.FC = () => {
  const columns_rubro: GridColDef[] = [
    {
      field: 'cod_pre',
      headerName: 'CODPRE',
      sortable: true,
      minWidth: 300,
      flex: 2
    },
    {
      field: 'cuenta',
      headerName: 'CUENTA',
      sortable: true,
      minWidth: 300,
      flex: 2
    },
    {
      field: 'valcuenta',
      headerName: 'VALOR CUENTA',
      sortable: true,
      minWidth: 300,
      flex: 2,
      valueFormatter: (params: GridValueFormatterParams) => {
        const inversion = Number(params.value); // Convertir a número
        const formattedInversion = inversion.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });

        return formattedInversion;
      },
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(
                set_current_mode_planes({
                  ver: false,
                  crear: false,
                  editar: true,
                })
              );
              dispatch(set_current_rubro(params.row));
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
                titleAccess="Editar Rubro"
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

  const { rows_rubros, fetch_data_rubros } = useContext(DataContextRubros);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void fetch_data_rubros();
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
          <Title title="Listado de rubros " />
        </Grid>
        <>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <>
                <ButtonGroup
                  style={{
                    margin: 7,
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  {download_xls({
                    nurseries: rows_rubros,
                    columns: columns_rubro,
                  })}
                  {download_pdf({
                    nurseries: rows_rubros,
                    columns: columns_rubro,
                    title: 'CREAR ',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_rubros ?? []}
                  columns={columns_rubro ?? []}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => uuidv4()}
                  getRowHeight={() => 'auto'}
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
                    ver: false,
                    crear: true,
                    editar: false,
                  })
                );
              }}
            >
              Agregar Rubro
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
