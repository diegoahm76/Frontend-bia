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
  setCurrentElementPqrsdComplementoTramitesYotros,
  setListaElementosComplementosRequerimientosOtros,
} from '../../../../../../../toolkit/store/VitalStore';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { columnsTramites } from './columnsTramites/columnsTramites';

import { control_warning } from '../../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { getComplementosAsociadosTramite } from '../../../../../../../toolkit/thunks/TramitesyServiciosyRequerimientos/getComplementosTramites.service';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { api } from '../../../../../../../../../../api/axios';
import { downloadCSV } from '../../../utils/downloadCSV';
import { ModalInfoElementos } from '../../AtomVistaElementos/PQRSDF/ModalInfoPqrsdf';

export const ListaElementosTramites = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    handleThirdLoading,
    handleSixthLoading,
    handleSevenLoading,
    sevenLoading,
    sixthLoading,
  } = useContext(ModalAndLoadingContext);

  //* redux states
  const { listaElementosPqrsfTramitesUotros } = useAppSelector(
    (state) => state.VitalSlice
  );

  //* espacio para la definición de las columnas
  const columns = [
    ...columnsTramites,
    /*  {
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
    /*  {
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
    },*/
    /*  {
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
    },*/
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
            {/* <Tooltip title="Seleccionar trámite para procesos">
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

                  //setActionsTramites(params?.row);
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
            </Tooltip>*/}
            <Tooltip title="Exportar TRÁMITE en fomato CSV">
              <IconButton
                onClick={() => {
                  (async () => {
                    try {
                      const { data } = await api.get(
                        `tramites/general/get/?radicado=${params?.row?.radicado}`
                      );

                      if (data?.data) {
                        downloadCSV(
                          data?.data,
                          `tramite_vital${params?.row?.radicado}.csv`
                        );
                        return;
                        //control_success('se ha encontrado la siguiente información');
                      }
                      control_warning(
                        'No se ha encontrado información para exportar'
                      );
                    } catch (error) {
                      control_warning(
                        'No se ha encontrado información para exportar, intente de nuevo o con otro trámite'
                      );
                    }
                  })();

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
            <Tooltip title="Ver">
              <IconButton
                onClick={() => {
                  dispatch(
                    setCurrentElementPqrsdComplementoTramitesYotros(params?.row)
                  );
                  handleSixthLoading(true);
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
        openModalOne={sixthLoading}
        openModalTwo={sevenLoading}
        handleOpenModalOne={handleSixthLoading}
        handleOpenModalTwo={handleSevenLoading}
      />

      <RenderDataGrid
        rows={
          listaElementosPqrsfTramitesUotros.filter(
            (el: { radicado: string }) => el?.radicado
          ) ?? []
        }
        columns={columns ?? []}
        title={`Lista de solicitudes de ${listaElementosPqrsfTramitesUotros[0]?.tipo_solicitud}S`}
      />
    </>
  );
};
