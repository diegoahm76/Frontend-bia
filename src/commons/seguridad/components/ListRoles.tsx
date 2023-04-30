import { useEffect, useState } from 'react';
// Componentes de Material UI
import {
  Grid,
  Box,
  IconButton,
  Avatar,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
// Icons de Material UI
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { control_error, control_success } from '../../../helpers';
import type { AxiosError } from 'axios';
import type { ResponseServer } from '../../../interfaces/globalModels';
import type { Rol } from '../interfaces';
import { delete_request, roles_request } from '../request/seguridadRequest';
interface IProps {
  on_edit: (tab: string, rol: Rol) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListRoles = ({ on_edit }: IProps): JSX.Element => {
  const [roles, set_roles] = useState<Rol[]>([]);
  const [is_loading, set_is_loading] = useState(false);
  const [open, set_open] = useState(false);
  const [rol, set_rol] = useState<Rol>({
    id_rol: 0,
    nombre_rol: '',
    descripcion_rol: '',
    Rol_sistema: false,
  });

  const columns: GridColDef[] = [
    {
      headerName: 'ID',
      field: 'id_rol',
      minWidth: 150,
    },
    {
      headerName: 'Nombre',
      field: 'nombre_rol',
      minWidth: 300,
    },
    {
      headerName: 'Descripción',
      field: 'descripcion_rol',
      minWidth: 300,
    },
    {
      headerName: 'Estado',
      field: 'Rol_sistema',
      minWidth: 150,
      renderCell: (params) => {
        return params.row.Rol_sistema === true ? (
          <Chip size="small" label="true" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="false" color="error" variant="outlined" />
        );
      },
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => {
              on_edit('2', params.row);
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
          <IconButton
            onClick={() => {
              void confirm_delete_rol(params.row);
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
              <DeleteIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  const handle_close = (): void => {
    set_rol({
      id_rol: 0,
      nombre_rol: '',
      descripcion_rol: '',
      Rol_sistema: false,
    });
    set_open(false);
  };

  const get_data = async (): Promise<void> => {
    set_is_loading(true);
    try {
      const { data } = await roles_request();
      set_roles(data);
    } catch (error) {
      control_error(error);
    } finally {
      set_is_loading(false);
    }
  };

  const confirm_delete_rol = async (rol: Rol): Promise<void> => {
    set_rol(rol);
    set_open(true);
  };

  const delete_rol = async (): Promise<void> => {
    set_is_loading(true);
    try {
      control_success('Eliminado correctamente');
      await delete_request(rol.id_rol);
      handle_close();
      void get_data();
    } catch (error) {
      const err = error as AxiosError<ResponseServer<any>>;
      control_error(err.response?.data.detail);
    } finally {
      set_is_loading(false);
    }
  };

  useEffect(() => {
    void get_data();
  }, []);

  return (
    <>
      <Grid container justifyContent="center">
        {is_loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ width: '100%' }}>
            <DataGrid
              density="compact"
              autoHeight
              rows={roles}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row.id_rol}
            />

            <Dialog
              open={open}
              onClose={handle_close}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Seguro que quieres eliminar el siguiente Rol?
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Typography variant="body1">
                    <b>Nombre rol:</b> {rol.nombre_rol}
                  </Typography>
                  <Typography variant="body1">
                    <b>Descripción:</b> {rol.descripcion_rol}
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handle_close}
                  variant="outlined"
                  color="success"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    void delete_rol();
                  }}
                  variant="outlined"
                  color="error"
                  autoFocus
                >
                  Eliminar
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Grid>
    </>
  );
};
