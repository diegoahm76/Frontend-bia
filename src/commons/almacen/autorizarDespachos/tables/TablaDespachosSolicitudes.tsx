import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../../../hooks';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { control_error, control_success } from '../../../../helpers';
import { interface_obtener_despachos, interface_resumen_solicitud_despacho, response_resumen_solicitud_despacho } from '../interfaces/types';
import { get_obtener_resumen_solicitud_despacho, put_autorizar_solicitud_despacho } from '../thunks/autorizar_despachos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from 'sweetalert2';


interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_obtener_despachos }) => React.ReactNode;
}

interface Props {
  set_accion: React.Dispatch<React.SetStateAction<string>>;
  data_despachos_solicitudes: interface_obtener_despachos[];
  loadding_tabla_solicitudes: boolean;
  set_data_resumen_solicitud_despacho: React.Dispatch<React.SetStateAction<interface_resumen_solicitud_despacho>>;
  set_id_solicitud_activo: React.Dispatch<React.SetStateAction<number | null>>;
  set_position_tab: React.Dispatch<React.SetStateAction<string>>;
  get_obtener_despachos_fc: () => void;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaDespachosSolicitudes: React.FC<Props> = ({
  set_accion,
  data_despachos_solicitudes,
  loadding_tabla_solicitudes,
  set_data_resumen_solicitud_despacho,
  set_id_solicitud_activo,
  set_position_tab,
  get_obtener_despachos_fc,
}) => {
  const dispatch = useAppDispatch();

  const rechazar_solicitud = (row: interface_obtener_despachos) => {
    set_accion('rechazar');
    set_id_solicitud_activo(row.id_despacho_activo);
  }

  const ver_solicitud = (row: any) => {
    set_accion('ver');
    set_position_tab('4');

    dispatch(get_obtener_resumen_solicitud_despacho(row.id_despacho_activo))
      .then((response: response_resumen_solicitud_despacho) => {
        if (Object.keys(response).length !== 0) {
          if (response.success) {
            control_success('Solicitud encontrada correctamente');
            set_data_resumen_solicitud_despacho(response.data);
          } else {
            control_error('No se pudo encontrar la solicitud');
            set_data_resumen_solicitud_despacho({} as interface_resumen_solicitud_despacho);
          }
        } else {
          control_error('Hubo un error al intentar encontrar la solicitud');
          set_data_resumen_solicitud_despacho({} as interface_resumen_solicitud_despacho)
        }
      })
  }

  const aprobar_solicitud = (row: interface_obtener_despachos) => {
    Swal.fire({
      title: '¿Esta seguro de aprobar la solicitud de despacho?',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then(async (result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(put_autorizar_solicitud_despacho(row.id_despacho_activo))
          .then((response: any) => {
            if (Object.keys(response).length !== 0) {
              control_success('Solicitud aprobada');
              get_obtener_despachos_fc();
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
    { field: 'opeario', headerName: 'Operario', minWidth: 300, flex: 1, 
      renderCell: (params) => (
        `${params.row.primer_nombre_persona_operario_asignado} ${params.row.primer_apellido_persona_operario_asignado}`
      )
    },
    { field: 'persona_responsable', headerName: 'Persona responsable', minWidth: 300, flex: 1, 
      renderCell: (params) => (
        `${params.row.primer_nombre_funcionario_resp_asignado} ${params.row.primer_apellido_funcionario_resp_asignado}`
      )
    },
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
      field: 'aprobar', headerName: 'Aprobar', maxWidth: 70, minWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        params.row.estado_despacho === 'Ep' &&
        <CheckCircleOutlineIcon
          onClick={() => aprobar_solicitud(params.row)}
          sx={{ fontSize: '30px', cursor: 'pointer', color: '#1b5e20' }} />
      )
    },
    {
      field: 'ver', headerName: 'Ver', maxWidth: 70, minWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
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
            {download_xls({ nurseries: data_despachos_solicitudes, columns })}
            {download_pdf({
              nurseries: data_despachos_solicitudes,
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
        rows={data_despachos_solicitudes ?? []}
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
export default TablaDespachosSolicitudes;