/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import React from 'react';
import { containerStyles } from '../../../../../../../tca/screens/utils/constants/constants';
import { stylesGrid } from '../../../../../../../permisosSeriesDoc/utils/styles';
import { useAppSelector } from '../../../../../../../../../hooks';

export const SecSubSeleccionada = (): JSX.Element => {
  //* redux states declarations
  const { currentPersistenciaSeccionSubseccion } = useAppSelector(
    (state) => state.HomologacionesSlice
  );

  const actual = ``

  //* se hace la condional por si el objeto no tiene valores con los que se pueda trabajar
  if (
    !currentPersistenciaSeccionSubseccion ||
    Object.keys(currentPersistenciaSeccionSubseccion).length === 0
  )
    return <></>;

  return (
    <Grid
      container
      sx={{
        ...containerStyles,
        mt: 4,
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12} sm={6} sx={stylesGrid}>
          <TextField
            fullWidth
            label="(Sección / Subsección) seleccionada (CCD actual)"
            size="small"
            variant="outlined"
            disabled={true}
            value={
              currentPersistenciaSeccionSubseccion?.cod_unidad_actual +
              ' / ' +
              currentPersistenciaSeccionSubseccion?.nom_unidad_actual
            }
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6} sx={stylesGrid}>
          <TextField
            fullWidth
            label="(Sección / Subsección) seleccionada (CCD nuevo)"
            size="small"
            variant="outlined"
            disabled={true}
            value={
              currentPersistenciaSeccionSubseccion?.cod_unidad_nueva +
              ' / ' +
              currentPersistenciaSeccionSubseccion?.nom_unidad_nueva
            }
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
