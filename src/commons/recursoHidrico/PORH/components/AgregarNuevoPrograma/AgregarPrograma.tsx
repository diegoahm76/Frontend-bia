/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { Button, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { AgregarProyectos } from '../AgregarProyectos/AgregarProyectos';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import { control_error } from '../../../../../helpers';
import { DataContext } from '../../context/contextData';
import dayjs, { type Dayjs } from 'dayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarPrograma: React.FC = () => {
  const {
    register,
    setValue: set_value,
    errors,
    fecha_inicial,
    nombre_programa,
    fecha_fin,
    reset_form_agregar_programa,
    set_nombre_programa,
    set_fecha_inicial,
    set_fecha_fin,
  } = useContext(DataContext);

  const [is_agregar, set_is_agregar] = useState(false);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handle_nombre_programa_change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    set_nombre_programa(value);
    set_value('nombre_programa', value); // Actualizar el valor en el objeto de registro
  };

  const handle_start_date_change = (date: Dayjs | null): void => {
    set_value('fecha_inicio', dayjs(date));
    set_fecha_inicial(dayjs(date));
  };

  const handle_end_date_change = (date: Dayjs | null): void => {
    set_value('fecha_fin', dayjs(date));
    set_fecha_fin(dayjs(date));
  };

  const is_campos_obligatorios_completos =
    nombre_programa && fecha_inicial && fecha_fin;

  const handle_agregar_proyecto_click = (): void => {
    set_is_agregar(true);

    // if (is_campos_obligatorios_completos) {
    //   // Validar las condiciones
    //   const current_date = dayjs();
    //   if (nombre_programa.trim() === '') {
    //     control_error('El nombre del programa no puede estar vacío');
    //     return;
    //   }
    //   if (dayjs(fecha_inicial) && dayjs(fecha_fin)) {
    //     if (dayjs(fecha_inicial) >= dayjs(fecha_fin)) {
    //       control_error(
    //         'La fecha de inicio debe ser anterior a la fecha de finalización'
    //       );
    //       return;
    //     }
    //     if (dayjs(fecha_inicial) <= dayjs(current_date)) {
    //       control_error(
    //         'La fecha de inicio debe ser posterior a la fecha actual'
    //       );
    //       return;
    //     }
    //   }
    //   set_is_agregar(true);
    // }
  };

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
            value={nombre_programa}
            onChange={handle_nombre_programa_change}
            inputProps={{
              ...register('nombre_programa', {
                required: true,
              }),
            }}
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
              value={fecha_inicial}
              onChange={handle_start_date_change}
              renderInput={(params) => (
                <TextField
                  required
                  fullWidth
                  size="small"
                  {...params}
                  {...register('fecha_inicio', {
                    required: true,
                  })}
                  error={Boolean(errors.fecha_inicio)}
                  helperText={
                    errors.fecha_inicio?.type === 'required'
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
              value={fecha_fin}
              onChange={handle_end_date_change}
              renderInput={(params) => (
                <TextField
                  required
                  fullWidth
                  size="small"
                  {...params}
                  {...register('fecha_fin', {
                    required: true,
                  })}
                  error={Boolean(errors.fecha_fin)}
                  helperText={
                    errors.fecha_fin?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                reset_form_agregar_programa();
              }}
            >
              Limpiar
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              onClick={handle_agregar_proyecto_click}
              startIcon={<AddIcon />}
              disabled={Object.keys(errors).length > 0}
            >
              Agregar Nuevo Proyecto
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={0.1}>
        {is_agregar && (
          <>
            <AgregarProyectos
              fecha_inicial_programa={fecha_inicial as any}
              fecha_fin_programa={fecha_fin as any}
            />
          </>
        )}
      </Grid>
    </>
  );
};
