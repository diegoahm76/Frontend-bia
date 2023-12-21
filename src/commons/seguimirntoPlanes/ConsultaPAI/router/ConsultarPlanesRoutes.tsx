/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderConsultarSeguiminetoPAI } from '../context/context';
import { ConsultarSeguiminetoPAIScreen } from '../screen/ConsultarSeguiminetoPAIScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultarSeguiminetoPAIRoutes = (): ReactElement => {
  return (
    <UserProviderConsultarSeguiminetoPAI>
      <Routes>
        <Route path="consultar/*" element={<ConsultarSeguiminetoPAIScreen />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProviderConsultarSeguiminetoPAI>
  );
};
