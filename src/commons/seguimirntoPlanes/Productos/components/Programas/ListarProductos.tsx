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
  set_current_producto,
} from '../../../store/slice/indexPlanes';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect } from 'react';
import { DataContextProductos } from '../../context/context';
import { v4 as uuidv4 } from 'uuid';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { Title } from '../../../../../components/Title';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarProductos: React.FC = () => {
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
      flex: 2
    },
    {
      field: 'nombre_proyecto',
      headerName: 'Nombre del Proyecto',
      sortable: true,
      minWidth: 350,
      flex: 2
    },
    {
      field: 'numero_producto',
      headerName: 'Número de Producto',
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: 'nombre_producto',
      headerName: 'Nombre del Producto',
      sortable: true,
      minWidth: 350,
      flex: 2
    },
    {
      field: 'fecha_creacion',
      headerName: 'Fecha de Creación',
      sortable: true,
      minWidth: 180,
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
              set_id_producto(params.row.id_producto);
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
                titleAccess="Editar Producto"
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
  //  console.log('')('id_proyecto', id_proyecto);

  const dispatch = useAppDispatch();

  const {
    id_proyecto,
    rows_producto,
    set_id_plan,
    set_id_programa,
    set_id_proyecto,
    set_id_producto,
    fetch_data_producto,
  } = useContext(DataContextProductos);

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
        // justifyContent="flex-end"
      >
        {rows_producto.length > 0 && (
          <>
            <Grid item xs={12}>
              <Title title="Listado de productos" />
              {/* <Typography>Listado de productos</Typography> */}
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
                  {download_xls({ nurseries: rows_producto, columns })}
                  {download_pdf({
                    nurseries: rows_producto,
                    columns,
                    title: 'Listado de productos',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_producto}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => uuidv4()}
                  getRowHeight={() => 'auto'}
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
              Agregar producto
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
