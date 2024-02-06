/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../helpers';
import { useContext, useEffect, useState } from 'react';
import type { ISeguiminetoPOAI } from '../../types/types';
import { useAppSelector } from '../../../../hooks';
import { DataContextSeguimientoPOAI } from '../context/context';
import { post_seguimiento, put_seguimiento } from '../services/services';

export const useSeguimientoPOAIHook = (): any => {
  const {
    control: control_seguimiento,
    watch: watch_seguimiento,
    register: register_seguimiento,
    handleSubmit: handleSubmit_seguimiento,
    setValue: set_value_seguimiento,
    getValues: get_values_seguimiento,
    reset: reset_seguimiento,
    formState: { errors: errors_seguimiento },
  } = useForm<ISeguiminetoPOAI>({
    defaultValues: {
      id_seguimiento: 0,
      nombre_plan: '',
      nombre_programa: '',
      nombre_proyecto: '',
      nombre_producto: '',
      nombre_actividad: '',
      nombre_unidad: '',
      nombre_indicador: '',
      nombre_meta: '',
      codigo_modalidad: '',
      concepto: '',
      sector: '',
      nombre_fuente: '',
      cuenta: '',
      objeto_contrato: '',
      ubicacion: '',
      clase_tercero: '',
      porcentaje_pto: 0,
      vano_1: 0,
      vano_2: 0,
      vano_3: 0,
      vano_4: 0,
      valor_total: 0,
      numero_cdp_paa: 0,
      numero_rp_paa: 0,
      valor_seguimiento_banco_paa: 0,
      valor_cdp_paa: 0,
      valor_rp_paa: 0,
      fecha_termiacion: '',
      duracion: 0,
      valor_mesual_paoi: 0,
      mes_oferta_paa: '',
      mes_solicita: '',
      valor_pagado: 0,
      valor_obligado: 0,
      valor_saldo: 0,
      porcentaje_ejecuta: 0,
      numero_contrato: 0,
      numerp_rp: 0,
      fecha_rp: '',
      valor_cdp: 0,
      fecha_cdp: '',
      observaciones: '',
      id_plan: 0,
      id_programa: 0,
      id_proyecto: 0,
      id_producto: 0,
      id_actividad: 0,
      id_indicador: 0,
      id_meta: 0,
      id_concepto: 0,
      id_fuente_financiacion: 0,
      id_unidad_organizacional: 0,
      id_detalle_inversion: 0,
      id_banco_proyecto: 0,
      id_modalidad: 0,
      id_ubicacion: 0,
      id_clase_tercero: 0,
    },
  });

  const data_watch_seguimiento = watch_seguimiento();

  // limpiar formulario
  const limpiar_formulario_seguimiento = async () => {
    reset_seguimiento({
      id_seguimiento: 0,
      nombre_programa: '',
      nombre_proyecto: '',
      nombre_producto: '',
      nombre_actividad: '',
      nombre_unidad: '',
      nombre_indicador: '',
      nombre_meta: '',
      codigo_modalidad: '',
      concepto: '',
      sector: '',
      nombre_fuente: '',
      cuenta: '',
      objeto_contrato: '',
      ubicacion: '',
      clase_tercero: '',
      porcentaje_pto: 0,
      vano_1: 0,
      vano_2: 0,
      vano_3: 0,
      vano_4: 0,
      valor_total: 0,
      numero_cdp_paa: 0,
      numero_rp_paa: 0,
      valor_seguimiento_banco_paa: 0,
      valor_cdp_paa: 0,
      valor_rp_paa: 0,
      fecha_termiacion: '',
      duracion: 0,
      valor_mesual_paoi: 0,
      mes_oferta_paa: '',
      mes_solicita: '',
      valor_pagado: 0,
      valor_obligado: 0,
      valor_saldo: 0,
      porcentaje_ejecuta: 0,
      numero_contrato: 0,
      numerp_rp: 0,
      fecha_rp: '',
      valor_cdp: 0,
      fecha_cdp: '',
      observaciones: '',
      id_plan: 0,
      id_programa: 0,
      id_proyecto: 0,
      id_producto: 0,
      id_actividad: 0,
      id_indicador: 0,
      id_meta: 0,
      id_concepto: 0,
      id_fuente_financiacion: 0,
      id_unidad_organizacional: 0,
      id_detalle_inversion: 0,
      id_banco_proyecto: 0,
      id_modalidad: 0,
      id_ubicacion: 0,
      id_clase_tercero: 0,
    });
  };

  // saving
  const [is_saving_seguimiento, set_is_saving_seguimiento] =
    useState<boolean>(false);

  // declaracion context
  const {
    nombre_plan,
    nombre_programa,
    nombre_proyecto,
    nombre_producto,
    nombre_actividad,
    nombre_indicador,
    nombre_meta,
    id_proyecto,
    id_actividad,
    id_indicador,
    id_meta,
    id_producto,
    id_programa,
    id_plan,
    fetch_data_seguimiento,
  } = useContext(DataContextSeguimientoPOAI);

  useEffect(() => {
    console.log("entrooooooooooooooooo")
    set_value_seguimiento('nombre_plan', nombre_plan);
    set_value_seguimiento('nombre_programa', nombre_programa);
    set_value_seguimiento('nombre_proyecto', nombre_proyecto);
    set_value_seguimiento('nombre_producto', nombre_producto);
    set_value_seguimiento('nombre_actividad', nombre_actividad);
    set_value_seguimiento('nombre_indicador', nombre_indicador);
    set_value_seguimiento('nombre_meta', nombre_meta);
  }, [
    nombre_plan,
    nombre_programa,
    nombre_proyecto,
    nombre_producto,
    nombre_actividad,
    nombre_indicador,
    nombre_meta,
  ]);

  // declaracion redux
  const {
    seguimiento_poai: { id_seguimiento },
    // indicador: { id_indicador },
  } = useAppSelector((state) => state.planes);

  const onsubmit_seguimiento = handleSubmit_seguimiento(async (data) => {
    try {
      console.log(data, 'data');
      data.id_indicador = id_indicador;
      data.id_proyecto = id_proyecto;
      data.id_actividad = id_actividad;
      data.id_meta = id_meta;
      data.id_producto = id_producto;
      data.id_programa = id_programa;
      data.id_plan = id_plan;
      set_is_saving_seguimiento(true);
      await post_seguimiento(data as ISeguiminetoPOAI);
      control_success('Se creó correctamente');
      await limpiar_formulario_seguimiento();
      await fetch_data_seguimiento();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al crear, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_seguimiento(false);
    }
  });

  // editar

  const onsubmit_editar = handleSubmit_seguimiento(async (data) => {
    try {
      //  console.log('')(data, 'data');
      set_is_saving_seguimiento(true);
      data.id_indicador = id_indicador;
      data.id_proyecto = id_proyecto;
      data.id_actividad = id_actividad;
      data.id_meta = id_meta;
      data.id_producto = id_producto;
      data.id_programa = id_programa;
      data.id_plan = id_plan;
      await put_seguimiento(
        (id_seguimiento as number) ?? 0,
        data as ISeguiminetoPOAI
      );
      control_success('Se actualizó correctamente');
      await limpiar_formulario_seguimiento();
      await fetch_data_seguimiento();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'Hubo un error al actualizar, por favor intenta nuevamente'
      );
    } finally {
      set_is_saving_seguimiento(false);
    }
  });

  return {
    control_seguimiento,
    watch_seguimiento,
    register_seguimiento,
    handleSubmit_seguimiento,
    set_value_seguimiento,
    get_values_seguimiento,
    reset_seguimiento,
    errors_seguimiento,

    data_watch_seguimiento,

    onsubmit_seguimiento,
    onsubmit_editar,
    is_saving_seguimiento,

    limpiar_formulario_seguimiento,
  };
};
