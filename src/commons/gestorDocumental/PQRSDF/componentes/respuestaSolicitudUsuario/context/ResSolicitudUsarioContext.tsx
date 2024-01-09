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
  denuncia: string | null;
  anexos: any[]; // Puedes ajustar el tipo de los anexos según su estructura real
}
const valoresIniciales: RespuestaPQRS = {
  id_PQRSDF: 0,
  cod_tipo_PQRSDF: "",
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
  denuncia: null,
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

// console.log('stivencontext', respuestaPqrs)


  const value = {
    infoInicialUsuario,
    setInfoInicialUsuario,
    respuestaPqrs,
    setRespuestaPqrs
  };

  return (
    <ResSolicitudUsuarioContext.Provider value={value}>
      {children}
    </ResSolicitudUsuarioContext.Provider>
  );
};
