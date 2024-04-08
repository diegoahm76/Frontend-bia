/* eslint-disable @typescript-eslint/naming-convention */

import { formatDate } from "../../../../../../../TramitesServicios/utils/FormatoFecha";

/*{
  "id_solicitud_al_usuario_sobre_pqrsdf": 35,
  "tipo_tramite": "Solicitud de Complemento de Información al Usuario",
  "fecha_radicado_salida": null,
  "numero_radicado": "SIN RADICAR",
  "estado": "PENDIENTE POR RADICAR"
},*/

export const columnsGridHistorico = [
  {
    headerName: 'radicado',
    field: 'radicado',
    width: 250,
  },
  {
    headerName: 'Fecha de respuesta',
    field: 'fecha_respuesta',
    width: 220,
    renderCell: (params: any) => formatDate(params.value) || 'N/A',
  },
  {
    headerName: 'Descripción',
    field: 'descripcion',
    width: 450,
  },
  {
    headerName: 'Número de folios totales',
    field: 'nro_folios_totales',
    width: 170,
  },
]



