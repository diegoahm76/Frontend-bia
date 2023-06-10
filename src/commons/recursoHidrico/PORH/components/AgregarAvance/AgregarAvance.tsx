import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import esLocale from 'dayjs/locale/es';
// import AddIcon from '@mui/icons-material/Add';
// import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface IProps {
  register: any,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarAvance: React.FC<IProps> = ({
  register,
}:IProps) => {

  const [is_agregar, set_is_agregar] = useState(false);

  // fechas
  const [start_date, set_start_date] = useState<Date | null>(new Date());

  const handle_start_date_change = (date: Date | null): void => {
    set_start_date(date)
  };

  return (
    <>
      <Grid item xs={12}>
        <Title title="REGISTRO DE AVANCE" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="ACCIÓN"
          fullWidth
          size="small"
          margin="dense"
          required
          autoFocus
          {...register("accion", { required: true })}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
          <DatePicker
            label="Fecha de avance"
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
                {...register("fecha_avance", { required: true })}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Descripción"
          fullWidth
          size="small"
          margin="dense"
          required
          autoFocus
          type="text"
          multiline
          {...register("descripcion", { required: true })}
        />
      </Grid>
      <Grid item spacing={2} justifyContent="end" container>
        <Grid item>
          <LoadingButton
            variant="outlined"
            onClick={() => { set_is_agregar(true) }}
          >
            Agregar Nueva Actividad
          </LoadingButton>
        </Grid>
      </Grid>
      {is_agregar && (
        <>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Descripción de la actividad
            </Typography>
            {/* <Divider /> */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción de la actividad"
              fullWidth
              size="small"
              margin="dense"
              required
              autoFocus
              multiline
              {...register("descripcion", { required: true })}
            />
          </Grid>
        </>
      )}
    </>
  );
};
