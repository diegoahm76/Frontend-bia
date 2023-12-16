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
  set_current_producto,
  set_current_mode_planes,
} from '../../../store/slice/indexPlanes';
import { DataContextProductos } from '../../context/context';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarProductos: React.FC = () => {
  const columns_productos: GridColDef[] = [
    {
      field: 'nombre_producto',
      headerName: 'NOMBRE DEL PRODUCTO',
      sortable: true,
      width: 300,
    },
    {
      field: 'numero_producto',
      headerName: 'NUMERO DEL PRODUCTO',
      sortable: true,
      width: 200,
    },
    {
      field: 'nombre_proyecto',
      headerName: 'NOMBRE DEL PROYECTO',
      sortable: true,
      width: 300,
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
              dispatch(
                set_current_mode_planes({
                  ver: true,
                  crear: false,
                  editar: true,
                })
              );
              dispatch(set_current_producto(params.row));
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
                titleAccess="Editar producto"
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

  const { rows_producto, fetch_data_producto } =
    useContext(DataContextProductos);

  const {
    proyecto: { id_proyecto },
  } = useAppSelector((state) => state.planes);

  //  console.log('')('id_proyecto', id_proyecto);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id_proyecto) {
      fetch_data_producto();
    }
  }, [id_proyecto]);

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
          <Title title="Listado de productos " />
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
                    nurseries: rows_producto,
                    columns: columns_productos,
                  })}
                  {download_pdf({
                    nurseries: rows_producto,
                    columns: columns_productos,
                    title: 'CREAR ',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_producto}
                  columns={columns_productos}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => uuidv4()}
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
              Agregar producto
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
