import { type SyntheticEvent, useState, useEffect } from 'react';
import { Box, Grid, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { FormAdminRoles } from '../components/FormAdminRoles';
import { ListRoles } from '../components/ListRoles';
import type { Rol } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RolesScreen: React.FC = () => {
  const [tab, set_tab] = useState('1');
  const [rol_edit, set_rol_edit] = useState({
    id_rol: 0,
    nombre_rol: '',
    descripcion_rol: '',
    Rol_sistema: false,
  });
  const handle_change = (event: SyntheticEvent, tab: string): void => {
    set_tab(tab);
  };

  const on_create = (): void => {
    set_tab('1');
  };

  const on_edit = (tab: string, rol: Rol): void => {
    set_rol_edit(rol);
    set_tab(tab);
  };

  useEffect(() => {
    if (tab === '1') {
      set_rol_edit({
        id_rol: 0,
        nombre_rol: '',
        descripcion_rol: '',
        Rol_sistema: false,
      });
    }
  }, [tab]);

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
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              variant="fullWidth"
              onChange={handle_change}
              aria-label="lab API tabs example"
            >
              <Tab label="Roles" value="1" />
              <Tab
                label={rol_edit.id_rol !== 0 ? 'Editar rol' : 'Crear rol'}
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: '20px 0' }}>
            <ListRoles on_edit={on_edit} />
          </TabPanel>
          <TabPanel value="2" sx={{ p: '20px 0' }}>
            <FormAdminRoles on_create={on_create} rol_edit={rol_edit} />
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
};
