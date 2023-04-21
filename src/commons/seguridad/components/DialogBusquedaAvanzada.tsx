import { useDispatch, useSelector } from 'react-redux';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import {
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
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type SeguridadSlice } from '../interfaces';
import { get_users, get_persons } from '../store/thunks';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

interface FormValuesSearchPerson {
  typeDocument: string;
  numberDocument: number;
  firstName: string;
  lastName: string;
}

interface FormValuesSearchUser {
  nameUser: string;
}

const initial_state_search_person = {
  typeDocument: '',
  numberDocument: undefined,
  firstName: '',
  lastName: '',
};

const initial_state_search_user = {
  nameUser: '',
};

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

  const {
    register: register_search_person,
    handleSubmit: handle_submit_search_person,
  } = useForm<FormValuesSearchPerson>({
    defaultValues: initial_state_search_person,
  });
  const {
    register: register_search_user,
    handleSubmit: handle_submit_search_user,
  } = useForm<FormValuesSearchUser>({
    defaultValues: initial_state_search_user,
  });

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
          <IconButton
          // onClick={() => {
          //   dispatch(get_ccd_current(params.data));
          //   set_is_modal_active(false);
          // }}
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
          // onClick={() => {
          //   dispatch(get_ccd_current(params.data));
          //   set_is_modal_active(false);
          // }}
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
        data.typeDocument,
        data.numberDocument,
        data.firstName,
        data.lastName
      )
    );
  };

  const on_submit_search_user = (data: FormValuesSearchUser): void => {
    set_buscando_users(true);
    dispatch(get_users(data.nameUser));
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
                  <Typography className="label_selects">Buscar por </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Tipo de documento"
                    helperText="Tipo de documento"
                    size="small"
                    fullWidth
                    {...register_search_person('typeDocument', {
                      required: true,
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Número de documento"
                    helperText="Número de documento"
                    size="small"
                    fullWidth
                    {...register_search_person('numberDocument', {
                      required: true,
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    {...register_search_person('firstName')}
                    label="Primer nombre"
                    helperText="Primer nombre"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    {...register_search_person('lastName')}
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
                      Buscar por{' '}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      {...register_search_user('nameUser', { required: true })}
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
