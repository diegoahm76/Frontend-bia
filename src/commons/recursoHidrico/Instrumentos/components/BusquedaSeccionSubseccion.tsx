/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { AxiosError } from 'axios';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { type ResponseServer } from '../../../../interfaces/globalModels';
import { control_error } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from '../context/contextData';
import { search_seccion_subseccion } from '../request/request';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import SearchIcon from '@mui/icons-material/Search';

export const BusquedaSeccionSubseccion: React.FC = (): JSX.Element => {
  const {
    nombre_subseccion,
    nombre_seccion,
    set_nombre_seccion,
    set_nombre_subseccion,
    set_id_seccion,
    set_id_subseccion,
  } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'nombre_seccion',
      headerName: 'NOMBRE SECCIÓN',
      sortable: true,
      width: 300,
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE SUBSECCIÓN',
      sortable: true,
      width: 300,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 80,
      renderCell: (params) => (
        <>
          <Tooltip title="Seleccionar">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<ChecklistOutlinedIcon />}
              onClick={() => {
                set_nombre_seccion(params.row.nombre_seccion);
                set_nombre_subseccion(params.row.nombre);
                set_id_seccion(params.row.id_seccion);
                set_id_subseccion(params.row.id_subseccion);
                handle_close();
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const {
    handleSubmit: handle_submit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre_seccion: '',
      nombre_subseccion: '',
    },
  });

  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<any[]>([]);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    set_open_dialog(false);
  };

  const on_submit_advance = handle_submit(
    async ({ nombre_seccion, nombre_subseccion }) => {
      set_is_search(true);
      try {
        set_rows([]);
        const {
          data: { data },
        } = await search_seccion_subseccion({
          nombre_seccion,
          nombre_subseccion,
        });

        if (data?.length > 0) {
          set_rows(data);
          //  console.log('')(data, 'data busqueda');
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
    set_nombre_seccion('');
    set_nombre_subseccion('');
    set_id_seccion(null);
    set_id_subseccion(null);
    set_is_search(false);
  }, []);

  useEffect(() => {
    reset({
      nombre_seccion: nombre_seccion ?? '',
      nombre_subseccion: nombre_subseccion ?? '',
    });
  }, [nombre_seccion, nombre_subseccion]);

  return (
    <>
      <Grid
        container
        spacing={2}
        // m={2}
        // p={2}
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
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1" fontWeight="bold">
            Nombre Sección
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1" fontWeight="bold">
            Nombre Subsección
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}></Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="nombre_seccion"
            control={control}
            defaultValue={nombre_seccion}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                margin="dense"
                disabled={true}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="nombre_subseccion"
            control={control}
            defaultValue={nombre_subseccion}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                margin="dense"
                disabled={true}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
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
      </Grid>
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="lg">
        <DialogContent>
          <form
            onSubmit={on_submit_advance}
            style={{
              width: '100%',
              height: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Title title="Búsqueda de sección y de subsección" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="nombre_seccion"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nombre sección"
                      disabled={false}
                      fullWidth
                      size="small"
                      margin="dense"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="nombre_subseccion"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nombre subsección"
                      disabled={false}
                      fullWidth
                      size="small"
                      margin="dense"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
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
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonGroup
                      style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
                    >
                      {download_xls({ nurseries: rows, columns })}
                      {download_pdf({ nurseries: rows, columns, title: 'Resultados de la búsqueda' })}
                    </ButtonGroup> 
                    <Box sx={{ height: 400, width: '100%' }}>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => uuidv4()}
                      />
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
