import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Box, Typography, Tabs, Tab } from '@mui/material';
import { Title } from '../../../components';
import { AdminPersonas } from '../components/AdminPersonas';
import { AdminUsuarios } from '../components/AdminUsuarios';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const TabPanel: (props: TabPanelProps) => JSX.Element = (
  props: TabPanelProps
) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11y_props = (
  index: number
): {
  id: string;
  'aria-controls': string;
} => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdminUsuariosScreen: React.FC = () => {
  const theme = useTheme();
  const [value, set_value] = useState(0);

  const handle_change = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    set_value(newValue);
  };

  const handle_change_index = (index: number): void => {
    set_value(index);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card variant="outlined" sx={{ borderRadius: 5, padding: '20px' }}>
          <Title title="Administrar usuarios" />
          <Tabs
            value={value}
            onChange={handle_change}
            indicatorColor="secondary"
            textColor="inherit"
            aria-label="full width tabs example"
            sx={{ mt: '10px' }}
          >
            <Tab label="Usuarios" {...a11y_props(0)} />
            <Tab label="Personas" {...a11y_props(1)} />
            <Tab label="Empleados" {...a11y_props(2)} />
          </Tabs>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handle_change_index}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <AdminUsuarios />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <AdminPersonas />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              Item Four
            </TabPanel>
          </SwipeableViews>
        </Card>
      </Grid>
    </Grid>
  );
};
