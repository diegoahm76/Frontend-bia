import { type SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { HistorialDatos } from '../components/HistorialDatos';
import { HistoricoAlarmas } from '../components/HistoricoAlarmas';
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const HistorialScreen: React.FC = () => {

  const [value, set_value] = useState('1');

  const handle_change = (event: SyntheticEvent, newValue: string): void => {
    set_value(newValue);
  };

  return (
    <Grid container spacing={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}>
      <Title title="INFORMCACIÓN GENERAL"></Title>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handle_change} aria-label="Tag para elegir historial de datos o alarma">
              <Tab label="Historial Datos" value="1" />
              <Tab label="Historial de alarmas" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <HistorialDatos />
          </TabPanel>
          <TabPanel value="2">
            <HistoricoAlarmas />
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
};