/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  DataGrid,
  GridValueFormatterParams,
  type GridColDef,
} from '@mui/x-data-grid';
// import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../../../../../../hooks';
import { control_error } from '../../../../../../helpers';
import { Title } from '../../../../../../components/Title';
import { download_xls } from '../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../documentos-descargar/PDF_descargar';
import {
  set_current_detalle_inversion,
  set_current_mode_planes,
} from '../../../../store/slice/indexPlanes';
import { DataContextDetalleInversion } from '../../../context/context';
import { IBusquedaDetalleInversion } from './types';
import { search_detalle_inversion } from '../../../services/services';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusuquedaDetalleInversion: React.FC = () => {
  // const { id_deposito, sucusal_selected } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'nombre_sector',
      headerName: 'Nombre del Sector',
      sortable: true,
      width: 200,
    },
    {
      field: 'rubro',
      headerName: 'Rubro',
      sortable: true,
      width: 250,
    },
    {
      field: 'nombre_programa',
      headerName: 'Nombre del Programa',
      sortable: true,
      width: 250,
    },
    {
      field: 'nombre_subprograma',
      headerName: 'Nombre del Subprograma',
      sortable: true,
      width: 250,
    },
    {
      field: 'nombre_proyecto',
      headerName: 'Nombre del Proyecto',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_producto',
      headerName: 'Nombre del Producto',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_actividad',
      headerName: 'Nombre de la Actividad',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_indicador',
      headerName: 'Nombre del Indicador',
      sortable: true,
      width: 250,
    },
    {
      field: 'nombre_meta',
      headerName: 'Nombre de la Meta',
      sortable: true,
      width: 150,
    },
    {
      field: 'cuenta',
      headerName: 'Cuenta',
      sortable: true,
      width: 250,
    },
    {
      field: 'valor_cuenta',
      headerName: 'VALOR DE LA CUENTA',
      sortable: true,
      width: 300,
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
      width: 200,
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
              reset({
                cuenta: params.row.cuenta,
                nombre_programa: params.row.nombre_programa,
                nombre_proyecto: params.row.nombre_proyecto,
                nombre_producto: params.row.nombre_producto,
                nombre_actividad: params.row.nombre_actividad,
                nombre_indicador: params.row.nombre_indicador,
              });
              handle_close();
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
                titleAccess="Editar"
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
    reset,
    handleSubmit: handle_submit,
    control,
  } = useForm({
    defaultValues: {
      cuenta: '',
      nombre_programa: '',
      nombre_proyecto: '',
      nombre_producto: '',
      nombre_actividad: '',
      nombre_indicador: '',
    },
  });

  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<IBusquedaDetalleInversion[]>([]);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    // reset();
    set_open_dialog(false);
  };

  const dispatch = useAppDispatch();

  const on_submit_advance = handle_submit(
    async ({
      cuenta,
      nombre_programa,
      nombre_proyecto,
      nombre_producto,
      nombre_actividad,
      nombre_indicador,
    }) => {
      set_is_search(true);
      try {
        set_rows([]);
        const {
          data: { data },
        } = await search_detalle_inversion({
          cuenta,
          nombre_programa,
          nombre_proyecto,
          nombre_producto,
          nombre_actividad,
          nombre_indicador,
        });

        if (data?.length > 0) {
          set_rows(data);
        }
      } catch (error: any) {
        // const temp_error = error as AxiosError;
        // const resp = temp_error.response?.data as ResponseServer<any>;
        control_error(error.response?.data.detail ?? 'Error en la búsqueda');
      } finally {
        set_is_search(false);
      }
    }
  );

  const {
    set_id_plan,
    set_id_programa,
    set_id_proyecto,
    set_id_producto,
    set_id_actividad,
    set_id_indicador,
    set_id_meta,
  } = useContext(DataContextDetalleInversion);

  useEffect(() => {
    reset();
    set_rows([]);
    set_is_search(false);
  }, []);

  return (
    <>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={() => {
            handle_click_open();
          }}
        >
          Buscar
        </Button>
      </Grid>
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="lg">
        <DialogContent>
          <Grid
            container
            spacing={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
              marginTop: '20px',
              marginLeft: '-5px',
            }}
          >
            <Title title="Búsqueda avanzada detalle inversión cuentas" />
            <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="cuenta"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <TextField
                      fullWidth
                      label="Cuenta"
                      value={value}
                      onChange={onChange}
                      size="small"
                      margin="dense"
                      disabled={false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="nombre_programa"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <TextField
                      fullWidth
                      label="Nombre programa"
                      value={value}
                      onChange={onChange}
                      size="small"
                      margin="dense"
                      disabled={false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="nombre_proyecto"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <TextField
                      fullWidth
                      label="Nombre proyecto"
                      value={value}
                      onChange={onChange}
                      size="small"
                      margin="dense"
                      disabled={false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="nombre_producto"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <TextField
                      fullWidth
                      label="Nombre producto"
                      value={value}
                      onChange={onChange}
                      size="small"
                      margin="dense"
                      disabled={false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="nombre_actividad"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <TextField
                      fullWidth
                      label="Nombre actividad"
                      value={value}
                      onChange={onChange}
                      size="small"
                      margin="dense"
                      disabled={false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="nombre_indicador"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <TextField
                      fullWidth
                      label="Nombre indicador"
                      value={value}
                      onChange={onChange}
                      size="small"
                      margin="dense"
                      disabled={false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} container justifyContent="end">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  loading={is_search}
                  disabled={is_search}
                  onClick={(e) => {
                    void on_submit_advance(e);
                  }}
                >
                  Buscar
                </LoadingButton>
              </Grid>
              {rows.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <Title title="Resultados de la búsqueda" />
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
                        {download_xls({ nurseries: rows, columns })}
                        {download_pdf({
                          nurseries: rows,
                          columns,
                          title: 'Resultados de la búsqueda',
                        })}
                      </ButtonGroup>
                      <DataGrid
                        density="compact"
                        autoHeight
                        rows={rows ?? []}
                        columns={columns ?? []}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={() => uuidv4()}
                      />
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
            {/* </form> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={() => {
              handle_close();
              // reset();
            }}
          >
            Cerrar
          </Button>{' '}
        </DialogActions>
      </Dialog>
    </>
  );
};
