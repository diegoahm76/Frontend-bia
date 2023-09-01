/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { Controller, useForm } from 'react-hook-form';
import { control_error } from '../../../../../helpers';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import EditIcon from '@mui/icons-material/Edit';
import type { InfoEstantes } from '../types/types';
import { search_estante } from '../services/services';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from '../context/context';
import { useAppDispatch } from '../../../../../hooks';
import {
  set_current_estantes,
  set_current_id_depo_est,
  set_current_info_deposito,
  set_current_mode_estantes,
} from '../../store/slice/indexDeposito';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaEstante: React.FC = () => {
  const {
    depositos_selected,
    set_id_estante,
    set_id_deposito,
    fetch_data_depositos,
  } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'orden_ubicacion_por_deposito',
      headerName: 'ORDEN DEL ESTANTE',
      sortable: true,
      width: 100,
    },
    {
      field: 'identificacion_por_deposito',
      headerName: 'IDENTIFICACIÓN DEL ESTANTE',
      sortable: true,
      width: 250,
    },
    {
      field: 'identificacion_deposito',
      headerName: 'DEPÓSITO DE ARCHIVO',
      sortable: true,
      width: 250,
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      width: 250,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              set_id_estante(params.row.id_estante_deposito);
              dispatch(
                set_current_mode_estantes({
                  ver: true,
                  crear: false,
                  editar: false,
                })
              );
              dispatch(
                set_current_id_depo_est({
                  id_deposito: params.row.id_deposito,
                  id_estante_deposito: params.row.id_estante_deposito,
                  nombre_deposito: params.row.nombre_deposito,
                  identificacion_por_deposito:
                    params.row.identificacion_por_deposito,
                })
              );
              dispatch(
                set_current_info_deposito({
                  id_deposito: params.row.id_deposito,
                  orden_ubicacion_por_entidad:
                    params.row.orden_ubicacion_por_deposito,
                  nombre_deposito: params.row.nombre_deposito,
                  identificacion_por_entidad: params.row.id_estante_deposito,
                })
              );

              dispatch(
                set_current_estantes({
                  id_estante_deposito: params.row.id_estante_deposito,
                  orden_ubicacion_por_deposito: params.row.nombre_deposito,
                  identificacion_por_deposito:
                    params.row.identificacion_por_deposito,
                })
              );
              set_id_deposito(params.row.id_deposito);

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
              <ChecklistOutlinedIcon
                titleAccess="Seleccionar estante"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              set_id_estante(params.row.id_estante_deposito);
              dispatch(
                set_current_mode_estantes({
                  ver: false,
                  crear: false,
                  editar: true,
                })
              );
              dispatch(
                set_current_id_depo_est({
                  id_deposito: params.row.id_deposito,
                  id_estante_deposito: params.row.id_estante_deposito,
                  nombre_deposito: params.row.nombre_deposito,
                  identificacion_por_deposito:
                    params.row.identificacion_por_deposito,
                })
              );
              dispatch(
                set_current_info_deposito({
                  id_deposito: params.row.id_deposito,
                  orden_ubicacion_por_entidad:
                    params.row.orden_ubicacion_por_deposito,
                  nombre_deposito: params.row.nombre_deposito,
                  identificacion_por_entidad: params.row.id_estante_deposito,
                })
              );

              dispatch(
                set_current_estantes({
                  id_estante_deposito: params.row.id_estante_deposito,
                  orden_ubicacion_por_deposito: params.row.nombre_deposito,
                  identificacion_por_deposito:
                    params.row.identificacion_por_deposito,
                })
              );
              set_id_deposito(params.row.id_deposito);

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
                titleAccess="Editar estante"
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
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identificacion_estante: '',
      orden_estante: '',
      nombre_deposito: '',
    },
  });

  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<InfoEstantes[]>([]);

  const { set_nuevo_orden_estantes_selected } = useContext(DataContext);

  const dispatch = useAppDispatch();

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    // reset();
    set_open_dialog(false);
  };

  const on_submit_advance = handle_submit(
    async ({ identificacion_estante, orden_estante, nombre_deposito }) => {
      set_is_search(true);
      try {
        set_rows([]);
        const {
          data: { data },
        } = await search_estante({
          identificacion_estante,
          orden_estante,
          nombre_deposito,
        });

        if (data?.length > 0) {
          set_rows(data);
          const data_selected: any[] = data.map((item: InfoEstantes) => ({
            value: item.orden_ubicacion_por_deposito ?? '',
            label: item.orden_ubicacion_por_deposito ?? '',
            // label: `${item.nombre_deposito} - ${item.identificacion_por_entidad}`,
          }));
          set_nuevo_orden_estantes_selected(data_selected);
        }
      } catch (error: any) {
        control_error(error.response?.data.detail);
      } finally {
        set_is_search(false);
      }
    }
  );

  useEffect(() => {
    reset();
    set_rows([]);
    set_is_search(false);
    void fetch_data_depositos();
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
            <Title title="Búsqueda avanzada estantes" />
            <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="identificacion_estante"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <TextField
                      fullWidth
                      label="identificación del estante"
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
                  name="orden_estante"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <TextField
                      label="Orden del estante"
                      fullWidth
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
                  name="nombre_deposito"
                  control={control}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Depósito de archivo"
                      placeholder="Depósito de archivo"
                      select
                      size="small"
                      margin="dense"
                      disabled={false}
                      fullWidth
                      required={false}
                      value={value}
                      onChange={onChange}
                    >
                      {depositos_selected.map((option) => (
                        <MenuItem key={option.label} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />{' '}
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
                      <>
                        <DataGrid
                          density="compact"
                          autoHeight
                          rows={rows}
                          columns={columns}
                          pageSize={10}
                          rowsPerPageOptions={[10]}
                          getRowId={(row) => uuidv4()}
                        />
                      </>
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
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
