import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { CrearMarcaPorcentajeMedidaScreen } from '../screens/CrearMarcaPorcentajeMedidaScreen';
import { BodegaScreen } from '../screens/BodegaScreen';
import { CrearMarcaForm } from '../components/CrearMarcaForm';
import {CrearMedidaForm} from '../components/CrearMedidaForm';
import {CrearPorcentajeForm} from '../components/CrearPorcentajeForm';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="crear_marca_porcentaje_medida"
        element={<CrearMarcaPorcentajeMedidaScreen />}
      />
      
      <Route
        path="crear_bodega"
        element={<BodegaScreen />}
      />
      
      <Route
        path="crear_marca"
        element={<CrearMarcaForm />}
      />
       
       <Route
        path="crear_marca_unidad_medida"
        element={<CrearMedidaForm />}
      />
        <Route
        path="crear_marca_porcentajes"
        element={<CrearPorcentajeForm />}
      />


      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
