/* eslint-disable @typescript-eslint/naming-convention */
export const parseResponse = (
  response: any,
  oficinasKey: any,
  unidadKey: any
) => {
  const { data: { data = {} } = {} } = response;
  const { id_unidad_organizacional, codigo, nombre, oficinas } = data;

  return {
    [oficinasKey]: oficinas || [],
    [unidadKey]: [
      {
        actual: true,
        id_unidad_organizacional,
        codigo,
        nombre,
      },
    ],
  };
};
