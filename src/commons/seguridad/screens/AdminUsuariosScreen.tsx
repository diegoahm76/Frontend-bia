import { type SyntheticEvent, useState } from 'react';
import { Box, Grid, Typography, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useAppSelector } from '../../../hooks';
import { FormAdminPersonas } from '../components/FormAdminPersonas';
import { ListPersonas } from '../components/ListPersonas';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const AdminUsuariosScreen: React.FC = () => {
  const [position_tab, set_position_tab_admin_personas] = useState('1');
  const { organigram_current } = useAppSelector((state) => state.organigram);
  const handle_change = (event: SyntheticEvent, newValue: string): void => {
    set_position_tab_admin_personas(newValue);
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
        Administrar usuarios
      </Typography>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={position_tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handle_change} aria-label="lab API tabs example">
              <Tab label="Usuarios" value="1" />
              <Tab
                label={
                  organigram_current.fecha_terminado !== null
                    ? 'Usuarios'
                    : 'Editar usuarios'
                }
                // disabled={position_tab === '1' && true}
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: '20px 0' }}>
            <ListPersonas
              set_position_tab_admin_personas={set_position_tab_admin_personas}
            />
          </TabPanel>
          <TabPanel value="2" sx={{ p: '20px 0' }}>
            <FormAdminPersonas
              set_position_tab_admin_personas={set_position_tab_admin_personas}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
};
