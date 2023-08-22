import { Route, Routes } from 'react-router-dom';
import { OrganigramaRoutes } from '../organigrama/routes/OrganigramaRoutes';
import { CcdRoutes } from '../ccd/routes/CcdRoutes';
import { TrdRoutes } from '../trd/routes/TrdRoutes';
import { TcaRoutes } from '../tca/routes/TcaRoutes';
import { VentanillaRoutes } from '../ventanilla/routes/VentanillaRoutes';
import { Page404 } from '../../../screens/404';
import DepositoScreen from '../deposito/screens/depositoScreen';

const routes = [
  {
    path: "organigrama/",
    name: "organigrama",
    component: () => (
      <OrganigramaRoutes />
    ),
  },
  {
    path: "ccd/",
    name: "ccd",
    component: () => (
      <CcdRoutes />
    ),
  },
  {
    path: "trd/",
    name: "trd",
    component: () => (
      <TrdRoutes />
    ),
  },
  {
    path: "tca/",
    name: "tca",
    component: () => (
      <TcaRoutes />
    ),
  },
  {
    path: "deposito/",
    name: "deposito",
    component: () => (
      <DepositoScreen />
    ),
  },
  {
    path: "ventanilla_unica/",
    name: "ventanilla_unica",
    component: () => (
      <VentanillaRoutes />
    ),
  },
]
// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestorDocumentalRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={`${route.path}/${route.path === "/" ? "" : "*"}`}
          element={route.component()}
        />
      ))}
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
