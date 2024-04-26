import { Button, ButtonGroup, Grid } from '@mui/material';
import React from 'react';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { interface_activos_asociados } from '../interfaces/types';



interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_activos_asociados }) => React.ReactNode;
}


interface props {
  data_activos_asociados: interface_activos_asociados[];
  set_data_activos_asociados: React.Dispatch<React.SetStateAction<interface_activos_asociados[]>>;
  set_data_activos_asociados_agregados: React.Dispatch<React.SetStateAction<interface_activos_asociados[]>>;
  loadding_tabla_activos_asociados: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaActivosAsociados: React.FC<props> = ({
  data_activos_asociados,
  set_data_activos_asociados,
  set_data_activos_asociados_agregados,
  loadding_tabla_activos_asociados,
  }) => {
    

  const agregar_activos = (params: interface_activos_asociados) => {
    // agregamos el activos a la lista de activos agregados, y quitarlo de la lista de activos asociados
    set_data_activos_asociados_agregados((prev)=>[{
      ...params,
    }, ...prev]);
    set_data_activos_asociados(data_activos_asociados.filter(row => row.id_inventario !== params.id_inventario));
  }

  const agregar_todos_los_activos_asociados = () => {
    // agregamos todos los activos a la lista de activos agregados, y quitarlos de la lista de activos asociados
    set_data_activos_asociados_agregados((prev)=>[...data_activos_asociados, ...prev]);
    set_data_activos_asociados([]);
  }

  const columns: CustomColumn[] = [
    { field: 'codigo_bien', headerName: 'Código', minWidth: 120, flex: 1,},
    { field: 'nombre_bien', headerName: 'Nombre del articulos', minWidth: 120, flex: 1,},
    { field: 'identificador_bien', headerName: 'Identificador Único', minWidth: 120, flex: 1,},
    { field: 'nombre_marca', headerName: 'Marca', minWidth: 120, flex: 1,},
    { field: 'valor_unitario', headerName: 'Valor', minWidth: 120, flex: 1,},
    { field: 'estado', headerName: 'Estado', minWidth: 120, flex: 1,},
    { field: 'add', headerName: 'Agregar', maxWidth: 80, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        return (
          <ControlPointIcon style={{cursor: 'pointer', fontSize: '30px', color: 'green'}} onClick={() => agregar_activos(params.row)} />
        );
      }
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
              {download_xls({ nurseries: data_activos_asociados, columns })}
              {download_pdf({
                  nurseries: data_activos_asociados,
                  columns,
                  title: 'Activos Asociados',
              })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{margin:'15px 0px'}}
        density="compact"
        autoHeight
        loading={loadding_tabla_activos_asociados}
        rows={data_activos_asociados ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row?.id_inventario !== undefined ? row.id_inventario : uuidv4()}
        isRowSelectable={()=>false}
      />

      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
          <Grid item xs={12} md={3} >
            <Button
              fullWidth
              color="success"
              disabled={data_activos_asociados.length === 0}
              variant="contained"
              startIcon={<PlaylistAddIcon />}
              onClick={agregar_todos_los_activos_asociados}
            >
              Agregar Todos
            </Button>
          </Grid>
      </Grid>
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default TablaActivosAsociados;