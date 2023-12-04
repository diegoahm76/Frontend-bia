/* eslint-disable @typescript-eslint/naming-convention */

import { useEffect } from 'react';
import { PerSolicitaComplemento } from '../components/perSolicitaComplemento/PerSolicitaComplemento';
import { PersonaTitular } from '../components/personaTitular/PersonaTitular';
import { PanelDeVentanillaScreen } from './../../../../entrega98_101/screen/panelDeVentanilla/PanelDeVentanillaScreen';
import { useAppSelector } from '../../../../../../../../hooks';
import { getInitialData } from '../../../services/getInitialData.service';

export const ParteInicial: React.FC = (): JSX.Element => {
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );

  useEffect(() => {
    if (!currentElementPqrsdComplementoTramitesYotros) return;

    void getInitialData(
      currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF
    );

    console.log('se carga la data inicial necearis para el módulo');
  }, []);

  return (
    <>
      <PersonaTitular />
      <PerSolicitaComplemento />
    </>
  );
};
