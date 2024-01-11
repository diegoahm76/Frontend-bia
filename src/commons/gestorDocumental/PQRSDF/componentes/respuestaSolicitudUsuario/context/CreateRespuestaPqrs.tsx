/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState } from 'react';

interface PQRSDFResponse {
  id_PQRSDF: number;
  id_respuesta_pqr: number;
  fecha_respuesta: string;
  descripcion: string;
  asunto: string;
  cantidad_anexos: number;
  nro_folios_totales: number;
  id_persona_responde: number;
  id_radicado_salida: number | null;
  fecha_radicado_salida: string | null;
  id_doc_archivo_exp: number | null;
  anexos: {
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
  }[];
}

const initialValues: PQRSDFResponse = {
  id_PQRSDF: 0,
  id_respuesta_pqr: 0,
  fecha_respuesta: '',
  descripcion: '',
  asunto: '',
  cantidad_anexos: 0,
  nro_folios_totales: 0,
  id_persona_responde: 0,
  id_radicado_salida: null,
  fecha_radicado_salida: null,
  id_doc_archivo_exp: null,
  anexos: [],
};

export const PQRSDFContext = createContext<any>({
  pqrsdfData: initialValues,
  setPQRSDFData: () => {},
});

export const PQRSDFProvider = ({ children }: any): JSX.Element => {
  const [pqrsdfData, setPQRSDFData] = useState<PQRSDFResponse>(initialValues);

  console.log('pqrsdfData', pqrsdfData);
  const value = {
    pqrsdfData,
    setPQRSDFData,
  };

  return (
    <PQRSDFContext.Provider value={value}>
      {children}
    </PQRSDFContext.Provider>
  );
};
