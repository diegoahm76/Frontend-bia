/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect, type FC } from 'react';
import { HistoricoTraslados } from '../components/HistoricoTraslados/screen/HistoricoTraslados';
import { OrgAnteriorScreen } from '../components/OrganigramaAnterior/screen/OrgAnteriorScreen';
import {
  getOrganigramaAnterior,
  getUnidadesOrgActual,
  getUnidadesOrgAnterior
} from '../toolkit/thunks/thunks_uni_a_uni';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import {
  setOrganigramaAnterior,
  setUnidadesOrgActual,
  setUnidadesOrgAnterior
} from '../toolkit/slice/Uni_A_UniSlice';
import { Loader } from '../../../../../../../utils/Loader/Loader';
import { ProcesoTrasladoScreen } from '../components/ProcesoTraslado/screen/ProcesoTrasladoScreen';

export const Unidad_A_Unidad: FC = (): JSX.Element => {
  // ! -------------- dispatch declaration --------------------------------
  const dispatch = useAppDispatch();

  // ! ------ USE SELECTORS DECLARATIONS ------
  const { organigrama_anterior } = useAppSelector(
    (state) => state.uni_a_uni_slice
  );

  // ! ------ USE STATES DECLARATIONS ------

  // ? modal to open the historico de traslados masivos de unidad a unidad

  const [modalHistoricoTraslados, setmModalHistoricoTraslados] =
    useState<boolean>(false);

  // ? state para renderizas las unidades del org anterior

  // ! ------ USE EFFECTS DECLARATIONS------

  // ?  use effect that allow us to get the data to fill the select of unidad a unidad (unidades retiradas (organigrama anterior))

  useEffect(() => {
    //* get unidades organigrama actual
    void getUnidadesOrgActual().then((unidades: any) => {
      const unidadesEditedOrganigramaActual = unidades
        .filter((el: any) => el.activo)
        .map((unidad: any) => {
          return {
            unidad,
            value: unidad.id_unidad_organizacional,
            label: unidad.nombre
          };
        });
        //* setear unidades ogrnigrama actual
        dispatch(setUnidadesOrgActual(unidadesEditedOrganigramaActual));
      })

    //* get unidades organigrama anterior
    void getUnidadesOrgAnterior().then((unidades: any) => {
      const unidadesEditedToSelect = unidades
        .filter((el: any) => el.activo)
        .map((unidad: any) => {
          return {
            unidad,
            value: unidad.id_unidad_organizacional,
            label: unidad.nombre
          };
        });
      //* setear unidades ogrnigrama anterior
      dispatch(setUnidadesOrgAnterior(unidadesEditedToSelect));

      //* get organigrama retirado recientemente de producción
      void getOrganigramaAnterior(unidades[0].id_organigrama).then((org) => {
        dispatch(setOrganigramaAnterior(org));
      });
    });
  }, [])


  if (!organigrama_anterior || Object.keys(organigrama_anterior).length === 0)
    return <Loader />;

  return (
    <>
      {/* Parte Uno - Organigrama Anterior  */}
      <OrgAnteriorScreen />

      {/* Parte Dos - Proceso de traslado de unidad a unidad  */}
      <ProcesoTrasladoScreen
        setmModalHistoricoTraslados={setmModalHistoricoTraslados}
      />

      {/* Parte Tres - Historico de traslados masivos de unidad a unidad  */}
      <HistoricoTraslados
        modalHistoricoTraslados={modalHistoricoTraslados}
        setModalHistoricoTraslados={setmModalHistoricoTraslados}
      />
    </>
  );
};
