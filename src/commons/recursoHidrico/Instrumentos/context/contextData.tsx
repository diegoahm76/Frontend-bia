/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import { control_error } from '../../../../helpers';
import { get_cuencas, get_pozo } from '../../configuraciones/Request/request';
import type{ Cuenca, Pozo } from '../../configuraciones/interfaces/interfaces';

interface UserContext {
  mode: string;
  nombre_subseccion: string;
  nombre_seccion: string;
  row_cartera_aforo: any;
  row_prueba_bombeo: any;
  row_result_laboratorio: any;
  rows_register_cuencas: any;
  rows_register_pozos: any;
  id_seccion: number | null;
  id_subseccion: number | null;
  is_open_cuenca: boolean;
  is_open_pozos: boolean;
  archivos: any;
  nombres_archivos: any;
  set_mode: (mode: string) => void;
  set_nombre_subseccion: (nombre_subseccion: string) => void;
  set_nombre_seccion: (nombre_seccion: string) => void;
  set_row_cartera_aforo: (row_cartera_aforo: any) => void;
  set_row_prueba_bombeo: (row_prueba_bombeo: any) => void;
  set_row_result_laboratorio: (row_result_laboratorio: any) => void;
  set_rows_register_cuencas: (rows_register_cuencas: any) => void;
  set_rows_register_pozos: (rows_register_pozos: any) => void;
  set_id_seccion: (id_seccion: number | null) => void;
  set_id_subseccion: (id_subseccion: number | null) => void;
  set_archivos: (archivos: any) => void;
  set_nombres_archivos: (nombres_archivos: any) => void;
  set_is_open_cuenca: (is_open_cuenca: boolean) => void;
  set_is_open_pozos: (is_open_pozos: boolean) => void;

  fetch_data_cuencas: () => void;
  fetch_data_pozo: () => void;
}

export const DataContext = createContext<UserContext>({
  mode: '',
  nombre_subseccion: '',
  nombre_seccion: '',
  row_cartera_aforo: {},
  row_prueba_bombeo: {},
  row_result_laboratorio: {},
  rows_register_cuencas: {},
  rows_register_pozos: {},

  id_seccion: null,
  id_subseccion: null,

  archivos: [null],
  nombres_archivos: [''],
  
  is_open_cuenca: false,
  is_open_pozos: false,
  
  set_mode: () => {},
  set_nombre_subseccion: () => {},
  set_nombre_seccion: () => {},
  set_row_cartera_aforo: () => {},
  set_row_prueba_bombeo: () => {},
  set_row_result_laboratorio: () => {},
  set_rows_register_cuencas: () => {},
  set_rows_register_pozos: () => {},

  set_id_seccion: () => {},
  set_id_subseccion: () => {},

  set_archivos: () => {},
  set_nombres_archivos: () => {},

  set_is_open_cuenca: () => {},
  set_is_open_pozos: () => {},

  fetch_data_cuencas: () => {},
  fetch_data_pozo: () => {},

});

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): any => {

  // manejo de archivos 
  const [archivos, set_archivos] = React.useState<Array<File | null>>([null]);
  const [nombres_archivos, set_nombres_archivos] = React.useState<string[]>(['']);


  // modales
  const [is_open_cuenca, set_is_open_cuenca] = React.useState(false);
  const [is_open_pozos, set_is_open_pozos] = React.useState(false);


  // id

  const [id_seccion, set_id_seccion] = React.useState<number | null>(null);
  const [id_subseccion, set_id_subseccion] = React.useState<number | null>(null);

  const [mode, set_mode] = React.useState('');

  const [nombre_subseccion, set_nombre_subseccion] =
    React.useState('');
    const [nombre_seccion, set_nombre_seccion] =
    React.useState('');

  const [row_cartera_aforo, set_row_cartera_aforo] = React.useState<any>({});
  const [row_prueba_bombeo, set_row_prueba_bombeo] = React.useState<any>({});
  const [row_result_laboratorio, set_row_result_laboratorio] =
    React.useState<any>({});

  const [rows_register_cuencas, set_rows_register_cuencas] =
    React.useState<any>({});

  const [rows_register_pozos, set_rows_register_pozos] =
    React.useState<any>({});

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
        console.log(datos_pozo, 'datos_pozo');
      } catch (error: any) {
        control_error(error.response.data.detail);
      }
    };

  const value = {
    mode,
    nombre_subseccion,
    nombre_seccion,
    row_cartera_aforo,
    row_prueba_bombeo,
    row_result_laboratorio,
    rows_register_cuencas,
    rows_register_pozos,
    id_seccion,
    id_subseccion,
    archivos,
    nombres_archivos,
    is_open_cuenca,
    is_open_pozos,
    set_mode,
    set_nombre_subseccion,
    set_nombre_seccion,
    set_row_cartera_aforo,
    set_row_prueba_bombeo,
    set_row_result_laboratorio,
    set_rows_register_cuencas,
    set_rows_register_pozos,
    set_id_seccion,
    set_id_subseccion,
    set_archivos,
    set_nombres_archivos,
    set_is_open_cuenca,
    set_is_open_pozos,
    fetch_data_cuencas,
    fetch_data_pozo,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
