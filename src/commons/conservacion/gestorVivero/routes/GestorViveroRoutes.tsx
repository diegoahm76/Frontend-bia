import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { AdministrarViveroScreen  } from '../screens/AdministrarViveroScreen';
import { AperturaCierreViveroScreen  } from '../screens/AperturaCierreViveroScreen';
import { BajaHerramientaScreen,  } from '../screens/BajaHerramientaScreen';
import { CuarentenaViveroScreen,  } from '../screens/CuarentenaViveroScreen';
import { DespachoViveroScreen,  } from '../screens/DespachoViveroScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestorViveroRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="administrar-viveros" element={<AdministrarViveroScreen/>} />
      <Route path="apertura-cierre" element={<AperturaCierreViveroScreen/>} />
      <Route path="bajas" element={<BajaHerramientaScreen/>} />
      <Route path="cuarentena" element={<CuarentenaViveroScreen/>} />
      <Route path="recepcion-distribucion" element={<DespachoViveroScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
