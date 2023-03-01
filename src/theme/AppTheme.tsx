import React, { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import * as locales from '@mui/material/locale';
import { light_theme } from '../theme/LightTheme';
import { dark_theme } from '../theme/DarkTheme';
import { useSelector } from 'react-redux';

type SupportedLocales = keyof typeof locales;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppTheme: any = ({ children }: any) => {
  const [locale] = React.useState<SupportedLocales>('esES');
  const { mod_dark } = useSelector(
    (state: {
      sidebar: {
        mod_dark: boolean;
      };
    }) => state.sidebar
  );

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode: mod_dark ? 'dark' : 'light',
            ...(mod_dark ? dark_theme : light_theme),
          },
          typography: {
            fontFamily: 'Roboto',
          },
          components: {
            MuiButton: {
              defaultProps: {
                style: {
                  textTransform: 'none' as const,
                  borderRadius: '0.5em',
                },
              },
            },
          },
        },
        locales[locale]
      ),
    [locale, mod_dark]
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
};
