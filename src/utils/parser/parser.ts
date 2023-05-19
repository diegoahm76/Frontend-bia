import type { ParsedObject } from "./types";

export class Parser {
  parse(str: string): ParsedObject {
    const objeto: ParsedObject = {};
    str.split("|").forEach(dato => {
      const [llave, valor] = dato.split(":");
      objeto[llave] = valor;
    });
    return objeto;
  }
}