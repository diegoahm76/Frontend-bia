/* eslint-disable @typescript-eslint/naming-convention */

import { useForm } from 'react-hook-form';

export const useUnidadAUnidad = (): any => {
  // ! ------- ELEMENTOS PARA FORMULARIOS (USE FORM) -------------------- //

  const {
    control: control_organigrama_anterior,
    reset: reset_organigrama_anterior,
    watch: watch_organigrama_anterior
  } = useForm();

  return {
    control_organigrama_anterior,
    reset_organigrama_anterior,
    watch_organigrama_anterior
  };
};
