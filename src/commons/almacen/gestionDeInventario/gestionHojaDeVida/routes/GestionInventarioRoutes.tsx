import { Route, Routes } from "react-router-dom";
import { Page404 } from "../../../../../screens/404";
import { CrearHojaVidaComputoScreen } from "../hojaDeVidaComputo/screens/CrearHojaVidaComputoScreen";
import { ProgramacionMantenientoVehiculosScreen } from "../mantenimiento/components/MantenimientoVehiculos/ProgramacionManteniento";
import { CrearHojaVidaVehiculoScreen } from "../hojaDeVidaVehiculo/screens/CrearHojaVidaVehiculoScreen";
import { ProgramacionMantenientoComputadoresScreen } from "../mantenimiento/components/MantenimientoComputadores/ProgramacionManteniento";
import { ProgramacionMantenientoOtrosScreen } from "../mantenimiento/components/MantenimientoOtrosActivos/ProgramacionManteniento";
import { CrearHojaVidaOtrosActivosScreen } from "../hojaDeVidaOtrosActivos/screens/CrearHojaVidaOtrosActivoScreen"
import { RegistroMantenimientoComComponent } from "../mantenimiento/components/RegistroMantenimiento/RegistroMantenimientoCom";
import { RegistroMantenimientoVehComponent } from "../mantenimiento/components/RegistroMantenimiento/RegistroMantenimientoVeh";
import { RegistroMantenimientoOtrosComponent } from "../mantenimiento/components/RegistroMantenimiento/RegistroMantenimientoOtros";
import { EntregaBienesRoutes } from "../../movimientos/entregaDeComResDon/routes/EntregaBienesRoutes";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestionInventarioRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="cv_computo/*" element={<CrearHojaVidaComputoScreen />} />
      <Route path="mantenimiento_equipos/programacion_mantenimiento_vehiculos/*" element={<ProgramacionMantenientoVehiculosScreen />} />
      <Route path="mantenimiento_equipos/programacion_mantenimiento_computadores/*" element={<ProgramacionMantenientoComputadoresScreen />} />
      <Route path="mantenimiento_equipos/programacion_mantenimiento_otros_activos/*" element={<ProgramacionMantenientoOtrosScreen />} />
      <Route path="mantenimiento_equipos/ejecucion_mantenimiento_computadores/*" element={<RegistroMantenimientoComComponent />} />
      <Route path="mantenimiento_equipos/ejecucion_mantenimiento_vehiculos/*" element={<RegistroMantenimientoVehComponent />} />
      <Route path="mantenimiento_equipos/ejecucion_mantenimiento_otros_activos/*" element={<RegistroMantenimientoOtrosComponent />} />
      <Route path="cv_vehiculo/*" element={<CrearHojaVidaVehiculoScreen />} />
      <Route path="cv_otros_activos/*" element={<CrearHojaVidaOtrosActivosScreen />} />
      <Route path="movimientos/*" element={<EntregaBienesRoutes />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};