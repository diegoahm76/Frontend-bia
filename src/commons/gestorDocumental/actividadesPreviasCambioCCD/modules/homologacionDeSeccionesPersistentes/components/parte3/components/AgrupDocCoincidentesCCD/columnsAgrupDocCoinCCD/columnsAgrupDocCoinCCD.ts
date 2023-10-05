/* eslint-disable @typescript-eslint/naming-convention */

/*
{
"id_unidad_org_actual": 5382,
"id_catalogo_serie_actual": 1090,
"id_serie_actual": 296,
"cod_serie_actual": "2",
 "nombre_serie_actual": "ser 2",
 "id_subserie_actual": 178,
 "cod_subserie_actual": "1",
 "nombre_subserie_actual": "sub 1",
 "id_unidad_org_nueva": 5386,
 "id_catalogo_serie_nueva": 1105,
 "id_serie_nueva": 303,
 "cod_serie_nueva": "2",
 "nombre_serie_nueva": "serie 2",
 "id_subserie_nueva": 188,
 "cod_subserie_nueva": "1",
 "nombre_subserie_nueva": "suberie 2",
"iguales": false
       },

*/

export const columnsAgrupDocCoinCCD = [
  {
    field: 'cod_serie_actual',
    headerName: 'Cód. serie doc. (ACTUAL)',
    width: 190,
  },
  {
    field: 'nombre_serie_actual',
    headerName: 'Nombre serie doc. (ACTUAL)',
    width: 200,
  },
  {
    field: 'cod_serie_nueva',
    headerName: 'Cód. serie doc. (NUEVA)',
    width: 180,
  },
  {
    field: 'nombre_serie_nueva',
    headerName: 'Nombre serie doc. (NUEVA)',
    width: 200,
  },
  /* {
    field: 'iguales',
    headerName: '¿Son iguales?',
    width: 205,
    renderCell: (params: any) => {
      const { value } = params;
      return value ? 'Si' : 'No';
    },
  },*/
];
