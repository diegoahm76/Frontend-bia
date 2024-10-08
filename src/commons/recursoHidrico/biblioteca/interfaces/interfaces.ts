export interface Seccion {
  id_seccion: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
  id_persona_creada: number;
  id_persona: number;
  nombre_completo: string;
  nombre_comercial: null | string;
}
export interface SubSeccionPorSeccion {
  id_subseccion: number;
  id_seccion: number;
  nombre: string;
  descripcion: string;
  fechaCreacion: string;
  id_persona: number;
  nombre_comercial: null | string;
  nombre_completo: string;
  instrumentos_count: number;
}
export interface SubseccionId {
  id_seccion: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
  id_persona_creada: number;
  nombre_completo: string;
}

export interface TableAgregarSubseccion {
  id: any;
  nombre: any;
  descripcion: any;
  fechaCreacion: string;
  nombre_completo: string | undefined;
}
