import { type SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid } from '@mui/material';
import  { Title }  from '../../../../components/Title';
import { HistorialDatosGuamal } from '../components/HistorialDatosGuamal';
import { HistorialDatosOcoa } from '../components/HistorialDatosOcoa';
import { HistorialDatosGaitan } from '../components/HistorialDatosGaitan';
import { HistorialDatosGuayuriba } from '../components/HistorialDatosGuayuriba';
import { HistorialDatosAcaciitas } from '../components/HistorialDatosAcaciitas';
import { HistorialDatosChichimena } from '../components/HistorialDatosChichimene';
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
                <Tab label="Estación Guamal" value="1" />
                <Tab label="Estación Guayuriba" value="2" />
                <Tab label="Estación Ocoa" value="3" />
                <Tab label="Estación Caño Rubiales" value="4" />
                <Tab label="Estación Acaciitas" value="5" />
                <Tab label="Estación Chichimene" value="6" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <HistorialDatosGuamal />
            </TabPanel>
            <TabPanel value="2">
              <HistorialDatosGuayuriba/>
            </TabPanel>
            <TabPanel value="3">
              <HistorialDatosOcoa />
            </TabPanel>
            <TabPanel value="4">
              <HistorialDatosGaitan/>
            </TabPanel>
            <TabPanel value="5">
              <HistorialDatosAcaciitas />
            </TabPanel>
            <TabPanel value="6">
              <HistorialDatosChichimena/>
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    );
  };