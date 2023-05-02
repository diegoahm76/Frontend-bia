import { createTheme, type Theme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { esES as dataGridesES } from '@mui/x-data-grid';
import { esES as coreesES } from '@mui/material/locale';
import { esES as dataPickersesES } from '@mui/x-date-pickers';

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
    (): any =>
      createTheme(
        {
          palette: {
            primary: {
              main: '#042F4A',
            },
          },
          typography: {
            fontFamily: 'Roboto',
          },
          components: {},
        },
        dataPickersesES, // x-date-pickers translations
        dataGridesES, // x-data-grid translations
        coreesES // core translations
      ),
    [mod_dark]
  );

  return {
    custom_theme,
  };
};
