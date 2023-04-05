import { type SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid } from '@mui/material';
import  { Title }  from '../../../../components/Title';
import { HistorialAlertas } from '../components/HistorialAlertas';
import { HistorialDeDatos } from '../components/HistorialDeDatos';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const HistorialDatos: React.FC = () => {
    const [value, set_value] = useState('1');
  
    const handle_change = (event: SyntheticEvent, newValue: string): void => {
      set_value(newValue);
    };
  
    return (
      <Grid container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}>
       <Title title="Información General"></Title>
        <Box sx={{ width: '100%', typography: 'body1'}}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handle_change} aria-label="lab API tabs example">
                <Tab label="Historial Datos" value="1" />
                <Tab label="Historial Alertas" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{p: '15px  0'}}>
              <HistorialDeDatos />
            </TabPanel>
            <TabPanel value="2">
              <HistorialAlertas/>
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    );
  };