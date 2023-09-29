import { Route, Routes, Navigate } from 'react-router-dom';
import { ConfiguracionMediosSolicitudScreem } from '../screens/ConfiguracionMediosSolicitudScreem';




// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionMediosSolicitud_routes: React.FC = () => {
  return (
    <Routes>
      <Route path="/configuracionnnnnn" element={<ConfiguracionMediosSolicitudScreem/>} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
  
