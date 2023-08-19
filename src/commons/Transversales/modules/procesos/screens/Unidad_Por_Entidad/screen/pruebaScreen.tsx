/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type FC } from 'react';
import { ContextUnidadxEntidad } from '../context/ContextUnidadxEntidad';
import { ModalHistoricoTraslados } from '../components/ModalHistoricoTraslado/screen/ModalHistoricoTraslados';

export const pruebaScreen: FC = (): JSX.Element => {
  const { handleModalHistoricos } = useContext(ContextUnidadxEntidad);

  return (
    <div>
      <button
        onClick={() => {
          handleModalHistoricos();
        }}
      >
        Open Modal historivos
      </button>

      <ModalHistoricoTraslados />
    </div>
  );
};
