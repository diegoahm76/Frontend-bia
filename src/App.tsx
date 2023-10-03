/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';
import 'react-toastify/dist/ReactToastify.css';
import './css/App.css';

export const App = () => {

  return (
    <>

      <AppTheme>
        <AppRouter />
      </AppTheme>
    </>
  );
};
