import { Route, Routes } from 'react-router-dom';
import { GestionHojaDeVidaRoutes } from '../gestionHojaDeVida/routes/GestionHojaDeVidaRoutes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestionDeInventarioRoutes: React.FC = () => {
  return (
    <Routes>
      <Route 
        path="gestion_hoja_vida/*"
        element={<GestionHojaDeVidaRoutes />}
      />
    </Routes>
  );
};
