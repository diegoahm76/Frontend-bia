/* eslint-disable @typescript-eslint/naming-convention */
/*
{
    "tipo_permiso_ambiental": "Otros Procedimientos Administrativos Ambientales",
    "cod_tipo_permiso_ambiental": "O",
    "nombre": "Aprovechamiento forestal de árboles en riesgo",
    "tiene_pago": false,
    "item_ya_usado": false,
    "registro_precargado": false
}
*/

export const columnsTramitesU = [
  {
    headerName: 'Tipo de trámite',
    field: 'tipo_permiso_ambiental',
    width: 370,
  },
  {
    headerName: 'Nombre',
    field: 'nombre',
    width: 420,
  },
  {
    headerName: 'Tiene pago',
    field: 'tiene_pago',
    width: 150,
    renderCell: (params: any) => {
      return params.value ? 'Sí' : 'No';
    }
  },
 /* {
    headerName: 'Item ya usado',
    field: 'item_ya_usado',
    width: 150,
  },
  {
    headerName: 'Registro precargado',
    field: 'registro_precargado',
    width: 150,
  }*/
]