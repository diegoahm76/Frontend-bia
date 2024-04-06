/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState } from 'react';

interface RespuestaPQRS {
  id_PQRSDF: number;
  cod_tipo_PQRSDF: string;
  id_persona_titular: number;
  id_persona_interpone: number;
  cod_relacion_con_el_titular: string;
  es_anonima: boolean;
  fecha_registro: string;
  tipo_pqrsdf_descripcion:string;
  id_medio_solicitud: number;
  cod_forma_presentacion: string;
  asunto: string;
  descripcion: string;
  cantidad_anexos: number;
  nro_folios_totales: number;
  requiere_rta: boolean;
  dias_para_respuesta: number | null;
  id_sucursal_especifica_implicada: number;
  id_persona_recibe: number | null;
  id_sucursal_recepcion_fisica: number | null;
  id_radicado: number | null;
  fecha_radicado: string | null;
  requiere_digitalizacion: boolean;
  fecha_envio_definitivo_a_digitalizacion: string | null;
  fecha_digitalizacion_completada: string | null;
  fecha_rta_final_gestion: string | null;
  id_persona_rta_final_gestion: number | null;
  id_estado_actual_solicitud: number;
  fecha_ini_estado_actual: string;
  id_doc_dearch_exp: number | null;
  id_expediente_doc: number | null;
  denuncia?: {
    id_info_denuncia_PQRSDF: number;
    Cod_zona_localizacion: string;
    barrio_vereda_localizacion: string;
    direccion_localizacion: string;
    cod_recursos_fectados_presuntos: string;
    otro_recurso_Afectado_cual: string | null;
    evidencias_soportan_hecho: string;
    nombre_completo_presunto_infractor: string;
    telefono_presunto_infractor: string;
    direccion_presunto_infractor: string;
    ya_habia_puesto_en_conocimiento: boolean;
    ante_que_autoridad_había_interpuesto: string;
    id_PQRSDF: number;
    cod_municipio_cocalizacion_hecho: string;
  };
  anexos: Anexo[]; // Puedes ajustar el tipo de los anexos según su estructura real
}

interface Anexo {
  id_anexo: number;

  nombre_anexo: string;
  orden_anexo_doc: number;
  cod_medio_almacenamiento: string;
  nombre_medio_almacenamiento: string;
  medio_almacenamiento_otros_Cual: string | null;
  numero_folios: number;
  ya_digitalizado: boolean;
  observacion_digitalizacion: string | null;
  metadatos: {
    id_metadatos_anexo_tmp: number;
    id_anexo: number;
    fecha_creacion_doc: string;
    asunto: string | null;
    descripcion: string | null;
    cod_categoria_archivo: string | null;
    es_version_original: boolean;
    tiene_replica_fisica: boolean | null;
    nro_folios_documento: number | null;
    cod_origen_archivo: string;
    id_tipologia_doc: number | null;
    tipologia_no_creada_TRD: string | null;
    palabras_clave_doc: string | null;
    id_archivo_sistema: number;
    archivo: {
      id_archivo_digital: number;
      nombre_de_Guardado: string;
      formato: string;
      tamagno_kb: number;
      ruta_archivo: string;
      fecha_creacion_doc: string;
      es_Doc_elec_archivo: boolean;
    };
  };
}
const valoresIniciales: RespuestaPQRS = {
  id_PQRSDF: 0,
  cod_tipo_PQRSDF: "",
  tipo_pqrsdf_descripcion:"",
  id_persona_titular: 0,
  id_persona_interpone: 0,
  cod_relacion_con_el_titular: "",
  es_anonima: false,
  fecha_registro: "",
  id_medio_solicitud: 0,
  cod_forma_presentacion: "",
  asunto: "",
  descripcion: "",
  cantidad_anexos: 0,
  nro_folios_totales: 0,
  requiere_rta: false,
  dias_para_respuesta: null,
  id_sucursal_especifica_implicada: 0,
  id_persona_recibe: null,
  id_sucursal_recepcion_fisica: null,
  id_radicado: null,
  fecha_radicado: null,
  requiere_digitalizacion: false,
  fecha_envio_definitivo_a_digitalizacion: null,
  fecha_digitalizacion_completada: null,
  fecha_rta_final_gestion: null,
  id_persona_rta_final_gestion: null,
  id_estado_actual_solicitud: 0,
  fecha_ini_estado_actual: "",
  id_doc_dearch_exp: null,
  id_expediente_doc: null,
  denuncia: {
    id_info_denuncia_PQRSDF: 0,
    Cod_zona_localizacion: "",
    barrio_vereda_localizacion: "",
    direccion_localizacion: "",
    cod_recursos_fectados_presuntos: "",
    otro_recurso_Afectado_cual: null,
    evidencias_soportan_hecho: "",
    nombre_completo_presunto_infractor: "",
    telefono_presunto_infractor: "",
    direccion_presunto_infractor: "",
    ya_habia_puesto_en_conocimiento: false,
    ante_que_autoridad_había_interpuesto: "",
    id_PQRSDF: 0,
    cod_municipio_cocalizacion_hecho: "",
  },
  anexos: [],
};



export const ResSolicitudUsuarioContext = createContext<any>({
  infoInicialUsuario: {},
  setInfoInicialUsuario: () => {},
  respuestaPqrs: {},
  setRespuestaPqrs: () => {},
});


export const ResSolicitudUsuarioProvider = ({ children }: any): JSX.Element => {


  const [infoInicialUsuario, setInfoInicialUsuario] =useState<any>([]);

    const [respuestaPqrs, setRespuestaPqrs] = useState<RespuestaPQRS>(valoresIniciales);
    const [respuestaPqrsdfMade, setrespuestaPqrsdfMade] = useState<RespuestaPQRS | null>(null);

console.log('stivencontext', respuestaPqrs)
console.log('Anexos de respuestaPqrsdfMade:', respuestaPqrsdfMade?.anexos);

  const value = {
    infoInicialUsuario,
    setInfoInicialUsuario,
    respuestaPqrs,
    setRespuestaPqrs,
    respuestaPqrsdfMade,
    setrespuestaPqrsdfMade
  };

  return (
    <ResSolicitudUsuarioContext.Provider value={value}>
      {children}
    </ResSolicitudUsuarioContext.Provider>
  );
};
