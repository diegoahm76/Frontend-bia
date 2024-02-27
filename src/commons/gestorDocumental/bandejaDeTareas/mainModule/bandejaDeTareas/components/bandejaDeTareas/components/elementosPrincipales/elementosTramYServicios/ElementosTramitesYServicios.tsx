/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { setActionsTareasTramites, setCurrentTareaPqrsdfTramitesUotrosUopas } from '../../../../../../../toolkit/store/BandejaDeTareasStore';
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

export const ElementosTramitesYServicios = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const {
    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas,
    listaTareasPqrsdfTramitesUotrosUopas,
    actionsTramitesYServicios,
  } = useAppSelector((state) => state.BandejaTareasSlice);

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

/*    const handleAcceptClick = async (row: {
      id_tarea_asignada: number;
      tipo_tarea: string;
    }) => {
      console.log(row);
  
      try {
        const result = await Swal.fire({
          title: 'Aceptar tarea',
          text: `¿Estás seguro que deseas aceptar esta tarea (OTROS)?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
        });
  
        if (result.isConfirmed) {
          const res = await putAceptarTareaOtros(row.id_tarea_asignada);
  
          // cambiar por el get de la bandeja de teareas de otros
          const listadoTareas = await getListadoTareaasOtrosByPerson(
            id_persona,
            handleSecondLoading,
            'ROtros'
          );
  
          dispatch(setListaTareasPqrsdfTramitesUotrosUopas(listadoTareas ?? []));
          dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
        } else {
          await Swal.fire({
            title: 'La tarea no ha sido aceptada (OTROS)',
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
    };*/
  
    const handleRejectClick = (_row: any) => {
      dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(_row));
      handleOpenModalNuevo(true);
    };
  
    /*const handleCommentClick = (_row: any) => {
      handleOpenModalNuevoNumero2(true);
      dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(_row));
    };
*/

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
                    onClick={() =>
                      /*handleAcceptClick(params.row)*/ console.log(params.row)
                    }
                  />
                </Tooltip>
                <Tooltip title="Rechazar tarea">
                  <ClearIcon
                    sx={{ ...iconStyles, background: 'red' }}
                    onClick={() =>
                      handleRejectClick(params.row)
                    }
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
                    onClick={() =>
                      /*handleCommentClick(params.row)*/ console.log(params.row)
                    }
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
                  alert('viendo info de la tarea');
                  // ? se usará la función de los anexos de la pqrsdf para mostrar la información de la tarea, ya que contiene la información de la tarea (que es la misma que la de la pqrsdf)
                  //* se debe llamar el servicio del detalle de la pqrsdf para traer la informacion y en consecuencias luego traer los anexos para la pqrsdf
                  /* (async () => {
                    try {
                      const idOtros = params?.row?.id_otro;
                      const [detalleTarea, anexosOtros] = await Promise.all([
                        getDetalleDeTareaOtro(idOtros, navigate),
                        getAnexosOtros(idOtros),
                      ]);
                      dispatch(setInfoTarea(detalleTarea));
                      setAnexos(anexosOtros);
                      if (detalleTarea || anexosOtros.length > 0) {
                        navigate(
                          `/app/gestor_documental/bandeja_tareas/info_tarea_otros/${idOtros}`
                        );
                        handleOpenInfoMetadatos(false); //* cierre de la parte de los metadatos
                        //* la info del anexo en realidad es la parte del archivo, la info del anexo se muestra en un grillado arriba de ese
                        handleOpenInfoAnexos(false); //* cierra la parte de la información del archivo realacionaod a la pqrsdf que se consulta con el id del anexo
                      }
                    } catch (error) {
                      console.error(error);
                      // Handle the error appropriately here
                    }
                  })();*/
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
              Quitar selección de Tarea ({' '}
              {
                currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea
              }
              )
            </Button>
          ) : null
        }
      />
    </>
  );
};
