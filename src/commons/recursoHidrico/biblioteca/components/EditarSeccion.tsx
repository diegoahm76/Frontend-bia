/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { DataContext } from '../context/contextData';
import { LoadingButton } from '@mui/lab';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarSeccion: React.FC = () => {
  const {
    register,
    watch,
    setValue: set_value,
    errors,
    info_seccion,
    set_mode,
  } = useContext(DataContext);

  // watch
  const nombre_seccion = watch('nombre_seccion');
  const descripcion_seccion = watch('descripcion_seccion');

  useEffect(() => {
    if (info_seccion) {
      set_value('nombre_seccion', info_seccion.nombre);
      set_value('descripcion_seccion', info_seccion.descripcion);
    }
  }, [info_seccion]);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="subtitle1" fontWeight="bold">
          Sección
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Nombre sección"
          fullWidth
          required
          autoFocus
          size="small"
          value={nombre_seccion}
          {...register('nombre_seccion', { required: true })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Descripción sección"
          multiline
          fullWidth
          required
          autoFocus
          value={descripcion_seccion}
          size="small"
          {...register('descripcion_seccion', { required: true })}
        />
      </Grid>
      <Grid item spacing={2} justifyContent="end" container>
        <Grid item>
          <LoadingButton
            type="submit"
            variant="contained"
            color="success"
            // disabled={is_saving}
            // loading={is_saving}
            // startIcon={<SaveIcon />}
          >
            Actualizar
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};
