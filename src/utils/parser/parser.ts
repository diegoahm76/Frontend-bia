/* eslint-disable @typescript-eslint/restrict-plus-operands */
export class Parser {
  parse(str: string): Record<any, any> {
    if (!str) return {};

    const delimiters = '|,';
    const objeto: Record<string, any> = {};

    str.split(new RegExp(`[${delimiters}]`, 'g')).forEach((dato) => {
      const [llave, valor] = dato.split(':');
      if (!llave || !valor) {
        console.error('Formato de cadena inválido o valor inválido para la llave:', dato);
        return;
      }
      objeto[llave] = valor;
    });

    return {
      objeto,
      keys: Object.keys(objeto),
      values: Object.values(objeto),
    };
  }

  formatStringWithSpaces(str: string): string {
    return str
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}