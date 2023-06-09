/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line @typescript-eslint/naming-convention
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { OrganigramaScreen } from '../screens/OrganigramaScreen';


const routes = [
  {
    path: "crear/",
    name: "crear",
    component: () => (
      <OrganigramaScreen/>
    ),
  },
];


export const OrganigramaRoutes: React.FC = () => {
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
