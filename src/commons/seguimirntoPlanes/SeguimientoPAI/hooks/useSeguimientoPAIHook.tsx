/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useState } from 'react';
import { ISeguimientoPAI } from '../../types/types';
import { useAppSelector } from '../../../../hooks';
import {
  post_seguimiento_pai,
  put_seguimiento_pai,
} from '../services/services';
import { DataContextSeguimientoPAI } from '../context/context';
import dayjs from 'dayjs';

export const useSeguimientoPAIHook = (): any => {
  const {
    control: control_seguimiento_pai,
    watch: watch_seguimiento_pai,
    register: register_seguimiento_pai,
    handleSubmit: handleSubmit_seguimiento_pai,
    setValue: set_value_seguimiento_pai,
    reset: reset_seguimiento_pai,
    formState: { errors: errors_seguimiento_pai },
  } = useForm<ISeguimientoPAI>({
    defaultValues: {
      nombre_programa: '',
      nombre_proyecto: '',
      nombre_producto: '',
      nombre_actividad: '',
      nombre_unidad: '',
      nombre_indicador: '',
      nombre_meta: '',
      razagada: false,
      mes: '',
      porcentaje_avance: 0,
      fecha_registro_avance: '',
      entrega_vigencia: '',
      hizo: '',
      cuando: '',
      donde: '',
      resultado: '',
      participacion: '',
      beneficiarios: '',
      compromisos: '',
      contratros: '',
      adelanto: '',
      fecha_creacion: '',
      id_unidad_organizacional: 0,
      id_programa: 0,
      id_proyecto: 0,
      id_producto: 0,
      id_actividad: 0,
      id_indicador: 0,
      id_meta: 0,
    },
  });

  const data_watch_seguimiento_pai = watch_seguimiento_pai();
  // declaracion context
  const {
    archivos,
    set_archivos,
    fetch_data_seguimiento_pai,
    fetch_data_anexos,
  } = useContext(DataContextSeguimientoPAI);

  // limpiar formulario
  const limpiar_formulario_seguimiento_pai = async () => {
    set_archivos([]);
    reset_seguimiento_pai({
      nombre_proyecto: '',
      nombre_producto: '',
      nombre_actividad: '',
      nombre_unidad: '',
      nombre_indicador: '',
      nombre_meta: '',
      razagada: false,
      mes: '',
      porcentaje_avance: 0,
      fecha_registro_avance: '',
      entrega_vigencia: '',
      hizo: '',
      cuando: '',
      donde: '',
      resultado: '',
      participacion: '',
      beneficiarios: '',
      compromisos: '',
      contratros: '',
      adelanto: '',
      fecha_creacion: '',
      id_unidad_organizacional: 0,
      id_proyecto: 0,
      id_producto: 0,
      id_actividad: 0,
      id_indicador: 0,
      id_meta: 0,
    });
  };

  // saving
  const [is_saving_seguimiento_pai, set_is_saving_seguimiento_pai] =
    useState<boolean>(false);

  // declaracion redux
  const {
    seguimiento_pai: { id_seguimiento_pai, fecha_registro_avance },
    // indicador: { id_indicador },
  } = useAppSelector((state) => state.planes);

  const currentDate = dayjs().format('YYYY-MM-DD');

  const onsubmit_seguimiento_pai = handleSubmit_seguimiento_pai(
    async (data) => {
      try {
        set_is_saving_seguimiento_pai(true);
        data.fecha_creacion = currentDate;
        console.log('data', data);
        const datos_documentos = new FormData();
        archivos.forEach((archivo: any) => {
          if (archivo != null) {
            datos_documentos.append(`archivo`, archivo);
          }
        });
        data.fecha_registro_avance = currentDate;
        // data.id_indicador = id_indicador;
        await post_seguimiento_pai(
          data as ISeguimientoPAI,
          datos_documentos,
          archivos
        );
        control_success('Se creó correctamente');
        await limpiar_formulario_seguimiento_pai();
        await fetch_data_seguimiento_pai();
      } catch (error: any) {
        control_error(
          error.response.data.detail ||
            'Hubo un error al crear, por favor intenta nuevamente'
        );
      } finally {
        set_is_saving_seguimiento_pai(false);
      }
    }
  );

  // editar

  const onsubmit_editar = handleSubmit_seguimiento_pai(async (data) => {
    try {
      console.log('data', data);

      set_is_saving_seguimiento_pai(true);
      data.fecha_registro_avance = fecha_registro_avance;
      data.fecha_creacion = dayjs(data.fecha_creacion).format('YYYY-MM-DD');
      const datos_documentos = new FormData();

      archivos.forEach((archivo: any) => {
        if (archivo != null) {
          datos_documentos.append(`archivo`, archivo);
        }
      });
      await put_seguimiento_pai(
        (id_seguimiento_pai as number) ?? 0,
        data as ISeguimientoPAI,
        datos_documentos,
        archivos
      );
      control_success('Se actualizó correctamente');
      await limpiar_formulario_seguimiento_pai();
      await fetch_data_seguimiento_pai();
      await fetch_data_anexos();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_seguimiento_pai(false);
    }
  });

  return {
    control_seguimiento_pai,
    watch_seguimiento_pai,
    register_seguimiento_pai,
    handleSubmit_seguimiento_pai,
    set_value_seguimiento_pai,
    reset_seguimiento_pai,
    errors_seguimiento_pai,

    data_watch_seguimiento_pai,

    onsubmit_seguimiento_pai,
    onsubmit_editar,
    is_saving_seguimiento_pai,

    limpiar_formulario_seguimiento_pai,
  };
};
