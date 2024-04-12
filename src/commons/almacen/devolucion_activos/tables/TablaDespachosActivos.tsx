import React, { Dispatch, SetStateAction } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { interface_obtener_activos_de_despachos, interface_obtener_despacho_activos, response_obtener_activos_de_despachos } from '../interfaces/types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { get_obtener_activos_de_despachos } from '../thunks/devolucion_activos';
import { control_error, control_success } from '../../../../helpers';

interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_obtener_despacho_activos }) => React.ReactNode;
}

interface Props {
  data: interface_obtener_despacho_activos[];
  loadding_tabla: boolean;
  set_data_activos_despachos: Dispatch<SetStateAction<interface_obtener_activos_de_despachos[]>>;
  set_loadding_tabla_activos_despachos: Dispatch<SetStateAction<boolean>>;
  set_mostrar_tabla_activos_despachos: Dispatch<SetStateAction<boolean>>;
  set_id_despacho_activo_seleccionado: Dispatch<SetStateAction<number>>;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaDespachosActivos: React.FC<Props> = ({
  data,
  loadding_tabla,
  set_data_activos_despachos,
  set_loadding_tabla_activos_despachos,
  set_mostrar_tabla_activos_despachos,
  set_id_despacho_activo_seleccionado,
}) => {
  const dispatch = useDispatch();

  const obtener_activos = (id_despacho_activo: string) => {
    set_id_despacho_activo_seleccionado(parseInt(id_despacho_activo));
    set_mostrar_tabla_activos_despachos(true);
    set_loadding_tabla_activos_despachos(true);
    dispatch(get_obtener_activos_de_despachos(id_despacho_activo.toString()))
      .then((response: response_obtener_activos_de_despachos) => {
        if (Object.keys(response).length !== 0) {
          if (response.data.length !== 0) {
            set_data_activos_despachos(response.data);
            set_loadding_tabla_activos_despachos(false);
            control_success('Activos obtenidos correctamente');
          } else {
            set_loadding_tabla_activos_despachos(false);
            set_data_activos_despachos([]);
            control_error('No se encontraron activos en este despacho');
          }
        } else {
          set_loadding_tabla_activos_despachos(false);
          control_error('Error en el servidor al obtener los activos del despacho');
        }
      });
  }

  const columns: CustomColumn[] = [
    { field: 'id_despacho_activo', headerName: 'Id despacho', maxWidth: 110, minWidth: 110, flex: 1, },
    {
      field: 'fecha_despacho', headerName: 'Fecha despacho', maxWidth: 120, minWidth: 120, flex: 1,
      renderCell: (params) => (dayjs(params.row.fecha_despacho).format('DD/MM/YYYY')),
    },
    { field: 'nombre_persona_despacha', headerName: 'Persona que despachó', minWidth: 300, flex: 1, },
    { field: 'nombre_bodega', headerName: 'Bodega', minWidth: 160, flex: 1, },
    { field: 'observacion', headerName: 'Observación', minWidth: 380, flex: 1, },
    { field: 'tipo_solicitud', headerName: 'Tipo de solicitud', minWidth: 300, flex: 1, },
    {
      field: 'fecha_solicitud', headerName: 'Fecha solicitud', maxWidth: 120, minWidth: 120, flex: 1,
      renderCell: (params) => (dayjs(params.row.fecha_solicitud).format('DD/MM/YYYY')),
    },
    {
      field: 'ver_activos', headerName: 'Ver activos', minWidth: 170, flex: 1, headerAlign: 'center', align: 'center',
      renderCell: (params) => (
        <Button
          type="button"
          variant="contained"
          color="primary"
          startIcon={<VisibilityIcon />}
          onClick={() => { obtener_activos(params.row.id_despacho_activo.toString())}}
        >
          Ver activos
        </Button>
      ),
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
            {download_xls({ nurseries: data, columns })}
            {download_pdf({
              nurseries: data,
              columns,
              title: 'Despachos activos',
            })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{ margin: '15px 0px' }}
        density="compact"
        autoHeight
        loading={loadding_tabla}
        rows={data ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row?.id_despacho_activo !== undefined ? row.id_despacho_activo : uuidv4()}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaDespachosActivos;