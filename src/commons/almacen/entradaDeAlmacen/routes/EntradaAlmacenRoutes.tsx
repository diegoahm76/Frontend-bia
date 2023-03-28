import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { EntradaBienesAlmacenScreen  } from '../screens/EntradaBienesAlmacenScreen';
;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EntradaBienesAlmacenRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="entrada_bienes_almacen" element={<EntradaBienesAlmacenScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
