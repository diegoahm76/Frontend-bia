/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useState } from 'react';
import { PanelVentanillaContext } from '../../../../../../../context/PanelVentanillaContext';
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
  setActionssToManagePermissions,
  setCurrentElementPqrsdComplementoTramitesYotros,
  setListaElementosComplementosRequerimientosOtros,
  setListaHistoricoSolicitudes,
} from '../../../../../../../toolkit/store/PanelVentanillaStore';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import Swal from 'sweetalert2';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { getComplementosAsociadosPqrsdf } from '../../../../../../../toolkit/thunks/PqrsdfyComplementos/getComplementos.service';
import { getHistoricoByRadicado } from '../../../../../../../toolkit/thunks/PqrsdfyComplementos/getHistoByRad.service';
import { getAnexosPqrsdf } from '../../../../../../../toolkit/thunks/PqrsdfyComplementos/anexos/getAnexosPqrsdf.service';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';

export const ListaElementosPqrsdf = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* navigate declaration
  const navigate = useNavigate();
  //* context declaration
  const {
    setRadicado,
    setValue,

    setAnexos,
  } = useContext(PanelVentanillaContext);
  const {
    handleGeneralLoading,
    handleThirdLoading,

    handleOpenModalOne: handleOpenInfoAnexos,
    handleOpenModalTwo: handleOpenInfoMetadatos,
  } = useContext(ModalAndLoadingContext);

  const handleRequestRadicado = async (radicado: string) => {
    try {
      const historico = await getHistoricoByRadicado('', handleGeneralLoading);

      const historicoFiltrado = historico.filter(
        (element: any) => element?.cabecera?.radicado === radicado
      );

      dispatch(setListaHistoricoSolicitudes(historicoFiltrado));
    } catch (error) {
      console.error('Error handling request radicado: ', error);
      // Handle or throw error as needed
    }
  };

  //* loader button simulacion
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  //* loader button simulacion
  const [loadingStatesUser, setLoadingStatesUser] = useState<
    Record<string, boolean>
  >({});

  //* redux states
  const {
    listaElementosPqrsfTramitesUotros,
    actions,
    currentElementPqrsdComplementoTramitesYotros,
  } = useAppSelector((state) => state.PanelVentanillaSlice);

  // ? functions
  const setActionsPQRSDF = (pqrsdf: any) => {
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
      text: 'Seleccionaste un elemento que se utilizará en los procesos de este módulo. Se mantendrá seleccionado hasta que elijas uno diferente, realices otra búsqueda o reinicies el módulo.',
      showConfirmButton: true,
    });

    const shouldDisable = (actionId: string) => {
      const hasAnexos = pqrsdf.cantidad_anexos > 0;
      const requiresDigitalization = pqrsdf.requiere_digitalizacion;
      const isRadicado = pqrsdf.estado_solicitud === 'RADICADO';
      const isEnVentanillaSinPendientes =
        pqrsdf.estado_solicitud === 'EN VENTANILLA SIN PENDIENTES';
      const isEnVentanillaConPendientes =
        pqrsdf.estado_solicitud === 'EN VENTANILLA CON PENDIENTES';
      const isEnGestion = pqrsdf.estado_solicitud === 'EN GESTION';

      // ? revisar este de en gestión para ver si es correcto
      if (isEnGestion) {
        return (
          actionId === 'Dig' ||
          actionId === 'AsigGrup' ||
          actionId === 'AsigPer'
        );
      }

      // Primer caso
      if (isRadicado && !hasAnexos) {
        return !(actionId === 'AsigGrup' || actionId === 'AsigPer');
      }

      // Segundo caso
      if (isRadicado && hasAnexos && !requiresDigitalization) {
        //* se habilitan todos
        return !(
          actionId === 'Dig' ||
          actionId === 'AsigGrup' ||
          actionId === 'AsigPer'
        );
      }

      // Tercer caso
      if (isRadicado && hasAnexos && requiresDigitalization) {
        return !(
          actionId === 'Dig' ||
          // actionId === 'AsigGrup' ||
          actionId === 'AsigPer'
        );
      }

      // * cuarto caso
      if (isEnVentanillaSinPendientes && !requiresDigitalization) {
        return !(
          // actionId === 'Dig' ||
          actionId === 'AsigGrup' ||
          actionId === 'AsigPer'
        );
      }

      // quinto caso
      if (isEnVentanillaSinPendientes && requiresDigitalization) {
        return !(
          actionId === 'Dig' ||
          // actionId === 'AsigGrup' ||
          actionId === 'AsigPer'
        );
      }

      if (isEnVentanillaConPendientes) {
        return !(
          actionId === 'Dig' ||
          // actionId === 'AsigGrup' ||
          actionId === 'AsigPer'
        );
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
  };

  //* espacio para la definición de las columnas
  const columns = [
    ...columnsPqrsdf,
    {
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
    },
    {
      headerName: 'Días para respuesta',
      field: 'dias_respuesta',
      minWidth: 250,
      renderCell: (params: any) => {
        switch (true) {
          case params.row.dias_respuesta >= 7:
            return (
              <Chip
                size="small"
                label={`${params.row.dias_respuesta} día(s)`}
                color="success"
                variant="outlined"
              />
            );
          case params.row.dias_respuesta < 7 && params.row.dias_respuesta > 4:
            return (
              <Chip
                size="small"
                label={`${params.row.dias_respuesta} día(s)`}
                color="warning"
                variant="outlined"
              />
            );
          case params.row.dias_respuesta <= 4 && params.row.dias_respuesta > 0:
            return (
              <Chip
                label={`${params.row.dias_respuesta} día(s)`}
                color="error"
                variant="outlined"
                size="small"
              />
            );
          case params.row.dias_respuesta <= 0:
            return (
              <Chip
                label={`Tiempo agotado hace ${Math.abs(
                  params.row.dias_respuesta
                )} día(s)`}
                color="error"
                variant="outlined"
                size="small"
              />
            );
          default:
            return params.row.dias_respuesta;
        }
      },
    },
    {
      headerName: 'Número de solicitudes de digitalización',
      field: 'numero_solicitudes_digitalizacion',
      minWidth: 300,
      renderCell: (params: any) => {
        return (
          <LoadingButton
            loading={loadingStates[params.row.id_PQRSDF]}
            color="primary"
            variant="contained"
            onClick={() => {
              if (params.value === 0) {
                control_warning(
                  'No hay solicitudes de digitalización para este radicado, por lo tanto no se podrá ver historial de solicitudes de digitalización'
                );
                return;
              } else {
                setLoadingStates((prev) => ({
                  ...prev,
                  [params.row.id_PQRSDF]: true,
                }));
                // Simulate an async operation
                setTimeout(() => {
                  setValue(1);
                  //* se debe reemplazar por el radicado real que viene dentro del elemento que se va a buscar
                  setRadicado(params?.row?.radicado);
                  handleRequestRadicado(params?.row?.radicado);
                  setLoadingStates((prev) => ({
                    ...prev,
                    [params.row.id_PQRSDF]: false,
                  }));
                }, 1000);
              }
            }}
          >
            {`Solicitudes de digitalización: ${params.value}`}
          </LoadingButton>
        );
      },
    },
    {
      headerName: 'Número de solicitudes de usuario',
      field: 'numero_solicitudes_usuario',
      minWidth: 300,
      renderCell: (params: any) => {
        return (
          <>
            <LoadingButton
              loading={loadingStatesUser[params.row.id_PQRSDF]}
              color="warning"
              variant="outlined"
              onClick={() => {
                if (params.value === 0) {
                  control_warning(
                    'No hay solicitudes de al usuario para este radicado, por lo tanto no se podrá ver historial de solicitudes de al usuario'
                  );
                  return;
                } else {
                  setLoadingStatesUser((prev) => ({
                    ...prev,
                    [params.row.id_PQRSDF]: true,
                  }));
                  // Simulate an async operation
                  setTimeout(() => {
                    setValue(1);
                    //* se debe reemplazar por el radicado real que viene dentro del elemento que se va a buscar
                    setRadicado(params?.row?.radicado);
                    handleRequestRadicado(params?.row?.radicado);
                    setLoadingStates((prev) => ({
                      ...prev,
                      [params.row.id_PQRSDF]: false,
                    }));
                  }, 1000);
                }
              }}
            >
              {`Solicitudes al  usuario: ${params.value}`}
            </LoadingButton>
          </>
        );
      },
    },
    {
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
    },
    {
      headerName: 'Acciones',
      field: 'Acciones',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Ver info pqrsdf">
              <IconButton
                onClick={() => {
                  void getAnexosPqrsdf(params?.row?.id_PQRSDF).then((res) => {
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
                  });
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

            {/*segundo elemento definición*/}

            <Tooltip
              title={`Ver complementos relacionados a pqrsdf con asunto ${params?.row?.asunto}`}
            >
              <IconButton
                sx={{
                  color: !params?.row?.tiene_complementos
                    ? 'disabled'
                    : 'info.main',
                }}
                onClick={() => {
                  if (!params.row.tiene_complementos) {
                    void Swal.fire({
                      title: 'Opps...',
                      icon: 'error',
                      text: `Esta PQRSDF no tiene complementos asociados`,
                      showConfirmButton: true,
                    });
                    dispatch(
                      setListaElementosComplementosRequerimientosOtros([])
                    );
                  } else {
                    void getComplementosAsociadosPqrsdf(
                      params.row.id_PQRSDF,
                      handleThirdLoading
                    ).then((res) => {
                      dispatch(
                        setListaElementosComplementosRequerimientosOtros(res)
                      );
                    });
                  }
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

            <Tooltip title="Seleccionar elemento para procesos">
              <IconButton
                onClick={() => {
                  if (params?.row?.estado_asignacion_grupo === 'EN GESTION') {
                    control_warning(
                      'No se pueden seleccionar esta pqrsdf ya que ha sido asignada a un grupo'
                    );
                    return;
                  }

                  dispatch(
                    setListaElementosComplementosRequerimientosOtros([])
                  );

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
      <RenderDataGrid
        rows={
          listaElementosPqrsfTramitesUotros.filter(
            (el: { radicado: string }) => el.radicado
          ) ?? []
        }
        columns={columns ?? []}
        title={`Lista de solicitudes de ${listaElementosPqrsfTramitesUotros[0]?.tipo_solicitud}`}
        aditionalElement={
          currentElementPqrsdComplementoTramitesYotros?.tipo_solicitud ? (
            <Button
              onClick={() => {
                dispatch(setCurrentElementPqrsdComplementoTramitesYotros(null));
              }}
              variant="contained"
              color="primary"
              endIcon={<RemoveDoneIcon />}
            >
              Quitar selección de PQRSDF
            </Button>
          ) : null
        }
      />
    </>
  );
};
