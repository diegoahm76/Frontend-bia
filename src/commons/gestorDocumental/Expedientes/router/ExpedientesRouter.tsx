/* eslint-disable @typescript-eslint/naming-convention */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import CierreExpedientesScreen from '../cierreExpediente/screen/CierreExpedientesScreen';
import { UserProvider } from '../../deposito/Estantes/context/context';
import ReaperturaExpedienteScreen from '../ReaperturaExpedientes/screens/RepaerturaExpedienteScreen';
import { ExpedientesScreen } from '../aperturaExpedientes/screens/ExpedientesScreen';
import { IndexacionScreen } from '../indexacionExpedientes/screens/IndexacionScreen';
import { FirmaCierreIndiceScreen } from '../FirmaCierreIndiceElectronico/screens/FirmaCierreIndiceScreen';
import { ConsultaExpedientesDocScreen } from '../consultaExpedientesDocumentales/screens/ConsultaExpedientesDocScreen';
import { IndicesElectronicos } from '../../../seguridad/screens/IndicesElectronicos/IndicesElectronicos';
import { ConsultaIndiceElectronicoScreen } from '../ConsultaIndiceElectronico/screens/ConsultaIndiceElectronicoScreen';
import { TransferDocMainScreen } from '../transferenciasDocumentales/screen/TransferDocMainScreen';
import { TransferDocProvider } from '../transferenciasDocumentales/context/TransferDocContext';
import { MetadatosIndexacionProvider } from '../indexacionExpedientes/Components/Context/MetadatosContexIndexacionDocumentos';

// eslint-disable-next-line @typescript-eslint/naming-convention
const routesConfig = [
  { path: 'cierre_expedientes/*', element: <CierreExpedientesScreen /> },
  { path: 'reapertura_expedientes/*', element: <ReaperturaExpedienteScreen /> },
  { path: 'apertura_expedientes/*', element: <ExpedientesScreen /> },
  { path: 'indexacion_expedientes/*', element: <IndexacionScreen /> },
  { path: 'firma_cierre_indice/*', element: <FirmaCierreIndiceScreen /> },
  {
    path: 'consulta_expedientes_doc/*',
    element: <ConsultaExpedientesDocScreen />,
  },
  { path: 'consulta_indices_electronicos/*', element: <IndicesElectronicos /> },
  {
    path: 'consulta_indice_electronico/*',
    element: <ConsultaIndiceElectronicoScreen />,
  },
  {
    path: 'transferencias_documentales/*',
    element: (
      <TransferDocProvider>
        <TransferDocMainScreen />
      </TransferDocProvider>
    ),
  },
  { path: '/*', element: <Page404 /> },
];

export const ExpedientesRoutes = (): ReactElement => {
  return (
    <UserProvider>
      <MetadatosIndexacionProvider>
        <Routes>
          {routesConfig.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </MetadatosIndexacionProvider>
    </UserProvider>
  );
};
