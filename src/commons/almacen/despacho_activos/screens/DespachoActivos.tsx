import { Box, Button, Grid, Tab } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SolicitudesEnProceso from './SolicitudesEnProceso';
import AddIcon from '@mui/icons-material/Add';

// eslint-disable-next-line @typescript-eslint/naming-convention
const DespachoActivos = () => {

  const [position_tab, set_position_tab] = useState<string>('1');
  const [accion, set_accion] = useState<string>('null');

  const [despacho_sin_solicitud, set_despacho_sin_solicitud] = useState<boolean>(false);

  const handle_tablist_change = (event: React.SyntheticEvent, newValue: string) => {
    set_position_tab(newValue);
  }

  const btn_crear_despacho_sin_solicitud = () => {
    set_despacho_sin_solicitud(true);
  }

  return (
    <>
      <Grid container spacing={2} marginTop={2} sx={{
        position: "relative",
        background: "#FAFAFA",
        borderRadius: "15px",
        p: "40px",
        mb: "20px",
        boxShadow: "0px 3px 6px #042F4A26",
      }}
      >
        <Grid item xs={12}>
          <Title title='Despacho de solicitudes de activos'></Title>
          <Box
            component={'form'}
            sx={{ mt: '20px' }}
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', }}>
                <TabList sx={{ minWidth: '100%' }} onChange={handle_tablist_change}>
                  <Tab disabled={accion === 'ver'} sx={{ minWidth: '50%' }} label="Solicitudes en proceso" value="1" />
                  <Tab disabled={accion === 'null'} sx={{ minWidth: '50%' }} label="Resumen de la solicitud" value="2" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <SolicitudesEnProceso
                    set_accion={set_accion}
                    despacho_sin_solicitud={despacho_sin_solicitud}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <Grid container spacing={2} rowSpacing={7}>

                </Grid>
              </TabPanel>
            </TabContext>

            <Grid item xs={12} sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              marginTop: "20px",
              gap: 2,
            }}
            >
              <Grid item xs={12} lg={3}>
                <Button
                  fullWidth
                  color="success"
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={btn_crear_despacho_sin_solicitud}
                >
                  Crear despacho sin solicitud
                </Button>
              </Grid>

            </Grid>
          </Box>
        </Grid>

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default DespachoActivos;