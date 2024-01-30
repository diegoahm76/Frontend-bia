/* eslint-disable @typescript-eslint/naming-convention */

import { formatDate } from "../../../../../../../utils/functions/formatDate";

export const columnsRespuesta = [
  {
    headerName: 'Fecha de respuesta',
    field: 'fecha_respuesta',
    minWidth: 220,
    renderCell: (params: any) => {
      return formatDate(params?.value);
    },
  },
  {
    headerName: 'Respondida por',
    field: 'persona_responde',
    minWidth: 350,
  }
]