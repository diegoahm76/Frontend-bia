/* eslint-disable @typescript-eslint/naming-convention */
/*
datos en tabla temporal

{
            "id_persona": 184,
            "nombre_completo": "Carlos Rodríguez",
            "id_cargo": 1,
            "cargo": "Desarrollador Front-End",
            "id_unidad_organizacional_actual": 825,
            "nombre_unidad_organizacional_actual": "Direccion general",
            "es_unidad_organizacional_actual": true,
            "id_nueva_unidad_organizacional": 830,
            "nombre_nueva_unidad_organizacional": "Unidad 2.1"
        },

*/

/* datos en listado de personas sin actualizar

    {
            "id_persona": 590,
            "nombre_completo": "Persona 21 Traslado Unidades Organigrama",
            "id_cargo": 1,
            "cargo": "Desarrollador Front-End",
            "id_unidad_organizacional_actual": 5103,
            "nombre_unidad_organizacional_actual": "Of. Asesora júridica",
            "es_unidad_organizacional_actual": false,
            "id_nueva_unidad_organizacional": null,
            "nombre_nueva_unidad_organizacional": null
        },


*/




const dataTablaTemporal = [
  { id: 1, name: 'John', id_unidad_org: 1 },
  { id: 2, name: 'Jane', id_unidad_org:2 },
  { id: 3, name: 'Bob', id_unidad_org:3 }, // Elemento repetido
  { id: 4, name: 'Alice', id_unidad_org:4 },
  { id: 5, name: 'Eve', id_unidad_org:5 },
  { id: 6, name: 'Sara',id_unidad_org: 6  }, // Elemento repetido
];

const dataListadoPersonasSinActualizar = [
  { id: 7, name: 'Alice',id_unidad_org: null  },
  { id: 8, name: 'Eve',id_unidad_org: null  },
  { id: 3, name: 'Bob', id_unidad_org: null }, // Elemento repetido
  { id: 4, name: 'Mike',id_unidad_org: null  },
  { id: 9, name: 'Sara',id_unidad_org: null  },
  { id: 6, name: 'Sara',id_unidad_org: null  } // Elemento repetido
];


//* primero debo pasar los de la tabla temporal para que de esta manera prevalzcan los elementos cuyo id_unidad_org tiene un valor en true
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const newArray = [...dataTablaTemporal, ...dataListadoPersonasSinActualizar ]




export function eliminarObjetosDuplicadosPorId(arr : any[]): any[] {
  const uniqueSet = new Set();
  return arr.filter((obj: Record<any, any>) => {
    const id = obj?.id_persona; //* Supongamos que "id" es el campo por el cual deseas eliminar duplicados
    if (!uniqueSet.has(id)) {
      uniqueSet.add(id);
      return true;
    }
    return false;
  });
}




