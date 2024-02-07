import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { ConsultaPOAIScreen } from '../screens/ConsultaPOAIScreen';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultarPOAIRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="poai/"
        element={<ConsultaPOAIScreen />}
      />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};