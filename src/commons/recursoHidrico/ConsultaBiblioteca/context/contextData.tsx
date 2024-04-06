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
  get_data_cartera_id,
  get_data_cartera,
  get_data_bombeo_general,
  get_data_sesion_bombeo_general,
  get_data_sesion_bombeo,
  get_archivos_prueba_bombeo,
  get_archivos_cartera,
  get_archivos_laboratorio,
} from '../request/request';
import type {
  Archivos,
  CuencasInstrumentos,
  DataCarteraAforo,
  DataGeneralAforo,
  DataGeneralBombeo,
  DataGeneralLaboratorio,
  DatoSesionBombeo,
  GeneralSesionBombeo,
  IntrumentosId,
  Laboratorio,
  ParametrosId,
  Resultadolaboratorio,
} from '../interfaces/interfaces';
import type { ArchivosCalidadAgua } from '../../Instrumentos/interfaces/interface';

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

  // * Cartera

  id_cartera: number | null;
  rows_cartera: DataGeneralAforo[];
  rows_data_cartera: DataCarteraAforo[];
  info_cartera: DataGeneralAforo | undefined;
  set_id_cartera: (value: number | null) => void;
  set_rows_cartera: (rows: DataGeneralAforo[]) => void;
  set_rows_data_cartera: (rows: DataCarteraAforo[]) => void;
  set_info_cartera: (info_cartera: DataGeneralAforo) => void;
  fetch_data_cartera: () => Promise<any>;
  fetch_data_general_cartera: () => Promise<any>;

  // * Pruebas de bombeo

  id_bombeo_general: number | null;
  id_sesion_bombeo: number | null;
  id_data_sesion_bombeo: number | null;
  rows_bombeo_general: DataGeneralBombeo[];
  rows_sesion_bombeo: GeneralSesionBombeo[];
  rows_data_sesion_bombeo: DatoSesionBombeo[];
  info_bombeo_general: DataGeneralBombeo | undefined;
  info_sesion_bombeo: GeneralSesionBombeo | undefined;
  info_data_sesion_bombeo: DatoSesionBombeo | undefined;
  set_id_bombeo_general: (value: number | null) => void;
  set_id_sesion_bombeo: (value: number | null) => void;
  set_id_data_sesion_bombeo: (value: number | null) => void;
  set_rows_bombeo_general: (rows: DataGeneralBombeo[]) => void;
  set_rows_sesion_bombeo: (rows: GeneralSesionBombeo[]) => void;
  set_rows_data_sesion_bombeo: (rows: DatoSesionBombeo[]) => void;
  set_info_bombeo_general: (info_bombeo_general: DataGeneralBombeo) => void;
  set_info_sesion_bombeo: (info_sesion_bombeo: GeneralSesionBombeo) => void;
  set_info_data_sesion_bombeo: (
    info_data_sesion_bombeo: DatoSesionBombeo
  ) => void;
  fetch_data_general_bombeo: () => Promise<any>;
  fetch_data_general_sesion: () => Promise<any>;
  fetch_data_sesion: () => Promise<any>;

  // * Informacion de anexos
  rows_anexos_laboratorio: ArchivosCalidadAgua[];
  rows_anexos_cartera: ArchivosCalidadAgua[];
  rows_anexos_bombeo: ArchivosCalidadAgua[];
  set_rows_anexos_laboratorio: (
    rows_anexos_laboratorio: ArchivosCalidadAgua[]
  ) => void;
  set_rows_anexos_cartera: (rows_anexos_cartera: ArchivosCalidadAgua[]) => void;
  set_rows_anexos_bombeo: (rows_anexos_bombeo: ArchivosCalidadAgua[]) => void;
  fetch_data_anexos_laboratorio: (id_laboratorio: number) => Promise<void>;
  fetch_data_anexos_carteras: (id_cartera_aforo: number) => Promise<any>;
  fetch_data_anexos_bombeo: (id_prueba_bombeo: number) => Promise<any>;
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
    nombre_cuenca: '',
    nombre_pozo: '',
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

  // * Cartera
  id_cartera: null,
  rows_cartera: [],
  rows_data_cartera: [],
  info_cartera: {
    id_cartera_aforos: 0,
    fecha_registro: '',
    ubicacion_aforo: '',
    descripcion: '',
    latitud: '',
    longitud: '',
    fecha_aforo: '',
    cod_tipo_aforo: '',
    numero_serie: '',
    numero_helice: '',
    id_instrumento: 0,
    id_cuenca: 0,
    nombre_cuenca: '',
  },
  set_id_cartera: () => {},
  set_rows_cartera: () => {},
  set_rows_data_cartera: () => {},
  set_info_cartera: () => {},
  fetch_data_cartera: async () => {},
  fetch_data_general_cartera: async () => {},

  // * Pruebas de bombeo
  id_bombeo_general: null,
  id_sesion_bombeo: null,
  id_data_sesion_bombeo: null,
  rows_bombeo_general: [],
  rows_sesion_bombeo: [],
  rows_data_sesion_bombeo: [],
  info_bombeo_general: {
    id_prueba_bombeo: 0,
    descripcion: '',
    fecha_registro: '',
    fecha_prueba_bombeo: '',
    latitud: '',
    longitud: '',
    ubicacion_prueba: '',
    id_instrumento: 0,
    id_pozo: 0,
    nombre_pozo: '',
  },
  info_sesion_bombeo: {
    id_sesion_prueba_bombeo: 0,
    id_prueba_bombeo: 0,
    consecutivo_sesion: 0,
    fecha_inicio: '',
    cod_tipo_sesion: '',
    datos: [],
  },
  info_data_sesion_bombeo: {
    id_dato_sesion_prueba_bombeo: 0,
    tiempo_transcurrido: '',
    hora: '',
    nivel: '',
    resultado: '',
    caudal: '',
    id_sesion_prueba_bombeo: 0,
  },
  set_id_bombeo_general: () => {},
  set_id_sesion_bombeo: () => {},
  set_id_data_sesion_bombeo: () => {},
  set_rows_bombeo_general: () => {},
  set_rows_sesion_bombeo: () => {},
  set_rows_data_sesion_bombeo: () => {},
  set_info_bombeo_general: () => {},
  set_info_sesion_bombeo: () => {},
  set_info_data_sesion_bombeo: () => {},
  fetch_data_general_bombeo: async () => {},
  fetch_data_general_sesion: async () => {},
  fetch_data_sesion: async () => {},

  // * Informacion de anexos

  rows_anexos_laboratorio: [],
  rows_anexos_cartera: [],
  rows_anexos_bombeo: [],
  set_rows_anexos_laboratorio: () => {},
  set_rows_anexos_cartera: () => {},
  set_rows_anexos_bombeo: () => {},
  fetch_data_anexos_laboratorio: async (id_laboratorio: number) => {},
  fetch_data_anexos_carteras: async (id_cartera: number) => {},
  fetch_data_anexos_bombeo: async (id_prueba_bombeo: number) => {},
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
  const [rows_cartera, set_rows_cartera] = React.useState<DataGeneralAforo[]>(
    []
  );
  const [rows_data_cartera, set_rows_data_cartera] = React.useState<
    DataCarteraAforo[]
  >([]);
  const [rows_resultado_laboratorio, set_rows_resultado_laboratorio] =
    React.useState<Laboratorio[]>([]);
  const [rows_parametro, set_rows_parametro] = React.useState<ParametrosId[]>(
    []
  );
  const [rows_bombeo_general, set_rows_bombeo_general] = React.useState<
    DataGeneralBombeo[]
  >([]);
  const [rows_sesion_bombeo, set_rows_sesion_bombeo] = React.useState<
    GeneralSesionBombeo[]
  >([]);
  const [rows_data_sesion_bombeo, set_rows_data_sesion_bombeo] = React.useState<
    DatoSesionBombeo[]
  >([]);
  const [rows_anexos_laboratorio, set_rows_anexos_laboratorio] = React.useState<
    ArchivosCalidadAgua[]
  >([]);
  const [rows_anexos_cartera, set_rows_anexos_cartera] = React.useState<
    ArchivosCalidadAgua[]
  >([]);
  const [rows_anexos_bombeo, set_rows_anexos_bombeo] = React.useState<
    ArchivosCalidadAgua[]
  >([]);

  // info
  const [nombre_seccion, set_nombre_seccion] = React.useState('');
  const [nombre_subseccion, set_nombre_subseccion] = React.useState('');

  const [info_instrumentos, set_info_instrumento] =
    React.useState<IntrumentosId>();

  const [info_laboratorio, set_info_laboratorio] =
    React.useState<DataGeneralLaboratorio>();

  const [info_cartera, set_info_cartera] = React.useState<DataGeneralAforo>();

  const [info_parametro, set_info_parametro] = React.useState<ParametrosId>();

  const [info_bombeo_general, set_info_bombeo_general] =
    React.useState<DataGeneralBombeo>();
  const [info_sesion_bombeo, set_info_sesion_bombeo] =
    React.useState<GeneralSesionBombeo>();
  const [info_data_sesion_bombeo, set_info_data_sesion_bombeo] =
    React.useState<DatoSesionBombeo>();

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

  const [id_cartera, set_id_cartera] = React.useState<number | null>(null);

  const [id_parametro, set_id_parametro] = React.useState<number | null>(null);

  const [id_bombeo_general, set_id_bombeo_general] = React.useState<
    number | null
  >(null);
  const [id_sesion_bombeo, set_id_sesion_bombeo] = React.useState<
    number | null
  >(null);
  const [id_data_sesion_bombeo, set_id_data_sesion_bombeo] = React.useState<
    number | null
  >(null);

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
        control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
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
        control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
      }
    }
  };

  const fetch_data_cuencas_instrumentos = async (): Promise<void> => {
    try {
      set_rows_cuencas_instrumentos([]);
      if (id_instrumento) {
        const response = await get_data_cuenca_instrumentos(id_instrumento);
        //  console.log('')(response);
        set_rows_cuencas_instrumentos(response);
      }
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
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
        control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
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
        control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
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
      control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
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
      control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
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
      control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
    }
  };

  // * fetch cartera

  const fetch_data_cartera = async (): Promise<any> => {
    try {
      set_rows_cartera([]);
      if (id_instrumento) {
        const response = await get_data_cartera_id(id_instrumento);
        set_rows_cartera(response);
        return response;
      }
    } catch (err: any) {
      control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
    }
  };

  const fetch_data_general_cartera = async (): Promise<void> => {
    try {
      set_rows_data_cartera([]);
      if (id_cartera) {
        const response = await get_data_cartera(id_cartera);
        set_rows_data_cartera(response);
      }
    } catch (err: any) {
      control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
    }
  };

  // * fetch pruebas de bombeo

  const fetch_data_general_bombeo = async (): Promise<void> => {
    try {
      set_rows_bombeo_general([]);
      if (id_instrumento) {
        const response = await get_data_bombeo_general(id_instrumento);
        set_rows_bombeo_general(response);
      }
    } catch (err: any) {
      control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
    }
  };
  const fetch_data_general_sesion = async (): Promise<void> => {
    try {
      set_rows_sesion_bombeo([]);
      if (id_bombeo_general) {
        const response = await get_data_sesion_bombeo_general(
          id_bombeo_general
        );
        set_rows_sesion_bombeo(response);
      }
    } catch (err: any) {
      control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
    }
  };
  const fetch_data_sesion = async (): Promise<void> => {
    try {
      set_rows_data_sesion_bombeo([]);
      if (id_sesion_bombeo) {
        const response = await get_data_sesion_bombeo(id_sesion_bombeo);
        set_rows_data_sesion_bombeo(response);
      }
    } catch (err: any) {
      control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
    }
  };
  const fetch_data_anexos_laboratorio = async (
    id_laboratorio: number
  ): Promise<void> => {
    try {
      set_rows_anexos_laboratorio([]);
      const response = await get_archivos_laboratorio(id_laboratorio);
      set_rows_anexos_laboratorio(response);
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
      }
    }
  };
  const fetch_data_anexos_carteras = async (
    id_cartera: number
  ): Promise<void> => {
    try {
      set_rows_anexos_cartera([]);
      const response = await get_archivos_cartera(id_cartera);
      set_rows_anexos_cartera(response);
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
      }
    }
  };
  const fetch_data_anexos_bombeo = async (
    id_prueba_bombeo: number
  ): Promise<void> => {
    try {
      set_rows_anexos_bombeo([]);
      const response = await get_archivos_prueba_bombeo(id_prueba_bombeo);
      set_rows_anexos_bombeo(response);
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
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

    // * Cartera

    id_cartera,
    rows_cartera,
    rows_data_cartera,
    info_cartera,
    set_id_cartera,
    set_rows_cartera,
    set_rows_data_cartera,
    set_info_cartera,
    fetch_data_cartera,
    fetch_data_general_cartera,

    // * Pruebas de bombeo
    id_bombeo_general,
    id_sesion_bombeo,
    id_data_sesion_bombeo,
    rows_bombeo_general,
    rows_sesion_bombeo,
    rows_data_sesion_bombeo,
    info_bombeo_general,
    info_sesion_bombeo,
    info_data_sesion_bombeo,
    set_id_bombeo_general,
    set_id_sesion_bombeo,
    set_id_data_sesion_bombeo,
    set_rows_bombeo_general,
    set_rows_sesion_bombeo,
    set_rows_data_sesion_bombeo,
    set_info_bombeo_general,
    set_info_sesion_bombeo,
    set_info_data_sesion_bombeo,
    fetch_data_general_bombeo,
    fetch_data_general_sesion,
    fetch_data_sesion,

    // * Informacion de anexos
    rows_anexos_laboratorio,
    rows_anexos_cartera,
    rows_anexos_bombeo,
    set_rows_anexos_laboratorio,
    set_rows_anexos_cartera,
    set_rows_anexos_bombeo,
    fetch_data_anexos_laboratorio,
    fetch_data_anexos_carteras,
    fetch_data_anexos_bombeo,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
