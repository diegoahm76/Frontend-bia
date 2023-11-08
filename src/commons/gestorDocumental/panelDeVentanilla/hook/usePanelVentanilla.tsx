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
  } = useForm();

  //* ejecucion del watch
  const watch_busqueda_panel_ventanilla = watch_panel_ventanilla();

  return {
    //* se deben retornar todos los elemento necesarios para el manejo de las pantallas del panel de ventanilla

    // ? busqueda panel de ventanilla
    control_busqueda_panel_ventanilla,
    reset_busqueda_panel_ventanilla,
    watch_busqueda_panel_ventanilla,
  };
};
