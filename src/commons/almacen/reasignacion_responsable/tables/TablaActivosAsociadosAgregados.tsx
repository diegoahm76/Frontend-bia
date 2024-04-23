import { ButtonGroup, Grid } from '@mui/material';
import React from 'react';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { interface_activos_asociados } from '../interfaces/types';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';



interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_activos_asociados }) => React.ReactNode;
}


interface props {
  data_activos_asociados_agregados: interface_activos_asociados[];
  set_data_activos_asociados_agregados: React.Dispatch<React.SetStateAction<interface_activos_asociados[]>>;
  set_data_activos_asociados: React.Dispatch<React.SetStateAction<interface_activos_asociados[]>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaActivosAsociadosAgregados: React.FC<props> = ({
  data_activos_asociados_agregados,
  set_data_activos_asociados_agregados,
  set_data_activos_asociados,
}) => {

  const quitamos_activos_agregados = (params: interface_activos_asociados) => {
    // quitamos el activo de la lista de activos agregados, y lo agregamos a la lista de activos asociados
    set_data_activos_asociados((prev) => [{
      ...params,
    }, ...prev]);
    set_data_activos_asociados_agregados(data_activos_asociados_agregados.filter(row => row.id_inventario !== params.id_inventario));
  }

  let columns: custom_column[] = [
    { field: 'codigo_bien', headerName: 'Código', minWidth: 120, flex: 1,},
    { field: 'nombre_bien', headerName: 'Nombre del articulos', minWidth: 120, flex: 1,},
    { field: 'identificador_bien', headerName: 'Identificador Único', minWidth: 120, flex: 1,},
    { field: 'nombre_marca', headerName: 'Marca', minWidth: 120, flex: 1,},
    { field: 'valor_unitario', headerName: 'Valor', minWidth: 120, flex: 1,},
    { field: 'estado', headerName: 'Estado', minWidth: 120, flex: 1,},
    {
      field: 'remove', headerName: 'Quitar', maxWidth: 80, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        return (
          <RemoveCircleOutlineIcon style={{ cursor: 'pointer', fontSize: '30px', color: 'red' }} onClick={() => quitamos_activos_agregados(params.row)} />
        );
      }
    }
  ];

    return (
      <>
        <Grid item xs={12} container
          direction="row"
          justifyContent="flex-end"
          alignItems="center" >
          <Grid item  >
            <ButtonGroup style={{ margin: 5, }}>
              {download_xls({ nurseries: data_activos_asociados_agregados, columns })}
              {download_pdf({
                nurseries: data_activos_asociados_agregados,
                columns,
                title: 'Activos Asociados Agregados',
              })}
            </ButtonGroup>
          </Grid>
        </Grid>

        <DataGrid
          style={{ margin: '15px 0px' }}
          density="compact"
          autoHeight
          rows={data_activos_asociados_agregados ?? []}
          columns={columns ?? []}
          pageSize={5}
          rowHeight={75}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
          getRowId={(row) => row?.id_inventario !== undefined ? row.id_inventario : uuidv4()}
          isRowSelectable={() => false}
        />
      </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaActivosAsociadosAgregados;