/* eslint-disable @typescript-eslint/naming-convention */
import { Routes, Route } from 'react-router-dom';
import { AprobarDocumento } from '../screens/AprobarDocumento';
import { Page404 } from '../../../../../screens/404';


export const ActivacionComponentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/activacion" element={<AprobarDocumento />} />
      <Route path="/*" element={<Page404 />} />
      {/* Puedes agregar más rutas según tus necesidades */}
    </Routes>
  );
};

