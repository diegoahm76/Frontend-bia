/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes, Navigate } from 'react-router-dom';
import { CcdScreen } from '../screens/CcdScreen';
import { ModalProvider } from '../context/ModalContext';

// eslint-disable-next-line @typescript-eslint/naming-convention
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

const CcdRoutesContent = () => {
  return (
    <ModalProvider>
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
    </ModalProvider>
  );
};

export const CcdRoutes: React.FC = () => {
  return <CcdRoutesContent />;
};
