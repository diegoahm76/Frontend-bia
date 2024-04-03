/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import { IConceptoPOAI } from '../../types/types';
import { useAppSelector } from '../../../../hooks';
import { post_concepto_poai, put_concepto_poai } from '../services/services';
import { DataContextConceptoPOAI } from '../context/context';

export const useContextoPoaiHook = (): any => {
  const {
    control: control_concepto,
    watch: watch_concepto,
    register: register_concepto,
    handleSubmit: handleSubmit_concepto,
    setValue: set_value_concepto,
    reset: reset_concepto,
    formState: { errors: errors_concepto },
  } = useForm<IConceptoPOAI>({
    defaultValues: {
      concepto: '',
      valor_total: 0,
      id_rubro: 0,
      id_indicador: 0,
      id_unidad_organizacional: 0,
    },
  });

  const data_watch_concepto = watch_concepto();

  // limpiar formulario
  const limpiar_formulario_concepto = async () => {
    reset_concepto({
      concepto: '',
      valor_total: 0,
      id_rubro: 0,
      id_indicador: 0,
      id_unidad_organizacional: 0,
    });
  };

  // saving
  const [is_saving_concepto, set_is_saving_concepto] = useState<boolean>(false);

  // declaracion context
  const { id_indicador, fetch_data_concepto_poai } = useContext(
    DataContextConceptoPOAI
  );

  // declaracion redux
  const {
    concepto_poai: { id_concepto },
    // indicador: { id_indicador },
  } = useAppSelector((state) => state.planes);

  const onsubmit_concepto = handleSubmit_concepto(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_concepto(true);
      data.id_indicador = id_indicador;
      await post_concepto_poai(data as IConceptoPOAI);
      control_success('Se creó correctamente');
      await limpiar_formulario_concepto();
      await fetch_data_concepto_poai();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_concepto(false);
    }
  });

  // editar

  const onsubmit_editar = handleSubmit_concepto(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_concepto(true);
      data.id_indicador = id_indicador;
      await put_concepto_poai(
        (id_concepto as number) ?? 0,
        data as IConceptoPOAI
      );
      control_success('Se actualizó correctamente');
      await limpiar_formulario_concepto();
      await fetch_data_concepto_poai();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_concepto(false);
    }
  });

  return {
    control_concepto,
    watch_concepto,
    register_concepto,
    handleSubmit_concepto,
    set_value_concepto,
    reset_concepto,
    errors_concepto,

    data_watch_concepto,

    onsubmit_concepto,
    onsubmit_editar,
    is_saving_concepto,

    limpiar_formulario_concepto,
  };
};
