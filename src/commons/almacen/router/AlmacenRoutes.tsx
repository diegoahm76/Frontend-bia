import { Route, Routes } from "react-router-dom";
import { Page404 } from "../../../screens/404";
import { ConfiguracionRoutes } from "../configuracion/routes/ConfiguracionRoutes";
import { EntradaysalidArticulosRoutes } from "../entradaysalidaArticulos/routes/EntradaysalidaArticulosRoutes";
import { ProgramacionManteniento } from "../gestionDeInventario/gestionHojaDeVida/mantenimiento/ProgramacionManteniento";
import { GestionInventarioRoutes } from "../gestionDeInventario/gestionHojaDeVida/routes/GestionInventarioRoutes";
// import { GestionInventarioRoutes } from "../gestionDeInventario/gestionHojaDeVida/routes/GestionInventarioRoutes";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AlmacenRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="configuracion/*" element={<ConfiguracionRoutes />} />
      <Route
        path="entrada_salida_articulos/*"
        element={<EntradaysalidArticulosRoutes />}
      />
      <Route
        path="programacion_mantenimiento"
        element={<ProgramacionManteniento />}
      />
      <Route
        path="gestion_inventario/*"
        element={<GestionInventarioRoutes />}
      />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
