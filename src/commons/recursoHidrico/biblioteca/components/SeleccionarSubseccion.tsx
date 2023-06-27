/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type React from 'react';
import { useContext, useEffect } from 'react';
import {
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { DataContext } from '../context/contextData';
import { LoadingButton } from '@mui/lab';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeleccionarSubseccion: React.FC = () => {
  const {
    register,
    watch,
    reset,
    setValue: set_value,
    info_subseccion,
  } = useContext(DataContext);

  const nombre_subseccion = watch('nombre_subseccion');
  const descripcion_subseccion = watch('descripcion_subseccion');


  useEffect(() => {
    if (info_subseccion) {
      set_value('nombre_subseccion', info_subseccion.nombre);
      set_value('descripcion_subseccion', info_subseccion.descripcion);
    }
  }, [info_subseccion]);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="subtitle1" fontWeight="bold">
          Información subsección
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Nombre subsección"
          fullWidth
          required
          autoFocus
          size="small"
          value={nombre_subseccion}
          {...register('nombre_subseccion', { required: true })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Descripción subsección"
          multiline
          fullWidth
          required
          autoFocus
          size="small"
          value={descripcion_subseccion}
          {...register('descripcion_subseccion', { required: true })}
        />
      </Grid>
      <Grid item spacing={2} justifyContent="end" container>
        <Grid item>
          <LoadingButton
            variant="outlined"
            color="primary"
            onClick={() => {
              reset();
            }}
            // startIcon={<SaveIcon />}
          >
            Limpiar
          </LoadingButton>
        </Grid>

        <Grid item>
          <LoadingButton
            type="submit"
            variant="contained"
            color="success"
            // disabled={is_saving}
            // loading={is_saving}
            // startIcon={<SaveIcon />}
          >
            Guardar
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};
