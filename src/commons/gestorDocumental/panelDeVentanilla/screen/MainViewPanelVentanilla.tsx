/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useState } from 'react';
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

import { PanelVentanillaContext } from '../context/PanelVentanillaContext';
import { getHistoricoByRadicado } from '../toolkit/thunks/PqrsdfyComplementos/getHistoByRad.service';
import { ModalAndLoadingContext } from '../../../../context/GeneralContext';
import {
  resetParcial,
  setListaHistoricoSolicitudes,
} from '../toolkit/store/PanelVentanillaStore';
import { useAppDispatch } from '../../../../hooks';
import { PanelDeVentanillaScreen } from '../module/entrega98_101/screen/panelDeVentanilla/PanelDeVentanillaScreen';
import { HistoricoSolicitudesScreen } from '../module/entrega98_101/screen/historicoSolicitudes/HistoricoSolicitudesScreen';
import { showAlert } from '../../../../utils/showAlert/ShowAlert';
import { HisSolOpasScreen } from '../module/entrega98_101/screen/historicoSolicitudesOPAS/HistSolOpasScrenn';
import { HisSolOtrosScreen } from '../module/entrega98_101/screen/historicoSolicitudesOtros/HisSolOtrosScreen';
import { getHistoricoOtrosByRadicado } from '../toolkit/thunks/otros/getHistoricoOtrosByRadicado.service';
import { getHistoricoByRadicadoOPAS } from '../toolkit/thunks/opas/getHistoricoByRadicadoOPAS.service';
import { HisSolTramitesScreen } from '../module/entrega98_101/screen/hisSolicitudesTramites/HistoricoSolicitudesTramites';
import { getHistoricoTramitesByRadicado } from '../toolkit/thunks/TramitesyServiciosyRequerimientos/getHistoricoTramitesByRadicado.service';

export const MainViewPanelVentanilla = (): JSX.Element => {
  // * dispatch declaration
  const dispatch = useAppDispatch();

  //* context declaration
  const { value, handleChange, setRadicado } = useContext(
    PanelVentanillaContext
  );
  const { handleGeneralLoading } = useContext(ModalAndLoadingContext);

  const handleRequestRadicado = async () => {
    dispatch(resetParcial());
    const historico = await getHistoricoByRadicado('', handleGeneralLoading);
    dispatch(setListaHistoricoSolicitudes(historico));
  };

  // ? -----------------------------------------------------------------------
  // ? ----- ESTA FUNCION SE DEBE CAMBIAR EL SERVICIO AL QUE SE ESTÁ LLAMANDO, YA QUE ESTE NO EXISTE -----
  // ? EL HISTORICO DE OPAS ES DIFERENTE AL DE PQRSDF
  // ? -----------------------------------------------------------------------
  // ? -----------------------------------------------------------------------

  const handleRequestRadicadoOpas = async () => {
    dispatch(resetParcial());
    const historico = await getHistoricoByRadicadoOPAS(
      '',
      handleGeneralLoading
    );

    dispatch(setListaHistoricoSolicitudes(historico));
  };

  const handleRequestRadicadoOtros = async () => {
    dispatch(resetParcial());
    const historico = await getHistoricoOtrosByRadicado(
      '',
      handleGeneralLoading
    );

    dispatch(setListaHistoricoSolicitudes(historico));
  };

  
  const handleRequestRadicadoTramites = async () => {
    dispatch(resetParcial());
    const historico = await getHistoricoTramitesByRadicado(
      '',
      handleGeneralLoading
    );

    dispatch(setListaHistoricoSolicitudes(historico));
  };


  return (
    <Grid container sx={containerStyles}>
      <Title title="Panel de ventanilla" />
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
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
            scrollButtons="auto"
          >
            <Tab
              onClick={() => {
                dispatch(setListaHistoricoSolicitudes([]));
                setRadicado('');
              }}
              label="Panel de ventanilla"
              {...a11yProps(0)}
            />
            <Tab
              onClick={handleRequestRadicado}
              label="Histórico de solicitudes PQRSDF"
              {...a11yProps(1)}
            />
            <Tab
              onClick={handleRequestRadicadoOpas}
              label="Histórico de solicitudes OPAS"
              {...a11yProps(2)}
            />
            <Tab
              onClick={handleRequestRadicadoOtros}
              label="Histórico de solicitudes OTROS"
              {...a11yProps(3)}
            />
            <Tab
              onClick={handleRequestRadicadoTramites}
              label="Histórico de solicitudes Trámites y Servicios"
              {...a11yProps(4)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <PanelDeVentanillaScreen />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <HistoricoSolicitudesScreen />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <HisSolOpasScreen />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <HisSolOtrosScreen />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <HisSolTramitesScreen />
        </CustomTabPanel>
      </Box>
    </Grid>
  );
};
