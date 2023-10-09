/* eslint-disable @typescript-eslint/naming-convention */
/*{
  "id_unidad_actual": 5381,
  "cod_unidad_actual": "1000",
  "nom_unidad_actual": "Dirección general",
  "id_organigrama_unidad_actual": 158,
  "id_unidad_nueva": 5385,
  "cod_unidad_nueva": "1000",
  "nom_unidad_nueva": "Dirección general",
  "id_organigrama_unidad_nueva": 159,
  "iguales": true
},
*/

export const columnsCoincidenciasHalladas = [
  //* codigo unidad ccd actual
  {
    field: 'cod_unidad_actual',
    headerName: 'Cód. unidad org. (ACTUAL)',
    width: 220,
  },
  //* serie documental unidad ccd actual
  {
    field: 'nom_unidad_actual',
    headerName: 'Nombre unidad org. (ACTUAL)',
    width: 220,
  },
  //* codigo unidad ccd nueva
  {
    field: 'cod_unidad_nueva',
    headerName: 'Cód. unidad org. (NUEVA)',
    width: 190,
  },
  //* serie documental unidad ccd nueva
  {
    field: 'nom_unidad_nueva',
    headerName: 'Nombre unidad org. (NUEVA)',
    width: 205,
  },
  //* --- comparación entre iguales o no
];
