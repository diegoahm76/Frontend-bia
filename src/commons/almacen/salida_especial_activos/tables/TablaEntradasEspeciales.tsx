import { ButtonGroup, Grid } from '@mui/material';
import React from 'react';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';



interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: any }) => React.ReactNode;
}


interface props {
  data_funcionarios_terceros: any[];
  set_funcionario_tercero_temp: React.Dispatch<React.SetStateAction<any>>;
  loadding_tabla: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaEntradasEspeciales: React.FC<props> = ({
  data_funcionarios_terceros,
  set_funcionario_tercero_temp,
  loadding_tabla,
  }) => {


  const asignar_funcionario_tercero = (newSelectionModel: GridSelectionModel) => {
    if (newSelectionModel.length > 0) {
      const persona_tercero_seleccionado = data_funcionarios_terceros.find(row => row.id_clase_tercero_persona === newSelectionModel[0]);
      const persona_tercero = persona_tercero_seleccionado ?? Object;
      set_funcionario_tercero_temp(persona_tercero);
    }
  }

  const columns: CustomColumn[] = [
    { field: 'tipo_entrada', headerName: 'Tipo de entrada', minWidth: 120, flex: 1,},
    { field: 'consetivo', headerName: 'Consecutivo', minWidth: 120, flex: 1,},
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
              {download_xls({ nurseries: data_funcionarios_terceros, columns })}
              {download_pdf({
                  nurseries: data_funcionarios_terceros,
                  columns,
                  title: 'Funcionarios Responsables',
              })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{margin:'15px 0px'}}
        density="compact"
        autoHeight
        loading={loadding_tabla}
        rows={data_funcionarios_terceros ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={asignar_funcionario_tercero}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row?.id_clase_tercero_persona !== undefined ? row.id_clase_tercero_persona : uuidv4()}
      />
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default TablaEntradasEspeciales;