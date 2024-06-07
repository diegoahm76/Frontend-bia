/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { AuthSlice } from '../../../../../../../../../auth/interfaces';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import {
  setActionsTareasOtros,
  setCurrentTareaPqrsdfTramitesUotrosUopas,
  setInfoTarea,
  setListaTareasPqrsdfTramitesUotrosUopas,
} from '../../../../../../../toolkit/store/BandejaDeTareasStore';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ClearIcon from '@mui/icons-material/Clear';
import CommentIcon from '@mui/icons-material/Comment';
import { iconStyles } from './../elementosPqrsdf/ElementosPqrsdf';
import { showAlert } from '../../../../../../../../../../utils/showAlert/ShowAlert';
import Swal from 'sweetalert2';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { BandejaTareasContext } from '../../../../../../context/BandejaTareasContext';

import { GridCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskIcon from '@mui/icons-material/Task';
import { getListadoTareaasOtrosByPerson } from '../../../../../../../toolkit/thunks/otros/getListadoTareasOtros.service';
import { ModalRejectTask } from '../../../utils/tareaPqrsdf/ModalRejectTask';
import { putAceptarTareaOtros } from '../../../../../../../toolkit/thunks/otros/putAceptarTareaOtros.service';
import { ModalSeeRejectedTask } from '../../../utils/tareaPqrsdf/ModalSeeRejectedTask';
import { getDetalleDeTareaOtro } from '../../../../../services/servicesStates/otros/detalleTareasOtros/getInfoTareaOtro.service';
import { getAnexosOtros } from '../../../../../services/servicesStates/otros/anexos/getAnexosTareaOtros.service';
import { columnsDocumentos } from './columnsDocumentos/ColumnsDocumentos';
import { DownloadButton } from '../../../../../../../../../../utils/DownloadButton/DownLoadButton';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { aceptarTareaDocs } from '../../../../../../../toolkit/thunks/documentos/aceptarTareaDocs.service';
import { getListadoDocsByPerson } from '../../../../../../../toolkit/thunks/documentos/getListDocsByPerson.service';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { ModalAsignados } from './ModalAsignados';

export const ElementosDocumentos = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const {
    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas,
    listaTareasPqrsdfTramitesUotrosUopas,
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
    setShowAsignaciones
  } = useContext(ModalAndLoadingContext);


  // ? FUNCIONES PARA EL COMPONENTE

  const handleAcceptClick = async (row: {
    id_tarea_asignada: number;
    tipo_tarea: string;
  }) => {
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
        const res = await aceptarTareaDocs(
          row.id_tarea_asignada
        );

        const listadoTareas = await getListadoDocsByPerson(
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

  // ? FUNCIONES PARA EL COMPONENTE ---------------

  //* columnas necesarias para la interacción
  const columns = [
    ...columnsDocumentos,
    {
      headerName: "¿Documento Finalizado?",
      field: "finalizado",
      width: 250,
      renderCell: (params: GridCellParams | GridValueGetterParams) => {
        return (
          <Chip
            size="small"
            label={params?.row?.documento?.finalizado ? 'Finalizado' : 'En proceso'}
            color={params?.row?.documento?.finalizado ? 'success' : 'warning'}
          />
        );
      },
      // renderCell: (params: any) => params?.value?.documento?.finalizado ? 'Finalizado' : 'Sin Finalizar',
    },
    {
      headerName: "¿Documento Firmado?",
      field: "firma",
      width: 250,
      renderCell: (params: GridCellParams | GridValueGetterParams) => {
        return (
          <Chip
            size="small"
            label={params?.row?.asignaciones?.firma ? (params?.row?.asignaciones?.persona_firmo ? 'Firmado' : 'Sin Firmar') : 'N/A'}
            color={params?.row?.asignaciones?.firma ? (params?.row?.asignaciones?.persona_firmo ? 'success' : 'error'): 'warning'}
          />
        );
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
          case 'Cancelado':
            return (
              <>
                <Chip
                  label="Tarea Cancelada"
                  color="warning"
                  variant="outlined"
                  size="small"
                />
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
      minWidth: 220,
      renderCell: (params: GridCellParams | GridValueGetterParams) => {
        return (
          <>
              <>
                <DownloadButton
                fileName={params.row?.documento?.archivos_digitales?.nombre_de_Guardado ?? 'Nombre-Bia'}
                fileUrl={params?.row?.documento?.archivos_digitales?.ruta_archivo ?? ''}
                condition={false}
                  />
              </>
            {/* </Link>*/}

            <Tooltip title="Ir a módulo de generador de documentos">
              <IconButton
                sx={{
                  marginLeft: '20px',
                }}
                onClick={() => {
                  console.log(params.row)
                  navigate('/app/gestor_documental/documentos')
                  dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(params.row));
                }}
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <CallMadeIcon
                    sx={{
                      color: 'warning.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>

            {params.row.documento?.id_persona_genera === id_persona && <Tooltip title="Ver usuarios asignados">
              <AssignmentIndIcon
                sx={{
                  ...iconStyles,
                  color: 'primary.main',
                  background: undefined,
                }}
                onClick={() => {
                  dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(params.row));
                  setShowAsignaciones(true)
                }}
              />
            </Tooltip>}
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
      <ModalAsignados />
      <RenderDataGrid
        rows={
          listaTareasPqrsdfTramitesUotrosUopas /*.filter(
            (el: { radicado: string }) => el.radicado
          )*/ ?? []
        }
        columns={columns ?? []}
        title={`Listado de documentos`}
        /*aditionalElement={
          currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea ? (
            <Button
              endIcon={<ClearAllIcon />}
              onClick={() => {
                dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
              }}
              variant="contained"
              color="primary"
            >
              Quitar selección de Tarea solicitud de otros
            </Button>
          ) : null
        }*/
      />
    </>
  );
};
