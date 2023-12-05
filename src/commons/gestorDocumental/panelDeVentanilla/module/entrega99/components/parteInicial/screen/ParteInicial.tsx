/* eslint-disable @typescript-eslint/naming-convention */

import { useContext, useEffect } from 'react';
import { PerSolicitaComplemento } from '../components/perSolicitaComplemento/PerSolicitaComplemento';
import { PersonaTitular } from '../components/personaTitular/PersonaTitular';
import { PanelDeVentanillaScreen } from './../../../../entrega98_101/screen/panelDeVentanilla/PanelDeVentanillaScreen';
import { useAppSelector } from '../../../../../../../../hooks';
import { getInitialData } from '../../../services/getInitialData.service';
import { SolicitudAlUsuarioContext } from '../../../context/SolicitudUsarioContext';
import { useNavigate } from 'react-router-dom';

export const ParteInicial: React.FC = (): JSX.Element => {
  //* navigate declaration
  const navigate = useNavigate();

  //* redux state
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );

  //* context declaration
  const { setInfoInicialUsuario } = useContext(SolicitudAlUsuarioContext);

  useEffect(() => {
    if (!currentElementPqrsdComplementoTramitesYotros) return;

    void getInitialData(
      currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
      navigate,
    ).then((data) => {
      console.log('data', data);
      // ? van a venir dos objetos, uno con la data de la persona titular y otro con la data de la persona que solicita el complemento

      setInfoInicialUsuario(data);
    });

    console.log('se carga la data inicial necearis para el módulo');
  }, []);

  return (
    <>
      <PersonaTitular />
      <PerSolicitaComplemento />
    </>
  );
};
