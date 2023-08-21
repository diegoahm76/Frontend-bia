// import { setControlModeTrasladoUnidadXEntidad } from '../UxE_slice/UxE_slice';

/* eslint-disable @typescript-eslint/naming-convention */
export const navigateToRoute =
  (value: boolean, navigate: any) => (dispatch: any) => {
    console.log('navigateToRoute');
    const url = `/app/transversal/procesos/traslado_masivo_unidad_organizacional/`;
    // dispatch(setControlModeTrasladoUnidadXEntidad(value));
    navigate(value ? `${url}validaciones` : url);
  };
