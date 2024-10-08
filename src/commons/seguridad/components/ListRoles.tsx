import { useEffect, useState } from 'react';
// Componentes de Material UI
import {
  Grid,
  Box,
  IconButton,
  Avatar,
  // Chip,
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
  Tooltip,
  Chip,
} from '@mui/material';
// Icons de Material UI
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
import ButtonGroup from '@mui/material/ButtonGroup';
import { download_xls } from '../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../documentos-descargar/PDF_descargar';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
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
      headerName: 'Nombre',
      field: 'nombre_rol',
      minWidth: 350,
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="body1">
          {params.row.nombre_rol.includes('zCamunda') ? (
            <>{params.row.nombre_rol.replace(/zCamunda - /g, '')}</>
          ) : (
            <>{params.row.nombre_rol}</>
          )}
        </Typography>
      ),
    },
    {
      headerName: 'Descripción',
      field: 'descripcion_rol',
      minWidth: 450,
      flex: 1,
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      minWidth: 200,
      flex: 1,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Editar" placement="top" arrow>
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
          </Tooltip>

          <Tooltip title="Eliminar" placement="top" arrow>
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
                  sx={{ color: 'red', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Tooltip title="Ver detalle" placement="top" arrow>
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
          </Tooltip>
          {/* se debe ver si ese rol tiene permisos de tramites y servicios */}
          {params.row.nombre_rol.includes('zCamunda') && (
            <Tooltip
              title="Rol con permisos para trámites y servicios"
              placement="top"
              arrow
            >
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
                  <InfoIcon
                    sx={{
                      color: 'info.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          )}
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
      {' '}
      <Grid container justifyContent="flex-end">
        <Grid item>
          <ButtonGroup>
            {download_xls({ nurseries: roles, columns })}
            {download_pdf({ nurseries: roles, columns, title: 'Roles' })}
          </ButtonGroup>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" marginTop={2}>
        {is_loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ width: '100%' }}>
            <DataGrid
              density="compact"
              autoHeight
              rows={roles ?? []}
              columns={columns ?? []}
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
            {/* dialogo de personas */}
            <Dialog
              open={open_detail}
              onClose={handle_close}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
              maxWidth={'md'}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  position: 'relative',
                  background: '#FAFAFA',
                  borderRadius: '15px',
                  p: '20px',
                  mb: '20px',
                  boxShadow: '0px 3px 6px #042F4A26',
                  marginTop: '20px',
                  marginLeft: '14px',
                  width: '860px',
                }}
              >
                <Title title={`Rol: ${rol.nombre_rol}`} />
              </Grid>

              <Grid
                container
                spacing={2}
                sx={{
                  position: 'relative',
                  background: '#FAFAFA',
                  borderRadius: '15px',
                  p: '20px',
                  mb: '20px',
                  boxShadow: '0px 3px 6px #042F4A26',
                  marginTop: '6px',
                  marginLeft: '14px',
                  width: '860px',
                }}
              >
                <DialogContent>
                  {is_loading_detail ? (
                    <>
                      <Grid container justifyContent="center">
                        <CircularProgress sx={{ mb: 1 }} />
                      </Grid>
                      <Typography textAlign="center" sx={{ mt: 2 }}>
                        Cargando, por favor espere...
                      </Typography>
                    </>
                  ) : (
                    <>
                      <DialogContentText>
                        <Typography variant="body1" mb={2}>
                          <Title title="Usuarios asignados al rol"></Title>
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
              </Grid>
              <DialogActions>
                <Button
                  onClick={handle_close}
                  variant="outlined"
                  color="error"
                  startIcon={<CloseIcon />}
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
