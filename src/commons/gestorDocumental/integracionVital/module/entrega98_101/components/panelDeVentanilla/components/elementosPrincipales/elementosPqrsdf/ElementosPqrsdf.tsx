/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useState } from 'react';
import { Avatar, Chip, IconButton, Tooltip } from '@mui/material';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsPqrsdf } from './columnsPqrsdf/columnsPqrsdf';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import {
  setListaElementosComplementosRequerimientosOtros,
} from '../../../../../../../toolkit/store/VitalStore';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import Swal from 'sweetalert2';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { getComplementosAsociadosPqrsdf } from '../../../../../../../toolkit/thunks/PqrsdfyComplementos/getComplementos.service';
import { downloadCSV } from '../../../utils/downloadCSV';

export const ListaElementosPqrsdf = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  const {
    handleThirdLoading,
  } = useContext(ModalAndLoadingContext);


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
  } = useAppSelector((state) => state.VitalSlice);


  //* espacio para la definición de las columnas
  const columns = [
    ...columnsPqrsdf,
    /*{
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
    },*/
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
   /* {
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
    },*/
/*    {
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
    },*/
/*    {
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
    },*/
    {
      headerName: 'Acciones',
      field: 'Acciones',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Exportar PQRSDF en fomato CSV">
              <IconButton
                onClick={() => {
                  downloadCSV(params.row, `pqrsdf_vital_${params.row.id_PQRSDF}.csv`);
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
                  <DocumentScannerIcon
                    sx={{
                      color: 'success.main',
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

         {/*   <Tooltip title="Ver PQRSDF">
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
                  <DocumentScannerIcon
                    sx={{
                      color: 'success.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>*/}
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
      />
    </>
  );
};
