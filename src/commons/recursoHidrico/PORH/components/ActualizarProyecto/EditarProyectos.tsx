import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { TextField, } from '@mui/material';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
interface IProps {
  data: any;
  set_data: any;
  watch: any;
  register: any;
  set_value: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarProyecto: React.FC<IProps> = (
  { data,
    set_data,
    register,
    set_value,
    watch
  }:
    IProps) => {

  const nombre = watch('nombre');
  const inversion = watch('inversion');

  useEffect(() => {
    if (data !== undefined) {
      set_start_date(new Date(data.vigencia_inicial))
      set_value('vigencia_final', data.vigencia_final)
      set_value('vigencia_inicial', data.vigencia_inicial)
      set_end_date(new Date(data.vigencia_final))
      set_value('nombre', data.nombre)
      set_value('inversion', data.inversion)
    }
  }, [data !== undefined]);


  // fechas
  const [start_date, set_start_date] = useState<Date | null>(new Date());
  const [end_date, set_end_date] = useState<Date | null>(new Date());

  const handle_start_date_change = (date: Date | null): void => {
    set_value('vigencia_inicial', date)
    set_start_date(date)
  };

  const handle_end_date_change = (date: Date | null): void => {
    set_value('vigencia_final', date)
    set_end_date(date)
  };
  return (
    <>
      <Grid item xs={12}>
        <Title title="EDICIÓN INFORMACIÓN DE PROYECTO" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Nombre del proyecto"
          fullWidth
          size="small"
          margin="dense"
          required
          value={nombre}
          autoFocus
          {...register("nombre", { required: true })}
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
                {...register("vigencia_inicial", { required: true })}
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
                {...register("vigencia_final", { required: true })}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Inversión total"
          fullWidth
          size="small"
          margin="dense"
          required
          autoFocus
          value={inversion}
          type="text"
          {...register("inversion", { required: true })}
        />
      </Grid>
    </>
  );
};
