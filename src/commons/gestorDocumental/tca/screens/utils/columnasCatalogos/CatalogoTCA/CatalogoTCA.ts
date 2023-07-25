/* eslint-disable @typescript-eslint/naming-convention */

import { type GridColDef } from '@mui/x-data-grid';

export const columsCatalogoTCA: GridColDef[] = [
  {
    headerName: 'Nombre Unidad Org',
    field: 'nombre_unidad',
    width: 200
  },
  {
    headerName: 'Nombre Serie',
    field: 'nombre_serie',
    width: 180
  },
  {
    headerName: 'Nombre Subserie',
    field: 'nombre_subserie',
    width: 180
  },
  {
    headerName: 'Cod. Clasificación Expediente',
    field: 'cod_clas_expediente',
    width: 200
  }

  //* fecha de registro - añadir a todos

  //* justificacion_cambio - añadir al catalogo en la ruta de administracion TCA
  //* ruta_archivo_cambio - añadir al catalogo en la ruta de administracion TCA
];

export const rowsCatalogoTCA = [
  {
    id: 1,
    nombre_unidad: 'nombre_unidad',
    nombre_serie: 'nombre_serie',
    nombre_subserie: 'nombre_subserie',
    cod_clas_expediente: 'cod_clas_expediente',
    fecha_registro: 'fecha_registro',
    justificacion_cambio: 'justificacion_cambio',
    ruta_archivo_cambio: 'ruta_archivo_cambio',
  },
  {
    id: 2,
    nombre_unidad: 'nombre_unidad',
    nombre_serie: 'nombre_serie',
    nombre_subserie: 'nombre_subserie',
    cod_clas_expediente: 'cod_clas_expediente',
    fecha_registro: 'fecha_registro',
    justificacion_cambio: 'justificacion_cambio',
    ruta_archivo_cambio: 'ruta_archivo_cambio',
  },
  {
    id: 3,
    nombre_unidad: 'nombre_unidad',
    nombre_serie: 'nombre_serie',
    nombre_subserie: 'nombre_subserie',
    cod_clas_expediente: 'cod_clas_expediente',
    fecha_registro: 'fecha_registro',
    justificacion_cambio: 'justificacion_cambio',
    ruta_archivo_cambio: 'ruta_archivo_cambio',
  },
  {
    id: 4,
    nombre_unidad: 'nombre_unidad',
    nombre_serie: 'nombre_serie',
    nombre_subserie: 'nombre_subserie',
    cod_clas_expediente: 'cod_clas_expediente',
    fecha_registro: 'fecha_registro',
    justificacion_cambio: 'justificacion_cambio',
    ruta_archivo_cambio: 'ruta_archivo_cambio',
  },
  {
    id: 5,
    nombre_unidad: 'nombre_unidad',
    nombre_serie: 'nombre_serie',
    nombre_subserie: 'nombre_subserie',
    cod_clas_expediente: 'cod_clas_expediente',
    fecha_registro: 'fecha_registro',
    justificacion_cambio: 'justificacion_cambio',
    ruta_archivo_cambio: 'ruta_archivo_cambio',
  }
];
