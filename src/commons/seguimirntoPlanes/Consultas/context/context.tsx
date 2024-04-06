/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import { control_error } from '../../../../helpers';
import { get_consulta_plan, get_planes } from '../services/services';
import { IPlan } from '../types/types';
import type { IPlanes } from '../../types/types';
import { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';

interface UserContext {
  // * id
  id_plan: number | null;
  set_id_plan: (value: number | null) => void;

  // selected
  planes_selected: ValueProps[];
  set_planes_selected: (value: ValueProps[]) => void;
  // * rows
  rows_planes: IPlan[];
  set_rows_planes: (value: IPlan[]) => void;

  // * info

  // loader
  loading: boolean;
  set_loading: (value: boolean) => void;

  // * fetch

  fetch_data_planes: () => Promise<void>;
  fetch_data_planes_selected: () => Promise<void>;
}

export const DataContextConsularPlanes = createContext<UserContext>({
  // * id
  id_plan: null,
  set_id_plan: () => {},
  // selected
  planes_selected: [],
  set_planes_selected: () => {},
  // * rows
  rows_planes: [],
  set_rows_planes: () => {},

  // loader
  loading: false,
  set_loading: () => {},

  // * info

  // * fetch
  fetch_data_planes: async () => {},
  fetch_data_planes_selected: async () => {},
});

export const UserProviderConsultarPlanes = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  //* redux declaration
  //   const { cajas } = useAppSelector((state) => state.deposito);

  // * id

  const [id_plan, set_id_plan] = React.useState<number | null>(null);

  // * select

  const [planes_selected, set_planes_selected] = React.useState<ValueProps[]>(
    []
  );

  // * rows

  const [rows_planes, set_rows_planes] = React.useState<IPlan[]>([]);

  // * info

  // loader

  const [loading, set_loading] = React.useState<boolean>(false);

  // * fetch
  const fetch_data_planes = async (): Promise<void> => {
    try {
      set_rows_planes([]);
      console.log('fetch_data_planes');
      const response = await get_consulta_plan((id_plan as number) ?? 0);
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

  const fetch_data_planes_selected = async (): Promise<void> => {
    try {
      set_loading(true);
      const response = await get_planes();
      if (response?.length > 0) {
        const data_plan: ValueProps[] | any = response.map((item: IPlanes) => ({
          value: item.id_plan,
          label: item.nombre_plan,
        }));
        set_planes_selected(data_plan);
      }
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    } finally {
      set_loading(false);
    }
  };

  const value: UserContext = {
    // * id
    id_plan,
    set_id_plan,

    // * select

    planes_selected,
    set_planes_selected,

    // * rows
    rows_planes,
    set_rows_planes,

    // * info

    // loader

    loading,
    set_loading,

    // * fetch
    fetch_data_planes,
    fetch_data_planes_selected,
  };

  return (
    <DataContextConsularPlanes.Provider value={value}>
      {children}
    </DataContextConsularPlanes.Provider>
  );
};
