/* eslint-disable @typescript-eslint/naming-convention */
export interface TipologiaDocumental {
  id: number;
  codigo_profesional: string;
  nivel: number;
  valor: string;
  nombre: string;
  descripcion: string;
}

export interface ElementoPQRS {
    costo_proyecto: string;
    estado_actual_solicitud: string;
    fecha_inicio: string | null;
    fecha_radicado: string;
    fecha_registro: string;
    medio_solicitud: string;
    nombre_completo_titular: string;
    nombre_proyecto: string;
    nombre_tramite: string | null;
    pago: boolean;
    radicado: string;
    tipo_solicitud: string;
  }
  
  
export interface DatosConsulta {
    Correo: string;
    Dep_Predio: string;
    Departamento: string;
    Direccion: string;
    Dpredio: string;
    Municipio: string;
    NIdenticion: string;
    Ntelefono: string;
    TIdentificacion: string;
    Zon: string;
  }
  
  export const DatosConsulta: DatosConsulta = {
    Correo: "",
    Dep_Predio: "",
    Departamento: "",
    Direccion: "",
    Dpredio: "",
    Municipio: "",
    NIdenticion: "",
    Ntelefono: "",
    TIdentificacion: "",
    Zon: ""
  }
