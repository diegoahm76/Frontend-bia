import { Route, Routes, Navigate } from 'react-router-dom';
import { CcdScreen } from '../screens/CcdScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CcdRoutes: React.FC = () => {

  const routes = [
    {
      path: '',
      element: () => <CcdScreen />,
    },
    {
      path: '/*',
      element: () => <Navigate to={'/'} />,
    },
  ];

  return (
    <Routes>
      {
        routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element()}
          />
        ))
      }
    </Routes>
  );
};
