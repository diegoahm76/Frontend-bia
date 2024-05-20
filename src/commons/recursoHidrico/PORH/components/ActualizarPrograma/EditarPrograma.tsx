/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataContext } from '../../context/contextData';
import dayjs, { type Dayjs } from 'dayjs';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarPrograma: React.FC = () => {
  const {
    register,
    // reset,
    watch,
    setValue: set_value,
    errors,
    data_programa,
    is_saving,
  } = useContext(DataContext);

  const nombre = watch('nombre_programa');
  const [start_date, set_start_date] = useState<Dayjs | null>(null);
  const [end_date, set_end_date] = useState<Dayjs | null>(null);

  const start_date_valid = start_date !== null && start_date;
  const end_date_valid =
    end_date !== null && start_date !== null && end_date > start_date;

  const handle_start_date_change = (date: Dayjs | null): void => {
    set_value('fecha_inicio', dayjs(date));
    set_start_date(dayjs(date));
  };

  const handle_end_date_change = (date: Dayjs | null): void => {
    set_value('fecha_fin', dayjs(date));
    set_end_date(dayjs(date));
  };

  useEffect(() => {
    if (data_programa) {
      //  console.log('')(data_programa, 'data_programa');
      set_start_date(dayjs(data_programa.fecha_inicio));
      set_value('fecha_fin', data_programa.fecha_fin);
      set_value('fecha_inicio', data_programa.fecha_inicio);
      set_end_date(dayjs(data_programa.fecha_fin));
      set_value('nombre_programa', data_programa.nombre);
      set_value('nombre', data_programa.nombre);
    }
  }, [data_programa]);

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          p: '0px',
          m: '0 0 0 0',
          mb: '0px',
        }}
      >
        <Grid item xs={12}>
          <Title title=" Edición información de programa" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre del programa"
            fullWidth
            size="small"
            margin="dense"
            required
            name="nombre"
            value={nombre}
            autoFocus
            {...register('nombre_programa', { required: true })}
            error={Boolean(errors.nombre_programa)}
            helperText={
              errors.nombre_programa?.type === 'required'
                ? 'Este campo es obligatorio'
                : ''
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
            <DatePicker
              label="Fecha Inicial"
              inputFormat="YYYY/MM/DD"
              openTo="day"
              views={['year', 'month', 'day']}
              value={start_date}
              onChange={handle_start_date_change}
              shouldDisableDate={(date) => !start_date_valid && date >= dayjs()}
              renderInput={(params) => (
                <TextField
                  required
                  fullWidth
                  size="small"
                  {...params}
                  {...register('fecha_inicio', {
                    required: true,
                  })}
                  error={Boolean(errors.fecha_inicio) || !start_date_valid}
                  helperText={
                    errors.fecha_inicio?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : !start_date_valid
                      ? 'La fecha de inicio es posterior o igual a la fecha de finalización'
                      : ''
                  }
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
            <DatePicker
              label="Fecha Final"
              inputFormat="YYYY/MM/DD"
              openTo="day"
              views={['year', 'month', 'day']}
              value={end_date}
              onChange={handle_end_date_change}
              // shouldDisableDate={(date) => !end_date_valid && date >= start_date}
              renderInput={(params) => (
                <TextField
                  required
                  fullWidth
                  size="small"
                  {...params}
                  {...register('fecha_fin', {
                    required: true,
                  })}
                  error={Boolean(errors.fecha_fin) || !end_date_valid}
                  helperText={
                    errors.fecha_fin?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : !end_date_valid
                      ? 'La fecha de finalización es anterior o igual a la fecha de inicio'
                      : ''
                  }
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid item spacing={2} justifyContent="end" container>
        <Grid item>
          <LoadingButton
            variant="contained"
            color="success"
            type="submit"
            startIcon={<SaveIcon />}
            disabled={is_saving}
            loading={is_saving}
          >
            Actualizar
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};
