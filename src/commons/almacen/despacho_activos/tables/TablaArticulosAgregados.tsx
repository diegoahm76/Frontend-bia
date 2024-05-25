import { Button, ButtonGroup, Grid } from '@mui/material';
import React, { FC } from 'react';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { interface_activos_disponibles, interface_busqueda_articulos, response_activos_disponibles } from '../interfeces/types';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { get_obtener_activos_disponibles } from '../thunks/despacho_solicitudes';
import { control_error } from '../../../../helpers';
import { useAppDispatch } from '../../../../hooks';


interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_busqueda_articulos }) => React.ReactNode;
}

interface props {
  data: interface_busqueda_articulos[];
  set_data: React.Dispatch<React.SetStateAction<interface_busqueda_articulos[]>>;
  set_mostrar_modal_activos_disponibles: React.Dispatch<React.SetStateAction<boolean>>;
  set_data_activos_disponibles: React.Dispatch<React.SetStateAction<interface_activos_disponibles[]>>;
  loadding_tabla_padre: boolean;
  set_loadding_activos_disponibles: React.Dispatch<React.SetStateAction<boolean>>;
  set_id_articulo_seleccionado: React.Dispatch<React.SetStateAction<number>>;
  set_data_activos_agregados: React.Dispatch<React.SetStateAction<interface_activos_disponibles[]>>;
  set_mostrar_tabla_activos_agregados: React.Dispatch<React.SetStateAction<boolean>>;
  despacho_sin_solicitud: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaArticulosAgregados: FC<props> = ({
  data,
  set_data,
  set_mostrar_modal_activos_disponibles,
  set_data_activos_disponibles,
  loadding_tabla_padre,
  set_loadding_activos_disponibles,
  set_id_articulo_seleccionado,
  set_data_activos_agregados,
  set_mostrar_tabla_activos_agregados,
  despacho_sin_solicitud,
}) => {
  const dispatch = useAppDispatch();


  const quitar_articulo = (id_bien: GridRowId) => {
    // eliminamos el articulo de la tabla de articulos agregados
    const new_data = data.filter((item) => item.id_bien !== id_bien);
    // limpiamos el valor de la propiedad articulos_hijos del articulo eliminado
    const articulo_seleccionado = data.find(articulo => articulo.id_bien === id_bien);
    if (articulo_seleccionado) {
      articulo_seleccionado.articulos_hijos = [];
    }
    // actualizamos el estado de la tabla de articulos agregados
    set_data(new_data);
  }

  const buscar_activos_disponibles = async (params: interface_busqueda_articulos) => {
    set_mostrar_modal_activos_disponibles(true);
    set_loadding_activos_disponibles(true);
    set_id_articulo_seleccionado(params.id_bien ?? 0);

    await dispatch(get_obtener_activos_disponibles(params.id_bien))
      .then((response: response_activos_disponibles) => {
        if (Object.keys(response).length !== 0 && response.success === true) {
          if (response.items.length !== 0) {
            set_data_activos_disponibles(response.items);
            set_loadding_activos_disponibles(false);
          } else {
            control_error('No se encontraron bienes');
            set_loadding_activos_disponibles(false);
          }
        } else {
          set_data_activos_disponibles([]);
          set_loadding_activos_disponibles(false);
        }
      }
      )
  }

  const ver_activos_agregados = (row: any) => {
    set_data_activos_agregados(row.articulos_hijos);
    set_mostrar_tabla_activos_agregados(true);
    set_id_articulo_seleccionado(row.id_bien);
  }

  const columns: custom_column[] = [
    {
      field: 'ver_activos', headerName: 'Ver activos', maxWidth: 180, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        <Button
          onClick={() => ver_activos_agregados(params.row)}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<VisibilityIcon />}
          disabled={params.row.articulos_hijos?.length === 0 || !('articulos_hijos' in params.row)}
        >
          Ver activos
        </Button>
      ),
    },
    { field: 'codigo_bien', headerName: 'Código bien', maxWidth: 150, flex: 1 },
    { field: despacho_sin_solicitud ? 'nombre' : 'nombre_bien', headerName: 'Nombre del articulo', width: 150, flex: 1 },
    {
      field: 'cantidad_despachada', headerName: 'Cantidad despachada', maxWidth: 160, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (params.row.articulos_hijos?.length ?? 0),
    },
    {
      field: 'agregar', headerName: 'Agregar activos', maxWidth: 180, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        <SearchIcon
          onClick={() => buscar_activos_disponibles(params.row)}
          style={{ cursor: 'pointer', fontSize: 30 }}
        />
      ),
    },
    {
      field: 'quitar', headerName: 'Quitar', maxWidth: 80, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        <DeleteForeverIcon
          onClick={() => quitar_articulo(params.row?.id_bien ?? 0)}
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
        loading={loadding_tabla_padre}
        rows={data ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(res) => res?.id_bien === undefined ? uuidv4() : res.id_bien}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaArticulosAgregados;