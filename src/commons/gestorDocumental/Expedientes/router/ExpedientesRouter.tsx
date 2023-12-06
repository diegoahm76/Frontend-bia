import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import CierreExpedientesScreen from '../cierreExpediente/screen/CierreExpedientesScreen';
import { UserProvider } from '../../deposito/Estantes/context/context';
import ReaperturaExpedienteScreen from '../ReaperturaExpedientes/screens/RepaerturaExpedienteScreen';
import { ExpedientesScreen } from '../aperturaExpedientes/screens/ExpedientesScreen';
import { IndexacionScreen } from '../indexacionExpedientes/screens/IndexacionScreen';
import { FirmaCierreIndiceScreen } from '../FirmaCierreIndiceElectronico/screens/FirmaCierreIndiceScreen';
import { ConsultaExpedientesDocScreen } from '../ConsultaExpedientesDocumentales/screens/ConsultaExpedientesDocScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ExpedientesRoutes = (): ReactElement => {
  return (
    <UserProvider>
      <Routes>
        <Route
          path="cierre_expedientes/*"
          element={<CierreExpedientesScreen />}
        />
        <Route
          path="reapertura_expedientes/*"
          element={<ReaperturaExpedienteScreen />}
        />
        <Route
          path="apertura_expedientes/*"
          element={<ExpedientesScreen />}
        />
        <Route
          path="indexacion_expedientes/*"
          element={<IndexacionScreen />}
        />
        <Route
          path="firma_cierre_indice/*"
          element={<FirmaCierreIndiceScreen />}
        />
        <Route
          path="consulta_expedientes_doc/*"
          element={<ConsultaExpedientesDocScreen />}
        />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProvider>
  );
};
