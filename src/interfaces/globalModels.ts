import type { SelectChangeEvent } from '@mui/material';
import type {
  FieldErrors,
  FieldValues,
  UseFormRegister
} from 'react-hook-form';

export interface ResponseThunks<T = any | null> {
  ok: boolean;
  data?: T;
  error_message?: string;
  is_blocked?: boolean;
}

export interface ResponseServer<T> {
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
  label: string;
  value: string;
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
  value: string;
  loading: boolean;
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<any>;
  onChange: (e: SelectChangeEvent<string>) => void;
}

export interface Direccion {
  via_principal: string;
  numero_o_nombre_via: string;
  letras_via_principal: string;
  prefijo_bis: string;
  letra_prefijo: string;
  cuadrante: string;
  via_secundaria: string;
  numero_o_nombre_via_secundaria: string;
  letras_via_secundaria: string;
  sufijo_bis: string;
  letra_sufijo: string;
  cuadrante_secundaria: string;
  barrio: string;
  nombre: string;
  ubicacion: string;
  direccion_estandarizada: string;
}

export interface Persona {
  id_persona?: number | string;
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
  | 'via_principal'
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
  | 'ubicacion';

export interface InfoPersona {
  id: number;
  id_persona: number;
  tipo_persona: string;
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
  cod_naturaleza_empresa: string;
}

export interface BusquedaAvanzada {
  tipo_documento: string;
  numero_documento: string;
  primer_nombre?: string;
  primer_apellido?: string;
  razon_social?: string;
  nombre_comercial?: string;
}
export interface HistoricoDatosRestringidos {
  id: number,
  historico_cambio_id_persona: number;
  nombre_campo_cambiado: string;
  valor_campo_cambiado: string;
  ruta_archivo_soporte: string | File;
  fecha_cambio: FormData;
  justificacion_cambio: string;
  id_persona: number;
}
export interface DataPersonas {
  id_persona:                               number;
  nombre_unidad_organizacional_actual:      null;
  tiene_usuario:                            boolean;
  primer_nombre:                            string;
  segundo_nombre:                           string;
  primer_apellido:                          string;
  segundo_apellido:                         string;
  tipo_persona:                             string;
  numero_documento:                         string;
  digito_verificacion:                      null;
  nombre_comercial:                         string;
  razon_social:                             null;
  pais_residencia:                          string;
  municipio_residencia:                     null;
  direccion_residencia:                     null;
  direccion_residencia_ref:                 null;
  ubicacion_georeferenciada:                string;
  direccion_laboral:                        null;
  direccion_notificaciones:                 null;
  pais_nacimiento:                          string;
  fecha_nacimiento:                         Date;
  sexo:                                     string;
  fecha_asignacion_unidad:                  null;
  es_unidad_organizacional_actual:          null;
  email:                                    string;
  email_empresarial:                        null;
  telefono_fijo_residencial:                null;
  telefono_celular:                         string;
  telefono_empresa:                         null;
  cod_municipio_laboral_nal:                null;
  cod_municipio_notificacion_nal:           null;
  telefono_celular_empresa:                 null;
  telefono_empresa_2:                       null;
  cod_pais_nacionalidad_empresa:            null;
  acepta_notificacion_sms:                  boolean;
  acepta_notificacion_email:                boolean;
  acepta_tratamiento_datos:                 boolean;
  cod_naturaleza_empresa:                   null;
  direccion_notificacion_referencia:        null;
  fecha_cambio_representante_legal:         Date;
  fecha_inicio_cargo_rep_legal:             null;
  fecha_inicio_cargo_actual:                Date;
  fecha_a_finalizar_cargo_actual:           null;
  observaciones_vinculacion_cargo_actual:   null;
  fecha_ultim_actualizacion_autorizaciones: Date;
  fecha_creacion:                           Date;
  fecha_ultim_actualiz_diferente_crea:      Date;
  tipo_documento:                           string;
  estado_civil:                             null;
  id_cargo:                                 null;
  id_unidad_organizacional_actual:          null;
  representante_legal:                      null;
  cod_municipio_expedicion_id:              null;
  id_persona_crea:                          null;
  id_persona_ultim_actualiz_diferente_crea: null;
}
