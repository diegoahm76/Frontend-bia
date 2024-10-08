/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { v4 as uuidv4 } from 'uuid';


interface custom_column extends GridColDef {
  renderCell?: (params: { row: any }) => React.ReactNode;
}

interface props {
  articulos_despachados: any[];
}

const TablaArticulosDespachados: React.FC<props> = ({
  articulos_despachados
}) => {

  let columns: custom_column[] = [
    {field: 'id_bien', headerName:'Código bien', minWidth:150, flex:1},
    {field: 'nombre_bien', headerName:'Nombre del articulo', minWidth:300, flex:1},
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
              {download_xls({ nurseries: articulos_despachados, columns })}
              {download_pdf({
                  nurseries: articulos_despachados,
                  columns,
                  title: 'Articulos despachados',
              })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{margin:'15px 0px'}}
        density="compact"
        autoHeight
        rows={articulos_despachados ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={() => uuidv4()}
      />
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default TablaArticulosDespachados;