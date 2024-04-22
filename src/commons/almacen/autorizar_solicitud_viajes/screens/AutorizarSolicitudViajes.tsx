import { Box, Button, Grid, Tab } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SolicitudesEnProceso from './SolicitudesEnProceso';

// eslint-disable-next-line @typescript-eslint/naming-convention
const AutorizarSolicitudViajes = () => {
  const navigate = useNavigate();

  const [position_tab, set_position_tab] = useState<string>('1');

  //estado para controlar el formulario segun la accion
  const [accion, set_accion] = useState<string>('null');

  //estado para guardar los datos de la solicitud seleccionada
  const [data_resumen_solicitud, set_data_resumen_solicitud] = useState<any>(Object);


  const handle_tablist_change = (event: React.SyntheticEvent, newValue: string) => {
    set_position_tab(newValue);
  };

  const btn_salir = () => {
    if (position_tab === '1') {
      Swal.fire({
        title: '¿Esta seguro de salir del modulo?',
        showDenyButton: true,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#042F4A',
        cancelButtonColor: '#DE1616',
        icon: 'question',
      }).then(async (result: any) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate('/almacen/solicitudes-activos');
          return true;
        } else if (result.isDenied) {
          return false;
        }
      });
    } else if (position_tab === '2') {
      set_accion('null');
      set_position_tab('1');
    }
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
          <Title title='Autorización de solicitudes de activos'></Title>
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
                    accion={accion}
                    set_accion={set_accion}
                    set_data_resumen_solicitud={set_data_resumen_solicitud}
                  />
                </Grid>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <Grid container spacing={2} rowSpacing={7}>
                  {/* RESUMEN DE LA SOLICITUD */}
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
                    onClick={btn_salir}
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
export default AutorizarSolicitudViajes;