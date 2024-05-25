/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import { IObjetivo } from '../../types/types';
import { DataContextObjetivo } from '../context/context';
import { useAppSelector } from '../../../../hooks';
import { post_objetivo, put_objetivo } from '../services/services';

export const useObjetivoHook = (): any => {
  const {
    control: control_objetivo,
    watch: watch_objetivo,
    register: register_objetivo,
    handleSubmit: handleSubmit_objetivo,
    setValue: set_value_objetivo,
    reset: reset_objetivo,
    formState: { errors: errors_objetivo },
  } = useForm<IObjetivo>({
    defaultValues: {
      nombre_plan: '',
      nombre_objetivo: '',
      id_plan: null,
    },
  });

  const data_watch_objetivo = watch_objetivo();

  // limpiar formulario
  const limpiar_formulario_objetivo = async () => {
    reset_objetivo({
      nombre_plan: '',
      nombre_objetivo: '',
      id_plan: null,
    });
  };

  // saving
  const [is_saving_objetivo, set_is_saving_objetivo] = useState<boolean>(false);

  // declaracion context
  const { fetch_data_objetivo } = useContext(DataContextObjetivo);

  // declaracion redux
  const {
    plan: { id_plan }, obj_plan: { id_objetivo },
  } = useAppSelector((state) => state.planes);

  const onsubmit_objetivo = handleSubmit_objetivo(async (data) => {
    try {
      //  console.log('')(data, 'data');
      data.id_plan = id_plan;
      set_is_saving_objetivo(true);
      await post_objetivo(data as IObjetivo);
      control_success('Se creó correctamente');
      await limpiar_formulario_objetivo();
      await fetch_data_objetivo();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_objetivo(false);
    }
  });

  // editar

  const onsubmit_editar = handleSubmit_objetivo(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_objetivo(true);
      await put_objetivo((id_objetivo as number) ?? 0, data as IObjetivo);
      control_success('Se actualizó correctamente');
      await limpiar_formulario_objetivo();
      await fetch_data_objetivo();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_objetivo(false);
    }
  });

  return {
    // use form objetivo
    control_objetivo,
    watch_objetivo,
    register_objetivo,
    handleSubmit_objetivo,
    set_value_objetivo,
    reset_objetivo,
    errors_objetivo,

    data_watch_objetivo,

    onsubmit_objetivo,
    onsubmit_editar,
    is_saving_objetivo,

    limpiar_formulario_objetivo,
  };
};
