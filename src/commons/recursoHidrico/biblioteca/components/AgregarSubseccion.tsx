/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { DataContext } from '../context/contextData';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarSubseccion: React.FC = () => {
  const {
    register,
    watch,
    reset,
    setValue: set_value,
    id_seccion,
    fetch_data_subseccion_por_seccion,
  } = useContext(DataContext);

  // watch
  const nombre_subseccion = watch('nombre_subseccion');
  const descripcion_subseccion = watch('descripcion_subseccion');

  const [current_date, set_current_date] = useState(
    dayjs().format('YYYY-MM-DD')
  );

  useEffect(() => {
    void fetch_data_subseccion_por_seccion();
  }, [id_seccion]);

  useEffect(() => {
    set_current_date(dayjs().format('YYYY-MM-DD'));
    set_value('fecha_creacion_subseccion', current_date);
  }, []);

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
      <Grid item xs={12} sm={6}>
        <TextField
          label="Fecha"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={current_date}
          disabled
          fullWidth
          required
          autoFocus
          size="small"
          {...register('fecha_creacion_subseccion')}
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
            //   disabled={is_saving}
            //   loading={is_saving}
            // startIcon={<SaveIcon />}
          >
            Guardar
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};
