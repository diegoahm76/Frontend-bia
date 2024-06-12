/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Grid,
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
import AddIcon from '@mui/icons-material/Add';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { useState, useEffect } from 'react';
// import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import type { AxiosError } from 'axios';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { IList, InfoPersona, ResponseServer } from '../../../../interfaces/globalModels';
import { get_bandeja_tareas, get_tipo_documento } from '../../../../request';
import { control_error } from '../../../../helpers';
import { Title } from '../../../../components';

interface PropsBuscador {
  onResult: (data_persona: InfoPersona, param: string) => void;
  set_clear_persons: (bool: boolean) => void;
  seleccion_tablero_control: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BuscadorPersonasReports: React.FC<PropsBuscador> = ({
  onResult,
  set_clear_persons,
  seleccion_tablero_control,
}: PropsBuscador) => {

  const [form_search, set_form_search] = useState<any>({
    persona_tipo_documento: '',
    tipo_documento: '',
    numero_documento: '',
    primer_nombre: '',
    primer_apellido: '',
    razon_social: '',
    nombre_comercial: '',
    nombre_completo: '',
  });

  const [form_search_r, set_form_search_r] = useState<any>({
    tipo_documento_r: '',
    numero_documento_r: '',
    nombre_completo_r: '',
  });

  const [form_search_s, set_form_search_s] = useState<any>({
    tipo_documento_s: '',
    numero_documento_s: '',
    nombre_completo_s: '',
  });

  const [form_search_d, set_form_search_d] = useState<any>({
    tipo_documento_d: '',
    numero_documento_d: '',
    nombre_completo_d: '',
  });

  const [form_search_a, set_form_search_a] = useState<any>({
    tipo_documento_a: '',
    numero_documento_a: '',
    nombre_completo_a: '',
  });

  const [form_search_o, set_form_search_o] = useState<any>({
    tipo_documento_o: '',
    numero_documento_o: '',
    nombre_completo_o: '',
  });
  const [form_search_p, set_form_search_p] = useState<any>({
    tipo_documento_p: '',
    numero_documento_p: '',
    nombre_completo_p: '',
  });
  const [is_search, set_is_search] = useState(false);
  const [options_doc_type, set_options_doc_type] = useState<IList[]>([]);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<InfoPersona[]>([]);
  const [local_ids_persons, set_local_ids_persons] = useState<number[]>([]);

  const personas = [
    ...(seleccion_tablero_control !== 'MP' ? [{ value: 'R', label: 'Responsable' }] : []),
    ...(seleccion_tablero_control !== 'CS' && seleccion_tablero_control !== 'EI' ? [{ value: 'S', label: 'Solicita' }] : []),
    ...(seleccion_tablero_control !== 'MP' && seleccion_tablero_control !== 'CS' && seleccion_tablero_control !== 'EI' ? [{ value: 'D', label: 'Despacha' }] : []),
    ...(seleccion_tablero_control !== 'CS' && seleccion_tablero_control !== 'EI' ? [{ value: 'A', label: 'Anula' }] : []),
    ...(seleccion_tablero_control === 'CS' ? [{ value: 'O', label: 'Origen' }] : []),
    ...(seleccion_tablero_control === 'EI' ? [{ value: 'P', label: 'Proveedor' }] : []),
  ]

  const columns: GridColDef[] = [
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
    ...(form_search.tipo_documento !== 'NT' ? [
      {
        field: 'primer_nombre',
        headerName: 'NOMBRES',
        sortable: true,
        width: 170,
        valueGetter: (params: any) => {
          const nombre = (params.row.tipo_documento === 'NT') ? 'NA' : `${params.row.primer_nombre || ''} ${params.row.segundo_nombre || ''}`;
          return nombre;
        },
      },
      {
        field: 'primer_apellido',
        headerName: 'APELLIDOS',
        sortable: true,
        width: 170,
        valueGetter: (params: any) => {
          const apellido = (params.row.tipo_documento === 'NT') ? 'NA' : `${params.row.primer_apellido || ''} ${params.row.segundo_apellido || ''}`;
          return apellido;
        },
      }
    ] : []),
    ...(form_search.tipo_documento == 'NT' || form_search.tipo_documento == '' ? [
      {
        field: 'razon_social',
        headerName: 'RAZÓN SOCIAL',
        sortable: true,
        width: 170,
        valueGetter: (params: any) => {
          const razon = (params.row.tipo_documento !== 'NT') ? 'NA' : `${params.row.razon_social || ''}`;
          return razon;
        },
      },
      {
        field: 'nombre_comercial',
        headerName: 'NOMBRE COMERCIAL',
        sortable: true,
        width: 170,
        valueGetter: (params: any) => {
          const nombre_comercial = (params.row.tipo_documento !== 'NT') ? 'NA' : `${params.row.nombre_comercial || ''}`;
          return nombre_comercial;
        },
      }] : []),
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
                    set_data_form(params.row);
                    onResult(params.row, form_search.persona_tipo_documento);
                  }
                }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  const set_data_form = (data: InfoPersona): void => {
    console.log(data)
    switch(form_search.persona_tipo_documento){
      case 'R':
        set_form_search_r({
          ...form_search_r,
          tipo_documento_r: data.tipo_documento,
          numero_documento_r: data.numero_documento,
          nombre_completo_r: (data?.primer_nombre || data?.razon_social || data?.nombre_comercial || '') + ' ' + (data?.primer_apellido || ''),
        });
        break;
      case 'S':
        set_form_search_s({
          ...form_search_s,
          tipo_documento_s: data.tipo_documento,
          numero_documento_s: data.numero_documento,
          nombre_completo_s: (data?.primer_nombre || data?.razon_social || data?.nombre_comercial || '') + ' ' + (data?.primer_apellido || ''),
        });
        break;
      case 'D':
        set_form_search_d({
          ...form_search_d,
          tipo_documento_d: data.tipo_documento,
          numero_documento_d: data.numero_documento,
          nombre_completo_d: (data?.primer_nombre || data?.razon_social || data?.nombre_comercial || '') + ' ' + (data?.primer_apellido || ''),
        });
        break;
      case 'A':
        set_form_search_a({
          ...form_search_a,
          tipo_documento_a: data.tipo_documento,
          numero_documento_a: data.numero_documento,
          nombre_completo_a: (data?.primer_nombre || data?.razon_social || data?.nombre_comercial || '') + ' ' + (data?.primer_apellido || ''),
        });
        break;
    }
    // set_form_search({
    //   ...form_search,
    //   persona_tipo_documento: data.persona_tipo_documento!,
    //   tipo_documento: data.tipo_documento,
    //   numero_documento: data.numero_documento,
    //   primer_nombre: data?.primer_nombre,
    //   primer_apellido: data?.primer_apellido,
    //   razon_social: data?.razon_social,
    //   nombre_comercial: data?.nombre_comercial,
    //   nombre_completo: (data?.primer_nombre || data?.razon_social || data?.nombre_comercial || '') + ' ' + (data?.primer_apellido || ''),
    // });
  }

  const handle_click_open = (): void => {
    clean_form();
    set_open_dialog(true);
  };

  const clean_form = (): void => {
    set_form_search({
      persona_tipo_documento: '',
      tipo_documento: '',
      numero_documento: '',
      primer_nombre: '',
      primer_apellido: '',
      razon_social: '',
      nombre_comercial: '',
      nombre_completo: '',
    });
  }

  const clean_all = (): void => {
    clean_form();
    set_form_search_r({
      tipo_documento_r: '',
      numero_documento_r: '',
      nombre_completo_r: '',
    });
    set_form_search_s({
      tipo_documento_s: '',
      numero_documento_s: '',
      nombre_completo_s: '',
    });
    set_form_search_d({
      tipo_documento_d: '',
      numero_documento_d: '',
      nombre_completo_d: '',
    });
    set_form_search_a({
      tipo_documento_a: '',
      numero_documento_a: '',
      nombre_completo_a: '',
    });
    set_form_search_o({
      tipo_documento_o: '',
      numero_documento_o: '',
      nombre_completo_o: '',
    });
    set_form_search_p({
      tipo_documento_p: '',
      numero_documento_p: '',
      nombre_completo_p: '',
    });
    set_clear_persons(true);
  }

  const handle_close = (): void => {
    clean_form();
    set_rows([]);
    set_open_dialog(false);
  };

  const handle_change_persona = (e: any) => {
    set_form_search({
      ...form_search,
      persona_tipo_documento: e.target.value,
    });
  }

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
        const new_data: any = data.map(item => ({
          ...item,
          require_firma: false
        }));
        set_rows(new_data);
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
    handle_close();
  }

  useEffect(() => {
    void get_selects_options();
    clean_all();
  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ mt: '10px', mb: '20px', mx: '1px' }}>
        {(seleccion_tablero_control === 'CBU' || seleccion_tablero_control === 'CS' || seleccion_tablero_control === 'EI') && <Grid container spacing={2} sx={{display: 'flex', margin: 'auto', justifyContent: 'center'}}>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size='small'
              fullWidth
              label="Tipo de documento responsable"
              name="tipo_documento_r"
              value={form_search_r.tipo_documento_r}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size="small"
              fullWidth
              label="Número de documento responsable"
              name='numero_documento_r'
              value={form_search_r.numero_documento_r}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size="small"
              fullWidth
              label="Nombre responsable"
              name='nombre_completo_r'
              disabled
              multiline
              value={form_search_r.nombre_completo_r}
            />
          </Grid>
        </Grid>}

        {seleccion_tablero_control !== 'CS' && seleccion_tablero_control !== 'EI' && <Grid container spacing={2} sx={{display: 'flex', margin: 'auto', justifyContent: 'center'}}>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size='small'
              fullWidth
              label="Tipo de documento solicita"
              name="tipo_documento_s"
              value={form_search_s.tipo_documento_s}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size="small"
              fullWidth
              label="Número de documento solicita"
              name='numero_documento_s'
              value={form_search_s.numero_documento_s}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size="small"
              fullWidth
              label="Nombre solicita"
              name='nombre_completo_s'
              disabled
              multiline
              value={form_search_s.nombre_completo_s}
            />
          </Grid>
        </Grid>}

        {seleccion_tablero_control !== 'MP' && seleccion_tablero_control !== 'CS' && seleccion_tablero_control !== 'EI' && <Grid container spacing={2} sx={{display: 'flex', margin: 'auto', justifyContent: 'center'}}>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size='small'
              fullWidth
              label="Tipo de documento despacha"
              name="tipo_documento_d"
              value={form_search_d.tipo_documento_d}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size="small"
              fullWidth
              label="Número de documento despacha"
              name='numero_documento_d'
              value={form_search_d.numero_documento_d}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size="small"
              fullWidth
              label="Nombre despacha"
              name='nombre_completo_d'
              disabled
              multiline
              value={form_search_d.nombre_completo_d}
            />
          </Grid>
        </Grid>}

        {seleccion_tablero_control !== 'CS' && seleccion_tablero_control !== 'EI' && <Grid container spacing={2} sx={{display: 'flex', margin: 'auto', justifyContent: 'center'}}>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size='small'
              fullWidth
              label="Tipo de documento anula"
              name="tipo_documento_a"
              value={form_search_a.tipo_documento_a}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size="small"
              fullWidth
              label="Número de documento anula"
              name='numero_documento_a'
              value={form_search_a.numero_documento_a}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size="small"
              fullWidth
              label="Nombre anula"
              name='nombre_completo_a'
              disabled
              multiline
              value={form_search_a.nombre_completo_a}
            />
          </Grid>
        </Grid>}
        {seleccion_tablero_control === 'CS' && <Grid container spacing={2} sx={{display: 'flex', margin: 'auto', justifyContent: 'center'}}>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size='small'
              fullWidth
              label="Tipo de documento origen"
              name="tipo_documento_o"
              value={form_search_o.tipo_documento_o}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size="small"
              fullWidth
              label="Número de documento origen"
              name='numero_documento_o'
              value={form_search_o.numero_documento_o}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size="small"
              fullWidth
              label="Nombre origen"
              name='nombre_completo_o'
              disabled
              multiline
              value={form_search_o.nombre_completo_o}
            />
          </Grid>
        </Grid>}
        {seleccion_tablero_control === 'EI' && <Grid container spacing={2} sx={{display: 'flex', margin: 'auto', justifyContent: 'center'}}>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size='small'
              fullWidth
              label="Tipo de documento proveedor"
              name="tipo_documento_p"
              value={form_search_p.tipo_documento_p}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size="small"
              fullWidth
              label="Número de documento proveedor"
              name='numero_documento_p'
              value={form_search_p.numero_documento_p}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              size="small"
              fullWidth
              label="Nombre proveedor"
              name='nombre_completo_p'
              disabled
              multiline
              value={form_search_p.nombre_completo_p}
            />
          </Grid>
        </Grid>}

        <Grid container spacing={2} sx={{display: 'flex', margin: 'auto', justifyContent: 'center'}}>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              type="submit"
              onClick={handle_click_open}
            >
              Busqueda Avanzada
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<CleanIcon />}
              onClick={clean_all}
            >
              Limpiar Personas
            </Button>
          </Grid>
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
                  label="Persona"
                  name="persona_tipo_documento"
                  required
                  value={form_search.persona_tipo_documento || ''}
                  onChange={handle_change_persona}
                  helperText={"Elije el tipo de persona que deseas buscar"}
                >
                  <MenuItem value=""><em>Selecciona una opción</em></MenuItem>
                  {personas.map((person) => (
                    <MenuItem key={person.value} value={person.value}>
                      {person.label}
                    </MenuItem>
                  ))}

                </TextField>
              </Grid>
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
                  disabled={is_search || form_search.persona_tipo_documento == ''}
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
                        density='compact'
                        rows={rows ?? []}
                        columns={columns ?? []}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        getRowId={(row) => row.id_persona}
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
