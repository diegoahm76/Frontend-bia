/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, ButtonGroup, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { v4 as uuidv4 } from 'uuid';
import { FC, useEffect, useState } from "react";
import { interface_data_agendamiento_vehiculos, interface_resumen_solicitud, response_resumen_solicitud } from "../interfaces/types";
import dayjs from "dayjs";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { get_resumen_solicitud, listar_municipios } from "../thunks/agendamiento_vehiculos";
import { useAppDispatch } from "../../../../hooks";
import { download_xls } from "../../../../documentos-descargar/XLS_descargar";
import { download_pdf } from "../../../../documentos-descargar/PDF_descargar";
import { useNavigate } from "react-router-dom";
import { control_error, control_success } from "../../../../helpers";


interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_data_agendamiento_vehiculos }) => React.ReactNode;
}

interface props_table {
  data_agendamiento_vehiculo: interface_data_agendamiento_vehiculos[];
  set_mostrar_input_no_aprobado: React.Dispatch<React.SetStateAction<boolean>>;
  set_id_solicitud_viaje: React.Dispatch<React.SetStateAction<number>>;
  set_mostrar_agendamiento_vehiculo: React.Dispatch<React.SetStateAction<boolean>>;
  set_data_solicitud_a_aprobar: React.Dispatch<React.SetStateAction<interface_data_agendamiento_vehiculos>>;
  set_accion: React.Dispatch<React.SetStateAction<string>>
  set_mostrar_vehiculo_agregado: React.Dispatch<React.SetStateAction<boolean>>;
  set_mostrar_vehiculos_agendados: React.Dispatch<React.SetStateAction<boolean>>;
  set_data_resumen_solicitud_viaje: React.Dispatch<React.SetStateAction<interface_resumen_solicitud>>;
}


const TablaAgendamientoVehiculos: FC<props_table> = ({
  data_agendamiento_vehiculo,
  set_mostrar_input_no_aprobado,
  set_id_solicitud_viaje,
  set_mostrar_agendamiento_vehiculo,
  set_data_solicitud_a_aprobar,
  set_accion,
  set_mostrar_vehiculo_agregado,
  set_mostrar_vehiculos_agendados,
  set_data_resumen_solicitud_viaje
}) => {
  const dispatch = useAppDispatch();
  const navite = useNavigate();

  const [municipios, set_municipios] = useState<any>([]);

  const listar_municipios_fc: () => void = () => {
    dispatch(listar_municipios())
      .then((response: any) => {
        if (!response) {
          set_municipios([]);
        } else {
          set_municipios(response);
        }
      })
  }
  useEffect(() => {
    if (municipios && municipios.length === 0) {
      listar_municipios_fc();
    }
  }, [])

  const ver_agendamiento = (params: interface_data_agendamiento_vehiculos) => {
    console.log(params);
    set_id_solicitud_viaje(params.id_solicitud_viaje ?? 0);
    set_mostrar_agendamiento_vehiculo(true);
    set_mostrar_vehiculo_agregado(true);
    set_mostrar_vehiculos_agendados(true);
    set_accion('ver_agendamiento');
  }

  const ver_solicitud = (params: interface_data_agendamiento_vehiculos) => {
    set_accion('ver_solicitud');

    dispatch(get_resumen_solicitud(params.id_solicitud_viaje?.toString()))
      .then((response: response_resumen_solicitud) => {
        if (Object.keys(response)?.length === 0) {
          set_data_resumen_solicitud_viaje({} as interface_resumen_solicitud);
          control_error('No se pudo obtener la información de la solicitud');
        } else {
          set_data_resumen_solicitud_viaje(response.data);
          control_success('Información de la solicitud obtenida correctamente');
        }
      })
  }

  const aprobar_solicitud = (params: interface_data_agendamiento_vehiculos) => {
    set_mostrar_agendamiento_vehiculo(true);
    set_data_solicitud_a_aprobar(params);
    set_accion('aprobar_agendamiento');
  }


  const columns: custom_column[] = [
    {
      field: 'primer_nombre_solicitante', headerName: 'Persona solicitante', minWidth: 300, flex: 1,
      renderCell: ((res) => (res.row.primer_nombre_solicitante + ' ' + res.row.primer_apellido_solicitante)),
    },
    {
      field: 'primer_nombre_persona_responsable', headerName: 'Persona responsable', minWidth: 300, flex: 1,
      renderCell: ((res) => (res.row.primer_nombre_solicitante + ' ' + res.row.primer_apellido_solicitante)),
    },
    {
      field: 'fecha_solicitud', headerName: 'Fecha Solicitud', minWidth: 120, flex: 1,
      renderCell: ((res) => (dayjs(res.row.fecha_solicitud).format('DD/MM/YYYY')))
    },
    { field: 'motivo_viaje', headerName: 'Motivo del viaje', minWidth: 300, flex: 1 },
    {
      field: 'cod_municipio', headerName: 'Municipio de destino', minWidth: 150, flex: 1,
      renderCell: ((res) => {
        if (municipios && municipios.length > 0) {
          return municipios.map((municipio: any) => {
            if (municipio[0] === res.row.cod_municipio) {
              return municipio[1];
            }
          })
        }
      })
    },
    { field: 'direccion', headerName: 'Dirección', minWidth: 150, flex: 1 },
    { field: 'nro_pasajeros', headerName: 'Número de pasajeros', minWidth: 150, flex: 1 },
    {
      field: 'fecha_partida', headerName: 'Fecha de salida', minWidth: 120, flex: 1,
      renderCell: ((res) => (dayjs(res.row.fecha_partida).format('DD/MM/YYYY')))
    },
    {
      field: 'fecha_retorno', headerName: 'Fecha de retorno', minWidth: 120, flex: 1,
      renderCell: ((res) => (dayjs(res.row.fecha_retorno).format('DD/MM/YYYY')))
    },
    {
      field: 'requiere_compagnia_militar', headerName: '¿Req. Compañia militar?', minWidth: 170, flex: 1,
      renderCell: ((res) => (res.row.requiere_compagnia_militar ? 'Si' : 'No'))
    },
    {
      field: 'estado_solicitud', headerName: 'Estado de solicitud', minWidth: 140, flex: 1,
      renderCell: ((res) => (
        res.row.estado_solicitud === 'RC' ? 'Rechazada'
          : res.row.estado_solicitud === 'ES' ? 'En Espera'
            : res.row.estado_solicitud === 'FN' ? 'Finalizada'
              : res.row.estado_solicitud === 'AP' ? 'Aprobada'
                : res.row.estado_solicitud === 'RE' && 'Respondida'
      ))
    },
    {
      field: 'fecha_aprobacion_responsable', headerName: 'Fecha de Aprobacion/Rechazo', minWidth: 220, flex: 1,
      renderCell: ((res) => {
        return res.row.estado_solicitud === 'RE' ?
          dayjs(res.row.fecha_aprobacion_responsable).format('DD/MM/YYYY')
          :
          res.row.estado_solicitud === 'RC' ? dayjs(res.row.fecha_rechazo).format('DD/MM/YYYY')
            : ''
      }
      )
    },
    { field: 'justificacion_rechazo', headerName: 'Justificacion de rechazo', minWidth: 300, flex: 1 },
    {
      field: 'acciones', headerName: 'Acciones', minWidth: 260, flex: 1, align: 'center',
      renderCell: ((res) => {
        if (res.row.estado_solicitud === 'FN' || res.row.estado_solicitud === 'RE') {
          return (
            <Button
              fullWidth
              size="small"
              color='primary'
              variant='contained'
              onClick={() => ver_agendamiento(res.row)}
              startIcon={<RemoveRedEyeIcon />
              }
            >Ver agendamiento</Button>
          )
        } else if (res.row.estado_solicitud === 'AP') {
          return (
            <Button
              fullWidth
              size="small"
              color='success'
              variant='contained'
              startIcon={<DoneIcon />}
              onClick={() => { aprobar_solicitud(res.row) }}
            >Agendar Vehiculo</Button>
          )
        }
        return ''
      })
    },
    {
      field: 'ver', headerName: 'Ver', minWidth: 80, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: ((res) => {
        if (res.row.estado_solicitud === 'RE' || res.row.estado_solicitud === 'FN') {
          return (
            <RemoveRedEyeIcon
              onClick={() => ver_solicitud(res.row)}
              style={{ cursor: 'pointer' }} />
          )
        }
      }
      )
    },

  ]

  return (
    <Grid container>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
            {download_xls({ nurseries: data_agendamiento_vehiculo, columns })}
            {download_pdf({
              nurseries: data_agendamiento_vehiculo,
              columns,
              title: 'Resultado agendamiento vehículos',
            })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{ margin: '15px 0px' }}
        density="compact"
        autoHeight
        rows={data_agendamiento_vehiculo ?? []}
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
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaAgendamientoVehiculos;