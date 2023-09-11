import { Route, Routes, Navigate } from 'react-router-dom';
import { PantallaPrincipalAdministracionPlantillaDocumentos } from '../screens/pantallaPrincipal';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPlantillaDocumentos_Routes: React.FC = () => {
  return (
    <Routes>
      <Route path="/plantilladocumentos" element={<PantallaPrincipalAdministracionPlantillaDocumentos/>} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
  
