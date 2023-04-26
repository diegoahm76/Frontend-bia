import {
  Grid,
  type SelectChangeEvent,
  Skeleton,
  IconButton,
  FormControl,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  CircularProgress,
  FormHelperText,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { CustomSelect } from './CustomSelect';
// import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { control_error } from '../helpers';
import {
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
import SearchIcon from '@mui/icons-material/Search';
import { Title } from './Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';

interface PropsBuscador {
  onResult: (data_persona: InfoPersona) => void;
}

const columns: GridColDef[] = [
  { field: 'id_persona', headerName: 'ID', sortable: true, width: 70 },
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
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BuscadorPersona: React.FC<PropsBuscador> = ({
  onResult,
}: PropsBuscador) => {
  const {
    register,
    handleSubmit: handle_submit,
    formState: { errors },
  } = useForm();
  const [is_loading, set_is_loading] = useState(false);
  const [is_search, set_is_search] = useState(false);
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [tipo_documento, set_tipo_documento] = useState('');
  const [tipo_documento_av, set_tipo_documento_av] = useState('');
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<InfoPersona[]>([
    {
      id: 1,
      id_persona: 1,
      tipo_persona: 'string',
      tipo_documento: 'string',
      numero_documento: 'string',
      primer_nombre: 'string',
      segundo_nombre: 'string',
      primer_apellido: 'string',
      segundo_apellido: 'string',
      nombre_completo: 'string',
      razon_social: 'string',
      nombre_comercial: 'string',
      tiene_usuario: false,
      digito_verificacion: "",
      cod_naturaleza_empresa: "",
    },
    {
      id: 2,
      id_persona: 2,
      tipo_persona: 'string',
      tipo_documento: 'string',
      numero_documento: 'string',
      primer_nombre: 'string',
      segundo_nombre: 'string',
      primer_apellido: 'string',
      segundo_apellido: 'string',
      nombre_completo: 'string',
      razon_social: 'string',
      nombre_comercial: 'string',
      tiene_usuario: false,
      digito_verificacion: "",
      cod_naturaleza_empresa: "",
    },
  ]);
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
      if (data?.id_persona !== undefined) {
        onResult(data);
      }
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
        } = await search_avanzada({
          tipo_documento,
          numero_documento,
          primer_nombre,
          primer_apellido,
          razon_social,
          nombre_comercial,
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
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomSelect
              onChange={handle_change_select}
              label="Tipo de documento *"
              name="tipo_documento"
              value={tipo_documento}
              options={tipo_documento_opt}
              loading={is_loading}
              disabled={is_loading}
              required={true}
              errors={errors}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {is_loading ? (
              <Skeleton variant="rectangular" width="100%" height={45} />
            ) : (
              <FormControl
                size="small"
                variant="outlined"
                fullWidth
                error={errors.numero_documento?.type === 'required'}
              >
                <InputLabel htmlFor="documento">
                  Número de documento *
                </InputLabel>
                <OutlinedInput
                  id="documento"
                  {...register('numero_documento', {
                    required: true,
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      {is_search ? (
                        <CircularProgress size={20} />
                      ) : (
                        <IconButton
                          aria-label="toggle password visibility"
                          type="submit"
                          edge="end"
                        >
                          <SearchIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  }
                  label="Número de documento *"
                />
                {errors.numero_documento?.type === 'required' && (
                  <FormHelperText id="documento">
                    Este campo es obligatorio
                  </FormHelperText>
                )}
              </FormControl>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2}
            container
            direction="column"
            justifyContent="center"
          >
            <Button
              variant="outlined"
              color="primary"
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
                  loading={is_loading}
                  disabled={is_loading}
                  required={true}
                  errors={errors}
                  register={register}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Número de documento *"
                  type="number"
                  size="small"
                  disabled={tipo_documento_av === '' ?? true}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  error={errors.numero_documento?.type === 'required'}
                  helperText={
                    errors.numero_documento?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  {...register('numero_documento', {
                    required: true,
                  })}
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
                  loading={is_search}
                  disabled={is_search}
                >
                  Buscar
                </LoadingButton>
              </Grid>
              <Grid item xs={12}>
                <Typography>Resultados de la búsqueda</Typography>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                  />
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handle_close}>Salir</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
