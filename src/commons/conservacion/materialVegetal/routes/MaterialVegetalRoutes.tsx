import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { IngresoCuarentenaScreen  } from '../screens/IngresoCuarentenaScreen';
import { LevantamientoCuarentenaScreen  } from '../screens/levantamientoCuarentenaScreen';
import { SiembraSemillasScreen,  } from '../screens/SiembraSemillasScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MaterialVegetalRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="siembra-semilla" element={<SiembraSemillasScreen/>} />
      <Route path="ingreso-cuarentena" element={<IngresoCuarentenaScreen/>} />
      <Route path="levantamiento-cuarentena" element={<LevantamientoCuarentenaScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
