import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
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
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarPrograma: React.FC<IProps> = (
  {
    data,
    register,
    set_value,
    watch,
    set_data,
  }:
    IProps) => {

  const nombre = watch('nombre_programa');

  // fechas
  const [start_date, set_start_date] = useState<Date | null>(new Date());
  const [end_date, set_end_date] = useState<Date | null>(new Date());

  const handle_start_date_change = (date: Date | null): void => {
    set_value('fecha_inicial', date)
    set_start_date(date)
  };

  const handle_end_date_change = (date: Date | null): void => {
    set_value('fecha_fin', date)
    set_end_date(date)
  };

  useEffect(() => {
    if (data !== undefined) {
      console.log(data, 'data')
      set_start_date(new Date(data.fecha_inicio))
      set_value('fecha_fin', data.fecha_fin)
      set_value('fecha_inicio', data.fecha_inicio)
      set_end_date(new Date(data.fecha_fin))
      set_value('nombre_programa', data.nombre)
    }
  }, [data !== undefined]);

  return (
    <>
      <Grid container spacing={2} mt={0.1}>
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
            <DatePicker
              label="Fecha Inical"
              inputFormat="YYYY/MM/DD"
              openTo="day"
              views={['year', 'month', 'day']}
              value={start_date}
              onChange={handle_start_date_change}
              renderInput={(params) => (
                <TextField
                  required
                  fullWidth
                  size="small"
                  {...params}
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
              renderInput={(params) => (
                <TextField
                  required
                  fullWidth
                  size="small"
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid >
    </>
  );
};
