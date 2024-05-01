/* eslint-disable @typescript-eslint/naming-convention */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { MenuPantallaPrincipalScreem } from '../screens/MenuPantallaPrincipal/MenuPantallaPrincipalScreem';
import { StepperProvider } from '../context/SteperContext';
import { MenuPantallaPrincipalJuridicaTramites } from '../JuridicaTramites/screens/MenuPantallaPrincipal/MenuPantallaPrincipalJuridicaTramites';

export const RutesTramitesServicos = (): ReactElement => {
  return (
    <StepperProvider>

      <Routes>
        <Route
          path="/servicios"
          element={<MenuPantallaPrincipalScreem />}

        />

        <Route
          path="/tramites"
          element={<MenuPantallaPrincipalJuridicaTramites/>}

        />



        {/* <Route path="/*" element={<Page404 />} /> */}
      </Routes>
    </StepperProvider>
  );
};