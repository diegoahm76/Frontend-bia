import { Route, Routes } from 'react-router-dom';
import { CuencaScreen } from '../Screen/CuencaScreen';
import { Page404 } from '../../../../screens/404';
import { ODSScreen } from '../Screen/ODSScreenScreen';
import { TipoEjeScreen } from '../Screen/TipoEjeScreen';
import { EntidadesScreen } from '../Screen/EntidadesScreen';
import { MedidasScreen } from '../Screen/MedidasScreen';
import { TiposScreen } from '../Screen/TiposScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionesBasicasRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="cuencas/*" element={<CuencaScreen />} />
      <Route path="ods/*" element={<ODSScreen />} />
      <Route path="tipo_eje/*" element={<TipoEjeScreen />} />
      <Route path="entidades/*" element={<EntidadesScreen />} />
      <Route path="medidas/*" element={<MedidasScreen />} />
      <Route path="tipos/*" element={<TiposScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
