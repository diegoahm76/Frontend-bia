/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { IProgramas } from '../../types/types';
import { control_error } from '../../../../helpers';
import { useAppSelector } from '../../../../hooks';
import { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import { get_programa_id } from '../services/services';

interface UserContext {
  // * id

  // * rows
  rows_programa: IProgramas[];
  set_rows_programa: (value: IProgramas[]) => void;

  // * select
  tipo_eje_selected: ValueProps[];
  set_tipo_eje_selected: (value: ValueProps[]) => void;

  // * info

  // * fetch

  fetch_data_programa: () => Promise<void>;
}

export const DataContextprograma = createContext<UserContext>({
  rows_programa: [],
  set_rows_programa: () => {},

  tipo_eje_selected: [],
  set_tipo_eje_selected: () => {},

  fetch_data_programa: async () => {},
});

export const UserProviderPrograma= ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id

  // * select
  const [tipo_eje_selected, set_tipo_eje_selected] = React.useState<
    ValueProps[]
  >([]);

  // * rows

  const [rows_programa, set_rows_programa] = React.useState<
    IProgramas[]
  >([]);

  // * info

  // * fetch
  //* declaracion context
  const {
    plan: { id_plan },
  } = useAppSelector((state) => state.planes);

  const fetch_data_programa = async (): Promise<void> => {
    try {
      set_rows_programa([]);
      const response = await get_programa_id(id_plan as number);
      if (response?.length > 0) {
        const data_programa: IProgramas[] = response.map(
          (item: IProgramas) => ({
            id_programa: item.id_programa,
            nombre_plan: item.nombre_plan,
            nombre_programa: item.nombre_programa,
            porcentaje_1: item.porcentaje_1,
            porcentaje_2: item.porcentaje_2,
            porcentaje_3: item.porcentaje_3,
            porcentaje_4: item.porcentaje_4,
            id_plan: item.id_plan,
            fecha_creacion: item.fecha_creacion,
            cumplio: item.cumplio,
          })
        );

        set_rows_programa(data_programa);
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
    tipo_eje_selected,
    set_tipo_eje_selected,

    // * rows
    rows_programa,
    set_rows_programa,

    // * info

    // * fetch
    fetch_data_programa,
  };

  return (
    <DataContextprograma.Provider value={value}>
      {children}
    </DataContextprograma.Provider>
  );
};
