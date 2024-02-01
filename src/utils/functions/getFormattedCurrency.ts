export const currency_formatter = (value: number, fraction_digits: number = 2): string => {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    minimumFractionDigits: fraction_digits,
    currency: 'COP'
  });
  return formatter.format(value);
};