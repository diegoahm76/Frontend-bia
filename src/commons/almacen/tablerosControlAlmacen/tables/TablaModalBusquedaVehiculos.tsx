import React from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { interface_busqueda_vehiculos } from '../interfaces/types';

interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_busqueda_vehiculos }) => React.ReactNode;
}

interface Props {
  data_vehiculos_obtenidos: interface_busqueda_vehiculos[];
  set_vehiculo_seleccionado_temp: React.Dispatch<React.SetStateAction<interface_busqueda_vehiculos>>;
  loadding_tabla: boolean;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaModalBusquedaVehiculos: React.FC<Props> = ({
  data_vehiculos_obtenidos,
  set_vehiculo_seleccionado_temp,
  loadding_tabla,
}) => {

  const asignar_funcionario_tercero = (newSelectionModel: GridSelectionModel) => {
    if (newSelectionModel.length > 0) {
      const persona_tercero_seleccionado = data_vehiculos_obtenidos.find(row => row.id_hoja_de_vida === newSelectionModel[0]);
      const persona_tercero = persona_tercero_seleccionado ?? Object;
      set_vehiculo_seleccionado_temp(persona_tercero);
    }
  }

  const columns: CustomColumn[] = [
    { field: 'consecutivo', headerName: 'Consecutivo', minWidth: 120, flex: 1,},
    { field: 'codigo_bien', headerName: 'Código bien', minWidth: 120, flex: 1,},
    { field: 'nombre', headerName: 'Nombre del vehículo', minWidth: 120, flex: 1,},
    { field: 'placa', headerName: 'Placa del vehículo', minWidth: 120, flex: 1,},
    { field: 'marca', headerName: 'Marca', minWidth: 120, flex: 1,},
    { field: 'tipo_vehiculo', headerName: 'Tipo Vehículo', minWidth: 120, flex: 1,},
    { field: 'nombre_contratista', headerName: 'Nombre del contratista', minWidth: 130, flex: 1,},
    { field: 'color', headerName: 'Color', minWidth: 120, flex: 1,},
    { field: 'fecha_circulacion', headerName: 'Fecha circulación', minWidth: 120, flex: 1,},
    { field: 'indicaciones_destino', headerName: 'Indicaciones Destino', minWidth: 200, flex: 1,},
    { field: 'nombre_estado', headerName: 'Estado', minWidth: 120, flex: 1,},
  ];

  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
              {download_xls({ nurseries: data_vehiculos_obtenidos, columns })}
              {download_pdf({
                  nurseries: data_vehiculos_obtenidos,
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
        rows={data_vehiculos_obtenidos ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={asignar_funcionario_tercero}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row?.id_hoja_de_vida !== undefined ? row.id_hoja_de_vida : uuidv4()}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaModalBusquedaVehiculos;