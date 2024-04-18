import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { control_error, control_success } from '../../../../helpers';
import Swal from 'sweetalert2';
import { interface_despachos_sin_solicitud, interface_solicitud_por_id, response_solicitud_por_id } from '../interfeces/types';
import { get_resumen_sin_solicitud, put_anular_despacho_sin_solicitud } from '../thunks/despacho_solicitudes';

interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_despachos_sin_solicitud }) => React.ReactNode;
}

interface Props {
  set_accion: React.Dispatch<React.SetStateAction<string>>;
  data_despachos_sin_solicitud: interface_despachos_sin_solicitud[];
  loadding_tabla_solicitudes: boolean;
  get_obtener_despachos_sin_solictud_fc: () => void;
  set_data_solicitud_ver_por_id: React.Dispatch<React.SetStateAction<interface_solicitud_por_id>>;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaDespachosSinSolicitudes: React.FC<Props> = ({
  set_accion,
  data_despachos_sin_solicitud,
  loadding_tabla_solicitudes,
  get_obtener_despachos_sin_solictud_fc,
  set_data_solicitud_ver_por_id,
}) => {
  const dispatch = useAppDispatch();


  const aprobar_solicitud = (solicitud: interface_despachos_sin_solicitud) => {
    Swal.fire({
      title: '¿Esta seguro de aprobar la solicitud?',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then(async (result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        return true;
      } else if (result.isDenied) {
        return false;
      }
    });
  }

  const rechazar_solicitud = (row: interface_despachos_sin_solicitud) => {
    Swal.fire({
      title: '¿Está seguro de rechazar la solicitud?',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then(async(result: any) => {
      if (result.isConfirmed) {
        await dispatch(put_anular_despacho_sin_solicitud(row.id_despacho_activo))
          .then((response: any) => {
            if (Object.keys(response).length !== 0) {
              if (response.length !== 0) {
                control_success('Solicitud rechazada correctamente');
                get_obtener_despachos_sin_solictud_fc();
              } else {
                control_error('No se pudo rechazar la solicitud');
              }
            } else {
              control_error('Error en el servidor al intentar rechazar la solicitud');
            }
          }
          );
        return true;
      }
    });
  }

  const ver_solicitud = (row: any) => {
    set_accion('ver');
    dispatch(get_resumen_sin_solicitud(row.id_despacho_activo))
      .then((response: response_solicitud_por_id) => {
        if (Object.keys(response).length !== 0) {
          if (response.success) {
            control_success('Solicitud encontrada correctamente');
            set_data_solicitud_ver_por_id(response.data);
          } else {
            control_error('No se pudo encontrar la solicitud');
            set_data_solicitud_ver_por_id({} as interface_solicitud_por_id);
          }
        } else {
          control_error('Hubo un error al intentar encontrar la solicitud');
          set_data_solicitud_ver_por_id({} as interface_solicitud_por_id)
        }
      })
  }


  const columns: CustomColumn[] = [
    {
      field: 'estado_despacho', headerName: 'Estado', minWidth: 140, flex: 1,
      renderCell: (params) => (
        params.row.estado_despacho === 'Ep' ? 'En Espera'
          : params.row.estado_despacho === 'Ac' ? 'Aceptada'
            : params.row.estado_despacho === 'Re' ? 'Rechazada'
              : params.row.estado_despacho === 'An' && 'Anulada'
      )
    },
    {
      field: 'fecha_despacho', headerName: 'Fecha despacho', minWidth: 150, flex: 1,
      renderCell: (params) => (dayjs(params.row.fecha_despacho).format('DD/MM/YYYY'))
    },
    { field: 'observacion', headerName: 'Observación', minWidth: 300, flex: 1, },
    { field: 'nombre_persona_despacha', headerName: 'Operario', minWidth: 300, flex: 1 },
    { field: 'nombre_persona_despachaa', headerName: 'Persona responsable', minWidth: 300, flex: 1 },
    { field: 'numero_activos', headerName: 'N° de activos', minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
    {
      field: 'rechazar', headerName: 'Rechazar', maxWidth: 80, minWidth: 80, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        params.row.estado_despacho === 'Ep' &&
        <HighlightOffIcon
          onClick={() => rechazar_solicitud(params.row)}
          sx={{ fontSize: '30px', cursor: 'pointer', color: '#c62828' }} />
      )
    },
    {
      field: 'editar', headerName: 'Ver', maxWidth: 70, minWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        <VisibilityIcon
          onClick={() => ver_solicitud(params.row)}
          sx={{ fontSize: '30px', cursor: 'pointer' }} />
      )
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
            {download_xls({ nurseries: data_despachos_sin_solicitud, columns })}
            {download_pdf({
              nurseries: data_despachos_sin_solicitud,
              columns,
              title: 'Solicitudes realizadas',
            })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{ margin: '15px 0px' }}
        density="compact"
        autoHeight
        loading={loadding_tabla_solicitudes}
        rows={data_despachos_sin_solicitud ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={() => {
          try {
            return uuidv4();
          } catch (error) {
            console.error(error);
            //? Genera un ID de respaldo único
            return `fallback-id-${Date.now()}-${Math.random()}`;
          }
        }}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaDespachosSinSolicitudes;