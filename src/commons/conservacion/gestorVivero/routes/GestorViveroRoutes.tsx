import { Route, Routes } from 'react-router-dom';
import { AdministrarViveroScreen  } from '../screens/AdministrarViveroScreen';
import { AperturaCierreViveroScreen  } from '../screens/AperturaCierreViveroScreen';
import { BajaHerramientaScreen,  } from '../screens/BajaHerramientaScreen';
import { CuarentenaViveroScreen,  } from '../screens/CuarentenaViveroScreen';
import { DespachoViveroScreen,  } from '../screens/DespachoViveroScreen';
import { AsignarResponsableViveroScreen  } from '../screens/AsignarResponsableVivero';
import { Page404 } from '../../../../screens/404';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestorViveroRoutes: React.FC = () => {
  return (
    
    <Routes>      
      <Route path="apertura_cierre/:id?" element={<AperturaCierreViveroScreen/>} />
      <Route path="cuarentena/:id?" element={<CuarentenaViveroScreen/>} />
      <Route path="administrar_viveros" element={<AdministrarViveroScreen/>} />
      <Route path="bajas" element={<BajaHerramientaScreen/>} />
      <Route path="recepcion_distribucion" element={<DespachoViveroScreen/>} />
      <Route path="viverista/:id?" element={<AsignarResponsableViveroScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
