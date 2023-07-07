/* eslint-disable @typescript-eslint/naming-convention */
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

interface IProps {
  data: any;
}

export const EditarProyecto: React.FC<IProps> = ({ data }: IProps) => {
  const {
    register,
    watch,
    setValue: set_value,
    rows_proyectos,
    is_editar_proyecto,
    is_saving,
    errors,
    fecha_inicial,
    fecha_fin,
  } = useContext(DataContext);

  const nombre = watch('nombre');
  const inversion = watch('inversion');

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [start_date, set_start_date] = useState<Dayjs | null>(null);
  const [end_date, set_end_date] = useState<Dayjs | null>(null);

  const is_nombre_repetido_table =
    is_editar_proyecto &&
    rows_proyectos.some(
      (proyecto) =>
        proyecto.nombre === nombre && proyecto.nombre !== data?.nombre
    );

  const is_vigencias_valid =
    start_date && end_date && fecha_inicial && fecha_fin
      ? start_date.isSameOrAfter(fecha_inicial) &&
        end_date.isSameOrBefore(fecha_fin)
      : false;

  const is_nombre_valid = watch('nombre') !== '';

  const is_vigencia_final_valid =
    start_date && end_date ? end_date.isAfter(start_date) : false;    

  useEffect(() => {
    if (data) {
      setIsInitialLoad(false);
      set_start_date(dayjs(data.vigencia_inicial));
      set_value('vigencia_final', data.vigencia_final);
      set_value('vigencia_inicial', data.vigencia_inicial);
      set_end_date(dayjs(data.vigencia_final));
      set_value('nombre', data.nombre);
      set_value('inversion', data.inversion);
    }
  }, [data, set_value]);

  const handle_start_date_change = (date: Dayjs | null): void => {
    set_value('vigencia_inicial', date);
    set_start_date(dayjs(date));
  };

  const handle_end_date_change = (date: Dayjs | null): void => {
    set_value('vigencia_final', date);
    set_end_date(dayjs(date));
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
          {...register('nombre', { required: true })}
          error={!is_nombre_valid || is_nombre_repetido_table}
          helperText={
            !is_nombre_valid
              ? 'Este campo es obligatorio'
              : is_nombre_repetido_table
              ? 'El nombre del proyecto ya existe'
              : ''
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
          <DatePicker
            label="Vigencia Inicial"
            inputFormat="YYYY/MM/DD"
            openTo="day"
            views={['year', 'month', 'day']}
            value={start_date}
            onChange={handle_start_date_change}
            renderInput={(params) => (
              <TextField
                required={true}
                fullWidth
                size="small"
                {...params}
                {...register('vigencia_inicial', {
                  required: true,
                })}
                error={!is_vigencias_valid}
                helperText={
                  !is_vigencias_valid
                    ? 'La vigencia debe estar dentro del rango del programa'
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
            label="Vigencia Final"
            inputFormat="YYYY/MM/DD"
            openTo="day"
            views={['year', 'month', 'day']}
            value={end_date}
            onChange={handle_end_date_change}
            renderInput={(params) => (
              <TextField
                required={true}
                fullWidth
                size="small"
                {...params}
                {...register('vigencia_final', {
                  required: true,
                })}
                error={!is_vigencias_valid || !is_vigencia_final_valid}
                helperText={
                  !is_vigencias_valid
                    ? 'La vigencia debe estar dentro del rango del programa'
                    : !is_vigencia_final_valid
                    ? 'La fecha final debe ser superior a la fecha inicial'
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
          required={true}
          value={inversion}
          autoFocus
          type="number"
          {...register('inversion', {
            required: true,
            min: 0,
          })}
          error={errors.inversion}
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
            variant="contained"
            color="success"
            type="submit"
            disabled={
              is_saving ||
              !is_nombre_valid ||
              (is_editar_proyecto && is_nombre_repetido_table && !isInitialLoad ) ||
              !is_vigencias_valid ||
              !is_vigencia_final_valid
            }
            loading={is_saving}
          >
            Actualizar
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};
