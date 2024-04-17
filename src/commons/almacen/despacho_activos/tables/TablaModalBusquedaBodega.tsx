import React from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { interface_busqueda_bodegas } from '../interfeces/types';

interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_busqueda_bodegas }) => React.ReactNode;
}

interface Props {
  data_bodegas: interface_busqueda_bodegas[];
  set_data_bodega_seleccionada_temp: React.Dispatch<React.SetStateAction<interface_busqueda_bodegas>>;
  loadding_tabla: boolean;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaModalBusquedaBodega: React.FC<Props> = ({
  data_bodegas,
  set_data_bodega_seleccionada_temp,
  loadding_tabla,
}) => {

  const asignar_bodega_seleccionada = (newSelectionModel: GridSelectionModel) => {
    if (newSelectionModel.length > 0) {
      const bodega_seleccionado = data_bodegas.find(row => row.id_bodega === newSelectionModel[0]);
      const bodega = bodega_seleccionado ?? Object;
      set_data_bodega_seleccionada_temp(bodega);
    }
  }

  const columns: CustomColumn[] = [
    { field: 'nombre_municipio', headerName: 'Munucipio', minWidth: 120, flex: 1},
    { field: 'nombre', headerName: 'Nombre bodega', minWidth: 120, flex: 1},
    { field: 'direccion', headerName: 'Dirección bodega', minWidth: 120, flex: 1},
    { field: 'es_principal', headerName: '¿Es principal?', minWidth: 120, flex: 1,
      renderCell: (params) => params.row.es_principal ? 'Si' : 'No'
    }, 
    { field: 'item_ya_usado', headerName: '¿Item ya usado?', minWidth: 120, flex: 1,
      renderCell: (params) => params.row.item_ya_usado ? 'Si' : 'No'
    },
  ];

  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
              {download_xls({ nurseries: data_bodegas, columns })}
              {download_pdf({
                  nurseries: data_bodegas,
                  columns,
                  title: 'Bodegas registradas en el sistema',
              })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{margin:'15px 0px'}}
        density="compact"
        autoHeight
        loading={loadding_tabla}
        rows={data_bodegas ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={asignar_bodega_seleccionada}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row?.id_bodega !== undefined ? row.id_bodega : uuidv4()}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaModalBusquedaBodega;