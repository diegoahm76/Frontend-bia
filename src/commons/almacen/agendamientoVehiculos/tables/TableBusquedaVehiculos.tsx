/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { data_buscar_vehiculo } from '../interfaces/types';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';


interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: data_buscar_vehiculo }) => React.ReactNode;
}

interface props {
  data_busqueda_vehiculos: data_buscar_vehiculo[];
  set_vehiculo_encontrado_temp:React.Dispatch<React.SetStateAction<data_buscar_vehiculo>>
}


const TableBusquedaVehiculos: React.FC<props> = ({data_busqueda_vehiculos, set_vehiculo_encontrado_temp}) => {
  
  const handle_id_hoja_vida = (newSelectionModel: GridSelectionModel) => {
    if (newSelectionModel.length > 0) {
      const vehiculo_seleccionado = data_busqueda_vehiculos.find(row => row.id_unico === newSelectionModel[0]);
      
      const vehiculo_arrendado = vehiculo_seleccionado ?? Object;

      set_vehiculo_encontrado_temp(vehiculo_arrendado);
    }
  }

  /*
    "id_vehiculo_conductor": 17,
    "id_persona_conductor": 121,
    "id_hoja_vida_vehiculo": 23,
    "id_articulo": 7596,
    "id_vehiculo_arrendado": 20,
    "tiene_platon": false,
    "es_arrendado": true,
    "placa": "test1",
    "nombre": "test",
    "marca": "FORD MILENIUM",
    "id_marca": 296,
    "empresa_contratista": "test",
    "persona_conductor": "TEST  TEST "
  */
  

  const columns: CustomColumn[] = [
    {field: 'placa', headerName:'Placa de vehiculo', minWidth:130, flex:1},
    {field: 'nombre', headerName:'Nombre del vehículo', minWidth:170, flex:1},
    {field: 'empresa_contratista', headerName:'Nombre del contratista', minWidth:120, flex:1},
    {field: 'persona_conductor', headerName:'Nombre del conductor', minWidth:260, flex:1},
    {field: 'marca', headerName:'Marca', minWidth:150, flex:1},
    {field: 'tiene_platon', headerName:'¿Tiene platón?', minWidth:120, flex:1,
      renderCell: ((res)=>(res.row.tiene_platon ? 'Si' : 'No'))
    },
    {field: 'es_arrendado', headerName:'¿Arrendado?', minWidth:110, flex:1,
      renderCell: ((res)=>(res.row.es_arrendado ? 'Si' : 'No'))
    },

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
      rowsPerPageOptions={[5]}
      experimentalFeatures={{ newEditingApi: true }}
      onSelectionModelChange={handle_id_hoja_vida}
      getRowId={(row) => row.id_unico}
    />
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TableBusquedaVehiculos;