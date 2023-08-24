/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DataContext } from '../context/context';
import { post_estante, put_mover_estante } from '../services/services';
import type { PostEstantes, PutMoverEstantes } from '../types/types';
import { control_error, control_success } from '../../../../../helpers';

export const useEstantesHook = (): any => {
  // * context

  // use form estantes
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

  // use form mover estantes
  const {
    control: control_mover_estantes,
    watch: watch_mover_estantes,
    register: register_mover_estantes,
    handleSubmit: handleSubmit_mover_estantes,
    setValue: set_value_mover_estantes,
    reset: reset_mover_estantes,
    formState: { errors: errors_mover_estantes },
  } = useForm({
    defaultValues: {
      identificacion_estante: '',
      deposito_actual: '',

      identificacion_por_entidad_destino: '',
      nombre_deposito_destino: '',
    },
  });

  const data_watch_estantes = watch_estantes();

  const {
    id_deposito,
    identificacion_deposito,
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
          identificacion_por_deposito: identificacion_deposito,
        };
        await post_estante(data_estantes);
        await fetch_data_estantes_depositos();
        control_success('Se creó estante correctamente');
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  });

  const onsubmit_mover_estantes = handleSubmit_mover_estantes(async (data) => {
    try {
      if (data.identificacion_estante) {
        const data_estantes: PutMoverEstantes = {
          identificacion_por_entidad_destino:
            data.identificacion_por_entidad_destino,
          nombre_deposito_destino: data.nombre_deposito_destino,
        };
        const identificacion = data?.identificacion_estante;
        await put_mover_estante(identificacion, data_estantes);
        await fetch_data_estantes_depositos();
        control_success('Se movió estante correctamente');
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

    // use form mover estantes
    control_mover_estantes,
    watch_mover_estantes,
    register_mover_estantes,
    handleSubmit_mover_estantes,
    set_value_mover_estantes,
    reset_mover_estantes,
    errors_mover_estantes,

    // * onsumit
    onsubmit_estantes,
    onsubmit_mover_estantes,
  };
};
