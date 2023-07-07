/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import { control_error } from '../../../../helpers';
import type { AxiosError } from 'axios';
import type {
  Seccion,
  SubSeccionPorSeccion,
} from '../../biblioteca/interfaces/interfaces';
import {
  get_data_seccion,
  get_data_subseccion_por_seccion,
} from '../../biblioteca/request/request';

interface UserContext {
  is_saving: boolean;
  rows_subseccion: SubSeccionPorSeccion[];
  rows_seccion: Seccion[];
  info_seccion: Seccion | undefined;
  info_subseccion: SubSeccionPorSeccion | undefined;
  id_seccion: number | null;
  id_subseccion: number | null;
  set_is_saving: (value: boolean) => void;
  set_rows_seccion: (rows: Seccion[]) => void;
  set_rows_subseccion: (rows: SubSeccionPorSeccion[]) => void;
  set_info_seccion: (info_seccion: Seccion) => void;
  set_info_subseccion: (info_subseccion: SubSeccionPorSeccion) => void;
  set_id_seccion: (value: number | null) => void;
  set_id_subseccion: (value: number | null) => void;
  fetch_data_seccion: () => Promise<void>;
  fetch_data_subseccion_por_seccion: () => Promise<void>;
}

export const DataContext = createContext<UserContext>({
  is_saving: false,
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
  info_subseccion: {
    id_subseccion: 0,
    id_seccion: 0,
    nombre: '',
    descripcion: '',
    fechaCreacion: '',
    id_persona: 0,
    nombre_comercial: '',
    nombre_completo: '',
  },
  id_seccion: null,
  id_subseccion: null,
  set_is_saving: () => {},
  set_rows_seccion: () => {},
  set_rows_subseccion: () => {},
  set_info_seccion: () => {},
  set_info_subseccion: () => {},
  set_id_seccion: () => {},
  set_id_subseccion: () => {},
  fetch_data_seccion: async () => {},
  fetch_data_subseccion_por_seccion: async () => {},
});

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): any => {
  const [is_saving, set_is_saving] = React.useState(false);

  // rows
  const [rows_seccion, set_rows_seccion] = React.useState<Seccion[]>([]);
  const [rows_subseccion, set_rows_subseccion] = React.useState<
    SubSeccionPorSeccion[]
  >([]);
  // info
  const [info_seccion, set_info_seccion] = React.useState<Seccion>();
  const [info_subseccion, set_info_subseccion] =
    React.useState<SubSeccionPorSeccion>();

  // id
  const [id_seccion, set_id_seccion] = React.useState<number | null>(null);
  const [id_subseccion, set_id_subseccion] = React.useState<number | null>(
    null
  );
  // funciones
  const fetch_data_seccion = async (): Promise<void> => {
    set_rows_seccion([]);
    try {
      const response = await get_data_seccion();
      set_rows_seccion(response);
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail);
      }
    }
  };

  const fetch_data_subseccion_por_seccion = async (): Promise<void> => {
    try {
      set_rows_subseccion([]);
      if (id_seccion) {
        const response = await get_data_subseccion_por_seccion(id_seccion);
        set_rows_subseccion(response);
      }
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail);
      }
    }
  };

  const value: UserContext = {
    is_saving,
    rows_subseccion,
    rows_seccion,
    info_seccion,
    info_subseccion,
    id_seccion,
    id_subseccion,
    set_is_saving,
    set_rows_seccion,
    set_rows_subseccion,
    set_info_seccion,
    set_info_subseccion,
    set_id_seccion,
    set_id_subseccion,
    fetch_data_seccion,
    fetch_data_subseccion_por_seccion,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
