import { Route, Routes, Navigate } from 'react-router-dom';
import { AnaliticaScreen  } from '../screens/AnaliticaScreen';
import { IndicadoresScreen  } from '../screens/IndicadoresScreen';
import { ReporteScreen  } from '../screens/ReporteScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReporteRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="analitica" element={<AnaliticaScreen/>} />
      <Route path="indicadores" element={<IndicadoresScreen/>} />
      <Route path="reportes" element={<ReporteScreen/>} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
