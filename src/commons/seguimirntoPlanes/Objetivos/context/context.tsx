/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { IObjetivo } from '../../types/types';
import { control_error } from '../../../../helpers';
import { useAppSelector } from '../../../../hooks';
import { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import { get_objetivo_id } from '../services/services';

interface UserContext {
  // * id

  // * rows
  rows_objetivo: IObjetivo[];
  set_rows_objetivo: (value: IObjetivo[]) => void;

  // * select
  tipo_eje_selected: ValueProps[];
  set_tipo_eje_selected: (value: ValueProps[]) => void;

  // * info

  // * fetch

  fetch_data_objetivo: () => Promise<void>;
}

export const DataContextObjetivo = createContext<UserContext>({
  rows_objetivo: [],
  set_rows_objetivo: () => {},

  tipo_eje_selected: [],
  set_tipo_eje_selected: () => {},

  fetch_data_objetivo: async () => {},
});

export const UserProviderObjetivo= ({
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

  const [rows_objetivo, set_rows_objetivo] = React.useState<
    IObjetivo[]
  >([]);

  // * info

  // * fetch
  //* declaracion context
  const {
    plan: { id_plan },
  } = useAppSelector((state) => state.planes);

  const fetch_data_objetivo = async (): Promise<void> => {
    try {
      set_rows_objetivo([]);
      const response = await get_objetivo_id(id_plan as number);
      if (response?.length > 0) {
        const data_objetivo: IObjetivo[] = response.map(
          (item: IObjetivo) => ({
            id_objetivo: item.id_objetivo,
            nombre_plan: item.nombre_plan,
            nombre_objetivo: item.nombre_objetivo,
            id_plan: item.id_plan,
          })
        );

        set_rows_objetivo(data_objetivo);
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
    rows_objetivo,
    set_rows_objetivo,

    // * info

    // * fetch
    fetch_data_objetivo,
  };

  return (
    <DataContextObjetivo.Provider value={value}>
      {children}
    </DataContextObjetivo.Provider>
  );
};
