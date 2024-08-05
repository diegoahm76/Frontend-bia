/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { interface_busqueda_avanzada_bienes } from '../interfaces/types';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { v4 as uuidv4 } from 'uuid';
import { set } from 'date-fns';
import dayjs from 'dayjs';


interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_busqueda_avanzada_bienes }) => React.ReactNode;
}

interface props {
  set_filas_seleccionadas_temp: React.Dispatch<React.SetStateAction<any>>;
  data_bienes_baja: interface_busqueda_avanzada_bienes[];
}

const TablaModalBuscarBien: React.FC<props> = ({set_filas_seleccionadas_temp,data_bienes_baja}) => {

  const columns: custom_column[] = [
    {field: 'codigo_bien', headerName:'Codigo bien', width:150, flex:1},
    {field: 'nombre_bien', headerName:'Nombre bien', width:150, flex:1},
    {field: 'nombre_marca', headerName:'Marca', width:150, flex:1},
    {field: 'identificador_bien', headerName:'Identificador bien', width:150, flex:1},
    {field: 'valor_unitario', headerName:'Valor unitario', width:150, flex:1},
    {field: 'valor_iva', headerName:'Valor iva', width:150, flex:1},
    {field: 'valor_residual', headerName:'Valor residual', width:150, flex:1},
    {field: 'depreciacion_valor', headerName:'Depreciación valor', width:150, flex:1},
    {field: 'valor_total', headerName:'Valor total', width:150, flex:1},
    { field: 'fecha_ingreso', headerName: 'Fecha de ingreso', minWidth: 120, flex: 1,
      valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : '',
    },
    {field: 'estado', headerName:'Estado', width:150, flex:1},
  ]

  const handle_seleccionar_filas = (selectionModel: GridRowId[]) => {
    // Filtrar objetos basados en los IDs seleccionados
    const filasFiltradas = selectionModel.map(id_bien => {
      // Encontrar el objeto con el ID correspondiente
      return data_bienes_baja.find(bien => bien.id_bien === id_bien);
    });

    // Filtrar objetos nulos (por si no se encuentra coincidencia)
    const filasFiltradasValidas = filasFiltradas.filter(bien => bien !== undefined);

    // Actualizar el estado con las filas seleccionadas
    set_filas_seleccionadas_temp(filasFiltradasValidas);
  };




  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item sx={{cursor: 'pointer'}}>
          <ButtonGroup style={{ margin: 5,}}>
              {download_xls({ nurseries: data_bienes_baja, columns })}
              {download_pdf({
                  nurseries: data_bienes_baja,
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
        rows={data_bienes_baja ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        checkboxSelection
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={handle_seleccionar_filas}
        getRowId={(res) => res?.id_bien === undefined ? uuidv4() : res.id_bien}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaModalBuscarBien;