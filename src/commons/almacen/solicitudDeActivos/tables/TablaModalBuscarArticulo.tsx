/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { v4 as uuidv4 } from 'uuid';
import { set } from 'date-fns';
import { interface_busqueda_articulo } from '../interfaces/types';

interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_busqueda_articulo }) => React.ReactNode;
}

interface props {
  set_fila_seleccionada_temp: React.Dispatch<React.SetStateAction<any>>;
  data_articulos: interface_busqueda_articulo[];
  loadding_tabla: boolean;
}

const TablaModalBuscarArticulo: React.FC<props> = ({set_fila_seleccionada_temp,data_articulos,loadding_tabla}) => {

  const columns: custom_column[] = [
    {field: 'codigo_bien', headerName:'Código bien', maxWidth:150, flex:1},
    {field: 'cod_tipo_activo', headerName:'Tipo activo', width:150, flex:1,
      renderCell: (params) => params.row.cod_tipo_activo === 'Veh' ? 'Vehículo' 
      : params.row.cod_tipo_activo === 'Com' ? 'Computador'
      : params.row.cod_tipo_activo === 'OAc' && 'Otro activo'
    },
    {field: 'nombre', headerName:'Nombre', width:150, flex:1},
    {field: 'marca', headerName:'Marca', width:150, flex:1},
    {field: 'tipo_bien', headerName:'Tipo bien', width:150, flex:1},
    {field: 'doc_identificador_nro', headerName:'Doc. identificador', width:150, flex:1},
  ]

  const handle_seleccionar_fila = (selectionModel: GridRowId[]) => {
    const articulo_encontrado = data_articulos.find((articulo) => articulo.id_bien === selectionModel[0]);
    set_fila_seleccionada_temp(articulo_encontrado);
  };
  
  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item sx={{cursor: 'pointer'}}>
          <ButtonGroup style={{ margin: 5,}}>
              {download_xls({ nurseries: data_articulos, columns })}
              {download_pdf({
                  nurseries: data_articulos,
                  columns,
                  title: 'Bienes de baja',
              })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{margin:'15px 0px'}}
        density="compact"
        autoHeight
        loading={loadding_tabla}
        rows={data_articulos ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={handle_seleccionar_fila}
        getRowId={(res) => res?.id_bien === undefined ? uuidv4() : res.id_bien}
      />
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default TablaModalBuscarArticulo;