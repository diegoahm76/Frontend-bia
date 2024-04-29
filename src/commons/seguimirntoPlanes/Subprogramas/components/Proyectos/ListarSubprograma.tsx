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
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import {
  set_current_subprograma,
  set_current_mode_planes,
} from '../../../store/slice/indexPlanes';
import { DataContextSubprogramas } from '../../context/context';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarSubprograma: React.FC = () => {
  const columns_subprograma: GridColDef[] = [
    {
      field: 'nombre_subprograma',
      headerName: 'NOMBRE SUBPROGRAMA',
      sortable: true,
      minWidth: 200,
      flex: 2
    },
    {
      field: 'nombre_programa',
      headerName: 'NOMBRE DEL PROGRAMA',
      sortable: true,
      minWidth: 300,
      flex: 2
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
                  ver: true,
                  crear: false,
                  editar: true,
                })
              );
              dispatch(set_current_subprograma(params.row));
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
                titleAccess="Editar subprograma"
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

  const { rows_subprogramas, id_programa, fetch_data_subprogramas } = useContext(
    DataContextSubprogramas
  );

  // const {
  //   programa: { id_programa },
  // } = useAppSelector((state) => state.planes);

  //  console.log('')('id_programa', id_programa);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id_programa) {
      fetch_data_subprogramas();
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
      >
        <Grid item xs={12}>
          <Title title="Listado de subprogramas " />
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
                    nurseries: rows_subprogramas,
                    columns: columns_subprograma,
                  })}
                  {download_pdf({
                    nurseries: rows_subprogramas,
                    columns: columns_subprograma,
                    title: 'CREAR ',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_subprogramas}
                  columns={columns_subprograma}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => uuidv4()}
                  getRowHeight={() => 'auto'}
                />
              </>
            </Box>
          </Grid>
        </>
        <Grid container spacing={2} my={1} justifyContent="flex-end">
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
              Agregar Subprograma
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
