import { Route, Routes } from 'react-router-dom';
import { TrdScreen } from '../screens/TrdScreen';
import { Page404 } from '../../../../screens/404';
import { ModalProviderTRD } from '../context/ModalsContextTrd';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TrdRoutes: React.FC = () => {
  const routes = [
    {
      path: '',
      element: () => <TrdScreen />
    },
    {
      path: '/*',
      element: () => <Page404 />
    }
  ];

  return (
    <ModalProviderTRD>
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element()} />
      ))}
    </Routes>
    </ModalProviderTRD>
  );
};

// eslint-disable-next-line no-lone-blocks
{
  /*
      <Route path="" element={<TrdScreen />} />
      <Route path="/*" element={<Navigate to={'/404'} />} />
      <Route path="/*" element={<Page404 />} /> */
}
