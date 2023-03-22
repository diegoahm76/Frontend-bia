import { Route, Routes, Navigate } from 'react-router-dom';
import { IngresoCuarentenaScreen  } from '../screens/IngresoCuarentenaScreen';
import { LevantamientoCuarentenaScreen  } from '../screens/levantamientoCuarentenaScreen';
import { SiembraSemillasScreen,  } from '../screens/SiembraSemillasScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MaterialVegetalRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="siembra_semilla" element={<SiembraSemillasScreen/>} />
      <Route path="ingreso_cuarentena" element={<IngresoCuarentenaScreen/>} />
      <Route path="levantamiento_cuarentena" element={<LevantamientoCuarentenaScreen/>} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
