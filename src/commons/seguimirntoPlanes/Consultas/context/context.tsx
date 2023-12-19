/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import { control_error } from '../../../../helpers';
import { get_consulta_plan } from '../services/services';
import { IPlan } from '../types/types';

interface UserContext {
  // * id

  // * rows
  rows_planes: IPlan[];
  set_rows_planes: (value: IPlan[]) => void;

  // * info

  // * fetch

  fetch_data_planes: () => Promise<void>;
}

export const DataContextConsularPlanes = createContext<UserContext>({
  rows_planes: [],
  set_rows_planes: () => {},
  fetch_data_planes: async () => {},
});

export const UserProviderConsultarPlanes = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  //* redux declaration
  //   const { cajas } = useAppSelector((state) => state.deposito);

  // * id

  // * select

  // * rows

  const [rows_planes, set_rows_planes] = React.useState<IPlan[]>([]);

  // * info

  // * fetch
  const fetch_data_planes = async (): Promise<void> => {
    try {
      console.log('fetch_data_planes');
      const response = await get_consulta_plan();
      if (response?.length > 0) {
        const data_planes: IPlan[] | any = response.map((item: IPlan) => ({
          id_plan: item.id_plan,
          nombre_plan: item.nombre_plan,
          objetivos: item.objetivos,
          ejes_estractegicos: item.ejes_estractegicos,
          programas: item.programas,
          sigla_plan: item.sigla_plan,
          tipo_plan: item.tipo_plan,
          agno_inicio: item.agno_inicio,
          agno_fin: item.agno_fin,
          estado_vigencia: item.estado_vigencia,
        }));

        set_rows_planes(data_planes);
        console.log('data_planes', data_planes);
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

  return (
    <DataContextConsularPlanes.Provider value={value}>
      {children}
    </DataContextConsularPlanes.Provider>
  );
};
