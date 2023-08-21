/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';

export const use_u_x_entidad = (): any => {
  // ! -------------------------- USE FORM NECESARIOS PARA EL FUNCIONAMIENTO DE LA APP -------------------------- //

  const {
    control: control_opciones_traslado,
    handleSubmit: handleSubmit_opciones_traslado,
    reset: reset_opciones_traslado,
    watch: watch_opciones_traslado
  } = useForm({
    defaultValues: {
      opciones_traslado: {
        value: '',
        label: ''
      }
    }
  });

  const values_watch_opciones_traslado = watch_opciones_traslado();

  // * -------------------------- FUNCIONES NECESARIAS PARA EL FUNCIONAMIENTO DE LA APP -------------------------- *//

  // ! -- clean all data function -- //
  const cleanAllData = (): void => {
    //* --- clean data from redux toolkit
    // dispatch(setControlModeTrasladoUnidadXEntidad(false));
    // dispatch(setEleccionOpcionTrasladoUnidadXEntidad(false));
    //* --- clean data from context
    // setloadingConsultaT026(false);
    //* --- clean data from use form
    reset_opciones_traslado({
      opciones_traslado: {
        value: '',
        label: ''
      }
    });
  };

  return {
    //* ------ elementos para el control de las opciones de traslado masivo ------ *//
    control_opciones_traslado,
    handleSubmit_opciones_traslado,
    reset_opciones_traslado,
    values_watch_opciones_traslado,

    //* clean all data for the application
    cleanAllData
  };
};
