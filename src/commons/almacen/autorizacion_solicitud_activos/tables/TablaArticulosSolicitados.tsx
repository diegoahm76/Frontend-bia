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
import { itmes_solicitud_por_id } from '../interfaces/types';


interface custom_column extends GridColDef {
  renderCell?: (params: { row: itmes_solicitud_por_id }) => React.ReactNode;
}

interface props {
  articulos_solicitados: itmes_solicitud_por_id[];
}

const TablaArticulosSolicitados: React.FC<props> = ({
  articulos_solicitados
}) => {

  let columns: custom_column[] = [
    {field: 'codigo_bien', headerName:'Código bien', minWidth:150, flex:1},
    {field: 'nombre_bien', headerName:'Nombre del articulo', minWidth:250, flex:1},
    {field: 'nombre_unidad_medida', headerName:'Unidad medida', minWidth:150, flex:1},
    {field: 'cantidad', headerName:'Cantidad', minWidth:150, flex:1},
    {field: 'observacion', headerName:'Observacion', minWidth:600, flex:1},
  ];

 
  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item sx={{cursor: 'pointer'}}>
          <ButtonGroup style={{ margin: 5,}}>
              {download_xls({ nurseries: articulos_solicitados, columns })}
              {download_pdf({
                  nurseries: articulos_solicitados,
                  columns,
                  title: 'Articulos agregados a la solicitud',
              })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{margin:'15px 0px'}}
        density="compact"
        autoHeight
        rows={articulos_solicitados ?? []}
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
export default TablaArticulosSolicitados;