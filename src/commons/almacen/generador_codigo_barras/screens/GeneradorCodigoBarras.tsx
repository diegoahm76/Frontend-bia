import { Box, Button, Grid, Tab } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


// eslint-disable-next-line @typescript-eslint/naming-convention
const GeneradorCodigoBarras = () => {
  const [position_tab, set_position_tab] = useState<string>('1');

    //estado para controlar el formulario segun la accion
    const [accion, set_accion] = useState<string>('null');

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
          <Title title='Autorización de solicitudes de activos'></Title>
          <Box
            component={'form'}
            sx={{ mt: '20px' }}
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', }}>
                <TabList sx={{ minWidth: '100%' }} onChange={handle_tablist_change}>
                  <Tab disabled={accion === 'ver'} sx={{ minWidth: '50%' }} label="Solicitudes en proceso" value="1" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  
                </Grid>
              </TabPanel>
            </TabContext>

            {accion !== 'rechazar' &&
              <Grid item xs={12} sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                marginTop: "20px",
                gap: 2,
              }}
              >
                <Grid item xs={12} lg={2}>
                  <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    startIcon={position_tab === '1' ? <CloseIcon /> : <ArrowBackIosIcon />}
                    onClick={()=>{}}
                  >
                    {position_tab === '1' ? 'Salir' : 'Atrás'}
                  </Button>
                </Grid>
              </Grid>
            }
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax 
export default GeneradorCodigoBarras;