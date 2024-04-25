import React from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { interface_busqueda_persona_solicita } from '../interfaces/types';



interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_busqueda_persona_solicita }) => React.ReactNode;
}

interface Props {
  data_personas_responsable: interface_busqueda_persona_solicita[];
  set_data_persona_solicita_temp: React.Dispatch<React.SetStateAction<interface_busqueda_persona_solicita>>;
  loadding_tabla: boolean;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaModalBusquedaPersona: React.FC<Props> = ({
  data_personas_responsable,
  set_data_persona_solicita_temp,
  loadding_tabla,
}) => {

  const asignar_funcionario = (newSelectionModel: GridSelectionModel) => {
    if (newSelectionModel.length > 0) {
      const vehiculo_seleccionado = data_personas_responsable.find(row => row.id_persona === newSelectionModel[0]);
      const vehiculo_arrendado = vehiculo_seleccionado ?? Object;
      set_data_persona_solicita_temp(vehiculo_arrendado);
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

  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
            {download_xls({ nurseries: data_personas_responsable, columns })}
            {download_pdf({
              nurseries: data_personas_responsable,
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
        rows={data_personas_responsable ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={asignar_funcionario}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row?.id_persona !== undefined ? row.id_persona : uuidv4()}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaModalBusquedaPersona;