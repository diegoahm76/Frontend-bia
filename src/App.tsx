import './css/App.css';
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const App: React.FC = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
