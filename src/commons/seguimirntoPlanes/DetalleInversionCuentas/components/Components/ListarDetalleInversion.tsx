/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
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
import { useAppDispatch } from '../../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import {
  set_current_detalle_inversion,
  set_current_mode_planes,
} from '../../../store/slice/indexPlanes';
import { DataContextDetalleInversion } from '../../context/context';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarDetalleInversion: React.FC = () => {
  const columns_detalle: GridColDef[] = [
    {
      field: 'nombre_sector',
      headerName: 'Nombre del Sector',
      sortable: true,
      minWidth: 200,
      flex: 1
    },
    {
      field: 'rubro',
      headerName: 'Rubro',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_programa',
      headerName: 'Nombre del Programa',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_subprograma',
      headerName: 'Nombre del Subprograma',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_proyecto',
      headerName: 'Nombre del Proyecto',
      sortable: true,
      minWidth: 350,
      flex: 1
    },
    {
      field: 'nombre_producto',
      headerName: 'Nombre del Producto',
      sortable: true,
      minWidth: 350,
      flex: 1
    },
    {
      field: 'nombre_actividad',
      headerName: 'Nombre de la Actividad',
      sortable: true,
      minWidth: 350,
      flex: 1
    },
    {
      field: 'nombre_indicador',
      headerName: 'Nombre del Indicador',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_meta',
      headerName: 'Nombre de la Meta',
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: 'cuenta',
      headerName: 'Cuenta',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'valor_cuenta',
      headerName: 'VALOR DE LA CUENTA',
      sortable: true,
      minWidth: 300,
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) => {
        const inversion = Number(params.value); // Convertir a número
        const formattedInversion = inversion.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });

        return formattedInversion;
      },
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
              set_id_programa(params.row.id_programa);
              set_id_proyecto(params.row.id_proyecto);
              set_id_producto(params.row.id_producto);
              set_id_actividad(params.row.id_actividad);
              set_id_indicador(params.row.id_indicador);
              set_id_meta(params.row.id_meta);
              dispatch(
                set_current_mode_planes({
                  ver: true,
                  crear: false,
                  editar: true,
                })
              );
              dispatch(set_current_detalle_inversion(params.row));
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
                titleAccess="Editar detalle inversion cuentas"
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
    set_id_programa,
    set_id_proyecto,
    set_id_producto,
    set_id_actividad,
    set_id_indicador,
    set_id_meta,
    rows_detalle_inversion,
    fetch_data_detalle_inversion,
  } = useContext(DataContextDetalleInversion);

  // const {
  //   indicador: { id_indicador },
  // } = useAppSelector((state) => state.planes);s

  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (id_indicador) {
    fetch_data_detalle_inversion();
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
        <Grid item xs={12}>
          <Title title="Listado de detalle inversión cuentas " />
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
                    nurseries: rows_detalle_inversion,
                    columns: columns_detalle,
                  })}
                  {download_pdf({
                    nurseries: rows_detalle_inversion,
                    columns: columns_detalle,
                    title: 'CREAR',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_detalle_inversion ?? []}
                  columns={columns_detalle ?? []}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={() => uuidv4()}
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
              Agregar detalle inversión cuentas
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
