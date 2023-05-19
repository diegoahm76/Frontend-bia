/* eslint-disable @typescript-eslint/restrict-plus-operands */
export class Parser {
  parse(str: string): Record<string, any> {
    const objeto: Record<string, any> = {};
    str.split('|').forEach((dato) => {
      const [llave, valor] = dato.split(':');
      objeto[llave] = valor;
    });

    return {
      ...objeto,
      objeto,
      // entries: Object.entries(objeto),
      keys: Object.keys(objeto),
      values: Object.values(objeto)
    };
  }

  formatStringWithSpaces(str: string): string {
    const formatted_words = str
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return formatted_words.join(' ');
  }
}
