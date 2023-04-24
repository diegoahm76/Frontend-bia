import { useDispatch, useSelector } from 'react-redux';
import { useState, type Dispatch, type SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Skeleton,
  Grid,
  TextField,
  Dialog,
  // DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  // Stack,
  Button,
  Box,
  Divider,
  Avatar,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type {
  SeguridadSlice,
  FormValuesSearchPerson,
  FormValuesSearchUser,
  // keys_object_search_user,
  keys_object_search_person,
} from '../interfaces';
import { get_users, get_persons, get_data_user } from '../store/thunks';
import { set_action_admin_users } from '../store/seguridadSlice';
import { CustomSelect } from '../../../components/CustomSelect';
import { use_busqueda_avanzada } from '../hooks/BusquedaAvanzadaHooks';
import { use_admin_users } from '../hooks/AdminUserHooks';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogBusquedaAvanzada = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const dispatch = useDispatch();
  const { users, persons } = useSelector(
    (state: SeguridadSlice) => state.seguridad
  );
  const [buscar_por, set_buscar_por] = useState<string>('U');
  const [buscando_persons, set_buscando_persons] = useState<boolean>(false);
  const [buscando_users, set_buscando_users] = useState<boolean>(false);
  // const [action_person, set_action_person] = useState<string>('');
  const {
    // data_search_user,
    data_search_person,
    // is_search,
    loading,
    tipo_documento_opt,
    tipo_documento,
    tipo_persona_opt,
    tipo_persona,
    // has_user,
    // set_data_search_user,
    set_data_search_person,
    set_numero_documento,
    set_tipo_documento,
    set_tipo_persona,
  } = use_busqueda_avanzada();
  const { set_tipo_persona: set_tipo_personas_a } = use_admin_users();
  const {
    register: register_search_person,
    handleSubmit: handle_submit_search_person,
    setValue: set_value_search_person,
    formState: { errors: errors_search_person },
    watch: watch_search_person,
  } = useForm<FormValuesSearchPerson>();

  const {
    register: register_search_user,
    handleSubmit: handle_submit_search_user,
    // formState: { errors: errors_search_user },
    // watch: watch_search_user,
  } = useForm<FormValuesSearchUser>();

  const numero_documento = watch_search_person('numero_documento');

  // Consultamos si el usuario existe
  useEffect(() => {
    if (numero_documento !== undefined && numero_documento !== '') {
      set_numero_documento(numero_documento);
    }
  }, [numero_documento]);

  useEffect(() => {
    if (watch_search_person('tipo_persona') !== undefined) {
      set_tipo_persona(watch_search_person('tipo_persona'));
    }
  }, [watch_search_person('tipo_persona')]);

  useEffect(() => {
    if (watch_search_person('tipo_documento') !== undefined) {
      set_tipo_documento(watch_search_person('tipo_documento'));
    }
  }, [watch_search_person('tipo_documento')]);

  useEffect(() => {
    if (tipo_persona === 'J') {
      set_value_search_person('tipo_documento', 'NT');
      set_tipo_documento('NT');
    } else {
      set_tipo_documento('');
    }
  }, [tipo_persona]);

  const columns_persons: GridColDef[] = [
    {
      headerName: 'ID persona',
      field: 'id_persona',
    },
    {
      headerName: 'Tipo persona',
      field: 'tipo_persona',
    },
    {
      headerName: 'Nombre completo',
      field: 'nombre_completo',
    },
    {
      headerName: 'Razon social',
      field: 'razon_social',
    },
    {
      headerName: 'Nombre comercial',
      field: 'nombre_comercial',
    },
    {
      headerName: 'Usuario',
      field: 'tiene_usuario',
    },

    {
      headerName: 'Tipo documento',
      field: 'tipo_documento',
    },
    {
      headerName: 'Numero documento',
      field: 'numero_documento',
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          {params.row.tiene_usuario === true ? (
            <IconButton
              onClick={() => {
                trigger_user_person_edit_active(params.row);
                set_is_modal_active(false);
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
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                trigger_user_person_create_active(params.row);
                set_is_modal_active(false);
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
                <AddIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          )}
        </>
      ),
    },
  ];

  const columns_users: GridColDef[] = [
    {
      headerName: 'ID usuario',
      field: 'id_usuario',
    },
    {
      headerName: 'ID persona',
      field: 'persona',
    },
    {
      headerName: 'Tipo de persona',
      field: 'tipo_persona',
    },
    {
      headerName: 'Nombre completo',
      field: 'nombre_completo',
    },
    {
      headerName: 'Nombre comercial',
      field: 'nombre_comercial',
    },
    {
      headerName: 'Nombre de usuario',
      field: 'nombre_de_usuario',
    },
    {
      headerName: 'Super usuario',
      field: 'is_superuser',
    },
    {
      headerName: 'Razón social',
      field: 'razon_social',
    },

    {
      headerName: 'Acciones',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => {
              trigger_user_edit_active(params.row);
              set_is_modal_active(false);
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
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  const trigger_user_person_create_active = (data: any): void => {
    console.log(data);
    set_tipo_personas_a(data.tipo_persona);
    dispatch(set_action_admin_users('CREATE'));
  };

  const trigger_user_person_edit_active = (data: any): void => {
    console.log(data);
    get_data_user(data.id_persona);
    set_tipo_personas_a(data.tipo_persona);
    dispatch(set_action_admin_users('EDIT'));
  };

  const trigger_user_edit_active = (data: any): void => {
    console.log(data);
    get_data_user(data.id_usuario);
    set_tipo_personas_a(data.tipo_persona);
    dispatch(set_action_admin_users('EDIT'));
  };

  const handle_close_busqueda_avanzada = (): void => {
    set_is_modal_active(false);
  };

  const handle_buscar_por = (event: SelectChangeEvent<string>): void => {
    set_buscar_por(event.target.value);
  };

  const on_submit_search_person = (data: FormValuesSearchPerson): void => {
    set_buscando_persons(true);
    dispatch(
      get_persons(
        data.tipo_documento,
        data.numero_documento,
        data.primer_nombre,
        data.primer_apellido
      )
    );
  };

  const on_submit_search_user = (data: FormValuesSearchUser): void => {
    set_buscando_users(true);
    dispatch(get_users(data.nombre_usuario));
  };

  // Establece los valores del formulario
  const set_value_form_search_person = (name: string, value: string): void => {
    set_data_search_person({
      ...data_search_person,
      [name]: value,
    });
    set_value_search_person(name as keys_object_search_person, value);
  };

  // Se usa para escuchar los cambios de valor del componente CustomSelect
  const on_change = (e: SelectChangeEvent<string>): void => {
    // console.log(e);
    set_value_form_search_person(e.target.name, e.target.value);
  };

  return (
    <Dialog
      maxWidth="sm"
      open={is_modal_active}
      onClose={handle_close_busqueda_avanzada}
    >
      <DialogTitle>
        Busqueda avanzada por {buscar_por === 'U' ? 'Usuario' : 'Persona'}
        <IconButton
          aria-label="close"
          onClick={() => {
            set_is_modal_active(false);
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: '0px' }}>
        {buscar_por === 'P' ? (
          <>
            <Box
              component="form"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handle_submit_search_person(on_submit_search_person)}
              autoComplete="off"
            >
              <Grid container sx={{ mb: '0px' }} spacing={2}>
                <Grid item xs={12} sm={3}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  ) : (
                    <>
                      <Select
                        size="small"
                        label="Seleccionar"
                        value={buscar_por}
                        onChange={handle_buscar_por}
                        fullWidth
                      >
                        <MenuItem value="U">Usuario</MenuItem>
                        <MenuItem value="P">Persona</MenuItem>
                      </Select>
                      <Typography className="label_selects">
                        Buscar por{' '}
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <CustomSelect
                    onChange={on_change}
                    label="Tipo de persona *"
                    name="tipo_persona"
                    value={tipo_persona}
                    options={tipo_persona_opt}
                    loading={loading}
                    disabled={false}
                    required={true}
                    errors={errors_search_person}
                    register={register_search_person}
                  />
                  <Typography className="label_selects">
                    Tipo de persona
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <CustomSelect
                    onChange={on_change}
                    label="Tipo de documento *"
                    name="tipo_documento"
                    value={tipo_documento}
                    options={tipo_documento_opt}
                    loading={loading}
                    disabled={
                      (tipo_persona === '' || tipo_persona === 'J') ?? true
                    }
                    required={true}
                    errors={errors_search_person}
                    register={register_search_person}
                  />
                  <Typography className="label_selects">
                    Tipo de documento
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Número de documento"
                    helperText="Número de documento"
                    size="small"
                    fullWidth
                    {...register_search_person('numero_documento')}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    {...register_search_person('primer_nombre')}
                    label="Primer nombre"
                    helperText="Primer nombre"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    {...register_search_person('primer_apellido')}
                    label="Primer apellido"
                    size="small"
                    helperText="Primer apellido"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    type="submit"
                    variant="outlined"
                    startIcon={<SearchIcon />}
                    fullWidth
                  >
                    BUSCAR
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {buscando_persons && (
              <Grid item xs={12}>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={persons}
                  columns={columns_persons}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => row.id_persona}
                />
              </Grid>
            )}
          </>
        ) : (
          buscar_por === 'U' && (
            <>
              <Box
                component="form"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handle_submit_search_user(on_submit_search_user)}
                autoComplete="off"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Select
                      size="small"
                      label="Seleccionar"
                      value={buscar_por}
                      onChange={handle_buscar_por}
                      fullWidth
                    >
                      <MenuItem value="U">Usuario</MenuItem>
                      <MenuItem value="P">Persona</MenuItem>
                    </Select>
                    <Typography className="label_selects">
                      Buscar por
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      {...register_search_user('nombre_usuario', {
                        required: true,
                      })}
                      required
                      label="Nombre de usuario"
                      size="small"
                      helperText="Nombre de usuario"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    {''}
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      type="submit"
                      variant="outlined"
                      startIcon={<SearchIcon />}
                      fullWidth
                    >
                      BUSCAR
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              {buscando_users && (
                <Grid item xs={12}>
                  <DataGrid
                    density="compact"
                    autoHeight
                    rows={users}
                    columns={columns_users}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.id_usuario}
                  />
                </Grid>
              )}
            </>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogBusquedaAvanzada;
