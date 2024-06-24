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
import { interface_bienes_consumo_entregado } from '../interfaces/types';
import ExportDocs from '../../controlDeInventario/screens/ExportDocs';

interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_bienes_consumo_entregado }) => React.ReactNode;
}

interface props {
  data: interface_bienes_consumo_entregado[];
}

const TablaBienesConsumoEntregados: React.FC<props> = ({
  data
}) => {

  let columns: custom_column[] = [
    {field: 'codigo_bien', headerName:'Código bien', minWidth:150, flex:1},
    {field: 'nombre_bien', headerName:'Nombre bien', minWidth:250, flex:1},
    {field: 'cantidad', headerName:'Cantidad', minWidth:80, flex:1},
    {field: 'fecha_entrega', headerName:'Fecha de entrega', minWidth:180, flex:1,
      valueFormatter: (params) => params.value ? dayjs(params.value as string).format('DD/MM/YYYY') : '',
    },
    {field: 'fecha_despacho', headerName:'Fecha de despacho', minWidth:180, flex:1,
      valueFormatter: (params) => params.value ? dayjs(params.value as string).format('DD/MM/YYYY') : '',
    },
    {field: 'fecha_solicitud', headerName:'Fecha solicitud', minWidth:180, flex:1,
      valueFormatter: (params) => params.value ? dayjs(params.value as string).format('DD/MM/YYYY') : '',
    },
    {field: 'fecha_anulacion', headerName:'Fecha anulación', minWidth:180, flex:1,
      valueFormatter: (params) => params.value ? dayjs(params.value as string).format('DD/MM/YYYY') : '',
    },
    {field: 'responsable', headerName:'Responsable', minWidth:150, flex:1},
    {field: 'persona_despacha', headerName:'Persona despacha', minWidth:150, flex:1},
    {field: 'persona_solicita', headerName:'Persona solicita', minWidth:150, flex:1},
    {field: 'persona_anula', headerName:'Persona anula', minWidth:150, flex:1},
    {field: 'cod_tipo_activo', headerName:'Tipo activo', minWidth:180, flex:1},
    {field: 'nombre_bodega', headerName:'Nombre bodega', minWidth:180, flex:1},
    {field: 'nombre_unidad_para_la_que_solicita', headerName:'Unidad solicita', minWidth:200, flex:1},
    {field: 'motivo_despacho', headerName:'Motivo', minWidth:200, flex:1},
  ];


  return (
    <>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={12}>
          <ExportDocs cols={columns} resultado_busqueda={data} filtros={null} title={'Bienes de consumo entregados'} nombre_archivo={'Bienes de consumo entregados'} filtros_pdf={null}></ExportDocs>
          <DataGrid
            style={{margin:'15px 0px'}}
            density="compact"
            autoHeight
            rows={data ?? []}
            columns={columns ?? []}
            pageSize={5}
            rowHeight={75}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row.id_bien === undefined ? uuidv4() : row.id_bien}
          />
        </Grid>
      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaBienesConsumoEntregados;