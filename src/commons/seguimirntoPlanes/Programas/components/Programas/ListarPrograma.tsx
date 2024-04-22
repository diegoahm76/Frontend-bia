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
      field: 'nombre_eje_estrategico',
      headerName: 'NOMBRE DEL EJE ESTRATÉGICO',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_programa',
      headerName: 'NOMBRE DEL PROGRAMA',
      sortable: true,
      minWidth: 350,
      flex: 2
    },
    {
      field: 'numero_programa',
      headerName: 'NÚMERO DEL PROGRAMA',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'porcentaje_1',
      headerName: 'PORCENTAJE 1',
      sortable: true,
      minWidth: 120,
      flex: 1
    },
    {
      field: 'porcentaje_2',
      headerName: 'PORCENTAJE 2',
      sortable: true,
      minWidth: 120,
      flex: 1
    },
    {
      field: 'porcentaje_3',
      headerName: 'PORCENTAJE 3',
      sortable: true,
      minWidth: 120,
      flex: 1
    },
    {
      field: 'porcentaje_4',
      headerName: 'PORCENTAJE 4',
      sortable: true,
      minWidth: 120,
      flex: 1
    },
    {
      field: 'cumplio',
      headerName: '¿CUMPLIÓ?',
      sortable: true,
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (params.value ? 'Sí' : 'No'),
    },
    {
      field: 'fecha_creacion',
      headerName: 'FECHA DE CREACIÓN',
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
              set_id_eje_estrategico(params.row.id_eje_estrategico);
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
  //   plan: { id_eje_estrategico },
  // } = useAppSelector((state) => state.planes);

  const dispatch = useAppDispatch();
  const {
    id_eje_estrategico,
    rows_programa,
    set_id_eje_estrategico,
    set_id_programa,
    fetch_data_programa,
  } = useContext(DataContextprograma);

  useEffect(() => {
    if (id_eje_estrategico) {
      fetch_data_programa();
    }
  }, [id_eje_estrategico]);

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
              <Title title="Listado de programas" />
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
                  getRowHeight={() => 'auto'}
                />
              </Box>
            </Grid>
        <Grid container spacing={2} justifyContent="flex-end" my={1}>
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
