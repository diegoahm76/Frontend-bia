/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { IMetaIndicador } from '../../types/types';
import { control_error } from '../../../../helpers';
import { useAppSelector } from '../../../../hooks';
import { get_metas_id } from '../services/services';

interface UserContext {
  // * id

  // * rows
  rows_metas: IMetaIndicador[];
  set_rows_metas: (value: IMetaIndicador[]) => void;

  // * select

  // * info

  // * fetch

  fetch_data_mata_indicador: () => Promise<void>;
}

export const DataContextMetas = createContext<UserContext>({
  rows_metas: [],
  set_rows_metas: () => {},

  fetch_data_mata_indicador: async () => {},
});

export const UserProviderMetas = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id

  // * select

  // * rows

  const [rows_metas, set_rows_metas] = React.useState<IMetaIndicador[]>([]);

  // * info

  // * fetch
  //* declaracion context
  const {
    indicador: { id_indicador },
  } = useAppSelector((state) => state.planes);

  const fetch_data_mata_indicador = async (): Promise<void> => {
    try {
      set_rows_metas([]);
      const response = await get_metas_id(id_indicador as number);
      if (response?.length > 0) {
        const data_meta: IMetaIndicador[] = response.map(
          (item: IMetaIndicador) => ({
            id_meta: item.id_meta,
            nombre_indicador: item.nombre_indicador,
            nombre_meta: item.nombre_meta,
            unidad_meta: item.unidad_meta,
            porcentaje_meta: item.porcentaje_meta,
            valor_meta: item.valor_meta,
            cumplio: item.cumplio,
            fecha_creacion_meta: item.fecha_creacion_meta,
            agno_1: item.agno_1,
            agno_2: item.agno_2,
            agno_3: item.agno_3,
            agno_4: item.agno_4,
            valor_ejecutado_compromiso: item.valor_ejecutado_compromiso,
            valor_ejecutado_obligado: item.valor_ejecutado_obligado,
            avance_fisico: item.avance_fisico,
            id_indicador: item.id_indicador,
          })
        );

        set_rows_metas(data_meta);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const value: UserContext = {
    // * id

    // * select

    // * rows
    rows_metas,
    set_rows_metas,

    // * info

    // * fetch
    fetch_data_mata_indicador,
  };

  return (
    <DataContextMetas.Provider value={value}>
      {children}
    </DataContextMetas.Provider>
  );
};
