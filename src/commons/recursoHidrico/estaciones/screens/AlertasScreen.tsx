import { type SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ParametrosReferencia } from '../components/ParametrosReferencia';
import { ConfiguracionAlarma } from '../components/ConfiguracionAlarma';
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AlertasScreen: React.FC = () => {
  const [value, set_value] = useState('1');

  const handle_change = (event: SyntheticEvent, newValue: string): void => {
    set_value(newValue);
  };

  return (
    <Grid
      container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Title title="Información General"></Title>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handle_change} aria-label="lab API tabs example">
              <Tab label="Parametros de Referencia" value="1" />
              <Tab label="Configuración Alarma Persona" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: '20px 0 0 0' }}>
            <ParametrosReferencia />
          </TabPanel>
          <TabPanel value="2" sx={{ p: '20px 0 0 0' }}>
            <ConfiguracionAlarma />
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
};
