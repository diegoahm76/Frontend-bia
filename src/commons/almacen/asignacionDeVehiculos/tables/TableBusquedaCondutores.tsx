/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { interface_conductor_seleccionado } from '../interfaces/types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';

interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_conductor_seleccionado }) => React.ReactNode;
}

interface props {
  data_busqueda_conductores: interface_conductor_seleccionado[];
  set_id_persona_conductor:React.Dispatch<React.SetStateAction<number>>;
  set_conductor_seleccionado:React.Dispatch<React.SetStateAction<interface_conductor_seleccionado>>;
}

const TableBusquedaConductores: React.FC<props> = ({data_busqueda_conductores, set_id_persona_conductor,set_conductor_seleccionado}) => {


  /**
   * Asigna un conductor a partir de los parámetros proporcionados.
   * 
   * @param {interface_conductor_seleccionado} params - Los parámetros de búsqueda del conductor.
   * @returns {void}
   */
  const asignar_conductor = (params: interface_conductor_seleccionado) => {
    set_conductor_seleccionado(params);
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
                  title: 'Conductores disponibles',
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
export default TableBusquedaConductores;