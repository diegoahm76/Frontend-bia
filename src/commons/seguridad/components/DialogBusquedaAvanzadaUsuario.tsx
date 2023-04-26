import { useDispatch, useSelector } from 'react-redux';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Box,
  Divider,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { SeguridadSlice, FormValuesSearchUser } from '../interfaces';
import { get_users, get_data_user } from '../store/thunks';
import {
  set_action_admin_users,
  set_data_user_search,
} from '../store/seguridadSlice';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

const dialog_busqueda_avanzada_usuario = ({
  is_modal_active,
  set_is_modal_active,
}: IProps): JSX.Element => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: SeguridadSlice) => state.seguridad);
  // const [buscar_por, set_buscar_por] = useState<string>('U');
  const [buscando_users, set_buscando_users] = useState<boolean>(false);

  const {
    register: register_search_user,
    handleSubmit: handle_submit_search_user,
  } = useForm<FormValuesSearchUser>();

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

  const trigger_user_edit_active = (data: any): void => {
    console.log(data.tipo_persona);
    get_data_user(data.id_usuario);
    // asignar data a data_user_search en
    dispatch(set_data_user_search(data));
    dispatch(set_action_admin_users('EDIT'));
  };

  const handle_close_busqueda_avanzada = (): void => {
    set_is_modal_active(false);
  };

  const on_submit_search_user = (data: FormValuesSearchUser): void => {
    // set_buscar_por('U');
    dispatch(get_users(data.nombre_usuario));
    set_buscando_users(true);
  };

  return (
    <Dialog
      maxWidth="sm"
      open={is_modal_active}
      onClose={handle_close_busqueda_avanzada}
    >
      <DialogTitle>
        Busqueda avanzada por Usuario
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
        <Box
          component="form"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handle_submit_search_user(on_submit_search_user)}
          autoComplete="off"
        >
          <Grid container spacing={2}>
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
        <Grid item xs={12}>
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
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default dialog_busqueda_avanzada_usuario;
