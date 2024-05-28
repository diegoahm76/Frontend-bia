/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { PanelVentanillaContext } from '../../../../../../../context/PanelVentanillaContext';
import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';

import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import TaskIcon from '@mui/icons-material/Task';
import PreviewIcon from '@mui/icons-material/Preview';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import {
  setActionssToManagePermissionsTramitesYServicios,
  // setActionssToManagePermissions,
  setCurrentElementPqrsdComplementoTramitesYotros,
  setListaElementosComplementosRequerimientosOtros,
} from '../../../../../../../toolkit/store/PanelVentanillaStore';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import Swal from 'sweetalert2';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { columnsTramites } from './columnsTramites/columnsTramites';

import { control_warning } from '../../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { ModalTramitesServicio } from '../../../../../Atom/modalTramiteServicios/ModalTramitesServicio';
import { getComplementosAsociadosTramite } from '../../../../../../../toolkit/thunks/TramitesyServiciosyRequerimientos/getComplementosTramites.service';
import { ModalDetalleTramite } from '../../../../../Atom/modalDetalleTramite/ModalDetalleTramite';
import { showAlert } from '../../../../../../../../../../utils/showAlert/ShowAlert';
import BalanceIcon from '@mui/icons-material/Balance';
import { handleApiError } from '../../../../../../../../../../utils/functions/errorManage';
import { api } from '../../../../../../../../../../api/axios';
import { de } from 'date-fns/locale';

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
    // handleGeneralLoading,
  } = useContext(PanelVentanillaContext);
  const { handleOpenModalOne, handleThirdLoading, handleSixthLoading } =
    useContext(ModalAndLoadingContext);

  //* redux states
  const {
    listaElementosPqrsfTramitesUotros,
    actionsTramitesYServicios,
    currentElementPqrsdComplementoTramitesYotros,
  } = useAppSelector((state) => state.PanelVentanillaSlice);

  // ? functions
  const setActionsTramites = (tramite: any) => {
    if (tramite.estado_solicitud === 'EN GESTION') {
      void Swal.fire({
        title: 'Opps...',
        icon: 'error',
        text: `Este trámite ya se encuentra en gestión, no se pueden hacer acciones sobre él`,
        showConfirmButton: true,
      });
      return;
    }

    /*
    const actionsTramitesYServicios: any[] = [
  {
    id: 'Jurídica',
  },
  {
    id: 'AsigGrup',
  },
  {
    id: 'Dig',
  },
];


{
    "nombre_cod_tipo_operacion_tramite": "Nuevo",
    "nombre_cod_relacion_con_el_titular": "Misma persona",
    "estado_actual_solicitud": "EN VENTANILLA CON PENDIENTES",
    "nombre_sucursal": null,
    "medio_solicitud": "Portal Web",
    "nombre_completo_titular": "1121889493",
    "radicado": "UNICO-2024-00092",
    "tipo_solicitud": "TRAMITE",
    "nombre_tramite": null,
    "cantidad_anexos": 2,
    "estado_asignacion_grupo": "Aceptado",
    "persona_asignada": "Fernando  Rueda Londoño",
    "unidad_asignada": "Planeación",
    "cod_relacion_con_el_titular": "MP",
    "cod_tipo_operacion_tramite": "N",
    "nombre_proyecto": "test",
    "costo_proyecto": "0.00",
    "pago": false,
    "fecha_registro": "2024-02-16T15:18:32.413039",
    "fecha_envio_solicitud": null,
    "fecha_finalizada_solicitud": null,
    "cantidad_predios": null,
    "solicitud_enviada": false,
    "fecha_radicado": "2024-02-16T15:18:32.394795",
    "fecha_expediente": null,
    "fecha_inicio": null,
    "requiere_digitalizacion": true,
    "fecha_envio_definitivo_a_digitalizacion": "2024-02-19T00:48:05.734156",
    "fecha_digitalizacion_completada": null,
    "fecha_rta_final_gestion": null,
    "fecha_ini_estado_actual": "2024-02-16T15:18:32.399441",
}



    */

    dispatch(setCurrentElementPqrsdComplementoTramitesYotros(tramite));
    void Swal.fire({
      icon: 'success',
      title: 'Elemento seleccionado',
      text: 'Seleccionaste un elemento que se utilizará en los procesos de este módulo. Se mantendrá seleccionado hasta que elijas uno diferente, realices otra búsqueda o reinicies el módulo.',
      showConfirmButton: true,
    });

      const shouldDisable = (actionId: string) => {
      const isNoSeleccionado = !tramite;
      const isAsigGrup = actionId === 'AsigGrup';
      const isDig = actionId === 'Dig';
      const hasAnexos = tramite.cantidad_anexos > 0;
      const requiresDigitalization = tramite.requiere_digitalizacion;
      const isRadicado = tramite.estado_actual_solicitud === 'RADICADO';
      const isEnVentanillaSinPendientes =
      tramite.estado_actual_solicitud === 'EN VENTANILLA SIN PENDIENTES';
      const isEnVentanillaConPendientes =
      tramite.estado_actual_solicitud === 'EN VENTANILLA CON PENDIENTES';
      const isEnGestion = tramite.estado_actual_solicitud === 'EN GESTION';
      const pendienteRevisionJuridica = tramite.estado_actual_solicitud === 'PENDIENTE DE REVISIÓN JURIDICA DE VENTANILLA';
      const revisadoPorJuridicaDeVentanilla = tramite.estado_actual_solicitud === 'REVISADO POR JURIDICA DE VENTANILLA';
      const tramiteLiquidado = tramite.estado_actual_solicitud === 'LIQUIDADO';
      const pendienteDePago = tramite.estado_actual_solicitud === 'PENDIENTE DE PAGO';
      const pagad = tramite.estado_actual_solicitud === 'PAGADO';

        // pay
      

      if (isNoSeleccionado) {
        return true;
      }

      //?  primer caso
      if (isRadicado && !hasAnexos) {
        return !(actionId === 'Jurídica'); // || actionId === 'AsigGrup'
      }
      // ? segundo caso
      if (isRadicado && hasAnexos && !requiresDigitalization) {
        return !(
          actionId === 'Jurídica'
        );
      }
      // ? tercer caso
      if (isRadicado && hasAnexos && requiresDigitalization) {
        return !(/*actionId === 'Jurídica' ||*/ actionId === 'Dig');
      }
      // ? cuarto caso
      if (isEnVentanillaSinPendientes && !requiresDigitalization) {
        return !(
          actionId === 'Jurídica' // ||
          //actionId === 'Dig' ||
          // actionId === 'AsigGrup'
        );
      }
      // ? quinto caso
      if (isEnVentanillaSinPendientes && requiresDigitalization) {
        return !(actionId === 'Dig');
      }

      // ? sexto caso
      if (isEnVentanillaConPendientes) {
        return !(actionId === 'Dig' /*|| actionId === 'Jurídica'*/);
      }

      if(pendienteRevisionJuridica){
        return !(actionId === 'Jurídica');
      }

      if(revisadoPorJuridicaDeVentanilla){
        return !(actionId === 'Jurídica');
      }

      if(tramiteLiquidado){
        return !(actionId === 'Jurídica' || actionId === 'Pay');
      }

      if(pendienteDePago){
        return !(actionId === 'Jurídica' || actionId === 'Pay');
      }

      if(pagad){
        return !(actionId === 'AsigGrup' || actionId === 'Jurídica' || actionId === 'Pay' || actionId === 'Dig');
      }

      if (isEnGestion) {
        return true;
      }


    // ? se debe actualizar al valor de la consante
    const actionsTramites = actionsTramitesYServicios.map((action: any) => ({
      ...action,
      disabled: shouldDisable(action.id),
    }));

   dispatch(setActionssToManagePermissionsTramitesYServicios(actionsTramitesYServicios));
  };
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
              title={`Ver complementos asociados a trámite con radicado ${params?.row?.radicado}`}
            >
              <IconButton
                onClick={() => {
                  (async () => {
                    try {
                      const res = await getComplementosAsociadosTramite(
                        params.row.id_solicitud_tramite,
                        handleThirdLoading
                      );
                      dispatch(
                        setListaElementosComplementosRequerimientosOtros(res)
                      );
                    } catch (error) {
                      console.error(
                        'Error al obtener los complementos asociados al trámite:',
                        error
                      );
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
            <Tooltip title="Ver información asociada a trámite">
              <IconButton
                onClick={() => {
                  setActionsTramites(params?.row)
                  handleOpenModalOne(true);
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
                  if (params?.row?.estado_asignacion_grupo === 'EN GESTION') {
                    control_warning(
                      'No se pueden seleccionar esta pqrsdf ya que ha sido asignada a un grupo'
                    );
                    return;
                  }
                  console.log(params.row);
                  dispatch(
                    setListaElementosComplementosRequerimientosOtros([])
                  );

                  setActionsTramites(params?.row);
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
            <Tooltip title="Ver detalle del trámite">
              <IconButton
                onClick={() => {
                  handleSixthLoading(true);
                  setActionsTramites(params?.row);
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
                  <PreviewIcon
                    sx={{
                      color: 'success.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Crear solicitud revisión jurídica">
              <IconButton
                onClick={async () => {
                  dispatch(setCurrentElementPqrsdComplementoTramitesYotros(params.row));
                  await Swal.fire({
                    title: '¿Desea crear la revisión jurídica del trámite?',
                    //.',
                    showDenyButton: true,
                    confirmButtonText: `Si`,
                    denyButtonText: `No, cancelar`,
                    confirmButtonColor: '#3085d6',
                    denyButtonColor: '#d33',
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));
                      await delay(3000);
                      const { id_solicitud_tramite } =
                        currentElementPqrsdComplementoTramitesYotros;
                      const createSolicitudRevisionJuridica = async () => {
                        try{
                          const url = `/api/gestor/panel_ventanilla/tramites/solicitud_juridica/create/`
                          const dataPost = {
                            id_solicitud_tramite,
                          }
                          const {data} = await api.post(url, dataPost);

                          if(data?.succes){
                            showAlert(
                              'Solicitud de revisión jurídica creada',
                              data?.detail,
                              'success'
                            );
                          }else{
                            showAlert(
                              'Opps...',
                              data?.detail,
                              'error'
                            );
                          }
                        }
                        catch(error: any){
                          handleApiError(error, error?.response.data.detail);
                        }
                      };
                      await createSolicitudRevisionJuridica();
                    } else if (result.isDenied) {
                      showAlert(
                        'Opps...',
                        'Haz decidido no crear la solicitud de revisión jurídica del trámite.',
                        'info'
                      );
                    }
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
                  <BalanceIcon
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
      {/*Modal para mostrar el detalle de la información de los trámites que viene desde sasoftco*/}
      <ModalDetalleTramite />
      {/*Modal para mostrar el detalle de la información de los trámites que viene desde sasoftco*/}

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
      {/*modal para ver la información de la solicitud de otro seleccionada*/}
      <ModalTramitesServicio />
      {/*modal para ver la información de la solicitud de otro seleccionada*/}
    </>
  );
};
