import { Route, Routes } from "react-router-dom";
import { Page404 } from "../../../../../screens/404";
import { CatalogodeBienesScreen } from "../screens/CatalogodeBienesScreen";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EntradaysalidArticulosRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="catalogo_bienes" element={<CatalogodeBienesScreen />} />

      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
