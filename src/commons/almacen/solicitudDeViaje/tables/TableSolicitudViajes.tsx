/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { v4 as uuidv4 } from 'uuid';
import { data_solicitud_viaje } from "../interfaces/types";

interface props_table {
  data_row_solicitud_viaje: data_solicitud_viaje[];
}

const TableSolicitudViajes: React.FC<props_table> = ({data_row_solicitud_viaje}) => {

  const columns = [
    {field: 'estado_solicitud', headerName:'Estado', width:150, flex:1},
    {field: 'fecha_solicitud', headerName:'Fecha Solicitud', width:150, flex:1},
    {field: 'nro_pasajeros', headerName:'N° Pasajeros', width:150, flex:1},
    {field: 'fecha_partida', headerName:'Fecha Salida', width:150, flex:1},
    {field: 'fecha_retorno', headerName:'Fecha Retorno', width:150, flex:1},
    {field: 'cod_municipio', headerName:'Municipio Destino', width:150, flex:1}
  ]

  return (
    <Grid container>
      <DataGrid
      style={{margin:'15px 0px'}}
      density="compact"
      autoHeight
      rows={data_row_solicitud_viaje ?? []}
      columns={columns ?? []}
      pageSize={5}
      rowHeight={75}
      rowsPerPageOptions={[10]}
      experimentalFeatures={{ newEditingApi: true }}
      getRowId={() => {
        try {
          return uuidv4();
        } catch (error) {
          console.error(error);
          //? Genera un ID de respaldo único
          return `fallback-id-${Date.now()}-${Math.random()}`;
        }
      }}
    />
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TableSolicitudViajes;