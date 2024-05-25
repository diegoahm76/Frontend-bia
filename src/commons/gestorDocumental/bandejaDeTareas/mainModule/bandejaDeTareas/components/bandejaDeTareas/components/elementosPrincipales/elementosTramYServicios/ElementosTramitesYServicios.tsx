/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { Avatar, Button, Chip, Grid, IconButton, Tooltip } from '@mui/material';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import {
  setActionsTareasTramites,
  setCurrentTareaPqrsdfTramitesUotrosUopas,
  setDataExpediente,
  setInfoTarea,
  setListaTareasPqrsdfTramitesUotrosUopas,
} from '../../../../../../../toolkit/store/BandejaDeTareasStore';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { columnsTareasTramites } from './columnsTramites/columnsTareasTramites';
import { iconStyles } from './../elementosPqrsdf/ElementosPqrsdf';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ClearIcon from '@mui/icons-material/Clear';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskIcon from '@mui/icons-material/Task';
import { GridCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import { ModalRejectTask } from '../../../utils/tareaPqrsdf/ModalRejectTask';
import { ModalSeeRejectedTask } from '../../../utils/tareaPqrsdf/ModalSeeRejectedTask';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { useContext } from 'react';
import { showAlert } from '../../../../../../../../../../utils/showAlert/ShowAlert';
import { useNavigate } from 'react-router-dom';
import { BandejaTareasContext } from '../../../../../../context/BandejaTareasContext';
import { getDetalleDeTareaOtro } from '../../../../../services/servicesStates/otros/detalleTareasOtros/getInfoTareaOtro.service';
import { getAnexosOtros } from '../../../../../services/servicesStates/otros/anexos/getAnexosTareaOtros.service';
import { getDetalleDeTareaTramites } from '../../../../../services/servicesStates/tramites/detalleTareaTramites/getDetalleTareaTramites.service';
import { getAnexosTramites } from '../../../../../services/servicesStates/tramites/anexos/getAnexosTramites.service';
import { putAceptarTareaOtros } from '../../../../../../../toolkit/thunks/otros/putAceptarTareaOtros.service';
import { getListadoTareaasOtrosByPerson } from '../../../../../../../toolkit/thunks/otros/getListadoTareasOtros.service';
import { putAceptarTareaTramite } from '../../../../../../../toolkit/thunks/tramitesServicios/putAceptarTareaTramite.service';
import { AuthSlice } from '../../../../../../../../../auth/interfaces';
import { getListadoTramitesByPerson } from '../../../../../../../toolkit/thunks/tramitesServicios/getListadoTramitesByPerson.service';
import { DownloadButton } from '../../../../../../../../../../utils/DownloadButton/DownLoadButton';

export const ElementosTramitesYServicios = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* navigate
  const navigate = useNavigate();

  //* redux states
  const {
    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas,
    listaTareasPqrsdfTramitesUotrosUopas,
    data_expediente,
    actionsTramitesYServicios,
  } = useAppSelector((state) => state.BandejaTareasSlice);

  const {
    userinfo: { id_persona },
  } = useAppSelector((state: AuthSlice) => state.auth);

  //* context declaration
  const { setAnexos } = useContext(BandejaTareasContext);

  const {
    handleOpenModalOne: handleOpenInfoAnexos,
    handleOpenModalTwo: handleOpenInfoMetadatos,
    handleSecondLoading,
    handleOpenModalNuevo,
    handleOpenModalNuevoNumero2,
  } = useContext(ModalAndLoadingContext);

  // ? ------------------------ DEFINICION DE FUNCIONES PARA EL COMPONENTE

  const setActionsTareas = (tareaTramite: any) => {
    dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(tareaTramite));
    void Swal.fire({
      icon: 'success',
      title: 'Elemento seleccionado',
      text: 'Seleccionaste una tarea que se utilizará en los procesos de este módulo. Se mantendrá seleccionado hasta que elijas uno diferente, realices otra búsqueda o reinicies el módulo.',
      showConfirmButton: true,
    });

    const shouldDisable = (actionId: string) => {
      if (!tareaTramite) {
        return true; // No se ha seleccionado ninguna tarea
      }

      const isNoSeleccionado = !tareaTramite;
      /*  const isEstadoAsignacionNoDefinido =
      tareaOtros.estado_asignacion_tarea === null ||
      tareaOtros.estado_asignacion_tarea === '';
      const isEstadoAsignacionRechazada =
      tareaOtros.estado_asignacion_tarea === 'Rechazado';
      const isEstadoAsignacionAceptada =
      tareaOtros.estado_asignacion_tarea === 'Aceptado';
      const isEstadoTareaEnProcesoRespuesta =
      tareaOtros.estado_tarea === 'En proceso de respuesta';
      const isEstadoTareaDelegada = tareaOtros.estado_tarea === 'Delegada';
      const isEstadoReasignacionEnEspera =
      tareaOtros.estado_reasignacion_tarea === null ||
      tareaOtros.estado_reasignacion_tarea === '' ||
      tareaOtros.estado_reasignacion_tarea === 'En espera';
      const isEstadoReasignacionRechazada =
      tareaOtros.estado_reasignacion_tarea === 'Rechazado';
      const isEstadoReasignacionAceptada =
      tareaOtros.estado_reasignacion_tarea === 'Aceptado';

      const hasReqPendientes = tareaOtros.requerimientos_pendientes_respuesta;*/

      if (isNoSeleccionado) {
        return true;
      }

      /*   if (isEstadoAsignacionNoDefinido || isEstadoAsignacionRechazada) {
        return actionId !== 'InfoSolictud';
      }

      if (
        isEstadoAsignacionAceptada &&
        isEstadoTareaEnProcesoRespuesta &&
        !hasReqPendientes
      ) {
        //* se habilita todo
        return !(
          actionId === 'RespondeSolicitud' ||
          actionId === 'RequerimientoUsuario' ||
          actionId === 'Reasignar' ||
          actionId === 'VerRespuestasRequerimientosOSolicitudesAlUsuario' ||
          actionId === 'SeguimientoARespuesta' ||
          actionId === 'InfoSolictud'
        );
      }

      if (
        isEstadoAsignacionAceptada &&
        isEstadoTareaEnProcesoRespuesta &&
        hasReqPendientes
      ) {
        //* se deshabilita la opción de responder solicitud
        return !(
          actionId === 'RequerimientoUsuario' ||
          actionId === 'Reasignar' ||
          actionId === 'VerRespuestasRequerimientosOSolicitudesAlUsuario' ||
          actionId === 'SeguimientoARespuesta' ||
          actionId === 'InfoSolictud'
        );
      }

      if (isEstadoAsignacionAceptada && isEstadoTareaRespondida) {
        return true;
      }

      if (
        isEstadoAsignacionAceptada &&
        isEstadoTareaEnProcesoRespuesta &&
        isEstadoReasignacionEnEspera
      ) {
        return !(
          actionId === 'RespondeSolicitud' ||
          actionId === 'RequerimientoUsuario'
        );
      }

      if (isEstadoAsignacionAceptada && isTareaRespondida) {
        return !(
          actionId === 'RespondeSolicitud' ||
          actionId === 'RequerimientoUsuario' ||
          actionId === 'Reasignar' ||
          actionId === 'VerRespuestasRequerimientosOSolicitudesAlUsuario' ||
          actionId === 'SeguimientoARespuesta' ||
          actionId === 'InfoSolictud'
        );
      }

      //* septimo caso
      if (
        isEstadoAsignacionAceptada &&
        isEstadoTareaEnProcesoRespuesta &&
        isEstadoReasignacionAceptada
      ) {
        return !(
          actionId === 'Reasignar' ||
          actionId === 'VerRespuestasRequerimientosOSolicitudesAlUsuario' ||
          actionId === 'SeguimientoARespuesta' ||
          actionId === 'InfoSolictud'
        );
      }

      //* octavo caso

      if (
        isEstadoAsignacionAceptada &&
        isEstadoTareaEnProcesoRespuesta &&
        isEstadoReasignacionRechazada
      ) {
        //* se habilitan todos botones -
        return !(
          actionId === 'RespondeSolicitud' ||
          actionId === 'RequerimientoUsuario' ||
          actionId === 'Reasignar' ||
          actionId === 'VerRespuestasRequerimientosOSolicitudesAlUsuario' ||
          actionId === 'SeguimientoARespuesta' ||
          actionId === 'InfoSolictud'
        );
      }

      //* noveno caso
      if (
        isEstadoAsignacionAceptada &&
        isEstadoTareaDelegada &&
        isEstadoReasignacionRechazada
      ) {
        //* se habilitan todos botones -
        return !(
          actionId === 'RespondeSolicitud' ||
          actionId === 'RequerimientoUsuario' ||
          actionId === 'Reasignar' ||
          actionId === 'VerRespuestasRequerimientosOSolicitudesAlUsuario' ||
          actionId === 'SeguimientoARespuesta' ||
          actionId === 'InfoSolictud'
        );
      }

      return !(actionId === 'InfoSolictud');
      */
    };

    /* const actionsOtrosValue = actionsTramitesYServicios.map((action: any) => ({
      ...action,
      disabled: shouldDisable(action.id),
    }));

    dispatch(setActionsTareasTramites(actionsOtrosValue));*/
  };

  // ? FUNCIONES PARA EL COMPONENTE

  const handleAcceptClick = async (row: {
    id_tarea_asignada: number;
    tipo_tarea: string;
  }) => {
    console.log(row);

    try {
      const result = await Swal.fire({
        title: 'Aceptar tarea',
        text: `¿Estás seguro que deseas aceptar esta tarea (TRÁMITES Y SERVICIOS)?, porfavor activa la vista de ventanas emergentes en tu navegador para poder visualizar la información del auto de inicio y el pago del trámite`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        await putAceptarTareaTramite(
          row.id_tarea_asignada,
        ).then(async (res) => {
          console.log('res', res);
          // dispatch(setDataExpediente(res?.data_expediente ?? null));
          const listadoTareas = await getListadoTramitesByPerson(
            id_persona,
            handleSecondLoading
          );
          dispatch(setListaTareasPqrsdfTramitesUotrosUopas(listadoTareas ?? []));
          dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
        });

        // cambiar por el get de la bandeja de teareas de otros
        /*

        dispatch(setListaTareasPqrsdfTramitesUotrosUopas(listadoTareas ?? []));
        dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));*/
      } else {
        await Swal.fire({
          title: 'La tarea no ha sido aceptada (TRÁMITES Y SERVICIOS)',
          icon: 'info',
          showConfirmButton: true,
        });
      }
    } catch (error) {
      showAlert(
        'Opps...',
        'Ha ocurrido un error desconocido, por favor intente de nuevo',
        'error'
      );
      return;
    }
  };

  const handleRejectClick = (_row: any) => {
    dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(_row));
    handleOpenModalNuevo(true);
  };

  const handleCommentClick = (_row: any) => {
    handleOpenModalNuevoNumero2(true);
    dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(_row));
  };

  // ? ------------------------ DEFINICION DE COLUMNAS PAA EL DATA GRID
  /*
{
  "requerimientos_pendientes_respuesta": false,
}
*/

  const columns = [
    ...columnsTareasTramites,
    {
      headerName: 'Estado asignación de tarea',
      field: 'estado_asignacion_tarea',
      minWidth: 220,
      renderCell: (params: any) => {
        switch (params.row.estado_asignacion_tarea) {
          case null:
            return (
              <>
                <Tooltip title="Aceptar tarea">
                  <DownloadDoneIcon
                    sx={{ ...iconStyles, background: 'green' }}
                    onClick={() => handleAcceptClick(params.row)}
                  />
                </Tooltip>
                <Tooltip title="Rechazar tarea">
                  <ClearIcon
                    sx={{ ...iconStyles, background: 'red' }}
                    onClick={() => handleRejectClick(params.row)}
                  />
                </Tooltip>
              </>
            );
          case 'Aceptado':
            return (
              <Chip
                label="Tarea aceptada"
                color="success"
                variant="outlined"
                size="small"
              />
            );
          case 'Rechazado':
            return (
              <>
                <Chip
                  label="Tarea rechazada"
                  color="error"
                  variant="outlined"
                  size="small"
                />
                <Tooltip title="Ver motivo de rechazo">
                  <CommentIcon
                    sx={{
                      ...iconStyles,
                      color: 'primary.main',
                      background: undefined,
                    }}
                    onClick={() => handleCommentClick(params.row)}
                  />
                </Tooltip>
              </>
            );
          default:
            return null;
        }
      },
    },
    {
      headerName: 'Acciones',
      field: 'Acciones',
      minWidth: 250,
      renderCell: (params: GridCellParams | GridValueGetterParams) => {
        return (
          <>
            <Tooltip title="Ver info de la tarea">
              <IconButton
                onClick={() => {
                  (async () => {
                    try {
                      const idTramite = params?.row?.id_tramite;
                      const [detalleTarea, anexosTramites] = await Promise.all([
                        getDetalleDeTareaTramites(idTramite, navigate),
                        getAnexosTramites(idTramite),
                      ]);
                      dispatch(setInfoTarea(detalleTarea));
                      setAnexos(anexosTramites);
                      if (detalleTarea || anexosTramites.length > 0) {
                        navigate(
                          `/app/gestor_documental/bandeja_tareas/info_tarea_tramite/${idTramite}`
                        );
                        handleOpenInfoMetadatos(false); //* cierre de la parte de los metadatos
                        //* la info del anexo en realidad es la parte del archivo, la info del anexo se muestra en un grillado arriba de ese
                        handleOpenInfoAnexos(false); //* cierra la parte de la información del archivo realacionaod a la pqrsdf que se consulta con el id del anexo
                      }
                    } catch (error) {
                      console.error(error);
                      // Handle the error appropriately here
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
            {/* </Link>*/}

            <Tooltip title="Seleccionar tarea para procesos">
              <IconButton
                onClick={() => {
                  setActionsTareas(params?.row);
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
                  <TaskIcon
                    sx={{
                      color: 'warning.main',
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
  /*  ...(data_expediente
      ? [
          {
            field: 'auto_de_inicio',
            headerName: 'Descargar auto de inicio',
            width: 90,
            renderCell: (params: any) => (
              <>
                <Tooltip title="Ver archivo">
                  <Grid item xs={0.5} md={0.5}>
                    <DownloadButton
                      fileUrl={data_expediente?.data_expediente?.auto ?? ''}
                      fileName={'auto_de_inicio'}
                      condition={false}
                    />
                  </Grid>
                </Tooltip>
              </>
            ),
          },
          {
            field: 'pago',
            headerName: 'Descargar pago',
            width: 90,
            renderCell: (params: any) => (
              <>
                <Tooltip title="Ver archivo">
                  <Grid item xs={0.5} md={0.5}>
                    <DownloadButton
                      fileUrl={data_expediente?.data_expediente?.pago ?? ''}
                      fileName={'pago'}
                      condition={false}
                    />
                  </Grid>
                </Tooltip>
              </>
            ),
          },
        ]
      : []),*/
  ];

  return (
    <>
      {/*se genera un espacio para el modal que rechaza la tarea*/}
      <ModalRejectTask />
      {/*se genera un espacio para el modal que muestra el comentario de rechazo de la tarea*/}
      <ModalSeeRejectedTask />
      <RenderDataGrid
        rows={
          listaTareasPqrsdfTramitesUotrosUopas /*.filter(
          (el: { radicado: string }) => el.radicado
        )*/ ??
          [] ??
          []
        }
        columns={columns ?? []}
        title={`Listado de tareas asignadas en trámites y servicios`}
        aditionalElement={
          currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea ? (
            <Button
              endIcon={<ClearAllIcon />}
              onClick={() => {
                dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
              }}
              variant="contained"
              color="primary"
            >
              Quitar selección de tarea de trámite / servicio{' '}
            </Button>
          ) : null
        }
      />
    </>
  );
};
