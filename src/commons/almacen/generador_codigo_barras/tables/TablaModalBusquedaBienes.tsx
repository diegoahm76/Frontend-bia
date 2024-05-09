import React from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { interface_busqueda_bienes } from '../interfaces/types';
import dayjs from 'dayjs';



interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_busqueda_bienes }) => React.ReactNode;
}

interface Props {
  data_bienes: interface_busqueda_bienes[];
  set_data_bien_temp: React.Dispatch<React.SetStateAction<interface_busqueda_bienes>>;
  loadding_tabla: boolean;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaModalBusquedaBienes: React.FC<Props> = ({
  data_bienes,
  set_data_bien_temp,
  loadding_tabla,
}) => {

  const asignar_funcionario = (newSelectionModel: GridSelectionModel) => {
    if (newSelectionModel.length > 0) {
      const dato_seleccionado = data_bienes.find(row => row.id_bien === newSelectionModel[0]);
      const vehiculo_arrendado = dato_seleccionado ?? Object;
      set_data_bien_temp(vehiculo_arrendado);
    }
  }

  const columns: CustomColumn[] = [
    { field: 'estado', headerName: 'Estado bien', minWidth: 120, flex: 1, },
    { field: 'codigo_bien', headerName: 'Código bien', minWidth: 120, flex: 1, },
    { field: 'nombre_bien', headerName: 'Nombre', minWidth: 250, flex: 1, },
    { field: 'identificador_bien', headerName: 'N° Identificador unico', minWidth: 160, flex: 1, },
    { field: 'fecha_ingreso', headerName: 'Fecha de ingreso', minWidth: 120, flex: 1,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    { field: 'nombre_marca', headerName: 'Marca', minWidth: 120, flex: 1, },
    { field: 'cod_tipo_bien', headerName: 'Tipo bien', minWidth: 120, flex: 1,
      renderCell: (params) => params.row.cod_tipo_bien === 'A' ? 'Activo fijo' : 'Consumo',
    },
    { field: 'ubicacion', headerName: 'Ubicación bodega', minWidth: 180, flex: 1, },
  ];

  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
            {download_xls({ nurseries: data_bienes, columns })}
            {download_pdf({
              nurseries: data_bienes,
              columns,
              title: 'Bienes encontrados',
            })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{ margin: '15px 0px' }}
        density="compact"
        autoHeight
        loading={loadding_tabla}
        rows={data_bienes ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={asignar_funcionario}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row?.id_bien !== undefined ? row.id_bien : uuidv4()}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaModalBusquedaBienes;