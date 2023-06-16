import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../../../screens/404';
import { EntregaBienesConsumoViveroScreen } from '../screens/EntregaBienesConsumoViveroScreen';
;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EntregaBienesRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="entrega_donaciones_resarcimientos_compensaciones_viveros" element={<EntregaBienesConsumoViveroScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
