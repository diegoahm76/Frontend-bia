import {
  Grid,
  type SelectChangeEvent,
  Skeleton,
  FormControl,
  OutlinedInput,
  InputLabel,
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
import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import type {
  IList,
  InfoPersona,
  ResponseServer,
} from '../../../../interfaces/globalModels';
import type { AxiosError } from 'axios';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { CustomSelect } from '../../../../components/CustomSelect';
import { control_error, control_success } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import {
  get_person_by_document,
  get_tipo_documento,
  search_avanzada,
} from '../../../../request';
import { showAlert } from '../../../../utils/showAlert/ShowAlert';

interface PropsBuscador {
  onResult: (data_persona: InfoPersona) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BuscadorPersona: React.FC<PropsBuscador> = ({
  onResult,
}: PropsBuscador) => {
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
    watch,
    formState: { errors },
  } = useForm();
  const [is_loading, set_is_loading] = useState(false);
  const [is_search, set_is_search] = useState(false);
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [tipo_documento, set_tipo_documento] = useState('');
  const [tipo_documento_av, set_tipo_documento_av] = useState('');
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<InfoPersona[]>([]);

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
        control_success('El número de documento ya esta registrado'); // Mensaje alerta persona existe
        onResult(data);
      } else {
        control_error('El número de documento no esta registrado'); // Mensaje alerta persona no existe
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
          tipo_usuario: '',
        };
        onResult(new_data);
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
      if (!tipo_documento || !numero_documento) {
        showAlert(
          'Ops!',
          'Debe ingresar el tipo y número de documento para realizar la búsqueda',
          'warning'
        );
        return;
      }

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
          <Grid item xs={12} sm={6} lg={3}>
            <CustomSelect
              onChange={handle_change_select}
              label="Tipo de documento *"
              name="tipo_documento"
              value={tipo_documento}
              options={tipo_documento_opt}
              disabled={is_loading}
              required={true}
              errors={errors}
              register={register}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
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
                  label="Número de documento *"
                  error={watch('numero_documento') === '1'}
                />
                {watch('numero_documento') === '1' && (
                  <Typography variant="caption" color="error">
                    No se permite el número 1 como número de documento
                  </Typography>
                )}
              </FormControl>
            )}
          </Grid>
          <Grid item xs={12} sm={6} lg={2}>
            <LoadingButton
              color="primary"
              aria-label="toggle password visibility"
              variant="contained"
              startIcon={<SearchIcon />}
              type="submit"
              style={{ marginRight: '10px' }}
              loading={is_search}
              disabled={is_search}
            >
              Buscar
            </LoadingButton>{' '}
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
                            rows={rows}
                            columns={columns_juridica}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            getRowId={(row) => row.id_persona}
                          />
                        </>
                      ) : (
                        <>
                          <DataGrid
                            rows={rows}
                            columns={columns}
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
          <Button
            color="error"
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={handle_close}
          >
            Salir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
