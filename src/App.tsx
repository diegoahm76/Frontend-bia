/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';
import 'react-toastify/dist/ReactToastify.css';
import './css/App.css';
import { useEffect } from 'react';

export const App = () => {



  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // ? se accede desde el servidor local
      // //  console.log('')('Estamos en desarrollo');
    } else if (process.env.NODE_ENV === 'production') {
      // ? se accede desde el servidor de producción (luego de hacer build) del proyecto
      // //  console.log('')('Estamos en producción!');
    }
  })

  return (
    <>

      <AppTheme>
        <AppRouter />
      </AppTheme>
    </>
  );
};
