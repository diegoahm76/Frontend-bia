/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
} from '@mui/material';
import { useAppDispatch } from '../../../../../hooks';
import {
  set_current_mode_planes,
  set_current_proyecto,
} from '../../../store/slice/indexPlanes';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useContext, useEffect } from 'react';
import { DataContextProyectos } from '../../context/context';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { Title } from '../../../../../components/Title';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarProyecto: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'Nombre del Plan',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_programa',
      headerName: 'Nombre del Programa',
      sortable: true,
      minWidth: 350,
      flex: 1
    },
    {
      field: 'numero_proyecto',
      headerName: 'Número de Proyecto',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_proyecto',
      headerName: 'Nombre del Proyecto',
      sortable: true,
      minWidth: 450,
      flex: 1
    },
    {
      field: 'pondera_1',
      headerName: 'Ponderación 1',
      sortable: true,
      minWidth: 120,
      flex: 1
    },
    {
      field: 'pondera_2',
      headerName: 'Ponderación 2',
      sortable: true,
      minWidth: 120,
      flex: 1
    },
    {
      field: 'pondera_3',
      headerName: 'Ponderación 3',
      sortable: true,
      minWidth: 120,
      flex: 1
    },
    {
      field: 'pondera_4',
      headerName: 'Ponderación 4',
      sortable: true,
      minWidth: 120,
      flex: 1
    },
    {
      field: 'cumplio',
      headerName: '¿Cumplió?',
      sortable: true,
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (params.value ? 'Sí' : 'No'),
    },
    {
      field: 'fecha_creacion',
      headerName: 'Fecha de Creación',
      sortable: true,
      minWidth: 160,
      flex: 1
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
              set_id_plan(params.row.id_plan);
              set_id_programa(params.row.id_programa);
              set_id_proyecto(params.row.id_proyecto);
              dispatch(
                set_current_mode_planes({
                  ver: true,
                  crear: false,
                  editar: true,
                })
              );
              dispatch(set_current_proyecto(params.row));
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
                titleAccess="Editar Programa"
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
    id_programa,
    rows_proyecto,
    set_id_plan,
    set_id_programa,
    set_id_proyecto,
    fetch_data_proyecto,
  } = useContext(DataContextProyectos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id_programa) {
      fetch_data_proyecto();
    }
  }, [id_programa]);

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
        // justifyContent="flex-end"
      >
        {rows_proyecto.length > 0 && (
          <>
            <Grid item xs={12}>
              <Title title="Listado de proyectos" />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
                <ButtonGroup
                  style={{
                    margin: 7,
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  {download_xls({ nurseries: rows_proyecto, columns })}
                  {download_pdf({
                    nurseries: rows_proyecto,
                    columns,
                    title: 'Listado de proyectos',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  getRowHeight={() => 'auto'}
                  rows={rows_proyecto}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => uuidv4()}
                />
              </Box>
            </Grid>
          </>
        )}
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
              Agregar Proyecto
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
