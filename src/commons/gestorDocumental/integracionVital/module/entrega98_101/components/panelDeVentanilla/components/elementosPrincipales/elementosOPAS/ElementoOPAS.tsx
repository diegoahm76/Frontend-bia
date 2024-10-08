/* eslint-disable @typescript-eslint/naming-convention */

import { Avatar, Chip, IconButton, Tooltip } from '@mui/material';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { setCurrentElementPqrsdComplementoTramitesYotros, setListaElementosComplementosRequerimientosOtros } from '../../../../../../../toolkit/store/VitalStore';
import { columnsOpas } from './columnsOpas/columnsOpas';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useContext } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { getComplementosAsociadosOpas } from '../../../../../../../toolkit/thunks/opas/complementos/getComplementosOpas.service';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { downloadCSV } from '../../../utils/downloadCSV';
import { ModalInfoElementos } from '../../AtomVistaElementos/PQRSDF/ModalInfoPqrsdf';

export const ElementoOPAS = (): JSX.Element => {
  // ? dispatch necesario
  const dispatch = useAppDispatch();

  //* redux states

  const { listaElementosPqrsfTramitesUotros } = useAppSelector(
    (state) => state.VitalSlice
  );

  //* context necesario

  const {
    handleThirdLoading,
    fourthLoading,
    fifthLoading,
    handleFourthLoading,
    handleFifthLoading,
  } = useContext(ModalAndLoadingContext);

  //* const columns with actions

  const columns = [
    ...columnsOpas,
    {
      headerName: 'Costo del proyecto',
      field: 'costo_proyecto',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={`$${params.value?.toLocaleString()}`}
            color="primary"
          />
        );
      },
    },
    /* {
      headerName: 'Requiere digitalización',
      field: 'requiere_digitalizacion',
      minWidth: 200,
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
    {
      headerName: 'Pagado',
      field: 'pagado',
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={params.value ? 'Sí' : 'No'}
            color={params.value ? 'success' : 'error'}
          />
        );
      },
    },
    /* {
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
                : !params.row?.estado_asignacion_grupo
                ? 'warning' // Cambia 'default' al color que desees para el caso null
                : 'default'
            }
          />
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
            <Tooltip
              title={`Ver complementos relacionados a opa`}
            >
              <IconButton
                onClick={() => {
                  (async () => {
                    try {
                      const res = await getComplementosAsociadosOpas(
                        params.row.id_solicitud_tramite,
                        handleThirdLoading
                      );
                      dispatch(
                        setListaElementosComplementosRequerimientosOtros(res)
                      );
                    } catch (error) {
                      console.error(error);
                      // Handle error appropriately
                    }
                  })();
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
                  <KeyboardDoubleArrowDownIcon
                    sx={{
                      color: 'info.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>

            <Tooltip title="Exportar OPA en fomato CSV">
              <IconButton
                onClick={() => {
                 /* console.log('params.row', {
                    idSolicitudTramite: params.row.id_solicitud_tramite || 'No aplica',
                    tipoSolicitud: params.row.tipo_solicitud || 'No aplica',
                    nombreProyecto: params.row.nombre_proyecto || 'No aplica',
                    nombreOPA: params.row.nombre_opa || 'No aplica',
                    nombreCompletoTitular: params.row.nombre_completo_titular || 'No aplica',
                    costoProyecto: params.row.costo_proyecto || 'No aplica',
                    pagado: params.row.pagado ? 'Sí' : 'No',
                    cantidadPredios: params.row.cantidad_predios || 'No aplica',
                    cantidadAnexos: params.row.cantidad_anexos || 'No aplica',
                    radicado: params.row.radicado || 'No aplica',
                    fechaRadicado: params.row.fecha_radicado || 'No aplica',
                    idSede: params.row.id_sede || 'No aplica',
                    sede: params.row.sede || 'No aplica',
                    requiereDigitalizacion: params.row.requiere_digitalizacion ? 'Sí' : 'No',
                    estadoActual: params.row.estado_actual || 'No aplica',
                    estadoAsignacionGrupo: params.row.estado_asignacion_grupo || 'No aplica',
                    personaAsignada: params.row.persona_asignada || 'No aplica',
                    unidadAsignada: params.row.unidad_asignada || 'No aplica',
                    tieneAnexos: params.row.tiene_anexos ? 'Sí' : 'No'
                })
*/
                downloadCSV(
                    {
                    //idSolicitudTramite: params.row.id_solicitud_tramite || 'No aplica',
                    tipoSolicitud: params.row.tipo_solicitud || 'No aplica',
                    nombreProyecto: params.row.nombre_proyecto || 'No aplica',
                    nombreOPA: params.row.nombre_opa || 'No aplica',
                    nombreCompletoTitular: params.row.nombre_completo_titular || 'No aplica',
                    costoProyecto: params.row.costo_proyecto || 'No aplica',
                    pagado: params.row.pagado ? 'Sí' : 'No',
                    cantidadPredios: params.row.cantidad_predios || 'No aplica',
                    cantidadAnexos: params.row.cantidad_anexos || 'No aplica',
                    radicado: params.row.radicado || 'No aplica',
                    fechaRadicado: params.row.fecha_radicado || 'No aplica',
                    //idSede: params.row.id_sede || 'No aplica',
                    sede: params.row.sede || 'No aplica',
                    requiereDigitalizacion: params.row.requiere_digitalizacion ? 'Sí' : 'No',
                    estadoActual: params.row.estado_actual || 'No aplica',
                    estadoAsignacionGrupo: params.row.estado_asignacion_grupo || 'No aplica',
                    personaAsignada: params.row.persona_asignada || 'No aplica',
                    unidadAsignada: params.row.unidad_asignada || 'No aplica',
                    tieneAnexos: params.row.tiene_anexos ? 'Sí' : 'No'
                },
                    `OPA_vital_${params.row.id_solicitud_tramite}.csv`
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
                  handleFourthLoading(true);
                  /* void getAnexosPqrsdf(params?.row?.id_PQRSDF).then((res) => {
                    //  console.log('')(res);
                    setActionsPQRSDF(params?.row);
                    navigate(
                      `/app/gestor_documental/panel_ventanilla/pqr_info/${params.row.id_PQRSDF}`
                    );
                    setAnexos(res);
                    if (res.length > 0) {
                      handleOpenInfoMetadatos(false); //* cierre de la parte de los metadatos
                      handleOpenInfoAnexos(false); //* cierra la parte de la información del archivo realacionaod a la pqesdf que se consulta con el id del anexo
                      return;
                    }

                    return;
                  });*/
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
        openModalOne={fourthLoading}
        openModalTwo={fifthLoading}
        handleOpenModalOne={handleFourthLoading}
        handleOpenModalTwo={handleFifthLoading}
      />
      <RenderDataGrid
        rows={listaElementosPqrsfTramitesUotros ?? []}
        columns={columns ?? []}
        title={`Lista de solicitudes de ${listaElementosPqrsfTramitesUotros[0]?.tipo_solicitud}S`}
      />
    </>
  );
};
