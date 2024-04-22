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
import { useContext, useEffect } from 'react';
import { DataContextPlanes } from '../../context/context';
import { useAppDispatch } from '../../../../../hooks';
import {
  set_current_mode_planes,
  set_current_planes,
} from '../../../store/slice/indexPlanes';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { Title } from '../../../../../components/Title';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarPlanes: React.FC = () => {
  const columns: GridColDef[] = [
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
              set_id_plan(params.row.id_plan);
              dispatch(
                set_current_mode_planes({
                  ver: true,
                  crear: false,
                  editar: true,
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
              <EditIcon
                titleAccess="Editar plan"
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
  const { rows_planes, set_id_plan, fetch_data_planes } =
    useContext(DataContextPlanes);

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
        // justifyContent="flex-end"
      >
        {rows_planes.length > 0 && (
          <>
            <Grid item xs={12}>
              <Title title="Listado de planes" />
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
                  {download_xls({ nurseries: rows_planes, columns })}
                  {download_pdf({
                    nurseries: rows_planes,
                    columns,
                    title: 'Planes',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_planes}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowHeight={() => 'auto'}
                  getRowId={(row) => uuidv4()}
                />
              </Box>
            </Grid>
          </>
        )}
        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
        >
          <Grid item>
            <Button
              sx={{marginTop: 2}}
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
              Agregar Plan
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
