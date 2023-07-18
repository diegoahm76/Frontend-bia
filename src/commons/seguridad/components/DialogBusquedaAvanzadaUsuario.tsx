import { useDispatch, useSelector } from 'react-redux';
import { type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  IconButton,
  Button,
  Box,
  Divider,
  Avatar,
  Chip,
  Tooltip,
  Toolbar,
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
import { Title } from '../../../components';

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
  const {
    register: register_search_user,
    handleSubmit: handle_submit_search_user,
  } = useForm<FormValuesSearchUser>();

  const columns_users: GridColDef[] = [
    // {
    //   headerName: 'ID usuario',
    //   field: 'id_usuario',
    // },
    // {
    //   headerName: 'ID persona',
    //   field: 'persona',
    // },
    {
      headerName: 'Tipo persona',
      field: 'tipo_persona',
      renderCell: (params) => {
        return params.row.tipo_persona === 'N' ? 'NATURAL' : params.row.tipo_persona === 'J' ? 'JURÍDICO' : '';
      },
    },
    {
      headerName: 'Nombre completo',
      field: 'nombre_completo',
      width: 250,flex: 1,
    },
    {
      headerName: 'Nombre comercial',
      field: 'nombre_comercial',
      width: 150,flex: 1,
    },
    {
      headerName: 'Nombre de usuario',
      field: 'nombre_de_usuario',
      width: 150,flex: 1,
    },
    {
      headerName: 'Razón social',
      field: 'razon_social',
      width: 150,flex: 1,
    },
    {
      headerName: 'Super usuario',
      field: 'is_superuser',flex: 1,
      renderCell: (params) => {
        return params.row.is_superuser === true ? (
          <Chip size="small" label="Si" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        );
      },
    },
    {
      headerName: 'Acciones',
      field: 'accion',flex: 1,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                trigger_user_edit_active(params.row);
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
          </Tooltip>
        </>
      ),
    },
  ];

  const trigger_user_edit_active = (data: any): void => {
    set_is_modal_active(false);
    dispatch(set_data_user_search(data));
    dispatch(get_data_user(data.id_usuario));
    dispatch(set_action_admin_users('EDIT'));
  };

  const handle_close_busqueda_avanzada = (): void => {
    set_is_modal_active(false);
  };

  const on_submit_search_user = (data: FormValuesSearchUser): void => {
    dispatch(get_users(data.nombre_usuario));
  };

  return (
    <Dialog
      open={is_modal_active}
      onClose={handle_close_busqueda_avanzada}
      fullWidth
      maxWidth={'lg'}
    >
      <DialogTitle>
        <Toolbar>

    <Title title="Busqueda avanzada por Usuario  " />
        </Toolbar> 
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
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handle_submit_search_user(on_submit_search_user)}
        autoComplete="off"
      >
        {' '}
        <Grid
          container
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
            width: '97%',
            marginLeft: '20px',
            marginTop: '20px',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                {...register_search_user('nombre_usuario', {
                  required: true,
                })}
                required
                label="Nombreee de usuario"
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
          <Grid item xs={12}>
            <Grid item xs={12}>
              <DataGrid
                density="compact"
                autoHeight
                rows={users ?? []}
                columns={columns_users}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row.id_usuario}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default dialog_busqueda_avanzada_usuario;
