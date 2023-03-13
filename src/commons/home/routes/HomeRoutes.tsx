import { Route, Routes } from 'react-router-dom';
import { HomeScreen } from '../screens/HomeScreen';
import { Page404 } from '../../../screens/404';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HomeRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />

      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
