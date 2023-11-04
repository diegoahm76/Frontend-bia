/* eslint-disable @typescript-eslint/naming-convention */
export interface Opcion_Genero {
  codigo: string|null;
  descripcion: string|null;
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
export interface Municipios {
  label: string;
  value: string;
};

export interface MunicipiosResponse {
  success: boolean;
  detail: string;
  data: Municipios[];
};
export interface OpcionDocumentoIdentidad {
  codigo: string;
  descripcion: string;
};
export interface EncuestaDetalle {
  success: boolean;
  detail: string;
  data: {
      id_encabezado_encuesta: number;
      nombre_encuesta: string;
      id_persona_ult_config_implement: number;
      preguntas: {
          id_pregunta_encuesta: number;
          id_encabezado_encuesta: number;
          redaccion_pregunta: string;
          opciones_rta: {
              id_opcion_rta: number;
              opcion_rta: string;
              id_pregunta: number;
          }[];
      }[];
  };
};
export interface Sexo {
  value: string;
  label: string;
};
export interface UsuarioRegistrado {
  id_persona: number;
  id_tipo_documento_usuario: string;
  nro_documento_id: string;
  nombre_completo: string;
  cod_sexo: string;
  rango_edad: string;
  tipo_persona: string;
  email: string;
  telefono: string;
  id_pais_para_extranjero: string;
  id_municipio_para_nacional: string;
};

export interface TipoDocumento {
  cod_tipo_documento: string;
  nombre: string;
  precargado: boolean;
  activo: boolean;
  item_ya_usado: boolean;
};
export interface RangoEdad {
  value: string;
  label: string;
};

export const miEstilo = {
  position: 'relative',
  background: '#FAFAFA',
  borderRadius: '15px',
  p: '20px',
  m: '10px 0 20px 0',
  mb: '20px',
  boxShadow: '0px 3px 6px #042F4A26',
};