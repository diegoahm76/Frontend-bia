import { Navigate, Route, Routes } from 'react-router-dom';
import { CrearMarcaPorcentajeMedidaScreen } from '../screens/CrearMarcaPorcentajeMedidaScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="crear-marca-porcentaje-medida"
        element={<CrearMarcaPorcentajeMedidaScreen />}
      />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
