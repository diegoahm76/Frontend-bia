/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import { IMetaIndicador } from '../../types/types';
import { useAppSelector } from '../../../../hooks';
import { post_meta, put_meta } from '../services/services';
import { DataContextMetas } from '../context/context';
import dayjs from 'dayjs';

export const useMetaHook = (): any => {
  const {
    control: control_meta,
    watch: watch_meta,
    register: register_meta,
    handleSubmit: handleSubmit_meta,
    setValue: set_value_meta,
    reset: reset_meta,
    formState: { errors: errors_meta },
  } = useForm<IMetaIndicador>({
    defaultValues: {
      nombre_indicador: '',
      nombre_meta: '',
      unidad_meta: '',
      porcentaje_meta: 0,
      valor_meta: '',
      cumplio: false,
      fecha_creacion_meta: '',
      agno_1: 0,
      agno_2: 0,
      agno_3: 0,
      agno_4: 0,
      valor_ejecutado_compromiso: 0,
      valor_ejecutado_obligado: 0,
      avance_fisico: 0,
      id_indicador: 0,
      id_plan: 0,
      id_programa: 0,
      id_proyecto: 0,
      id_producto: 0,
      id_actividad: 0,
      nombre_plan: '',
      nombre_programa: '',
      nombre_proyecto: '',
      nombre_producto: '',
      nombre_actividad: '',
    },
  });

  const data_watch_meta = watch_meta();

  // limpiar formulario
  const limpiar_formulario_meta = async () => {
    reset_meta({
      nombre_indicador: '',
      nombre_meta: '',
      unidad_meta: '',
      porcentaje_meta: 0,
      valor_meta: '',
      cumplio: false,
      fecha_creacion_meta: '',
      agno_1: 0,
      agno_2: 0,
      agno_3: 0,
      agno_4: 0,
      valor_ejecutado_compromiso: 0,
      valor_ejecutado_obligado: 0,
      avance_fisico: 0,
      id_indicador: 0,
      id_plan: 0,
      id_programa: 0,
      id_proyecto: 0,
      id_producto: 0,
      id_actividad: 0,
      nombre_plan: '',
      nombre_programa: '',
      nombre_proyecto: '',
      nombre_producto: '',
      nombre_actividad: '',
    });
  };

  // saving
  const [is_saving_meta, set_is_saving_meta] = useState<boolean>(false);

  // declaracion context
  const {
    id_plan,
    id_programa,
    id_proyecto,
    id_producto,
    id_actividad,
    id_indicador,
    fetch_data_mata_indicador,
  } = useContext(DataContextMetas);

  // declaracion redux
  const {
    meta: { id_meta },
    // indicador: { id_indicador },
  } = useAppSelector((state) => state.planes);

  const onsubmit_meta = handleSubmit_meta(async (data) => {
    try {
      set_is_saving_meta(true);
      data.id_plan = id_plan;
      data.id_programa = id_programa;
      data.id_proyecto = id_proyecto;
      data.id_producto = id_producto;
      data.id_actividad = id_actividad;
      data.id_indicador = id_indicador;
      data.fecha_creacion_meta = dayjs(data.fecha_creacion_meta).format(
        'YYYY-MM-DD'
      );
      await post_meta(data as IMetaIndicador);
      control_success('Se creó correctamente');
      await limpiar_formulario_meta();
      await fetch_data_mata_indicador();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_meta(false);
    }
  });

  // editar

  const onsubmit_editar = handleSubmit_meta(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_meta(true);
      data.id_plan = id_plan;
      data.id_programa = id_programa;
      data.id_proyecto = id_proyecto;
      data.id_producto = id_producto;
      data.id_actividad = id_actividad;
      data.id_indicador = id_indicador;
      data.fecha_creacion_meta = dayjs(data.fecha_creacion_meta).format(
        'YYYY-MM-DD'
      );
      await put_meta((id_meta as number) ?? 0, data as IMetaIndicador);
      control_success('Se actualizó correctamente');
      await limpiar_formulario_meta();
      await fetch_data_mata_indicador();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_meta(false);
    }
  });

  return {
    control_meta,
    watch_meta,
    register_meta,
    handleSubmit_meta,
    set_value_meta,
    reset_meta,
    errors_meta,

    data_watch_meta,

    onsubmit_meta,
    onsubmit_editar,
    is_saving_meta,

    limpiar_formulario_meta,
  };
};
