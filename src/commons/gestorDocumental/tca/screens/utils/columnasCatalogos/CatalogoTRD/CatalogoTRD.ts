/* eslint-disable @typescript-eslint/naming-convention */

import { type GridColDef } from '@mui/x-data-grid';

export const columsCatalogoTRD: GridColDef[] = [
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
    headerName: 'Cod. Disposición Final',
    field: 'disposicion_final',
    width: 200
  },

  {
    headerName: 'Tiempo retención AG (años)',
    field: 'tiempo_retencion_ag',
    width: 200
  },
  {
    headerName: 'Tiempo retención AC (años)',
    field: 'tiempo_retencion_ac',
    width: 200
  },
  {
    headerName: 'Descripción procedimiento',
    field: 'descripcion_procedimiento',
    width: 250
  }
  //* digitalización  - añadir a todos
  //* fecha registro - añadir a todos

  //* justificacion_cambio - añadir al catalogo en la ruta de administracion TCA
  //* ruta_archivo_cambio - añadir al catalogo en la ruta de administracion TCA
];

export const rowsCatalogoTRD = [
  {
    id: 1,
    nombre_unidad: 'nombre_unidad',
    nombre_serie: 'nombre_serie',
    nombre_subserie: 'nombre_subserie',
    disposicion_final: 'disposicion_final',
    tiempo_retencion_ag: 'tiempo_retencion_ag',
    tiempo_retencion_ac: 'tiempo_retencion_ac',
    descripcion_procedimiento: 'descripcion_procedimiento',
    digitalizacion: true,
    fecha_registro: 'fecha_registro'
  },
  {
    id: 2,
    nombre_unidad: 'nombre_unidad',
    nombre_serie: 'nombre_serie',
    nombre_subserie: 'nombre_subserie',
    disposicion_final: 'disposicion_final',
    tiempo_retencion_ag: 'tiempo_retencion_ag',
    tiempo_retencion_ac: 'tiempo_retencion_ac',
    descripcion_procedimiento: 'descripcion_procedimiento',
    digitalizacion: false,
    fecha_registro: 'fecha_registro'
  },
  {
    id: 3,
    nombre_unidad: 'nombre_unidad',
    nombre_serie: 'nombre_serie',
    nombre_subserie: 'nombre_subserie',
    disposicion_final: 'disposicion_final',
    tiempo_retencion_ag: 'tiempo_retencion_ag',
    tiempo_retencion_ac: 'tiempo_retencion_ac',
    descripcion_procedimiento: 'descripcion_procedimiento',
    digitalizacion: false,
    fecha_registro: 'fecha_registro'
  },
  {
    id: 4,
    nombre_unidad: 'nombre_unidad',
    nombre_serie: 'nombre_serie',
    nombre_subserie: 'nombre_subserie',
    disposicion_final: 'disposicion_final',
    tiempo_retencion_ag: 'tiempo_retencion_ag',
    tiempo_retencion_ac: 'tiempo_retencion_ac',
    descripcion_procedimiento: 'descripcion_procedimiento',
    digitalizacion: true,
    fecha_registro: 'fecha_registro'
  },
  {
    id: 5,
    nombre_unidad: 'nombre_unidad',
    nombre_serie: 'nombre_serie',
    nombre_subserie: 'nombre_subserie',
    disposicion_final: 'disposicion_final',
    tiempo_retencion_ag: 'tiempo_retencion_ag',
    tiempo_retencion_ac: 'tiempo_retencion_ac',
    descripcion_procedimiento: 'descripcion_procedimiento',
    digitalizacion: false,
    fecha_registro: 'fecha_registro'
  },
  {
    id: 6,
    nombre_unidad: 'nombre_unidad',
    nombre_serie: 'nombre_serie',
    nombre_subserie: 'nombre_subserie',
    disposicion_final: 'disposicion_final',
    tiempo_retencion_ag: 'tiempo_retencion_ag',
    tiempo_retencion_ac: 'tiempo_retencion_ac',
    descripcion_procedimiento: 'descripcion_procedimiento',
    digitalizacion: false,
    fecha_registro: 'fecha_registro'
  }
];
