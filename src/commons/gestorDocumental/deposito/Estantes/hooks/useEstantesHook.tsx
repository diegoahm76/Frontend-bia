/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DataContext } from '../context/context';
import { post_deposito } from '../services/services';
import type { PostEstantes } from '../types/types';
import { control_error } from '../../../../../helpers';

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

  const {
    id_deposito,
    set_identificacion_deposito,
    fetch_data_estantes_depositos,
  } = useContext(DataContext);

  useEffect(() => {
    if (data_watch_estantes?.identificacion_por_deposito) {
      set_identificacion_deposito(
        data_watch_estantes?.identificacion_por_deposito
      );
    }
  }, [data_watch_estantes?.identificacion_por_deposito]);

  // ? onsumit
  const onsubmit_estantes = handleSubmit_estantes(async (data) => {
    try {
      if (id_deposito) {
        const data_estantes: PostEstantes = {
          id_deposito,
          identificacion_por_deposito: data.identificacion_por_deposito,
        };
        await post_deposito(data_estantes);
        await fetch_data_estantes_depositos();
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  });

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

    // * onsumit
    onsubmit_estantes,
  };
};
