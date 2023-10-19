/* eslint-disable @typescript-eslint/naming-convention */
/*{
  "id_unidad_seccion_responsable_temporal": 2,
  "id_unidad_seccion_actual": 5383,
  "cod_unidad_actual": "101",
  "nom_unidad_actual": "Asesoria juridcia",
  "id_unidad_seccion_nueva": 5387,
  "cod_unidad_nueva": "101",
  "nom_unidad_nueva": "Asesoria juridcia"
}*/

export const columnsGridListado: any[] = [
  {
    field: 'cod_unidad_actual',
    headerName: 'Cód. unidad actual',
    minWidth: 100,
  },
  {
    headerName: 'Unidad actual',
    field: 'nom_unidad_actual',
    minWidth: 200,
  },
  {
    headerName: 'Cód. unidad nueva',
    field: 'cod_unidad_nueva',
    minWidth: 100,
  },
  {
    headerName: 'Unidad nueva',
    field: 'nom_unidad_nueva',
    minWidth: 200,
  },
];
