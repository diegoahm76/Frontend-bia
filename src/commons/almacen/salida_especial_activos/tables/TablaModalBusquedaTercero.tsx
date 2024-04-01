import React from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { interface_inf_tercero } from '../interfaces/types';

interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_inf_tercero }) => React.ReactNode;
}

interface Props {
  data_funcionarios_terceros: interface_inf_tercero[];
  set_funcionario_tercero_temp: React.Dispatch<React.SetStateAction<interface_inf_tercero>>;
  loadding_tabla: boolean;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaModalBusquedaTercero: React.FC<Props> = ({
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
    { field: 'tipo_persona', headerName: 'Tipo de persona', minWidth: 120, flex: 1,
      renderCell: (params) => params.row.tipo_persona === 'J' ? 'Jurídica' : 'Natural',
    },
    { field: 'numero_documento', headerName: 'Número de documento', minWidth: 120, flex: 1,},
    { field: 'primer_nombre', headerName: 'Primer nombre', minWidth: 90, flex: 1,
      renderCell: (params) => params.row.primer_nombre
    },
    { field: 'segundo_nombre', headerName: 'Segundo nombre', minWidth: 90, flex: 1,
      renderCell: (params) => params.row.segundo_nombre ?? '',
    },
    { field: 'primer_apellido', headerName: 'Apellidos', minWidth: 120, flex: 1,
      renderCell: (params) => {
        return `${params.row.primer_apellido ?? ''} ${params.row.segundo_apellido ?? ''}`
      },
    },
    { field: 'nombre_clase_tercero', headerName: 'Clase tercero', minWidth: 120, flex: 1,},
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
export default TablaModalBusquedaTercero;