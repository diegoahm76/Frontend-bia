/* eslint-disable @typescript-eslint/naming-convention */
const basic = 'Reporte de índices PQRSDF';

export const choicesBusquedaReportes = [
  {
    value: 1,
    label: `${basic} por (estado)`,
  },
  {
    value: 2,
    label: `${basic} por (estado & sede)`,
  },
  {
    value: 3,
    label: `${basic} por (estado - sede & grupos)`,
  },
  {
    value: 4,
    label: `${basic} por (estado - sede & tipo)`,
  },
  {
    value: 5,
    label: `${basic} por (estado - sede - tipo & selección de grupo)`,
  },
] as const;
