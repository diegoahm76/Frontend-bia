import './css/App.css';
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';

// eslint-disable-next-line @typescript-eslint/naming-convention
const App: React.FC = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};

export default App;
