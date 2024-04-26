import { Route, Routes } from "react-router-dom";
import { Page404 } from "../../../../screens/404";
import { UserProviderPlanes } from "../../Planes/context/context";
import { TableroPgarScreen } from "../../TablerosControlPGAR/GeneralPorObjetivo/screen/TableroPgarScreen";
import { UserProviderPgar } from "../../SeguimientoPGAR/context/context";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablerosControlRoutes: React.FC = () => {
    return (
      <UserProviderPgar>
        <UserProviderPlanes>
          <Routes>
            <Route path="tableros_pgar/*" element={<TableroPgarScreen />} />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </UserProviderPlanes>
      </UserProviderPgar>

    );
  };