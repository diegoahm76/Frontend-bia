import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { NotificacionScreen  } from '../screens/NotificacionScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NotificacionRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="notificacion" element={<NotificacionScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
