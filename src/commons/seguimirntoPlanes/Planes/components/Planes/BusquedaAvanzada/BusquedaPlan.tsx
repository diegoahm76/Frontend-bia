/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
// import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { IBusquedaPLanes } from './types';
import { useAppDispatch } from '../../../../../../hooks';
import { control_error } from '../../../../../../helpers';
import { Title } from '../../../../../../components/Title';
import { download_xls } from '../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../documentos-descargar/PDF_descargar';
import {
  set_current_mode_planes,
  set_current_planes,
} from '../../../../store/slice/indexPlanes';
import EditIcon from '@mui/icons-material/Edit';
import { search_plan } from '../../../../Indicadores/services/services';
import { DataContextPlanes } from '../../../context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaPlan: React.FC = () => {
  // const { id_deposito, sucusal_selected } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE DEL PLAN',
      sortable: true,
      width: 250,
    },
    {
      field: 'sigla_plan',
      headerName: 'SIGLA DEL PLAN',
      sortable: true,
      width: 250,
    },
    {
      field: 'tipo_plan',
      headerName: 'TIPO DE PLAN',
      sortable: true,
      width: 200,
    },
    {
      field: 'agno_inicio',
      headerName: 'AÑO INICIO',
      sortable: true,
      width: 150,
    },
    {
      field: 'agno_fin',
      headerName: 'AÑO FIN',
      sortable: true,
      width: 150,
    },
    {
      field: 'activo',
      headerName: 'VIGENCIA',
      sortable: true,
      width: 200,
      renderCell: (params) => {
        return params.row.estado_vigencia === true ? (
          <Chip
            size="small"
            label="vigente"
            color="success"
            variant="outlined"
          />
        ) : (
          <Chip
            size="small"
            label="No vigente"
            color="error"
            variant="outlined"
          />
        );
      },
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      width: 250,
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
                  editar: true,
                })
              );
              dispatch(set_current_planes(params.row));
              reset({
                nombre_plan: params.row.nombre_plan,
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
                titleAccess="Editar plan"
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
      nombre_plan: '',
    },
  });

  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<IBusquedaPLanes[]>([]);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    // reset();
    set_open_dialog(false);
  };

  const dispatch = useAppDispatch();

  const on_submit_advance = handle_submit(async ({ nombre_plan }) => {
    set_is_search(true);
    try {
      set_rows([]);
      const {
        data: { data },
      } = await search_plan({
        nombre_plan,
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
  });

  const { set_id_plan } = useContext(DataContextPlanes);

  useEffect(() => {
    reset();
    set_rows([]);
    set_is_search(false);
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
          <Title title="Busqueda Planes" />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="nombre_plan"
            control={control}
            render={(
              { field: { onChange, value } } // formState: { errors }
            ) => (
              <TextField
                fullWidth
                label="Nombre plan"
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
            startIcon={<SearchIcon />}
            onClick={() => {
              handle_click_open();
            }}
          >
            Buscar
          </Button>
        </Grid>
        {/* {id_deposito && (
          <>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
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
                  Agregar estante
                </Button>
              </Grid>
            </Grid>
          </>
        )} */}
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
            <Title title="Búsqueda avanzada planes" />
            {/* <form
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
            > */}
            <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="nombre_plan"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <TextField
                      fullWidth
                      label="Nombre plan"
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
                        getRowId={(row) => uuidv4()}
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
