import { Route, Routes } from "react-router-dom";
import { MetasPgarScreen } from "../../MetasPGAR/screen/metasPGARScreen";
import { LineaBaseScreen } from "../../LineasBase/screen/LineaBaseScreen";
import { Page404 } from "../../../../screens/404";
import { UserProviderPlanes } from "../../Planes/context/context";
import { UserProviderPgar } from "../context/context";
import { ActividadPgarScreen } from "../../ActividadesPGAR/screen/ActividadPgarScreen";
import { IndicadorPgarScreen } from "../../IndicadoresPGAR/screen/IndicadorPgarScreen";
import { ArmonizacionPlanesScreen } from "../../ArmonizacionPlanesPGAR/screen/ArmonizacionPlanesScreen";
import { SeguimientoPgarScreen } from "../../SeguimientoPPGARComp/screen/SeguimientoPgarScreen";
import { TableroPgarObjetivoScreen } from "../../TablerosControlPGAR/GeneralPorObjetivo/screen/TableroPgarObjetivoScreen";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeguimientoPgarRoutes: React.FC = () => {
    return (
      <UserProviderPgar>
        <UserProviderPlanes>
          <Routes>
            <Route path="meta/*" element={<MetasPgarScreen />} />
            {/* <Route path="meta/*" element={<TableroPgarObjetivoScreen />} /> */}
            <Route path="linea_base/*" element={<LineaBaseScreen />} />
            <Route path="actividades/*" element={<ActividadPgarScreen />} />
            <Route path="indicadores/*" element={<IndicadorPgarScreen />} />
            <Route path="armonizacion_planes/*" element={<ArmonizacionPlanesScreen />} />
            <Route path="seguimiento/*" element={<SeguimientoPgarScreen />} />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </UserProviderPlanes>
      </UserProviderPgar>
    );
  };