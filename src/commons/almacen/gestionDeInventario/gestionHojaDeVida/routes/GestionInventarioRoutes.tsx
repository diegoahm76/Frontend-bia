import { Route, Routes } from "react-router-dom";
import { Page404 } from "../../../../../screens/404";
import { CrearHojaVidaComputoScreen } from "../hojaDeVidaComputo/screens/CrearHojaVidaComputoScreen";
import { CrearHojaVidaVehiculoScreen } from "../hojaDeVidaVehiculo/screens/CrearHojaVidaVehiculoScreen";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestionInventarioRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="cv_computo/*" element={<CrearHojaVidaComputoScreen />} />
      <Route path="cv_vehiculo/*" element={<CrearHojaVidaVehiculoScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
