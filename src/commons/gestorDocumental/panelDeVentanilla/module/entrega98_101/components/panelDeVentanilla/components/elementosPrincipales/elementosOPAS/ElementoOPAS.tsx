/* eslint-disable @typescript-eslint/naming-convention */

import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  setActionssToManagePermissionsOpas,
  setCurrentElementPqrsdComplementoTramitesYotros,
  setListaElementosComplementosRequerimientosOtros,
} from '../../../../../../../toolkit/store/PanelVentanillaStore';
import { columnsOpas } from './columnsOpas/columnsOpas';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import TaskIcon from '@mui/icons-material/Task';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ModalOpa as ModalOpaInformacion } from '../../../../../Atom/Opas/ModalOpa';
import { useContext } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import Swal from 'sweetalert2';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { getComplementosAsociadosPqrsdf } from '../../../../../../../toolkit/thunks/PqrsdfyComplementos/getComplementos.service';
import { getComplementosAsociadosOpas } from '../../../../../../../toolkit/thunks/opas/complementos/getComplementosOpas.service';

export const ElementoOPAS = (): JSX.Element => {
  // ? dispatch necesario
  const dispatch = useAppDispatch();

  //* redux states

  const {
    listaElementosPqrsfTramitesUotros,
    currentElementPqrsdComplementoTramitesYotros,
    actionsOpas,
  } = useAppSelector((state) => state.PanelVentanillaSlice);

  //* context necesario

  const { handleOpenModalOne, handleThirdLoading } = useContext(
    ModalAndLoadingContext
  );

  // ? set actions OPAS, button selected

  const setActionsOpas = (opa: any) => {
    if (
      opa?.estado_actual === 'EN GESTION' ||
      opa?.estado_asignacion_grupo === 'ACEPTADO'
    ) {
      void Swal.fire({
        title: 'Opps...',
        icon: 'error',
        text: `Esta OPA ya se encuentra en gestión y / o asignada a líder de unidad, no se pueden hacer acciones sobre ella`,
        showConfirmButton: true,
      });
      return;
    }

    dispatch(setCurrentElementPqrsdComplementoTramitesYotros(opa));
    void Swal.fire({
      icon: 'success',
      title: 'Elemento seleccionado',
      text: 'Seleccionaste un elemento que se utilizará en los procesos de este módulo. Se mantendrá seleccionado hasta que elijas uno diferente, realices otra búsqueda o reinicies el módulo.',
      showConfirmButton: true,
    });

    /*
    {
    "tipo_solicitud": "OPA",
    "nombre_proyecto": "Opción 2",
    "nombre_opa": "Aprovechamiento forestal de árboles en riesgo",
    "nombre_completo_titular": "SeguridadNombre  SeguridadApellido ",
    "costo_proyecto": 0,
    "pagado": false,
    "cantidad_predios": null,
    "cantidad_anexos": 0,
    "radicado": "UNICO-2023-00256",
    "fecha_radicado": "2023-12-22T16:34:14.674486",
    "sede": null,
    "requiere_digitalizacion": true,
    "estado_actual": "EN VENTANILLA CON PENDIENTES",
    "estado_asignacion_grupo": null,
    "persona_asignada": null,
    "unidad_asignada": null,
    "tiene_anexos": false
}
    */

    /*

const actionsOpas: any[] = [
  {
    id: 'Dig',
  },
  {
    id: 'AsigGrup'
  },
  {
    id: 'Jurídica'
  },
];
*/

    const shouldDisable = (actionId: string) => {
      const isNoSeleccionado = !opa;
      const isAsigGrup = actionId === 'AsigGrup';
      const isDig = actionId === 'Dig';
      const isJuridica = actionId === 'Jurídica';

      const hasAnexos = opa.cantidad_anexos > 0;
      const requiresDigitalization = opa.requiere_digitalizacion;

      const isRadicado = opa.estado_actual === 'RADICADO';
      const isEnVentanillaSinPendientes =
        opa.estado_actual === 'EN VENTANILLA SIN PENDIENTES';
      const isEnVentanillaConPendientes =
        opa.estado_actual === 'EN VENTANILLA CON PENDIENTES';
      const isGestion = opa.estado_actual === 'EN GESTION';

      if (isNoSeleccionado) {
        return true;
      }

      //?  primer cas
      if (isRadicado && !hasAnexos) {
        return !(actionId === 'Jurídica' || actionId === 'AsigGrup');
      }
      // ? segundo caso
      if (isRadicado && hasAnexos && !requiresDigitalization) {
        return !(
          actionId === 'Jurídica' ||
          actionId === 'AsigGrup' ||
          actionId === 'Dig'
        );
      }
      // ? tercer caso
      if (isRadicado && hasAnexos && requiresDigitalization) {
        return !(actionId === 'Jurídica' || actionId === 'Dig');
      }
      // ? cuarto caso
      if (isEnVentanillaSinPendientes && !requiresDigitalization) {
        return !(
          actionId === 'Jurídica' ||
          actionId === 'Dig' ||
          actionId === 'AsigGrup'
        );
      }
      // ? quinto caso
      if (isEnVentanillaSinPendientes && requiresDigitalization) {
        return !(actionId === 'Dig');
      }

      // ? sexto caso
      if (isEnVentanillaConPendientes) {
        return !(actionId === 'Dig' || actionId === 'Jurídica');
      }

      if (isGestion) {
        return true;
      }
    };
    const actionsOPAS = actionsOpas.map((action: any) => ({
      ...action,
      disabled: shouldDisable(action.id),
    }));
    dispatch(setActionssToManagePermissionsOpas(actionsOPAS));
  };

  //* const columns with actions

  const columns = [
    ...columnsOpas,
    {
      headerName: 'Costo del proyecto',
      field: 'costo_proyecto',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={`$${params.value?.toLocaleString()}`}
            color="primary"
          />
        );
      },
    },
    {
      headerName: 'Requiere digitalización',
      field: 'requiere_digitalizacion',
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
      headerName: 'Pagado',
      field: 'pagado',
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
                : !params.row?.estado_asignacion_grupo
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
            <Tooltip
              title={`Ver complementos relacionados a pqrsdf con asunto ${params?.row?.asunto}`}
            >
              <IconButton
                onClick={() => {
                  (async () => {
                    try {
                      const res = await getComplementosAsociadosOpas(
                        params.row.id_solicitud_tramite,
                        handleThirdLoading
                      );
                      dispatch(
                        setListaElementosComplementosRequerimientosOtros(res)
                      );
                    } catch (error) {
                      console.error(error);
                      // Handle error appropriately
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

            <Tooltip title="Ver información asociada a OPA">
              <IconButton
                onClick={() => {
                  handleOpenModalOne(true);
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

            <Tooltip title="Seleccionar OPA para proceso">
              <IconButton onClick={() => setActionsOpas(params?.row)}>
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
        rows={listaElementosPqrsfTramitesUotros ?? []}
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
              Quitar selección de OPA
            </Button>
          ) : null
        }
      />
      {/*modal para ver la información de la OPA seleccionada*/}
      <ModalOpaInformacion />
      {/*modal para ver la información de la OPA seleccionada*/}
    </>
  );
};
