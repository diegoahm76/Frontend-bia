export interface Registro {
    id: number;
    informacionFuentesAbastecimiento: {
        id: number;
        numero: string;
        tipo: string;
        nombreFuente: string;
        caudalConcesionado: string;
        sistemaMedicionAguaCaptada: string;
        cordenadaX: number;
        cordenadaY: number;
    }[];
    factoresUtilizacion: {
        id: number;
        numeroUsuarios: string;
        numeroBovinos: string;
        numeroPorcinos: string;
        numeroHectareas: string;
        consumoNumeroUsuarios: string;
        consumoNumeroBovinos: string;
        consumoNumeroPorcinos: string;
        consumoNumeroHectareas: string;
    };
    captacionesMensualesAgua: {
        id: number;
        periodoUso: string;
        tiempoUso: string;
        caudalUtilizado: string;
        volumenAguaCaptada: string;
        mes: number;
    }[];
    ruta_archivo: {
        id_archivo_digital: number;
        nombre_de_Guardado: string;
        formato: string;
        tamagno_kb: number;
        ruta_archivo: string;
        fecha_creacion_doc: string;
        es_Doc_elec_archivo: boolean;
    };
    tipoUsuario: string;
    otrotipo: string;
    idpersona: null | number;
    razonSocial: string;
    nit: string;
    nombreRepresentanteLegal: string;
    cc: string;
    actividadEconomica: string;
    telefono: string;
    fax: string;
    codigoCIIU: string;
    direccion: string;
    municipio: string;
    expediente: string;
    numConcesion: string;
    fechaCreacion: string;
    aprobado: boolean;
    id_archivo_sistema: number;
}
