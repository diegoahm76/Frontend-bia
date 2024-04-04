import { ButtonGroup, Grid } from '@mui/material';
import React from 'react';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { interface_entradas_relacionadas } from '../interfaces/types';



interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_entradas_relacionadas }) => React.ReactNode;
}


interface props {
  data_entradas_relacionadas: interface_entradas_relacionadas[];
  set_entrada_relacionada_seleccionada: React.Dispatch<React.SetStateAction<interface_entradas_relacionadas>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaEntradasEspeciales: React.FC<props> = ({
  data_entradas_relacionadas,
  set_entrada_relacionada_seleccionada,
  }) => {


  const selecionar_entrada_relacionada = (newSelectionModel: GridSelectionModel) => {
    if (newSelectionModel.length > 0) {
      const entrada_relacionada_seleccionada = data_entradas_relacionadas.find(row => row.id_entrada_almacen === newSelectionModel[0]);
      const entrada_encontrada = entrada_relacionada_seleccionada ?? Object;
      set_entrada_relacionada_seleccionada(entrada_encontrada);
    }
  }

  const columns: CustomColumn[] = [
    { field: 'tipo_entrada', headerName: 'Tipo de entrada', minWidth: 120, flex: 1,},
    { field: 'consecutivo', headerName: 'Consecutivo', minWidth: 120, flex: 1,},
    { field: 'fecha_registro', headerName: 'Fecha y hora de registro', minWidth: 120, flex: 1,},
  ];


  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
              {download_xls({ nurseries: data_entradas_relacionadas, columns })}
              {download_pdf({
                  nurseries: data_entradas_relacionadas,
                  columns,
                  title: 'Entradas Relacionadas',
              })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{margin:'15px 0px'}}
        density="compact"
        autoHeight
        rows={data_entradas_relacionadas ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={selecionar_entrada_relacionada}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row?.id_entrada_almacen !== undefined ? row.id_entrada_almacen : uuidv4()}
      />
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default TablaEntradasEspeciales;