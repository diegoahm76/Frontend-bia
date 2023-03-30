import { type SyntheticEvent, useState } from 'react';
import { Box, Grid, Typography, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { FormAdminRoles } from '../components/FormAdminRoles';
import { ListRoles } from '../components/ListRoles';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const RolesScreen: React.FC = () => {
  const [position_tab, set_position_tab_admin_roles] = useState('1');
  const handle_change = (event: SyntheticEvent, newValue: string): void => {
    set_position_tab_admin_roles(newValue);
  };

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
      <Typography sx={{ fontWeight: 'bold', fontSize: '20px', mb: '10px' }}>
        Roles
      </Typography>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={position_tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handle_change} aria-label="lab API tabs example">
              <Tab label="Roles" value="1" />
              <Tab
                label="Crear roles"
                // disabled={position_tab === '1' && true}
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: '20px 0' }}>
            <ListRoles
              set_position_tab_admin_roles={set_position_tab_admin_roles}
            />
          </TabPanel>
          <TabPanel value="2" sx={{ p: '20px 0' }}>
            <FormAdminRoles
              set_position_tab_admin_roles={set_position_tab_admin_roles}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
};
