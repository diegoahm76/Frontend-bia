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
  email: string;
  telefono: string;
  cod_sexo: string;
  rango_edad: string;
  id_persona: number;
  tipo_persona: string;
  nombre_completo: string;
  nro_documento_id: string;
  id_pais_para_extranjero: string;
  id_tipo_documento_usuario: string;
  id_municipio_para_nacional: string;
};

export interface TipoDocumento {
  nombre: string;
  activo: boolean;
  precargado: boolean;
  item_ya_usado: boolean;
  cod_tipo_documento: string;
};
export interface RangoEdad {
  value: string;
  label: string;
};

export const miEstilo = {
  p: '20px',
  mb: '20px',
  m: '10px 0 20px 0',
  position: 'relative',
  borderRadius: '15px',
  background: '#FAFAFA',
  boxShadow: '0px 3px 6px #042F4A26',
};