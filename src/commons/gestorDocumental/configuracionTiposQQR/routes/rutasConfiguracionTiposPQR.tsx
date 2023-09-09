import { Route, Routes, Navigate } from 'react-router-dom';
import { PantallaPrinciipalConfiguracionPQR } from '../screens/PantallaPrinciipalConfiguracionPQR';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PQR_Configuracion_Routes: React.FC = () => {
  return (
    <Routes>
      <Route path="/configuracion_pqr" element={< PantallaPrinciipalConfiguracionPQR />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
  
