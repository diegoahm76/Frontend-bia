/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { setCurrentTareaPqrsdfTramitesUotrosUopas } from '../../../../../../../toolkit/store/BandejaDeTareasStore';
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

export const ElementosTramitesYServicios = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const {
    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas,
    listaTareasPqrsdfTramitesUotrosUopas,
    actionsTramitesYServicios,
  } = useAppSelector((state) => state.BandejaTareasSlice);

  // ? ------------------------ DEFINICION DE FUNCIONES PARA EL COMPONENTE
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
                      /*handleRejectClick(params.row)*/ console.log(params.row)
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
                  // setActionsOtros(params?.row);
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
      {/* <ModalRejectTask />*/}
      {/*se genera un espacio para el modal que muestra el comentario de rechazo de la tarea*/}
      {/*<ModalSeeRejectedTask />*/}
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
