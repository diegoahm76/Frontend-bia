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
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

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
        idComparacion: oficina?.id_unidad_organizacional,
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

    //* unidades responsable inicial

    const unidadesPadreUnidas = grilladoDeOficinas?.unidadActual?.map(
      (unidadActual: any, index: number) => {
        const unidadNueva = grilladoDeOficinas?.unidadNueva[index];

        return {
          id_unidad_actual: unidadActual.id_unidad_organizacional,
          id_unidad_nueva: unidadNueva?.id_unidad_organizacional,
        };
      }
    );

    /*   console.log('unidadesPadreUnidasasasasas', [
      ...unidadesPadreUnidas,
      ...oficinasDelegadas,
    ]); */

    postDelegaciones({
      delegaciones: {
        id_ccd_nuevo: ccdOrganigramaCurrentBusquedaOfiResp.id_ccd,
        unidad_responsable: [...unidadesPadreUnidas],
        oficinas_delegadas: [...oficinasDelegadas],
      },
      setLoading: setLoadingButton,
    }).then((res) => {
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
