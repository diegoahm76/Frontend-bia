/* eslint-disable @typescript-eslint/naming-convention */
export const unidadSeriesColumns = [
  {
    field: 'codigo',
    headerName: 'Cód. unidad organizacional',
    minWidth: 250,
  },
  {
    field: 'nombre',
    headerName: 'Nombre unidad organizacional',
    minWidth: 400,
  },
];

/*[
  {
      "id_unidad_organizacional": 5384,
      "id_cat_serie_und": 1093,
      "id_serie": 295,
      "cod_serie": "1",
      "nombre_serie": "ser 1",
      "id_subserie": null,
      "cod_subserie": null,
      "nombre_subserie": null
  }
]*/

export const columnsseriesSeccionSeleccionadSinResp = [
  {
    field: 'cod_serie',
    headerName: 'Cod. serie documental',
    minWidth: 250,
  },
  {
    field: 'nombre_serie',
    headerName: 'Nombre serie documental',
    minWidth: 400,
  },
  {
    field: 'cod_subserie',
    headerName: 'Cod. subserie documental',
    minWidth: 250,
    renderCell: (params: any) => {
      return params?.row?.cod_subserie ? params?.row?.cod_subserie : 'N/A';
    }
  },
  {
    field: 'nombre_subserie',
    headerName: 'Nombre subserie documental',
    minWidth: 400,
    renderCell: (params: any) => {
      return params?.row?.nombre_subserie ? params?.row?.nombre_subserie : 'N/A';
    }
  },
]
