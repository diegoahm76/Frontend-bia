import { Route, Routes, Navigate } from 'react-router-dom';
import { CrearComplementoPqrsdfScreen } from '../screens/CrearComplementoPqrsdfScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ComplementoPqrsdfRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="crear_complemento/:id?"
        element={<CrearComplementoPqrsdfScreen />}
      />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
