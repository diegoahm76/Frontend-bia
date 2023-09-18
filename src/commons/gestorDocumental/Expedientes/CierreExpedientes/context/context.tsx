/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { createContext } from 'react';
import type { ValueProps } from '../../../../recursoHidrico/Instrumentos/interfaces/interface';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { get_tipos_tipologias } from '../services/services';
import { SelectTipologias } from '../types/types';

interface UserContext {
  // selected
  tipos_tipoligia_selected: ValueProps[];
  set_tipos_tipoligia_selected: (tipos_tipoligia_selected: ValueProps[]) => void;
  fetch_data_tipos_tipoligia_selected: () => Promise<void>;
}

export const DataContext = createContext<UserContext>({
  // * selected
  tipos_tipoligia_selected: [],
  set_tipos_tipoligia_selected: () => {},
  fetch_data_tipos_tipoligia_selected: async () => {},
});

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {

  const [tipos_tipoligia_selected, set_tipos_tipoligia_selected] = React.useState<
    ValueProps[]
  >([]);

  const fetch_data_tipos_tipoligia_selected = async (): Promise<void> => {
    try {
      const response = await get_tipos_tipologias();
      if (response?.length > 0) {
        const data_tipoligia: ValueProps[] = response.map((item: SelectTipologias) => ({
          value: item.id_tipologia_documental.toString(),
          label: item.nombre,
        }));
        set_tipos_tipoligia_selected(data_tipoligia);
      } else {
        set_tipos_tipoligia_selected([]);
      }
    } catch (error: any) {
      control_warning(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };


  const value: UserContext = {
    tipos_tipoligia_selected,
    set_tipos_tipoligia_selected,
    fetch_data_tipos_tipoligia_selected,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
