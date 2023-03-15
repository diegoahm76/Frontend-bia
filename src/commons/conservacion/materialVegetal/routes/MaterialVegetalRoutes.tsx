import { Route, Routes, Navigate } from 'react-router-dom';
import { IngresoCuarentenaScreen  } from '../screens/IngresoCuarentenaScreen';
import { LevantamientoCuarentenaScreen  } from '../screens/LevantamientoCuarentenaScreen';
import { SiembraSemillasScreen,  } from '../screens/SiembraSemillasScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MaterialVegetalRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="siembra-semilla" element={<SiembraSemillasScreen/>} />
      <Route path="ingreso-cuarentena" element={<IngresoCuarentenaScreen/>} />
      <Route path="levantamiento-cuarentena" element={<LevantamientoCuarentenaScreen/>} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
