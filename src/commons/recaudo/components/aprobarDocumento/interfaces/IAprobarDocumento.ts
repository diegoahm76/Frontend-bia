export interface Registro {
    id: number;
    informacionFuentesAbastecimiento: {
        id: number;
        numero: number;
        tipo: string;
        nombreFuente: string;
        caudalConcesionado: string;
        sistemaMedicionAguaCaptada: string;
        cordenadaX: number;
        cordenadaY: number;
    }[];
    factoresUtilizacion: {
        id: number;
        numeroUsuarios: number;
        numeroBovinos: number;
        numeroPorcinos: number;
        numeroHectareas: number;
        consumoNumeroUsuarios: number;
        consumoNumeroBovinos: number;
        consumoNumeroPorcinos: number;
        consumoNumeroHectareas: number;
    };
    captacionesMensualesAgua: {
        id: number;
        periodoUso: string;
        tiempoUso: number;
        caudalUtilizado: number;
        volumenAguaCaptada: number;
        mes: number;
    }[];
    tipoUsuario: string;
    otrotipo: string;
    idpersona: null | number;
    razonSocial: string;
    nit: number;
    nombreRepresentanteLegal: string;
    cc: number;
    actividadEconomica: string;
    telefono: string;
    fax: string;
    codigoCIIU: number;
    direccion: string;
    municipio: string;
    expediente: number;
    numConcesion: number;
    fechaCreacion: string;
    aprobado: boolean;
}
