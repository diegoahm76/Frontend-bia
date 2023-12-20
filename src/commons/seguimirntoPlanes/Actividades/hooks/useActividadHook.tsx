/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import { IActividades } from '../../types/types';
import { useAppSelector } from '../../../../hooks';
import { post_actividad, put_actividad } from '../services/services';
import { DataContextActividades } from '../context/context';

export const useActividadHook = (): any => {
  const {
    control: control_actividad,
    watch: watch_actividad,
    register: register_actividad,
    handleSubmit: handleSubmit_actividad,
    setValue: set_value_actividad,
    reset: reset_actividad,
    formState: { errors: errors_actividad },
  } = useForm<IActividades>({
    defaultValues: {
      nombre_actividad: '',
      numero_actividad: 0,
      nombre_plan: '',
      nombre_producto: '',
      id_plan: 0,
      id_producto: 0,
      id_programa: 0,
      id_proyecto: 0,
    },
  });

  const data_watch_actividad = watch_actividad();

  // limpiar formulario
  const limpiar_formulario_actividad = async () => {
    reset_actividad({
      nombre_actividad: '',
      numero_actividad: 0,
      nombre_plan: '',
      nombre_producto: '',
      id_plan: 0,
      id_producto: 0,
      id_programa: 0,
      id_proyecto: 0,
    });
  };

  // saving
  const [is_saving_actividad, set_is_saving_actividad] =
    useState<boolean>(false);

  // declaracion context
  const { id_programa, id_proyecto, fetch_data_actividad } = useContext(
    DataContextActividades
  );

  // declaracion redux
  const {
    actividad: { id_actividad },
    producto: { id_producto },
  } = useAppSelector((state) => state.planes);

  const onsubmit_actividad = handleSubmit_actividad(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_actividad(true);
      data.id_programa = id_programa;
      data.id_proyecto = id_proyecto;
      data.id_producto = id_producto;
      await post_actividad(data as IActividades);
      control_success('Se creó correctamente');
      await limpiar_formulario_actividad();
      await fetch_data_actividad();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_actividad(false);
    }
  });

  // editar

  const onsubmit_editar = handleSubmit_actividad(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_actividad(true);
      data.id_programa = id_programa;
      data.id_proyecto = id_proyecto;
      data.id_producto = id_producto;
      await put_actividad((id_actividad as number) ?? 0, data as IActividades);
      control_success('Se actualizó correctamente');
      await limpiar_formulario_actividad();
      await fetch_data_actividad();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_actividad(false);
    }
  });

  return {
    // use form actividad
    control_actividad,
    watch_actividad,
    register_actividad,
    handleSubmit_actividad,
    set_value_actividad,
    reset_actividad,
    errors_actividad,

    data_watch_actividad,

    onsubmit_actividad,
    onsubmit_editar,
    is_saving_actividad,

    limpiar_formulario_actividad,
  };
};
