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
import { setListaHistoricoSolicitudes } from '../toolkit/store/PanelVentanillaStore';
import { useAppDispatch } from '../../../../hooks';
import { PanelDeVentanillaScreen } from '../module/entrega98_101/screen/panelDeVentanilla/PanelDeVentanillaScreen';
import { HistoricoSolicitudesScreen } from '../module/entrega98_101/screen/historicoSolicitudes/HistoricoSolicitudesScreen';

export const MainViewPanelVentanilla = (): JSX.Element => {
  // * dispatch declaration
  const dispatch = useAppDispatch();

  //* context declaration
  const { value, handleChange, setRadicado } = useContext(
    PanelVentanillaContext
  );
  const { handleGeneralLoading } = useContext(ModalAndLoadingContext);

  const handleRequestRadicado = async () => {
    try {
    } catch (error) {
      //  console.log('')(error);
    } finally {
    }
    const historico = await getHistoricoByRadicado('', handleGeneralLoading);

    dispatch(setListaHistoricoSolicitudes(historico));
    //  console.log('')(historico);
  };

  return (
    <Grid container sx={containerStyles}>
      <Title title="Panel de ventanilla" />
      <Box sx={{ width: '100%', mt: '1.5rem' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
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
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <PanelDeVentanillaScreen />
          {/* se debe reemplazar por el inicio del componente de la parte 1 */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* se debe reemplazar por el inicio del componente de la parte 2 */}
          <HistoricoSolicitudesScreen />
        </CustomTabPanel>
      </Box>
    </Grid>
  );
};
