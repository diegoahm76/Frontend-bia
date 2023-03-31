import { Route, Routes } from "react-router-dom";
import { Page404 } from "../../../../../screens/404";
import { CrearHojaVidaComputoScreen } from "../hojaDeVidaComputo/screens/CrearHojaVidaComputoScreen";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestionInventarioRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="cv_computo/*" element={<CrearHojaVidaComputoScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
