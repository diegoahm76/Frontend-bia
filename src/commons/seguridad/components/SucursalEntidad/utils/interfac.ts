import { SelectChangeEvent } from "@mui/material";

export interface ISucursalEditar {
  email_sucursal: string;
  confirm_email_sucursal: string;
  telefono_sucursal: number;
  descripcion_sucursal: string;
  direccion: string;
  direccion_sucursal_georeferenciada: string;
  direccion_notificacion: string;
  id_sucursal_empresa: number;
  numero_sucursal: number;
  es_principal: boolean;
  activo: boolean;
  municipio: string;
  pais_sucursal_exterior: string;
  municipio_notificacion: string;
  item_ya_usado: boolean;
  id_persona_empresa: number;
}

export interface ISucursalEmpresa {
  id_sucursal_empresa: number;
  numero_sucursal: number;
  descripcion_sucursal: string;
  direccion: string;
  direccion_sucursal_georeferenciada: string | null;
  municipio: string | null;
  pais_sucursal_exterior: string | null;
  direccion_notificacion: string;
  direccion_notificacion_referencia: string | null;
  municipio_notificacion: string | null;
  email_sucursal: string;
  telefono_sucursal: string;
  es_principal: boolean;
  activo: boolean;
  item_ya_usado: boolean;
  id_persona_empresa: number;
}
export interface ISucursalCrear {
  descripcion_sucursal: string;
  direccion: string;
  direccion_sucursal_georeferenciada: string | null;
  municipio: string | null;
  pais_sucursal_exterior: string | null;
  direccion_notificacion: string;
  direccion_notificacion_referencia: string | null;
  municipio_notificacion: string | null;
  email_sucursal: string;
  telefono_sucursal: string;
  es_principal: boolean;
  activo: boolean;
  item_ya_usado: boolean;
  id_persona_empresa: number;
}
export interface ISucursalForm {
  descripcion_sucursal: string;
  direccion: string;
  direccion_sucursal_georeferenciada: string | null;
  municipio: string | null;
  pais_sucursal_exterior: string | null;
  direccion_notificacion: string;
  direccion_notificacion_referencia: string | null;
  municipio_notificacion: string | null;
  email_sucursal: string;
  confirmar_email: string;
  telefono_sucursal: number | null | string;
  es_principal: boolean;
  activo: boolean;
  item_ya_usado: boolean;
  id_persona_empresa: number;
  numero_sucursal: number | null;

}
export interface Municipios {
  label: string;
  value: string;
};

export interface MunicipiosResponse {
  success: boolean;
  detail: string;
  data: Municipios[];
};

export interface Paises {
  label: string;
  value: string;
};

export interface PaisesResponse {
  success: boolean;
  detail: string;
  data: Paises[];
};

export interface Departamento {
  label: string;
  value: string;
};

export interface DepartamentoResponse {
  success: boolean;
  detail: string;
  data: Departamento[];
};
export interface SucursalDireccionesProps {
  form_values: ISucursalForm;
  handleinput_change: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | null>,
      child?: React.ReactNode
  ) => void;

}