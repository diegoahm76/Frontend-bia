/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { v4 as uuidv4 } from 'uuid';
import { set } from 'date-fns';
import dayjs, { Dayjs } from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { interface_articulos_agregados, interface_busqueda_articulo } from '../interfaces/types';


interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_articulos_agregados }) => React.ReactNode;
}

interface props {
  data_articulos_agregados: interface_articulos_agregados[];
  set_data_articulos_agregados: React.Dispatch<React.SetStateAction<interface_articulos_agregados[]>>;
  set_articulo_encontrado: React.Dispatch<React.SetStateAction<interface_busqueda_articulo>>;
  set_tipo_unidad_medida: React.Dispatch<React.SetStateAction<string>>;
  set_cantidad_articulo: React.Dispatch<React.SetStateAction<number>>;
  set_fecha_devolucion: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  set_observacion: React.Dispatch<React.SetStateAction<string>>;
}

const TablaArticulosAgregados: React.FC<props> = ({data_articulos_agregados,
  set_data_articulos_agregados,
  set_articulo_encontrado,
  set_tipo_unidad_medida,
  set_cantidad_articulo,
  set_fecha_devolucion,
  set_observacion}) => {

  const quitar_articulo = (row: interface_articulos_agregados) => {
    const articulos_sin_articulo_eliminado = data_articulos_agregados.filter((bien_temp) => bien_temp.id_bien !== row.id_bien);
    set_data_articulos_agregados(articulos_sin_articulo_eliminado);
  }

  const editar_articulo = (row: interface_articulos_agregados) => {

    set_tipo_unidad_medida(row.tipo_unidad_medida ?? '');
    set_cantidad_articulo(Number(row.cantidad_articulo) ?? 0);
    set_fecha_devolucion(dayjs(row.fecha_devolucion ?? ''));
    set_observacion(row.observacion?? '');

    set_articulo_encontrado(row);
  }

  const columns: custom_column[] = [
    {field: 'codigo_bien', headerName:'Código bien', width:150, flex:1},
    {field: 'nombre', headerName:'Nombre del articulo', width:150, flex:1},
    {field: 'tipo_unidad_medida', headerName:'Unidad medida', width:150, flex:1},
    {field: 'cantidad_articulo', headerName:'Cantidad', width:150, flex:1},
    {field: 'fecha_devolucion', headerName:'Fecha devolucion', width:150, flex:1,
      renderCell: (params) => dayjs(params.row.fecha_devolucion).format('DD/MM/YYYY')
    },
    {field: 'observacion', headerName:'Observacion', width:150, flex:1},
    { field: 'eliminar', headerName: 'Eliminar', maxWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
    renderCell: (params) => (
      <HighlightOffIcon 
        onClick={()=>quitar_articulo(params.row)}
        sx={{fontSize: '30px', cursor: 'pointer', color:'#c62828'}} />
    )
    },
    { field: 'editar', headerName: 'Editar', maxWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        <EditIcon 
          onClick={() => editar_articulo(params.row)}
          sx={{fontSize: '30px', cursor: 'pointer', color: '#1071b2'}} />
      )
    },
  ]

 
  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item sx={{cursor: 'pointer'}}>
          <ButtonGroup style={{ margin: 5,}}>
              {download_xls({ nurseries: data_articulos_agregados, columns })}
              {download_pdf({
                  nurseries: data_articulos_agregados,
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
        rows={data_articulos_agregados ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row.id_bien === undefined ? uuidv4() : row.id_bien}
      />
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default TablaArticulosAgregados;