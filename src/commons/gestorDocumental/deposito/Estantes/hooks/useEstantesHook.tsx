/* eslint-disable @typescript-eslint/naming-convention */

import { useForm } from 'react-hook-form';

export const useEstantesHook = (): any => {
  // * context

  const {
    control: control_estantes,
    watch: watch_estantes,
    register: register_estantes,
    handleSubmit: handleSubmit_estantes,
    setValue: set_value_estantes,
    reset: reset_estantes,
    formState: { errors: errors_estantes },
  } = useForm({
    defaultValues: {
      identificacion_por_deposito: '',
      orden: '',
      nuevo_orden: '',
    },
  });

  const data_watch_estantes = watch_estantes();

  return {
    // use form bandejas
    control_estantes,
    watch_estantes,
    register_estantes,
    handleSubmit_estantes,
    set_value_estantes,
    reset_estantes,
    errors_estantes,
    data_watch_estantes,
  };
};
