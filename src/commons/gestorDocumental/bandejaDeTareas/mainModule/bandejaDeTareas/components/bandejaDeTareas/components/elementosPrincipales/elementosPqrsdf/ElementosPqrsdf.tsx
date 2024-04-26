/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsPqrsdf } from './columnsPqrsdf/columnsPqrsdf';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskIcon from '@mui/icons-material/Task';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ClearIcon from '@mui/icons-material/Clear';
import CommentIcon from '@mui/icons-material/Comment';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import Swal from 'sweetalert2';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import {
  setActionssTareasPQRSDF,
  setCurrentTareaPqrsdfTramitesUotrosUopas,
  setInfoTarea,
  setListaTareasPqrsdfTramitesUotrosUopas,
} from '../../../../../../../toolkit/store/BandejaDeTareasStore';
import { BandejaTareasContext } from '../../../../../../context/BandejaTareasContext';
import { putAceptarTarea } from '../../../../../../../toolkit/thunks/Pqrsdf/putAceptarTarea.service';
import { getListadoTareasByPerson } from '../../../../../../../toolkit/thunks/Pqrsdf/getListadoTareasByPerson.service';
import { AuthSlice } from '../../../../../../../../../auth/interfaces';
import { GridCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { getAnexosPqrsdf } from '../../../../../../../../panelDeVentanilla/toolkit/thunks/PqrsdfyComplementos/anexos/getAnexosPqrsdf.service';
import { showAlert } from '../../../../../../../../../../utils/showAlert/ShowAlert';
import { ModalRejectTask } from '../../../utils/tareaPqrsdf/ModalRejectTask';
import { ModalSeeRejectedTask } from '../../../utils/tareaPqrsdf/ModalSeeRejectedTask';
import { getDetalleDeTarea } from '../../../../../services/servicesStates/pqrsdf/detalleDeTarea/getDetalleDeTarea.service';

export const iconStyles = {
  color: 'white',
  width: '25px',
  height: '25px',
  ml: 3.5,
  mr: 2,
  borderRadius: '30%',
  cursor: 'pointer',
} as const;

export const ListaElementosPqrsdf = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const {
    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas,
    listaTareasPqrsdfTramitesUotrosUopas,
    actionsTareasPQRSDF,
  } = useAppSelector((state) => state.BandejaTareasSlice);
  const {
    userinfo: { id_persona },
  } = useAppSelector((state: AuthSlice) => state.auth);

  //* navigate declaration
  const navigate = useNavigate();
  //* context declaration
  const { setAnexos } = useContext(BandejaTareasContext);
  const {
    handleOpenModalOne: handleOpenInfoAnexos,
    handleOpenModalTwo: handleOpenInfoMetadatos,
    handleSecondLoading,
    handleOpenModalNuevo,
    handleOpenModalNuevoNumero2,
  } = useContext(ModalAndLoadingContext);

  // ? functions

  const handleAcceptClick = async (row: {
    id_tarea_asignada: number;
    tipo_tarea: string;
  }) => {
    console.log(row);

    try {
      const result = await Swal.fire({
        title: 'Aceptar tarea',
        text: `¿Estás seguro que deseas aceptar esta tarea?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        const res = await putAceptarTarea(row.id_tarea_asignada, /*row.id_pqrsdf*/);
        console.log(res);

        const listadoTareas = await getListadoTareasByPerson(
          id_persona,
          handleSecondLoading,
          'Rpqr'
        );

        dispatch(setListaTareasPqrsdfTramitesUotrosUopas(listadoTareas ?? []));
        dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
      } else {
        await Swal.fire({
          title: 'La tarea no ha sido aceptada',
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

  const setActionsPQRSDF = (tareaPQRSDF: any) => {
    dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(tareaPQRSDF));
    void Swal.fire({
      icon: 'success',
      title: 'Elemento seleccionado',
      text: 'Seleccionaste una tarea que se utilizará en los procesos de este módulo. Se mantendrá seleccionado hasta que elijas uno diferente, realices otra búsqueda o reinicies el módulo.',
      showConfirmButton: true,
    });


    // const shouldDisable = (actionId: string) => {
    //   if (!tareaPQRSDF) {
    //     return true; // No se ha seleccionado ninguna tarea
    //   }

    //   const isNoSeleccionado = !tareaPQRSDF;
    //   const isEstadoAsignacionNoDefinido =
    //     tareaPQRSDF.estado_asignacion_tarea === null ||
    //     tareaPQRSDF.estado_asignacion_tarea === '';
    //   const isEstadoAsignacionRechazada =
    //     tareaPQRSDF.estado_asignacion_tarea === 'Rechazado';
    //   const isEstadoAsignacionAceptada =
    //     tareaPQRSDF.estado_asignacion_tarea === 'Aceptado';
    //   const isEstadoTareaEnProcesoRespuesta =
    //     tareaPQRSDF.estado_tarea === 'En proceso de respuesta';
    //   const isTareaRespondida =
    //     tareaPQRSDF.estado_tarea ===
    //     'Respondida por el propietario de la bandeja de tareas';
    //   const isEstadoTareaRespondida = tareaPQRSDF.respondida_por;
    //   const isEstadoTareaDelegada = tareaPQRSDF.estado_tarea === 'Delegada';
    //   const isEstadoReasignacionEnEspera =
    //     tareaPQRSDF.estado_reasignacion_tarea === null ||
    //     tareaPQRSDF.estado_reasignacion_tarea === '' ||
    //     tareaPQRSDF.estado_reasignacion_tarea === 'En espera';
    //   const isEstadoReasignacionRechazada =
    //     tareaPQRSDF.estado_reasignacion_tarea === 'Rechazado';
    //   const isEstadoReasignacionAceptada =
    //     tareaPQRSDF.estado_reasignacion_tarea === 'Aceptado';

    //   const hasReqPendientes = tareaPQRSDF.requerimientos_pendientes_respuesta;

    //   if (isNoSeleccionado) {
    //     return true;
    //   }

    //   if (isEstadoAsignacionNoDefinido || isEstadoAsignacionRechazada) {
    //     return actionId !== 'InfoSolictud';
    //   }

    //   if (
    //     isEstadoAsignacionAceptada &&
    //     isEstadoTareaEnProcesoRespuesta &&
    //     !hasReqPendientes
    //   ) {
    //     //* se habilita todo
    //     return !(
    //       actionId === 'RespondeSolicitud' ||
    //       actionId === 'RequerimientoUsuario' ||
    //       actionId === 'Reasignar' ||
    //       actionId === 'VerRespuestasRequerimientosOSolicitudesAlUsuario' ||
    //       actionId === 'SeguimientoARespuesta' ||
    //       actionId === 'InfoSolictud'
    //     );
    //   }

    //   if (
    //     isEstadoAsignacionAceptada &&
    //     isEstadoTareaEnProcesoRespuesta &&
    //     hasReqPendientes
    //   ) {
    //     //* se deshabilita la opción de responder solicitud
    //     return !(
    //       actionId === 'RequerimientoUsuario' ||
    //       actionId === 'Reasignar' ||
    //       actionId === 'VerRespuestasRequerimientosOSolicitudesAlUsuario' ||
    //       actionId === 'SeguimientoARespuesta' ||
    //       actionId === 'InfoSolictud'
    //     );
    //   }

    //   if (isEstadoAsignacionAceptada && isEstadoTareaRespondida) {
    //     return true;
    //   }

    //   if (
    //     isEstadoAsignacionAceptada &&
    //     isEstadoTareaEnProcesoRespuesta &&
    //     isEstadoReasignacionEnEspera
    //   ) {
    //     return !(
    //       actionId === 'RespondeSolicitud' ||
    //       actionId === 'RequerimientoUsuario'
    //     );
    //   }

    //   if (isEstadoAsignacionAceptada && isTareaRespondida) {
    //     return !(
    //       actionId === 'RespondeSolicitud' ||
    //       actionId === 'RequerimientoUsuario' ||
    //       actionId === 'Reasignar' ||
    //       actionId === 'VerRespuestasRequerimientosOSolicitudesAlUsuario' ||
    //       actionId === 'SeguimientoARespuesta' ||
    //       actionId === 'InfoSolictud'
    //     );
    //   }

    //   //* septimo caso
    //   if (
    //     isEstadoAsignacionAceptada &&
    //     isEstadoTareaEnProcesoRespuesta &&
    //     isEstadoReasignacionAceptada
    //   ) {
    //     return !(
    //       actionId === 'Reasignar' ||
    //       actionId === 'VerRespuestasRequerimientosOSolicitudesAlUsuario' ||
    //       actionId === 'SeguimientoARespuesta' ||
    //       actionId === 'InfoSolictud'
    //     );
    //   }

    //   //* octavo caso

    //   if (
    //     isEstadoAsignacionAceptada &&
    //     isEstadoTareaEnProcesoRespuesta &&
    //     isEstadoReasignacionRechazada
    //   ) {
    //     //* se habilitan todos botones -
    //     return !(
    //       actionId === 'RespondeSolicitud' ||
    //       actionId === 'RequerimientoUsuario' ||
    //       actionId === 'Reasignar' ||
    //       actionId === 'VerRespuestasRequerimientosOSolicitudesAlUsuario' ||
    //       actionId === 'SeguimientoARespuesta' ||
    //       actionId === 'InfoSolictud'
    //     );
    //   }

    //   //* noveno caso
    //   if (
    //     isEstadoAsignacionAceptada &&
    //     isEstadoTareaDelegada &&
    //     isEstadoReasignacionRechazada
    //   ) {
    //     //* se habilitan todos botones -
    //     return !(
    //       actionId === 'RespondeSolicitud' ||
    //       actionId === 'RequerimientoUsuario' ||
    //       actionId === 'Reasignar' ||
    //       actionId === 'VerRespuestasRequerimientosOSolicitudesAlUsuario' ||
    //       actionId === 'SeguimientoARespuesta' ||
    //       actionId === 'InfoSolictud'
    //     );
    //   }

    //   return !(actionId === 'InfoSolictud');
    // };

    // const actionsPQRSDF = actionsTareasPQRSDF.map((action: any) => ({
    //   ...action,
    //   disabled: shouldDisable(action.id),
    // }));

    dispatch(setActionssTareasPQRSDF(actionsTareasPQRSDF));
  };

  //* columns -------------------------------------------------------

  const columns = [
    ...columnsPqrsdf,
    {
      headerName: 'Requerimientos pendientes de respuesta',
      field: 'requerimientos_pendientes_respuesta',
      minWidth: 280,
      renderCell: (params: GridCellParams | GridValueGetterParams) => {
        return (
          <Chip
            size="small"
            label={params.value ? 'Sí' : 'No'}
            color={params.value ? 'success' : 'error'}
          />
        );
      },
    },
    {
      headerName: 'Días para respuesta',
      field: 'dias_para_respuesta',
      minWidth: 250,
      renderCell: (params: GridCellParams | GridValueGetterParams) => {
        switch (true) {
          case params.row.dias_para_respuesta >= 7:
            return (
              <Chip
                size="small"
                label={`${params.row.dias_para_respuesta} día(s)`}
                color="success"
                variant="outlined"
              />
            );
          case params.row.dias_para_respuesta < 7 &&
            params.row.dias_para_respuesta > 4:
            return (
              <Chip
                size="small"
                label={`${params.row.dias_para_respuesta} día(s)`}
                color="warning"
                variant="outlined"
              />
            );
          case params.row.dias_para_respuesta <= 4 &&
            params.row.dias_para_respuesta > 0:
            return (
              <Chip
                label={`${params.row.dias_para_respuesta} día(s)`}
                color="error"
                variant="outlined"
                size="small"
              />
            );
          case params.row.dias_para_respuesta <= 0:
            return (
              <Chip
                label={`Tiempo agotado hace ${Math.abs(
                  params.row.dias_para_respuesta
                )} día(s)`}
                color="error"
                variant="outlined"
                size="small"
              />
            );
          default:
            return params.row.dias_para_respuesta;
        }
      },
    },

    //* deben ser los botones para aceptar o rechazar la tarea (si esta aceptada, aparece el texto de aceptada, si esta rechazada, aparece el texto de rechazada junto con un button para ver el comentario de rechazo, si no esta aceptada ni rechazada, aparece un button para aceptar y otro para rechazar)
    {
      headerName: 'Estado asignación de tarea',
      field: 'estado_asignacion_tarea',
      minWidth: 220,
      renderCell: (params: GridCellParams | GridValueGetterParams) => {
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
                  // ? se usará la función de los anexos de la pqrsdf para mostrar la información de la tarea, ya que contiene la información de la tarea (que es la misma que la de la pqrsdf)
                  //* se debe llamar el servicio del detalle de la pqrsdf para traer la informacion y en consecuencias luego traer los anexos para la pqrsdf
                  console.log(params.row);

                  (async () => {
                    try {
                      const idPqrsdf = params?.row?.id_pqrsdf;
                      const [detalleTarea, anexosPqrsdf] = await Promise.all([
                        getDetalleDeTarea(idPqrsdf, navigate),
                        getAnexosPqrsdf(idPqrsdf),
                      ]);
                      dispatch(setInfoTarea(detalleTarea));
                      setAnexos(anexosPqrsdf);
                      if (detalleTarea || anexosPqrsdf.length > 0) {
                        navigate(
                          `/app/gestor_documental/bandeja_tareas/info_tarea/${idPqrsdf}`
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
                  //* I have to analize this function, if may we need aditional information
                  setActionsPQRSDF(params?.row);
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
          listaTareasPqrsdfTramitesUotrosUopas.filter(
            (el: { radicado: string }) => el.radicado
          ) ?? []
        }
        columns={columns ?? []}
        title={`Listado de tareas asignadas en PQRSDF`}
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
              Quitar selección de tarea de pqrsdf
            </Button>
          ) : null
        }
      />
    </>
  );
};
