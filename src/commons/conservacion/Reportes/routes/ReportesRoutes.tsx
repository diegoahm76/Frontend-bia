import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { SubsistemaConservacionScreen } from '../screens/SubsistemaConservacion';
import { HistoricoMovimientosScreen } from '../screens/HistoricoMovimientos';
;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReportesRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="subsistema" element={<SubsistemaConservacionScreen/>} />
      <Route path="historicos" element={<HistoricoMovimientosScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
