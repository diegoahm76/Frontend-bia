import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { use_theme } from './ConfigTheme';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppTheme: any = ({ children }: any) => {
  const { custom_theme } = use_theme();
  return (
    <>
      <ThemeProvider theme={custom_theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
};
