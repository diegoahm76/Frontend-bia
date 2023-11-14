/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { AccionesFinalModulo } from '../../../../../../../utils/AccionesFinalModulo/Atom/AccionesFinalModulo';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import {
  reset_states_asi_ofi_resp,
  setGrilladoOficinas,
  setOficinasNuevaSeleccionadas,
} from '../../toolkit/slice/DelOfiResSlice';
import { postDelegaciones } from '../../toolkit/thunks/postDelegaciones.service';

export const AccionesFinal = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* redux states
  const {
    ccdOrganigramaCurrentBusquedaOfiResp,
    oficinasNuevaSeleccionadas,
    grilladoDeOficinas,
  } = useAppSelector((state) => state.DelOfiResSlice);

  const [LoadingButton, setLoadingButton] = useState(false);

  //* crear funcion onsubmit

  if (!ccdOrganigramaCurrentBusquedaOfiResp) return <></>;

  const handleSubmit = async () => {
    const oficinasNuevas = Object.values(oficinasNuevaSeleccionadas).map(
      (oficina: any) => ({
        idComparacion: oficina?.idUnidadOrganizacional,
        id_unidad_nueva: oficina?.value,
      })
    );

    const oficinasActuales = grilladoDeOficinas?.oficinasActuales.map(
      (oficina: any) => ({
        idComparacion: oficina?.id_unidad_organizacional,
        id_unidad_actual: oficina?.id_unidad_organizacional,
      })
    );

    const oficinasDelegadas = oficinasNuevas
      .map((oficinaNueva: any) => {
        const oficinaActual = oficinasActuales?.find(
          (oficinaActual: any) =>
            oficinaActual.idComparacion === oficinaNueva.idComparacion
        );

        return oficinaActual
          ? {
              id_unidad_actual: oficinaActual.id_unidad_actual,
              id_unidad_nueva: oficinaNueva.id_unidad_nueva,
            }
          : null;
      })
      .filter(Boolean);

    postDelegaciones({
      delegaciones: {
        id_ccd_nuevo: ccdOrganigramaCurrentBusquedaOfiResp.id_ccd,
        oficinas_delegadas: oficinasDelegadas,
      },
      setLoading: setLoadingButton,
    }).then((res) => {
      // limpiar el campo de grid de los select y volver a traer las secciones / subsecciones

      // ? se limpian los estados
      reset_states_asi_ofi_resp();
      dispatch(setOficinasNuevaSeleccionadas([]));
      dispatch(setGrilladoOficinas([]));
    });
  };

  return (
    <AccionesFinalModulo
      loadingButton={LoadingButton}
      handleSubmit={handleSubmit}
      reset_states={reset_states_asi_ofi_resp}
    />
  );
};
