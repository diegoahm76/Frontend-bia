import { Route, Routes, Navigate } from 'react-router-dom';
import { PantallaPrincipalAdministracionPlantillaDocumentos } from '../screens/pantallaPrincipal';
import { MostrarCentroPlantillas } from '../screens/CentroPlantillas';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPlantillaDocumentos_Routes: React.FC = () => {
  return (
    <Routes>
      <Route path="/plantilladocumentos" element={<PantallaPrincipalAdministracionPlantillaDocumentos />} />
      <Route path="/centroplantillas" element={<MostrarCentroPlantillas />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};

