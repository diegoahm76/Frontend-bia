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
import { interface_articulos_agregados, interface_articulos_obtenidos_por_id, interface_busqueda_articulo, interface_unidades_medidas } from '../interfaces/types';


interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_articulos_agregados }) => React.ReactNode;
}

interface props {
  accion: string;
  data_articulos_agregados: interface_articulos_agregados[] | interface_articulos_obtenidos_por_id[];
  set_data_articulos_agregados: React.Dispatch<React.SetStateAction<interface_articulos_agregados[] | interface_articulos_obtenidos_por_id[]>>;
  set_articulo_encontrado: React.Dispatch<React.SetStateAction<interface_busqueda_articulo>>;
  set_tipo_unidad_medida: React.Dispatch<React.SetStateAction<string>>;
  set_cantidad_articulo: React.Dispatch<React.SetStateAction<number>>;
  set_fecha_devolucion: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  set_observacion: React.Dispatch<React.SetStateAction<string>>;
  switch_solicitud_prestamo: boolean;
  unidades_medidas: interface_unidades_medidas[];
}

const TablaArticulosAgregados: React.FC<props> = ({
  accion,
  data_articulos_agregados,
  set_data_articulos_agregados,
  set_articulo_encontrado,
  set_tipo_unidad_medida,
  set_cantidad_articulo,
  set_fecha_devolucion,
  set_observacion,
  switch_solicitud_prestamo,
  unidades_medidas,
}) => {


  const quitar_articulo = (row: interface_articulos_obtenidos_por_id | interface_articulos_agregados) => {
    const articulos_sin_articulo_eliminado =
      (data_articulos_agregados as Array<interface_articulos_obtenidos_por_id | interface_articulos_agregados>)
      .filter((bien_temp) => bien_temp.id_bien !== row.id_bien);

    set_data_articulos_agregados(articulos_sin_articulo_eliminado as interface_articulos_agregados[]);
  }


  const editar_articulo = (row: interface_articulos_agregados | interface_articulos_obtenidos_por_id) => {
    set_tipo_unidad_medida((row as interface_articulos_obtenidos_por_id).nombre_unidad_medida ?? '');
    set_cantidad_articulo(Number((row as interface_articulos_obtenidos_por_id).cantidad) ?? 0);
    set_fecha_devolucion(dayjs(row.fecha_devolucion ?? ''));
    set_observacion(row.observacion?? '');

    set_articulo_encontrado(row as any);
  }

  let columns: custom_column[] = [
    {field: 'codigo_bien', headerName:'Código bien', maxWidth:200, flex:1},
    {field: accion === 'ver' || accion === 'editar' ? 'nombre_bien' : 'nombre', headerName:'Nombre del articulo', minWidth:200, flex:1},
    {field: 'nombre_unidad_medida', headerName:'Unidad medida', maxWidth:150, flex:1,
      renderCell: (params) => unidades_medidas?.find((unidad_medida) => unidad_medida.id_unidad_medida === params.row.id_unidad_medida)?.nombre
    },
    {field: 'cantidad', headerName:'Cantidad', maxWidth:150, flex:1},
    {field: 'cod_tipo_bien', headerName:'Tipo de bien', width:150, flex:1, renderCell: (params: any) => (
      params.row?.cod_tipo_bien === 'A' ? 'Activo' : 'Consumo'
    )},
    {field: 'doc_identificador_nro', headerName:'Placa / Serial', width:150, flex:1},
    {field: 'marca', headerName:'Marca', width:150, flex:1},
    {field: 'descripcion', headerName:'Descripción', width:250, flex:1},
    {field: 'observacion', headerName:'Observacion', width:250, flex:1},
  ];

  if(switch_solicitud_prestamo){
    columns.push(
      {field: 'fecha_devolucion', headerName:'Fecha devolucion', maxWidth:150, flex:1,
        renderCell: (params) => params.row.fecha_devolucion ? dayjs(params.row.fecha_devolucion).format('DD/MM/YYYY') : 'NO REGISTRADA'
      },
    )
  }

  if (accion === 'editar' || accion === 'crear') {
    columns.push(
      {
        field: 'eliminar', headerName: 'Eliminar', maxWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
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
      }
    );
  } else {
    columns = columns;
  }


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
        getRowHeight={() => 'auto'}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaArticulosAgregados;