import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../../screens/404';
import { VinculacionColaboradoresScreen } from '../screens/VinculacionColaboradores';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VinculacionColaboradoresRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="vinculacion" element={<VinculacionColaboradoresScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};

// gestor_documental/vinculacion_colaboradores/vinculacion
