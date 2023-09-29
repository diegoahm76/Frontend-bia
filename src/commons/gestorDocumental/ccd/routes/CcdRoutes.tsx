/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes, Navigate } from 'react-router-dom';
import { CcdScreen } from '../screens/CcdScreen';
import { ModalProvider } from '../context/ModalContext';
import { Page404 } from '../../../../screens/404';
import { ScreenPerSerDoc as PermisosSobreSeriesDocumentales } from '../../permisosSeriesDoc/screens/ScreenPerSerDoc';
import { ScreenControlAccExp as ControlAccesoExpedientes } from '../../controlAccesExped/screens/ScreenControlAccExp';
import { ModalProviderPSD } from '../../permisosSeriesDoc/context/ModalContextPSD';
import { ActividadesPreviasCambioCCDRoutes } from '../../actividadesPreviasCambioCCD/routes/ActividadesPreviasCambioCCD.routes';

// eslint-disable-next-line @typescript-eslint/naming-convention
const routes = [
  {
    path: '',
    element: () => <CcdScreen />
  },
  {
    path: '/*',
    element: () => <Page404 />
  },
  {
    path: 'permisos_sobre_series_documentales/',
    element: () => <PermisosSobreSeriesDocumentales />
  },
  {
    path: 'control_acceso_expedientes/',
    element: () => <ControlAccesoExpedientes />
  },
  {
    path: '/actividades_previas_cambio_ccd/*',
    element: () => <ActividadesPreviasCambioCCDRoutes/>,
  }
];

const CcdRoutesContent = () => {
  return (
    <ModalProviderPSD>
      <ModalProvider>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element()} />
          ))}
        </Routes>
      </ModalProvider>
    </ModalProviderPSD>
  );
};

export const CcdRoutes: React.FC = () => {
  return <CcdRoutesContent />;
};
