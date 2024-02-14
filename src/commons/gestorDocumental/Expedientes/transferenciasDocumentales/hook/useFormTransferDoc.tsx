/* eslint-disable @typescript-eslint/naming-convention */

import { useForm } from 'react-hook-form';

export const useFormTransferDoc = () => {
  const {
    control: controlHistorialTransferencias,
    reset: resetHistorialTransferencias,
    watch: watchHistorialTransferencias,
  } = useForm();

  //* ejecucion del watch
  const watchHistorialTransferenciasExe = watchHistorialTransferencias();
  // ? ------- funciones para el manejo de los elementos de la busqueda de la bandeja de tareas -------

  return {
    // ? para el formulario del historial de transferencias
    controlHistorialTransferencias,
    resetHistorialTransferencias,
    watchHistorialTransferenciasExe,
  };
};
