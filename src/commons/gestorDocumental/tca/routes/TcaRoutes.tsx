import { Route, Routes, Navigate } from 'react-router-dom';
import { TcaScreen } from '../screens/TcaScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TcaRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/tca" element={<TcaScreen />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
