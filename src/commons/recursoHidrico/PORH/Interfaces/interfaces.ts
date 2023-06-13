export interface Programa {
    nombre_programa:       string;
    fecha_inicio: Date;
    fecha_fin:    Date;
    proyectos?:    Proyecto[];
}

export interface Proyecto {
    nombre:           string;
    vigencia_inicial: Date;
    vigencia_final:   Date;
    inversion:        number;
    actividades?:      Actividad[];
}

export interface Actividad {
    nombre: string;
}
