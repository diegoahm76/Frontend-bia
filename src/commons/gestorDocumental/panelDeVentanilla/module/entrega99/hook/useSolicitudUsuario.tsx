/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';

export const useSolicitudUsuario = () => {
  const {
    control: controlFormulario,
    handleSubmit: handleSubmitFormulario,
    formState: { errors: errorsFormulario },
    reset: resetFormulario,
    watch: watchFormulario,
    setValue: setValueFormulario,
    getValues: getValuesFormulario,
  } = useForm();

  return {
    // ? formulario
    controlFormulario,
    handleSubmitFormulario,
    errorsFormulario,
    resetFormulario,
    watchFormulario,
  };
};
