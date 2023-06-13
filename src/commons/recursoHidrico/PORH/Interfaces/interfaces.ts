export interface Programa {
    nombre_programa:       string;
    fecha_inicio: string;
    fecha_fin:    string;
    proyectos?:    Proyecto[];
}

export interface Proyecto {
    nombre:           string;
    vigencia_inicial: string;
    vigencia_final:   string;
    inversion:        number;
    actividades?:      Actividad[];
}

export interface Actividad {
    nombre: string;
}
export interface GetPrograma {
    id_programa:  number;
    nombre:       string;
    fecha_inicio: string;
    fecha_fin:    string;
}
export interface GetProyectos {
    id_proyecto:      number;
    nombre:           string;
    vigencia_inicial: string;
    vigencia_final:   string;
    inversion:        number;
    fecha_registro:   string;
    id_programa:      number;
}
export interface GetActividades {
    id_actividades: number;
    nombre:         string;
    fecha_registro: string;
    id_proyecto:    number;
}
