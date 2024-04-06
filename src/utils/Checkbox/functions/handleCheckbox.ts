/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Handles the change event of a checkbox and updates the specified properties of the elements in the comparison array that match the specified value for the specified property.
 * @param event - The change event of the checkbox.
 * @param compararPor - The property to compare against.
 * @param valorComparar - The value to compare against.
 * @param arrayComparacion - The array to compare against.
 * @param propiedades - The properties to update.
 * @param dispatch - The dispatch function to update the state.
 * @param callback - The callback function to execute after updating the state.
 */
export const handleCheckboxChange = (
  { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
  compararPor: string,
  valorComparar: any,
  arrayComparacion: any[],
  propiedades: string[],
  dispatch: React.Dispatch<any>,
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
  //  console.log('')(DATOS_ACTUALIZADOS);
  dispatch(callback(DATOS_ACTUALIZADOS));
};



/* export const handleCheckboxChange = (
  { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
  compararPor: string,
  valorComparar: any,
  arrayComparacion: any[],
  propiedades: string[],
  dispatch: React.Dispatch<any>,
  callback: Function
): void => {
  const DATOS_ACTUALIZADOS = arrayComparacion.map((elementos: any) => {
    if (
      elementos.hasOwnProperty(compararPor) &&
      elementos[compararPor] === valorComparar
    ) {
      const DATA_ACTUALIZADA = { ...elementos };
      for (let i = 0; i < propiedades.length; i++) {
        const propiedad = propiedades[i];
        if (i === 0 || DATA_ACTUALIZADA[propiedades[i - 1]]) {
          DATA_ACTUALIZADA[propiedad] = checked;
        }
      }
      return DATA_ACTUALIZADA;
    } else {
      return elementos;
    }
  });
  //  console.log('')(DATOS_ACTUALIZADOS);
  dispatch(callback(DATOS_ACTUALIZADOS));
}; */

