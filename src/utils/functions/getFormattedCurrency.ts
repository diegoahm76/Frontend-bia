export const currency_formatter = (value: number): string => {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency: 'COP'
  });
  return formatter.format(value);
};