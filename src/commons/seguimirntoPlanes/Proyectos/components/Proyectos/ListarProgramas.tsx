/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Avatar, Box, ButtonGroup, Grid, IconButton } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { useAppDispatch } from '../../../../../hooks';
import {
  set_current_mode_planes,
  set_current_programa,
} from '../../../store/slice/indexPlanes';
import { DataContextProyectos } from '../../context/context';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarProgramas: React.FC = () => {
  const columns_programas: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE DEL PLAN',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_programa',
      headerName: 'NOMBRE DEL PROGRAMA',
      sortable: true,
      minWidth: 350,
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
              dispatch(
                set_current_mode_planes({
                  ver: true,
                  crear: false,
                  editar: false,
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
              <ChecklistOutlinedIcon
                titleAccess="Seleccionar programa"
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

  const { rows_programa, set_id_plan, fetch_data_programa } =
    useContext(DataContextProyectos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void fetch_data_programa();
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
          <Title title="Listado de Programas " />
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
                    nurseries: rows_programa,
                    columns: columns_programas,
                  })}
                  {download_pdf({
                    nurseries: rows_programa,
                    columns: columns_programas,
                    title: 'CREAR ',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_programa ?? []}
                  columns={columns_programas ?? []}
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
