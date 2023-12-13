// import { type SelectChangeEvent } from "@mui/material";

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
  direccion_sucursal_georeferenciada_lat:any;
  direccion_sucursal_georeferenciada_lon:any;
  
 }


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
export interface Municipios {
  label: string;
  value: string;
};

export interface MunicipiosResponse {
  success: boolean;
  detail: string;
  data: Municipios[];
};

export interface SucursalDireccionesProps {
  form_values: ISucursalForm;
  handleinput_change: (
      event:any ,
      child?: React.ReactNode
  ) => void;
  same_address:any;
  setsame_address:any;
}

export interface Props {
  selected_id: number | null;
  new_number: any;
  esPrincipalExists: any;
  setselected_id:number | null| any ; 
  data_entidad:any ;
  sucursal:any;
  fetchand_update_data: any;
  setnew_number:any;
  fetch_dataget:any;
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
 
export interface IDataentidad {
  id_persona: number;
  numero_documento: string;
  nombre_tipo_documento: string;
  digito_verificacion: string;
  razon_social: string;
}