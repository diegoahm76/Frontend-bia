/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  CustomTabPanel,
  a11yProps,
} from '../utils/extra/customTabPanel/CustomTabPanel';
import { Grid } from '@mui/material';
import { containerStyles } from '../../tca/screens/utils/constants/constants';
import { Title } from '../../../../components';

export const MainViewPanelVentanilla = (): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
    setValue(newValue);

  return (
    <Grid container sx={containerStyles}>
      {/*    <Grid item xs={12} sm={12}> */}
      <Title title="Panel de ventanilla" />
      <Box sx={{ width: '100%', mt: '1.5rem' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Panel de ventanilla" {...a11yProps(0)} />
            <Tab label="Histórico de solicitudes" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Panel de ventanilla parte inicial
          {/* se debe reemplazar por el inicio del componente de la parte 1 */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* se debe reemplazar por el inicio del componente de la parte 2 */}
          Histórico de solicitudes de pqrdsdf
        </CustomTabPanel>
      </Box>
    </Grid>
  );
};
