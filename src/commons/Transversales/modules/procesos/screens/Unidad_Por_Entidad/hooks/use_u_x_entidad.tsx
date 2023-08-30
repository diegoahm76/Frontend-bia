/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type IList } from './types/use_u_x_entidad.types';

export const use_u_x_entidad = (): any => {
  // ! -------------------------- USE FORM NECESARIOS PARA EL FUNCIONAMIENTO DE LA APP -------------------------- //

  // ? ----- use form de las opciones del traslado masivo de unidad por entidad ----- //
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

  // ? ----- useform de la opción # 1 del traslado masivo (actual a nuevo)----- //

  const {
    control: control_opcion_actual_a_nuevo,
    reset: reset_opcion_actual_a_nuevo,
    watch: watch_opcion_actual_a_nuevo
  } = useForm();

  const watch_values_opcion_actual_a_nuevo = watch_opcion_actual_a_nuevo();

  // ? ----- useform de la opción # 2 del traslado masivo (anterior a actual)----- //

  const {
    control: control_opcion_anterior_a_actual,
    reset: reset_opcion_anterior_a_actual,
    watch: watch_opcion_anterior_a_actual
  } = useForm();

  const watch_values_opcion_anterior_a_actual =
    watch_opcion_anterior_a_actual();

  // ? use states necesarios para el funcionamiento de la app
  const [organigramaActual, setOrganigramaActual] = useState<IList[] | any>([
    {
      label: '',
      value: 0
    }
  ]);

  const [organigramasDisponibles, setOrganigramasDisponibles] = useState<
    IList[] | any
  >([
    {
      label: '',
      value: 0
    }
  ]);

  const [organigramaAnterior, setOrganigramaAnterior] = useState<
    IList[] | any
  >([
    {
      label: '',
      value: 0
    }
  ]);

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

    //* - elementos para el control de la opción # 1 del traslado masivo (actual a nuevo) -- *//
    control_opcion_actual_a_nuevo,
    reset_opcion_actual_a_nuevo,
    watch_values_opcion_actual_a_nuevo,

    //* elementos para el control de la opción # 2 del traslado masivo (anterior a actual) - *//
    control_opcion_anterior_a_actual,
    reset_opcion_anterior_a_actual,
    watch_values_opcion_anterior_a_actual,

    //* -- use states necesarios para el funcionamiento de la app -- *//
    organigramaActual,
    setOrganigramaActual,
    organigramasDisponibles,
    setOrganigramasDisponibles,
    organigramaAnterior,
    setOrganigramaAnterior,

    //* clean all data for the application
    cleanAllData
  };
};
