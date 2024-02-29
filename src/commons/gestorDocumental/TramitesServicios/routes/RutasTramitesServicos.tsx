/* eslint-disable @typescript-eslint/naming-convention */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { MenuPantallaPrincipalScreem } from '../screens/MenuPantallaPrincipal/MenuPantallaPrincipalScreem';

export const RutesTramitesServicos = (): ReactElement => {
  return (
      <Routes>
        <Route
          path="/servicios"
          element={<MenuPantallaPrincipalScreem />}

        />
      

        <Route path="/*" element={<Page404 />} />
      </Routes>
  );
};