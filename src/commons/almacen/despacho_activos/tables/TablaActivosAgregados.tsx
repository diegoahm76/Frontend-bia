import { ButtonGroup, Grid } from '@mui/material';
import React, { FC } from 'react';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { interface_activos_disponibles, interface_busqueda_articulos } from '../interfeces/types';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_activos_disponibles }) => React.ReactNode;
}

interface props {
  data: interface_activos_disponibles[];
  set_data: React.Dispatch<React.SetStateAction<interface_activos_disponibles[]>>;
  data_articulos_agregados_padres: interface_busqueda_articulos[];
  set_data_articulos_agregados_padres: React.Dispatch<React.SetStateAction<interface_busqueda_articulos[]>>;
  id_articulo_seleccionado: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaActivosAgregados: FC<props> = ({
  data,
  set_data,
  id_articulo_seleccionado,
  data_articulos_agregados_padres,
  set_data_articulos_agregados_padres,
}) => {

  const quitar_articulo = (id_bien_despachado: GridRowId) => {
    // Buscamos el id_articulo_seleccionado en data_articulos_agregados_padres para eliminar el activos de la propiedad articulos_hijos
    const articulo_seleccionado = data_articulos_agregados_padres.find(articulo => articulo.id_bien === id_articulo_seleccionado);
    if (articulo_seleccionado) {
      // eliminamos el activo de la propiedad articulos_hijos con el actualizador set_data_articulos_agregados_padres
      articulo_seleccionado.articulos_hijos = articulo_seleccionado.articulos_hijos.filter((item) => item.id_bien_despachado !== id_bien_despachado);
      set_data_articulos_agregados_padres([...data_articulos_agregados_padres]);
    }
    // eliminamos el activo de la tabla de activos agregados
    const new_data = data.filter((item) => item.id_bien_despachado !== id_bien_despachado);
    // actualizamos el estado de la tabla de activos agregados
    set_data(new_data);
  }

  const columns: custom_column[] = [
    { field: 'codigo_bien_espachado', headerName: 'Código bien', maxWidth: 150, flex: 1 },
    { field: 'nombre_bien_espachado', headerName: 'Nombre de articulo despachado', width: 150, flex: 1 },
    // { field: 'id_bien_despachado', headerName: 'Identificador del Activo', width: 150, flex: 1 },
    { field: 'nombre_bodega', headerName: 'Bodega', width: 150, flex: 1 },
    { field: 'cantidad_despachada', headerName: 'Cantidad de articulos Despachado', width: 150, flex: 1, align: 'center', headerAlign: 'center' },
    {field: 'cod_tipo_bien', headerName:'Tipo de bien', width:150, flex:1, renderCell: (params: any) => (
      params.row?.cod_tipo_bien === 'A' ? 'Activo' : 'Consumo'
    )},
    {field: 'doc_identificador_nro', headerName:'Placa / Serial', width:150, flex:1},
    {field: 'marca', headerName:'Marca', width:150, flex:1},
    {field: 'descripcion', headerName:'Descripción', width:200, flex:1},
    { field: 'observaciones', headerName: 'Observación', width: 200, flex: 1 },
    {
      field: 'quitar', headerName: 'Quitar', maxWidth: 80, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        <DeleteForeverIcon
          onClick={() => quitar_articulo(params.row.id_bien_despachado)}
          style={{ cursor: 'pointer', color: 'red', fontSize: 30 }}
        />
      ),
    },
  ]


  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item sx={{ cursor: 'pointer' }}>
          <ButtonGroup style={{ margin: 5, }}>
            {download_xls({ nurseries: data, columns })}
            {download_pdf({
              nurseries: data,
              columns,
              title: 'Bienes de baja',
            })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{ margin: '15px 0px' }}
        density="compact"
        autoHeight
        rows={data ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(res) => res?.id_bien_despachado === undefined ? uuidv4() : res.id_bien_despachado}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaActivosAgregados;