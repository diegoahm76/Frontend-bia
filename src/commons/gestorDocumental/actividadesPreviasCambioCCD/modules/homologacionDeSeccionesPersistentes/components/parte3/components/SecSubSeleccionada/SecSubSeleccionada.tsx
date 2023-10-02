/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import React from 'react';
import { containerStyles } from '../../../../../../../tca/screens/utils/constants/constants';
import { stylesGrid } from '../../../../../../../permisosSeriesDoc/utils/styles';

export const SecSubSeleccionada = (): JSX.Element => {
  return (
    <Grid container sx={{
      ...containerStyles,
      mt: 4,
    }}>
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12} sm={7} sx={stylesGrid}>
          <TextField
            fullWidth
            label="(Sección / Subsección) seleccionada (CCD actual / CCD nuevo)"
            size="small"
            variant="outlined"
            disabled={true}
            value={''}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
