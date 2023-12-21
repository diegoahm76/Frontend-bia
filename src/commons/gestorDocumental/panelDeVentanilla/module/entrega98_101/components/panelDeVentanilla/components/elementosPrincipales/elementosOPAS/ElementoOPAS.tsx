/* eslint-disable @typescript-eslint/naming-convention */

import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { setCurrentElementPqrsdComplementoTramitesYotros } from '../../../../../../../toolkit/store/PanelVentanillaStore';
import { columnsOpas } from './columnsOpas/columnsOpas';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import TaskIcon from '@mui/icons-material/Task';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const ElementoOPAS = (): JSX.Element => {
  // ? dispatch necesario
  const dispatch = useAppDispatch();

  //* redux states

  const {
    listaElementosPqrsfTramitesUotros,
    currentElementPqrsdComplementoTramitesYotros,
  } = useAppSelector((state) => state.PanelVentanillaSlice);

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

            <Tooltip title="Seleccionar elemento">
              <IconButton
                onClick={() => {
                  /* if (params?.row?.estado_asignacion_grupo === 'EN GESTION') {
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
  ];

  return (
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
  );
};
