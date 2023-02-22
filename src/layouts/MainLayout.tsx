import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import '../css/App.css';
import { HomeLayout } from './HomeLayout';
import { light_theme } from '../theme/LightTheme';
import { dark_theme } from '../theme/DarkTheme';
import { useMemo, useState } from 'react';

const color_mode_context = React.createContext({ toggleColorMode: () => {} });

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ToggleColorMode: React.FC = () => {
  const [mode, set_mode] = useState<'dark' | 'light'>('dark');
  const color_mode = useMemo(
    () => ({
      toggleColorMode: () => {
        set_mode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light' ? light_theme : dark_theme),
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
      }),
    [mode]
  );

  return (
    <color_mode_context.Provider value={color_mode}>
      <ThemeProvider theme={theme}>
        <HomeLayout />
      </ThemeProvider>
    </color_mode_context.Provider>
  );
};
