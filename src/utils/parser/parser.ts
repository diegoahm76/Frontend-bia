/* eslint-disable @typescript-eslint/restrict-plus-operands */
export class Parser {
  parse(str: string): Record<any, any> {
    const delimiters = '|,';
    const objeto: Record<string, any> = {};
    // eslint-disable-next-line no-useless-catch
    try {
      if (str === null) return objeto;

      str.split(new RegExp(`[${delimiters}]`, 'g')).forEach((dato) => {
        try {
          const [llave, valor] = dato.split(':');
          objeto[llave] = valor;
        } catch (error) {
          if (error instanceof SyntaxError) {
            throw new Error('Formato de cadena inválido');
          } else if (error instanceof TypeError) {
            throw new Error('Valor inválido para la llave ' + dato);
          }
        }
      });
    } catch (error) {
      throw error;
    }

    return {
      objeto,
      keys: Object.keys(objeto),
      values: Object.values(objeto),
    };
  }

  formatStringWithSpaces(str: string): string {
    const formatted_words = str
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return formatted_words.join(' ');
  }
}
