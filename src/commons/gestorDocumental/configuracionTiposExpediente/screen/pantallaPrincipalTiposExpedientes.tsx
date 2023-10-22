/* eslint-disable @typescript-eslint/naming-convention */
 import { Grid } from '@mui/material';
 import { ConfiguracionTerna } from '../components/comfiguracionTerna/ConfiguracionTerna';


import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ConfiguracionTernañosiguiente } from '../components/configuracionTernañosiguiente/ConfiguracionTernañoSiguiente';

export  const PantallaPrincipalConfiguracoinTiposExpediente:React.FC=()=> {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Año Actual" {...a11yProps(0)} />
          <Tab label="Año Siguiente" {...a11yProps(1)} />
       
        </Tabs>
      </Box>
      <div
        role="tabpanel"
        hidden={value !== 0}
        id={`simple-tabpanel-0`}
        aria-labelledby={`simple-tab-0`}
      >
        {value === 0 && (
           <Grid item xs={12}>
                       <ConfiguracionTerna/>
                   </Grid>
        )}
      </div>
      <div
        role="tabpanel"
        hidden={value !== 1}
        id={`simple-tabpanel-1`}
        aria-labelledby={`simple-tab-1`}
      >
        {value === 1 && (
        
  <Grid item xs={12}>
                          <ConfiguracionTernañosiguiente/>   
                   </Grid>
       
        )}
      </div>
     
    </Box>
  );
}
