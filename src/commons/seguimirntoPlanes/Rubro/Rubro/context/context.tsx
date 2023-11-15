/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { IRubro } from '../../../types/types';
import { control_error } from '../../../../../helpers';
import { get_rubros } from '../services/services';

interface UserContext {
  // * id

  // * rows
  rows_rubros: IRubro[];
  set_rows_rubros: (value: IRubro[]) => void;

  // * info

  // * fetch

  fetch_data_rubros: () => Promise<void>;
}

export const DataContextRubros = createContext<UserContext>({
  rows_rubros: [],
  set_rows_rubros: () => {},
  fetch_data_rubros: async () => {},
});

export const UserProviderRubros = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  //* redux declaration
  //   const { cajas } = useAppSelector((state) => state.deposito);

  // * id

  // * select

  // * rows

  const [rows_rubros, set_rows_rubros] = React.useState<IRubro[]>([]);

  // * info

  // * fetch
  const fetch_data_rubros = async (): Promise<void> => {
    try {
      const response = await get_rubros();
      if (response?.length > 0) {
        const data_rubros: IRubro[] | any = response.map((item: IRubro) => ({
          id_rubro: item.id_rubro,
          cuenta: item.cuenta,
          cod_pre: item.cod_pre,
          valcuenta: item.valcuenta,
        }));
        set_rows_rubros(data_rubros);
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
    rows_rubros,
    set_rows_rubros,

    // * info

    // * fetch
    fetch_data_rubros,
  };

  return (
    <DataContextRubros.Provider value={value}>
      {children}
    </DataContextRubros.Provider>
  );
};
