/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
} from '@mui/material';
import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import {
  set_current_mode_planes,
  set_current_programa,
} from '../../../store/slice/indexPlanes';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DataContextprograma } from '../../context/context';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../../../../../components/Title';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarPrograma: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'Nombre del Plan',
      sortable: true,
      width: 250,
    },
    {
      field: 'nombre_programa',
      headerName: 'Nombre del Programa',
      sortable: true,
      width: 350,
    },
    {
      field: 'porcentaje_1',
      headerName: 'Porcentaje 1',
      sortable: true,
      width: 120,
    },
    {
      field: 'porcentaje_2',
      headerName: 'Porcentaje 2',
      sortable: true,
      width: 120,
    },
    {
      field: 'porcentaje_3',
      headerName: 'Porcentaje 3',
      sortable: true,
      width: 120,
    },
    {
      field: 'porcentaje_4',
      headerName: 'Porcentaje 4',
      sortable: true,
      width: 120,
    },
    {
      field: 'cumplio',
      headerName: '¿Cumplió?',
      sortable: true,
      width: 120,
      renderCell: (params) => (params.value ? 'Sí' : 'No'),
    },
    {
      field: 'fecha_creacion',
      headerName: 'Fecha de Creación',
      sortable: true,
      width: 180,
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
              set_id_plan(params.row.id_plan);
              set_id_programa(params.row.id_programa);
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

  // const {
  //   plan: { id_plan },
  // } = useAppSelector((state) => state.planes);

  const dispatch = useAppDispatch();
  const {
    id_plan,
    rows_programa,
    set_id_plan,
    set_id_programa,
    fetch_data_programa,
  } = useContext(DataContextprograma);

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
        {rows_programa.length > 0 && (
          <>
            <Grid item xs={12}>
              <Title title="Listado de programas" />
              {/* <Typography>Resultados de la búsqueda</Typography> */}
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
                  {download_xls({ nurseries: rows_programa, columns })}
                  {download_pdf({
                    nurseries: rows_programa,
                    columns,
                    title: 'RProgramas',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_programa}
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
              Agregar Programa
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
