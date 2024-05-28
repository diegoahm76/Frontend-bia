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
  setPersons: (data: InfoPersona[]) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BuscadorPersona2: React.FC<PropsBuscador> = ({
  onResult,
  setPersons,
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
                    set_data_form(params.row);
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
                  }
                }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  const [is_search, set_is_search] = useState(false);
  const [options_doc_type, set_options_doc_type] = useState<IList[]>([]);
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
  const [local_ids_persons, set_local_ids_persons] = useState<number[]>([]);

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
    set_form_search({
      ...form_search,
      tipo_documento: e.target.value,
    });
  };

  const get_selects_options = async (): Promise<void> => {
    try {
      const {
        data: { data: res_tipo_documento },
      } = await get_tipo_documento();
      set_options_doc_type(res_tipo_documento ?? []);
    } catch (err) {
      control_error(err);
    }
  };

  const on_submit_advance = async () => {
    set_is_search(true);
    try {
      set_rows([]);
      const {
        data: { data },
      } = await get_bandeja_tareas(
        form_search.tipo_documento,
        form_search.numero_documento,
        form_search.primer_nombre,
        form_search.primer_apellido,
        form_search.razon_social,
        form_search.nombre_comercial
      );

      if (data?.length > 0) {
        set_rows(data);
      }else{
        control_error('No se encontraron resultados');
      }
    } catch (error) {
      const temp_error = error as AxiosError;
      const resp = temp_error.response?.data as ResponseServer<any>;
      control_error(resp.detail);
    } finally {
      set_is_search(false);
    }
  }

  const handle_selection = (newSelection: any) => {
    set_local_ids_persons(newSelection);
  };

  const handle_change_number = (e: any) => {
    set_form_search({
      ...form_search,
      numero_documento: e.target.value,
    });
  };

  const handle_change_firstname = (e: any) => {
    set_form_search({
      ...form_search,
      primer_nombre: e.target.value,
    });
  };

  const handle_change_lastname = (e: any) => {
    set_form_search({
      ...form_search,
      primer_apellido: e.target.value,
    });
  };

  const handle_change_razon_social = (e: any) => {
    set_form_search({
      ...form_search,
      razon_social: e.target.value,
    });
  };

  const handle_change_nombre_comercial = (e: any) => {
    set_form_search({
      ...form_search,
      nombre_comercial: e.target.value,
    });
  };

  const send_persons = () => {
    const persons = rows.filter((row) => local_ids_persons.includes(row.id_persona));
    setPersons(persons);
    handle_close();
  }

  useEffect(() => {
    void get_selects_options();
  }, []);

  return (
    <>
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
      {/* Dialog para búsqueda avanzada */}
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="lg">
        <DialogContent>
          <Title title="Búsqueda avanzada" />
            <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  size='small'
                  fullWidth
                  label="Tipo de documento"
                  name="tipo_documento"
                  value={form_search.tipo_documento}
                  onChange={handle_change_select}
                  helperText={"Elije el tipo de documento"}
                >
                  <MenuItem value=""><em>Selecciona una opción</em></MenuItem>
                  {options_doc_type.map((item) => (
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
                    onChange={handle_change_number}
                  />
              </Grid>
              {form_search.tipo_documento !== 'NT' ? (
                <>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Primer nombre"
                      size="small"
                      value={form_search.primer_nombre || ''}
                      onChange={handle_change_firstname}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Primer apellido"
                      size="small"
                      value={form_search.primer_apellido || ''}
                      onChange={handle_change_lastname}
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
                      value={form_search.razon_social || ''}
                      onChange={handle_change_razon_social}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Nombre comercial"
                      size="small"
                      value={form_search.nombre_comercial || ''}
                      onChange={handle_change_nombre_comercial}
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
                  disabled={is_search}
                  onClick={on_submit_advance}
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
                      <DataGrid
                        autoHeight
                        checkboxSelection
                        density='compact'
                        rows={rows ?? []}
                        columns={(form_search.tipo_documento === 'NT' ? columns_juridica : columns) ?? []}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        getRowId={(row) => row.id_persona}
                        onSelectionModelChange={handle_selection}
                      />
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button color='primary' variant="contained" disabled={!local_ids_persons.length} sx={{m: '1rem'}} startIcon={<AddIcon />} onClick={send_persons}>Agregar Personas</Button>
          <Button color='error' variant="outlined" sx={{m: '1rem'}} startIcon={<ClearIcon />} onClick={handle_close}>Salir</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
