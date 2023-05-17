import { Route, Routes } from "react-router-dom";
import { Page404 } from "../../../screens/404";
import { ConfiguracionRoutes } from "../configuracion/routes/ConfiguracionRoutes";
import { EntradaysalidArticulosRoutes } from "../gestionDeInventario/catalogoBienes/routes/EntradaysalidaArticulosRoutes";
// import { GestionDeInventarioRoutes } from "../gestionDeInventario/routes/GestionDeInventarioRoutes";
import { EntradaBienesAlmacenRoutes } from "../entradaDeAlmacen/routes/EntradaAlmacenRoutes";

import { ReportesIndicadoresAnaliticaRoutes } from "../reportesIndicadoresAnalitca/routes/ReportesIndicadoresAnaliticaRoutes";
import { GestionInventarioRoutes } from "../gestionDeInventario/gestionHojaDeVida/routes/GestionInventarioRoutes";
import { SolicitudDespachoScreen } from "../registroSolicitudesAlmacen/despacho/screens/SolicitudDespachoScreen";
import SolicitudConsumoScreen from "../registroSolicitudesAlmacen/solicitudBienConsumo/screens/solicitudBienConsumoScreen";


// import { ProgramacionManteniento } from "../gestionDeInventario/gestionHojaDeVida/mantenimiento/ProgramacionManteniento";

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
        path="entrada_almacen/*"
        element={<EntradaBienesAlmacenRoutes />}
      />

      <Route
        path="reportes_indicadores_analitica/*"
        element={<ReportesIndicadoresAnaliticaRoutes />}
      />

      {/* <Route
        path="programacion_mantenimiento"
        element={<ProgramacionManteniento />}
      /> */}
      <Route
        path="gestion_inventario/*"
        element={<GestionInventarioRoutes />}
      />
      <Route
        path="solicitud_consumo/*"
        element={<SolicitudConsumoScreen />}
      />
      <Route
        path="solicitud_despacho/*"
        element={<SolicitudDespachoScreen />}
      />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
