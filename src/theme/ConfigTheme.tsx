import { createTheme, type Theme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { light_theme } from '../theme/LightTheme';
import { dark_theme } from '../theme/DarkTheme';

export const use_theme = (): {
  custom_theme: Theme;
} => {
  const { mod_dark } = useSelector(
    (state: {
      layout: {
        mod_dark: boolean;
      };
    }) => state.layout
  );

  const custom_theme = useMemo(
    () =>
      createTheme({
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
              style: {},
            },
          },
        },
      }),
    [mod_dark]
  );

  return {
    custom_theme,
  };
};
