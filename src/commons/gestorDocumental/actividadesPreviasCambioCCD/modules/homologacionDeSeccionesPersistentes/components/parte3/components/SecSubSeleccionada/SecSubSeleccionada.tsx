/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack, TextField } from '@mui/material';
import React from 'react';
import { containerStyles } from '../../../../../../../tca/screens/utils/constants/constants';
import { stylesGrid } from '../../../../../../../permisosSeriesDoc/utils/styles';
import { useAppDispatch, useAppSelector } from '../../../../../../../../../hooks';
import CleanIcon from '@mui/icons-material/CleaningServices';
import {
  setAgrupacionesPersistentesSerieSubserie,
  setAllElements,
  setCurrentPersistenciaSeccionSubseccion,
  setHomologacionAgrupacionesSerieSubserie,
} from '../../../../toolkit/slice/HomologacionesSeriesSlice';

export const SecSubSeleccionada = (): JSX.Element => {

  //* DISPATCH
  const dispatch = useAppDispatch()
  //* redux states declarations
  const { currentPersistenciaSeccionSubseccion } = useAppSelector(
    (state) => state.HomologacionesSlice
  );

  const cleanSeleccion = () => {
    dispatch(setCurrentPersistenciaSeccionSubseccion(null));
    dispatch(setHomologacionAgrupacionesSerieSubserie([]));
    dispatch(setAgrupacionesPersistentesSerieSubserie([]));
    dispatch(setAllElements({}))
  };

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
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ mb: '20px', mt: '20px' }}
        >
          <Button
            color="primary"
            variant="outlined"
            startIcon={<CleanIcon />}
            onClick={() => {
              // reset_all_trd();
              //  console.log('')('homa a resetear');
              cleanSeleccion();
            }}
          >
            LIMPIAR SELECCIÓN
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};
