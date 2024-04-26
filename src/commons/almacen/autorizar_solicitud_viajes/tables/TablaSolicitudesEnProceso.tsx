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
import { interface_obtener_solicitudes, interface_resumen_solicitud, response_resumen_solicitud } from '../interfaces/types';
import { get_resumen_solicitud, put_aprobar_solicitud } from '../thunks/autorizar_solicitud_viajes';



interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_obtener_solicitudes }) => React.ReactNode;
}

interface Props {
  set_accion: React.Dispatch<React.SetStateAction<string>>;
  set_id_solicitud: React.Dispatch<React.SetStateAction<number | null>>;
  data_solicitudes_realizadas: interface_obtener_solicitudes[];
  loadding_tabla_solicitudes: boolean;
  get_obtener_solicitudes_fc: () => void;
  set_data_resumen_solicitud: React.Dispatch<React.SetStateAction<interface_resumen_solicitud>>;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaSolicitudesEnProceso: React.FC<Props> = ({
  set_accion,
  data_solicitudes_realizadas,
  loadding_tabla_solicitudes,
  get_obtener_solicitudes_fc,
  set_id_solicitud,
  set_data_resumen_solicitud,
}) => {
  const dispatch = useAppDispatch();


  const aprobar_solicitud = (solicitud: interface_obtener_solicitudes) => {
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
        dispatch(put_aprobar_solicitud(solicitud.id_solicitud_viaje))
          .then((response: any) => {
            if (Object.keys(response).length !== 0) {
              if (response.success) {
                control_success('Solicitud aprobada');
                get_obtener_solicitudes_fc();
              } else {
                control_error('No se pudo aprobar la solicitud');
                get_obtener_solicitudes_fc();
              }
            } else {
              control_error('Hubo un error al intentar aprobar la solicitud');
            }
          })
        return true;
      } else if (result.isDenied) {
        return false;
      }
    });
  }

  const rechazar_solicitud = (solicitud: interface_obtener_solicitudes) => {
    set_id_solicitud(solicitud.id_solicitud_viaje);
    set_accion('rechazar');
  }

  const ver_solicitud = (solicitud: any) => {
    set_accion('ver');

    dispatch(get_resumen_solicitud(solicitud.id_solicitud_viaje))
      .then((response: response_resumen_solicitud) => {
        if (Object.keys(response).length !== 0) {
          if (response.success) {
            control_success('Solicitud encontrada correctamente');
            set_data_resumen_solicitud(response.data);
          } else {
            control_error('No se pudo encontrar la solicitud');
            set_data_resumen_solicitud({} as interface_resumen_solicitud);
          }
        } else {
          control_error('Hubo un error al intentar encontrar la solicitud');
          set_data_resumen_solicitud({} as interface_resumen_solicitud)
        }
      })
  }


  const columns: CustomColumn[] = [
    {
      field: 'estado_solicitud', headerName: 'Estado', minWidth: 140, flex: 1,
      renderCell: (params) => (
        params.row.estado_solicitud === 'ES' ? 'En espera'
          : params.row.estado_solicitud === 'RE' ? 'Respondida'
            : params.row.estado_solicitud === 'RC' ? 'Rechazada'
              : params.row.estado_solicitud === 'FN' ? 'Finalizada'
                : params.row.estado_solicitud === 'AP' && 'Aprobada'
      )
    },
    {
      field: 'fecha_solicitud', headerName: 'Fecha solicitud', minWidth: 150, flex: 1,
      renderCell: (params) => (dayjs(params.row.fecha_solicitud).format('DD/MM/YYYY'))
    },
    { field: 'nro_pasajeros', headerName: 'N° pasajeros', minWidth: 135, maxWidth: 135, flex: 1, },
    {
      field: 'fecha_partida', headerName: 'Fecha partida', minWidth: 135, maxWidth: 135, flex: 1,
      renderCell: (params) => (dayjs(params.row.fecha_partida).format('DD/MM/YYYY'))
    },
    {
      field: 'fecha_retorno', headerName: 'Fecha retorno', minWidth: 135, maxWidth: 135, flex: 1,
      renderCell: (params) => (dayjs(params.row.fecha_retorno).format('DD/MM/YYYY'))
    },
    { field: 'direccion', headerName: 'Dirección', minWidth: 350, flex: 1, },
    { field: 'motivo_viaje', headerName: 'Motivo', minWidth: 350, flex: 1, },
    {
      field: 'anular', headerName: 'Rechazar', maxWidth: 80, minWidth: 80, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        params.row.estado_solicitud === 'ES' &&
        <HighlightOffIcon
          onClick={() => rechazar_solicitud(params.row)}
          sx={{ fontSize: '30px', cursor: 'pointer', color: '#c62828' }} />
      )
    },
    {
      field: 'ver', headerName: 'Aprobar', maxWidth: 70, minWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        params.row.estado_solicitud === 'ES' &&
        <CheckCircleOutlineIcon
          onClick={() => aprobar_solicitud(params.row)}
          sx={{ fontSize: '30px', cursor: 'pointer', color: '#1b5e20' }} />
      )
    },
    {
      field: 'editar', headerName: 'Ver', maxWidth: 70, minWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        if (params.row.estado_solicitud === 'ES' ||
         params.row.estado_solicitud === 'RE' ||
          params.row.estado_solicitud === 'RC') {
          return <VisibilityIcon
            onClick={() => ver_solicitud(params.row)}
            sx={{ fontSize: '30px', cursor: 'pointer' }} />
        }
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
            {download_xls({ nurseries: data_solicitudes_realizadas, columns })}
            {download_pdf({
              nurseries: data_solicitudes_realizadas,
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
        rows={data_solicitudes_realizadas ?? []}
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
export default TablaSolicitudesEnProceso;