import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../screens/404';
import { ConfiguracionRoutes } from '../configuracion/routes/ConfiguracionRoutes';
import { EntradaysalidArticulosRoutes } from '../gestionDeInventario/catalogoBienes/routes/EntradaysalidaArticulosRoutes';
// import { GestionDeInventarioRoutes } from "../gestionDeInventario/routes/GestionDeInventarioRoutes";
import { EntradaBienesAlmacenRoutes } from '../entradaDeAlmacen/routes/EntradaAlmacenRoutes';

import { ReportesIndicadoresAnaliticaRoutes } from '../reportesIndicadoresAnalitca/routes/ReportesIndicadoresAnaliticaRoutes';
import { GestionInventarioRoutes } from '../gestionDeInventario/gestionHojaDeVida/routes/GestionInventarioRoutes';
import SolicitudConsumoScreen from '../registroSolicitudesAlmacen/solicitudBienConsumo/screens/solicitudBienConsumoScreen';
import { AdministracionVehiculosRoutes } from '../administracionDeVehiculos/routes/AdministracionVehiculosRoutes';
import AprobacionSolicitudConsumoScreen from '../registroSolicitudesAlmacen/solicitudBienConsumo/screens/aprobacionSolicitudConsumoScreen';
import DespachoBienesConsumoScreen from '../registroSolicitudesAlmacen/despacho/screens/despachoSolicitudScreen';
import SolicitudConsumoViveroScreen from '../registroSolicitudesAlmacen/solicitudBienConsumo/screens/solicitudConsumoViveroScreen';
import AprobacionSolicitudViveroScreen from '../registroSolicitudesAlmacen/solicitudBienConsumo/screens/aprobacionSolicitudViveroScreen';
import RechazoSolicitudScreen from '../registroSolicitudesAlmacen/despacho/screens/rechazoSolicitudScreen';
import EntregaScreen from '../gestionDeInventario/movimientos/screens/entregasOtrasScreen';
import { ControlDeInventariosRoutes } from '../controlDeInventario/routes/ControlDeInventariosRoutes';
import { TablerosControlAlmacenRoutes } from '../tablerosControlAlmacen/routes/TablerosControlAlmacenRoutes';
import SolicitudViaje from '../solicitudDeViaje/screens/SolicitudViaje';
import AsignacionVehiculos from '../asignacionDeVehiculos/screens/AsignacionVehiculos';
import InspeccionVehiculos from '../inspeccionVehiculos/screens/InspeccionVehiculos';
import BitacoraViajes from '../bitacoraViaje/screens/BitacoraViajes';
import AgendamientoVehiculos from '../agendamientoVehiculos/screens/AgendamientoVehiculos';
import NovedadesInspeccionVehiculos from '../revisionDeInspeccion/screens/NovedadesInspeccionVehiculos';
import BajaActivos from '../bajaDeActivos/screens/BajaActivos';
import SolicitudActivos from '../solicitudDeActivos/screens/SolicitudActivos';
import AutorizacionSolicitudActivos from '../autorizacion_solicitud_activos/screens/AutorizacionSolicitudActivos';
import SalidaEspecialActivos from '../salida_especial_activos/screens/SalidaEspecialActivos';
import DevolucionActivos from '../devolucion_activos/screens/DevolucionActivos';
import DespachoSolicitudes from '../despacho_solicitudes/screens/DespachoSolicitudes';

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
        path="administracion_vehiculo/*"
        element={<AdministracionVehiculosRoutes />}
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
        path="control/*"
        element={<ControlDeInventariosRoutes />}
      />
      <Route
        path="tableros_control/*"
        element={<TablerosControlAlmacenRoutes />}
      />
      <Route path="solicitud_consumo/*" element={<SolicitudConsumoScreen />} />
      <Route
        path="solicitud_consumo_vivero/*"
        element={<SolicitudConsumoViveroScreen />}
      />
      <Route
        path="aprobacion_solicitud_consumo/*"
        element={<AprobacionSolicitudConsumoScreen />}
      />
      <Route
        path="aprobacion_solicitud_consumo_vivero/*"
        element={<AprobacionSolicitudViveroScreen />}
      />
      <Route
        path="despacho_solicitud_aprobada/*"
        element={<DespachoBienesConsumoScreen />}
      />
      <Route
        path="rechazo_solicitudes/*"
        element={<RechazoSolicitudScreen />}
      />
      <Route
        path="solicitud_viajes/*"
        element={<SolicitudViaje />}
      />
      <Route
        path="asignacion_vehiculos/*"
        element={<AsignacionVehiculos />}
      />
      <Route
        path="inspeccion_vehiculos/*"
        element={<InspeccionVehiculos />}
      />
      <Route
        path="bitacora_viajes/*"
        element={<BitacoraViajes />}
      />
      <Route
        path="agendamiento_vehiculos/*"
        element={<AgendamientoVehiculos />}
      />
      <Route
        path="revision_inspeccion/*"
        element={<NovedadesInspeccionVehiculos />}
      />
      <Route
        path="baja_activos/*"
        element={<BajaActivos />}
      />
      <Route
        path="solicitud_activos/*"
        element={<SolicitudActivos />}
      />
      <Route
        path="autorizacion_solicitud_activos/*"
        element={<AutorizacionSolicitudActivos />}
      />
      <Route
        path="salida_especial_activos/*"
        element={<SalidaEspecialActivos />}
      />
      <Route
        path="devolucion_activos/*"
        element={<DevolucionActivos />}
      />
      <Route
        path="despacho_solicitudes/*"
        element={<DespachoSolicitudes />}
      />
      <Route
        path="otras_entregas/*"
        element={<EntregaScreen />}
      />

      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
