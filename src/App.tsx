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
      console.log('Estamos en desarrollo, siuuuu!');
    } else if (process.env.NODE_ENV === 'production') {
      console.log('Estamos en producción!');
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
