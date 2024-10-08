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
  setCurrentElementPqrsdComplementoTramitesYotros,
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
import { ModalInfoElementos } from '../../AtomVistaElementos/PQRSDF/ModalInfoPqrsdf';

export const ListaElementosPqrsdf = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  const {
    handleThirdLoading,
    handleOpenModalOne,
    openModalOne,
    openModalTwo,
    handleOpenModalTwo,
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
  const { listaElementosPqrsfTramitesUotros } = useAppSelector(
    (state) => state.VitalSlice
  );

  //* espacio para la definición de las columnas
  const columns = [
    ...columnsPqrsdf,
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
      headerName: 'Acciones',
      field: 'Acciones',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Exportar PQRSDF en fomato CSV">
              <IconButton
                onClick={() => {
                  /*console.log('params.row', {
                    //idPQRSDF: params.row.id_PQRSDF || 'No aplica',
                    codigoTipoPQRSDF: params.row.cod_tipo_PQRSDF || 'No aplica',
                    tipoPQRSDF: params.row.tipo_PQRSDF || 'No aplica',
                    tipoSolicitud: params.row.tipo_solicitud || 'No aplica',
                    nombreCompletoTitular:
                      params.row.nombre_completo_titular || 'No aplica',
                    asunto: params.row.asunto || 'No aplica',
                    cantidadAnexos: params.row.cantidad_anexos || 'No aplica',
                    radicado: params.row.radicado || 'No aplica',
                    fechaRadicado: params.row.fecha_radicado || 'No aplica',
                    requiereDigitalizacion: params.row.requiere_digitalizacion
                      ? 'Sí'
                      : 'No',
                    estadoSolicitud: params.row.estado_solicitud || 'No aplica',
                    nombreSucursal: params.row.nombre_sucursal || 'No aplica',
                    numeroSolicitudesDigitalizacion:
                      params.row.numero_solicitudes_digitalizacion ||
                      'No aplica',
                    numeroSolicitudesUsuario:
                      params.row.numero_solicitudes_usuario || 'No aplica',
                    tieneComplementos: params.row.tiene_complementos
                      ? 'Sí'
                      : 'No',
                    diasRespuesta: params.row.dias_respuesta || 'No aplica',
                    medioSolicitud: params.row.medio_solicitud || 'No aplica',
                    formaPresentacion:
                      params.row.forma_presentacion || 'No aplica',
                    numeroFolios: params.row.numero_folios || 'No aplica',
                    personaRecibe: params.row.persona_recibe || 'No aplica',
                    nombreSucursalImplicada:
                      params.row.nombre_sucursal_implicada || 'No aplica',
                    nombreSucursalRecepcionFisica:
                      params.row.nombre_sucursal_recepcion_fisica ||
                      'No aplica',
                    fechaRegistro: params.row.fecha_registro || 'No aplica',
                    estadoAsignacionGrupo:
                      params.row.estado_asignacion_grupo || 'No aplica',
                    personaAsignada: params.row.persona_asignada || 'No aplica',
                    unidadAsignada: params.row.unidad_asignada || 'No aplica',
                    esPqrsdf: params.row.es_pqrsdf ? 'Sí' : 'No',
                  });*/
                  downloadCSV(
                    {
                      //idPQRSDF: params.row.id_PQRSDF || 'No aplica',
                      codigoTipoPQRSDF:
                        params.row.cod_tipo_PQRSDF || 'No aplica',
                      tipoPQRSDF: params.row.tipo_PQRSDF || 'No aplica',
                      tipoSolicitud: params.row.tipo_solicitud || 'No aplica',
                      nombreCompletoTitular:
                        params.row.nombre_completo_titular || 'No aplica',
                      asunto: params.row.asunto || 'No aplica',
                      cantidadAnexos: params.row.cantidad_anexos || 'No aplica',
                      radicado: params.row.radicado || 'No aplica',
                      fechaRadicado: params.row.fecha_radicado || 'No aplica',
                      requiereDigitalizacion: params.row.requiere_digitalizacion
                        ? 'Sí'
                        : 'No',
                      estadoSolicitud:
                        params.row.estado_solicitud || 'No aplica',
                      nombreSucursal: params.row.nombre_sucursal || 'No aplica',
                      numeroSolicitudesDigitalizacion:
                        params.row.numero_solicitudes_digitalizacion ||
                        'No aplica',
                      numeroSolicitudesUsuario:
                        params.row.numero_solicitudes_usuario || 'No aplica',
                      tieneComplementos: params.row.tiene_complementos
                        ? 'Sí'
                        : 'No',
                      diasRespuesta: params.row.dias_respuesta || 'No aplica',
                      medioSolicitud: params.row.medio_solicitud || 'No aplica',
                      formaPresentacion:
                        params.row.forma_presentacion || 'No aplica',
                      numeroFolios: params.row.numero_folios || 'No aplica',
                      personaRecibe: params.row.persona_recibe || 'No aplica',
                      nombreSucursalImplicada:
                        params.row.nombre_sucursal_implicada || 'No aplica',
                      nombreSucursalRecepcionFisica:
                        params.row.nombre_sucursal_recepcion_fisica ||
                        'No aplica',
                      fechaRegistro: params.row.fecha_registro || 'No aplica',
                      estadoAsignacionGrupo:
                        params.row.estado_asignacion_grupo || 'No aplica',
                      personaAsignada:
                        params.row.persona_asignada || 'No aplica',
                      unidadAsignada: params.row.unidad_asignada || 'No aplica',
                      esPqrsdf: params.row.es_pqrsdf ? 'Sí' : 'No',
                    },
                    `pqrsdf_vital_${params.row.id_PQRSDF}.csv`
                  );
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

            <Tooltip title="Ver">
              <IconButton
                onClick={() => {
                  dispatch(
                    setCurrentElementPqrsdComplementoTramitesYotros(params?.row)
                  );
                  handleOpenModalOne(true);
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
          </>
        );
      },
    },
  ];

  return (
    <>
      <ModalInfoElementos
        openModalOne={openModalOne}
        openModalTwo={openModalTwo}
        handleOpenModalOne={handleOpenModalOne}
        handleOpenModalTwo={handleOpenModalTwo}
      />

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
