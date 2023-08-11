/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect, type FC } from 'react';
import { HistoricoTraslados } from '../components/HistoricoTraslados/screen/HistoricoTraslados';
import { OrgAnteriorScreen } from '../components/OrganigramaAnterior/screen/OrgAnteriorScreen';

export const Unidad_A_Unidad: FC = (): JSX.Element => {
  // ! ------ USE STATES DECLARATIONS ------
  const [modalHistoricoTraslados, setmModalHistoricoTraslados] =
    useState<boolean>(false);

  // ! ------ USE EFFECTS DECLARATIONS------

  // ?  use effect that allow us to get the data to fill the select of unidad a unidad (unidades retiradas (organigrama anterior))

  useEffect(() => {
    console.log('hi from useeffect');
  }, []);

  return (
    <>
      {/* Parte Uno - Organigrama Anterior  */}
      <button type="button" onClick={() => setmModalHistoricoTraslados(true)}>
        open historicos
      </button>

      <OrgAnteriorScreen />

      {/* Parte Dos - Proceso de traslado de unidad a unidad  */}
      <h3>Proceso de traslado de unidad a unidad</h3>

      {/* Parte Tres - Historico de traslados masivos de unidad a unidad  */}
      <HistoricoTraslados
        modalHistoricoTraslados={modalHistoricoTraslados}
        setModalHistoricoTraslados={setmModalHistoricoTraslados}
      />
    </>
  );
};
