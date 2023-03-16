import { Route, Routes, Navigate } from 'react-router-dom';
import { NotificacionScreen  } from '../screens/NotificacionScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NotificacionRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="notificacion" element={<NotificacionScreen/>} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
