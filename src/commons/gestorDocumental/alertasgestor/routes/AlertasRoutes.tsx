import { Route, Routes, Navigate } from 'react-router-dom';
import { Selectalerta } from '../componentes/componentes/Selectalerta';
  
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Alertas_gestor_Routes: React.FC = () => {
  return (
    <Routes>
      <Route path="/alertas" element={< Selectalerta />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
  
