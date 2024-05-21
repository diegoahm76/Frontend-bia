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
  MenuItem,
} from '@mui/material';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import AddIcon from '@mui/icons-material/Add';
import CleanIcon from '@mui/icons-material/CleaningServices';
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
      headerName: 'Tipo de Usuario',
      sortable: true,
      width: 170,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 80,
      renderCell: (params) => (
        <>
          <IconButton aria-label="Seleccionar Persona">
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <AddIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                onClick={() => {
                  if (params.row !== undefined) {
                    handle_close();
                    onResult(params.row);
                    set_tipo_documento(params.row.tipo_documento);
                    set_data_form(params.row);
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
      headerName: 'Tipo de Usuario',
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
              <AddIcon
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
  const [form_search, set_form_search] = useState({
    tipo_documento: '',
    numero_documento: '',
    primer_nombre: '',
    primer_apellido: '',
    razon_social: '',
    nombre_comercial: '',
    nombre_completo: '',
  });
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<InfoPersona[]>([]);

  const set_data_form = (data: InfoPersona): void => {
    set_form_search({
      tipo_documento: data.tipo_documento,
      numero_documento: data.numero_documento,
      primer_nombre: data?.primer_nombre,
      primer_apellido: data?.primer_apellido,
      razon_social: data?.razon_social,
      nombre_comercial: data?.nombre_comercial,
      nombre_completo: (data?.primer_nombre || data?.razon_social || data?.nombre_comercial || '') + ' ' + (data?.primer_apellido || ''),
    });
  }

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const clean_form = (): void => {
    set_form_search({
      tipo_documento: '',
      numero_documento: '',
      primer_nombre: '',
      primer_apellido: '',
      razon_social: '',
      nombre_comercial: '',
      nombre_completo: '',
    });
  }

  const handle_close = (): void => {
    set_open_dialog(false);
  };

  const handle_change_select = (e: any) => {
    set_tipo_documento(e.target.value);
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
      >
        <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size='small'
              fullWidth
              label="Tipo de documento"
              name="tipo_documento"
              value={form_search.tipo_documento}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size="small"
              fullWidth
              label="Número de documento"
              name='numero_documento'
              value={form_search.numero_documento}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size="small"
              fullWidth
              label="Nombre"
              name='nombre_completo'
              disabled
              multiline
              value={form_search.nombre_completo}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              type="submit"
              onClick={handle_click_open}
            >
              Buscar
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
                <TextField
                  select
                  size='small'
                  fullWidth
                  label="Tipo de documento"
                  name="tipo_documento"
                  value={tipo_documento}
                  onChange={handle_change_select}
                  helperText={"Elije el tipo de documento"}
                >
                  <MenuItem value=""><em>Selecciona una opción</em></MenuItem>
                  {tipo_documento_opt.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}

                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Número de documento"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={form_search.numero_documento}
                    // onchange={onChange}
                  />
              </Grid>
              {tipo_documento !== 'NT' ? (
                <>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Primer nombre"
                      size="small"
                      value={form_search.primer_nombre}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Primer apellido"
                      size="small"
                      value={form_search.primer_apellido}
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
                      value={form_search.razon_social || form_search.primer_nombre || ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Nombre comercial"
                      size="small"
                      value={form_search.nombre_comercial || form_search.primer_nombre || ''}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} container sx={{gap: '1rem'}} justifyContent="end">
                <Button
                  variant="outlined"
                  type="submit"
                  startIcon={<CleanIcon />}
                  onClick={clean_form}
                >
                  Limpiar
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  loading={is_search}
                  disabled={is_search || tipo_documento === ''}
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
                      {tipo_documento === 'NT' ? (
                        <>
                          <DataGrid
                            autoHeight
                            density='compact'
                            rows={rows ?? []}
                            columns={columns_juridica ?? []}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
                            getRowId={(row) => row.id_persona}
                          />
                        </>
                      ) : (
                        <>
                          <DataGrid
                            autoHeight
                            density='compact'
                            rows={rows ?? []}
                            columns={columns ?? []}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
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
