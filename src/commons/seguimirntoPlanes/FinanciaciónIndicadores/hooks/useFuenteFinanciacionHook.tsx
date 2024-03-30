/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import { IFuentesFinanciacion } from '../../types/types';
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
  } = useForm<IFuentesFinanciacion>({
    defaultValues: {
      nombre_indicador: '',
      nombre_fuente: '',
      nombre_cuenca: '',
      nombre_proyecto: '',
      nombre_actividad: '',
      nombre_meta: '',
      vano_1: 0,
      vano_2: 0,
      vano_3: 0,
      vano_4: 0,
      valor_total: 0,
      id_indicador: 0,
      id_cuenca: 0,
      id_proyecto: 0,
      id_actividad: 0,
      id_meta: 0,
    },
  });

  const data_watch_fuente = watch_fuente();

  // limpiar formulario
  const limpiar_formulario_fuente = async () => {
    reset_fuente({
      nombre_indicador: '',
      nombre_fuente: '',
      nombre_cuenca: '',
      nombre_proyecto: '',
      nombre_actividad: '',
      nombre_meta: '',
      vano_1: 0,
      vano_2: 0,
      vano_3: 0,
      vano_4: 0,
      valor_total: 0,
      id_indicador: 0,
      id_cuenca: 0,
      id_proyecto: 0,
      id_actividad: 0,
      id_meta: 0,
    });
  };

  // saving
  const [is_saving_fuente, set_is_saving_fuente] = useState<boolean>(false);

  // declaracion context
  const {
    id_proyecto,
    id_producto,
    id_actividad,
    id_indicador,
    id_meta,
    fetch_data_fuente_financiacion,
  } = useContext(DataContextFuentesFinanciacion);

  // declaracion redux
  const {
    fuente_financiacion: { id_fuente },
    // indicador: { id_indicador },
  } = useAppSelector((state) => state.planes);

  const onsubmit_fuente = handleSubmit_fuente(async (data) => {
    try {
      //  console.log('')(data, 'data');
      data.id_indicador = id_indicador;
      data.id_producto = id_producto;
      data.id_proyecto = id_proyecto;
      data.id_actividad = id_actividad;
      data.id_meta = id_meta;
      data.valor_total = Number(data.valor_total);
      data.vano_1 = Number(data.vano_1);
      data.vano_2 = Number(data.vano_2);
      data.vano_3 = Number(data.vano_3);
      data.vano_4 = Number(data.vano_4);
      set_is_saving_fuente(true);
      await post_fuentes_fiananciacion(data as IFuentesFinanciacion);
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
      data.id_indicador = id_indicador;
      data.id_producto = id_producto;
      data.id_proyecto = id_proyecto;
      data.id_actividad = id_actividad;
      data.id_meta = id_meta;
      data.valor_total = Number(data.valor_total);
      data.vano_1 = Number(data.vano_1);
      data.vano_2 = Number(data.vano_2);
      data.vano_3 = Number(data.vano_3);
      data.vano_4 = Number(data.vano_4);
      await put_fuentes_fiananciacion(
        (id_fuente as number) ?? 0,
        data as IFuentesFinanciacion
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
