import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProvider } from '../../deposito/Estantes/context/context';
import { TramitesOServiciosScreen } from '../screens/TramitesOServiciosScreen';
import { ResReqOpaRouter } from '../respuestaRequerimientoOpa/router/ResReqOpaRouter';
import { FormProviderMetadatos } from '../../TramitesServicios/context/MetadatosContext';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TramitesServiciosRouter = (): ReactElement => {
  return (
    <FormProviderMetadatos>

    <UserProvider>
      <Routes>
        <Route
          path="tramites_o_servicios/*"
          element={<TramitesOServiciosScreen />}
        />
        
           <Route
          path="respuesta_requerimiento_opa/*"
          element={<ResReqOpaRouter/>}
        />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProvider>
    </FormProviderMetadatos>

  );
};