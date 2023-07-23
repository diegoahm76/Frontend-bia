/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import { control_error } from '../../../../helpers';
import { get_cuencas, get_pozo } from '../../configuraciones/Request/request';
import type { Cuenca, Pozo } from '../../configuraciones/interfaces/interfaces';
import type {
  BusquedaInstrumentos,
  IpropsPozos,
  ValueProps,
} from '../interfaces/interface';
import { type AxiosError } from 'axios';
import {
  type Archivos,
  type CuencasInstrumentos,
} from '../../ConsultaBiblioteca/interfaces/interfaces';
import {
  get_archivos,
  get_data_cuenca_instrumentos,
  get_instrumento_id,
} from '../../ConsultaBiblioteca/request/request';
import { get_pozo_id } from '../request/request';

interface UserContext {
  // *modos instrumentos
  register_instrumento: boolean;
  edit_instrumento: boolean;
  select_instrumento: boolean;
  set_register_instrumento: (register_instrumento: boolean) => void;
  set_edit_instrumento: (edit_instrumento: boolean) => void;
  set_select_instrumento: (select_instrumento: boolean) => void;

  // * seleccionar instrumento(información)
  id_instrumento: number | null;
  info_instrumentos: any;
  info_busqueda_instrumentos: BusquedaInstrumentos | undefined;
  rows_cuencas_instrumentos: CuencasInstrumentos[];
  rows_anexos: Archivos[];
  set_id_instrumento: (id_instrumento: number | null) => void;
  set_info_busqueda_instrumentos: (
    info_busqueda_instrumentos: BusquedaInstrumentos
  ) => void;
  set_info_instrumentos: (info_instrumentos: any) => void;
  set_rows_cuencas_instrumentos: (
    rows_cuencas_instrumentos: CuencasInstrumentos[]
  ) => void;
  set_rows_anexos: (rows_anexos: Archivos[]) => void;

  fetch_data_cuencas_instrumentos: () => Promise<void>;
  fetch_data_instrumento: () => Promise<void>;
  fetch_data_anexos: () => Promise<void>;
  fetch_data_pozo_id: () => Promise<void>;

  pozos_selected: ValueProps[];
  mode: string;
  nombre_subseccion: string;
  nombre_seccion: string;
  row_cartera_aforo: any;
  row_prueba_bombeo: any;
  row_result_laboratorio: any;
  rows_register_cuencas: any;
  rows_register_pozos: any;
  rows_edit_pozo: any;
  id_seccion: number | null;
  id_subseccion: number | null;
  is_open_cuenca: boolean;
  is_open_pozos: boolean;
  is_loading_submit: boolean;
  archivos: any;
  nombres_archivos: any;
  set_pozos_selected: (pozos_selected: ValueProps[]) => void;
  set_mode: (mode: string) => void;
  set_nombre_subseccion: (nombre_subseccion: string) => void;
  set_nombre_seccion: (nombre_seccion: string) => void;
  set_row_cartera_aforo: (row_cartera_aforo: any) => void;
  set_row_prueba_bombeo: (row_prueba_bombeo: any) => void;
  set_row_result_laboratorio: (row_result_laboratorio: any) => void;
  set_rows_register_cuencas: (rows_register_cuencas: any) => void;
  set_rows_edit_pozo: (rows_edit_pozo: any) => void;
  set_rows_register_pozos: (rows_register_pozos: any) => void;
  set_id_seccion: (id_seccion: number | null) => void;
  set_id_subseccion: (id_subseccion: number | null) => void;
  set_archivos: (archivos: any) => void;
  set_nombres_archivos: (nombres_archivos: any) => void;
  set_is_open_cuenca: (is_open_cuenca: boolean) => void;
  set_is_open_pozos: (is_open_pozos: boolean) => void;
  set_is_loading_submit: (is_loading_submit: boolean) => void;

  fetch_data_cuencas: () => void;
  fetch_data_pozo: () => void;

  // * Parametros de laboratorio

  id_resultado_laboratorio: number | null;
  set_id_resultado_laboratorio: (
    id_resultado_laboratorio: number | null
  ) => void;
}

// <--------------------- Data context --------------------->

export const DataContext = createContext<UserContext>({
  // *set modos instrumentos
  register_instrumento: false,
  edit_instrumento: false,
  select_instrumento: false,
  set_register_instrumento: () => {},
  set_edit_instrumento: () => {},
  set_select_instrumento: () => {},

  // * seleccionar instrumento(información)

  id_instrumento: null,
  info_busqueda_instrumentos: {
    id_instrumento: 0,
    id_seccion: 0,
    nombre_seccion: '',
    id_subseccion: 0,
    nombre_subseccion: '',
    nombre: '',
    id_resolucion: 0,
    fecha_registro: '',
    fecha_creacion_instrumento: '',
    fecha_fin_vigencia: '',
    cod_tipo_agua: '',
    id_persona_registra: 0,
    id_pozo: 0,
  },
  info_instrumentos: {},
  rows_cuencas_instrumentos: [],
  rows_anexos: [],
  set_id_instrumento: () => {},
  set_info_busqueda_instrumentos: () => {},
  set_info_instrumentos: () => {},
  set_rows_cuencas_instrumentos: () => {},
  set_rows_anexos: () => {},
  fetch_data_cuencas_instrumentos: async () => {},
  fetch_data_instrumento: async () => {},
  fetch_data_anexos: async () => {},
  fetch_data_pozo_id: async () => {},

  pozos_selected: [],
  mode: '',
  nombre_subseccion: '',
  nombre_seccion: '',
  row_cartera_aforo: {},
  row_prueba_bombeo: {},
  row_result_laboratorio: {},
  rows_register_cuencas: {},
  rows_register_pozos: {},
  rows_edit_pozo: {},

  id_seccion: null,
  id_subseccion: null,

  archivos: [null],
  nombres_archivos: [''],

  is_open_cuenca: false,
  is_open_pozos: false,
  is_loading_submit: false,

  set_pozos_selected: () => {},
  set_mode: () => {},
  set_nombre_subseccion: () => {},
  set_nombre_seccion: () => {},
  set_row_cartera_aforo: () => {},
  set_row_prueba_bombeo: () => {},
  set_row_result_laboratorio: () => {},
  set_rows_register_cuencas: () => {},
  set_rows_edit_pozo: () => {},
  set_rows_register_pozos: () => {},

  set_id_seccion: () => {},
  set_id_subseccion: () => {},

  set_archivos: () => {},
  set_nombres_archivos: () => {},

  set_is_open_cuenca: () => {},
  set_is_open_pozos: () => {},
  set_is_loading_submit: () => {},

  fetch_data_cuencas: () => {},
  fetch_data_pozo: () => {},

  // * parametros de laboratorio
  id_resultado_laboratorio: null,
  set_id_resultado_laboratorio: () => {},
});

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): any => {
  // manejo de archivos
  const [archivos, set_archivos] = React.useState<Array<File | null>>([null]);
  const [nombres_archivos, set_nombres_archivos] = React.useState<string[]>([
    '',
  ]);

  // loading de submit
  const [is_loading_submit, set_is_loading_submit] = React.useState(false);

  // modales
  const [is_open_cuenca, set_is_open_cuenca] = React.useState(false);
  const [is_open_pozos, set_is_open_pozos] = React.useState(false);

  // id

  const [id_seccion, set_id_seccion] = React.useState<number | null>(null);
  const [id_subseccion, set_id_subseccion] = React.useState<number | null>(
    null
  );

  // modos instrumentos
  const [register_instrumento, set_register_instrumento] = React.useState(true);
  const [edit_instrumento, set_edit_instrumento] = React.useState(false);
  const [select_instrumento, set_select_instrumento] = React.useState(false);

  const [mode, set_mode] = React.useState('');

  if (mode === 'register_instrumento') {
    set_mode('');
    set_register_instrumento(true);
    set_edit_instrumento(false);
    set_select_instrumento(false);
  } else if (mode === 'edit_instrumento') {
    set_mode('');
    set_edit_instrumento(true);
    set_register_instrumento(false);
    set_select_instrumento(false);
  } else if (mode === 'select_instrumento') {
    set_mode('');
    set_select_instrumento(true);
    set_register_instrumento(false);
    set_edit_instrumento(false);
  }

  const [row_cartera_aforo, set_row_cartera_aforo] = React.useState<any>({});
  const [row_prueba_bombeo, set_row_prueba_bombeo] = React.useState<any>({});
  const [row_result_laboratorio, set_row_result_laboratorio] =
    React.useState<any>({});

  const [rows_register_cuencas, set_rows_register_cuencas] =
    React.useState<any>({});

  const [rows_register_pozos, set_rows_register_pozos] = React.useState<any>(
    {}
  );
  const [rows_edit_pozo, set_rows_edit_pozo] = React.useState<any>({});

  // select instruemnto
  const [id_instrumento, set_id_instrumento] = React.useState<number | null>(
    null
  );
  const [info_busqueda_instrumentos, set_info_busqueda_instrumentos] =
    React.useState<BusquedaInstrumentos>();
  const [info_instrumentos, set_info_instrumentos] = React.useState<any>();
  const [rows_cuencas_instrumentos, set_rows_cuencas_instrumentos] =
    React.useState<CuencasInstrumentos[]>([]);
  const [rows_anexos, set_rows_anexos] = React.useState<Archivos[]>([]);
  const [nombre_seccion, set_nombre_seccion] = React.useState('');
  const [nombre_subseccion, set_nombre_subseccion] = React.useState('');

  const [pozos_selected, set_pozos_selected] = React.useState<ValueProps[]>([]);

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
      set_info_instrumentos({});
      if (id_instrumento) {
        const response = await get_instrumento_id(id_instrumento);
        set_info_instrumentos(response.data);
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

  const fetch_data_cuencas = async (): Promise<void> => {
    try {
      const response = await get_cuencas();
      const datos_cuenca = response.map((datos: Cuenca) => ({
        id_cuenca: datos.id_cuenca,
        nombre: datos.nombre,
        activo: datos.activo,
        precargado: datos.precargado,
        item_ya_usado: datos.item_ya_usado,
      }));
      set_rows_register_cuencas(datos_cuenca);
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };
  const fetch_data_pozo = async (): Promise<void> => {
    try {
      const response = await get_pozo();
      const datos_pozo = response.map((datos: Pozo) => ({
        id_pozo: datos.id_pozo,
        cod_pozo: datos.cod_pozo,
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        precargado: datos.precargado,
        activo: datos.activo,
        item_ya_usado: datos.item_ya_usado,
      }));
      set_rows_register_pozos(datos_pozo);
      if (response?.length > 0) {
        const data_pozo: ValueProps[] = response.map((item: IpropsPozos) => ({
          value: item.id_pozo,
          label: ` ${item.cod_pozo} - ${item.nombre} `,
        }));
        set_pozos_selected(data_pozo);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };
  const fetch_data_pozo_id = async (): Promise<void> => {
    try {
      const response = await get_pozo_id(
        info_busqueda_instrumentos?.id_pozo ?? 0
      );
      const datos_pozo = response.map((datos: Pozo) => ({
        id_pozo: datos.id_pozo,
        cod_pozo: datos.cod_pozo,
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        precargado: datos.precargado,
        activo: datos.activo,
        item_ya_usado: datos.item_ya_usado,
      }));
      set_rows_edit_pozo(datos_pozo);
      if (response?.length > 0) {
        const data_pozo: ValueProps[] = response.map((item: IpropsPozos) => ({
          value: item.id_pozo,
          label: ` ${item.cod_pozo} - ${item.nombre} `,
        }));
        set_pozos_selected(data_pozo);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

  // * parametros de laboratorio

  const [id_resultado_laboratorio, set_id_resultado_laboratorio] =
    React.useState<number | null>(null);

  const value = {
    // *modos instrumentos
    register_instrumento,
    edit_instrumento,
    select_instrumento,
    set_register_instrumento,
    set_edit_instrumento,
    set_select_instrumento,

    // * seleccionar instrumento(información)

    id_instrumento,
    info_busqueda_instrumentos,
    info_instrumentos,
    rows_cuencas_instrumentos,
    rows_anexos,
    set_id_instrumento,
    set_info_busqueda_instrumentos,
    set_info_instrumentos,
    set_rows_cuencas_instrumentos,
    set_rows_anexos,
    fetch_data_cuencas_instrumentos,
    fetch_data_instrumento,
    fetch_data_anexos,
    fetch_data_pozo_id,

    pozos_selected,
    mode,
    nombre_subseccion,
    nombre_seccion,
    row_cartera_aforo,
    row_prueba_bombeo,
    row_result_laboratorio,
    rows_register_cuencas,
    rows_register_pozos,
    rows_edit_pozo,
    id_seccion,
    id_subseccion,
    archivos,
    nombres_archivos,
    is_open_cuenca,
    is_open_pozos,
    is_loading_submit,
    set_pozos_selected,
    set_mode,
    set_nombre_subseccion,
    set_nombre_seccion,
    set_row_cartera_aforo,
    set_row_prueba_bombeo,
    set_row_result_laboratorio,
    set_rows_register_cuencas,
    set_rows_register_pozos,
    set_rows_edit_pozo,
    set_id_seccion,
    set_id_subseccion,
    set_archivos,
    set_nombres_archivos,
    set_is_open_cuenca,
    set_is_open_pozos,
    set_is_loading_submit,
    fetch_data_cuencas,
    fetch_data_pozo,

    // * parametros de laboratorio
    id_resultado_laboratorio,
    set_id_resultado_laboratorio,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
