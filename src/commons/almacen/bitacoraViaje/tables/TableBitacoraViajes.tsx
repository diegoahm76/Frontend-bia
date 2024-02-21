import { useState } from 'react';
import { interface_data_bitacora } from '../interfaces/types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import SaveAsIcon from '@mui/icons-material/SaveAs';

interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_data_bitacora }) => React.ReactNode;
}

interface Props {
  set_mostrar_generar_bitacora: (value: boolean)=>void;
  set_dato_fila_tabla: React.Dispatch<React.SetStateAction<interface_data_bitacora>>;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TableBitacoraViajes: React.FC<Props> = ({set_mostrar_generar_bitacora, set_dato_fila_tabla}) => {

  const [data_bitacora, set_data_bitacora] = useState<interface_data_bitacora[]>([
    {
      municipioDestino: "Medellín",
      conductorAsignado: "Juan Pérez",
      fechaSalida: "2024-02-15",
      horaSalida: "09:00",
      fechaRetorno: "2024-02-18",
      horaRetorno: "18:00"
    },
    {
      municipioDestino: "Bogotá",
      conductorAsignado: "María Gómez",
      fechaSalida: "2024-02-16",
      horaSalida: "10:30",
      fechaRetorno: "2024-02-19",
      horaRetorno: "17:45"
    },
    {
      municipioDestino: "Cali",
      conductorAsignado: "Carlos Ramírez",
      fechaSalida: "2024-02-17",
      horaSalida: "08:45",
      fechaRetorno: "2024-02-20",
      horaRetorno: "16:30"
    },
    {
      municipioDestino: "Cartagena",
      conductorAsignado: "Laura Rojas",
      fechaSalida: "2024-02-18",
      horaSalida: "11:15",
      fechaRetorno: "2024-02-21",
      horaRetorno: "19:00"
    },
    {
      municipioDestino: "Barranquilla",
      conductorAsignado: "Pedro Gutiérrez",
      fechaSalida: "2024-02-19",
      horaSalida: "07:30",
      fechaRetorno: "2024-02-22",
      horaRetorno: "15:15"
    },
    {
      municipioDestino: "Pereira",
      conductorAsignado: "Ana Martínez",
      fechaSalida: "2024-02-20",
      horaSalida: "12:00",
      fechaRetorno: "2024-02-23",
      horaRetorno: "20:30"
    },
    {
      municipioDestino: "Santa Marta",
      conductorAsignado: "Diego Sánchez",
      fechaSalida: "2024-02-21",
      horaSalida: "09:45",
      fechaRetorno: "2024-02-24",
      horaRetorno: "17:20"
    },
    {
      municipioDestino: "Manizales",
      conductorAsignado: "Gabriela López",
      fechaSalida: "2024-02-22",
      horaSalida: "10:00",
      fechaRetorno: "2024-02-25",
      horaRetorno: "18:45"
    }
  ]);

  const generar_bitacora = (params: interface_data_bitacora) => {
    set_mostrar_generar_bitacora(true);
    set_dato_fila_tabla(params);
  }

  const columns: CustomColumn[] = [
    { field: 'municipioDestino', headerName: 'Municipio destino', minWidth: 120, flex: 1 },
    { field: 'conductorAsignado', headerName: 'Conductor Asignado', minWidth: 120, flex: 1 },
    { field: 'fechaSalida', headerName: 'Flecha Salida', minWidth: 120, flex: 1 },
    { field: 'horaSalida', headerName: 'Hora salida', minWidth: 120, flex: 1 },
    { field: 'fechaRetorno', headerName: 'Fecha retorno', minWidth: 120, flex: 1 },
    { field: 'horaRetorno', headerName: 'Hora retorno', minWidth: 120, flex: 1 },
    {
      field: 'accion',
      headerName: 'Accion',
      width: 80,
      align: 'center',
      renderCell: (params) => (
        <SaveAsIcon
          sx={{ cursor: 'pointer', fontSize: '28px' }}
          onClick={() => generar_bitacora(params.row)}
        />
      ),
    }
  ];

  return (
    <DataGrid
      style={{margin:'15px 0px'}}
      density="compact"
      autoHeight
      rows={data_bitacora ?? []}
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
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TableBitacoraViajes;