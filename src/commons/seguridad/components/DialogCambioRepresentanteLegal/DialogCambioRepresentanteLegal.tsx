import {
  Grid,
  type SelectChangeEvent,
  IconButton,
  CircularProgress,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Avatar,
} from '@mui/material';
import { useState, useEffect } from 'react';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import type { AxiosError } from 'axios';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import type {
  DataPersonas,
  IList,
  InfoPersona,
  ResponseServer,
} from '../../../../interfaces/globalModels';
import { get_tipo_documento, search_avanzada } from '../../../../request';
import { control_error } from '../../../../helpers';
import { CustomSelect, Title } from '../../../../components';
import { consultar_datos_persona } from '../../../seguridad/request/Request';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface PropsBuscador {
  onResult: (data_representante_detalle: DataPersonas) => void;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DialogRepresentanteLegal: React.FC<PropsBuscador> = ({
  onResult,
}: PropsBuscador) => {
  const columns: GridColDef[] = [
    { field: 'id_persona', headerName: 'ID', sortable: true, width: 70 },
    {
      field: 'tipo_persona',
      headerName: 'TIPO PERSONA',
      sortable: true,
      width: 140,
    },
    {
      field: 'tipo_documento',
      headerName: 'TIPO DOCUMENTO',
      sortable: true,
      width: 140,
    },
    {
      field: 'numero_documento',
      headerName: 'NÚMERO DOCUMENTO',
      sortable: true,
      width: 140,
    },
    {
      field: 'primer_nombre',
      headerName: 'PRIMER NOMBRE',
      sortable: true,
      width: 140,
    },
    {
      field: 'segundo_nombre',
      headerName: 'SEGUNDO NOMBRE',
      sortable: true,
      width: 140,
    },
    {
      field: 'primer_apellido',
      headerName: 'PRIMER APELLIDO',
      sortable: true,
      width: 140,
    },
    {
      field: 'segundo_apellido',
      headerName: 'SEGUNDO APELLIDO',
      sortable: true,
      width: 140,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 80,
      renderCell: (params) => (
        <>
          <IconButton>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <PersonAddOutlinedIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                onClick={() => {
                  if (params?.row !== undefined) {
                    void get_datos_representante_legal(params.row);
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
    formState: { errors },
  } = useForm();
  const [is_loading, set_is_loading] = useState(false);
  const [is_search, set_is_search] = useState(false);
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
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
    set_tipo_documento_av(e.target.value);
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
  // trae datos del representante legal
  const get_datos_representante_legal = async (
    data: InfoPersona
  ): Promise<void> => {
    try {
      const {
        data: { data: response },
      } = await consultar_datos_persona(data.id_persona);
      onResult(response);
      handle_close();
    } catch (err) {
      control_error(err);
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
        } = await search_avanzada({
          tipo_documento,
          numero_documento: numero_documento ?? '',
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
      <Button
        variant="contained"
        color="success"
        startIcon={<EditIcon />}
        onClick={handle_click_open}
      >
        Cambiar
      </Button>

      {/* Dialog para búsqueda avanzada */}
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="lg">
        <DialogContent>
          <Title title="SELECCIÓN REPRESENTANTE LEGAL" />
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
                  {...register('numero_documento', {})}
                />
              </Grid>
              {tipo_documento_av !== 'NT' && (
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
              {rows.length > 0 ? (
                <>
                  <Grid item xs={12}>
                    <Typography>Resultados de la búsqueda</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ height: 400, width: '100%' }}>

                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        getRowId={(row) => row.id_persona}
                        rowsPerPageOptions={[5]}
                      />
                    </Box>
                  </Grid>
                </>
              ) : (
                <CircularProgress color="secondary" />
              )}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button color='error' variant="outlined" startIcon={<ClearIcon />} onClick={handle_close}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
