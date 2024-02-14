import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { v4 as uuidv4 } from 'uuid';
import { data_solicitud_viaje } from "../interfaces/types";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/naming-convention
const TableSolicitudViajes = () => {
  const [data_solicitudes_viajes, set_data_solicitudes_viajes] = useState<data_solicitud_viaje[]>([
    {
      estado: "Respondida",
      fechaSolicitud: "2024-02-13",
      numPasajeros: 3,
      fechaSalida: "2024-02-20",
      fechaRetorno: "2024-02-25",
      municipioDestino: "Medellín"
    },
    {
      estado: "Finalizada",
      fechaSolicitud: "2024-02-15",
      numPasajeros: 2,
      fechaSalida: "2024-03-10",
      fechaRetorno: "2024-03-15",
      municipioDestino: "Bogotá"
    },
    {
      estado: "En Espera",
      fechaSolicitud: "2024-02-18",
      numPasajeros: 1,
      fechaSalida: "2024-03-05",
      fechaRetorno: "2024-03-08",
      municipioDestino: "Cali"
    },
    {
      estado: "Rechazada",
      fechaSolicitud: "2024-02-20",
      numPasajeros: 4,
      fechaSalida: "2024-04-01",
      fechaRetorno: "2024-04-10",
      municipioDestino: "Cartagena"
    },
    {
      estado: "Respondida",
      fechaSolicitud: "2024-02-22",
      numPasajeros: 2,
      fechaSalida: "2024-03-15",
      fechaRetorno: "2024-03-20",
      municipioDestino: "Barranquilla"
    },
    {
      estado: "Finalizada",
      fechaSolicitud: "2024-02-25",
      numPasajeros: 5,
      fechaSalida: "2024-03-20",
      fechaRetorno: "2024-03-25",
      municipioDestino: "Pereira"
    },
    {
      estado: "En Espera",
      fechaSolicitud: "2024-03-01",
      numPasajeros: 1,
      fechaSalida: "2024-03-10",
      fechaRetorno: "2024-03-15",
      municipioDestino: "Manizales"
    },
    {
      estado: "Rechazada",
      fechaSolicitud: "2024-03-05",
      numPasajeros: 3,
      fechaSalida: "2024-04-05",
      fechaRetorno: "2024-04-15",
      municipioDestino: "Santa Marta"
    },
    {
      estado: "Respondida",
      fechaSolicitud: "2024-03-08",
      numPasajeros: 2,
      fechaSalida: "2024-04-10",
      fechaRetorno: "2024-04-18",
      municipioDestino: "Ibagué"
    },
    {
      estado: "Finalizada",
      fechaSolicitud: "2024-03-12",
      numPasajeros: 4,
      fechaSalida: "2024-04-15",
      fechaRetorno: "2024-04-20",
      municipioDestino: "Cúcuta"
    }
  ])

  const columns = [
    {field: 'estado', headerName:'Estado', width:150, flex:1},
    {field: 'fechaSolicitud', headerName:'Fecha Solicitud', width:150, flex:1},
    {field: 'numPasajeros', headerName:'N° Pasajeros', width:150, flex:1},
    {field: 'fechaSalida', headerName:'Fecha Salida', width:150, flex:1},
    {field: 'fechaRetorno', headerName:'Fecha Retorno', width:150, flex:1},
    {field: 'municipioDestino', headerName:'Municipio Destino', width:150, flex:1}
  ]

  return (
    <Grid container>
      <DataGrid
      style={{margin:'15px 0px'}}
      density="compact"
      autoHeight
      rows={data_solicitudes_viajes ?? []}
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