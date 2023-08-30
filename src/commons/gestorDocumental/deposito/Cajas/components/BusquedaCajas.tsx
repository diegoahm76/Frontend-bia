/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Dialog,
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
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../../../../hooks';
import {
  set_current_cajas,
  set_current_estantes,
  set_current_id_depo_est,
  set_current_mode_estantes,
} from '../../store/slice/indexDeposito';
import { DataContext } from '../../Estantes/context/context';
import { search_caja } from '../services/services';
import type { IBuscarCaja } from '../types/types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaCajas: React.FC = () => {
  const {
    depositos_selected_mover_estante,
    set_id_bandeja,
    fetch_data_depositos,
  } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'orden_caja',
      headerName: 'ORDEN DE LA CAJA',
      sortable: true,
      width: 100,
    },
    {
      field: 'identificacion_caja',
      headerName: 'IDENTIFICACIÓN DE LA CAJA',
      sortable: true,
      width: 250,
    },
    {
      field: 'identificacion_bandeja',
      headerName: 'IDENTIFICACIÓN DE LA BANDEJA',
      sortable: true,
      width: 250,
    },
    {
      field: 'identificacion_estante',
      headerName: 'IDENTIFICACIÓN DEL ESTANTE',
      sortable: true,
      width: 250,
    },
    {
      field: 'identificacion_deposito',
      headerName: 'IDENTIFICACIÓN DEL DEPÓSITO',
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
              set_id_bandeja(params.row.id_bandeja);
              dispatch(
                set_current_mode_estantes({
                  ver: false,
                  crear: false,
                  editar: true,
                })
              );

              dispatch(
                set_current_cajas({
                  id_caja: params.row.id_caja,
                  identificacion_caja: params.row.identificacion_caja,
                  orden_caja: params.row.orden_caja,
                  id_bandeja: params.row.id_bandeja,
                  identificacion_bandeja: params.row.identificacion_bandeja,
                  id_estante: params.row.id_estante,
                  identificacion_estante: params.row.identificacion_estante,
                  id_deposito: params.row.id_deposito,
                  identificacion_deposito: params.row.identificacion_deposito,
                })
              );

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
                titleAccess="Editar caja"
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
      //   identificacion_deposito: {
      //     value: '',
      //     label: '',
      //   },
      identificacion_deposito: '',
      identificacion_estante: '',
      identificacion_bandeja: '',
      identificacion_caja: '',
      orden_caja: '',
    },
  });

  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<IBuscarCaja[]>([]);

  const dispatch = useAppDispatch();

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    // reset();
    set_open_dialog(false);
  };

  const on_submit_advance = handle_submit(
    async ({
      identificacion_deposito,
      identificacion_estante,
      identificacion_bandeja,
      identificacion_caja,
      orden_caja,
    }) => {
      set_is_search(true);
      try {
        set_rows([]);
        const {
          data: { data },
        } = await search_caja({
          identificacion_deposito,
          identificacion_estante,
          identificacion_bandeja,
          identificacion_caja,
          orden_caja,
        });

        if (data?.length > 0) {
          set_rows(data);
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
            <Title title="Búsqueda avanzada cajas" />
            <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="identificacion_deposito"
                  control={control}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Identificación del depósito"
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
                      {depositos_selected_mover_estante.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />{' '}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
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
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="identificacion_bandeja"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <TextField
                      label="Identificación de la bandeja"
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
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="identificacion_caja"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <TextField
                      label="Identificación de la caja"
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
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="orden_caja"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <TextField
                      label="Orden de la caja"
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

              <Grid item xs={12} sm={6} md={4} container justifyContent="end">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
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
      </Dialog>
    </>
  );
};
