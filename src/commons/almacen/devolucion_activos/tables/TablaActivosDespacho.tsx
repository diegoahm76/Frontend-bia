import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { get_obtener_activos_de_despachos } from '../thunks/devolucion_activos';
import { control_error, control_success } from '../../../../helpers';
import { interface_obtener_activos_de_despachos, interface_tipos_estado_activo } from '../interfaces/types';

interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_obtener_activos_de_despachos }) => React.ReactNode;
}

interface Props {
  accion: string;
  data: interface_obtener_activos_de_despachos[];
  set_data: Dispatch<SetStateAction<interface_obtener_activos_de_despachos[]>>;
  loadding_tabla: boolean;
  tipos_estado_activos: interface_tipos_estado_activo[];
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaActivosDespacho: React.FC<Props> = ({
  accion,
  data,
  set_data,
  loadding_tabla,
  tipos_estado_activos,
}) => {
  const dispatch = useDispatch();

  const [selected_rows, set_selected_rows] = useState<any[]>([]);

  const handle_editar_celdas = (objeto_nuevo: any) => {
    set_data(data.map((activo) => {
      if (activo.id_item_despacho_activo === objeto_nuevo.id_item_despacho_activo) {
        if (activo.cod_estado_activo) {
          return { ...activo, ...objeto_nuevo };
        } else {
          control_error('No se puede agregar una justificación si no se ha seleccionado un estado para el activo.');
        }
      }
      return activo;
    }));
    return { success: true };
  }

  let columns: custom_column[] = [
    { field: 'codigo_bien', headerName: 'Código activo', minWidth: 130, flex: 1, },
    { field: 'nombre_bien', headerName: 'Nombre activo', minWidth: 250, flex: 1, },
    { field: 'nombre_marca', headerName: 'Nombre marca', minWidth: 150, flex: 1, },
    { field: 'id_bien', headerName: 'Identificador de activo', minWidth: 190, flex: 1, },
    { field: 'nombre_bodega', headerName: 'Bodega', minWidth: 200, flex: 1, },
    { field: 'nro_posicion_despacho', headerName: 'Posición en el despacho', minWidth: 180, flex: 1, },
    { field: 'cantidad_solicitada', headerName: 'Cantidad solicitada', minWidth: 140, flex: 1, },
    { field: 'cantidad_despachada', headerName: 'Cantidad despachada', minWidth: 150, flex: 1, },
    {
      field: 'fecha_devolucion', headerName: 'Fecha devolución', minWidth: 140, flex: 1,
      valueFormatter: (params) => params.value !== null ? dayjs(params.value).format('DD/MM/YYYY') : 'Sin dato',
    },
    { field: 'observacion', headerName: 'Observación', minWidth: 350, flex: 1, },
    {
      field: 'ver_activos', headerName: 'Devolución', minWidth: 200, flex: 1, headerAlign: 'center', align: 'center',
      renderCell: (params) => (
        <>
          {/*Mostramos el boton de devolucion si el id no esta en el array selectedRows*/}
          {!selected_rows.includes(params.row.id_item_despacho_activo) && (
            <Button
              type="button"
              variant="contained"
              color="success"
              disabled={accion === 'ver'}
              onClick={() => {
                set_selected_rows(prev_rows => [...prev_rows, params.row.id_item_despacho_activo]); // Agrega el id de la fila al array
              }}
            >
              Devolucionar
            </Button>
          )}

          {/*Mostramos el boton de No devolucionar si el id esta en el array selectedRows*/}
          {selected_rows.includes(params.row.id_item_despacho_activo) && (
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={(event) => {
                // quitamos el id de la fila al array selectedRows
                set_selected_rows(prev_rows => prev_rows.filter((row) => row !== params.row.id_item_despacho_activo));
                // actualizamos el estado del activo a null en la propiedad cod_estado_activo de la fila de setData
                const new_data = data.map((row) => {
                  if (row.id_item_despacho_activo === params.row.id_item_despacho_activo) {
                    return { ...row, cod_estado_activo: null, justificacion_devolucion: null };
                  }
                  return row;
                });
                set_data(new_data);
              }}
            >
              No devolucionar
            </Button>
          )}
        </>
      ),
    },
  ];

  // agregamos con push una columna mas para el boton de devolucion
  if (accion === 'ver' || selected_rows.length !== 0) {
    console.log(accion);
    columns.push(
      {
        field: 'cod_estado_activo', headerName: 'Estado', minWidth: 200, flex: 1, headerAlign: 'center', align: 'center',
        renderCell: (params) => {
          // Solo renderiza el input si esta fila está en el array selectedRows
          if (selected_rows.includes(params.row.id_item_despacho_activo)) {
            return (
              <FormControl required size="small" fullWidth>
                <InputLabel >Estado: </InputLabel>
                <Select
                  label='Estado: '
                  value={params.row.cod_estado_activo ?? ''}
                  disabled={accion === 'ver'}
                  onChange={
                    // actualiza el estado del activo en la propiedad cod_estado_activo de la fila de set_data
                    (event) => {
                      const new_data = data.map((row) => {
                        if (row.id_item_despacho_activo === params.row.id_item_despacho_activo) {
                          return { ...row, cod_estado_activo: event.target.value };
                        }
                        return row;
                      });
                      set_data(new_data);
                    }
                  }
                >
                  {tipos_estado_activos.length !== 0 ?
                    tipos_estado_activos.map((tipo_estado: interface_tipos_estado_activo) => (
                      <MenuItem key={tipo_estado.cod_estado} value={tipo_estado.cod_estado}>
                        {tipo_estado.nombre}
                      </MenuItem>
                    ))
                    :
                    <MenuItem value="">Cargando...</MenuItem>
                  }
                </Select>
              </FormControl>
            );
          }

          if(accion === 'ver'){
            return params.row.cod_estado_activo === 'O' ? 'Óptimo' 
            : params.row.cod_estado_activo === 'D' ? 'Defectuoso' 
            : params.row.cod_estado_activo === 'A' ? 'Averiado' 
            : params.row.cod_estado_activo === '' && null;
          }
          
          return null;
        },
      },
      { field: 'justificacion_devolucion', headerName: 'Justificación', minWidth: 450, flex: 1, headerAlign: 'center', align: 'center', editable: accion !== 'ver' },
    );
  }

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
        processRowUpdate={handle_editar_celdas}
        getRowId={(row) => row?.id_item_despacho_activo !== undefined ? row.id_item_despacho_activo : uuidv4()}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaActivosDespacho;