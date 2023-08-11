/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { createContext } from 'react';
import {
  get_alerta,
  get_alerta_cod,
  get_alerta_programada,
  perfiles_sistema,
  personas_alertas,
} from '../request/request';
import { control_error } from '../../../../helpers';
import type { ValueProps } from '../../Instrumentos/interfaces/interface';
import type {
  AlertaProgramada,
  ConfiguracionAlerta,
  DataAlertaPersona,
  IAlerta,
} from '../interfaces/types';

interface UserContext {
  // * estados destinatario
  is_persona: boolean;
  is_perfil: boolean;
  is_lider: boolean;
  set_is_persona: (is_persona: boolean) => void;
  set_is_perfil: (is_perfil: boolean) => void;
  set_is_lider: (is_lider: boolean) => void;

  mode: string;
  set_mode: (mode: string) => void;

  selectedValueFromSelect: {
    label: string;
    value: string;
  };
  setSelectValueFromSelect: any;

  // * selected
  alertas_selected: ValueProps[];
  set_alertas_selected: (alertas_selected: ValueProps[]) => void;
  perfiles_selected: ValueProps[];
  set_perfiles_selected: (perfiles_selected: ValueProps[]) => void;
  // * info

  alertas: ConfiguracionAlerta | undefined;
  set_alertas: (alertas: ConfiguracionAlerta) => void;

  // * rows
  rows_personas_alertas: DataAlertaPersona[];
  set_rows_personas_alertas: (
    rows_personas_alertas: DataAlertaPersona[]
  ) => void;
  rows_alerta_programada: AlertaProgramada[];
  set_rows_alerta_programada: (
    rows_alerta_programada: AlertaProgramada[]
  ) => void;

  // * fetch
  fetch_seleced_alerta: () => Promise<any>;
  fetch_data_alerta_cod: (cod_clase_alerta: string) => Promise<any>;
  fetch_data_perfiles: () => Promise<any>;
  fetch_data_personas: (cod_clase_alerta: string) => Promise<any>;
  fetch_data_alerta_programada: (cod_clase_alerta: string) => Promise<any>;
}

export const DataContext = createContext<UserContext>({
  // * estados destinatario
  is_persona: false,
  is_perfil: false,
  is_lider: false,
  set_is_persona: () => {},
  set_is_perfil: () => {},
  set_is_lider: () => {},

  mode: '',
  set_mode: () => {},
  // * selected

  selectedValueFromSelect: {
    label: '',
    value: '',
  },
  setSelectValueFromSelect: () => {},

  alertas_selected: [],
  set_alertas_selected: () => {},
  perfiles_selected: [],
  set_perfiles_selected: () => {},

  // * info
  alertas: {
    cod_clase_alerta: '',
    nombre_clase_alerta: '',
    descripcion_clase_alerta: '',
    cod_tipo_clase_alerta: '',
    cod_categoria_clase_alerta: '',
    cant_dias_previas: null,
    frecuencia_previas: null,
    cant_dias_post: null,
    frecuencia_post: null,
    envios_email: false,
    mensaje_base_dia: '',
    mensaje_base_previo: null,
    mensaje_base_vencido: null,
    nivel_prioridad: '',
    activa: false,
    asignar_responsable: false,
    id_modulo_destino: 0,
    id_modulo_generador: 0,
  },
  set_alertas: () => {},
  // * rows
  rows_personas_alertas: [],
  set_rows_personas_alertas: () => {},
  rows_alerta_programada: [],
  set_rows_alerta_programada: () => {},
  // * fetch
  fetch_seleced_alerta: async () => {},
  fetch_data_alerta_cod: async (cod_clase_alerta: string) => {},
  fetch_data_perfiles: async () => {},
  fetch_data_personas: async (cod_clase_alerta: string) => {},
  fetch_data_alerta_programada: async (cod_clase_alerta: string) => {},
});

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): any => {
  // * estados destinatario
  const [is_persona, set_is_persona] = React.useState<boolean>(false);
  const [is_perfil, set_is_perfil] = React.useState<boolean>(false);
  const [is_lider, set_is_lider] = React.useState<boolean>(false);
  const [mode, set_mode] = React.useState('');

  if (mode === 'persona') {
    set_mode('');
    set_is_persona(true);
    set_is_perfil(false);
    set_is_lider(false);
  } else if (mode === 'perfil') {
    set_mode('');
    set_is_persona(false);
    set_is_perfil(true);
    set_is_lider(false);
  } else if (mode === 'lider') {
    set_mode('');
    set_is_persona(false);
    set_is_perfil(false);
    set_is_lider(true);
  }

  const [selectedValueFromSelect, setSelectValueFromSelect] =
    React.useState<{
      label: string;
      value: string;
    }>({
      label: '',
      value: '',
    });

  // * selected
  const [alertas_selected, set_alertas_selected] = React.useState<ValueProps[]>(
    []
  );

  const [perfiles_selected, set_perfiles_selected] = React.useState<
    ValueProps[]
  >([]);

  // * info
  const [alertas, set_alertas] = React.useState<ConfiguracionAlerta>();

  // * rows
  const [rows_personas_alertas, set_rows_personas_alertas] = React.useState<
    DataAlertaPersona[]
  >([]);
  const [rows_alerta_programada, set_rows_alerta_programada] = React.useState<
    AlertaProgramada[]
  >([]);

  const fetch_seleced_alerta = async (): Promise<any> => {
    try {
      const response = await get_alerta();
      if (response?.length > 0) {
        const data_pozo: ValueProps[] = response.map((item: IAlerta) => ({
          value: item.cod_clase_alerta,
          label: item.nombre_clase_alerta,
        }));
        set_alertas_selected(data_pozo);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };
  const fetch_data_alerta_cod = async (
    cod_clase_alerta: string
  ): Promise<any> => {
    try {
      const response = await get_alerta_cod(cod_clase_alerta);
      if (response) {
        set_alertas(response);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

  const fetch_data_perfiles = async (): Promise<any> => {
    try {
      const response = await perfiles_sistema();
      if (response) {
        set_perfiles_selected(response);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

  const fetch_data_personas = async (
    cod_clase_alerta: string
  ): Promise<any> => {
    try {
      const response = await personas_alertas(cod_clase_alerta);
      if (response) {
        set_rows_personas_alertas(response);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

  const fetch_data_alerta_programada = async (
    cod_clase_alerta: string
  ): Promise<any> => {
    try {
      const response = await get_alerta_programada(cod_clase_alerta);
      if (response) {
        set_rows_alerta_programada(response);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

  const value = {
    // * estados destinatario
    is_persona,
    is_perfil,
    is_lider,
    set_is_persona,
    set_is_perfil,
    set_is_lider,

    mode,
    set_mode,

    setSelectValueFromSelect,
    selectedValueFromSelect,

    // * selected
    alertas_selected,
    set_alertas_selected,
    perfiles_selected,
    set_perfiles_selected,
    // * info
    alertas,
    set_alertas,
    // * rows
    rows_personas_alertas,
    set_rows_personas_alertas,
    rows_alerta_programada,
    set_rows_alerta_programada,
    // * fetch
    fetch_seleced_alerta,
    fetch_data_alerta_cod,
    fetch_data_perfiles,
    fetch_data_personas,
    fetch_data_alerta_programada,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
