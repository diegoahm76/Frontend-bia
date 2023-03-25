import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { ReportesScreen  } from '../screens/ReportesScreen';
import { IndicadoresScreen  } from '../screens/IndicadoresScreen';
import { AnaliticaScreen  } from '../screens/AnaliticaScreen';
;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReportesIndicadoresAnaliticaRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="reportes" element={<ReportesScreen/>} />
      <Route path="indicadores" element={<IndicadoresScreen/>} />
      <Route path="analitica" element={<AnaliticaScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
