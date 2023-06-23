/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type { GetActividades, GetAvances, GetPrograma, GetProyectos, InfoAvance } from '../Interfaces/interfaces';
import { get_data_id } from '../request/request';
import { control_error } from '../../../../helpers';

interface UserContext {
  crear_programa: any;
  set_crear_programa: any;
  rows_programas: GetPrograma[];
  rows_proyectos: GetProyectos[];
  rows_actividades: GetActividades[];
  rows_avances: any[];
  id_programa: number | null;
  id_proyecto: number | null;
  id_actividad: number | null;
  id_avance: number | null;
  is_register_avance: boolean;
  is_editar_avance: boolean;
  is_select_avance: boolean;
  is_select_proyecto: boolean;
  mode: string;
  info_avance: InfoAvance | undefined;
  filter: any[];
  columns: string[];
  actionIcons: any[];
  set_rows_programas: (rows: GetPrograma[]) => void;
  set_rows_proyectos: (rows: GetProyectos[]) => void;
  set_rows_actividades: (rows: GetActividades[]) => void;
  set_rows_avances: (rows: any[]) => void;
  set_id_programa: (id: number | null) => void;
  set_id_proyecto: (id: number | null) => void;
  set_id_actividad: (id: number | null) => void;
  set_id_avance: (id: number | null) => void;
  set_is_register_avance: (is_register_avance: boolean) => void;
  set_is_editar_avance: (is_editar_avance: boolean) => void;
  set_is_select_avance: (is_select_avance: boolean) => void;
  set_is_select_proyecto: (is_select_proyecto: boolean) => void;
  fetch_data_avances: () => Promise<void>;
  fetch_data_actividades: () => Promise<void>;
  set_info_avance: (info_avance: InfoAvance) => void;
  set_mode: (mode: string) => void;
}

export const DataContext = createContext<UserContext>({
  rows_programas: [],
  rows_proyectos: [],
  rows_actividades: [],
  rows_avances: [],
  id_programa: null,
  id_proyecto: null,
  id_actividad: null,
  id_avance: null,
  is_register_avance: false,
  is_editar_avance: false,
  is_select_avance: false,
  is_select_proyecto: false,
  mode: '',
  info_avance: {
    id_avance: 0,
    nombre_programa: '',
    nombre_PORH: '',
    nombre: '',
    nombre_avance: '',
    fecha_reporte: '',
    accion: '',
    descripcion: '',
    fecha_registro: '',
    id_proyecto: 0,
    id_persona_registra: 0,
    evidencias: [],
  },
  filter: [],
  columns: [],
  actionIcons: [],
  set_rows_programas: () => { },
  set_rows_proyectos: () => { },
  set_rows_actividades: () => { },
  set_rows_avances: () => { },
  crear_programa: {},
  set_crear_programa: () => { },
  set_id_programa: () => { },
  set_id_proyecto: () => { },
  set_id_actividad: () => { },
  set_id_avance: () => { },
  fetch_data_avances: async () => { },
  fetch_data_actividades: async () => { },
  set_is_register_avance: () => { },
  set_is_editar_avance: () => { },
  set_is_select_avance: () => { },
  set_is_select_proyecto: () => { },
  set_info_avance: () => { },
  set_mode: () => { },
});

export const UserProvider = ({
  children
}: {
  children: React.ReactNode;
}): any => {

  const [id_programa, set_id_programa] = React.useState<number | null>(null);
  const [id_proyecto, set_id_proyecto] = React.useState<number | null>(null);
  const [id_actividad, set_id_actividad] = React.useState<number | null>(null);
  const [id_avance, set_id_avance] = React.useState<number | null>(null);

  // tablas contenido programatico
  const [rows_programas, set_rows_programas] = React.useState<GetPrograma[]>([]);
  const [rows_proyectos, set_rows_proyectos] = React.useState<GetProyectos[]>([]);
  const [rows_actividades, set_rows_actividades] = React.useState<GetActividades[]>([]);
  const [rows_avances, set_rows_avances] = React.useState<GetAvances[]>([]);

  const [is_register_avance, set_is_register_avance] = React.useState<boolean>(false);
  const [is_editar_avance, set_is_editar_avance] = React.useState<boolean>(false);
  const [is_select_avance, set_is_select_avance] = React.useState<boolean>(false);
  const [is_select_proyecto, set_is_select_proyecto] = React.useState<any>({});

  const [mode, set_mode] = React.useState('');

  React.useEffect(() => {
    if (mode === 'select_avance') {
      set_mode('');
      set_is_select_avance(true);
      set_is_editar_avance(false);
      set_is_register_avance(false);
      set_is_select_proyecto(false);
    } else if (mode === 'editar_avance') {
      set_mode('');
      set_is_editar_avance(true);
      set_is_select_avance(false);
      set_is_register_avance(false);
      set_is_select_proyecto(false);
    } else if (mode === 'register_avance') {
      set_mode('');
      set_is_register_avance(true);
      set_is_select_avance(false);
      set_is_editar_avance(false);
      set_is_select_proyecto(true);
    } else if (mode === 'select_proyecto') {
      set_mode('');
      set_is_select_proyecto(true);
      set_is_editar_avance(false);
      set_is_select_avance(false);
      set_is_register_avance(false);
    }
  }, [mode]);

  const [info_avance, set_info_avance] = React.useState<InfoAvance>();

  const fetch_data_avances = async (): Promise<void> => {
    try {
      set_rows_avances([])
      if (id_proyecto) {
        await get_data_id(id_proyecto, set_rows_avances, 'get/avances/por/proyectos');
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };
  const fetch_data_actividades = async (): Promise<void> => {
    try {
      set_rows_actividades([])
      if (id_proyecto) {
        await get_data_id(id_proyecto, set_rows_actividades, 'get/actividades/por/proyectos');
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

  const [filter, setFilter] = React.useState<any>([]);
  const [columns, setColumns] = React.useState<string[]>([]);
  const [actionIcons, setActionIcons] = React.useState<any[]>([]);
  const [crear_programa, set_crear_programa] = React.useState({});



  const value = {
    mode,
    set_mode,
    is_select_proyecto,
    set_is_select_proyecto,
    fetch_data_actividades,
    set_is_select_avance,
    is_select_avance,
    info_avance,
    set_info_avance,
    is_editar_avance,
    set_is_editar_avance,
    is_register_avance,
    set_is_register_avance,
    set_id_avance,
    id_avance,
    set_id_actividad,
    id_actividad,
    set_id_proyecto,
    id_proyecto,
    set_id_programa,
    id_programa,
    set_rows_avances,
    rows_avances,
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
    fetch_data_avances
  };
  // if (is_select_avance) {
  //   value.set_is_editar_avance(false);
  //   value.set_is_register_avance(false);
  // }else if(is_editar_avance){
  //   value.set_is_select_avance(false);
  //   value.set_is_register_avance(false);
  // }else if(is_register_avance){
  //   value.set_is_select_avance(false);
  //   value.set_is_editar_avance(false);
  // }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
