// eslint-disable-next-line @typescript-eslint/naming-convention
export const columnsAnexos: {
  headerName: string;
  field: string;
  minWidth: number;
}[] = [
  {
    headerName: 'Medio de almacenamiento',
    field: 'medio_almacenamiento',
    minWidth: 250,
  },
  {
    headerName: 'Nombre de anexo',
    field: 'nombre_anexo',
    minWidth: 350,
  },
];

/* 
{
    "medio_almacenamiento": "No Aplica",
    "nombre_anexo": "aasd",
    "orden_anexo_doc": 1,
    "cod_medio_almacenamiento": "Na",
    "medio_almacenamiento_otros_Cual": null,
    "numero_folios": 2,
    "ya_digitalizado": true,
    "observacion_digitalizacion": null,
    "id_docu_arch_exp": null
}
 */