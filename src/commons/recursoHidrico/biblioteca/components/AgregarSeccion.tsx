/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type React from 'react';
import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataContext } from '../context/contextData';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import { AgregarSubseccion } from './AgregarSubseccion';
import { row } from '../../../almacen/gestionDeInventario/gestionHojaDeVida/mantenimiento/interfaces/IProps';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarSeccion: React.FC = () => {
  const {
    register,
    watch,
    reset,
    setValue: set_value,
    errors,
    info_seccion,
    is_saving,
    is_register_subseccion,
    set_id_seccion,
    set_mode,
  } = useContext(DataContext);

  // watch
  const nombre_seccion = watch('nombre_seccion');
  const descripcion_seccion = watch('descripcion_seccion');

  const [current_date, set_current_date] = useState(
    dayjs().format('YYYY-MM-DD')
  );
  const [is_form_valid, set_is_form_valid] = useState(false);

  const check_form_validity = (): void => {
    const is_nombre_seccion_valid = nombre_seccion !== '';
    const is_descripcion_seccion_valid = descripcion_seccion !== '';

    set_is_form_valid(is_nombre_seccion_valid && is_descripcion_seccion_valid);
  };

  useEffect(() => {
    check_form_validity();
  }, [nombre_seccion, descripcion_seccion]);

  useEffect(() => {
    set_current_date(dayjs().format('YYYY-MM-DD'));
    set_value('fecha_creacion', current_date);
    set_value('fecha_creacion_subseccion', current_date);
  }, []);

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
          {...register('fecha_creacion')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Descripción sección"
          multiline
          fullWidth
          required
          autoFocus
          rows={3}
          value={descripcion_seccion}
          size="small"
          {...register('descripcion_seccion', { required: true })}
        />
      </Grid>
      <Stack
        justifyContent="flex-end"
        sx={{ m: '20px 20px 20px 20px' }}
        direction="row"
        spacing={2}
      >
        <Button
          variant="outlined"
          color="primary"
          disabled={!is_form_valid}
          onClick={() => {
            set_id_seccion(null);
            set_mode('register_subseccion');
          }}
        >
          Registrar nueva subsección
        </Button>
      </Stack>
      {is_register_subseccion && <AgregarSubseccion />}
      <Grid item spacing={2} justifyContent="end" container>
        <Grid item>
          <LoadingButton
            variant="outlined"
            color="primary"
            onClick={() => {
              reset();
            }}
          >
            Limpiar
          </LoadingButton>
        </Grid>

        <Grid item>
          <LoadingButton
            type="submit"
            variant="contained"
            color="success"
            disabled={is_saving}
            loading={is_saving}
          >
            Guardar
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};
