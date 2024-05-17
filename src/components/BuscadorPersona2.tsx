/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Grid,
  type SelectChangeEvent,
  Skeleton,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
  Avatar,
} from '@mui/material';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { useState, useEffect } from 'react';
import { CustomSelect } from './CustomSelect';
// import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { control_error } from '../helpers';
import {
  get_bandeja_tareas,
  get_person_by_document,
  get_tipo_documento,
  search_avanzada,
} from '../request';
import type {
  IList,
  InfoPersona,
  ResponseServer,
} from '../interfaces/globalModels';
import type { AxiosError } from 'axios';
import { Title } from './Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface PropsBuscador {
  onResult: (data_persona: InfoPersona) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BuscadorPersona2: React.FC<PropsBuscador> = ({
  onResult,
}: PropsBuscador) => {
  const columns: GridColDef[] = [
    {
      field: 'tipo_persona',
      headerName: 'TIPO PERSONA',
      sortable: true,
      width: 170,
    },
    {
      field: 'tipo_documento',
      headerName: 'TIPO DOCUMENTO',
      sortable: true,
      width: 170,
    },
    {
      field: 'numero_documento',
      headerName: 'NÚMERO DOCUMENTO',
      sortable: true,
      width: 170,
    },
    {
      field: 'primer_nombre',
      headerName: 'PRIMER NOMBRE',
      sortable: true,
      width: 170,
    },
    {
      field: 'segundo_nombre',
      headerName: 'SEGUNDO NOMBRE',
      sortable: true,
      width: 170,
    },
    {
      field: 'primer_apellido',
      headerName: 'PRIMER APELLIDO',
      sortable: true,
      width: 170,
    },
    {
      field: 'segundo_apellido',
      headerName: 'SEGUNDO APELLIDO',
      sortable: true,
      width: 170,
    },
    {
      field: 'tipo_usuario',
      headerName: 'tipo usuario',
      sortable: true,
      width: 170,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 80,
      renderCell: (params) => (
        <>
          <IconButton aria-label="Seleccionar">
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
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                onClick={() => {
                  if (params.row !== undefined) {
                    handle_close();
                    onResult(params.row);
                    set_tipo_documento(params.row.tipo_documento);
                    set_value('numero_documento', params.row.numero_documento);
                    // set_nombre_completo(params.row.nombre_completo);
                  }
                }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];
  const columns_juridica: GridColDef[] = [
    {
      field: 'tipo_persona',
      headerName: 'TIPO PERSONA',
      sortable: true,
      width: 170,
    },
    {
      field: 'tipo_documento',
      headerName: 'TIPO DOCUMENTO',
      sortable: true,
      width: 170,
    },
    {
      field: 'numero_documento',
      headerName: 'NÚMERO DOCUMENTO',
      sortable: true,
      width: 170,
    },
    {
      field: 'razon_social',
      headerName: 'RAZÓN SOCIAL',
      sortable: true,
      width: 170,
    },
    {
      field: 'nombre_comercial',
      headerName: 'NOMBRE COMERCIAL',
      sortable: true,
      width: 170,
    },
    {
      field: 'tipo_usuario',
      headerName: 'tipo_usuario',
      sortable: true,
      width: 170,
    },


    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 80,
      renderCell: (params) => (
        <>
          <IconButton aria-label="Seleccionar">
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
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                onClick={() => {
                  if (params.row !== undefined) {
                    handle_close();
                    onResult(params.row);
                    // set_nombre_completo(params.row.nombre_comercial);
                    set_value('numero_documento', params.row.numero_documento);
                  }
                }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  const {
    register,
    handleSubmit: handle_submit,
    setValue: set_value,
    formState: { errors },
    control: control_form,
  } = useForm({
    defaultValues: {
      tipo_documento: '',
      numero_documento: '',
      primer_nombre: '',
      primer_apellido: '',
      razon_social: '',
      nombre_comercial: '',
    },
  });
  const [is_loading, set_is_loading] = useState(false);
  const [is_search, set_is_search] = useState(false);
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [tipo_documento, set_tipo_documento] = useState('');
  const [tipo_documento_av, set_tipo_documento_av] = useState('');
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<InfoPersona[]>([]);
  // const [nombre_completo, set_nombre_completo] = useState('');
  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    set_open_dialog(false);
  };

  const handle_change_select = (e: SelectChangeEvent<string>): void => {
    if (!open_dialog) {
      set_tipo_documento(e.target.value);
    } else {
      // Busqueda avanzada
      set_tipo_documento_av(e.target.value);
    }
  };

  const get_selects_options = async (): Promise<void> => {
    set_is_loading(true);
    try {
      const {
        data: { data: res_tipo_documento },
      } = await get_tipo_documento();
      set_tipo_documento_opt(res_tipo_documento ?? []);
    } catch (err) {
      control_error(err);
    } finally {
      set_is_loading(false);
    }
  };

  const on_submit = handle_submit(async ({ numero_documento }) => {
    set_is_search(true);
    try {
      const {
        data: { data },
      } = await get_person_by_document(tipo_documento, numero_documento);
      if (data !== undefined) {
        onResult(data);
        set_value('numero_documento', data.numero_documento);
        if (
          data.nombre_completo !== '' &&
          data.nombre_completo !== undefined &&
          data.nombre_completo !== null
        ) {
          // set_nombre_completo(data.nombre_completo);
        } else if (
          data.nombre_comercial !== '' &&
          data.nombre_comercial !== undefined &&
          data.nombre_comercial !== null
        ) {
          // set_nombre_completo(data.nombre_comercial);
        }
      } else {
        const new_data = {
          id: 0,
          id_persona: 0,
          tipo_persona: tipo_documento === 'NT' ? 'J' : 'N',
          tipo_documento,
          numero_documento,
          primer_nombre: '',
          segundo_nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          nombre_completo: '',
          razon_social: '',
          nombre_comercial: '',
          tiene_usuario: false,
          digito_verificacion: '',
          cod_naturaleza_empresa: '',
          tipo_usuario:'',
        };
        onResult(new_data);
      }
      set_tipo_documento_av(tipo_documento);
    } catch (error) {
      const temp_error = error as AxiosError;
      const resp = temp_error.response?.data as ResponseServer<any>;
      control_error(resp.detail);
    } finally {
      set_is_search(false);
    }
  });

  const on_submit_advance = handle_submit(
    async ({
      tipo_documento,
      numero_documento,
      primer_nombre,
      primer_apellido,
      razon_social,
      nombre_comercial,
    }) => {
      set_is_search(true);
      try {
        set_rows([]);
        const {
          data: { data },
        } = await get_bandeja_tareas();

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
    void get_selects_options();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          void on_submit(e);
        }}
      >
        <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomSelect
              onChange={handle_change_select}
              label="Tipo de documento *"
              name="tipo_documento"
              value={tipo_documento}
              options={tipo_documento_opt}
              disabled={is_loading}
              errors={errors}
              register={register}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {is_loading ? (
              <Skeleton variant="rectangular" width="100%" height={45} />
            ) : (
              <Controller
                name="numero_documento"
                control={control_form}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                }) => (
                  <TextField
                    label="Número de documento *"
                    variant="outlined"
                    fullWidth
                    size="small"
                    onChange={onChange}
                    value={value}

                    error={!!errors.numero_documento}
                    helperText={
                      errors.numero_documento?.type === 'required'
                        ? 'Este campo es obligatorio'
                        : ''
                    }
                  />
                )}
              />
            )}
          </Grid>
          {/* <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label="Nombre"
              size="small"
              disabled={true}
              multiline
              value={nombre_completo}
            />
          </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
            <LoadingButton
              aria-label="toggle password visibility"
              variant="contained"
              startIcon={<SearchIcon />}
              type="submit"
              style={{ marginRight: '10px' }}
              loading={is_search}
              disabled={is_search}
            >
              Buscar
            </LoadingButton>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              onClick={handle_click_open}
            >
              Búsqueda avanzada
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* Dialog para búsqueda avanzada */}
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="lg">
        <DialogContent>
          <Title title="Búsqueda avanzada" />
          <form
            onSubmit={(e) => {
              void on_submit_advance(e);
            }}
          >
            <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
              <Grid item xs={12} sm={6} md={3}>
                <CustomSelect
                  onChange={handle_change_select}
                  label="Tipo de documento *"
                  name="tipo_documento"
                  value={tipo_documento_av}
                  options={tipo_documento_opt}
                  disabled={is_loading}
                  errors={errors}
                  register={register}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="numero_documento"
                  control={control_form}
                  rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                  }) => (
                    <TextField
                      label="Número de documento *"
                      variant="outlined"
                      fullWidth
                      size="small"
                      onChange={onChange}
                      value={value}
                      // error={!!errors}
                      // helperText={
                      //   errors.numero_documento?.type === 'required'
                      //     ? 'Este campo es obligatorio'
                      //     : ''
                      // }
                    />
                  )}
                />
              </Grid>
              {tipo_documento_av !== 'NT' ? (
                <>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Primer nombre"
                      size="small"
                      {...register('primer_nombre')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Primer apellido"
                      size="small"
                      {...register('primer_apellido')}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Razón social"
                      size="small"
                      {...register('razon_social')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Nombre comercial"
                      size="small"
                      {...register('nombre_comercial')}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} container justifyContent="end">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  loading={is_search}
                  disabled={is_search}
                >
                  Buscar
                </LoadingButton>
              </Grid>
              {rows.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <Typography>Resultados de la búsqueda</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ height: 400, width: '100%' }}>
                      {tipo_documento_av === 'NT' ? (
                        <>
                          <DataGrid
                            rows={rows ?? []}
                            columns={columns_juridica ?? []}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            getRowId={(row) => row.id_persona}
                          />
                        </>
                      ) : (
                        <>
                          <DataGrid
                            rows={rows ?? []}
                            columns={columns ?? []}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            getRowId={(row) => row.id_persona}
                          />
                        </>
                      )}
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button color='error' variant="outlined" startIcon={<ClearIcon />} onClick={handle_close}>Salir</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
