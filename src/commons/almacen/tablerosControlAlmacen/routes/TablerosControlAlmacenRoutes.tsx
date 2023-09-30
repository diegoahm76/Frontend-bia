import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { TablerosControlAlmacenScreen } from '../screens/tablerosControlAlmacenScreen';
;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablerosControlAlmacenRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="almacen" element={<TablerosControlAlmacenScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
