/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { useForm } from 'react-hook-form';

export const useEntrega99 = (): any => {
  const {
    control: controlSegundoPasoEntrega99,
    handleSubmit: handleSubmitSegundoPasoEntrega99,
    // formState: formStateSegundoFormulario,
    setValue: setValueSegundoFormularioEntrega99,
    reset: resetSegundoFormularioEntrega99,
  } = useForm();

  const {
    control: controlTercerPasoEntrega99,
    handleSubmit: handleSubmitTercerPasoEntrega99,
    // formState: formStateTercerFormulario,
    setValue: setValueTercerFormularioEntrega99,
    reset: resetTercerPasoEntrega99,
  } = useForm();

  return {
    // ? Segundo paso
    controlSegundoPasoEntrega99,
    handleSubmitSegundoPasoEntrega99,
    setValueSegundoFormularioEntrega99,
    resetSegundoFormularioEntrega99,

    // ? Tercer paso
    controlTercerPasoEntrega99,
    handleSubmitTercerPasoEntrega99,
    setValueTercerFormularioEntrega99,
    resetTercerPasoEntrega99,
  };
};
