import { Route, Routes } from 'react-router-dom';
import { ConfiguracionRoutes } from '../configuracion/routes/ConfiguracionRoutes';
import { EntradaysalidArticulosRoutes } from '../entradaysalidaArticulos/routes/EntradaysalidaArticulosRoutes';
import { GestionDeInventarioRoutes } from '../gestionDeInventario/routes/GestionDeInventarioRoutes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AlmacenRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="configuracion/*" element={<ConfiguracionRoutes />} />
      <Route
        path="entradaysalidaArticulos/*"
        element={<EntradaysalidArticulosRoutes />}
      />
      <Route
        path="gestion_inventario/*"
        element={<GestionDeInventarioRoutes />}
      />
    </Routes>
  );
};
