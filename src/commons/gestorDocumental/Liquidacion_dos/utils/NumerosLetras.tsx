/* eslint-disable @typescript-eslint/naming-convention */
// @ts-ignore
import { NumerosALetras } from 'numero-a-letras';
import React from 'react';


export const NumerosLetras = (data:number) => {

  let numeroEscrito = NumerosALetras(data);

  // Eliminar la parte de la moneda "00/100 M.N."
  const indexMoneda = numeroEscrito.indexOf("Pesos");
  if (indexMoneda !== -1) {
    numeroEscrito = numeroEscrito.substring(0, indexMoneda + 5); // +5 para incluir "Pesos"
  }

  return numeroEscrito;
};
