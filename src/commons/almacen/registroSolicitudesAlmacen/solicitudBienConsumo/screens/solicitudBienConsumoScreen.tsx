// import { Title } from '../../../../components/Title';
// import { Grid, Stack, Button, TextField, MenuItem } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import { type SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { Grid } from '@mui/material';
import { Title } from '../../../../../components/Title';
import SolicitudConsumoDialog from '../components/solicitudconsumoDialog';
import SolicitudConsumoViveroDialog from '../components/solicitudConsumoViveroDialog'
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const SolicitudBienConsumoScreen: React.FC = () => {
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
            <Title title='SOLICITUDES' />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handle_change} aria-label="lab API tabs example">
                            <Tab label="Solicitud bien de consumo" value="1" />
                            <Tab label="Solicitud bien de consumo por vivero" value="2" />

                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <SolicitudConsumoDialog />
                    </TabPanel>
                    <TabPanel value="2">
                        <SolicitudConsumoViveroDialog />
                    </TabPanel>


                </TabContext>
            </Box>
        </Grid>
    );

};
