/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const obtenerHoraDeFecha = (fecha: string): string => {
    const fechaObjeto = new Date(fecha);
    const horas = fechaObjeto.getHours();
    const minutos = fechaObjeto.getMinutes();

    const horasFormateadas = horas.toString().padStart(2, '0');
    const minutosFormateados = minutos.toString().padStart(2, '0');

    return `${horasFormateadas}:${minutosFormateados}`;
};