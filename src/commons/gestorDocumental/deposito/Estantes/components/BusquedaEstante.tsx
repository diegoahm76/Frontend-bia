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
// import EditIcon from '@mui/icons-material/Edit';
import type { InfoEstantes } from '../types/types';
import { search_estante } from '../services/services';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from '../context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaEstante: React.FC = () => {
  const {
    id_deposito,
    depositos_selected,
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
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 250,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              console.log(params.row, 'params.row')
              reset({
                orden_ubicacion_por_deposito:
                  params.row.orden_ubicacion_por_deposito,
                orden_estante: params.row.orden_ubicacion_por_entidad,
                nombre_deposito: params.row.nombre_deposito,
              });
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
                titleAccess="Seleccionar"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
          {/* <IconButton
            size="small"
            onClick={() => {
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
                titleAccess="Editar instrumento"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton> */}
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
      orden_ubicacion_por_deposito: '',
      orden_estante: '',
      nombre_deposito: '',
    },
  });

  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<InfoEstantes[]>([]);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    // reset();
    set_open_dialog(false);
  };

  const on_submit_advance = handle_submit(
    async ({
      orden_ubicacion_por_deposito,
      orden_estante,
      nombre_deposito,
    }) => {
      set_is_search(true);
      try {
        set_rows([]);
        const {
          data: { data },
        } = await search_estante({
          orden_ubicacion_por_deposito,
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
          Búscar
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
            <Title title="Búsqueda avanzada" />
            <form
              onSubmit={(e) => {
                void on_submit_advance(e);
              }}
              style={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Controller
                    name="orden_ubicacion_por_deposito"
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
                    loading={is_search}
                    disabled={is_search}
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
                      <Box sx={{ height: 400, width: '100%' }}>
                        <>
                          <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            getRowId={(row) => uuidv4()}
                          />
                        </>
                      </Box>
                    </Grid>
                  </>
                )}
              </Grid>
            </form>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
