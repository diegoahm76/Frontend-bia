/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { post_tipos_radicado } from '../services/services';
import { control_error, control_success } from '../../../../helpers';

export const useRadicadosHook = () => {
  // useForm
  const {
    control: control_radicados,
    register: register_radicados,
    handleSubmit: handleSubmit_radicados,
    reset: reset_radicados,
    setValue: setValue_radicados,
    watch: watch_radicados,
    formState: { errors: errors_radicados },
  } = useForm({
    defaultValues: {
      agno_radicado: 0,
      cod_tipo_radicado: '',
      prefijo_consecutivo: '',
      consecutivo_inicial: 1,
      cantidad_digitos: 0,
      implementar: false,
    },
  });

  const data_watch_radicados = watch_radicados();

  // * años
  const currentYear = dayjs().year();
  const nextYear = dayjs().add(1, 'year').year();

  // * onSubmit
  const onSubmit_radicados = handleSubmit_radicados(async (data) => {
    try {
      console.log('data', data);

      const data_radicados = {
        agno_radicado: data.agno_radicado,
        cod_tipo_radicado: data.cod_tipo_radicado,
        prefijo_consecutivo: data.prefijo_consecutivo,
        consecutivo_inicial: data.consecutivo_inicial,
        cantidad_digitos: data.cantidad_digitos,
        implementar: data.implementar,
      };
      await post_tipos_radicado(data_radicados);
      control_success('Se ha creado el tipo de radicado exitosamente');
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  });

  return {
    control_radicados,
    register_radicados,
    handleSubmit_radicados,
    reset_radicados,
    setValue_radicados,
    errors_radicados,
    data_watch_radicados,

    // * años
    currentYear,
    nextYear,

    // * onSubmit
    onSubmit_radicados,
  };
};
