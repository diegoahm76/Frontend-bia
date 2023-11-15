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

  return {
    // ? Segundo paso
    controlSegundoPasoEntrega99,
    handleSubmitSegundoPasoEntrega99,
    setValueSegundoFormularioEntrega99,
    resetSegundoFormularioEntrega99,
  };
};
