import { Route, Routes } from 'react-router-dom';
import { CuencaScreen } from '../Screen/CuencaScreen';
import { Page404 } from '../../../../screens/404';
import { PozosScreen } from '../Screen/PozosScreen';
import { ParametrosLabScreen } from '../Screen/ParametrosLabScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionesBasicasRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="cuencas" element={<CuencaScreen />} />
      <Route path="pozos" element={<PozosScreen />} />
      <Route path="parametros" element={<ParametrosLabScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
