import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { AgregarProyectos } from '../AgregarProyectos/AgregarProyectos';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import esLocale from 'dayjs/locale/es';
import { LoadingButton } from '@mui/lab';
// import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarPrograma: React.FC = () => {

  const [is_agregar, set_is_agregar] = useState(false);

  // fechas
  const [start_date, set_start_date] = useState<Date | null>(new Date());
  const [end_date, set_end_date] = useState<Date | null>(new Date());

  const handle_start_date_change = (date: Date | null): void => {
    set_start_date(date)
  };

  const handle_end_date_change = (date: Date | null): void => {
    set_end_date(date)
  };

  return (
    <>
      <Grid container spacing={2} mt={0.1}>
        <Grid item xs={12}>
          <Title title="INFORMACIÓN DE PROGRAMA" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre del programa"
            fullWidth
            size="small"
            margin="dense"
            required
            autoFocus
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
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <LoadingButton
              variant="outlined"
              onClick={() => { set_is_agregar(true) }}
            >
              Agregar Nuevo Proyecto
            </LoadingButton>
          </Grid>
          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              color="success"
            // loading={is_saving}
            // disabled={is_saving}
            >
              Guardar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid >
      <Grid container spacing={2} mt={0.1}>
        {is_agregar && (
          <>
            <AgregarProyectos />
          </>
        )}
      </Grid>
    </>
  );
};
