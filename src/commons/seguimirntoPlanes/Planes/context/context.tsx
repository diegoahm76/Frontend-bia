/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { IPlanes } from '../../types/types';
import { control_error } from '../../../../helpers';
import { get_planes } from '../services/services';

interface UserContext {
  // * id

  // * rows
  rows_planes: IPlanes[];
  set_rows_planes: (value: IPlanes[]) => void;

  // * info

  // * fetch

  fetch_data_planes: () => Promise<void>;
}

export const DataContextPlanes = createContext<UserContext>({
  rows_planes: [],
  set_rows_planes: () => {},
  fetch_data_planes: async () => {},
});

export const UserProviderPlanes = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  //* redux declaration
  //   const { cajas } = useAppSelector((state) => state.deposito);

  // * id

  // * select

  // * rows

  const [rows_planes, set_rows_planes] = React.useState<IPlanes[]>([]);

  // * info

  // * fetch
  const fetch_data_planes = async (): Promise<void> => {
    try {
      const response = await get_planes();
      if (response?.length > 0) {
        const data_planes: IPlanes[] | any = response.map((item: IPlanes) => ({
          id_plan: item.id_plan,
          nombre_plan: item.nombre_plan,
          sigla_plan: item.sigla_plan,
          tipo_plan: item.tipo_plan,
          agno_inicio: item.agno_inicio,
          agno_fin: item.agno_fin,
          estado_vigencia: item.estado_vigencia,
        }));
        set_rows_planes(data_planes);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };
  const value: UserContext = {
    // * id

    // * select

    // * rows
    rows_planes,
    set_rows_planes,

    // * info

    // * fetch
    fetch_data_planes,
  };

  return <DataContextPlanes.Provider value={value}>{children}</DataContextPlanes.Provider>;
};
