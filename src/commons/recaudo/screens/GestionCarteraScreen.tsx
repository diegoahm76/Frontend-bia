import { type SyntheticEvent, useState } from 'react';
import { Box, Grid, Tab } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { GridLiquidacion } from "../components/procesoLiquidacion";
import { Title } from "../../../components"
import { EditarCartera } from '../components/GestionCartera/EditarCartera';
import { CobroCoactivo } from '../components/GestionCartera/CobroCoactivo';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestionCarteraScreen:React.FC = () => {

    const [position_tab, set_position_tab_organigrama] = useState('1');
    const handle_change = (event: SyntheticEvent ,newValue:string): void => {
        set_position_tab_organigrama(newValue)
    }

  return (
    <>
        <Grid
            container
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26'
            }}
        >
            <Grid item xs={12}>
            <Title title="Proceso de Liquidación"></Title>
                <Box
                    component='form'
                    sx={{ mt: '20px' }}
                    noValidate
                    autoComplete="off"
                >
                    <TabContext value={position_tab}>

                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handle_change}>
                                <Tab label="Gestion Cartera" value="1"/>
                                <Tab label="Editar Cartera" value="2"/>
                            </TabList>
                        </Box>

                        <TabPanel value="1" sx={{ p: '20px 0' }}>
                            <GridLiquidacion set_position_tab_organigrama={set_position_tab_organigrama}/>
                        </TabPanel>

                        <TabPanel value="2" sx={{ p: '20px 0' }}>
                            <EditarCartera />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Grid>
        </Grid>

        <TabContext value={position_tab}>
            <TabPanel value="2" sx={{ p: '20px 0' }}>
                <CobroCoactivo />
            </TabPanel>
        </TabContext>
    </>
  )
}