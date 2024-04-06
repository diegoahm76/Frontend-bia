import { useForm } from 'react-hook-form';
import type { IObjTransfer } from '../interfaces/distribucion';
import { useEffect } from 'react';
import { Grid } from '@mui/material';
import FormButton from '../../../../components/partials/form/FormButton';
import SaveIcon from '@mui/icons-material/Save';
import { useAppSelector } from '../../../../hooks';
import FormDateRangePickerController from '../../../../components/partials/form/FormDateRangePickerController';
import FormDatePickerController from '../../../../components/partials/form/FormDatePickerController';
import FormDateTimePickerController from '../../../../components/partials/form/FormDateTimePickerController';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function CierreSolicitudScreen(): JSX.Element {
  const {
    control: control_traslado,
    handleSubmit: handle_submit,
    reset: reset_traslado,
    // formState: { errors },
  } = useForm<IObjTransfer>();
  const { current_transfer } = useAppSelector((state) => state.distribucion);

  useEffect(() => {
    reset_traslado(current_transfer);
  }, []);
  const on_submit = (data: IObjTransfer): void => {
    //  console.log('')(data.fecha_test);
    if (data.fecha_test !== null && data.fecha_test !== undefined) {
      const fecha_start = new Date(data.fecha_test[0] ?? ''); // Obtén el valor de fecha_start del objeto enviado por el formulario
      const year_start = fecha_start.getFullYear(); // Obtén el año
      const month_start = fecha_start.getMonth() + 1; // Obtén el mes (se suma 1 porque los meses comienzan en 0)
      const day_start = fecha_start.getDate(); // Obtén el día
      const hours_start = fecha_start.getHours(); // Obtén las horas
      const minutes_start = fecha_start.getMinutes(); // Obtén los minutos
      const seconds_start = fecha_start.getSeconds(); // Obtén los segundos

      const fecha_end = new Date(data.fecha_test[1] ?? ''); // Obtén el valor de fecha_end del objeto enviado por el formulario
      const year_end = fecha_end.getFullYear(); // Obtén el año
      const month_end = fecha_end.getMonth() + 1; // Obtén el mes (se suma 1 porque los meses comienzan en 0)
      const day_end = fecha_end.getDate(); // Obtén el día
      const hours_end = fecha_end.getHours(); // Obtén las horas
      const minutes_end = fecha_end.getMinutes(); // Obtén los minutos
      const seconds_end = fecha_end.getSeconds(); // Obtén los segundos

      const formatted_date_range = `${year_start}-${month_start
        .toString()
        .padStart(2, '0')}-${day_start
        .toString()
        .padStart(2, '0')} ${hours_start
        .toString()
        .padStart(2, '0')}:${minutes_start
        .toString()
        .padStart(2, '0')}:${seconds_start.toString().padStart(2, '0')}   -  
        ${year_end}-${month_end.toString().padStart(2, '0')}-${day_end
        .toString()
        .padStart(2, '0')} ${hours_end
        .toString()
        .padStart(2, '0')}:${minutes_end
        .toString()
        .padStart(2, '0')}:${seconds_end.toString().padStart(2, '0')}`;

      const fecha = new Date(data.fecha_traslado ?? ''); // Obtén el valor de fecha del objeto enviado por el formulario
      const year = fecha.getFullYear(); // Obtén el año
      const month = fecha.getMonth() + 1; // Obtén el mes (se suma 1 porque los meses comienzan en 0)
      const day = fecha.getDate(); // Obtén el día
      const hours = fecha.getHours(); // Obtén las horas
      const minutes = fecha.getMinutes(); // Obtén los minutos
      const seconds = fecha.getSeconds(); // Obtén los segundos
      const formatted_date = `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      //  console.log('')(formatted_date_range, formatted_date);
    }
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <FormDateRangePickerController
          xs={4}
          md={4}
          control_form={control_traslado}
          control_name={'fecha_test'}
          default_value={[null, null]}
          rules={{
            required_rule: { rule: true, message: 'Rango de fechas requerido' },
          }}
          label_start={'Fecha de inicio'}
          label_end={'Fecha de fin'}
          disabled={false}
          helper_text={''}
          hidden_text={false}
          format={'YYYY-MM-DD'}
        />
        <FormDatePickerController
          xs={4}
          md={4}
          control_form={control_traslado}
          control_name={'fecha_traslado'}
          default_value={''}
          rules={{
            required_rule: { rule: true, message: 'Fecha requerido' },
          }}
          label={'Fecha traslado'}
          disabled={false}
          helper_text={''}
          hidden_text={false}
          min_date={'2023-06-20'}
          max_date={'2023-07-20'}
          format={'YYYY-MM-DD'}
        />
        <FormDateTimePickerController
          xs={4}
          md={4}
          control_form={control_traslado}
          control_name={'fecha_traslado'}
          default_value={''}
          rules={{
            required_rule: { rule: true, message: 'Fecha y hora requerido' },
          }}
          label={'Fecha de inicio'}
          disabled={false}
          helper_text={''}
          hidden_text={false}
          min_date={'2023-06-20'}
          max_date={'2023-07-20'}
          format={'YYYY-MM-DD hh:mm:ss'}
        />

        <Grid item xs={12} md={3}>
          <FormButton
            variant_button="contained"
            on_click_function={handle_submit(on_submit)}
            icon_class={<SaveIcon />}
            label={'submit'}
            type_button="button"
          />
        </Grid>
      </Grid>
    </>
  );
}
