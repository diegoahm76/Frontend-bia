import { api } from '../../../api/axios';
import { type Dispatch, type SetStateAction, useEffect } from 'react';
// Componentes de Material UI
import { Grid, Box, IconButton, Avatar, Chip } from '@mui/material';
// Icons de Material UI
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { get_roles } from '../store/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { type SeguridadSlice } from '../interfaces/seguridadModels';
import { set_rol } from '../store/seguridadSlice';
import { type ToastContent, toast } from 'react-toastify';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_error = (message: ToastContent = 'Algo pasó, intente de nuevo') =>
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_success = (message: ToastContent) =>
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
interface IProps {
  set_position_tab_admin_roles: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ListRoles({
  set_position_tab_admin_roles,
}: IProps): JSX.Element {
  const { roles } = useSelector((state: SeguridadSlice) => state.seguridad);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_roles());
  }, []);

  const handle_edit_rol = async (id: number): Promise<void> => {
    console.log(id);
    const { data: data_rol } = await api.get(`roles/get-by-id/${id}/`);
    const { data: data_permisos } = await api.get(
      `permisos/permisos-modulos-rol/get-by-rol/${id}/`
    );

    console.log(data_permisos.data);
    const data_rol_edit = {
      rol: {
        id_rol: data_rol.id_rol,
        nombre_rol: data_rol.nombre_rol,
        descripcion_rol: data_rol.descripcion_rol,
        Rol_sistema: data_rol.Rol_sistema,
      },
      permisos: [],
    };

    dispatch(set_rol(data_rol_edit));
  };

  const confirm_delete_rol = async (id_rol: any): Promise<void> => {
    // Swal.fire({
    //   title: "Estas seguro?",
    //   text: "Un rol que se elimina no se puede recuperar",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Si, elminar!",
    //   cancelButtonText: "Cancelar",
    // }).then(async (result) => {
    // if (result.isConfirmed) {
    await api
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .delete(`roles/delete/${id_rol}`)
      .then((res) => {
        control_success('Eliminado correctamente');
      })
      .catch((err) => {
        control_error(err.response.data.detail);
      })
      .finally(() => {
        dispatch(get_roles());
      });
    // }
    // });
  };

  const columns: GridColDef[] = [
    {
      headerName: 'ID',
      field: 'id_rol',
      minWidth: 150,
      // visible: true,
    },
    {
      headerName: 'Nombre',
      field: 'nombre_rol',
      minWidth: 300,
      // visible: true,
    },
    {
      headerName: 'Descripción',
      field: 'descripcion_rol',
      minWidth: 300,
      // visible: true,
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
      // visible: true,
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

  return (
    <>
      <Grid item>
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
      </Grid>
    </>
  );
}
