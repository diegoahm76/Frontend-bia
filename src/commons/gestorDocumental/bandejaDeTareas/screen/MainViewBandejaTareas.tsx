/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useState } from 'react';

import { Grid } from '@mui/material';
import { containerStyles } from '../../tca/screens/utils/constants/constants';
import { Title } from '../../../../components';
import { BandejaDeTareasScreen } from '../mainModule/bandejaDeTareas/screen/bandejaDeTareas/BandejaDeTareasScren';

// import { PanelVentanillaContext } from '../context/PanelVentanillaContext';
// import { getHistoricoByRadicado } from '../toolkit/thunks/PqrsdfyComplementos/getHistoByRad.service';
//import { ModalAndLoadingContext } from '../../../../context/GeneralContext';
//import { setListaHistoricoSolicitudes } from '../toolkit/store/PanelVentanillaStore';
// import { useAppDispatch } from '../../../../hooks';
// import { PanelDeVentanillaScreen } from '../module/entrega98_101/screen/panelDeVentanilla/PanelDeVentanillaScreen';
// import { HistoricoSolicitudesScreen } from '../module/entrega98_101/screen/historicoSolicitudes/HistoricoSolicitudesScreen';

export const MainViewBandejaTareas = (): JSX.Element => {
  // * dispatch declaration
  // const dispatch = useAppDispatch();

  //* context declaration
  /*  const { value, handleChange, setRadicado } = useContext(
    PanelVentanillaContext
  );*/
  // const { handleGeneralLoading } = useContext(ModalAndLoadingContext);

  /*  const handleRequestRadicado = async () => {
    try {
    } catch (error) {
    } finally {
    }
    const historico = await getHistoricoByRadicado('', handleGeneralLoading);

    dispatch(setListaHistoricoSolicitudes(historico));
    //  console.log('')(historico);
  };*/

  return (
    <Grid container sx={containerStyles}>
      <Title title="Bandeja de tareas" />
      <BandejaDeTareasScreen />
    </Grid>
  );
};
