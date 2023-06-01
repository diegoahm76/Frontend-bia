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
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from '@mui/material';
// Icons de Material UI
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import DetailIcon from '@mui/icons-material/Visibility';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { control_error, control_success } from '../../../helpers';
import type { AxiosError } from 'axios';
import type { ResponseServer } from '../../../interfaces/globalModels';
import type { Rol, UsersRol } from '../interfaces';
import {
  delete_request,
  get_users_rol,
  roles_request,
} from '../request/seguridadRequest';
import { Title } from '../../../components/Title';
interface IProps {
  on_edit: (tab: string, rol: Rol) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListRoles = ({ on_edit }: IProps): JSX.Element => {
  const [roles, set_roles] = useState<Rol[]>([]);
  const [is_loading, set_is_loading] = useState(false);
  const [is_loading_detail, set_is_loading_detail] = useState(false);
  const [message_error, set_message_error] = useState('');
  const [open, set_open] = useState(false);
  const [open_detail, set_open_detail] = useState(false);
  const [rol, set_rol] = useState<Rol>({
    id_rol: 0,
    nombre_rol: '',
    descripcion_rol: '',
    Rol_sistema: false,
  });
  const [rows, set_rows] = useState<UsersRol[]>([]);

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
      minWidth: 150,
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
          <IconButton
            onClick={() => {
              void view_detail(params.row);
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
              <DetailIcon
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
    set_open_detail(false);
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

  const view_detail = async (rol: Rol): Promise<void> => {
    set_is_loading_detail(true);
    set_open_detail(true);
    try {
      set_rol(rol);
      const {
        data: { data },
      } = await get_users_rol(rol.id_rol);
      set_rows(data);
    } catch (error) {
      control_error(error);
    } finally {
      set_is_loading_detail(false);
    }
  };

  const delete_rol = async (): Promise<void> => {
    set_is_loading(true);
    try {
      await delete_request(rol.id_rol);
      control_success('Eliminado correctamente');
      set_message_error('');
      handle_close();
      void get_data();
    } catch (error) {
      const err = error as AxiosError<ResponseServer<any>>;
      if (err.response?.status === 403) {
        set_message_error(err.response?.data.detail);
      } else {
        control_error(err.response?.data.detail);
      }
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
                {message_error !== '' && (
                  <Alert severity="error">{message_error}</Alert>
                )}
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
                  disabled={message_error !== ''}
                >
                  Eliminar
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={open_detail}
              onClose={handle_close}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
              maxWidth={'md'}
            >
              <DialogTitle id="alert-dialog-title" textAlign="center">
                {rol.nombre_rol}
              </DialogTitle>
              <DialogContent>
                {is_loading_detail ? (
                  <>
                    <Grid container justifyContent="center">
                      <CircularProgress />
                    </Grid>
                    <Typography textAlign="center">
                      Cargando, por favor espere...
                    </Typography>
                  </>
                ) : (
                  <>
                    <DialogContentText>
                      <Typography variant="body1" mb={2}>
                        <Title title= "Usuarios asignados al rol"></Title>
                      </Typography>
                    </DialogContentText>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Usuario</TableCell>
                            <TableCell align="center">
                              Nombres y apellidos
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.id_persona}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                align="center"
                                component="th"
                                scope="row"
                              >
                                {row.nombre_usuario}
                              </TableCell>
                              <TableCell align="center">
                                {row.nombre_persona}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handle_close}
                  variant="outlined"
                  color="success"
                >
                  Cerrar
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Grid>
    </>
  );
};
