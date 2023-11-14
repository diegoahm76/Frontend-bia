/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import { IProgramas } from '../../types/types';
import { useAppSelector } from '../../../../hooks';
import { post_programa, put_programa } from '../services/services';
import { DataContextprograma } from '../context/context';

export const useprogramaHook = (): any => {
  const {
    control: control_programa,
    watch: watch_programa,
    register: register_programa,
    handleSubmit: handleSubmit_programa,
    setValue: set_value_programa,
    reset: reset_programa,
    formState: { errors: errors_programa },
  } = useForm<IProgramas>({
    defaultValues: {
      nombre_plan: '',
      nombre_programa: '',
      porcentaje_1: 0,
      porcentaje_2: 0,
      porcentaje_3: 0,
      porcentaje_4: 0,
      id_plan: null,
    },
  });

  const data_watch_programa = watch_programa();

  // limpiar formulario
  const limpiar_formulario_programa = async () => {
    reset_programa({
      nombre_plan: '',
      nombre_programa: '',
      porcentaje_1: 0,
      porcentaje_2: 0,
      porcentaje_3: 0,
      porcentaje_4: 0,
      id_plan: null,
    });
  };

  // saving
  const [is_saving_programa, set_is_saving_programa] = useState<boolean>(false);

  // declaracion context
  const { fetch_data_programa } = useContext(DataContextprograma);

  // declaracion redux
  const {
    plan: { id_plan },
    programa: { id_programa },
  } = useAppSelector((state) => state.planes);

  const onsubmit_programa = handleSubmit_programa(async (data) => {
    try {
      console.log(data, 'data');
      data.id_plan = id_plan;
      set_is_saving_programa(true);
      await post_programa(data as IProgramas);
      control_success('Se creó correctamente');
      await limpiar_formulario_programa();
      await fetch_data_programa();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_programa(false);
    }
  });

  // editar

  const onsubmit_editar = handleSubmit_programa(async (data) => {
    try {
      console.log(data, 'data');
      set_is_saving_programa(true);
      await put_programa((id_programa as number) ?? 0, data as IProgramas);
      control_success('Se actualizó correctamente');
      await limpiar_formulario_programa();
      await fetch_data_programa();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_programa(false);
    }
  });

  return {
    // use form programa
    control_programa,
    watch_programa,
    register_programa,
    handleSubmit_programa,
    set_value_programa,
    reset_programa,
    errors_programa,

    data_watch_programa,

    onsubmit_programa,
    onsubmit_editar,
    is_saving_programa,

    limpiar_formulario_programa,
  };
};
