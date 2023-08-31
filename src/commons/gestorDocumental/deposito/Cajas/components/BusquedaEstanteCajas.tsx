/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
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
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import {
  set_current_cajas,
  set_current_estantes,
  set_current_id_depo_est,
  set_current_mode_estantes,
} from '../../store/slice/indexDeposito';
import { DataContext } from '../../Estantes/context/context';
import type { InfoEstantes } from '../../Estantes/types/types';
import { search_estante } from '../../Estantes/services/services';
import Select from 'react-select';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaEstanteCajas: React.FC = () => {
  const {
    depositos_selected_mover_estante,
    id_estante,
    id_bandeja,
    bandejas_selected_get,
    set_orden,
    set_id_bandeja,
    set_id_estante,
    fetch_data_depositos,
    set_depositos_selected_mover_estante,
    fetch_data_bandejas_estantes,
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
              set_orden(params.row.orden_ubicacion_por_deposito);
              reset({
                identificacion_estante: params.row.identificacion_por_deposito,
                orden_estante: params.row.orden_ubicacion_por_deposito,
                nombre_deposito: params.row.identificacion_deposito,
              });
              set_id_estante(params.row.id_estante_deposito);

              dispatch(
                set_current_cajas({
                  id_deposito: params.row.id_deposito,
                  id_estante: params.row.id_estante_deposito,
                  identificacion_deposito: params.row.identificacion_deposito,
                  identificacion_estante:
                    params.row.identificacion_por_deposito,
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
              <ChecklistOutlinedIcon
                titleAccess="Seleccionar"
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
      nombre_deposito: {
        value: '',
        label: '',
      },
      id_bandeja_estante: {
        value: '',
        label: '',
      },
    },
  });

  const data_watch = watch();

  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<InfoEstantes[]>([]);

  const dispatch = useAppDispatch();
  const { cajas } = useAppSelector((state) => state.deposito);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    // reset();
    set_open_dialog(false);
  };

  const on_submit_advance = async (): Promise<any> => {
    const { identificacion_estante, orden_estante, nombre_deposito } =
      data_watch;

    try {
      set_is_search(true);
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
      }
    } catch (error: any) {
      control_error(error.response?.data.detail);
    } finally {
      set_is_search(false);
    }
  };
  useEffect(() => {
    reset({
      identificacion_estante: '',
      orden_estante: '',
      nombre_deposito: {
        value: '',
        label: '',
      },
    });
    set_depositos_selected_mover_estante([
      {
        value: '',
        label: '',
      },
    ]);
    set_rows([]);
    set_is_search(false);
    void fetch_data_depositos();
  }, []);

  useEffect(() => {
    if (id_estante) {
      void fetch_data_bandejas_estantes();
    }
  }, [id_estante]);

  useEffect(() => {
    if (data_watch?.id_bandeja_estante?.value) {
      dispatch(
        set_current_cajas({
          ...cajas,
          id_bandeja: data_watch?.id_bandeja_estante?.value as any,
        })
      );
      set_id_bandeja(data_watch?.id_bandeja_estante?.value as any);
    }
  }, [data_watch?.id_bandeja_estante?.value]);

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
          <Title title="Depósito de archivo" />
        </Grid>
        <Grid item xs={12}>
          <Divider />
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
                disabled={true}
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
        <Grid item xs={12} sm={6} md={3}>
          <Controller
            name="identificacion_estante"
            control={control}
            render={(
              { field: { onChange, value } } // formState: { errors }
            ) => (
              <TextField
                fullWidth
                label="Identificación del estante"
                value={value}
                onChange={onChange}
                size="small"
                margin="dense"
                disabled={true}
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
                fullWidth
                label="Orden del estante"
                value={value}
                onChange={onChange}
                size="small"
                margin="dense"
                disabled={true}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
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

        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          // sx={{
          //   marginTop: '25px',
          //   marginBottom: '10px',
          // }}
        >
          <Controller
            name="id_bandeja_estante"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <Select
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: '100%',
                      minHeight: '100%',
                    }),
                  }}
                  value={value}
                  onChange={onChange}
                  options={bandejas_selected_get as any[]}
                  placeholder="Seleccionar"
                  isDisabled={!id_estante}
                />
                <label>
                  <small
                    style={{
                      color: 'rgba(0, 0, 0, 0.6)',
                      fontWeight: 'thin',
                      fontSize: '0.75rem',
                      marginTop: '0.25rem',
                    }}
                  >
                    Bandeja actual
                  </small>
                </label>
              </div>
            )}
          />
        </Grid>

        {id_bandeja ? (
          <>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={!data_watch?.id_bandeja_estante}
                  onClick={() => {
                    // set_id_deposito(null);
                    dispatch(
                      set_current_mode_estantes({
                        ver: false,
                        crear: true,
                        editar: false,
                      })
                    );
                  }}
                >
                  Agregar Caja
                </Button>
              </Grid>
            </Grid>
          </>
        ) : null}
      </Grid>
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="lg">
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void on_submit_advance();
            }}
          >
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
                        onChange={(selectedOption) => {
                          onChange(selectedOption?.target?.value);
                        }}
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
                <Grid item xs={12} sm={6} md={3} container justifyContent="end">
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={is_search}
                    disabled={is_search}
                    // onClick={(e) => {
                    //   void on_submit_advance(e);
                    // }}
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
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
