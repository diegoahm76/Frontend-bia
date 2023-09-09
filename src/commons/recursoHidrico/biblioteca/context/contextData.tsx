/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';
import { control_error } from '../../../../helpers';
import type {
  Seccion,
  SubSeccionPorSeccion,
  TableAgregarSubseccion,
} from '../interfaces/interfaces';
import {
  get_data_seccion,
  get_data_subseccion_por_seccion,
} from '../request/request';
import {
  type FieldErrors,
  type FieldValues,
  type UseFormReset,
  type UseFormSetValue,
  useForm,
} from 'react-hook-form';
import type { AxiosError } from 'axios';

interface UserContext {
  mode: string;
  is_saving: boolean;
  is_register_seccion: boolean;
  is_editar_seccion: boolean;
  is_seleccionar_seccion: boolean;
  is_register_subseccion: boolean;
  is_editar_subseccion: boolean;
  is_seleccionar_subseccion: boolean;
  rows_to_delete_subseecion: any[];
  rows_resgister_subseccion: TableAgregarSubseccion[];
  rows_subseccion: SubSeccionPorSeccion[];
  rows_seccion: Seccion[];
  info_seccion: Seccion | undefined;
  info_subseccion: SubSeccionPorSeccion | undefined;
  id_seccion: number | null;
  id_subseccion: number | null;
  set_mode: (value: string) => void;
  set_is_saving: (value: boolean) => void;
  set_is_register_seccion: (value: boolean) => void;
  set_is_editar_seccion: (value: boolean) => void;
  set_is_seleccionar_seccion: (value: boolean) => void;
  set_is_register_subseccion: (value: boolean) => void;
  set_is_editar_subseccion: (value: boolean) => void;
  set_is_seleccionar_subseccion: (value: boolean) => void;
  set_rows_to_delete_subseecion: (rows: any[]) => void;
  set_rows_register_subseccion: (rows: TableAgregarSubseccion[]) => void;
  set_rows_seccion: (rows: Seccion[]) => void;
  set_rows_subseccion: (rows: SubSeccionPorSeccion[]) => void;
  set_info_seccion: (info_seccion: Seccion) => void;
  set_info_subseccion: (info_subseccion: SubSeccionPorSeccion) => void;
  set_id_seccion: (value: number | null) => void;
  set_id_subseccion: (value: number | null) => void;
  fetch_data_seccion: () => Promise<void>;
  fetch_data_subseccion_por_seccion: () => Promise<void>;
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
  mode: '',
  is_saving: false,
  is_register_seccion: false,
  is_editar_seccion: false,
  is_seleccionar_seccion: false,
  is_register_subseccion: false,
  is_editar_subseccion: false,
  is_seleccionar_subseccion: false,
  rows_to_delete_subseecion: [],
  rows_resgister_subseccion: [],
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
    instrumentos_count: 0,
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
  set_mode: () => {},
  set_is_saving: () => {},
  set_is_register_seccion: () => {},
  set_is_editar_seccion: () => {},
  set_is_seleccionar_seccion: () => {},
  set_is_register_subseccion: () => {},
  set_is_editar_subseccion: () => {},
  set_is_seleccionar_subseccion: () => {},
  set_rows_to_delete_subseecion: () => {},
  set_rows_register_subseccion: () => {},
  set_rows_seccion: () => {},
  set_rows_subseccion: () => {},
  set_info_seccion: () => {},
  set_info_subseccion: () => {},
  set_id_seccion: () => {},
  set_id_subseccion: () => {},
  fetch_data_seccion: async () => {},
  fetch_data_subseccion_por_seccion: async () => {},
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
  // use form
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

  // rows
  const [rows_seccion, set_rows_seccion] = React.useState<Seccion[]>([]);
  const [rows_subseccion, set_rows_subseccion] = React.useState<
    SubSeccionPorSeccion[]
  >([]);
  // rows register subseccion
  const [rows_resgister_subseccion, set_rows_register_subseccion] =
    React.useState<TableAgregarSubseccion[]>([]);
  // rows eliminar subseccion
  const [rows_to_delete_subseecion, set_rows_to_delete_subseecion] =
    React.useState<any[]>([]);
  // info
  const [info_seccion, set_info_seccion] = React.useState<Seccion>();
  const [info_subseccion, set_info_subseccion] =
    React.useState<SubSeccionPorSeccion>();

  // id
  const [id_seccion, set_id_seccion] = React.useState<number | null>(null);
  const [id_subseccion, set_id_subseccion] = React.useState<number | null>(
    null
  );

  // estados
  // seccion
  const [is_register_seccion, set_is_register_seccion] =
    React.useState<boolean>(true);
  const [is_editar_seccion, set_is_editar_seccion] =
    React.useState<boolean>(false);
  const [is_seleccionar_seccion, set_is_seleccionar_seccion] =
    React.useState<boolean>(false);
  // subseccion
  const [is_register_subseccion, set_is_register_subseccion] =
    React.useState<boolean>(false);
  const [is_editar_subseccion, set_is_editar_subseccion] =
    React.useState<boolean>(false);
  const [is_seleccionar_subseccion, set_is_seleccionar_subseccion] =
    React.useState<boolean>(false);

  // modos
  const [mode, set_mode] = React.useState('');

  React.useEffect(() => {
    if (mode === 'select_seccion') {
      set_is_seleccionar_seccion(true);
      set_is_register_seccion(false);
      set_is_editar_seccion(false);
      set_is_register_subseccion(false);
      set_is_editar_subseccion(false);
      set_is_seleccionar_subseccion(false);
    } else if (mode === 'register_seccion') {
      set_is_register_seccion(true);
      set_is_seleccionar_seccion(false);
      set_is_editar_seccion(false);
      set_is_register_subseccion(false);
      set_is_editar_subseccion(false);
      set_is_seleccionar_subseccion(false);
    } else if (mode === 'editar_seccion') {
      set_is_editar_seccion(true);
      set_is_seleccionar_seccion(false);
      set_is_register_seccion(false);
      set_is_register_subseccion(false);
      set_is_editar_subseccion(false);
      set_is_seleccionar_subseccion(false);
    } else if (mode === 'select_subseccion') {
      set_is_seleccionar_subseccion(true);
      set_is_register_subseccion(false);
      set_is_editar_subseccion(false);
    } else if (mode === 'register_subseccion') {
      set_is_register_subseccion(true);
      set_is_editar_subseccion(false);
      set_is_seleccionar_subseccion(false);
    } else if (mode === 'editar_subseccion') {
      set_is_editar_subseccion(true);
      set_is_register_subseccion(false);
      set_is_seleccionar_subseccion(false);
    }
  }, [mode]);
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

  const value: UserContext = {
    mode,
    is_saving,
    is_register_seccion,
    is_editar_seccion,
    is_seleccionar_seccion,
    is_register_subseccion,
    is_editar_subseccion,
    is_seleccionar_subseccion,
    rows_to_delete_subseecion,
    rows_resgister_subseccion,
    rows_subseccion,
    rows_seccion,
    info_seccion,
    info_subseccion,
    id_seccion,
    id_subseccion,
    set_mode,
    set_is_saving,
    set_is_register_seccion,
    set_is_editar_seccion,
    set_is_seleccionar_seccion,
    set_is_register_subseccion,
    set_is_editar_subseccion,
    set_is_seleccionar_subseccion,
    set_rows_to_delete_subseecion,
    set_rows_register_subseccion,
    set_rows_seccion,
    set_rows_subseccion,
    set_info_seccion,
    set_info_subseccion,
    set_id_seccion,
    set_id_subseccion,
    fetch_data_seccion,
    fetch_data_subseccion_por_seccion,
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
