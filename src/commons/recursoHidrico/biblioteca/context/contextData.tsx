/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import { control_error } from '../../../../helpers';
import type { Seccion, SubSeccionPorSeccion } from '../interfaces/interfaces';
import {
  get_data_seccion,
  get_data_subseccion_por_seccion,
} from '../request/request';

interface UserContext {
  rows_subseccion: SubSeccionPorSeccion[];
  rows_seccion: Seccion[];
  info_seccion: Seccion | undefined;
  id_seccion: number | null;
  set_rows_seccion: (rows: Seccion[]) => void;
  set_rows_subseccion: (rows: SubSeccionPorSeccion[]) => void;
  set_info_seccion: (info_seccion: Seccion) => void;
  set_id_seccion: (value: number | null) => void;
  fetch_data_seccion: () => Promise<void>;
  fetch_data_subseccion_por_seccion: () => Promise<void>;
}

export const DataContext = createContext<UserContext>({
  rows_subseccion: [],
  rows_seccion: [],
  info_seccion: {
    id_seccion: 0,
    nombre: '',
    descripcion: '',
    fecha_creacion: '',
    id_persona_creada: 0,
    id_persona: 0,
    nombre_completo: '',
    nombre_comercial: '',
  },
  id_seccion: null,
  set_rows_seccion: () => {},
  set_rows_subseccion: () => {},
  set_info_seccion: () => {},
  set_id_seccion: () => {},
  fetch_data_seccion: async () => {},
  fetch_data_subseccion_por_seccion: async () => {},
});

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): any => {
  // rows
  const [rows_seccion, set_rows_seccion] = React.useState<Seccion[]>([]);
  const [rows_subseccion, set_rows_subseccion] = React.useState<
    SubSeccionPorSeccion[]
  >([]);
  // info
  const [info_seccion, set_info_seccion] = React.useState<Seccion>();

  // id
  const [id_seccion, set_id_seccion] = React.useState<number | null>(null);

  // funciones
  const fetch_data_seccion = async (): Promise<void> => {
    set_rows_seccion([]);
    try {
      const response = await get_data_seccion();
      set_rows_seccion(response);
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

  const fetch_data_subseccion_por_seccion = async (): Promise<void> => {
    try {
      set_rows_subseccion([]);
      if (id_seccion) {
        const response = await get_data_subseccion_por_seccion(id_seccion);
        set_rows_subseccion(response);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

  const value: UserContext = {
    rows_subseccion,
    rows_seccion,
    info_seccion,
    id_seccion,
    set_rows_seccion,
    set_rows_subseccion,
    set_info_seccion,
    set_id_seccion,
    fetch_data_seccion,
    fetch_data_subseccion_por_seccion,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
