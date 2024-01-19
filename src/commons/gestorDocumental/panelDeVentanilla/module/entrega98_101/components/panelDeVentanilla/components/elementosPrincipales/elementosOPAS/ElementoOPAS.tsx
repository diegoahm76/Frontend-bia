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
} from '../../../../../../../toolkit/store/PanelVentanillaStore';
import { columnsOpas } from './columnsOpas/columnsOpas';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import TaskIcon from '@mui/icons-material/Task';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ModalOpa as ModalOpaInformacion } from '../../../../../Atom/Opas/ModalOpa';
import { useContext } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import Swal from 'sweetalert2';

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

  const { handleOpenModalOne } = useContext(ModalAndLoadingContext);

  // ? set actions OPAS, button selected

  const setActionsOpas = (opa: any) => {
    //  console.log('')(pqrsdf);

    if (
      opa?.estado_actual_solicitud === 'EN GESTION' ||
      opa?.estado_asignacion_grupo === 'ACEPTADO'
    ) {
      void Swal.fire({
        title: 'Opps...',
        icon: 'error',
        text: `Esta OPA ya se encuentra en gestión, no se pueden hacer acciones sobre ella`,
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

    const shouldDisable = (actionId: string) => {
      const isAsigGrup = actionId === 'AsigGrup';
      const isDig = actionId === 'Dig';
      const hasAnexos = opa.cantidad_anexos > 0;
      const requiresDigitalization = opa.requiere_digitalizacion;
      const isRadicado = opa.estado_solicitud === 'RADICADO';
      const isEnVentanillaSinPendientes =
        opa.estado_solicitud === 'EN VENTANILLA SIN PENDIENTES';
      const isEnVentanillaConPendientes =
        opa.estado_solicitud === 'EN VENTANILLA CON PENDIENTES';

      // Primer caso
      if (isRadicado && !hasAnexos) {
        return isDig;
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
    const actionsOPAS = actionsOpas.map((action: any) => ({
      ...action,
      disabled: shouldDisable(action.id),
    }));
    //  console.log('')(actionsPQRSDF);
    dispatch(setActionssToManagePermissionsOpas(actionsOPAS));
  };

  //* const columns with actions

  const columns = [
    ...columnsOpas,
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
            <Tooltip title="Ver información asociada a OPA">
              <IconButton
                onClick={() => {
                  handleOpenModalOne(true);
                  setActionsOpas(params?.row);

                  //* pendiente llamada a servicio de anexos

                  /*void getAnexosPqrsdf(params?.row?.id_PQRSDF).then((res) => {
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
                  /*   setActionsPQRSDF(params?.row);
                  handleOpenInfoMetadatos(false);
                  handleOpenInfoAnexos(false);*/
                  // setMetadatos([]);
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
