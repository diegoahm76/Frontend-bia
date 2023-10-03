import { Route, Routes, Navigate } from 'react-router-dom';
import { PantallaPrincipalAdministracionPlantillaDocumentos } from '../screens/pantallaPrincipal';
import { MostrarCentroPlantillas } from '../screens/CentroPlantillas';
import { Form_provaider } from '../context/CreaccionPlantillaContex';



// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPlantillaDocumentos_Routes: React.FC = () => {
  return (
    <Form_provaider>
    <Routes>
      <Route path="/plantilladocumentos" element={<PantallaPrincipalAdministracionPlantillaDocumentos />} />
      <Route path="/centroplantillas" element={<MostrarCentroPlantillas />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
    </Form_provaider>
  );
};

