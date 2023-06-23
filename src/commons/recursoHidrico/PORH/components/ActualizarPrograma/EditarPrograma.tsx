import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { GetPrograma } from '../../Interfaces/interfaces';

interface IProps {
  data: any;
  watch: any;
  register: any;
  set_value: any;
  set_data: (data: GetPrograma) => void;
  errors: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarPrograma: React.FC<IProps> = ({
  data,
  register,
  set_value,
  watch,
  set_data,
  errors,
}: IProps) => {
  const nombre = watch('nombre_programa');
  const [start_date, set_start_date] = useState<Date | null>(new Date());
  const [end_date, set_end_date] = useState<Date | null>(new Date());

  const start_date_valid = start_date !== null && start_date < new Date();
  const end_date_valid =
    end_date !== null && start_date !== null && end_date > start_date;

  const handle_start_date_change = (date: Date | null): void => {
    set_value('fecha_inicial', date);
    set_start_date(date);
  };

  const handle_end_date_change = (date: Date | null): void => {
    set_value('fecha_fin', date);
    set_end_date(date);
  };

  useEffect(() => {
    if (data !== undefined) {
      set_start_date(new Date(data.fecha_inicio));
      set_value('fecha_fin', data.fecha_fin);
      set_value('fecha_inicio', data.fecha_inicio);
      set_end_date(new Date(data.fecha_fin));
      set_value('nombre_programa', data.nombre);
    }
  }, [data !== undefined]);

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
        {' '}
        <Grid item xs={12}>
          <Title title=" EDICIÓN INFORMACIÓN DE PROGRAMA" />
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
              shouldDisableDate={(date) =>
                !start_date_valid && date >= new Date()
              }
              renderInput={(params) => (
                <TextField
                  required
                  fullWidth
                  size="small"
                  {...params}
                  {...register('fecha_inicial', {
                    required: true,
                  })}
                  error={Boolean(errors.fecha_inicial) || !start_date_valid}
                  helperText={
                    errors.fecha_inicial?.type === 'required'
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
    </>
  );
};
