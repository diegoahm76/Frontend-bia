/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import { IEjeEstrategico } from '../../types/types';
import { DataContextEjeEstrategico } from '../context/context';
import { useAppSelector } from '../../../../hooks';
import {
  post_eje_estrategico,
  put_eje_estrategico,
} from '../services/services';

export const useEjeEstrategicoHook = (): any => {
  const {
    control: control_eje_estrategico,
    watch: watch_eje_estrategico,
    register: register_eje_estrategico,
    handleSubmit: handleSubmit_eje_estrategico,
    setValue: set_value_eje_estrategico,
    reset: reset_eje_estrategico,
    formState: { errors: errors_eje_estrategico },
  } = useForm<IEjeEstrategico>({
    defaultValues: {
      nombre_plan: '',
      nombre_tipo_eje: '',
      nombre: '',
      nombre_programa: '',
      id_programa: null,
      id_tipo_eje: null,
    },
  });

  const data_watch_eje_estrategico = watch_eje_estrategico();

  // limpiar formulario
  const limpiar_formulario_eje_estrategico = async () => {
    reset_eje_estrategico({
      id_eje_estrategico: null,
      nombre_plan: '',
      nombre_tipo_eje: '',
      nombre: '',
      nombre_programa: '',
      id_programa: null,
      id_plan: null,
      id_tipo_eje: null,
    });
  };

  // saving
  const [is_saving_eje_estrategico, set_is_saving_eje_estrategico] =
    useState<boolean>(false);

  // declaracion context
  const { id_plan, id_programa, fetch_data_eje_estrategico } = useContext(DataContextEjeEstrategico);

  // declaracion redux
  const {
    eje_estrategico: { id_eje_estrategico },
  } = useAppSelector((state) => state.planes);

  const onsubmit_eje_estrategico = handleSubmit_eje_estrategico(
    async (data) => {
      try {
        set_is_saving_eje_estrategico(true);
        //  console.log('')(data, 'data');
        data.id_plan = id_plan;
        data.id_programa = id_programa;
        await post_eje_estrategico(data as IEjeEstrategico);
        control_success('Se creó correctamente');
        await limpiar_formulario_eje_estrategico();
        await fetch_data_eje_estrategico();
      } catch (error: any) {
        control_error(
          error.response.data.detail ||
            'Hubo un error al crear, por favor intenta nuevamente'
        );
      } finally {
        set_is_saving_eje_estrategico(false);
      }
    }
  );

  // editar

  const onsubmit_editar = handleSubmit_eje_estrategico(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_eje_estrategico(true);
      await put_eje_estrategico(
        (id_eje_estrategico as number) ?? 0,
        data as IEjeEstrategico
      );
      control_success('Se actualizó correctamente');
      await limpiar_formulario_eje_estrategico();
      await fetch_data_eje_estrategico();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_eje_estrategico(false);
    }
  });

  return {
    // use form eje_estrategico
    control_eje_estrategico,
    watch_eje_estrategico,
    register_eje_estrategico,
    handleSubmit_eje_estrategico,
    set_value_eje_estrategico,
    reset_eje_estrategico,
    errors_eje_estrategico,

    data_watch_eje_estrategico,

    onsubmit_eje_estrategico,
    onsubmit_editar,
    is_saving_eje_estrategico,

    limpiar_formulario_eje_estrategico,
  };
};
