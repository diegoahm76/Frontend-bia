import { type IBien } from "./catalogodebienes";
export interface INodo {
    key: string;
    data: data;
    children?: INodo[]
  }

  export interface data{
    nombre: string;
    codigo: string;
    acciones?: string;
    id_nodo: number;
    crear?: boolean;
    editar?: boolean;
    eliminar?: boolean;
    bienes?: IBien;
  }