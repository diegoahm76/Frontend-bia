/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataContext } from '../../context/contextData';

interface IProps {
  fecha_inicial_programa: Date | null; // Fecha de inicio del programa
  fecha_fin_programa: Date | null; // Fecha de finalización del programa
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarProyectos: React.FC<IProps> = ({
  fecha_inicial_programa,
  fecha_fin_programa,
}: IProps) => {
  
  const {
    register,
    watch,
    setValue: set_value,
    errors,
  } = useContext(DataContext);

  const [is_agregar, set_is_agregar] = useState(false);

  const [start_date, set_start_date] = useState<Date | null>(new Date());
  const [end_date, set_end_date] = useState<Date | null>(new Date());

  const handle_start_date_change = (date: Date | null): void => {
    set_value('vigencia_inicial', date);
    set_start_date(date);
  };

  const handle_end_date_change = (date: Date | null): void => {
    set_value('vigencia_final', date);
    set_end_date(date);
  };


  const inversion_value: number = watch('inversion');
  const is_form_valid =
    !errors.nombre &&
    !errors.vigencia_inicial &&
    !errors.vigencia_final &&
    !errors.inversion &&
    watch('nombre') &&
    start_date &&
    end_date &&
    inversion_value;

  return (
    <>
      <Grid item xs={12}>
        <Title title="INFORMACIÓN DE PROYECTO" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Nombre del proyecto"
          fullWidth
          size="small"
          margin="dense"
          required
          {...register('nombre', { required: true })}
          error={Boolean(errors.nombre)}
          helperText={
            errors.nombre?.type === 'required'
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
            renderInput={(params) => (
              <TextField
                required
                fullWidth
                size="small"
                {...params}
                {...register('vigencia_inicial', { required: true })}
                error={
                  Boolean(errors.vigencia_inicial)
                }
                helperText={
                  errors.vigencia_inicial?.type === 'required'
                    ? 'Este campo es obligatorio'
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
            renderInput={(params) => (
              <TextField
                required
                fullWidth
                size="small"
                {...params}
                {...register('vigencia_final', { required: true })}
                error={Boolean(errors.vigencia_final)}
                helperText={
                  errors.vigencia_final?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
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
          type="number"
          {...register('inversion', { required: true, min: 0 })}
          error={Boolean(errors.inversion)}
          helperText={
            errors.inversion?.type === 'required'
              ? 'Este campo es obligatorio'
              : errors.inversion?.type === 'min'
              ? 'El valor no puede ser negativo'
              : ''
          }
        />
      </Grid>
      <Grid item spacing={2} justifyContent="end" container>
        <Grid item>
          <LoadingButton
            variant="outlined"
            onClick={() => {
              set_is_agregar(true);
            }}
            disabled={!is_form_valid}
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
              {...register('descripcion', { required: true })}
              error={Boolean(errors.descripcion)}
              helperText={
                errors.descripcion?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
            />
          </Grid>
        </>
      )}
    </>
  );
};
