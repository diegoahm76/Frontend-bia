import { Route, Routes } from 'react-router-dom';
import { RolScreen } from '../screen/RolScreen';
import { Page404 } from '../../../screens/404';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeguridadRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RolScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
