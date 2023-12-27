/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useEffect, useState } from 'react';
// import { PanelVentanillaContext } from '../../../../../../../context/PanelVentanillaContext';
import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsPqrsdf } from './columnsPqrsdf/columnsPqrsdf';
import { control_warning } from '../../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import TaskIcon from '@mui/icons-material/Task';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import Swal from 'sweetalert2';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { setCurrentTareaPqrsdfTramitesUotrosUopas } from '../../../../../../../toolkit/store/BandejaDeTareasStore';
import { BandejaTareasContext } from '../../../../../../context/BandejaTareasContext';
/*import { getComplementosAsociadosPqrsdf } from '../../../../../../../toolkit/thunks/PqrsdfyComplementos/getComplementos.service';
import { getHistoricoByRadicado } from '../../../../../../../toolkit/thunks/PqrsdfyComplementos/getHistoByRad.service';
import { getAnexosPqrsdf } from '../../../../../../../toolkit/thunks/PqrsdfyComplementos/anexos/getAnexosPqrsdf.service';
import { ModalDenuncia } from '../../../../../Atom/components/ModalDenuncia';*/

export const ListaElementosPqrsdf = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

    //* redux states
  const {
    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas,
    listaTareasPqrsdfTramitesUotrosUopas,
    actionsTareasPQRSDF,
  } = useAppSelector((state) => state.BandejaTareasSlice);


  //* navigate declaration
  // const navigate = useNavigate();
  //* context declaration
  const {
    setRadicado,
    setValue,

    anexos,
    metadatos,
    setAnexos,
    setMetadatos,
  } = useContext(BandejaTareasContext);
  const {
    handleGeneralLoading,
    handleThirdLoading,
    openModalOne: infoAnexos,
    openModalTwo: infoMetadatos,
    handleOpenModalOne: handleOpenInfoAnexos,
    handleOpenModalTwo: handleOpenInfoMetadatos,
  } = useContext(ModalAndLoadingContext);

  //* loader button simulacion
  /* const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );*/
  //* loader button simulacion
  /* const [loadingStatesUser, setLoadingStatesUser] = useState<
    Record<string, boolean>
  >({});
*/


  // ? functions
  /*  const setActionsPQRSDF = (pqrsdf: any) => {
    //  console.log('')(pqrsdf);

    if (pqrsdf.estado_solicitud === 'EN GESTION') {
      void Swal.fire({
        title: 'Opps...',
        icon: 'error',
        text: `Esta PQRSDF ya se encuentra en gestión, no se pueden hacer acciones sobre ella`,
        showConfirmButton: true,
      });
      return;
    }

    dispatch(setCurrentElementPqrsdComplementoTramitesYotros(pqrsdf));
    void Swal.fire({
      icon: 'success',
      title: 'Elemento seleccionado',
      text: 'Has seleccionado un elemento que se utilizará en los procesos de este módulo. Se mantendrá seleccionado hasta que elijas uno diferente, realices otra búsqueda o reinicies el módulo.',
      showConfirmButton: true,
    });

    const shouldDisable = (actionId: string) => {
      const isAsigGrup = actionId === 'AsigGrup';
      const isDig = actionId === 'Dig';
      const hasAnexos = pqrsdf.cantidad_anexos > 0;
      const requiresDigitalization = pqrsdf.requiere_digitalizacion;
      const isRadicado = pqrsdf.estado_solicitud === 'RADICADO';
      const isEnVentanillaSinPendientes =
        pqrsdf.estado_solicitud === 'EN VENTANILLA SIN PENDIENTES';
      const isEnVentanillaConPendientes =
        pqrsdf.estado_solicitud === 'EN VENTANILLA CON PENDIENTES';

      // Primer caso
      if (isRadicado && !hasAnexos && isDig) {
        return true;
      }

      // Segundo caso
      if (isRadicado && hasAnexos && !requiresDigitalization) {
        return false;
      }

      // Tercer caso
      if (isRadicado && hasAnexos && requiresDigitalization) {
        return isAsigGrup;
      }

      // Cuarto caso
      if (isEnVentanillaSinPendientes && !requiresDigitalization) {
        return false;
      }

      // Quinto caso
      if (isEnVentanillaSinPendientes && requiresDigitalization) {
        return isAsigGrup;
      }

      // Sexto caso
      if (isEnVentanillaConPendientes) {
        return isAsigGrup;
      }

      // Caso por defecto
      return actionId === 'Dig' && !(requiresDigitalization && hasAnexos);
    };

    const actionsPQRSDF = actions.map((action: any) => ({
      ...action,
      disabled: shouldDisable(action.id),
    }));

    //  console.log('')(actionsPQRSDF);
    dispatch(setActionssToManagePermissions(actionsPQRSDF));
  };*/

  //* columns -------------------------------------------------------

  const columns = [
    ...columnsPqrsdf,
    {
      headerName: 'Días para respuesta',
      field: 'dias_para_respuesta',
      minWidth: 250,
      renderCell: (params: any) => {
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
          case params.row.dias_para_respuesta < 7 && params.row.dias_para_respuesta > 4:
            return (
              <Chip
                size="small"
                label={`${params.row.dias_para_respuesta} día(s)`}
                color="warning"
                variant="outlined"
              />
            );
          case params.row.dias_para_respuesta <= 4 && params.row.dias_para_respuesta > 0:
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
      headerName: 'Estado de asignación',
      field: 'estado_asignacion',
      minWidth: 220,
      renderCell: (params: any) => {
        const estadoAsignacion = params.row.estado_asignacion;
        const estadoAsignacionColor =
          estadoAsignacion === 'ACEPTADA'
            ? 'success'
            : estadoAsignacion === 'RECHAZADA'
            ? 'error'
            : 'warning';
        return (
          <Chip
            size="small"
            label={estadoAsignacion}
            color={estadoAsignacionColor}
            variant="outlined"
          />
        );
      },
    },

    {
      headerName: 'Acciones',
      field: 'Acciones',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Ver info de la tarea">
              <IconButton
                onClick={() => {

                  // ? se usará la función de los anexos de la pqrsdf para mostrar la información de la tarea, ya que contiene la información de la tarea (que es la misma que la de la pqrsdf)

                  //* se debe llamar el servicio del detalle de la pqrsdf para traer la informacion y en consecuencias luego traer los anexos para la pqrsdf

                  /*void getAnexosPqrsdf(params?.row?.id_PQRSDF).then((res) => {
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
            {/* </Link>*/}

            <Tooltip title="Seleccionar tarea para procesos">
              <IconButton
                onClick={() => {
                  /*if (params?.row?.estado_asignacion_grupo === 'EN GESTION') {
                    control_warning(
                      'No se pueden seleccionar esta pqrsdf ya que ha sido asignada a un grupo'
                    );
                    return;
                  }

                  dispatch(
                    setListaElementosComplementosRequerimientosOtros([])
                  );

                  setActionsPQRSDF(params?.row);*/
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
  ]

  return (
    <>
      <RenderDataGrid
        rows={listaTareasPqrsdfTramitesUotrosUopas ?? []}
        columns={columns ?? []}
        title={`Listado de tareas asignadas en PQRSDF`}
        aditionalElement={
          currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea ? (
            <Button
              onClick={() => {
                dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
              }}
              variant="contained"
              color="primary"
            >
              Quitar selección de Tarea
            </Button>
          ) : null
        }
      />
    </>
  );
};
