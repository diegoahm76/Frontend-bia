/* eslint-disable @typescript-eslint/naming-convention */

import { useForm } from 'react-hook-form';

export const useUnidadAUnidad = (): any => {
  // ! ------- ELEMENTOS PARA FORMULARIOS (USE FORM) -------------------- //

  const {
    control: control_organigrama_anterior,
    reset: reset_organigrama_anterior,
    watch: watch_organigrama_anterior
  } = useForm();

  const {
    control: control_traslado_unidad_a_unidad,
    reset: reset_traslado_unidad_a_unidad,
    watch: watch_traslado_unidad_a_unidad
  } = useForm();
  const value_watch_traslado_unidad_a_unidad = watch_traslado_unidad_a_unidad();

  return {
    // ! ------- ELEMENTOS PARA FORMULARIOS (USE FORM) -------------------- //
    control_organigrama_anterior,
    reset_organigrama_anterior,
    watch_organigrama_anterior,

    control_traslado_unidad_a_unidad,
    reset_traslado_unidad_a_unidad,
    value_watch_traslado_unidad_a_unidad
  };
};
