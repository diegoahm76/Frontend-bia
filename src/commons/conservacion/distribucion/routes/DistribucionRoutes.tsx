import { Route, Routes, Navigate } from 'react-router-dom';
import { TrasladoScreen  } from '../screens/TrasladoScreen';
import { DespachoScreen  } from '../screens/DespachoScreen';
import { CierreSolicitudScreen } from '../screens/CierreSolicitudScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DistribucionRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="traslado" element={<TrasladoScreen/>} />
      <Route path="despacho" element={<DespachoScreen/>} />
      <Route path="cierre_solicitudes" element={<CierreSolicitudScreen/>} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
