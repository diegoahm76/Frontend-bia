import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './css/App.css';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const App: React.FC = () => {
  return (
    <AppTheme>
      <AppRouter />
      <ToastContainer />
    </AppTheme>
  );
};
