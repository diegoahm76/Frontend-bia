/* eslint-disable @typescript-eslint/naming-convention */
import { control_warning } from "../../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks";

const withValidation =
(fn: Function) => (action: { disabled: boolean; path: string }, navigate: any) => {
  if (action.disabled) {
    control_warning(
      'Esta acción no está disponible para el elemento el cual seleccionaste'
    );
  } else {
    navigate(action.path);
    fn();
  }
};

export {
  withValidation,
}