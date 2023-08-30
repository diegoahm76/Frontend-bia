import { Route, Routes, Navigate } from 'react-router-dom';
import { AdminVentanilla } from '../registroPersonas/AdminVentanilla';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VentanillaRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/creacion_persona" element={<AdminVentanilla />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
}; // eslint-disable-next-line @typescript-eslint/naming-convention
