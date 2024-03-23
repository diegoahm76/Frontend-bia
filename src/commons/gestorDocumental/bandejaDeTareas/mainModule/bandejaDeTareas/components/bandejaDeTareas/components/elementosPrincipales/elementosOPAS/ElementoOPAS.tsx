/* eslint-disable @typescript-eslint/naming-convention */

import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { setCurrentTareaPqrsdfTramitesUotrosUopas, setInfoTarea, setListaTareasPqrsdfTramitesUotrosUopas } from '../../../../../../../toolkit/store/BandejaDeTareasStore';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { AuthSlice } from '../../../../../../../../../auth/interfaces';
import { columnsOpas } from './column/columnsOpas';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { iconStyles } from './../elementosPqrsdf/ElementosPqrsdf';
import ClearIcon from '@mui/icons-material/Clear';

import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskIcon from '@mui/icons-material/Task';
import CommentIcon from '@mui/icons-material/Comment';
import { GridCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { showAlert } from '../../../../../../../../../../utils/showAlert/ShowAlert';
import { ModalRejectTask } from '../../../utils/tareaPqrsdf/ModalRejectTask';
import { ModalSeeRejectedTask } from '../../../utils/tareaPqrsdf/ModalSeeRejectedTask';
import { putAceptarTareaOpa } from '../../../../../../../toolkit/thunks/opas/putAceptarTareaOpa.service';
import { getListadoTareasOpasByPerson } from '../../../../../../../toolkit/thunks/opas/getListadoDeOpasByPerson.service';
import { BandejaTareasContext } from '../../../../../../context/BandejaTareasContext';
import { getDetalleDeTarea } from '../../../../../services/servicesStates/pqrsdf/detalleDeTarea/getDetalleDeTarea.service';
import { getDetalleDeTareaOpa } from '../../../../../services/servicesStates/opas/detalleTarea/getDetalleTareaOpas.service';
import { getAnexosPqrsdf } from '../../../../../../../../panelDeVentanilla/toolkit/thunks/PqrsdfyComplementos/anexos/getAnexosPqrsdf.service';
import { getAnexosTramites } from '../../../../../services/servicesStates/tramites/anexos/getAnexosTramites.service';

export const ElementoOPAS = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const {
    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas,
    listaTareasPqrsdfTramitesUotrosUopas,
    actionsOpas,
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

  // ? FUNCIONES NECESARIAS PARA EL COMPONENTE
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
       const res = await putAceptarTareaOpa(row.id_tarea_asignada);
        console.log(res);

        const listadoTareas = await getListadoTareasOpasByPerson(
          id_persona,
          handleSecondLoading,
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


  // * set actions opas

  const setActionsOpas = (tareaOpa: any) => {
    dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(tareaOpa));
    void Swal.fire({
      icon: 'success',
      title: 'Elemento seleccionado',
      text: 'Seleccionaste una tarea que se utilizará en los procesos de este módulo. Se mantendrá seleccionado hasta que elijas uno diferente, realices otra búsqueda o reinicies el módulo.',
      showConfirmButton: true,
    });

    const shouldDisable = (actionId: string) => {
      if (!tareaOpa) {
        return true; // No se ha seleccionado ninguna tarea
      }

      const isNoSeleccionado = !tareaOpa;
      const isEstadoAsignacionNoDefinido =
      tareaOpa.estado_asignacion_tarea === null ||
      tareaOpa.estado_asignacion_tarea === '';
      const isEstadoAsignacionRechazada =
      tareaOpa.estado_asignacion_tarea === 'Rechazado';
      const isEstadoAsignacionAceptada =
      tareaOpa.estado_asignacion_tarea === 'Aceptado';
      const isEstadoTareaEnProcesoRespuesta =
      tareaOpa.estado_tarea === 'En proceso de respuesta';
      const isTareaRespondida =
      tareaOpa.estado_tarea ===
        'Respondida por el propietario de la bandeja de tareas';
      const isEstadoTareaRespondida = tareaOpa.respondida_por;
      const isEstadoTareaDelegada = tareaOpa.estado_tarea === 'Delegada';
      const isEstadoReasignacionEnEspera =
      tareaOpa.estado_reasignacion_tarea === null ||
      tareaOpa.estado_reasignacion_tarea === '' ||
      tareaOpa.estado_reasignacion_tarea === 'En espera';
      const isEstadoReasignacionRechazada =
      tareaOpa.estado_reasignacion_tarea === 'Rechazado';
      const isEstadoReasignacionAceptada =
      tareaOpa.estado_reasignacion_tarea === 'Aceptado';

      const hasReqPendientes = tareaOpa.requerimientos_pendientes_respuesta;

     /* if (isNoSeleccionado) {
        return true;
      }

      if (isEstadoAsignacionNoDefinido || isEstadoAsignacionRechazada) {
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
      }*/

      //return !(actionId === 'InfoSolictud');
    };

   /* const actionsOpasConditional = actionsOpas.map((action: any) => ({
      ...action,
      disabled: shouldDisable(action.id),
    }));

    dispatch(setActionsTareasOpas(actionsOpasConditional));*/
  };




  // ? FUNCIONES NECESARIAS PARA EL COMPONENTE

  // ? COLUMNAS NECESARIAS PARA EL COMPONENTE
  const columns = [
    ...columnsOpas,
    {
      headerName: 'Requerimientos pendientes de respuesta',
      field: 'requerimientos_pendientes_respuesta',
      minWidth: 280,
      renderCell: (params: GridCellParams | GridValueGetterParams) => {
        return (
          <Chip
            size="small"
            label={params?.value ? 'Sí' : 'No'}
            color={params?.value ? 'success' : 'error'}
          />
        );
      },
    },
    {
      headerName: 'Días para respuesta',
      field: 'tiempo_respuesta',
      minWidth: 250,
      renderCell: (params: GridCellParams | GridValueGetterParams) => {
        switch (true) {
          case params?.row?.tiempo_respuesta >= 7:
            return (
              <Chip
                size="small"
                label={`${params?.row?.tiempo_respuesta} día(s)`}
                color="success"
                variant="outlined"
              />
            );
          case params?.row?.tiempo_respuesta < 7 &&
            params?.row?.tiempo_respuesta > 4:
            return (
              <Chip
                size="small"
                label={`${params?.row?.tiempo_respuesta} día(s)`}
                color="warning"
                variant="outlined"
              />
            );
          case params?.row?.tiempo_respuesta <= 4 &&
            params?.row?.tiempo_respuesta > 0:
            return (
              <Chip
                label={`${params?.row?.tiempo_respuesta} día(s)`}
                color="error"
                variant="outlined"
                size="small"
              />
            );
          case params?.row?.tiempo_respuesta <= 0:
            return (
              <Chip
                label={`Tiempo agotado hace ${Math.abs(
                  params?.row?.tiempo_respuesta
                )} día(s)`}
                color="error"
                variant="outlined"
                size="small"
              />
            );
          default:
            return params?.row?.tiempo_respuesta;
        }
      },
    },
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
                        const idTramite = params?.row?.id_tramite;
                        const [detalleTarea, anexosOpa] = await Promise.all([
                          getDetalleDeTareaOpa(idTramite, navigate),
                          getAnexosTramites(idTramite),
                        ]);
                        dispatch(setInfoTarea(detalleTarea));
                        setAnexos(anexosOpa);
                        if (detalleTarea || anexosOpa.length > 0) {
                          navigate(
                            `/app/gestor_documental/bandeja_tareas/info_tarea_opas/${idTramite}`
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
                  setActionsOpas(params?.row);
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
  // ? COLUMNAS NECESARIAS PARA EL COMPONENTE

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
        title={`Listado de tareas asignadas en OPA`}
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
              Quitar selección de Tarea OPA
            </Button>
          ) : null
        }
      />
    </>
  );
};
