/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Stack,
  IconButton,
  Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { DataContext } from '../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Title } from '../../../../components/Title';
import { LoadingButton } from '@mui/lab';
import { control_success } from '../../requets/Request';
import { control_error } from '../../../../helpers';
import { post_seccion_subscción } from '../request/request';
import { EditarSeccion } from './EditarSeccion';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeccionSubseccionMain: React.FC = () => {
  const {
    register,
    handleSubmit: handle_submit,
    watch,
    reset,
    setValue: set_value,
    errors,
    rows_subseccion,
    id_seccion,
    id_subseccion,
    info_seccion,
    info_subseccion,
    is_editar_seccion,
    fetch_data_subseccion_por_seccion,
    fetch_data_seccion,
    set_info_subseccion,
    set_id_seccion,
    set_id_subseccion,
    set_mode,
  } = useContext(DataContext);

  // watch
  const nombre_subseccion = watch('nombre_subseccion');
  const descripcion_subseccion = watch('descripcion_subseccion');

  const [current_date, set_current_date] = useState(
    dayjs().format('YYYY-MM-DD')
  );

  useEffect(() => {
    set_current_date(dayjs().format('YYYY-MM-DD'));
    set_value('fecha_creacion', current_date);
    set_value('fecha_creacion_subseccion', current_date);
  }, []);

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
