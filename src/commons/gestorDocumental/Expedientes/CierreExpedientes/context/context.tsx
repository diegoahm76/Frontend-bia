/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { createContext } from 'react';
import type { ValueProps } from '../../../../recursoHidrico/Instrumentos/interfaces/interface';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { get_tipos_tipologias } from '../services/services';
import { SelectTipologias } from '../types/types';

interface UserContext {
  is_limpiar_formulario: boolean;
  set_is_limpiar_formulario: (is_limpiar_formulario: boolean) => void;
  // selected
  tipos_tipoligia_selected: ValueProps[];
  set_tipos_tipoligia_selected: (
    tipos_tipoligia_selected: ValueProps[]
  ) => void;
  fetch_data_tipos_tipoligia_selected: () => Promise<void>;
}

export const DataContext = createContext<UserContext>({
  is_limpiar_formulario: false,
  set_is_limpiar_formulario: () => {},
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
  const [is_limpiar_formulario, set_is_limpiar_formulario] =
    React.useState<boolean>(false);

  const [tipos_tipoligia_selected, set_tipos_tipoligia_selected] =
    React.useState<ValueProps[]>([]);

  const fetch_data_tipos_tipoligia_selected = async (): Promise<void> => {
    try {
      console.log('fetch_data_tipos_tipoligia_selected')
      const response = await get_tipos_tipologias();
      if (response?.length > 0) {
        const data_tipoligia: ValueProps[] = response.map(
          (item: SelectTipologias) => ({
            value: item.id_tipologia_documental.toString(),
            label: item.nombre,
          })
        );
        console.log('data_tipoligia', data_tipoligia);
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
    is_limpiar_formulario,
    set_is_limpiar_formulario,
    tipos_tipoligia_selected,
    set_tipos_tipoligia_selected,
    fetch_data_tipos_tipoligia_selected,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
