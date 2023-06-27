/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type {
  GetActividades,
  GetPrograma,
  GetProyectos,
  InfoPorh,
} from '../Interfaces/interfaces';
import { get_data_id } from '../Request/request';
import { control_error } from '../../../../helpers';
import type { AxiosError } from 'axios';
import {
  type FieldErrors,
  type FieldValues,
  type UseFormReset,
  type UseFormSetValue,
  useForm,
} from 'react-hook-form';
interface UserContext {
  is_nombre_programa_valid: boolean;
  is_fechas_validas: boolean;
  is_fecha_inicial_valida: boolean;
  data_actividad: GetActividades | undefined;
  data_programa: GetPrograma | undefined;
  info_programa: InfoPorh | undefined;
  rows_programas: GetPrograma[];
  rows_proyectos: GetProyectos[];
  rows_actividades: GetActividades[];
  is_general: boolean;
  is_agregar_actividad: boolean;
  is_editar_actividad: boolean;
  is_seleccionar_actividad: boolean;
  is_agregar_programa: boolean;
  is_editar_programa: boolean;
  is_seleccionar_programa: boolean;
  is_agregar_proyecto: boolean;
  is_editar_proyecto: boolean;
  is_seleccionar_proyecto: boolean;
  is_consulta: boolean;
  mode: string;
  id_programa: number | null;
  id_proyecto: number | null;
  id_actividad: number | null;
  set_info_programa: (value: InfoPorh) => void;
  set_rows_programas: (rows: GetPrograma[]) => void;
  set_rows_proyectos: (rows: GetProyectos[]) => void;
  set_rows_actividades: (rows: GetActividades[]) => void;
  set_is_general: (value: boolean) => void;
  set_is_agregar_actividad: (value: boolean) => void;
  set_is_editar_actividad: (value: boolean) => void;
  set_is_seleccionar_actividad: (value: boolean) => void;
  set_is_agregar_programa: (value: boolean) => void;
  set_is_editar_programa: (value: boolean) => void;
  set_is_seleccionar_programa: (value: boolean) => void;
  set_is_agregar_proyecto: (value: boolean) => void;
  set_is_editar_proyecto: (value: boolean) => void;
  set_is_seleccionar_proyecto: (value: boolean) => void;
  set_is_nombre_programa_valid: (value: boolean) => void;
  set_is_fechas_validas: (value: boolean) => void;
  set_is_fecha_inicial_valida: (value: boolean) => void;
  set_is_consulta: (value: boolean) => void;
  set_mode: (value: string) => void;
  set_id_programa: (value: number | null) => void;
  set_id_proyecto: (value: number | null) => void;
  set_id_actividad: (value: number | null) => void;
  fetch_data_programas: () => Promise<void>;
  fetch_data_proyectos: () => Promise<void>;
  fetch_data_actividades: () => Promise<void>;
  set_data_programa: (value: GetPrograma) => void;
  set_data_actividad: (value: GetActividades) => void;
  register: any;
  handleSubmit: any;
  setValue: UseFormSetValue<FieldValues>;
  errors: FieldErrors<FieldValues>;
  watch: any;
  getValues: any;
  reset: UseFormReset<FieldValues>;
  setError: any;
}

export const DataContext = createContext<UserContext>({
  is_nombre_programa_valid: false,
  is_fechas_validas: false,
  is_fecha_inicial_valida: false,
  data_actividad: {
    id_actividades: 0,
    nombre: '',
    fecha_registro: '',
    id_proyecto: 0,
  },
  data_programa: {
    id_programa: 0,
    nombre: '',
    fecha_inicio: '',
    fecha_fin: '',
  },
  info_programa: {
    id_proyecto: 0,
    nombre_programa: '',
    nombre_PORH: '',
    fecha_inicio: '',
    fecha_fin: '',
    nombre: '',
    vigencia_inicial: '',
    vigencia_final: '',
    inversion: 0,
    fecha_registro: '',
    id_programa: 0,
  },
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
  is_consulta: false,
  is_general: false,
  mode: '',
  id_programa: null,
  id_proyecto: null,
  id_actividad: null,
  set_rows_programas: () => {},
  set_rows_proyectos: () => {},
  set_rows_actividades: () => {},
  set_is_agregar_actividad: () => {},
  set_is_editar_actividad: () => {},
  set_is_seleccionar_actividad: () => {},
  set_is_agregar_programa: () => {},
  set_is_editar_programa: () => {},
  set_is_seleccionar_programa: () => {},
  set_is_agregar_proyecto: () => {},
  set_is_editar_proyecto: () => {},
  set_is_seleccionar_proyecto: () => {},
  set_is_general: () => {},
  set_is_consulta: () => {},
  set_is_nombre_programa_valid: () => {},
  set_is_fechas_validas: () => {},
  set_is_fecha_inicial_valida: () => {},
  set_mode: () => {},
  set_id_programa: () => {},
  set_id_proyecto: () => {},
  set_id_actividad: () => {},
  set_info_programa: () => {},
  fetch_data_programas: async () => {},
  fetch_data_proyectos: async () => {},
  fetch_data_actividades: async () => {},
  set_data_programa: () => {},
  set_data_actividad: () => {},
  register: () => {},
  handleSubmit: () => {},
  setValue: () => {},
  errors: {},
  watch: () => {},
  getValues: () => {},
  reset: () => {},
  setError: () => {},
});

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): any => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    setError,
  } = useForm();

  const [id_programa, set_id_programa] = React.useState<number | null>(null);
  const [id_proyecto, set_id_proyecto] = React.useState<number | null>(null);
  const [id_actividad, set_id_actividad] = React.useState<number | null>(null);

  // tablas contenido programatico
  const [rows_programas, set_rows_programas] = React.useState<GetPrograma[]>(
    []
  );
  const [rows_proyectos, set_rows_proyectos] = React.useState<GetProyectos[]>(
    []
  );
  const [rows_actividades, set_rows_actividades] = React.useState<
    GetActividades[]
  >([]);

  const [data_programa, set_data_programa] = React.useState<GetPrograma>();
  const [data_actividad, set_data_actividad] = React.useState<GetActividades>();

  const [info_programa, set_info_programa] = React.useState<InfoPorh>();

  const [is_general, set_is_general] = React.useState(true);
  const [is_consulta, set_is_consulta] = React.useState(false);

  // estados componentes programa
  const [is_agregar_programa, set_is_agregar_programa] = React.useState(false);
  const [is_editar_programa, set_is_editar_programa] = React.useState(false);
  const [is_seleccionar_programa, set_is_seleccionar_programa] =
    React.useState(false);

  // estados componentes proyecto
  const [is_agregar_proyecto, set_is_agregar_proyecto] = React.useState(false);
  const [is_editar_proyecto, set_is_editar_proyecto] = React.useState(false);
  const [is_seleccionar_proyecto, set_is_seleccionar_proyecto] =
    React.useState(false);

  // estados componentes actividad
  const [is_agregar_actividad, set_is_agregar_actividad] =
    React.useState(false);
  const [is_editar_actividad, set_is_editar_actividad] = React.useState(false);
  const [is_seleccionar_actividad, set_is_seleccionar_actividad] =
    React.useState(false);

  const [mode, set_mode] = React.useState('');

  React.useEffect(() => {
    if (mode === 'select_programa') {
      set_mode('');
      set_is_seleccionar_programa(true);
      set_is_agregar_programa(false);
      set_is_editar_programa(false);
      set_is_seleccionar_proyecto(false);
      set_is_agregar_proyecto(false);
      set_is_editar_proyecto(false);
      set_is_seleccionar_actividad(false);
      set_is_agregar_actividad(false);
      set_is_editar_actividad(false);
    } else if (mode === 'editar_programa') {
      set_mode('');
      set_is_seleccionar_programa(false);
      set_is_agregar_programa(false);
      set_is_editar_programa(true);
      set_is_seleccionar_proyecto(false);
      set_is_agregar_proyecto(false);
      set_is_editar_proyecto(false);
      set_is_seleccionar_actividad(false);
      set_is_agregar_actividad(false);
      set_is_editar_actividad(false);
    } else if (mode === 'register_programa') {
      set_mode('');
      set_is_seleccionar_programa(false);
      set_is_agregar_programa(true);
      set_is_editar_programa(false);
      set_is_seleccionar_proyecto(false);
      set_is_agregar_proyecto(false);
      set_is_editar_proyecto(false);
      set_is_seleccionar_actividad(false);
      set_is_agregar_actividad(false);
      set_is_editar_actividad(false);
    } else if (mode === 'select_proyecto') {
      set_mode('');
      set_is_seleccionar_proyecto(true);
      set_is_agregar_proyecto(false);
      set_is_editar_proyecto(false);
      set_is_seleccionar_actividad(false);
      set_is_agregar_actividad(false);
      set_is_editar_actividad(false);
    } else if (mode === 'editar_proyecto') {
      set_mode('');
      set_is_seleccionar_proyecto(false);
      set_is_agregar_proyecto(false);
      set_is_editar_proyecto(true);
      set_is_seleccionar_actividad(false);
      set_is_agregar_actividad(false);
      set_is_editar_actividad(false);
    } else if (mode === 'register_proyecto') {
      set_mode('');
      set_is_seleccionar_proyecto(false);
      set_is_agregar_proyecto(true);
      set_is_editar_proyecto(false);
      set_is_seleccionar_actividad(false);
      set_is_agregar_actividad(false);
      set_is_editar_actividad(false);
    } else if (mode === 'select_actividad') {
      set_mode('');
      set_is_seleccionar_actividad(true);
      set_is_agregar_actividad(false);
      set_is_editar_actividad(false);
    } else if (mode === 'editar_actividad') {
      set_mode('');
      set_is_seleccionar_actividad(false);
      set_is_agregar_actividad(false);
      set_is_editar_actividad(true);
    } else if (mode === 'register_actividad') {
      set_mode('');
      set_is_seleccionar_actividad(false);
      set_is_agregar_actividad(true);
      set_is_editar_actividad(false);
    }
  }, [mode]);

  const fetch_data_actividades = async (): Promise<void> => {
    try {
      set_rows_actividades([]);
      if (id_proyecto) {
        await get_data_id(
          id_proyecto,
          set_rows_actividades,
          'get/actividades/por/proyectos'
        );
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
      set_rows_proyectos([]);
      if (id_programa) {
        await get_data_id(
          id_programa,
          set_rows_proyectos,
          'get/proyectos/por/programas'
        );
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
      set_rows_programas([]);
      await get_data_id(1, set_rows_programas, 'get/programas');
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail);
      }
    }
  };

  // validaciones 
  const [is_nombre_programa_valid, set_is_nombre_programa_valid] =
    React.useState(false);
  const [is_fechas_validas, set_is_fechas_validas] = React.useState(false);
  const [is_fecha_inicial_valida, set_is_fecha_inicial_valida] = React.useState(false);

  const value = {
    is_nombre_programa_valid,
    set_is_nombre_programa_valid,
    is_fechas_validas,
    set_is_fechas_validas,
    is_fecha_inicial_valida,
    set_is_fecha_inicial_valida,
    data_actividad,
    set_data_actividad,
    data_programa,
    set_data_programa,
    is_consulta,
    set_is_consulta,
    is_general,
    set_is_general,
    info_programa,
    set_info_programa,
    mode,
    set_mode,
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
    rows_programas,
    set_rows_programas,
    rows_proyectos,
    set_rows_proyectos,
    rows_actividades,
    set_rows_actividades,
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    errors,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
