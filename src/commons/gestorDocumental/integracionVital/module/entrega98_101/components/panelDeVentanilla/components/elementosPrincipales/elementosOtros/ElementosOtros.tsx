/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { columnsOtros } from './columnsOtros/columnsOtros';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { useContext, useState } from 'react';
import { PanelVentanillaContext } from '../../../../../../../context/PanelVentanillaContext';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { downloadCSV } from '../../../utils/downloadCSV';
import { ModalInfoElementos } from '../../AtomVistaElementos/PQRSDF/ModalInfoPqrsdf';
import { setCurrentElementPqrsdComplementoTramitesYotros } from '../../../../../../../toolkit/store/VitalStore';

export const ElementosOtros = (): JSX.Element => {
  //* redux states
  const { listaElementosPqrsfTramitesUotros } = useAppSelector(
    (state) => state.VitalSlice
  );
  const {
    handleElevenLoading,
    handleTwelveLoading,
    ElevenLoading,
    TwelveLoading,
  } = useContext(ModalAndLoadingContext);
  const { setRadicado, setValue } = useContext(PanelVentanillaContext);
  //* dispatch necesario
  const dispatch = useAppDispatch();

  //* states
  //* loader button simulacion
  const [loadingStates, setLoadingStates] = useState<any>({});

  // ? columns config
  const columns = [
    ...columnsOtros,
    /*  {
      headerName: 'Requiere digitalización',
      field: 'requiere_digitalizacion',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={params.value ? 'Sí' : 'No'}
            color={params.value ? 'success' : 'error'}
          />
        );
      },
    },*/
    //* sacar para poner color
    /*  {
      headerName: 'Estado de asignación de grupo',
      field: 'estado_asignacion_grupo',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={params.value ?? 'Sin asignar'}
            color={
              params.row?.estado_asignacion_grupo === 'Pendiente'
                ? 'warning'
                : params.row?.estado_asignacion_grupo === 'Aceptado'
                ? 'success'
                : params.row?.estado_asignacion_grupo === 'Rechazado'
                ? 'error'
                : params.row?.estado_asignacion_grupo === null
                ? 'warning' // Cambia 'default' al color que desees para el caso null
                : 'default'
            }
          />
        );
      },
    },*/
    //* sacar para poner color
    /*   {
      headerName: 'Número de solicitudes de digitalización',
      field: 'numero_solicitudes_digitalizacion',
      minWidth: 300,
      renderCell: (params: any) => {
        return (
          <LoadingButton
            loading={loadingStates[params.row.id_otros]}
            color="primary"
            variant="contained"
            onClick={() => {
              console.log(params.row);
              if (params.value === 0) {
                control_warning(
                  'No hay solicitudes de digitalización para este radicado, por lo tanto no se podrá ver historial de solicitudes de digitalización'
                );
                return;
              } else {
                setLoadingStates((prev: any) => ({
                  ...prev,
                  [params.row.id_otros]: true,
                }));
                // Simulate an async operation
                setTimeout(() => {
                  setValue(3);
                  //* se debe reemplazar por el radicado real que viene dentro del elemento que se va a buscar
                  setRadicado(params?.row?.radicado);
                  setLoadingStates((prev: any) => ({
                    ...prev,
                    [params.row.id_otros]: false,
                  }));
                }, 1000);
              }
            }}
          >
            {`Solicitudes de digitalización: ${params.value}`}
          </LoadingButton>
        );
      },
    },*/
    {
      headerName: 'Acciones',
      field: 'Acciones',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Exportar OTRO en fomato CSV">
              <IconButton
                onClick={() => {
                  /* console.log('otro', {
                    tipoSolicitud: params.row.tipo_solicitud || 'No aplica',
                    nombreCompletoTitular: params.row.nombre_completo_titular || 'No aplica',
                    asunto: params.row.asunto || 'No aplica',
                    cantidadAnexos: params.row.cantidad_anexos || 'No aplica',
                    radicado: params.row.radicado || 'No aplica',
                    fechaRadicado: params.row.fecha_radicado || 'No aplica',
                    requiereDigitalizacion: params.row.requiere_digitalizacion ? 'Sí' : 'No',
                    estadoSolicitud: params.row.estado_solicitud || 'No aplica',
                    estadoAsignacionGrupo: params.row.estado_asignacion_grupo || 'No aplica',
                    personaAsignada: params.row.persona_asignada || 'No aplica',
                    idPersonaRecibe: params.row.id_persona_recibe || 'No aplica',
                    personaRecibe: params.row.persona_recibe || 'No aplica',
                    numeroSolicitudesDigitalizacion: params.row.numero_solicitudes_digitalizacion || 'No aplica',
                    numeroFoliosTotales: params.row.nro_folios_totales || 'No aplica',
                    unidadAsignada: params.row.unidad_asignada || 'No aplica',
                    esPqrsdf: params.row.es_pqrsdf ? 'Sí' : 'No',
                    personaInterpone: params.row.persona_interpone || 'No aplica',
                    codigoRelacionTitular: params.row.cod_relacion_titular || 'No aplica',
                    relacionTitular: params.row.relacion_titular || 'No aplica',
                    medioSolicitud: params.row.medio_solicitud || 'No aplica',
                    codigoFormaPresentacion: params.row.cod_forma_presentacion || 'No aplica',
                    formaPresentacion: params.row.forma_presentacion || 'No aplica',
                    fechaRegistro: params.row.fecha_registro || 'No aplica',
                    descripcion: params.row.descripcion || 'No aplica',
                    idSucursalRecepcionaFisica: params.row.id_sucursal_recepciona_fisica || 'No aplica',
                    nombreSucursal: params.row.nombre_sucursal || 'No aplica',
                    nombreSucursalRecepcionFisica: params.row.nombre_sucursal_recepcion_fisica || 'No aplica',
                    fechaEnvioDefinitivoDigitalizacion: params.row.fecha_envio_definitivo_digitalizacion || 'No aplica',
                    fechaDigitalizacionCompletada: params.row.fecha_digitalizacion_completada || 'No aplica',
                    fechaInicialEstadoActual: params.row.fecha_inicial_estado_actual || 'No aplica',
                });*/

                  downloadCSV(
                    {
                      tipoSolicitud: params.row.tipo_solicitud || 'No aplica',
                      nombreCompletoTitular:
                        params.row.nombre_completo_titular || 'No aplica',
                      asunto: params.row.asunto || 'No aplica',
                      cantidadAnexos: params.row.cantidad_anexos || 'No aplica',
                      radicado: params.row.radicado || 'No aplica',
                      fechaRadicado: params.row.fecha_radicado || 'No aplica',
                      requiereDigitalizacion: params.row.requiere_digitalizacion
                        ? 'Sí'
                        : 'No',
                      estadoSolicitud:
                        params.row.estado_solicitud || 'No aplica',
                      estadoAsignacionGrupo:
                        params.row.estado_asignacion_grupo || 'No aplica',
                      personaAsignada:
                        params.row.persona_asignada || 'No aplica',
                      idPersonaRecibe:
                        params.row.id_persona_recibe || 'No aplica',
                      personaRecibe: params.row.persona_recibe || 'No aplica',
                      numeroSolicitudesDigitalizacion:
                        params.row.numero_solicitudes_digitalizacion ||
                        'No aplica',
                      numeroFoliosTotales:
                        params.row.nro_folios_totales || 'No aplica',
                      unidadAsignada: params.row.unidad_asignada || 'No aplica',
                      esPqrsdf: params.row.es_pqrsdf ? 'Sí' : 'No',
                      personaInterpone:
                        params.row.persona_interpone || 'No aplica',
                      codigoRelacionTitular:
                        params.row.cod_relacion_titular || 'No aplica',
                      relacionTitular:
                        params.row.relacion_titular || 'No aplica',
                      medioSolicitud: params.row.medio_solicitud || 'No aplica',
                      codigoFormaPresentacion:
                        params.row.cod_forma_presentacion || 'No aplica',
                      formaPresentacion:
                        params.row.forma_presentacion || 'No aplica',
                      fechaRegistro: params.row.fecha_registro || 'No aplica',
                      descripcion: params.row.descripcion || 'No aplica',
                      idSucursalRecepcionaFisica:
                        params.row.id_sucursal_recepciona_fisica || 'No aplica',
                      nombreSucursal: params.row.nombre_sucursal || 'No aplica',
                      nombreSucursalRecepcionFisica:
                        params.row.nombre_sucursal_recepcion_fisica ||
                        'No aplica',
                      fechaEnvioDefinitivoDigitalizacion:
                        params.row.fecha_envio_definitivo_digitalizacion ||
                        'No aplica',
                      fechaDigitalizacionCompletada:
                        params.row.fecha_digitalizacion_completada ||
                        'No aplica',
                      fechaInicialEstadoActual:
                        params.row.fecha_inicial_estado_actual || 'No aplica',
                    },
                    `otro_vital_${params.row.id_otros}.csv`
                  );
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <DocumentScannerIcon
                    sx={{
                      color: 'success.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Ver">
              <IconButton
                onClick={() => {
                  dispatch(
                    setCurrentElementPqrsdComplementoTramitesYotros(params?.row)
                  );
                  handleElevenLoading(true);
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <VisibilityIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <>
      <ModalInfoElementos
        openModalOne={ElevenLoading}
        openModalTwo={TwelveLoading}
        handleOpenModalOne={handleElevenLoading}
        handleOpenModalTwo={handleTwelveLoading}
      />
      <RenderDataGrid
        rows={
          [
            // ...listaElementosPqrsfTramitesUotros,
            ...listaElementosPqrsfTramitesUotros,
          ] ?? []
        }
        columns={columns ?? []}
        title={`Lista de solicitudes de ${listaElementosPqrsfTramitesUotros[0]?.tipo_solicitud}`}
      />
    </>
  );
};
