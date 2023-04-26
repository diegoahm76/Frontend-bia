import { Route, Routes } from "react-router-dom";
import { Page404 } from "../../../../../screens/404";
import { CrearHojaVidaComputoScreen } from "../hojaDeVidaComputo/screens/CrearHojaVidaComputoScreen";
import { ProgramacionMantenientoVehiculosScreen } from "../mantenimiento/components/MantenimientoVehiculos/ProgramacionManteniento";
import { CrearHojaVidaVehiculoScreen } from "../hojaDeVidaVehiculo/screens/CrearHojaVidaVehiculoScreen";
import { ProgramacionMantenientoComputadoresScreen } from "../mantenimiento/components/MantenimientoComputadores/ProgramacionManteniento";
import { ProgramacionMantenientoOtrosScreen } from "../mantenimiento/components/MantenimientoOtrosActivos/ProgramacionManteniento";
import { CrearHojaVidaOtrosActivosScreen } from "../hojaDeVidaOtrosActivos/screens/CrearHojaVidaOtrosActivoScreen"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestionInventarioRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="cv_computo/*" element={<CrearHojaVidaComputoScreen />} />
      <Route path="programacion_mantenimiento_vehiculos/*" element={<ProgramacionMantenientoVehiculosScreen />} />
      <Route path="programacion_mantenimiento_computadores/*" element={<ProgramacionMantenientoComputadoresScreen />} />
      <Route path="programacion_mantenimiento_otros_activos/*" element={<ProgramacionMantenientoOtrosScreen />} />
      <Route path="cv_vehiculo/*" element={<CrearHojaVidaVehiculoScreen />} />
      <Route path="cv_otros_activos/*" element={<CrearHojaVidaOtrosActivosScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};