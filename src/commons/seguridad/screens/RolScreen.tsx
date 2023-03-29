import { useEffect, useState } from 'react';
import { api } from '../../../api/axios';
// Componentes de Material UI
import {
  Grid,
  Box,
  Stack,
  Button,
  IconButton,
  Avatar,
  // Chip,
} from '@mui/material';
// Icons de Material UI
import AddIcon from '@mui/icons-material/AddBoxOutlined';
import { Title } from '../../../components/Title';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
// import { get_permisos_adapter_select } from '../../auth/adapters/roles.adapters';
// Hooks

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RolScreen: React.FC = () => {
  const [roles, set_roles] = useState([]);
  // const [permisos, set_permisos] = useState([]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const get_roles_list = async () => {
    try {
      const { data: data_roles } = await api.get('roles/get-list');
      console.log(data_roles);
      set_roles(data_roles);
    } catch (err) {
      console.log(err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // const get_roles_permisos = async () => {
  //   try {
  //     void get_roles_list();

  //     const { data: data_permisos } = await api.get(
  //       'permisos/permisos-modulos/get-list/'
  //     );
  //     const permisos_format = get_permisos_adapter_select(data_permisos);
  //     set_permisos(permisos_format);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    void get_roles_list();
  }, []);

  const columns: GridColDef[] = [
    {
      headerName: 'Nombre',
      field: 'nombre_rol',
      minWidth: 150,
      maxWidth: 220,
    },
    {
      headerName: 'Descripción',
      field: 'descripcion_rol',
      minWidth: 200,
      maxWidth: 450,
    },
    {
      headerName: 'Acciones',
      field: 'acciones',
      minWidth: 140,
      renderCell: (params: { row: { id_rol: any } }) => (
        <>
          <IconButton
            onClick={() => {
              // handle_open_edit_rol(params.row.id_rol);
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
              // confirmar_eliminar_rol(params.row.id_rol);
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
        </>
      ),
    },
  ];

  return (
    <Grid
      container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Title title="ADMINISTRADOR DE ROLES" />
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Stack direction="row" spacing={2} sx={{ m: '20px 0' }}>
          <Button variant="outlined" startIcon={<AddIcon />}>
            CREAR
          </Button>
        </Stack>
        <Grid item>
          <Box sx={{ width: '100%' }}>
            <DataGrid
              density="compact"
              autoHeight
              rows={roles}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => row.id_organigrama}
            />
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};
