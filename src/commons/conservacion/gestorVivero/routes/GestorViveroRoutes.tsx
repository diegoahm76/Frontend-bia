import { Route, Routes, Navigate } from 'react-router-dom';
import { AdministrarViveroScreen  } from '../screens/AdministrarViveroScreen';
import { AperturaCierreViveroScreen  } from '../screens/AperturaCierreViveroScreen';
import { BajaHerramientaScreen,  } from '../screens/BajaHerramientaScreen';
import { CuarentenaViveroScreen,  } from '../screens/CuarentenaViveroScreen';
import { DespachoViveroScreen,  } from '../screens/DespachoViveroScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestorViveroRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="administrar_viveros" element={<AdministrarViveroScreen/>} />
      <Route path="apertura_cierre/:id?" element={<AperturaCierreViveroScreen/>} />
      <Route path="bajas" element={<BajaHerramientaScreen/>} />
      <Route path="cuarentena/:id?" element={<CuarentenaViveroScreen/>} />
      <Route path="recepcion_distribucion" element={<DespachoViveroScreen/>} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
