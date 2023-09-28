import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { ControlDespachoBienesScreen } from '../screens/controlDespachoBienesScreen';
;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ControlDespachosBienesConsumoRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="bienes_consumo" element={<ControlDespachoBienesScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
