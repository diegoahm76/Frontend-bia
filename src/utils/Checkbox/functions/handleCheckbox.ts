/* eslint-disable @typescript-eslint/naming-convention */
export const handleCheckboxChange = (
  { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
  compararPor: string,
  valorComparar: any,
  arrayComparacion: any[],
  propiedades: string[],
  dispatch: any,
  callback: Function
): void => {
  const DATOS_ACTUALIZADOS = arrayComparacion.map((elementos: any) => {
    if (
      elementos.hasOwnProperty(compararPor) &&
      elementos[compararPor] === valorComparar
    ) {
      const DATA_ACTUALIZADA = { ...elementos };
      for (const propiedad of propiedades) {
        DATA_ACTUALIZADA[propiedad] = checked;
      }
      return DATA_ACTUALIZADA;
    } else {
      return elementos;
    }
  });
  console.log(DATOS_ACTUALIZADOS);
  dispatch(callback(DATOS_ACTUALIZADOS));
};
