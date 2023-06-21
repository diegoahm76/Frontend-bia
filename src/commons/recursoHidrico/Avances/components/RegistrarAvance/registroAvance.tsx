/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { Box, Button, Input, TextField } from '@mui/material';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { control_success } from '../../../requets/Request';
import { control_error } from '../../../../../helpers';
import { LoadingButton } from '@mui/lab';
import { agregar_avance } from '../../request/request';
import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegistroAvance: React.FC = () => {

  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue: set_value,
    formState: { errors },
  } = useForm();

  // fechaA
  const [fecha_reporte, set_fecha_reporte] = useState<Date | null>(new Date());
  const [is_saving, set_is_saving] = useState(false);
  const [file_name, set_file_name] = useState('');


  const handle_fecha_reporte_change = (date: Date | null): void => {
    set_value('fecha_reporte', date)
    set_fecha_reporte(date)
  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handle_file_select = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected_file =
      event.target.files != null ? event.target.files[0] : null;
    if (selected_file != null) {
      set_file_name(selected_file.name);
    }
  };
  const reset_file_state = (): void => {
    set_file_name('');
  };
  const on_submit: SubmitHandler<FieldValues> = async (data) => {
    try {
      set_is_saving(true);
      const fecha_reporte = dayjs(data.fecha_reporte).format('YYYY-MM-DD');
      const datos_avance = new FormData();

      datos_avance.append('accion', data.accion);
      datos_avance.append('fecha_reporte', fecha_reporte);
      datos_avance.append('descripcion', data.descripcion);
      datos_avance.append('evidencia', data.evidencia[0]);
      datos_avance.append('nombre_archivo', data.nombre_archivo);
      await agregar_avance(30, datos_avance);
      reset_file_state();
      set_is_saving(false);
      control_success('Se agregó avance correctamente');
    } catch (error) {
      set_is_saving(false);
      control_error(error);
    }
  };


  return (
    <>
      <Box component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(on_submit)}
      >
        <Grid container spacing={2} mt={0.1}>
          <Grid item xs={12}>
            <Title title=" REGISTRO DE AVANCE" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Acción"
              fullWidth
              size="small"
              margin="dense"
              required
              autoFocus
              {...register('accion', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
              <DatePicker
                label="Fecha Avance"
                inputFormat="YYYY/MM/DD"
                openTo="day"
                views={['year', 'month', 'day']}
                value={fecha_reporte}
                onChange={handle_fecha_reporte_change}
                renderInput={(params) => (
                  <TextField
                    required
                    fullWidth
                    size="small"
                    {...params}
                    {...register('fecha_reporte', { required: true })}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Descripcción"
              fullWidth
              size="small"
              margin="dense"
              required
              autoFocus
              {...register('descripcion', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              fullWidth
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              {file_name !== ''
                ? file_name
                : 'Seleccione archivo soporte'}
              <Input
                hidden
                type="file"
                required
                autoFocus
                style={{ opacity: 0 }}
                {...register('evidencia', {
                  required: 'Este campo es obligatorio',
                })}
                error={Boolean(errors.ruta_archivo_soporte)}
                onChange={handle_file_select}
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre Archivo"
              fullWidth
              size="small"
              margin="dense"
              required
              autoFocus
              {...register('nombre_archivo', { required: true })}
            />
          </Grid>
        </Grid >
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <LoadingButton
              variant="contained"
              color='success'
              size="large"
              type='submit'
              disabled={is_saving}
              loading={is_saving}
            >
              Agregar
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
