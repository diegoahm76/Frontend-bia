/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import { control_error } from '../../../../helpers';
import {
  get_seguimiento_pai,
} from '../services/services';
import type {
  IMetaIndicador,
  ISeguimientoPAI,
} from '../../types/types';
import { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';

interface UserContext {
  // * id
  id_plan: number | null;
  set_id_plan: (value: number | null) => void;

  // selected
  pai_selected: ValueProps[];
  set_pai_selected: (value: ValueProps[]) => void;

  // * rows
  rows_seguimiento_pai: IMetaIndicador[];
  set_rows_seguimiento_pai: (value: IMetaIndicador[]) => void;

  // * info

  // loader
  loading: boolean;
  set_loading: (value: boolean) => void;

  // * fetch

  fetch_data_seguimiento_pai_selected: () => Promise<void>;
}

export const DataContextConsularSeguiminetoPAI = createContext<UserContext>({
  // * id
  id_plan: null,
  set_id_plan: () => {},

  // selected
  pai_selected: [],
  set_pai_selected: () => {},

  // * rows
  rows_seguimiento_pai: [],
  set_rows_seguimiento_pai: () => {},

  // loader
  loading: false,
  set_loading: () => {},

  // * info

  // * fetch
  fetch_data_seguimiento_pai_selected: async () => {},
});

export const UserProviderConsultarSeguiminetoPAI = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  //* redux declaration
  //   const { cajas } = useAppSelector((state) => state.deposito);

  // * id

  const [id_plan, set_id_plan] = React.useState<number | null>(null);

  // * select

  const [pai_selected, set_pai_selected] = React.useState<ValueProps[]>(
    []
  );

  // * rows

  const [rows_seguimiento_pai, set_rows_seguimiento_pai] = React.useState<
    IMetaIndicador[]
  >([]);

  // * info

  // loader

  const [loading, set_loading] = React.useState<boolean>(false);

  const fetch_data_seguimiento_pai_selected = async (): Promise<void> => {
    try {
      set_loading(true);
      const response = await get_seguimiento_pai();
      if (response?.length > 0) {
        const data_plan: ValueProps[] | any = response.map(
          (item: ISeguimientoPAI) => ({
            value: item.id_seguimiento_pai,
            label: item.mes,
          })
        );
        set_pai_selected(data_plan);
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

    pai_selected,
    set_pai_selected,

    // * rows
    rows_seguimiento_pai,
    set_rows_seguimiento_pai,

    // * info

    // loader

    loading,
    set_loading,

    // * fetch
    fetch_data_seguimiento_pai_selected,
  };

  return (
    <DataContextConsularSeguiminetoPAI.Provider value={value}>
      {children}
    </DataContextConsularSeguiminetoPAI.Provider>
  );
};
