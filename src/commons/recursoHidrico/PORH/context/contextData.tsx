/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { GetActividades, GetPrograma, GetProyectos } from '../Interfaces/interfaces';
import { get_data_id } from '../Request/request';
import { control_error } from '../../../../helpers';
import type { AxiosError } from 'axios';

interface UserContext {
  crear_programa: any;
  set_crear_programa: any;
  rows_programas: GetPrograma[];
  rows_proyectos: GetProyectos[];
  rows_actividades: GetActividades[];
  is_agregar_actividad: boolean;
  is_editar_actividad: boolean;
  is_seleccionar_actividad: boolean;
  is_agregar_programa: boolean;
  is_editar_programa: boolean;
  is_seleccionar_programa: boolean;
  is_agregar_proyecto: boolean;
  is_editar_proyecto: boolean;
  is_seleccionar_proyecto: boolean;
  id_programa: number | null;
  id_proyecto: number | null;
  id_actividad: number | null;
  filter: any[];
  columns: string[];
  actionIcons: any[];
  set_rows_programas: (rows: GetPrograma[]) => void;
  set_rows_proyectos: (rows: GetProyectos[]) => void;
  set_rows_actividades: (rows: GetActividades[]) => void;
  set_is_agregar_actividad: (value: boolean) => void;
  set_is_editar_actividad: (value: boolean) => void;
  set_is_seleccionar_actividad: (value: boolean) => void;
  set_is_agregar_programa: (value: boolean) => void;
  set_is_editar_programa: (value: boolean) => void;
  set_is_seleccionar_programa: (value: boolean) => void;
  set_is_agregar_proyecto: (value: boolean) => void;
  set_is_editar_proyecto: (value: boolean) => void;
  set_is_seleccionar_proyecto: (value: boolean) => void;
  set_id_programa: (value: number | null) => void;
  set_id_proyecto: (value: number | null) => void;
  set_id_actividad: (value: number | null) => void;
  fetch_data_programas: () => Promise<void>;
  fetch_data_proyectos: () => Promise<void>;
  fetch_data_actividades: () => Promise<void>;
}

export const DataContext = createContext<UserContext>({
  rows_programas: [],
  rows_proyectos: [],
  rows_actividades: [],
  is_agregar_actividad: false,
  is_editar_actividad: false,
  is_seleccionar_actividad: false,
  is_agregar_programa: false,
  is_editar_programa: false,
  is_seleccionar_programa: false,
  is_agregar_proyecto: false,
  is_editar_proyecto: false,
  is_seleccionar_proyecto: false,
  id_programa: null,
  id_proyecto: null,
  id_actividad: null,
  filter: [],
  columns: [],
  actionIcons: [],
  set_rows_programas: () => { },
  set_rows_proyectos: () => { },
  set_rows_actividades: () => { },
  crear_programa: {},
  set_crear_programa: () => { },
  set_is_agregar_actividad: () => { },
  set_is_editar_actividad: () => { },
  set_is_seleccionar_actividad: () => { },
  set_is_agregar_programa: () => { },
  set_is_editar_programa: () => { },
  set_is_seleccionar_programa: () => { },
  set_is_agregar_proyecto: () => { },
  set_is_editar_proyecto: () => { },
  set_is_seleccionar_proyecto: () => { },
  set_id_programa: () => { },
  set_id_proyecto: () => { },
  set_id_actividad: () => { },
  fetch_data_programas: async () => { },
  fetch_data_proyectos: async () => { },
  fetch_data_actividades: async () => { },
});

export const UserProvider = ({
  children
}: {
  children: React.ReactNode;
}): any => {

  const [id_programa, set_id_programa] = React.useState<number | null>(null);
  const [id_proyecto, set_id_proyecto] = React.useState<number | null>(null);
  const [id_actividad, set_id_actividad] = React.useState<number | null>(null);

  // tablas contenido programatico
  const [rows_programas, set_rows_programas] = React.useState<GetPrograma[]>([]);
  const [rows_proyectos, set_rows_proyectos] = React.useState<GetProyectos[]>([]);
  const [rows_actividades, set_rows_actividades] = React.useState<GetActividades[]>([]);

  // estados componentes programa
  const [is_agregar_programa, set_is_agregar_programa] = React.useState(false);
  const [is_editar_programa, set_is_editar_programa] = React.useState(false);
  const [is_seleccionar_programa, set_is_seleccionar_programa] = React.useState(false);

  // estados componentes proyecto
  const [is_agregar_proyecto, set_is_agregar_proyecto] = React.useState(false);
  const [is_editar_proyecto, set_is_editar_proyecto] = React.useState(false);
  const [is_seleccionar_proyecto, set_is_seleccionar_proyecto] = React.useState(false);

  // estados componentes actividad
  const [is_agregar_actividad, set_is_agregar_actividad] = React.useState(false);
  const [is_editar_actividad, set_is_editar_actividad] = React.useState(false);
  const [is_seleccionar_actividad, set_is_seleccionar_actividad] = React.useState(false);

  const fetch_data_actividades = async (): Promise<void> => {
    try {
      set_rows_actividades([])
      if (id_proyecto) {
        await get_data_id(id_proyecto, set_rows_actividades, 'get/actividades/por/proyectos');
      }
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail);
      }
    }
  };
  const fetch_data_proyectos = async (): Promise<void> => {
    try {
      set_rows_proyectos([])
      if (id_programa) {
        await get_data_id(id_programa, set_rows_proyectos, 'get/proyectos/por/programas');
      }
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail);
      }
    }
  };
  const fetch_data_programas = async (): Promise<void> => {
    try {
      set_rows_programas([])
      await get_data_id(1, set_rows_programas, 'get/programas');
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail);
      }
    }
  };

  const [filter, setFilter] = React.useState<any>([]);
  const [columns, setColumns] = React.useState<string[]>([]);
  const [actionIcons, setActionIcons] = React.useState<any[]>([]);
  const [crear_programa, set_crear_programa] = React.useState({});

  const value = {
    fetch_data_actividades,
    fetch_data_proyectos,
    fetch_data_programas,
    set_id_actividad,
    id_actividad,
    set_id_proyecto,
    id_proyecto,
    set_id_programa,
    id_programa,
    is_agregar_proyecto,
    set_is_agregar_proyecto,
    is_editar_proyecto,
    set_is_editar_proyecto,
    is_seleccionar_proyecto,
    set_is_seleccionar_proyecto,
    is_agregar_programa,
    set_is_agregar_programa,
    is_editar_programa,
    set_is_editar_programa,
    is_seleccionar_programa,
    set_is_seleccionar_programa,
    is_agregar_actividad,
    set_is_agregar_actividad,
    is_editar_actividad,
    set_is_editar_actividad,
    is_seleccionar_actividad,
    set_is_seleccionar_actividad,
    set_crear_programa,
    crear_programa,
    rows_programas,
    set_rows_programas,
    rows_proyectos,
    set_rows_proyectos,
    rows_actividades,
    set_rows_actividades,
    filter,
    setFilter,
    columns,
    setColumns,
    actionIcons,
    setActionIcons,
  };

  // Validaciones
  if (is_agregar_programa) {
    value.is_editar_programa = false;
    value.is_seleccionar_programa = false;
    value.is_agregar_proyecto = false;
    value.is_editar_proyecto = false;
    value.is_seleccionar_proyecto = false;
    value.is_agregar_actividad = false;
    value.is_editar_actividad = false;
    value.is_seleccionar_actividad = false;
    set_is_agregar_proyecto(true);
  } else if (is_editar_programa) {
    value.is_agregar_programa = false;
    value.is_seleccionar_programa = false;
    value.is_agregar_proyecto = false;
    value.is_editar_proyecto = false;
    value.is_seleccionar_proyecto = false;
    value.is_agregar_actividad = false;
    value.is_editar_actividad = false;
    value.is_seleccionar_actividad = false;
  } else if (is_seleccionar_programa) {
    value.is_agregar_programa = false;
    value.is_editar_programa = false;
    value.is_agregar_proyecto = false;
    value.is_editar_proyecto = false;
    value.is_seleccionar_proyecto = false;
    value.is_agregar_actividad = false;
    value.is_editar_actividad = false;
  } else if (is_agregar_proyecto) {
    value.is_agregar_programa = false;
    value.is_editar_programa = false;
    value.is_seleccionar_programa = false;
    value.is_editar_proyecto = false;
    value.is_seleccionar_proyecto = false;
    value.is_editar_actividad = false;
    value.is_seleccionar_actividad = false;
  } else if (is_seleccionar_proyecto) {
    value.is_agregar_programa = false;
    value.is_editar_programa = false;
    value.is_seleccionar_programa = false;
    value.is_agregar_proyecto = false;
    value.is_editar_proyecto = false;
    value.is_agregar_actividad = false;
    value.is_editar_actividad = false;
  } else if (is_agregar_actividad) {
    value.is_editar_actividad = false;
    value.is_seleccionar_actividad = false;
    if (!is_agregar_programa && !is_agregar_proyecto && !is_seleccionar_programa && !is_seleccionar_proyecto) {
      value.is_agregar_programa = true;
    }
  } else if (is_editar_actividad) {
    value.is_agregar_actividad = false;
    value.is_seleccionar_actividad = false;
    if (!is_seleccionar_programa && !is_seleccionar_proyecto) {
      value.is_seleccionar_programa = true;
    }
  } else if (is_seleccionar_actividad) {
    value.is_agregar_actividad = false;
    value.is_editar_actividad = false;
    if (!is_seleccionar_programa && !is_seleccionar_proyecto) {
      value.is_seleccionar_programa = true;
    }
  }


  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
