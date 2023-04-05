import { Route, Routes } from "react-router-dom";
import { Page404 } from "../../../../../screens/404";
import { CrearHojaVidaComputoScreen } from "../hojaDeVidaComputo/screens/CrearHojaVidaComputoScreen";
import { ProgramacionMantenientoScreen } from "../mantenimiento/ProgramacionManteniento";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestionInventarioRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="cv_computo/*" element={<CrearHojaVidaComputoScreen />} />
      <Route path="programacion_mantenimiento/*" element={<ProgramacionMantenientoScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
