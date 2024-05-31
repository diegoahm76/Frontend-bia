/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import React from 'react';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { v4 as uuidv4 } from 'uuid';
import { set } from 'date-fns';
import { interface_activos_disponibles } from '../interfeces/types';

interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_activos_disponibles }) => React.ReactNode;
}

interface props {
  loadding_activos_disponibles: boolean;
  set_filas_seleccionadas_temp: React.Dispatch<React.SetStateAction<any>>;
  data: interface_activos_disponibles[];
}

const TablaModalActivosDisponibles: React.FC<props> = ({
  set_filas_seleccionadas_temp,
  data,
  loadding_activos_disponibles,
  }) => {

  const columns: custom_column[] = [
    {field: 'codigo_bien_espachado', headerName:'Codigo bien', width:150, flex:1},
    {field: 'nombre_bien_espachado', headerName:'Nombre bien', width:150, flex:1},
    {field: 'cod_tipo_bien', headerName:'Tipo de bien', width:150, flex:1, renderCell: (params: any) => (
      params.row?.cod_tipo_bien === 'A' ? 'Activo' : 'Consumo'
    )},
    {field: 'doc_identificador_nro', headerName:'Placa / Serial', width:150, flex:1},
    {field: 'marca', headerName:'Marca', width:150, flex:1},
    {field: 'descripcion', headerName:'Descripción', width:150, flex:1},
    // {field: 'id_bien_despachado', headerName:'Id bien', width:150, flex:1},
    // {field: 'nombre_bodega', headerName:'Marca', width:150, flex:1},
  ]

  const handle_seleccionar_filas = (selectionModel: GridRowId[]) => {
    // Filtrar objetos basados en los IDs seleccionados
    const filasFiltradas = selectionModel.map(id_bien_despachado => {
      // Encontrar el objeto con el ID correspondiente
      return data.find(bien => bien.id_bien_despachado === id_bien_despachado);
    });

    // Filtrar objetos nulos (por si no se encuentra coincidencia)
    const filas_filtradas_validas = filasFiltradas.filter(bien => bien !== undefined);

    // Actualizar el estado con las filas seleccionadas
    set_filas_seleccionadas_temp(filas_filtradas_validas);
  };


  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item sx={{cursor: 'pointer'}}>
          <ButtonGroup style={{ margin: 5,}}>
              {download_xls({ nurseries: data, columns })}
              {download_pdf({
                  nurseries: data,
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
        loading={loadding_activos_disponibles}
        rows={data ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        checkboxSelection
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={handle_seleccionar_filas}
        getRowId={(res) => res?.id_bien_despachado === undefined ? uuidv4() : res.id_bien_despachado}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaModalActivosDisponibles;