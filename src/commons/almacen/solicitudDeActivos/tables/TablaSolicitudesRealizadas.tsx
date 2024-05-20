import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { interface_solicitudes_realizadas } from '../interfaces/types';

interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_solicitudes_realizadas }) => React.ReactNode;
}

interface Props {
  set_position_tab: React.Dispatch<React.SetStateAction<string>>;
  set_accion: React.Dispatch<React.SetStateAction<string>>;
  data_solicitudes_realizadas: interface_solicitudes_realizadas[];
  set_id_solicitud_activo: React.Dispatch<React.SetStateAction<number | null>>;
  loadding_tabla_solicitudes_realizadas: boolean;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaSolicitudesRealizadas: React.FC<Props> = ({
  set_position_tab,
  set_accion,
  data_solicitudes_realizadas,
  set_id_solicitud_activo,
  loadding_tabla_solicitudes_realizadas,
}) => {


  const ver_solicitud = (solicitud: interface_solicitudes_realizadas) => {
    set_position_tab('2');
    set_accion('ver');
    set_id_solicitud_activo(Number(solicitud.id_solicitud_activo) ?? null);
  }

  const cancelar_solicitud = (solicitud: interface_solicitudes_realizadas) => {
    set_accion('cancelar');
    set_id_solicitud_activo(Number(solicitud.id_solicitud_activo) ?? null);
  }

  const editar_solilitud = (solicitud: interface_solicitudes_realizadas) => {
    set_position_tab('2');
    set_accion('editar');
    set_id_solicitud_activo(Number(solicitud.id_solicitud_activo) ?? null);
  }

  const columns: CustomColumn[] = [
    {
      field: 'estado_solicitud', headerName: 'Estado', maxWidth: 120, flex: 1,
      renderCell: (params) => (
        params.row.estado_solicitud === 'S' ? 'Solicitado'
          : params.row.estado_solicitud === 'R' ? 'Respondido'
            : params.row.estado_solicitud === 'SR' ? 'Solicitud Rechazada'
              : params.row.estado_solicitud === 'SA' ? 'Solicitud Aprobada'
                : params.row.estado_solicitud === 'DR' ? 'Despacho Rechazado'
                  : params.row.estado_solicitud === 'DA' ? 'Despacho Autorizado'
                    : params.row.estado_solicitud === 'F' ? 'Finalizado'
                      : params.row.estado_solicitud === 'C' && 'Cancelado'
      )
    },
    {
      field: 'fecha_solicitud', headerName: 'Fecha de la solicitud', maxWidth: 145, flex: 1,
      renderCell: (params) => (dayjs(params.row.fecha_solicitud).format('DD/MM/YYYY'))
    },
    { field: 'motivo', headerName: 'Motivo', minWidth: 300, flex: 1, },
    {
      field: 'primer_nombre_persona_solicita', headerName: 'Persona que solicita', minWidth: 300, flex: 1,
      renderCell: (params) => (`${params.row.primer_nombre_persona_solicita} ${params.row.primer_apellido_persona_solicita}`)
    },
    {
      field: 'persona_responsable', headerName: 'Persona responsable', minWidth: 120, flex: 1,
      renderCell: (params) => (`${params.row.primer_nombre_funcionario_resp_unidad} ${params.row.primer_apellido_funcionario_resp_unidad}`)
    },
    { field: 'numero_activos', headerName: 'Número de activos', maxWidth: 150, flex: 1, },
    {
      field: 'anular', headerName: 'Anular', maxWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        if (params.row.estado_solicitud === 'SR' ||
         params.row.estado_solicitud === 'SA' ||
         params.row.estado_solicitud === 'S') {
          return (
            <HighlightOffIcon
              onClick={() => cancelar_solicitud(params.row)}
              sx={{ fontSize: '30px', cursor: 'pointer', color: '#c62828' }} />
          )
        }
      }

    },
    {
      field: 'ver', headerName: 'Ver', maxWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        <VisibilityIcon
          onClick={() => ver_solicitud(params.row)}
          sx={{ fontSize: '30px', cursor: 'pointer' }} />
      )
    },
    {
      field: 'editar', headerName: 'Editar', maxWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        if(params.row.estado_solicitud === 'SR' || params.row.estado_solicitud === 'S'){
          return <EditIcon
            onClick={() => editar_solilitud(params.row)}
            sx={{ fontSize: '30px', cursor: 'pointer', color: '#1071b2' }} />
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
        loading={loadding_tabla_solicitudes_realizadas}
        style={{ margin: '15px 0px' }}
        density="compact"
        autoHeight
        rows={data_solicitudes_realizadas ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row?.id_solicitud_activo === undefined ? uuidv4() : row.id_solicitud_activo}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaSolicitudesRealizadas;