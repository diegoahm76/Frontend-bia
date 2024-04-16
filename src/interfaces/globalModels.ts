import type { SelectChangeEvent } from '@mui/material';
import { type Dayjs } from 'dayjs';
import { type SetStateAction, type Dispatch } from 'react';
import type {
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';

export interface ResponseThunks<T = any | null> {
  ok: boolean;
  data?: T;
  error_message?: string;
  is_blocked?: boolean;
}

export interface ResponseServer<T> {
  profile_img: any;
  success: boolean;
  detail: string;
  data: T;
}

export interface Paises {
  nombre: string;
  cod_pais: string;
}

export interface TipoDocumento {
  cod_tipo_documento: string;
  nombre: string;
}

export interface TipoPersona {
  cod_tipo_persona: string;
  tipo_persona: string;
}

export interface IList {
  label: string | number;
  value: string | number;
}
export interface Departamentos {
  cod_departamento: string;
  nombre: string;
  pais: string;
}
export interface Municipios {
  cod_municipio: string;
  nombre: string;
  cod_departamento: string;
}

export interface PropsSelect {
  options: IList[];
  label: string;
  name: string;
  disabled?: boolean;
  value?: string;
  required?: boolean;
  multiple?: boolean;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<any>;
  onChange?: (e: SelectChangeEvent<string>) => void;
}

export interface PropsRegister {
  numero_documento: string;
  tipo_documento: string;
  tipo_persona: string;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: FieldErrors<FieldValues>;
  isValid: boolean;
  watch: UseFormWatch<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}
export interface PropsRegisterAdministrador {
  numero_documento: string;
  tipo_documento: string;
  tipo_persona: string;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: FieldErrors<FieldValues>;
  isValid: boolean;
  watch: UseFormWatch<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  reset: UseFormReset<FieldValues>;

}

export interface PropsRegisterAdmin {
  id_persona: number;
  representante_legal?: number | null | undefined;
  data: DataPersonas;
  numero_documento: string;
  tipo_documento: string;
  tipo_persona: string;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: FieldErrors<FieldValues>;
  isValid: boolean;
  watch: UseFormWatch<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  reset: UseFormReset<FieldValues>;

}
export interface PropsUpdateJ {
  data: DataPersonas;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: FieldErrors<FieldValues>;
  isValid: boolean;
  watch: UseFormWatch<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

export interface Direccion {
  Cordenada:string;
  numero_o_nombre_via: string;
  letras_via_principal: string;
  prefijo_bis: string;
  letra_prefijo: string;
  cuadrante: string;
  via_secundaria: string;
  numero_o_nombre_via_secundaria: string;
  numero_referencia:string;
  letras_via_secundaria: string;
  sufijo_bis: string;
  letra_sufijo: string;
  cuadrante_secundaria: string;
  Informacion_Adicional:string;
  coordenada_x:string;
  coordenada_y: string;
  barrio: string;
  nombre: string;
  ubicacion: string;
  direccion_estandarizada: string;
  via_principal: string;
}

export interface Persona {
  id_persona: number | null;
  tipo_persona?: string | null;
  tipo_documento?: string | null;
  numero_documento?: string | null;
  primer_nombre?: string | null;
  segundo_nombre?: string | null;
  primer_apellido?: string;
  segundo_apellido?: string | null;
  nombre_completo?: string | null;
  razon_social?: string | null;
  nombre_comercial?: string | null;
  tiene_usuario?: boolean | null;
}

export type keys_direccion =
  | 'numero_referencia'
  | 'numero_o_nombre_via'
  | 'letras_via_principal'
  | 'prefijo_bis'
  | 'letra_prefijo'
  | 'cuadrante'
  | 'via_secundaria'
  | 'numero_o_nombre_via_secundaria'
  | 'letras_via_secundaria'
  | 'sufijo_bis'
  | 'letra_sufijo'
  | 'cuadrante_secundaria'
  | 'barrio'
  | 'nombre'
  | 'direccion_estandarizada'
  | 'ubicacion'
  | 'Informacion_Adicional'
  | 'via_principal';

export interface InfoPersona {
  id: number;
  id_persona: number;
  tipo_persona?: string;
  tipo_documento: string;
  numero_documento: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  nombre_completo: string;
  razon_social: string;
  nombre_comercial: string;
  tiene_usuario: boolean;
  digito_verificacion: string;
  tipo_usuario: string;
  cod_naturaleza_empresa: string;
}

export type KeysInfoPersona =
  | 'id'
  | 'id_persona'
  | 'tipo_persona'
  | 'tipo_documento'
  | 'numero_documento'
  | 'primer_nombre'
  | 'segundo_nombre'
  | 'primer_apellido'
  | 'segundo_apellido'
  | 'nombre_completo'
  | 'razon_social'
  | 'nombre_comercial'
  | 'tiene_usuario';

export interface BusquedaAvanzada {
  tipo_documento: string;
  numero_documento: string;
  primer_nombre?: string;
  primer_apellido?: string;
  razon_social?: string;
  nombre_comercial?: string;
}
export interface CompleteInfoPersona {
  profile_img: any;
  acepta_notificacion_email: boolean;
  acepta_notificacion_sms: boolean;
  acepta_tratamiento_datos: boolean;
  cod_municipio_expedicion_id: null;
  cod_municipio_laboral_nal: null;
  cod_municipio_notificacion_nal: null;
  cod_naturaleza_empresa: null;
  cod_pais_nacionalidad_empresa: null;
  digito_verificacion: string;
  direccion_laboral: string;
  direccion_notificacion_referencia: null;
  direccion_notificaciones: string;
  direccion_residencia_ref: string;
  direccion_residencia: string;
  email_empresarial: null;
  email: string;
  es_unidad_organizacional_actual: null;
  estado_civil: string;
  fecha_a_finalizar_cargo_actual: null;
  fecha_asignacion_unidad: string;
  fecha_cambio_representante_legal: string;
  fecha_creacion: string;
  fecha_inicio_cargo_actual: string;
  fecha_inicio_cargo_rep_legal: null;
  fecha_nacimiento: string;
  fecha_ultim_actualiz_diferente_crea: string;
  fecha_ultim_actualizacion_autorizaciones: string;
  id_cargo: null;
  id_persona_crea: null;
  id_persona_ultim_actualiz_diferente_crea: null;
  id_persona: number;
  id_unidad_organizacional_actual: null;
  municipio_residencia: string;
  nombre_comercial: string;
  nombre_unidad_organizacional_actual: null;
  numero_documento: string;
  observaciones_vinculacion_cargo_actual: null;
  pais_nacimiento: string;
  pais_residencia: string;
  primer_apellido: string;
  primer_nombre: string;
  razon_social: null;
  representante_legal: null;
  segundo_apellido: null;
  segundo_nombre: null;
  sexo: string;
  telefono_celular_empresa: null;
  telefono_celular: string;
  telefono_empresa_2: null;
  telefono_empresa: null;
  telefono_fijo_residencial: null;
  tiene_usuario: boolean;
  tipo_documento: string;
  tipo_persona: string;
  ubicacion_georeferenciada: string;
}

export interface HistoricoDatosRestringidos {
  id: number;
  historico_cambio_id_persona: number;
  nombre_campo_cambiado: string;
  valor_campo_cambiado: string;
  ruta_archivo_soporte: string | File;
  fecha_cambio: FormData;
  justificacion_cambio: string;
  id_persona: number;
}
export type keys_object =
  | 'id_persona'
  | 'nombre_unidad_organizacional_actual'
  | 'tiene_usuario'
  | 'primer_nombre'
  | 'segundo_nombre'
  | 'primer_apellido'
  | 'segundo_apellido'
  | 'tipo_persona'
  | 'numero_documento'
  | 'digito_verificacion'
  | 'nombre_comercial'
  | 'razon_social'
  | 'pais_residencia'
  | 'municipio_residencia'
  | 'direccion_residencia'
  | 'direccion_residencia_ref'
  | 'ubicacion_georeferenciada'
  | 'direccion_laboral'
  | 'direccion_notificaciones'
  | 'pais_nacimiento'
  | 'fecha_nacimiento'
  | 'sexo'
  | 'fecha_asignacion_unidad'
  | 'es_unidad_organizacional_actual'
  | 'email'
  | 'email_empresarial'
  | 'telefono_fijo_residencial'
  | 'telefono_celular'
  | 'telefono_empresa'
  | 'cod_municipio_laboral_nal'
  | 'cod_municipio_notificacion_nal'
  | 'telefono_celular_empresa'
  | 'telefono_empresa_2'
  | 'cod_pais_nacionalidad_empresa'
  | 'acepta_notificacion_sms'
  | 'acepta_notificacion_email'
  | 'acepta_tratamiento_datos'
  | 'cod_naturaleza_empresa'
  | 'direccion_notificacion_referencia'
  | 'fecha_cambio_representante_legal'
  | 'fecha_inicio_cargo_rep_legal'
  | 'fecha_inicio_cargo_actual'
  | 'fecha_a_finalizar_cargo_actual'
  | 'observaciones_vinculacion_cargo_actual'
  | 'fecha_ultim_actualizacion_autorizaciones'
  | 'fecha_creacion'
  | 'fecha_ultim_actualiz_diferente_crea'
  | 'tipo_documento'
  | 'estado_civil'
  | 'id_cargo'
  | 'id_unidad_organizacional_actual'
  | 'representante_legal'
  | 'cod_municipio_expedicion_id'
  | 'id_persona_crea'
  | 'id_persona_ultim_actualiz_diferente_crea'
  | 'cod_departamento_expedicion'
  | 'cod_departamento_residencia'
  | 'cod_departamento_notificacion'
  | 'cod_departamento_laboral';

export type key_data_persona =
  | 'id_persona'
  | 'nombre_unidad_organizacional_actual'
  | 'tiene_usuario'
  | 'primer_nombre'
  | 'segundo_nombre'
  | 'primer_apellido'
  | 'segundo_apellido'
  | 'tipo_persona'
  | 'numero_documento'
  | 'digito_verificacion'
  | 'nombre_comercial'
  | 'razon_social'
  | 'pais_residencia'
  | 'municipio_residencia'
  | 'direccion_residencia'
  | 'direccion_residencia_ref'
  | 'ubicacion_georeferenciada'
  | 'direccion_laboral'
  | 'direccion_notificaciones'
  | 'pais_nacimiento'
  | 'fecha_nacimiento'
  | 'sexo'
  | 'fecha_asignacion_unidad'
  | 'es_unidad_organizacional_actual'
  | 'email'
  | 'email_empresarial'
  | 'telefono_fijo_residencial'
  | 'telefono_celular'
  | 'telefono_empresa'
  | 'cod_municipio_laboral_nal'
  | 'cod_municipio_notificacion_nal'
  | 'telefono_celular_empresa'
  | 'telefono_empresa_2'
  | 'cod_pais_nacionalidad_empresa'
  | 'acepta_notificacion_sms'
  | 'acepta_notificacion_email'
  | 'acepta_tratamiento_datos'
  | 'cod_naturaleza_empresa'
  | 'direccion_notificacion_referencia'
  | 'fecha_cambio_representante_legal'
  | 'fecha_inicio_cargo_rep_legal'
  | 'fecha_inicio_cargo_actual'
  | 'fecha_a_finalizar_cargo_actual'
  | 'observaciones_vinculacion_cargo_actual'
  | 'fecha_ultim_actualizacion_autorizaciones'
  | 'fecha_creacion'
  | 'fecha_ultim_actualiz_diferente_crea'
  | 'tipo_documento'
  | 'estado_civil'
  | 'id_cargo'
  | 'id_unidad_organizacional_actual'
  | 'representante_legal'
  | 'cod_municipio_expedicion_id'
  | 'id_persona_crea'
  | 'id_persona_ultim_actualiz_diferente_crea'
  | 'cod_departamento_expedicion'
  | 'cod_departamento_residencia'
  | 'cod_departamento_notificacion'
  | 'cod_departamento_laboral'
  | 'datos_clasificacion_persona';

export interface DataPersonas {
  id_persona: number;
  nombre_unidad_organizacional_actual: string;
  tiene_usuario: boolean;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  tipo_persona: string;
  numero_documento: string;
  digito_verificacion: string;
  nombre_comercial: string;
  razon_social: string;
  pais_residencia: string;
  municipio_residencia: string;
  direccion_residencia: string;
  direccion_residencia_ref: string;
  ubicacion_georeferenciada: string;
  direccion_laboral: string;
  direccion_notificaciones: string;
  pais_nacimiento: string;
  fecha_nacimiento: string | null | Date;
  sexo: string;
  fecha_asignacion_unidad: string;
  es_unidad_organizacional_actual: string;
  email: string;
  email_empresarial: string;
  telefono_fijo_residencial: string;
  telefono_celular: string;
  telefono_empresa: string;
  cod_municipio_laboral_nal: string;
  cod_municipio_notificacion_nal: string;
  telefono_celular_empresa: string;
  telefono_empresa_2: string;
  cod_pais_nacionalidad_empresa: string;
  acepta_notificacion_sms: boolean;
  acepta_notificacion_email: boolean;
  acepta_tratamiento_datos: boolean;
  cod_naturaleza_empresa: string;
  direccion_notificacion_referencia: string;
  fecha_cambio_representante_legal: string;
  fecha_inicio_cargo_rep_legal: string;
  fecha_inicio_cargo_actual: string;
  fecha_a_finalizar_cargo_actual: string;
  observaciones_vinculacion_cargo_actual: string;
  fecha_ultim_actualizacion_autorizaciones: string;
  fecha_creacion: string;
  fecha_ultim_actualiz_diferente_crea: string;
  tipo_documento: string;
  estado_civil: string;
  id_cargo: number;
  id_unidad_organizacional_actual: number;
  representante_legal: number | null;
  cod_municipio_expedicion_id: string;
  id_persona_crea: number;
  id_persona_ultim_actualiz_diferente_crea: number;
  cod_departamento_expedicion: string;
  cod_departamento_residencia: string;
  cod_departamento_notificacion: string;
  cod_departamento_laboral: string;
  datos_clasificacion_persona?: number[];
}
export interface ClaseTercero {
  value: number;
  label: string;
}
export interface ClaseTerceroPersona {
  id_clase_tercero: number;
  nombre: string;
}
export interface UpdateAutorizaNotificacion {
  acepta_autorizacion_email: boolean | undefined;
  acepta_autorizacion_sms: boolean | undefined;
}
export interface UpdateAutorizaNotificacionPropia {
  acepta_notificacion_email: boolean | undefined;
  acepta_notificacion_sms: boolean | undefined;
}

export interface DatosVinculacionCormacarena {
  id_unidad_organizacional_actual: number;
  id_cargo: number;
  cargo_actual: string;
  unidad_organizacional_actual: string;
  es_unidad_organizacional_actual: boolean;
  fecha_inicio_cargo_actual: string;
  fecha_asignacion_unidad: string;
  fecha_a_finalizar_cargo_actual: string;
  observaciones_vinculacion_cargo_actual: string;
  fecha_vencida: boolean;
}
export interface DataNaturaUpdate {
  cod_municipio_expedicion_id: string;
  nombre_comercial: string;
  fecha_nacimiento: string;
  email: string;
  telefono_celular: string;
  telefono_empresa_2: string;
  sexo: string;
  estado_civil: string;
  pais_nacimiento: string;
  email_empresarial: string;
  ubicacion_georeferenciada: string;
  telefono_fijo_residencial: string;
  pais_residencia: string;
  municipio_residencia: string;
  direccion_residencia: string;
  direccion_laboral: string;
  direccion_residencia_ref: string;
  direccion_notificaciones: string;
  direccion_notificacion_referencia: string;
  cod_municipio_laboral_nal: string;
  cod_municipio_notificacion_nal: string;
  datos_clasificacion_persona: number[];
}
export interface DataJuridicaUpdate {
  email: string;
  email_empresarial: string;
  direccion_notificaciones: string;
  direccion_notificacion_referencia: string;
  cod_municipio_notificacion_nal: string;
  cod_pais_nacionalidad_empresa: string;
  telefono_celular_empresa: string;
  telefono_empresa_2: string;
  telefono_empresa: string;
  representante_legal: number;
  fecha_inicio_cargo_rep_legal: string;
  datos_clasificacion_persona: number[];
}
export interface ReisterHookUpdate {
  ciudad_expedicion: string;
  ciudad_notificacion_opt: IList[];
  ciudad_notificacion: string;
  ciudad_residencia: string;
  ciudades_opt: IList[];
  ciudades_residencia_opt: IList[];
  data_register: DataPersonas;
  cod_departamento_expedicion: string;
  cod_departamento_residencia: string;
  departamentos_opt: IList[];
  documento_rep: string;
  dpto_notifiacion_opt: IList[];
  dpto_notifiacion: string;
  dpts_residencia_opt: IList[];
  error_email: boolean;
  error_password: boolean;
  error_phone: boolean;
  errors: FieldErrors<FieldValues>;
  estado_civil_opt: IList[];
  estado_civil: string;
  fecha_nacimiento: Dayjs | null;
  fecha_rep_legal: Dayjs | null;
  genero_opt: IList[];
  genero: string;
  is_avaiable: boolean;
  is_exists: boolean;
  is_error: boolean;
  is_saving: boolean;
  is_search: boolean;
  is_valid: boolean;
  loading: boolean;
  message_error_password: string;
  message_no_person: string;
  message_error: string;
  nacionalidad_emp: string;
  naturaleza_emp_opt: IList[];
  naturaleza_emp: string;
  nombre_representante: string;
  numero_documento: string;
  pais_nacimiento: string;
  pais_residencia: string;
  paises_options: IList[];
  show_password: boolean;
  tipo_documento_opt: IList[];
  tipo_documento_rep: string;
  tipo_documento: string;
  tipo_persona_opt: IList[];
  tipo_persona: string;
  get_selects_options: () => Promise<void>;
  handle_click_show_password: () => void;
  handle_submit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  set_ciudad_expedicion: Dispatch<SetStateAction<string>>;
  set_ciudad_notificacion_opt: Dispatch<SetStateAction<IList[]>>;
  set_ciudad_notificacion: Dispatch<SetStateAction<string>>;
  set_ciudad_residencia: Dispatch<SetStateAction<string>>;
  set_ciudades_opt: Dispatch<SetStateAction<IList[]>>;
  set_ciudades_residencia_opt: Dispatch<SetStateAction<IList[]>>;
  set_data_register: Dispatch<SetStateAction<DataPersonas>>;
  set_departamento: Dispatch<SetStateAction<string>>;
  set_departamentos_opt: Dispatch<SetStateAction<IList[]>>;
  set_documento_rep: Dispatch<SetStateAction<string>>;
  set_dpto_notifiacion_opt: Dispatch<SetStateAction<IList[]>>;
  set_dpto_notifiacion: Dispatch<SetStateAction<string>>;
  set_dpto_residencia_opt: Dispatch<SetStateAction<IList[]>>;
  set_dpto_residencia: Dispatch<SetStateAction<string>>;
  set_error_email: Dispatch<SetStateAction<boolean>>;
  set_error_error_phone: Dispatch<SetStateAction<boolean>>;
  set_error_password: Dispatch<SetStateAction<boolean>>;
  set_estado_civil_opt: Dispatch<SetStateAction<IList[]>>;
  set_estado_civil: Dispatch<SetStateAction<string>>;
  set_fecha_nacimiento: Dispatch<SetStateAction<Dayjs | null>>;
  set_fecha_rep_legal: Dispatch<SetStateAction<Dayjs | null>>;
  set_genero_opt: Dispatch<SetStateAction<IList[]>>;
  set_genero: Dispatch<SetStateAction<string>>;
  set_is_exists: Dispatch<SetStateAction<boolean>>;
  set_is_saving: Dispatch<SetStateAction<boolean>>;
  set_is_search: Dispatch<SetStateAction<boolean>>;
  set_message_error_password: Dispatch<SetStateAction<string>>;
  set_message_no_person: Dispatch<SetStateAction<string>>;
  set_nacionalidad_emp: Dispatch<SetStateAction<string>>;
  set_naturaleza_emp: Dispatch<SetStateAction<string>>;
  set_nombre_representante: Dispatch<SetStateAction<string>>;
  set_numero_documento: Dispatch<SetStateAction<string>>;
  set_pais_nacimiento: Dispatch<SetStateAction<string>>;
  set_pais_residencia: Dispatch<SetStateAction<string>>;
  set_show_password: Dispatch<SetStateAction<boolean>>;
  set_tipo_documento_rep: Dispatch<SetStateAction<string>>;
  set_tipo_documento: Dispatch<SetStateAction<string>>;
  set_tipo_persona: Dispatch<SetStateAction<string>>;
  set_value: UseFormSetValue<FieldValues>;
  validate_exits: (numero_documento: string) => Promise<void>;
  watch: UseFormWatch<FieldValues>;
}
export interface HistoricoDirecciones {
  id_historico_direccion: number;
  direccion: string;
  cod_municipio: null | string;
  cod_pais_exterior: null;
  tipo_direccion: string;
  fecha_cambio: Date;
  id_persona: number;
  nombre_completo: string;
}
export interface HistoricoEmail {
  id_histo_email: number;
  email_notificacion: string;
  fecha_cambio: Date;
  id_persona: number;
  nombre_completo: string;
}
export interface HistoricoRepresentanteLegal {
  id_historico_represent_legal: number;
  consec_representacion: number;
  fecha_cambio_sistema: string;
  fecha_inicio_cargo: string;
  id_persona_empresa: number;
  nombre_comercial: string;
  razon_social: string;
  id_persona_represent_legal: number;
  nombre_completo_replegal: string;
}
export interface HistoricoAutorizaNotificaciones {
  id_historico_autoriza_noti: number;
  nombre_completo: string;
  respuesta_autorizacion_sms: boolean;
  respuesta_autorizacion_mail: boolean;
  fecha_inicio: string;
  fecha_fin: string;
  id_persona: number;
}
export interface CrearPersonNaturalAdmin {
  tipo_persona: string;
  tipo_documento: string;
  numero_documento: string;
  cod_municipio_expedicion_id: string;
  digito_verificacion: string;
  nombre_comercial: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  fecha_nacimiento: Date | string;
  email: string;
  telefono_celular: string;
  telefono_empresa_2: null | string;
  sexo: string;
  estado_civil: string;
  pais_nacimiento: string;
  email_empresarial: string;
  ubicacion_georeferenciada: string;
  telefono_fijo_residencial: null | string;
  pais_residencia: string;
  municipio_residencia: string;
  direccion_residencia: string;
  direccion_laboral: string;
  direccion_residencia_ref: string;
  direccion_notificaciones: string;
  direccion_notificacion_referencia: string;
  cod_municipio_laboral_nal: string;
  cod_municipio_notificacion_nal: string;
  acepta_notificacion_sms: boolean;
  acepta_notificacion_email: boolean;
  acepta_tratamiento_datos: boolean;
  datos_clasificacion_persona: number[];
}
export interface CrearPersonJuridicaAdmin {
  tipo_persona: string;
  tipo_documento: string;
  numero_documento: string;
  digito_verificacion: string;
  cod_naturaleza_empresa: string;
  nombre_comercial: string;
  razon_social: string;
  email: string;
  email_empresarial: null;
  direccion_notificaciones: string;
  direccion_notificacion_referencia: string;
  cod_municipio_notificacion_nal: number;
  cod_pais_nacionalidad_empresa: string;
  telefono_celular_empresa: string;
  telefono_empresa_2: string;
  telefono_empresa: string;
  acepta_notificacion_sms: boolean;
  acepta_notificacion_email: boolean;
  representante_legal: number;
  fecha_inicio_cargo_rep_legal: Date;
  datos_clasificacion_persona: number[];
}
