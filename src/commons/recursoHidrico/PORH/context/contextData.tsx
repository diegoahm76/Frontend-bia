/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import type {
  BusquedaPorhI,
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
import { type Dayjs } from 'dayjs';
interface UserContext {
  nombre_programa: string;
  fecha_inicial: Dayjs | null;
  fecha_fin: Dayjs | null;
  data_actividad: GetActividades | undefined;
  data_programa: GetPrograma | undefined;
  info_programa: InfoPorh | undefined;
  info_instrumento: BusquedaPorhI | undefined;
  rows_programas: GetPrograma[];
  rows_proyectos: GetProyectos[];
  rows_proyectos_register: GetProyectos[];
  rows_actividades: GetActividades[];
  rows_actividades_register: GetActividades[];
  is_saving: boolean;
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
  id_instrumento: number | null;
  id_programa: number | null;
  id_proyecto: number | null;
  id_actividad: number | null;
  set_nombre_programa: (value: string) => void;
  set_fecha_inicial: (value: Dayjs | null) => void;
  set_fecha_fin: (value: Dayjs | null) => void;
  set_info_programa: (value: InfoPorh) => void;
  set_info_instrumento: (value: BusquedaPorhI) => void;
  set_rows_programas: (rows: GetPrograma[]) => void;
  set_rows_proyectos: (rows: GetProyectos[]) => void;
  set_rows_proyectos_register: (rows: GetProyectos[]) => void;
  set_rows_actividades: (rows: GetActividades[]) => void;
  set_rows_actividades_register: (rows: GetActividades[]) => void;
  set_is_saving: (value: boolean) => void;
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
  set_is_consulta: (value: boolean) => void;
  set_mode: (value: string) => void;
  set_id_instrumento: (value: number | null) => void;
  set_id_programa: (value: number | null) => void;
  set_id_proyecto: (value: number | null) => void;
  set_id_actividad: (value: number | null) => void;
  fetch_data_programas: () => Promise<void>;
  fetch_data_proyectos: () => Promise<void>;
  fetch_data_actividades: () => Promise<void>;
  reset_form_agregar_programa: () => void;
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
  nombre_programa: '',
  fecha_inicial: null,
  fecha_fin: null,
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
  info_instrumento: {
    id_instrumento: 0,
    nombre: '',
    fecha_inicio: '',
    fecha_fin: '',
    nombre_PORH: '',
  },
  rows_programas: [],
  rows_proyectos: [],
  rows_proyectos_register: [],
  rows_actividades: [],
  rows_actividades_register: [],
  is_saving: false,
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
  id_instrumento: null,
  id_programa: null,
  id_proyecto: null,
  id_actividad: null,
  set_nombre_programa: () => {},
  set_fecha_inicial: () => {},
  set_fecha_fin: () => {},
  set_rows_programas: () => {},
  set_rows_proyectos: () => {},
  set_rows_proyectos_register: () => {},
  set_rows_actividades: () => {},
  set_rows_actividades_register: () => {},
  set_is_saving: () => {},
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
  set_mode: () => {},
  set_id_instrumento: () => {},
  set_id_programa: () => {},
  set_id_proyecto: () => {},
  set_id_actividad: () => {},
  set_info_programa: () => {},
  set_info_instrumento: () => {},
  fetch_data_programas: async () => {},
  fetch_data_proyectos: async () => {},
  fetch_data_actividades: async () => {},
  reset_form_agregar_programa: () => {},
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

  const [is_saving, set_is_saving] = React.useState(false);

  const [id_instrumento, set_id_instrumento] = React.useState<number | null>(
    null
  );
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
  const [rows_proyectos_register, set_rows_proyectos_register] = React.useState<
    GetProyectos[]
  >([]);
  const [rows_actividades, set_rows_actividades] = React.useState<
    GetActividades[]
  >([]);
  const [rows_actividades_register, set_rows_actividades_register] =
    React.useState<GetActividades[]>([]);

  const [data_programa, set_data_programa] = React.useState<GetPrograma>();
  const [data_actividad, set_data_actividad] = React.useState<GetActividades>();

  const [info_programa, set_info_programa] = React.useState<InfoPorh>();
  const [info_instrumento, set_info_instrumento] =
    React.useState<BusquedaPorhI>();

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
    if(mode === 'set_is_general'){
      set_is_general(true)
      set_is_seleccionar_programa(false);
      set_is_agregar_programa(false);
      set_is_editar_programa(false);
      set_is_seleccionar_proyecto(false);
      set_is_agregar_proyecto(false);
      set_is_editar_proyecto(false);
      set_is_seleccionar_actividad(false);
      set_is_agregar_actividad(false);
      set_is_editar_actividad(false);
    }
    else if (mode === 'select_programa') {
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
      if (id_instrumento) {
        await get_data_id(id_instrumento, set_rows_programas, 'get/programas');
      }
    } catch (err: any) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404 && temp.response?.status !== 400) {
        control_error(err.response.data.detail);
      }
    }
  };

  // programas
  const [nombre_programa, set_nombre_programa] = React.useState(''); // Estado del campo "Nombre del programa"
  const [fecha_inicial, set_fecha_inicial] = React.useState<Dayjs | null>(null); // Estado de la fecha inicial
  const [fecha_fin, set_fecha_fin] = React.useState<Dayjs | null>(null); // Estado de la fecha final

  const reset_form_agregar_programa = (): void => {
    set_nombre_programa('');
    set_fecha_inicial(null);
    set_fecha_fin(null);
    reset();
    // Restablecer otros valores del formulario si es necesario
  };

  // validaciones

  const value = {
    id_instrumento,
    set_id_instrumento,
    info_instrumento,
    set_info_instrumento,
    set_is_saving,
    is_saving,
    rows_proyectos_register,
    set_rows_proyectos_register,
    rows_actividades_register,
    set_rows_actividades_register,
    reset_form_agregar_programa,
    nombre_programa,
    set_nombre_programa,
    fecha_inicial,
    set_fecha_inicial,
    fecha_fin,
    set_fecha_fin,
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
