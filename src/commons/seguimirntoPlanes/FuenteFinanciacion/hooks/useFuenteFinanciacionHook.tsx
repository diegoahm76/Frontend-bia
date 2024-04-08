/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import { IFuentes } from '../../types/types';
import { useAppSelector } from '../../../../hooks';
import {
  post_fuentes_fiananciacion,
  put_fuentes_fiananciacion,
} from '../services/services';
import { DataContextFuentesFinanciacion } from '../context/context';

export const useFuenteFinanciacionHook = (): any => {
  const {
    control: control_fuente,
    watch: watch_fuente,
    register: register_fuente,
    handleSubmit: handleSubmit_fuente,
    setValue: set_value_fuente,
    reset: reset_fuente,
    formState: { errors: errors_fuente },
  } = useForm<IFuentes>({
    defaultValues: {
      vano_1: 0,
      vano_2: 0,
      vano_3: 0,
      vano_4: 0,
      concepto: '',
      id_concepto: 0,
      nombre_fuente: '',
    },
  });

  const data_watch_fuente = watch_fuente();

  // limpiar formulario
  const limpiar_formulario_fuente = async () => {
    reset_fuente({
      vano_1: 0,
      vano_2: 0,
      vano_3: 0,
      vano_4: 0,
      concepto: '',
      id_concepto: 0,
      nombre_fuente: '',
    });
  };

  // saving
  const [is_saving_fuente, set_is_saving_fuente] = useState<boolean>(false);

  // declaracion context
  const { id_concepto, fetch_data_fuente_financiacion } = useContext(
    DataContextFuentesFinanciacion
  );

  // declaracion redux
  const {
    fuente: { id_fuente },
    // indicador: { id_indicador },
  } = useAppSelector((state) => state.planes);

  const onsubmit_fuente = handleSubmit_fuente(async (data) => {
    try {
      //  console.log('')(data, 'data');
      data.id_concepto = id_concepto;
      set_is_saving_fuente(true);
      await post_fuentes_fiananciacion(data as IFuentes);
      control_success('Se creó correctamente');
      await limpiar_formulario_fuente();
      await fetch_data_fuente_financiacion();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_fuente(false);
    }
  });

  // editar

  const onsubmit_editar = handleSubmit_fuente(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_fuente(true);
      data.id_concepto = id_concepto;
      await put_fuentes_fiananciacion(
        (id_fuente as number) ?? 0,
        data as IFuentes
      );
      control_success('Se actualizó correctamente');
      await limpiar_formulario_fuente();
      await fetch_data_fuente_financiacion();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_fuente(false);
    }
  });

  return {
    control_fuente,
    watch_fuente,
    register_fuente,
    handleSubmit_fuente,
    set_value_fuente,
    reset_fuente,
    errors_fuente,

    data_watch_fuente,

    onsubmit_fuente,
    onsubmit_editar,
    is_saving_fuente,

    limpiar_formulario_fuente,
  };
};
