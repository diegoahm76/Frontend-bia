import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
// Componentes de Material UI
import {
  Grid,
  Box,
  IconButton,
  Avatar,
  Chip,
  CircularProgress,
} from '@mui/material';
// Icons de Material UI
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { control_error, control_success } from '../../../helpers';
import type { AxiosError } from 'axios';
import type { ResponseServer } from '../../../interfaces/globalModels';
import type { Roles } from '../interfaces';
import { roles_request } from '../request/seguridadRequest';
interface IProps {
  set_position_tab_admin_roles: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ListRoles({
  set_position_tab_admin_roles,
}: IProps): JSX.Element {
  const [roles, set_roles] = useState<Roles[]>([]);
  const [is_loading, set_is_loading] = useState(false);
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
              void handle_edit_rol(params.row.id_rol);
              set_position_tab_admin_roles('2');
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
              void confirm_delete_rol(params.row.id_rol);
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

  const handle_edit_rol = async (id: number): Promise<void> => {};

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

  const confirm_delete_rol = async (id_rol: any): Promise<void> => {
    set_is_loading(true);
    try {
      control_success('Eliminado correctamente');
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
          </Box>
        )}
      </Grid>
    </>
  );
}
