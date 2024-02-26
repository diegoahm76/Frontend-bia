/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { data_busqueda_conductor, data_busqueda_conductores } from '../interfaces/types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: data_busqueda_conductor }) => React.ReactNode;
}

interface props {
  data_busqueda_conductores: data_busqueda_conductores[];
  set_id_persona_conductor:React.Dispatch<React.SetStateAction<number>>;
  set_nro_documento:React.Dispatch<React.SetStateAction<string>>;
}

const TableBusquedaConductores: React.FC<props> = ({data_busqueda_conductores, set_id_persona_conductor,set_nro_documento}) => {


  const asignar_conductor = (params: data_busqueda_conductor) => {
    set_nro_documento(params.nro_documento)
    set_id_persona_conductor(params.id_persona);
  }

  const columns: CustomColumn[] = [
    {field: 'nombre_clase_tercero', headerName:'Tipo de conductor', minWidth:150, flex:1},
    {field: 'nombre_persona', headerName:'Nombres', minWidth:200, flex:1},
    {field: 'nro_documento', headerName:'Numero de documento', minWidth:150, flex:1},
    {
      field: 'asignar',
      headerName: 'Asignar',
      width: 80,
      align: 'center',
      renderCell: (params) => (
        <AddCircleOutlineIcon sx={{cursor:'pointer', fontSize:'32px'}} onClick={() => asignar_conductor(params.row)} />
      )
    },
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
      rowsPerPageOptions={[5]}
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