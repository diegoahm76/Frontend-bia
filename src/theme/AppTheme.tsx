import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { purple_theme } from './';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppTheme: any = ({ children }: any) => {
  return (
    <ThemeProvider theme={purple_theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
