/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, /*useState*/ } from 'react';
import { PanelVentanillaContext } from '../../../../../../../context/PanelVentanillaContext';
import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
//import { useNavigate } from 'react-router-dom';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
//import { control_warning } from '../../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
/*import { LoadingButton } from '@mui/lab';
*/
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import TaskIcon from '@mui/icons-material/Task';
import {
  // setActionssToManagePermissions,
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
/*import { getComplementosAsociadosPqrsdf } from '../../../../../../../toolkit/thunks/PqrsdfyComplementos/getComplementos.service';*/
import { getHistoricoByRadicado } from '../../../../../../../toolkit/thunks/PqrsdfyComplementos/getHistoByRad.service';
/*import { getAnexosPqrsdf } from '../../../../../../../toolkit/thunks/PqrsdfyComplementos/anexos/getAnexosPqrsdf.service';*/
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import { columnsTramites } from './columnsTramites/columnsTramites';

export const ListaElementosTramites = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* navigate declaration
  //const navigate = useNavigate();
  //* context declaration
  const {
    //setRadicado,
    //setValue,

    // setAnexos,
  } = useContext(PanelVentanillaContext);
  const {
    handleGeneralLoading,
    //handleThirdLoading,

    //handleOpenModalOne: handleOpenInfoAnexos,
    //handleOpenModalTwo: handleOpenInfoMetadatos,
  } = useContext(ModalAndLoadingContext);

/*  const handleRequestRadicado = async (radicado: string) => {
    try {
      const historico = await getHistoricoByRadicado('', handleGeneralLoading);

      const historicoFiltrado = historico.filter(
        (element: any) => element?.cabecera?.radicado === radicado
      );

      dispatch(setListaHistoricoSolicitudes(historicoFiltrado));
    } catch (error) {
      console.error('Error handling request radicado: ', error);
    }
  };*/

/*  //* loader button simulacion
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  //* loader button simulacion
  const [loadingStatesUser, setLoadingStatesUser] = useState<
    Record<string, boolean>
  >({});*/

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

    /*  const shouldDisable = (actionId: string) => {
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

    dispatch(setActionssToManagePermissions(actionsPQRSDF));*/
  };

  //* espacio para la definición de las columnas
  const columns = [
    ...columnsTramites,
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
      headerName: 'Pago',
      field: 'pago',
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
    {
      headerName: 'Solictud enviada',
      field: 'solicitud_enviada',
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
    {
      headerName: 'Costo proyecto',
      field: 'costo_proyecto',
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={`$${params.value?.toLocaleString()}`}
            color={params.value > 0 ? 'success' : 'warning'}
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
            <Tooltip
              title={`Ver requerimientos asociados a trámite con radicado ${params?.row?.radicado}`}
            >
              <IconButton
                sx={{
                 /* color: !params?.row?.tiene_complementos
                    ? 'disabled'
                    : 'info.main',*/
                }}
                onClick={() => {
                /*  if (!params.row.tiene_complementos) {
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
                  }*/
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
            <Tooltip title="Ver info trámite">
              <IconButton
                onClick={() => {
                  console.log(params.row);

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
            <Tooltip title="Seleccionar trámite para procesos">
              <IconButton
                onClick={() => {
                  /* if (params?.row?.estado_asignacion_grupo === 'EN GESTION') {
                    control_warning(
                      'No se pueden seleccionar esta pqrsdf ya que ha sido asignada a un grupo'
                    );
                    return;
                  }*/
                  console.log(params.row);
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
            (el: { radicado: string }) => el?.radicado
          ) ?? []
        }
        columns={columns ?? []}
        title={`Lista de solicitudes de ${listaElementosPqrsfTramitesUotros[0]?.tipo_solicitud}S`}
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
              Quitar selección de trámite / servicio
            </Button>
          ) : null
        }
      />
    </>
  );
};
