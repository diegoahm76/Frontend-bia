/* eslint-disable @typescript-eslint/naming-convention */

import { useForm } from 'react-hook-form';
import { control } from 'leaflet';

export const usePanelVentanilla = () => {
  // ? use Form declaration
  const {
    control: control_busqueda_panel_ventanilla,
    setValue: set_value_valores_panel_ventanilla,
    reset: reset_busqueda_panel_ventanilla,
    watch: watch_panel_ventanilla,
  } = useForm({
    // ? pendiente el tipado, ya que por base de datos quizá cambie la información que se necesita
    defaultValues: {
      tipo_de_solicitud: {
        value: '',
        label: '',
      },
      estado_actual: {
        value: '',
        label: '',
      },
      radicado: '',
    },
  });

  //* ejecucion del watch
  const watch_busqueda_panel_ventanilla = watch_panel_ventanilla();

  // ? ------- funciones para el manejo de los elementos del panel de ventanilla -------
  const reset_search_form = () =>
    reset_busqueda_panel_ventanilla({
      tipo_de_solicitud: {
        value: '',
        label: '',
      },
      estado_actual: {
        value: '',
        label: '',
      },
      radicado: '',
    });

  return {
    //* se deben retornar todos los elemento necesarios para el manejo de las pantallas del panel de ventanilla

    // ? busqueda panel de ventanilla
    control_busqueda_panel_ventanilla,
    watch_busqueda_panel_ventanilla,

    //* funciones de reset
    reset_search_form,
  };
};
