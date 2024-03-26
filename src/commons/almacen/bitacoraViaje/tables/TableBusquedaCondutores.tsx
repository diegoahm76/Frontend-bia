/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { data_busqueda_conductor, data_busqueda_conductores } from '../interfaces/types';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';

interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: data_busqueda_conductor }) => React.ReactNode;
}

interface props {
  data_busqueda_conductores: data_busqueda_conductores[];
  set_conductor_buscado_temp:React.Dispatch<React.SetStateAction<data_busqueda_conductores>>;
}

const TableBusquedaConductores: React.FC<props> = ({data_busqueda_conductores, set_conductor_buscado_temp}) => {


  const asignar_conductor = (newSelectionModel: GridSelectionModel) => {
    if (newSelectionModel.length > 0) {
      const vehiculo_seleccionado = data_busqueda_conductores.find(row => row.id_clase_tercero_persona === newSelectionModel[0]);
      
      const vehiculo_arrendado = vehiculo_seleccionado ?? Object;
      
      set_conductor_buscado_temp(vehiculo_arrendado);
    }
    
  }

  const columns: CustomColumn[] = [
    {field: 'nombre_clase_tercero', headerName:'Tipo de conductor', minWidth:150, flex:1},
    {field: 'nombre_persona', headerName:'Nombres', minWidth:200, flex:1},
    {field: 'nro_documento', headerName:'Numero de documento', minWidth:150, flex:1},
  ]

  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
              {download_xls({ nurseries: data_busqueda_conductores, columns })}
              {download_pdf({
                  nurseries: data_busqueda_conductores,
                  columns,
                  title: 'Resultado búsqueda conductores',
              })}
          </ButtonGroup>
        </Grid>
      </Grid>

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
        onSelectionModelChange={asignar_conductor}
        getRowId={(row) => row.id_clase_tercero_persona}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TableBusquedaConductores;