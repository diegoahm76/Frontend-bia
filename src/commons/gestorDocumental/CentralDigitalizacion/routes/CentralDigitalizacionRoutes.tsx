import { Route, Routes, Navigate } from 'react-router-dom';
import { SolicitudesPendientesScreen } from '../screens/SolicitudesPendientesScreen';
import { SolicitudesRespondidasScreen } from '../screens/SolicitudesRespondidasScreen';
import { ListadoAnexosScreen } from '../screens/ListadoAnexosScreen';
import { OpcionOtrosProvider } from '../context/BusquedaOtrosDigitalizacion';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CentralDigitalizacionRoutes: React.FC = () => {
  return (
    <OpcionOtrosProvider>
    <Routes>
      <Route
        path="solicitudes_pendientes"
        element={<SolicitudesPendientesScreen />}
        />
      <Route
        path="solicitudes_respondidas"
        element={<SolicitudesRespondidasScreen />}
        />
      <Route path="anexos/:id" element={<ListadoAnexosScreen />} />
      {/* <Route path="crear_pqrsdf" element={<CrearPqrsdfScreen />} />
      <Route path="imprimir_radicado" element={<ImpresionRadicadoScreen />} /> */}
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
      </OpcionOtrosProvider>
  );
};
