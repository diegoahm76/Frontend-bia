/* eslint-disable @typescript-eslint/naming-convention */


export const GetNombreMes = (numeroMes: number): string => {
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    return meses[numeroMes - 1] || ''; // Restamos 1 porque los arrays empiezan desde 0
  };