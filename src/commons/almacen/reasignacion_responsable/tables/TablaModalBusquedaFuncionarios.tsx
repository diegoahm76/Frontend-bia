import React from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { interface_busqueda_operario, interface_busqueda_responsable } from '../interfaces/types';

interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_busqueda_responsable }) => React.ReactNode;
}

interface Props {
  tipo_funcionario: string;
  data_funcionarios_responsables: interface_busqueda_responsable[];
  set_funcionario_responsable_reasignado_temp: React.Dispatch<React.SetStateAction<interface_busqueda_responsable>>;
  set_funcionario_responsable_actual_temp: React.Dispatch<React.SetStateAction<interface_busqueda_responsable>>;
  data_funcionarios_operarios: interface_busqueda_operario[];
  set_funcionario_operario_temp: React.Dispatch<React.SetStateAction<interface_busqueda_operario>>;
  loadding_tabla: boolean;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaModalBusquedaFuncionarios: React.FC<Props> = ({
  tipo_funcionario,
  data_funcionarios_responsables,
  data_funcionarios_operarios,
  set_funcionario_operario_temp,
  set_funcionario_responsable_actual_temp,
  set_funcionario_responsable_reasignado_temp,
  loadding_tabla,
}) => {

  const asignar_funcionario_seleccionado = (newSelectionModel: GridSelectionModel) => {
    if (tipo_funcionario === 'actual') {
      if (newSelectionModel.length > 0) {
        const funcionario_encontrado = data_funcionarios_responsables.find(row => row.id_persona === newSelectionModel[0]);
        const funcionario = funcionario_encontrado ?? Object;
        set_funcionario_responsable_actual_temp(funcionario);
      }
    }
    if(tipo_funcionario === 'reasignado'){
      if (newSelectionModel.length > 0) {
        const funcionario_encontrado = data_funcionarios_responsables.find(row => row.id_persona === newSelectionModel[0]);
        const funcionario = funcionario_encontrado ?? Object;
        set_funcionario_responsable_reasignado_temp(funcionario);
      }
    }
    if (tipo_funcionario === 'operario') {
      if (newSelectionModel.length > 0) {
        const funcionario_encontrado = data_funcionarios_operarios.find(row => row.id_persona === newSelectionModel[0]);
        const funcionario = funcionario_encontrado ?? Object;
        set_funcionario_operario_temp(funcionario);
      }
    }
  }

  const columns: CustomColumn[] = [
    {
      field: 'tipo_persona', headerName: 'Tipo de persona', minWidth: 120, flex: 1,
      renderCell: (params) => params.row.tipo_persona === 'J' ? 'Jurídica' : 'Natural',
    },
    { field: 'numero_documento', headerName: 'Número de documento', minWidth: 120, flex: 1, },
    {
      field: 'primer_nombre', headerName: 'Nombres', minWidth: 120, flex: 1,
      renderCell: (params) => params.row.primer_nombre ?? '' + ' ' + params.row.segundo_nombre ?? '',
    },
    {
      field: 'primer_apellido', headerName: 'Apellidos', minWidth: 120, flex: 1,
      renderCell: (params) => params.row.primer_apellido ?? '' + ' ' + params.row.segundo_apellido ?? '',
    },
    { field: 'razon_social', headerName: 'Razón social', minWidth: 120, flex: 1, },
    { field: 'nombre_comercial', headerName: 'Nombre comercial', minWidth: 120, flex: 1, },
  ];

  console.log(data_funcionarios_responsables);
  

  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
            {download_xls({ nurseries: data_funcionarios_responsables, columns })}
            {download_pdf({
              nurseries: data_funcionarios_responsables,
              columns,
              title: 'Funcionarios Responsables',
            })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{ margin: '15px 0px' }}
        density="compact"
        autoHeight
        loading={loadding_tabla}
        rows={tipo_funcionario === 'actual' || tipo_funcionario === 'reasignado' ? (data_funcionarios_responsables ?? []) : (data_funcionarios_operarios ?? [])}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={asignar_funcionario_seleccionado}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row?.id_persona !== undefined ? row.id_persona : uuidv4()}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaModalBusquedaFuncionarios;