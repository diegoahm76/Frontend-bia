/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { AgregarProyectos } from '../AgregarProyectos/AgregarProyectos';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import esLocale from 'dayjs/locale/es';
import { LoadingButton } from '@mui/lab';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import { control_error } from '../../../../../helpers';

interface IProps {
  register: any,
  watch: any
  set_value: any,
  errors: any,
}

export const AgregarPrograma: React.FC<IProps> = ({
  register,
  watch,
  set_value,
  errors,
}: IProps) => {

  const [is_agregar, set_is_agregar] = useState(false);
  const [nombrePrograma, setNombrePrograma] = useState(''); // Estado del campo "Nombre del programa"
  const [fechaInicial, setFechaInicial] = useState<Date | null>(null); // Estado de la fecha inicial
  const [fechaFin, setFechaFin] = useState<Date | null>(null); // Estado de la fecha final

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleNombreProgramaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNombrePrograma(value);
    set_value('nombre_programa', value); // Actualizar el valor en el objeto de registro
  };

  const handle_start_date_change = (date: Date | null): void => {
    set_value('fecha_inicial', date);
    setFechaInicial(date);
  };

  const handle_end_date_change = (date: Date | null): void => {
    set_value('fecha_fin', date);
    setFechaFin(date);
  };

  const isCamposObligatoriosCompletos = nombrePrograma && fechaInicial && fechaFin;

  const handleAgregarProyectoClick = (): void => {
    if (isCamposObligatoriosCompletos) {
      // Validar las condiciones
      const currentDate = new Date();
      if (nombrePrograma.trim() === '') {
        control_error('El nombre del programa no puede estar vacío');
        return;
      }
      if (fechaInicial && fechaFin) {
        if (fechaInicial >= fechaFin) {
          control_error('La fecha de inicio debe ser anterior a la fecha de finalización');
          return;
        }
        if (fechaInicial <= currentDate) {
          control_error('La fecha de inicio debe ser posterior a la fecha actual');
          return;
        }
      }
      set_is_agregar(true);
    }
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
            value={nombrePrograma}
            onChange={handleNombreProgramaChange}
            inputProps={{ ...register('nombre_programa', { required: true }) }}
            error={Boolean(errors.nombre_programa)}
            helperText={
              (errors.nombre_programa?.type === "required") ? "Este campo es obligatorio" : ''
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
              value={fechaInicial}
              onChange={handle_start_date_change}
              renderInput={(params) => (
                <TextField
                  required
                  fullWidth
                  size="small"
                  {...params}
                  {...register('fecha_inicial', {
                    required: true,
                  })}
                  error={Boolean(errors.fecha_inicial)}
                  helperText={
                    (errors.fecha_inicial?.type === "required") ? "Este campo es obligatorio" : ''
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
              value={fechaFin}
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
                    (errors.fecha_fin?.type === "required") ? "Este campo es obligatorio" : ''
                  }
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <LoadingButton
              variant="outlined"
              onClick={handleAgregarProyectoClick}
              startIcon={<AddIcon />}
              disabled={!isCamposObligatoriosCompletos} // Deshabilita el botón si los campos obligatorios no están completos
            >
              Agregar Nuevo Proyecto
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={0.1}>
        {is_agregar && (
          <>
            <AgregarProyectos
              register={register}
              watch={watch}
              set_value={set_value}
              errors={errors}
              fecha_inicial_programa={fechaInicial}
              fecha_fin_programa={fechaFin}
            />
          </>
        )}
      </Grid>
    </>
  );
};
