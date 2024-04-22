/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { IPlanes } from '../../types/types';
import { control_error } from '../../../../helpers';
import { get_planes, get_planes_pgar } from '../services/services';

interface UserContext {
  // * id
  id_plan: number | null;
  set_id_plan: (value: number | null) => void;

  // * rows
  rows_planes: IPlanes[];
  set_rows_planes: (value: IPlanes[]) => void;

  // * info

  // * fetch

  fetch_data_planes: () => Promise<void>;
  fetch_data_planes_pgar: () => Promise<void>;
}

export const DataContextPlanes = createContext<UserContext>({
  // * id
  id_plan: null,
  set_id_plan: () => {},
  // * rows
  rows_planes: [],
  set_rows_planes: () => {},
  fetch_data_planes: async () => {},
  fetch_data_planes_pgar: async () => {},
});

export const UserProviderPlanes = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  //* redux declaration
  //   const { cajas } = useAppSelector((state) => state.deposito);

  // * id
  const [id_plan, set_id_plan] = React.useState<number | null>(null);

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

  const fetch_data_planes_pgar = async (): Promise<void> => {
    try {
      const response = await get_planes_pgar();
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
    id_plan,
    set_id_plan,

    // * select

    // * rows
    rows_planes,
    set_rows_planes,

    // * info

    // * fetch
    fetch_data_planes,
    fetch_data_planes_pgar
  };

  return <DataContextPlanes.Provider value={value}>{children}</DataContextPlanes.Provider>;
};
