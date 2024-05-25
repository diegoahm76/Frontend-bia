import { Box, Button, Grid, Tab } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import DespachosEnProceso from './DespachosEnProceso';
import { interface_resumen_solicitud_despacho } from '../interfaces/types';
import ResumenDespachoSolicitud from './ResumenDespachoSolicitud';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';



// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const AutorizarDespachos = () => {

  const [accion, set_accion] = useState<string>('null');

  const [position_tab, set_position_tab] = useState<string>('1');

  // id de la solicitud cuando se da click en las acciones de la tabla
  const [id_solicitud_activo, set_id_solicitud_activo] = useState<number | null>(null);

  // Data del resumen de una solicitud al click en la tabla en incono 'OJO'
  const [data_resumen_solicitud_despacho, set_data_resumen_solicitud_despacho] = useState<interface_resumen_solicitud_despacho>(Object);


  const handle_tablist_change = (event: React.SyntheticEvent, newValue: string) => {
    set_position_tab(newValue);
  };


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
          <Title title='Autorizar despachos'></Title>
          <Box
            component={'form'}
            sx={{ mt: '20px' }}
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', }}>
                <TabList sx={{ minWidth: '100%' }} onChange={handle_tablist_change}>
                  <Tab disabled={accion === 'ver'} sx={{ minWidth: '50%' }} label="Despachos en proceso" value="1" />
                  <Tab disabled={accion === 'null'} sx={{ minWidth: '50%' }} label="Resumen del despacho" value="2" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <DespachosEnProceso
                    accion={accion}
                    set_accion={set_accion}
                    set_position_tab={set_position_tab}
                    set_id_solicitud_activo={set_id_solicitud_activo}
                    set_data_resumen_solicitud_despacho={set_data_resumen_solicitud_despacho}
                    id_solicitud_activo={id_solicitud_activo}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <Grid container spacing={2} rowSpacing={3}>
                  <ResumenDespachoSolicitud
                    data_resumen_solicitud_despacho={data_resumen_solicitud_despacho}
                  />
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>

          <Grid item xs={12} sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            marginTop: "20px",
            gap: 2,
          }}
          >
            {position_tab === '2' &&
              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  color="error"
                  variant="contained"
                  startIcon={<ChevronLeftIcon />}
                  onClick={() => set_position_tab('1')}
                >
                  Atrás
                </Button>
              </Grid>
            }
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default AutorizarDespachos;