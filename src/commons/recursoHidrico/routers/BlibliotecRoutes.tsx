import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../screens/404';
// import { IndexEstacionesScreen } from '../estaciones/screens';
import { PorhRoutes } from './../PORH/router/PorhRoutes';
import { AvancesRoutes } from '../Avances/router/AvancesRoutes';
import { BibliotecaRouter } from '../biblioteca/router/BibliotecaRouter';
import { AlertasRoutes } from '../alertas/router/AlertasRoutes';
import { ConsultaBibliotecaRoutes } from '../ConsultaBiblioteca/router/ConsultaBibliotecaRoutes';
import { InstrumentosRoutes } from '../Instrumentos/router/instrumentosRoutes';
import { ConfiguracionesBasicasRoutes } from '../configuraciones/Routes/ConfiguracionesBasicasRoutes';
import { SeguimientoControlRoutes } from '../SeguimientoAccionesCorrectivas/routes/SeguimientoControlRoutes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BlibliotecRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="porh/*" element={<PorhRoutes />} />
      <Route path="proyectos/*" element={<AvancesRoutes />} />
      <Route path="seguimiento_control/*" element={<SeguimientoControlRoutes />} />
      <Route path="registro/*" element={<BibliotecaRouter />} />
      <Route path="alertas/*" element={<AlertasRoutes />} />
      <Route path="consulta/*" element={<ConsultaBibliotecaRoutes />} />
      <Route path="instrumentos/*" element={<InstrumentosRoutes />} />
      <Route
        path="configuraciones_basicas/*"
        element={<ConfiguracionesBasicasRoutes />}
      />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
