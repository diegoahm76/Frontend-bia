/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import { ISubprogramas } from '../../types/types';
import { useAppSelector } from '../../../../hooks';
import { post_subprograma, put_subprograma } from '../services/services';
import { DataContextSubprogramas } from '../context/context';

export const useSubprogramaHook = (): any => {
  const {
    control: control_subprograma,
    watch: watch_subprograma,
    register: register_subprograma,
    handleSubmit: handleSubmit_subprograma,
    setValue: set_value_subprograma,
    reset: reset_subprograma,
    formState: { errors: errors_subprograma },
  } = useForm<ISubprogramas>({
    defaultValues: {
      nombre_subprograma: '',
      nombre_programa: '',
      numero_subprograma: '',
    },
  });

  const data_watch_subprograma = watch_subprograma();

  // limpiar formulario
  const limpiar_formulario_subprograma = async () => {
    reset_subprograma({
      nombre_subprograma: '',
      nombre_programa: '',
      numero_subprograma: '',
    });
  };

  // saving
  const [is_saving_subprograma, set_is_saving_subprograma] =
    useState<boolean>(false);

  // declaracion context
  const { id_programa, fetch_data_subprogramas } = useContext(
    DataContextSubprogramas
  );

  // declaracion redux
  const {
    subprograma: { id_subprograma },
    // programa: { id_programa },
  } = useAppSelector((state) => state.planes);

  const onsubmit_subprograma = handleSubmit_subprograma(async (data) => {
    try {
      //  console.log('')(data, 'data');
      data.id_programa = id_programa;
      set_is_saving_subprograma(true);
      await post_subprograma(data as ISubprogramas);
      control_success('Se creó correctamente');
      await limpiar_formulario_subprograma();
      await fetch_data_subprogramas();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_subprograma(false);
    }
  });

  // editar

  const onsubmit_editar = handleSubmit_subprograma(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_subprograma(true);
      await put_subprograma(
        (id_subprograma as number) ?? 0,
        data as ISubprogramas
      );
      control_success('Se actualizó correctamente');
      await limpiar_formulario_subprograma();
      await fetch_data_subprogramas();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_subprograma(false);
    }
  });

  return {
    // use form proyecto
    control_subprograma,
    watch_subprograma,
    register_subprograma,
    handleSubmit_subprograma,
    set_value_subprograma,
    reset_subprograma,
    errors_subprograma,

    data_watch_subprograma,

    onsubmit_subprograma,
    onsubmit_editar,
    is_saving_subprograma,

    limpiar_formulario_subprograma,
  };
};
