/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import { Indicadores } from '../../types/types';
import { useAppSelector } from '../../../../hooks';
import { post_indicador, put_indicador } from '../services/services';
import { DataContextIndicador } from '../context/context';

export const useIndicadorHook = (): any => {
  const {
    control: control_indicador,
    watch: watch_indicador,
    register: register_indicador,
    handleSubmit: handleSubmit_indicador,
    setValue: set_value_indicador,
    reset: reset_indicador,
    formState: { errors: errors_indicador },
  } = useForm<Indicadores>({
    defaultValues: {
      // id_indicador: 0,
      nombre_medicion: '',
      nombre_tipo: '',
      nombre_producto: '',
      nombre_actividad: '',
      nombre_plan: '',
      nombre_indicador: '',
      nombre_proyecto: '',
      linea_base: '',
      medida: '',
      tipo_indicador: '',
      id_medicion: 0,
      id_tipo: 0,
      id_producto: 0,
      id_actividad: 0,
      id_plan: 0,
      id_proyecto: 0,
    },
  });

  const data_watch_indicador = watch_indicador();

  // limpiar formulario
  const limpiar_formulario_indicador = async () => {
    reset_indicador({
      // id_indicador: 0,
      nombre_medicion: '',
      nombre_tipo: '',
      nombre_producto: '',
      nombre_actividad: '',
      nombre_plan: '',
      nombre_indicador: '',
      nombre_proyecto: '',
      linea_base: '',
      medida: '',
      tipo_indicador: '',
      id_medicion: 0,
      id_tipo: 0,
      id_producto: 0,
      id_actividad: 0,
      id_plan: 0,
      id_proyecto: 0,
    });
  };

  // saving
  const [is_saving_indicador, set_is_saving_indicador] =
    useState<boolean>(false);

  // declaracion context
  const { fetch_data_indicadores } = useContext(DataContextIndicador);

  // declaracion redux
  const {
    indicador: { id_indicador },
  } = useAppSelector((state) => state.planes);

  const onsubmit_indicador = handleSubmit_indicador(async (data) => {
    try {
      console.log(data, 'data');
      set_is_saving_indicador(true);
      await post_indicador(data as Indicadores);
      control_success('Se creó correctamente');
      await limpiar_formulario_indicador();
      await fetch_data_indicadores();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_indicador(false);
    }
  });

  // editar

  const onsubmit_editar = handleSubmit_indicador(async (data) => {
    try {
      console.log(data, 'data');
      set_is_saving_indicador(true);
      await put_indicador((id_indicador as number) ?? 0, data as Indicadores);
      control_success('Se actualizó correctamente');
      await limpiar_formulario_indicador();
      await fetch_data_indicadores();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_indicador(false);
    }
  });

  return {
    // use form indicador
    control_indicador,
    watch_indicador,
    register_indicador,
    handleSubmit_indicador,
    set_value_indicador,
    reset_indicador,
    errors_indicador,

    data_watch_indicador,

    onsubmit_indicador,
    onsubmit_editar,
    is_saving_indicador,

    limpiar_formulario_indicador,
  };
};
