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
  get_data_laboratorio_id,
  get_data_resulatado_laboratorio_id,
  get_data_parametro_id,
  get_instrumento_id,
} from '../request/request';
import type {
  Archivos,
  CuencasInstrumentos,
  DataGeneralLaboratorio,
  IntrumentosId,
  Laboratorio,
  ParametrosId,
  Resultadolaboratorio,
} from '../interfaces/interfaces';

interface UserContext {
  is_saving: boolean;
  rows_subseccion: SubSeccionPorSeccion[];
  rows_seccion: Seccion[];
  rows_cuencas_instrumentos: CuencasInstrumentos[];
  rows_anexos: Archivos[];
  info_instrumentos: IntrumentosId | undefined;
  nombre_seccion: string;
  nombre_subseccion: string;
  id_seccion: number | null;
  id_subseccion: number | null;
  id_instrumento: number | null;
  set_is_saving: (value: boolean) => void;
  set_rows_seccion: (rows: Seccion[]) => void;
  set_rows_subseccion: (rows: SubSeccionPorSeccion[]) => void;
  set_rows_cuencas_instrumentos: (rows: CuencasInstrumentos[]) => void;
  set_rows_anexos: (rows: Archivos[]) => void;
  set_info_instrumento: (info_instrumentos: IntrumentosId) => void;
  set_nombre_seccion: (value: string) => void;
  set_nombre_subseccion: (value: string) => void;
  set_id_seccion: (value: number | null) => void;
  set_id_subseccion: (value: number | null) => void;
  set_id_instrumento: (value: number | null) => void;
  fetch_data_seccion: () => Promise<void>;
  fetch_data_subseccion_por_seccion: () => Promise<void>;
  fetch_data_cuencas_instrumentos: () => Promise<void>;
  fetch_data_instrumento: () => Promise<void>;
  fetch_data_anexos: () => Promise<void>;

  // * Resultado de laboratorio
  id_resultado_laboratorio: number | null;
  id_parametro: number | null;
  rows_laboratorio: DataGeneralLaboratorio[];
  rows_resultado_laboratorio: Resultadolaboratorio[];
  rows_parametro: ParametrosId[];
  info_laboratorio: DataGeneralLaboratorio | undefined;
  info_parametro: ParametrosId | undefined;
  tipo_parametro: string;
  set_id_resultado_laboratorio: (value: number | null) => void;
  set_id_parametro: (value: number | null) => void;
  set_rows_laboratorio: (rows: DataGeneralLaboratorio[]) => void;
  set_rows_resultado_laboratorio: (rows: Laboratorio[]) => void;
  set_rows_parametro: (rows: ParametrosId[]) => void;
  set_info_laboratorio: (info_laboratorio: DataGeneralLaboratorio) => void;
  set_info_parametro: (info_parametro: ParametrosId) => void;
  set_tipo_parametro: (value: string) => void;
  fetch_data_laboratorio: () => Promise<any>;
  fetch_data_resultado_laboratorio: () => Promise<any>;
  fetch_data_parametros: () => Promise<void>;
}

export const DataContext = createContext<UserContext>({
  is_saving: false,
  rows_subseccion: [],
  rows_seccion: [],
  rows_cuencas_instrumentos: [],
  rows_anexos: [],
  info_instrumentos: {
    id_instrumento: 0,
    nombre: '',
    id_resolucion: 0,
    fecha_registro: '',
    fecha_creacion_instrumento: '',
    fecha_fin_vigencia: '',
    cod_tipo_agua: '',
    id_seccion: 0,
    id_subseccion: 0,
    id_persona_registra: 0,
    id_pozo: null,
  },
  nombre_seccion: '',
  nombre_subseccion: '',
  id_instrumento: null,
  id_seccion: null,
  id_subseccion: null,
  set_is_saving: () => {},
  set_rows_seccion: () => {},
  set_info_instrumento: () => {},
  set_rows_subseccion: () => {},
  set_rows_anexos: () => {},
  set_nombre_seccion: () => {},
  set_nombre_subseccion: () => {},
  set_rows_cuencas_instrumentos: () => {},
  set_id_instrumento: () => {},
  set_id_seccion: () => {},
  set_id_subseccion: () => {},
  fetch_data_seccion: async () => {},
  fetch_data_subseccion_por_seccion: async () => {},
  fetch_data_cuencas_instrumentos: async () => {},
  fetch_data_instrumento: async () => {},
  fetch_data_anexos: async () => {},

  //  * Resultado de laboratorio
  id_resultado_laboratorio: null,
  id_parametro: null,
  rows_laboratorio: [],
  rows_resultado_laboratorio: [],
  rows_parametro: [],
  info_laboratorio: {
    id_resultado_laboratorio: 0,
    descripcion: '',
    lugar_muestra: '',
    cod_clase_muestra: '',
    fecha_registro: '',
    fecha_toma_muestra: '',
    fecha_resultados_lab: '',
    fecha_envio_lab: '',
    latitud: '',
    longitud: '',
    id_instrumento: 0,
    id_cuenca: 0,
    id_pozo: 0,
  },
  info_parametro: {
    id_parametro: 0,
    cod_tipo_parametro: '',
    nombre: '',
    unidad_de_medida: '',
    item_ya_usado: false,
    activo: false,
    registro_precargado: false,
  },
  tipo_parametro: '',
  set_id_resultado_laboratorio: () => {},
  set_id_parametro: () => {},
  set_rows_laboratorio: () => {},
  set_rows_resultado_laboratorio: () => {},
  set_rows_parametro: () => {},
  set_info_laboratorio: () => {},
  set_info_parametro: () => {},
  set_tipo_parametro: () => {},
  fetch_data_laboratorio: async () => {},
  fetch_data_resultado_laboratorio: async () => {},
  fetch_data_parametros: async () => {},
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
  const [rows_laboratorio, set_rows_laboratorio] = React.useState<
    DataGeneralLaboratorio[]
  >([]);
  const [rows_resultado_laboratorio, set_rows_resultado_laboratorio] =
    React.useState<Laboratorio[]>([]);
  const [rows_parametro, set_rows_parametro] = React.useState<ParametrosId[]>(
    []
  );
  // info
  const [nombre_seccion, set_nombre_seccion] = React.useState('');
  const [nombre_subseccion, set_nombre_subseccion] = React.useState('');

  const [info_instrumentos, set_info_instrumento] =
    React.useState<IntrumentosId>();

  const [info_laboratorio, set_info_laboratorio] =
    React.useState<DataGeneralLaboratorio>();

  const [info_parametro, set_info_parametro] = React.useState<ParametrosId>();

  // id
  const [id_seccion, set_id_seccion] = React.useState<number | null>(null);
  const [id_subseccion, set_id_subseccion] = React.useState<number | null>(
    null
  );
  const [id_instrumento, set_id_instrumento] = React.useState<number | null>(
    null
  );
  const [id_resultado_laboratorio, set_id_resultado_laboratorio] =
    React.useState<number | null>(null);

  const [id_parametro, set_id_parametro] = React.useState<number | null>(null);

  // * tipo de parametro
  const [tipo_parametro, set_tipo_parametro] = React.useState('');

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
        console.log(response);
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
      if (id_instrumento) {
        const response = await get_instrumento_id(id_instrumento);
        set_info_instrumento(response.data as unknown as IntrumentosId);
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

  // * fetch resultado de laboratorio

  const fetch_data_laboratorio = async (): Promise<any> => {
    try {
      set_rows_laboratorio([]);
      if (id_instrumento) {
        const response = await get_data_laboratorio_id(id_instrumento);
        set_rows_laboratorio(response);
        return response;
      }
    } catch (err: any) {
      control_error(err.response.data.detail);
    }
  };

  const fetch_data_resultado_laboratorio = async (): Promise<any> => {
    try {
      set_rows_resultado_laboratorio([]);
      if (id_resultado_laboratorio && tipo_parametro) {
        const response = await get_data_resulatado_laboratorio_id(
          id_resultado_laboratorio,
          tipo_parametro
        );
        set_rows_resultado_laboratorio(response);
        return response;
      }
    } catch (err: any) {
      control_error(err.response.data.detail);
    }
  };

  const fetch_data_parametros = async (): Promise<void> => {
    try {
      set_rows_parametro([]);
      if (id_parametro) {
        const response = await get_data_parametro_id(id_parametro);
        set_rows_parametro(response);
      }
    } catch (err: any) {
      control_error(err.response.data.detail);
    }
  };

  const value: UserContext = {
    is_saving,
    rows_subseccion,
    rows_seccion,
    rows_cuencas_instrumentos,
    rows_anexos,
    info_instrumentos,
    nombre_seccion,
    nombre_subseccion,
    id_instrumento,
    id_seccion,
    id_subseccion,
    set_is_saving,
    set_rows_seccion,
    set_rows_subseccion,
    set_rows_cuencas_instrumentos,
    set_rows_anexos,
    set_info_instrumento,
    set_nombre_seccion,
    set_nombre_subseccion,
    set_id_instrumento,
    set_id_seccion,
    set_id_subseccion,
    fetch_data_seccion,
    fetch_data_subseccion_por_seccion,
    fetch_data_cuencas_instrumentos,
    fetch_data_instrumento,
    fetch_data_anexos,

    // * Resultado de laboratorio
    id_resultado_laboratorio,
    id_parametro,
    rows_laboratorio,
    rows_resultado_laboratorio,
    rows_parametro,
    info_laboratorio,
    info_parametro,
    tipo_parametro,
    set_id_resultado_laboratorio,
    set_id_parametro,
    set_rows_laboratorio,
    set_rows_resultado_laboratorio,
    set_rows_parametro,
    set_info_laboratorio,
    set_info_parametro,
    set_tipo_parametro,
    fetch_data_laboratorio,
    fetch_data_resultado_laboratorio,
    fetch_data_parametros,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
