/* eslint-disable @typescript-eslint/naming-convention */
export const formatNumber = (number: any) => {
  const numberWithoutDecimals = Math.floor(number); // Eliminar decimales
  return numberWithoutDecimals.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
  /* eslint-disable @typescript-eslint/naming-convention */
export const formatNumberTable = (number: any) => {
  const integerNumber = Math.round(Number(number));

  // Formatea el número con separadores de miles
  return integerNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
