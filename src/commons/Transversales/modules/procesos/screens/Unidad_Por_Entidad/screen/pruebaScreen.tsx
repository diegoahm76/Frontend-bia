/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type FC } from 'react';
import { ContextUnidadxEntidad } from '../context/ContextUnidadxEntidad';

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
    </div>
  );
};
