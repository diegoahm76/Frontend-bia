import { api } from '../../../api/axios';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
// Componentes de Material UI
import { Grid, Box, IconButton, Avatar } from '@mui/material';
// Icons de Material UI
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TablaGeneral } from '../../../components/TablaGeneral';
import { get_permisos_adapter_general } from '../../auth/adapters/roles.adapters';

interface IProps {
  set_position_tab_admin_roles: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ListRoles({
  set_position_tab_admin_roles,
}: IProps): JSX.Element {
  const [roles, set_roles] = useState([]);
  const [permisos, set_permisos] = useState([]);
  // const [form_values, set_form_values] = useState({
  //   nombreRol: '',
  //   permisosRol: [],
  //   descripcionRol: '',
  // });
  // const [is_visible, set_is_visible] = useState(false);

  // const accessToken = getTokenAccessLocalStorage();
  // const config = getConfigAuthBearer(accessToken);

  const get_roles_list = async (): Promise<void> => {
    try {
      const { data } = await api.get('roles/get-list');
      console.log(permisos);
      set_roles(data);
    } catch (err) {
      console.log(err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const get_roles_permisos = async () => {
    try {
      const { data: data_permisos } = await api.get(
        'permisos/permisos-modulos/get-list/'
      );
      const permisos_format = get_permisos_adapter_general(data_permisos);
      console.log('format general', permisos_format);
      set_permisos(permisos_format);
      // console.log(permisos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void get_roles_list();
    void get_roles_permisos();
  }, []);

  const columns = [
    {
      header: 'Tipo de documento',
      field: 'id_rol',
      minWidth: 200,
      visible: true,
    },
    {
      header: 'Número de documento',
      field: 'Rol_sistema',
      minWidth: 150,
      visible: true,
    },
    {
      header: 'Primer nombre',
      field: 'descripcion_rol',
      minWidth: 100,
      visible: true,
    },
    {
      header: 'Primer apellido',
      field: 'nombre_rol',
      minWidth: 100,
      visible: true,
    },
    {
      header: 'Acciones',
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

  return (
    <>
      <Grid item>
        <Box sx={{ width: '100%' }}>
          <TablaGeneral
            showButtonExport
            tittle={'Roles'}
            columns={columns}
            rowsData={roles}
            staticscroll={true}
            stylescroll={'780px'}
          />
        </Box>
      </Grid>
    </>
  );
}
