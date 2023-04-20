import { useDispatch, useSelector } from 'react-redux';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
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
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
      minWidth: 200,
    },
    {
      headerName: 'Tipo persona',
      field: 'tipo_persona',
      minWidth: 150,
    },
    {
      headerName: 'Tipo documento',
      field: 'tipo_documento',
      minWidth: 100,
    },
    {
      headerName: 'Numero documento',
      field: 'numero_documento',
      minWidth: 100,
    },
    {
      headerName: 'Primer nombre',
      field: 'primer_nombre',
      minWidth: 100,
    },
    {
      headerName: 'Segundo nombre',
      field: 'segundo_nombre',
      minWidth: 100,
    },
    {
      headerName: 'Primer apellido',
      field: 'primer_apellido',
      minWidth: 100,
    },
    {
      headerName: 'Segundo apellido',
      field: 'segundo_apellido',
      minWidth: 100,
    },
    {
      headerName: 'Nombre completo',
      field: 'nombre_completo',
      minWidth: 100,
    },
    {
      headerName: 'Razon social',
      field: 'razon_social',
      minWidth: 100,
    },
    {
      headerName: 'Nombre comercial',
      field: 'nombre_comercial',
      minWidth: 100,
    },
    {
      headerName: 'Usuario',
      field: 'tiene_usuario',
      minWidth: 100,
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
              <VisibilityIcon
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
      minWidth: 200,
    },
    {
      headerName: 'Super usuario',
      field: 'is_superuser',
      minWidth: 150,
    },
    {
      headerName: 'Nombre comercial',
      field: 'nombre_comercial',
      minWidth: 100,
    },
    {
      headerName: 'Nombre completo',
      field: 'nombre_completo',
      minWidth: 100,
    },
    {
      headerName: 'Nombre de usuario',
      field: 'nombre_de_usuario',
      minWidth: 100,
    },
    {
      headerName: 'ID persona',
      field: 'persona',
      minWidth: 100,
    },
    {
      headerName: 'Primer apellido',
      field: 'primer_apellido',
      minWidth: 100,
    },
    {
      headerName: 'Primer nombre',
      field: 'primer_nombre',
      minWidth: 100,
    },
    {
      headerName: 'Razón social',
      field: 'razon_social',
      minWidth: 100,
    },
    {
      headerName: 'Tipo de persona',
      field: 'tipo_persona',
      minWidth: 100,
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
              <VisibilityIcon
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
    console.log(data);
    dispatch(
      get_persons(
        data.typeDocument,
        data.numberDocument,
        data.firstName,
        data.lastName
      )
    );
    console.log('Buscando persona');
  };

  const on_submit_search_user = (data: FormValuesSearchUser): void => {
    console.log(data);
    dispatch(get_users(data.nameUser));
    console.log('Buscando usuario');

    console.log(users);
  };

  return (
    <Dialog
      maxWidth="lg"
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
        </Grid>
        {buscar_por === 'P' ? (
          <>
            <Box
              component="form"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handle_submit_search_person(on_submit_search_person)}
              autoComplete="off"
            >
              <Grid container spacing={2}>
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
                    {...register_search_person('firstName', { required: true })}
                    label="Primer nombre"
                    helperText="Primer nombre"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    {...register_search_person('lastName', { required: true })}
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
            <Grid item xs={12}>
              <DataGrid
                density="compact"
                autoHeight
                rows={persons}
                columns={columns_persons}
                pageSize={5}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Grid>
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
              <Grid item xs={12}>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={users}
                  columns={columns_users}
                  pageSize={5}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => row.id_usuario}
                />
              </Grid>
            </>
          )
        )}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mr: '15px', mb: '10px', mt: '10px' }}
        >
          <Button
            variant="outlined"
            onClick={handle_close_busqueda_avanzada}
            startIcon={<CloseIcon />}
          >
            CERRAR
          </Button>
          <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
            GUARDAR
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogBusquedaAvanzada;
