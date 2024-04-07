/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  CustomTabPanel,
  a11yProps,
} from '../utils/extra/customTabPanel/CustomTabPanel';
import { Grid } from '@mui/material';
import { containerStyles } from '../../tca/screens/utils/constants/constants';
import { Title } from '../../../../components';

import { PanelVentanillaContext } from '../context/PanelVentanillaContext';
import { PanelDeVentanillaScreen } from '../module/entrega98_101/screen/panelDeVentanilla/PanelDeVentanillaScreen';

export const MainViweVital = (): JSX.Element => {

  //* context declaration
  const { value, handleChange } = useContext(
    PanelVentanillaContext
  );

  return (
    <Grid container sx={containerStyles}>
      <Title title="Panel de VITAL" />
      <Box sx={{ width: '100%', mt: '1.5rem' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            width: '100%',
            overflow: 'hidden',
            overflowX: 'auto',
          }}
        >
        </Box>
        <CustomTabPanel value={value} index={0}>
          <PanelDeVentanillaScreen />
        </CustomTabPanel>
      </Box>
    </Grid>
  );
};
