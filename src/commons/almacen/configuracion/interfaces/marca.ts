export interface IMarcaGet {
    marca: IMarcas[];
    marca_seleccionada: IMarcas;
  }
  
  export interface IList{
    value: string|number,
    label: string|number
  }

  export interface IMarcas {
    id_marca: number | null,
    nombre: string,
    activo: boolean,
    item_ya_usado: boolean,
  }
  