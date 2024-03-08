/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { interface_vehiculo_seleccionado } from '../interfaces/types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';


interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_vehiculo_seleccionado }) => React.ReactNode;
}

interface props {
  data_busqueda_vehiculos: interface_vehiculo_seleccionado[];
  set_id_hoja_vida_vehiculo:React.Dispatch<React.SetStateAction<number>>
  set_vehiculo_seleccionado:React.Dispatch<React.SetStateAction<interface_vehiculo_seleccionado>>
}


const TableBusquedaVehiculos: React.FC<props> = ({data_busqueda_vehiculos, set_id_hoja_vida_vehiculo,set_vehiculo_seleccionado}) => {

  const asignar_vehiculo = (params: interface_vehiculo_seleccionado) => {
    set_vehiculo_seleccionado(params)
    set_id_hoja_vida_vehiculo(params.id_hoja_de_vida);
  }

  const columns: CustomColumn[] = [
    {field: 'tipo_vehiculo', headerName:'Tipo de vehiculo', minWidth:130, flex:1},
    {field: 'marca', headerName:'Marca', minWidth:190, flex:1},
    {field: 'placa', headerName:'Placa', minWidth:120, flex:1},
    {field: 'capacidad_pasajeros', headerName:'Cantidad de pasajeros', minWidth:150, flex:1},
    {field: 'tiene_platon', headerName:'¿Tiene platon?', minWidth:110, flex:1,
      renderCell: (params)=>(params.row.tiene_platon ? 'Si' : 'No')
    },
    {
      field: 'asignar',
      headerName: 'Asignar',
      width: 80,
      align: 'center',
      renderCell: (params) => (
        <AddCircleOutlineIcon sx={{cursor:'pointer', fontSize:'32px'}} onClick={() => asignar_vehiculo(params.row)} />
      )
    },
  ]

  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
              {download_xls({ nurseries: data_busqueda_vehiculos, columns })}
              {download_pdf({
                  nurseries: data_busqueda_vehiculos,
                  columns,
                  title: 'Veiculos disponibles',
              })}
          </ButtonGroup>
        </Grid>
      </Grid>

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
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TableBusquedaVehiculos;