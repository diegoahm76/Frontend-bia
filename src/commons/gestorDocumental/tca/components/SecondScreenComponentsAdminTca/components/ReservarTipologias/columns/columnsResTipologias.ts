/* eslint-disable @typescript-eslint/naming-convention */
export const columnsResTipologias = [
  {
    headerName: 'Nombre',
    field: 'nombre',
    width: 200
  },
  {
    headerName: 'Cod. tipo medio documental',
    field: 'cod_tipo_medio_doc',
    width: 200
  }
];

export const rowsPrueba_NO_Registrindas = [
  {
    id_tipologia_documental: 1,
    nombre: 'nombre1',
    cod_tipo_medio_doc: 'E',
    activo: true,
    reservado: false
  },
  {
    id_tipologia_documental: 2,
    nombre: 'nombre2',
    cod_tipo_medio_doc: 'H',
    activo: true,
    reservado: true
  },
  {
    id_tipologia_documental: 3,
    nombre: 'nombre3',
    cod_tipo_medio_doc: 'E',
    activo: true,
    reservado: false
  }
];

export const rowsPrueba_SI_Restringidas = [
  {
    id_tipologia_documental: 2,
    nombre: 'nombre2',
    cod_tipo_medio_doc: 'H',
    activo: false,
    reservado: true
  },
  {
    id_tipologia_documental: 3,
    nombre: 'nombre3',
    cod_tipo_medio_doc: 'E',
    activo: true,
    reservado: false
  }
];
