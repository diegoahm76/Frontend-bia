import { type SyntheticEvent, useState } from 'react';
import { Box, Grid, Tab } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { GridLiquidacion, EditarLiquidacion, DetalleLiquidacion } from "../components/procesoLiquidacion";
import { Title } from "../../../components"


// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProcesoLiquidacionScreen:React.FC = () => {

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
                                <Tab label="Liquidacion" value="1"/>
                                <Tab label="Editar Liquidacion" value="2"/>
                            </TabList>
                        </Box>

                        <TabPanel value="1" sx={{ p: '20px 0' }}>
                            {/* DATAGRID LIQUIDACION */}
                            <GridLiquidacion set_position_tab_organigrama={set_position_tab_organigrama}/>
                        </TabPanel>

                        <TabPanel value="2" sx={{ p: '20px 0' }}>
                            {/* INPUTS EDITAR LIQUIDACION */}
                            <EditarLiquidacion />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Grid>
        </Grid>

        <TabContext value={position_tab}>
            <TabPanel value="2" sx={{ p: '20px 0' }}>
                {/* GRID DETALLE LIQUIDACION */}
                <DetalleLiquidacion />
            </TabPanel>
        </TabContext>
    </>
  )
}