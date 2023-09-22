import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { ControlDeInventariosScreen } from '../screens/ControlDeInventariosScreen';
;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ControlDeInventariosRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="inventario" element={<ControlDeInventariosScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
