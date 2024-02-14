import { useState } from 'react';
import { data_asignacion_vehiculos, data_busqueda_conductor } from '../interfaces/types';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';


// eslint-disable-next-line @typescript-eslint/naming-convention
const TableBusquedaConductores: React.FC = () => {

  const [data_busqueda_conductores, set_data_busqueda_conductores] = useState<data_busqueda_conductor[]>([
    {
      tipoConductor: 'Interno',
      nombres: 'Juan Pérez',
      numeroDocumento: 123456789
    },
    {
      tipoConductor: 'Externo',
      nombres: 'María López',
      numeroDocumento: 987654321
    },
    {
      tipoConductor: 'Interno',
      nombres: 'Andrés Gómez',
      numeroDocumento: 456789012
    },
    {
      tipoConductor: 'Externo',
      nombres: 'Luisa Ramírez',
      numeroDocumento: 212345678
    },
    {
      tipoConductor: 'Interno',
      nombres: 'Carlos García',
      numeroDocumento: 789012345
    },
    {
      tipoConductor: 'Externo',
      nombres: 'Ana Martínez',
      numeroDocumento: 543210987
    },
    {
      tipoConductor: 'Interno',
      nombres: 'Laura Castaño',
      numeroDocumento: 210987654
    },
    {
      tipoConductor: 'Externo',
      nombres: 'Javier Rojas',
      numeroDocumento: 876543210
    },
    {
      tipoConductor: 'Interno',
      nombres: 'Silvia Herrera',
      numeroDocumento: 321098765
    },
    {
      tipoConductor: 'Externo',
      nombres: 'Héctor Soto',
      numeroDocumento: 654321098
    }
  ]);

  const columns = [
    {field: 'tipoConductor', headerName:'Tipo de conductor', width:150, flex:1},
    {field: 'nombres', headerName:'Nombres', width:150, flex:1},
    {field: 'numeroDocumento', headerName:'Numero de documento', width:150, flex:1},
  ]

  return (
    <DataGrid
      style={{margin:'15px 0px'}}
      density="compact"
      autoHeight
      rows={data_busqueda_conductores ?? []}
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
export default TableBusquedaConductores;