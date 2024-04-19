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
import { Title } from '../../../../../components/Title';
import {
  DataGrid,
  type GridColDef,
  type GridValueFormatterParams,
} from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import {
  set_current_seguimiento_pai,
  set_current_mode_planes,
} from '../../../store/slice/indexPlanes';
import { DataContextSeguimientoPAI } from '../../context/context';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarSeguimientoPAI: React.FC = () => {
  const columns_seguimiento_pai: GridColDef[] = [
    {
      field: 'razagada',
      headerName: 'REZAGADA',
      sortable: true,
      minWidth: 150,
      flex:1,
      renderCell: (params) => {
        return params.row.razagada === true ? (
          <Chip size="small" label="SI" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        );
      },
    },
    {
      field: 'fecha_registro_avance',
      headerName: 'FECHA REGISTRO AVANCE',
      sortable: true,
      minWidth: 150,
      flex:1,
    },
    {
      field: 'porcentaje_avance',
      headerName: 'PORCENTAJE AVANCE',
      sortable: true,
      minWidth: 150,
      flex:1,
    },
    {
      field: 'mes',
      headerName: 'MES',
      sortable: true,
      minWidth: 150,
      flex:1,
    },
    {
      field: 'nombre_meta',
      headerName: 'NOMBRE META',
      sortable: true,
      minWidth: 250,
      flex:1,
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      minWidth: 120,
      flex:1,
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
              dispatch(set_current_seguimiento_pai(params.row));
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
                titleAccess="Editar seguimiento PAI"
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

  const { rows_seguimiento_pai, fetch_data_seguimiento_pai } = useContext(
    DataContextSeguimientoPAI
  );

  // const {
  //   indicador: { id_indicador },
  // } = useAppSelector((state) => state.planes);s

  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (id_indicador) {
    fetch_data_seguimiento_pai();
    // }
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
        {/* <Grid item xs={12}>
          <Title title="Listado de detalle inversión cuentas " />
        </Grid> */}
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
                    nurseries: rows_seguimiento_pai,
                    columns: columns_seguimiento_pai,
                  })}
                  {download_pdf({
                    nurseries: rows_seguimiento_pai,
                    columns: columns_seguimiento_pai,
                    title: 'CREAR',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_seguimiento_pai ?? []}
                  columns={columns_seguimiento_pai ?? []}
                  pageSize={10}
                  // rowHeight={150}
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
                    ver: true,
                    crear: true,
                    editar: false,
                  })
                );
              }}
            >
              Agregar Seguimiento PAI
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
