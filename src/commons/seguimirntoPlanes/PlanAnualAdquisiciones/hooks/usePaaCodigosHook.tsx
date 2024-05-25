/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import { IUnspsc } from '../../types/types';
import { DataContextAdquisiciones } from '../context/context';
import { useAppSelector } from '../../../../hooks';
import { post_paa_codigos, put_paa_codigos } from '../services/services';

export const usePaaCodigosHook = (): any => {
  const {
    control: control_paa_codidos,
    watch: watch_paa_codidos,
    register: register_paa_codidos,
    handleSubmit: handleSubmit_paa_codidos,
    setValue: set_value_paa_codidos,
    reset: reset_paa_codidos,
    formState: { errors: errors_paa_codidos },
  } = useForm<IUnspsc>({
    defaultValues: {
      nombre_paa: '',
      nombre_producto_unsp: '',
      codigo_unsp: '',
      id_plan: 0,
      id_codigo: 0,
    },
  });

  const data_watch_paa_codidos = watch_paa_codidos();

  // limpiar formulario
  const limpiar_formulario_paa_codidos = async () => {
    set_value_paa_codidos("id_codigo", null);
    reset_paa_codidos({
      nombre_paa: '',
      nombre_producto_unsp: '',
      codigo_unsp: '',
      id_plan: 0,
      id_codigo: 0,
    });
  };

  // saving
  const [is_saving_paa_codidos, set_is_saving_paa_codidos] =
    useState<boolean>(false);

  // declaracion context
  const { fetch_data_paa_codigos } = useContext(DataContextAdquisiciones);

  // declaracion redux
  const {
    plan_adquisiciones: { id_plan_anual },
    paa_codigos: { id_paacodigo },
  } = useAppSelector((state) => state.planes);

  const onsubmit_paa_codidos = handleSubmit_paa_codidos(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_paa_codidos(true);
      data.id_plan = id_plan_anual;
      await post_paa_codigos(data as IUnspsc);
      control_success('Se creó correctamente');
      await limpiar_formulario_paa_codidos();
      await fetch_data_paa_codigos();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_paa_codidos(false);
    }
  });

  // editar

  const onsubmit_editar = handleSubmit_paa_codidos(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_paa_codidos(true);
      await put_paa_codigos((id_paacodigo as number) ?? 0, data as IUnspsc);
      control_success('Se actualizó correctamente');
      await limpiar_formulario_paa_codidos();
      await fetch_data_paa_codigos();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_paa_codidos(false);
    }
  });

  return {
    // use form objetivo
    control_paa_codidos,
    watch_paa_codidos,
    register_paa_codidos,
    handleSubmit_paa_codidos,
    set_value_paa_codidos,
    reset_paa_codidos,
    errors_paa_codidos,

    data_watch_paa_codidos,

    onsubmit_paa_codidos,
    onsubmit_editar,
    is_saving_paa_codidos,

    limpiar_formulario_paa_codidos,
  };
};
