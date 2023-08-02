/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../../screens/404';



/*
const routes = [
  { path: '/datos_restringidos', element: <ActualizacionDatosRestringidosScreen /> },
  { path: '/administracion_personas', element: <AdminUsuariosScreen /> },
  { path: '/autorizacion_notificacion', element: <NotificacionPage /> },
]; */
export const ProcesosRoutes: React.FC = () => {
  return (
    <Routes>
     {/* {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))} */}
      <Route path="/traslado_masivo_unidad_por_entidad" element={<>  Traslado masico unidad por entidad </> } />
      <Route path="/traslado_masivo_unidad_a_unidad" element={<>  Traslado masivo de unidad a unidad </> } />
      
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
