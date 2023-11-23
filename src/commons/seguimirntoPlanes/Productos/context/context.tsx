/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { IProyectos, IProductos } from '../../types/types';
import { control_error } from '../../../../helpers';
import { useAppSelector } from '../../../../hooks';
import { get_proyectos, get_producto_id } from '../services/services';

interface UserContext {
  // * id

  // * rows
  rows_producto: IProductos[];
  set_rows_producto: (value: IProductos[]) => void;
  rows_proyectos: IProyectos[];
  set_rows_proyectos: (value: IProyectos[]) => void;

  // * select

  // * info

  // * fetch

  fetch_data_producto: () => Promise<void>;
  fetch_data_proyecto: () => Promise<void>;
}

export const DataContextProductos = createContext<UserContext>({
  rows_producto: [],
  set_rows_producto: () => {},
  rows_proyectos: [],
  set_rows_proyectos: () => {},

  fetch_data_producto: async () => {},
  fetch_data_proyecto: async () => {},
});

export const UserProviderProductos = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // * id

  // * select

  // * rows

  const [rows_proyectos, set_rows_proyectos] = React.useState<IProyectos[]>([]);
  const [rows_producto, set_rows_producto] = React.useState<IProductos[]>([]);

  // * info

  // * fetch
  //* declaracion context
  const {
    proyecto: { id_proyecto },
  } = useAppSelector((state) => state.planes);

  const fetch_data_producto = async (): Promise<void> => {
    try {
      set_rows_producto([]);
      const response = await get_producto_id(id_proyecto as number);
      if (response?.length > 0) {
        const data_producto: IProductos[] = response.map(
          (item: IProductos) => ({
            id_producto: item.id_producto,
            numero_producto: item.numero_producto,
            nombre_producto: item.nombre_producto,
            id_proyecto: item.id_proyecto,
            nombre_proyecto: item.nombre_proyecto,
          })
        );

        set_rows_producto(data_producto);
      }
    } catch (error: any) {
      control_error(
        error.response?.data?.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  const fetch_data_proyecto = async (): Promise<void> => {
    try {
      set_rows_proyectos([]);
      const response = await get_proyectos();
      if (response?.length > 0) {
        const data_proyecto: IProyectos[] = response.map(
          (item: IProyectos) => ({
            id_programa: item.id_programa,
            nombre_programa: item.nombre_programa,
            id_proyecto: item.id_proyecto,
            nombre_proyecto: item.nombre_proyecto,
            numero_proyecto: item.numero_proyecto,
            pondera_1: item.pondera_1,
            pondera_2: item.pondera_2,
            pondera_3: item.pondera_3,
            pondera_4: item.pondera_4,
          })
        );

        set_rows_proyectos(data_proyecto);
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

    // * rows
    rows_proyectos,
    set_rows_proyectos,
    rows_producto,
    set_rows_producto,

    // * info

    // * fetch
    fetch_data_producto,
    fetch_data_proyecto,
  };

  return (
    <DataContextProductos.Provider value={value}>
      {children}
    </DataContextProductos.Provider>
  );
};
