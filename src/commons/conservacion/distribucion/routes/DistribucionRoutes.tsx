import { Route, Routes } from 'react-router-dom';
import { TrasladoScreen  } from '../screens/TrasladoScreen';
import { DespachoScreen  } from '../screens/DespachoScreen';
import { CierreSolicitudScreen } from '../screens/CierreSolicitudScreen';
import { Page404 } from '../../../../screens/404';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DistribucionRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="traslado" element={<TrasladoScreen/>} />
      <Route path="despacho" element={<DespachoScreen/>} />
      <Route path="cierre-solicitudes" element={<CierreSolicitudScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
