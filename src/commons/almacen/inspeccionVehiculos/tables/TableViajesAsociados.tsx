/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Dispatch, SetStateAction, useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { interface_busqueda_persona_solicita, interface_viajes_asociados, response_resumen_solicitud } from '../interfaces/types';
import dayjs from 'dayjs';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useDispatch } from 'react-redux';
import { get_obtener_resumen_solicitud } from '../thunks/inspeccion_vehiculos';
import { control_error } from '../../../../helpers';


interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_viajes_asociados }) => React.ReactNode;
}

interface props {
  data_viajes_asociados: interface_viajes_asociados[];
  set_inspeccionando_vehiculo: Dispatch<SetStateAction<boolean>>;
  set_data_personas_viajan: Dispatch<SetStateAction<interface_busqueda_persona_solicita[]>>;
  set_id_solicitud_viaje: Dispatch<SetStateAction<number | null>>;
  //set_vehiculo_arrendado_temp:React.Dispatch<React.SetStateAction<interface_viajes_asociados>>
}


const TableViajesAsociados: React.FC<props> = ({
  data_viajes_asociados,
  set_inspeccionando_vehiculo,
  set_data_personas_viajan,
  set_id_solicitud_viaje,
  //set_vehiculo_arrendado_temp
}) => {
  const dispatch = useDispatch();

  /*const handle_id_hoja_vida = (newSelectionModel: GridSelectionModel) => {
    if (newSelectionModel.length > 0) {
      const vehiculo_seleccionado = data_viajes_asociados.find(row => row.id_viaje_agendado === newSelectionModel[0]);
      
      const vehiculo_arrendado = vehiculo_seleccionado ?? Object;

      set_vehiculo_arrendado_temp(vehiculo_arrendado);
    }
  }*/

  const inspeccionar_vehiculo = async (row: interface_viajes_asociados) => {
    set_inspeccionando_vehiculo(true)
    /**
     * Función para obtener los nombres del conductor.
     */
    await dispatch(get_obtener_resumen_solicitud(row.id_solicitud_viaje))
      .then((response: response_resumen_solicitud) => {
        if (Object.keys(response).length !== 0) {
          if (response.success) {
            set_id_solicitud_viaje(row.id_solicitud_viaje)
            set_data_personas_viajan(response.data.personas_solicitud_viaje.map((persona) => {
              return {
                id_persona: persona.id_persona_viaja,
                tipo_persona_desc: persona.tipo_documento_persona_viaja,
                tipo_documento: persona.tipo_documento_persona_viaja,
                numero_documento: persona.numero_documento_persona_viaja,
                nombre_completo: persona.nombre_persona_viaja,
                persona_agregada_inspeccion: false,
                persona_confirma_viaje: false,
                nombre_comercial: '',
                digito_verificacion: '',
                cod_naturaleza_empresa: '',
                tiene_usuario: false,
                tipo_usuario: '',
                id_unidad_organizacional_actual: 0,
                id_solicitud_viaje: persona.id_solicitud_viaje,
              }
            }))
          } else {
            set_data_personas_viajan([])
            control_error('No se encontró información de la solicitud')
          }
        } else {
          control_error('Error interno en el servidor. Inténtelo más tarde.')
          set_data_personas_viajan([])
        }
      }
      )
  }


  const columns: CustomColumn[] = [
    {
      field: 'nombres', headerName: 'Nombres conductor', minWidth: 300, flex: 1,
      renderCell: (params) => `${params.row.nombre_conductor} ${params.row.apellido_conductor}`
    },
    { field: 'nro_total_pasajeros_req', headerName: 'N° de pasajeros', minWidth: 130, flex: 1 },
    {
      field: 'fecha_partida_asignada', headerName: 'Fecha de partida', minWidth: 130, flex: 1,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY')
    },
    {
      field: 'fecha_retorno_asignada', headerName: 'Fecha de retorno', minWidth: 130, flex: 1,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY')
    },
    { field: 'indicaciones_destino', headerName: 'Indicaciones de destino', minWidth: 350, flex: 1 },
    { field: 'direccion', headerName: 'Dirección', minWidth: 350, flex: 1 },
    {
      field: 'inspeccionar', headerName: 'Inspeccionar', minWidth: 200, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        !params.row.realizo_inspeccion &&
        <Button
          fullWidth
          color='primary'
          variant='contained'
          startIcon={<EngineeringIcon />}
          onClick={() => inspeccionar_vehiculo(params.row)}
        >
          Inspeccionar
        </Button>
      )
    },
  ]

  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
            {download_xls({ nurseries: data_viajes_asociados, columns })}
            {download_pdf({
              nurseries: data_viajes_asociados,
              columns,
              title: 'Vehículos encontrados en la búsqueda',
            })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{ margin: '15px 0px' }}
        density="compact"
        autoHeight
        rows={data_viajes_asociados ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row.id_viaje_agendado ?? uuidv4()}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TableViajesAsociados;