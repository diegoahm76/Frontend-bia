import { useState } from 'react';
import { data_busqueda_vehiculos } from '../interfaces/types';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';


// eslint-disable-next-line @typescript-eslint/naming-convention
const TableBusquedaVehiculos: React.FC = () => {

  const [data_busqueda_vehiculos, set_data_busqueda_vehiculos] = useState<data_busqueda_vehiculos[]>([
    {
      tipoVehiculo: 'Carro',
      marca: 'Chevrolet',
      placa: 'DEF456',
      capacidadPasajeros: 4,
      tienePlaton: 'Sí'
    },
    {
      tipoVehiculo: 'Moto',
      marca: 'Yamaha',
      placa: 'GHI789',
      capacidadPasajeros: 1,
      tienePlaton: 'No'
    },
    {
      tipoVehiculo: 'Carro',
      marca: 'Ford',
      placa: 'JKL012',
      capacidadPasajeros: 5,
      tienePlaton: 'No'
    },
    {
      tipoVehiculo: 'Moto',
      marca: 'Suzuki',
      placa: 'MNO345',
      capacidadPasajeros: 1,
      tienePlaton: 'Sí'
    },
    {
      tipoVehiculo: 'Carro',
      marca: 'Hyundai',
      placa: 'PQR678',
      capacidadPasajeros: 4,
      tienePlaton: 'Sí'
    },
    {
      tipoVehiculo: 'Moto',
      marca: 'Kawasaki',
      placa: 'STU901',
      capacidadPasajeros: 1,
      tienePlaton: 'No'
    },
    {
      tipoVehiculo: 'Carro',
      marca: 'Nissan',
      placa: 'VWX234',
      capacidadPasajeros: 6,
      tienePlaton: 'No'
    },
    {
      tipoVehiculo: 'Moto',
      marca: 'Ducati',
      placa: 'YZA567',
      capacidadPasajeros: 1,
      tienePlaton: 'Sí'
    },
  ]);

  const columns = [
    {field: 'tipoVehiculo', headerName:'Tipo de vehiculo', width:150, flex:1},
    {field: 'marca', headerName:'Marca', width:150, flex:1},
    {field: 'placa', headerName:'Placa', width:150, flex:1},
    {field: 'capacidadPasajeros', headerName:'Cantidad de pasajeros', width:150, flex:1},
    {field: 'tienePlaton', headerName:'¿Tiene platon?', width:150, flex:1},
  ]

  return (
    <DataGrid
      style={{margin:'15px 0px'}}
      density="compact"
      autoHeight
      rows={data_busqueda_vehiculos ?? []}
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
export default TableBusquedaVehiculos;