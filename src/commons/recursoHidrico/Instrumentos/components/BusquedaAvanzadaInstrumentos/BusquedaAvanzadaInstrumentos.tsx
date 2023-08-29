/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { useForm } from 'react-hook-form';
import type { AxiosError } from 'axios';
import type { ResponseServer } from '../../../../../interfaces/globalModels';
import { control_error } from '../../../../../helpers';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { DataContext } from '../../context/contextData';
import type { BusquedaInstrumentos } from '../../interfaces/interface';
import { delete_instrumeto, search_instrumento } from '../../request/request';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '../../../../../hooks';
import {
  setCurrentInstrumento,
  set_current_id_instrumento,
} from '../../toolkit/slice/instrumentosSlice';
import { ButtonDelete } from '../../../../../utils/Eliminar/ButtonDelete';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaAvanzadaInstrumentos: React.FC = () => {
  const {
    set_mode,
    set_id_instrumento,
    set_nombre_seccion,
    set_nombre_subseccion,
    set_info_busqueda_instrumentos,
  } = useContext(DataContext);

  const dispatch = useAppDispatch();

  const columns: GridColDef[] = [
    {
      field: 'nombre_seccion',
      headerName: 'NOMBRE SECCIÓN',
      sortable: true,
      width: 250,
    },
    {
      field: 'nombre_subseccion',
      headerName: 'NOMBRE SUBSECCIÓN',
      sortable: true,
      width: 250,
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE INSTRUMENTO',
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
              dispatch(set_current_id_instrumento(params.row.id_instrumento));
              dispatch(
                setCurrentInstrumento({
                  nombre: params.row.nombre,
                  nombre_seccion: params.row.nombre_seccion,
                  nombre_subseccion: params.row.nombre_subseccion,
                  cod_tipo_agua: params.row.cod_tipo_agua,
                  id_pozo: params.row.id_pozo,
                })
              );
              set_info_busqueda_instrumentos(params.row);
              set_id_instrumento(params.row.id_instrumento);
              set_nombre_seccion(params.row.nombre_seccion);
              set_nombre_subseccion(params.row.nombre_subseccion);
              set_mode('select_instrumento');
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
                titleAccess="Seleccionar instrumento"
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
              dispatch(set_current_id_instrumento(params.row.id_instrumento));
              dispatch(
                setCurrentInstrumento({
                  nombre: params.row.nombre,
                  nombre_seccion: params.row.nombre_seccion,
                  nombre_subseccion: params.row.nombre_subseccion,
                  cod_tipo_agua: params.row.cod_tipo_agua,
                  id_pozo: params.row.id_pozo,
                })
              );
              set_info_busqueda_instrumentos(params.row);
              set_id_instrumento(params.row.id_instrumento);
              set_nombre_seccion(params.row.nombre_seccion);
              set_nombre_subseccion(params.row.nombre_subseccion);
              set_mode('edit_instrumento');
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
                titleAccess="Editar instrumento"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
          <ButtonDelete
            id={params.row.id_instrumento}
            confirmationMessage="¿Estás seguro de eliminar este instrumento?"
            successMessage="El instrumento se eliminó correctamente"
            deleteFunction={async () =>
              await delete_instrumeto(params.row.id_instrumento)
            }
            fetchDataFunction={async () => {
              await on_submit_advance();
            }}
          />
        </>
      ),
    },
  ];

  const {
    register,
    reset,
    handleSubmit: handle_submit,
    formState: { errors },
  } = useForm();

  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<BusquedaInstrumentos[]>([]);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    set_open_dialog(false);
  };

  const on_submit_advance = handle_submit(
    async ({ nombre_seccion, nombre_subseccion, nombre_instrumento }) => {
      set_is_search(true);
      try {
        set_rows([]);
        const {
          data: { data },
        } = await search_instrumento({
          nombre_seccion,
          nombre_subseccion,
          nombre_instrumento,
        });

        if (data?.length > 0) {
          set_rows(data);
        }
      } catch (error) {
        const temp_error = error as AxiosError;
        const resp = temp_error.response?.data as ResponseServer<any>;
        control_error(resp.detail);
      } finally {
        set_is_search(false);
      }
    }
  );
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
          startIcon={<SearchIcon />}
          color="primary"
          onClick={() => {
            handle_click_open();
          }}
        >
          Búsqueda Instrumento
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
            >
              <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Nombre sección"
                    disabled={false}
                    fullWidth
                    size="small"
                    margin="dense"
                    {...register('nombre_seccion')}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Nombre subsección"
                    disabled={false}
                    fullWidth
                    size="small"
                    margin="dense"
                    {...register('nombre_subseccion')}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Nombre instrumento"
                    disabled={false}
                    fullWidth
                    size="small"
                    margin="dense"
                    {...register('nombre_instrumento')}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} container justifyContent="end">
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={is_search}
                    disabled={is_search}
                    startIcon={<SearchIcon />}
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
                      <ButtonGroup
                        style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
                      >
                        {download_xls({ nurseries: rows, columns })}
                        {download_pdf({ nurseries: rows, columns, title: 'Resultados de la búsqueda' })}
                      </ButtonGroup> 
                      <Box sx={{ height: 400, width: '100%' }}>
                        <>
                          <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            getRowId={(row) => row.id_instrumento}
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
