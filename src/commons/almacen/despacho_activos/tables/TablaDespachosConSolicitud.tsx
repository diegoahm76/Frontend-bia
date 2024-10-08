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
import { interface_resumen_despacho_con_solicitud, interface_solicitudes_realizadas, response_resumen_despacho_con_solicitud } from '../interfeces/types';
import CloseIcon from '@mui/icons-material/Close';
import { get_resumen_con_solicitud } from '../thunks/despacho_solicitudes';


interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_solicitudes_realizadas }) => React.ReactNode;
}

interface Props {
  set_accion: React.Dispatch<React.SetStateAction<string>>;
  data_despachos_con_solicitud: interface_solicitudes_realizadas[];
  set_id_solicitud_activo: React.Dispatch<React.SetStateAction<number | null>>;
  loadding_tabla_solicitudes: boolean;
  get_obtener_solicitudes_activos_fc: () => void;
  set_data_solicitud_ver_por_id_con_solicitud: React.Dispatch<React.SetStateAction<interface_resumen_despacho_con_solicitud>>;
  set_position_tab: React.Dispatch<React.SetStateAction<string>>;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaDespachosConSolicitud: React.FC<Props> = ({
  set_accion,
  data_despachos_con_solicitud,
  loadding_tabla_solicitudes,
  get_obtener_solicitudes_activos_fc,
  set_id_solicitud_activo,
  set_data_solicitud_ver_por_id_con_solicitud,
  set_position_tab,
}) => {
  const dispatch = useAppDispatch();


  const aprobar_solicitud = (row: interface_solicitudes_realizadas) => {
    set_id_solicitud_activo(row.id_solicitud_activo);
    set_accion('crear');
    set_position_tab('2');
  }

  const rechazar_solicitud = (row: interface_solicitudes_realizadas) => {
    set_accion('rechazar');
    set_id_solicitud_activo(row.id_solicitud_activo);
  }

  const anular_solicitud = (row: interface_solicitudes_realizadas) => {
    set_accion('anular');
    set_id_solicitud_activo(row.id_solicitud_activo);
  }

  const ver_solicitud = (row: any) => {
    set_accion('ver_con_solicitud');
    set_position_tab('4');

    dispatch(get_resumen_con_solicitud(row.id_solicitud_activo))
      .then((response: response_resumen_despacho_con_solicitud) => {
        if (Object.keys(response).length !== 0) {
          if (response.success) {
            control_success('Solicitud encontrada correctamente');
            set_data_solicitud_ver_por_id_con_solicitud(response.data);
          } else {
            control_error('No se pudo encontrar la solicitud');
            set_data_solicitud_ver_por_id_con_solicitud({} as interface_resumen_despacho_con_solicitud);
          }
        } else {
          control_error('Hubo un error al intentar encontrar la solicitud');
          set_data_solicitud_ver_por_id_con_solicitud({} as interface_resumen_despacho_con_solicitud)
        }
      })
  }




  const columns: CustomColumn[] = [
    {
      field: 'estado_solicitud', headerName: 'Estado', minWidth: 140, flex: 1,
      renderCell: (params) => (
        params.row.estado_solicitud === 'S' ? 'Solicitada'
          : params.row.estado_solicitud === 'R' ? 'Respondida'
            : params.row.estado_solicitud === 'SR' ? 'Solicitud Rechazada'
              : params.row.estado_solicitud === 'SA' ? 'Solicitud Aprobada'
                : params.row.estado_solicitud === 'DR' ? 'Despacho Rechazado'
                  : params.row.estado_solicitud === 'DA' ? 'Despacho Autorizado'
                    : params.row.estado_solicitud === 'F' ? 'Finalizada'
                      : params.row.estado_solicitud === 'C' && 'Cancelada'
      )
    },
    {
      field: 'fecha_solicitud', headerName: 'Fecha solicitud', minWidth: 150, flex: 1,
      renderCell: (params) => (dayjs(params.row.fecha_solicitud).format('DD/MM/YYYY'))
    },
    { field: 'motivo', headerName: 'Motivo', minWidth: 300, flex: 1, },
    {
      field: 'opeario', headerName: 'Persona que solicita', minWidth: 300, flex: 1,
      renderCell: (params) => (
        `${params.row.primer_nombre_persona_solicita} ${params.row.primer_apellido_persona_solicita}`
      )
    },
    {
      field: 'persona_responsable', headerName: 'Persona responsable', minWidth: 300, flex: 1,
      renderCell: (params) => (
        `${params.row.primer_nombre_funcionario_resp_unidad} ${params.row.primer_apellido_funcionario_resp_unidad}`
      )
    },
    { field: 'numero_activos', headerName: 'N° de activos', minWidth: 100, flex: 1, align: 'center', headerAlign: 'center' },
    {
      field: 'rechazar', headerName: 'Rechazar', maxWidth: 80, minWidth: 80, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        if (params.row.estado_solicitud === 'SA') {
          return (
            <HighlightOffIcon
              onClick={() => rechazar_solicitud(params.row)}
              sx={{ fontSize: '30px', cursor: 'pointer', color: '#c62828' }} />
          )
        }
      }
    },
    {
      field: 'aprobar', headerName: 'Aprobar', maxWidth: 70, minWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        if (params.row.estado_solicitud === 'SA') {
          return (
            <CheckCircleOutlineIcon
              onClick={() => aprobar_solicitud(params.row)}
              sx={{ fontSize: '30px', cursor: 'pointer', color: '#1b5e20' }} />
          )
        }
      }
    },
    {
      field: 'editar', headerName: 'Ver', maxWidth: 70, minWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        <VisibilityIcon
          onClick={() => ver_solicitud(params.row)}
          sx={{ fontSize: '30px', cursor: 'pointer' }} />
      )
    },
    {
      field: 'anular', headerName: 'Anular', maxWidth: 70, minWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        params.row.estado_solicitud === 'R' &&
        <CloseIcon
          onClick={() => anular_solicitud(params.row)}
          sx={{ fontSize: '30px', cursor: 'pointer', color: '#c62828' }} />
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
            {download_xls({ nurseries: data_despachos_con_solicitud, columns })}
            {download_pdf({
              nurseries: data_despachos_con_solicitud,
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
        rows={data_despachos_con_solicitud ?? []}
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
export default TablaDespachosConSolicitud;