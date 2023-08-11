/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState, type FC } from 'react';
import { HistoricoTraslados } from '../components/HistoricoTraslados/screen/HistoricoTraslados';

export const Unidad_A_Unidad: FC = (): JSX.Element => {
  const [modalHistoricoTraslados, setmModalHistoricoTraslados] =
    useState<boolean>(false);

  return (
    <>
      {/* Parte Uno - Organigrama Anterior  */}
      <button type="button" onClick={() => setmModalHistoricoTraslados(true)}>
        open historicos
      </button>

      <h3>Informacion del organigrama anterior</h3>

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
