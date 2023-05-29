import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { ArriendoVehiculosScreen } from '../screens/ArriendoVehiculosScreen';
;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionVehiculosRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="arriendo_vehiculos" element={<ArriendoVehiculosScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
