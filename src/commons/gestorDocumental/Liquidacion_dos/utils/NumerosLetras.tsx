/* eslint-disable @typescript-eslint/naming-convention */
// @ts-ignore
import numeroALetras from 'numero-a-letras'; // Asegúrate de haber instalado la biblioteca 'numero-a-letras'
import React from 'react';

// Declara el tipo para 'numero-a-letras' como una variable global
declare global {
  interface Window {
    numeroALetras: (numero: number) => string;
  }
}

export const NumerosLetras = () => {
  const numero = 123; // Número estático
  const numeroEscrito = window.numeroALetras(numero);

  return (
    <div>
      <p>{numeroEscrito}</p>
    </div>
  );
};