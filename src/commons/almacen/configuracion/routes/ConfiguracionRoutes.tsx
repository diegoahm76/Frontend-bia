import {Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { CrearMarcaPorcentajeMedidaScreen } from '../screens/CrearMarcaPorcentajeMedidaScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="crear_marca_porcentaje_medida"
        element={<CrearMarcaPorcentajeMedidaScreen />}
      />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
