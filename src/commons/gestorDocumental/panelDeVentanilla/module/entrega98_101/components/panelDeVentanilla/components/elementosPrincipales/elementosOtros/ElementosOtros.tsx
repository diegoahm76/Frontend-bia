/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import {
  setActionsOtros,
  setCurrentElementPqrsdComplementoTramitesYotros,
  setListaElementosComplementosRequerimientosOtros,
  setListaHistoricoSolicitudes,
} from '../../../../../../../toolkit/store/PanelVentanillaStore';
import { columnsOtros } from './columnsOtros/columnsOtros';
import { LoadingButton } from '@mui/lab';
import { control_warning } from '../../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import Swal from 'sweetalert2';
import TaskIcon from '@mui/icons-material/Task';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ModalOtros } from '../../../../../Atom/otrosModal/ModalOtros';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { useContext, useState } from 'react';
import { getHistoricoOtrosByRadicado } from '../../../../../../../toolkit/thunks/otros/getHistoricoOtrosByRadicado.service';
import { PanelVentanillaContext } from '../../../../../../../context/PanelVentanillaContext';

export const ElementosOtros = (): JSX.Element => {
  //* redux states
  const {
    listaElementosPqrsfTramitesUotros,
    currentElementPqrsdComplementoTramitesYotros,
    actionsOtros,
  } = useAppSelector((state) => state.PanelVentanillaSlice);

  const { handleOpenModalOne, handleGeneralLoading } = useContext(
    ModalAndLoadingContext
  );
  const { setRadicado, setValue, setAnexos } = useContext(
    PanelVentanillaContext
  );
  //* dispatch necesario
  const dispatch = useAppDispatch();

  //* states
  //* loader button simulacion
  const [loadingStates, setLoadingStates] = useState<any>({});

  //* FUNCTIONS ---------------

  const handleRequestRadicadoOtro = async (radicado: string) => {
    try {
      const historico = await getHistoricoOtrosByRadicado(
        '',
        handleGeneralLoading
      );

      const historicoFiltrado = historico.filter(
        (element: any) => element?.cabecera?.radicado === radicado
      );

      dispatch(setListaHistoricoSolicitudes(historicoFiltrado));
    } catch (error) {
      console.error('Error handling request radicado: ', error);
      // Handle or throw error as needed
    }
  };

  const setActionsOtrosManejo = (otro: any) => {
    if (otro.estado_solicitud === 'EN GESTION') {
      void Swal.fire({
        title: 'Opps...',
        icon: 'error',
        text: `Este otro ya se encuentra en gestión, no se pueden hacer acciones sobre él`,
        showConfirmButton: true,
      });
      return;
    }

    dispatch(setCurrentElementPqrsdComplementoTramitesYotros(otro));
    void Swal.fire({
      icon: 'success',
      title: 'Elemento seleccionado',
      text: 'Seleccionaste un elemento que se utilizará en los procesos de este módulo. Se mantendrá seleccionado hasta que elijas uno diferente, realices otra búsqueda o reinicies el módulo.',
      showConfirmButton: true,
    });

    /*
  {
    "tipo_solicitud": "OTROS",
    "nombre_completo_titular": "SUPERUSUARIO 1er NOMBRE SUPERUSUARIO 1er APELL",
    "asunto": "Prueba",
    "cantidad_anexos": 1,
    "radicado": "UNICO-2024-00017",
    "fecha_radicado": "2024-01-17T14:46:20.563888",
    "requiere_digitalizacion": false,
    "estado_solicitud": "RADICADO",
    "estado_asignacion_grupo": null,
    "persona_asignada": null,
    "persona_recibe": null,
    "numero_solicitudes_digitalizacion": 0,
    "nro_folios_totales": 1,
    "unidad_asignada": null,
    "es_pqrsdf": false,
    "persona_interpone": "SUPERUSUARIO 1er NOMBRE SUPERUSUARIO 1er APELL",
    "cod_relacion_titular": "MP",
    "relacion_titular": "Misma persona",
    "medio_solicitud": "Instalaciones de la Corporación",
    "cod_forma_presentacion": "E",
    "forma_presentacion": "Escrita",
    "fecha_registro": "2023-12-13T14:01:32.664712",
    "descripcion": "Prueba 1",
    "nombre_sucursal": null,
    "nombre_sucursal_recepcion_fisica": null,
    "fecha_envio_definitivo_digitalizacion": null,
    "fecha_digitalizacion_completada": null,
    "fecha_inicial_estado_actual": "2023-12-13T14:01:32.664712",
}
    */

    /*
const actionsOtros = [
  {
    id: 'DigOtro',
  },
  {
    id: 'AsigGrupOtro',
  },
];
*/

    const shouldDisable = (actionId: string) => {
      const isNoSeleccionado = !otro;
      const isAsigGrup = actionId === 'AsigGrupOtro';
      const isDig = actionId === 'DigOtro';
      const hasAnexos = otro.cantidad_anexos > 0;
      const requiresDigitalization = otro.requiere_digitalizacion;
      const isRadicado = otro.estado_solicitud === 'RADICADO';
      const isEnVentanillaSinPendientes =
        otro.estado_solicitud === 'EN VENTANILLA SIN PENDIENTES';
      const isEnVentanillaConPendientes =
        otro.estado_solicitud === 'EN VENTANILLA CON PENDIENTES';
      const isEnGestion = otro.estado_solicitud === 'EN GESTION';

      // ? validacion
      if (isNoSeleccionado) {
        return true;
      }

      //?  primer caso
      if (isRadicado && !hasAnexos) {
        return !(actionId === 'AsigGrupOtro');
      }
      // ? segundo caso
      if (isRadicado && hasAnexos && !requiresDigitalization) {
        return !(actionId === 'AsigGrupOtro' /*|| actionId === 'DigOtro'*/);
      }
      // ? tercer caso
      if (isRadicado && hasAnexos && requiresDigitalization) {
        return !(actionId === 'DigOtro');
      }
      // ? cuarto caso
      if (isEnVentanillaSinPendientes && !requiresDigitalization) {
        return !(/*actionId === 'DigOtro' ||*/ actionId === 'AsigGrupOtro');
      }
      // ? quinto caso
      if (isEnVentanillaSinPendientes && requiresDigitalization) {
        return !(actionId === 'DigOtro');
      }

      // ? sexto caso
      if (isEnVentanillaConPendientes) {
        return !(actionId === 'DigOtro');
      }

      if (isEnGestion) {
        return true;
      }

      return actionId === 'DigOtro' && !(requiresDigitalization && hasAnexos);
    };

    const actionsOtrosNew = actionsOtros.map((action: any) => ({
      ...action,
      disabled: shouldDisable(action.id),
    }));

    dispatch(setActionsOtros(actionsOtrosNew));
  };

  // ? columns config
  const columns = [
    ...columnsOtros,
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
    //* sacar para poner color
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
    //* sacar para poner color
    {
      headerName: 'Número de solicitudes de digitalización',
      field: 'numero_solicitudes_digitalizacion',
      minWidth: 300,
      renderCell: (params: any) => {
        return (
          <LoadingButton
            loading={loadingStates[params.row.id_otros]}
            color="primary"
            variant="contained"
            onClick={() => {
              console.log(params.row);
              if (params.value === 0) {
                control_warning(
                  'No hay solicitudes de digitalización para este radicado, por lo tanto no se podrá ver historial de solicitudes de digitalización'
                );
                return;
              } else {
                setLoadingStates((prev: any) => ({
                  ...prev,
                  [params.row.id_otros]: true,
                }));
                // Simulate an async operation
                setTimeout(() => {
                  setValue(3);
                  //* se debe reemplazar por el radicado real que viene dentro del elemento que se va a buscar
                  setRadicado(params?.row?.radicado);
                  handleRequestRadicadoOtro(params?.row?.radicado);
                  setLoadingStates((prev: any) => ({
                    ...prev,
                    [params.row.id_otros]: false,
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
      headerName: 'Acciones',
      field: 'Acciones',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Ver info de la solicitud de otros">
              <IconButton
                onClick={() => {
                  handleOpenModalOne(true);
                  setActionsOtrosManejo(params?.row);
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
            <Tooltip title="Seleccionar solicitud de otros para procesos">
              <IconButton
                onClick={() => {
                  if (params?.row?.estado_asignacion_grupo === 'Aceptado') {
                    control_warning(
                      'No se pueden seleccionar esta pqrsdf ya que ha sido asignada a un grupo'
                    );
                    return;
                  }

                  dispatch(
                    setListaElementosComplementosRequerimientosOtros([])
                  );

                  setActionsOtrosManejo(params?.row);
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
          [
            ...listaElementosPqrsfTramitesUotros,
            ...listaElementosPqrsfTramitesUotros,
          ] ?? []
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
              Quitar selección de solicitud de otros
            </Button>
          ) : null
        }
      />
      {/*modal para ver la información de la solicitud de otro seleccionada*/}
      <ModalOtros />
      {/*modal para ver la información de la solicitud de otro seleccionada*/}
    </>
  );
};
