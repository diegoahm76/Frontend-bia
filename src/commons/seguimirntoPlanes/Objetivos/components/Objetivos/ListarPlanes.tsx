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
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { useAppDispatch } from '../../../../../hooks';
import {
  set_current_mode_planes,
  set_current_planes,
} from '../../../store/slice/indexPlanes';
import { DataContextPlanes } from '../../../Planes/context/context';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarPlanes: React.FC = () => {
  const columns_planes: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE DEL PLAN',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'sigla_plan',
      headerName: 'SIGLA DEL PLAN',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'tipo_plan',
      headerName: 'TIPO DE PLAN',
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: 'agno_inicio',
      headerName: 'AÑO INICIO',
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: 'agno_fin',
      headerName: 'AÑO FIN',
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: 'activo',
      headerName: 'VIGENCIA',
      sortable: true,
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return params.row.estado_vigencia === true ? (
          <Chip
            size="small"
            label="vigente"
            color="success"
            variant="outlined"
          />
        ) : (
          <Chip
            size="small"
            label="No vigente"
            color="error"
            variant="outlined"
          />
        );
      },
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      minWidth: 150,
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

              dispatch(set_current_planes(params.row));
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
                titleAccess="Seleccionar plan"
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

  const { rows_planes, fetch_data_planes } = useContext(DataContextPlanes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void fetch_data_planes();
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
          <Title title="Listado de planes " />
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
                    nurseries: rows_planes,
                    columns: columns_planes,
                  })}
                  {download_pdf({
                    nurseries: rows_planes,
                    columns: columns_planes,
                    title: 'CREAR ACTIVIDAD',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_planes ?? []}
                  columns={columns_planes ?? []}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => uuidv4()}
                  getRowHeight={() => 'auto'}
                />
              </>
            </Box>
          </Grid>
        </>
      </Grid>
    </>
  );
};
