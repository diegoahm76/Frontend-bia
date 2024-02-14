import { useState } from 'react';
import { data_asignacion_vehiculos } from '../interfaces/types';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';


// eslint-disable-next-line @typescript-eslint/naming-convention
const AsignacionVehiculos: React.FC = () => {

  const [data_asignacion_vehiculos, set_data_asignacion_vehiculos] = useState<data_asignacion_vehiculos[]>([
    {
      tipoVehiculo: 'Moto',
      marca: 'Honda',
      placa: 'ABC123',
      tipoConductor: 'Interno',
      nombres: 'Juan Pérez',
      numeroDocumento: '123456789',
      fechaInicio: '2024-02-13',
      fechaFinal: '2024-02-20'
    },
    {
      tipoVehiculo: 'Carro',
      marca: 'Toyota',
      placa: 'XYZ789',
      tipoConductor: 'Externo',
      nombres: 'María López',
      numeroDocumento: '987654321',
      fechaInicio: '2024-02-15',
      fechaFinal: '2024-02-25'
    },
    {
      tipoVehiculo: 'Moto',
      marca: 'Suzuki',
      placa: 'DEF456',
      tipoConductor: 'Interno',
      nombres: 'Andrés Gómez',
      numeroDocumento: '456789012',
      fechaInicio: '2024-02-18',
      fechaFinal: '2024-02-28'
    },
    {
      tipoVehiculo: 'Carro',
      marca: 'Ford',
      placa: 'LMN012',
      tipoConductor: 'Externo',
      nombres: 'Luisa Ramírez',
      numeroDocumento: '012345678',
      fechaInicio: '2024-02-20',
      fechaFinal: '2024-03-01'
    },
    {
      tipoVehiculo: 'Moto',
      marca: 'Yamaha',
      placa: 'GHI789',
      tipoConductor: 'Interno',
      nombres: 'Carlos García',
      numeroDocumento: '789012345',
      fechaInicio: '2024-02-22',
      fechaFinal: '2024-03-05'
    },
    {
      tipoVehiculo: 'Carro',
      marca: 'Chevrolet',
      placa: 'OPQ345',
      tipoConductor: 'Externo',
      nombres: 'Ana Martínez',
      numeroDocumento: '543210987',
      fechaInicio: '2024-02-25',
      fechaFinal: '2024-03-08'
    },
    {
      tipoVehiculo: 'Moto',
      marca: 'Kawasaki',
      placa: 'JKL678',
      tipoConductor: 'Interno',
      nombres: 'Laura Castaño',
      numeroDocumento: '210987654',
      fechaInicio: '2024-02-28',
      fechaFinal: '2024-03-10'
    },
    {
      tipoVehiculo: 'Carro',
      marca: 'Hyundai',
      placa: 'RST901',
      tipoConductor: 'Externo',
      nombres: 'Javier Rojas',
      numeroDocumento: '876543210',
      fechaInicio: '2024-03-02',
      fechaFinal: '2024-03-15'
    },
    {
      tipoVehiculo: 'Moto',
      marca: 'Ducati',
      placa: 'UVW234',
      tipoConductor: 'Interno',
      nombres: 'Silvia Herrera',
      numeroDocumento: '321098765',
      fechaInicio: '2024-03-05',
      fechaFinal: '2024-03-18'
    },
    {
      tipoVehiculo: 'Carro',
      marca: 'Nissan',
      placa: 'XYZ567',
      tipoConductor: 'Externo',
      nombres: 'Héctor Soto',
      numeroDocumento: '654321098',
      fechaInicio: '2024-03-08',
      fechaFinal: '2024-03-20'
    }
  ]);

  const columns = [
    {field: 'tipoVehiculo', headerName:'Tipo de vehiculos', flex:1},
    {field: 'marca', headerName:'Marca', flex:1},
    {field: 'placa', headerName:'Placa', flex:1},
    {field: 'tipoConductor', headerName:'Tipo de conductor', flex:1},
    {field: 'nombres', headerName:'Nombres', flex:1},
    {field: 'numeroDocumento', headerName:'Numero de documento', flex:1},
    {field: 'fechaInicio', headerName:'Fecha inicio', flex:1},
    {field: 'fechaFinal', headerName:'Fecha Final', flex:1},
  ]

  return (
    <DataGrid
      style={{margin:'15px 0px'}}
      density="compact"
      autoHeight
      rows={data_asignacion_vehiculos ?? []}
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
export default AsignacionVehiculos;