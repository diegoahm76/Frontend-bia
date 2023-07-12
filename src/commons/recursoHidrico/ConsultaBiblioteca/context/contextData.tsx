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
import {
  get_archivos,
  get_data_cuenca_instrumentos,
  get_instrumento_id,
} from '../request/request';
import type { Archivos, CuencasInstrumentos } from '../interfaces/interfaces';

interface UserContext {
  is_saving: boolean;
  rows_subseccion: SubSeccionPorSeccion[];
  rows_seccion: Seccion[];
  rows_cuencas_instrumentos: CuencasInstrumentos[];
  rows_anexos: Archivos[];
  info_instrumentos: any | undefined;
  info_seccion: Seccion | undefined;
  info_subseccion: SubSeccionPorSeccion | undefined;
  id_seccion: number | null;
  id_subseccion: number | null;
  id_instrumento: number | null;
  set_is_saving: (value: boolean) => void;
  set_rows_seccion: (rows: Seccion[]) => void;
  set_rows_subseccion: (rows: SubSeccionPorSeccion[]) => void;
  set_rows_cuencas_instrumentos: (rows: CuencasInstrumentos[]) => void;
  set_rows_anexos: (rows: Archivos[]) => void;
  set_info_instrumento: (info_instrumentos: any) => void;
  set_info_seccion: (info_seccion: Seccion) => void;
  set_info_subseccion: (info_subseccion: SubSeccionPorSeccion) => void;
  set_id_seccion: (value: number | null) => void;
  set_id_subseccion: (value: number | null) => void;
  set_id_instrumento: (value: number | null) => void;
  fetch_data_seccion: () => Promise<void>;
  fetch_data_subseccion_por_seccion: () => Promise<void>;
  fetch_data_cuencas_instrumentos: () => Promise<void>;
  fetch_data_instrumento: () => Promise<void>;
  fetch_data_anexos: () => Promise<void>;
}

export const DataContext = createContext<UserContext>({
  is_saving: false,
  rows_subseccion: [],
  rows_seccion: [],
  rows_cuencas_instrumentos: [],
  rows_anexos: [],
  info_instrumentos: {},
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
  id_instrumento: null,
  id_seccion: null,
  id_subseccion: null,
  set_is_saving: () => {},
  set_rows_seccion: () => {},
  set_info_instrumento: () => {},
  set_rows_subseccion: () => {},
  set_rows_anexos: () => {},
  set_info_seccion: () => {},
  set_rows_cuencas_instrumentos: () => {},
  set_info_subseccion: () => {},
  set_id_instrumento: () => {},
  set_id_seccion: () => {},
  set_id_subseccion: () => {},
  fetch_data_seccion: async () => {},
  fetch_data_subseccion_por_seccion: async () => {},
  fetch_data_cuencas_instrumentos: async () => {},
  fetch_data_instrumento: async () => {},
  fetch_data_anexos: async () => {},
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
  const [rows_cuencas_instrumentos, set_rows_cuencas_instrumentos] =
    React.useState<CuencasInstrumentos[]>([]);
  const [rows_anexos, set_rows_anexos] = React.useState<Archivos[]>([]);
  // info
  const [info_seccion, set_info_seccion] = React.useState<Seccion>();
  const [info_subseccion, set_info_subseccion] =
    React.useState<SubSeccionPorSeccion>();
  const [info_instrumentos, set_info_instrumento] = React.useState<any>();

  // id
  const [id_seccion, set_id_seccion] = React.useState<number | null>(null);
  const [id_subseccion, set_id_subseccion] = React.useState<number | null>(
    null
  );
  const [id_instrumento, set_id_instrumento] = React.useState<number | null>(
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

  const fetch_data_cuencas_instrumentos = async (): Promise<void> => {
    try {
      set_rows_cuencas_instrumentos([]);
      if (id_instrumento) {
        const response = await get_data_cuenca_instrumentos(id_instrumento);
        set_rows_cuencas_instrumentos(response);
      }
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail);
      }
    }
  };

  const fetch_data_instrumento = async (): Promise<void> => {
    try {
      set_info_instrumento({});
      if (id_instrumento) {
        const response = await get_instrumento_id(id_instrumento);
        set_info_instrumento(response);
      }
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail);
      }
    }
  };

  const fetch_data_anexos = async (): Promise<void> => {
    try {
      set_rows_anexos([]);
      if (id_instrumento) {
        const response = await get_archivos(id_instrumento);
        set_rows_anexos(response);
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
    rows_cuencas_instrumentos,
    rows_anexos,
    info_instrumentos,
    info_seccion,
    info_subseccion,
    id_instrumento,
    id_seccion,
    id_subseccion,
    set_is_saving,
    set_rows_seccion,
    set_rows_subseccion,
    set_rows_cuencas_instrumentos,
    set_rows_anexos,
    set_info_instrumento,
    set_info_seccion,
    set_info_subseccion,
    set_id_instrumento,
    set_id_seccion,
    set_id_subseccion,
    fetch_data_seccion,
    fetch_data_subseccion_por_seccion,
    fetch_data_cuencas_instrumentos,
    fetch_data_instrumento,
    fetch_data_anexos,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
