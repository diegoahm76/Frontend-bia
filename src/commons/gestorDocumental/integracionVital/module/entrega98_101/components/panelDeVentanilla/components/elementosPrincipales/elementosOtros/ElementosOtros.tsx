/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { columnsOtros } from './columnsOtros/columnsOtros';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { useContext, useState } from 'react';
import { PanelVentanillaContext } from '../../../../../../../context/PanelVentanillaContext';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { downloadCSV } from '../../../utils/downloadCSV';
import { ModalInfoElementos } from '../../AtomVistaElementos/PQRSDF/ModalInfoPqrsdf';
import { setCurrentElementPqrsdComplementoTramitesYotros } from '../../../../../../../toolkit/store/VitalStore';

export const ElementosOtros = (): JSX.Element => {
  //* redux states
  const { listaElementosPqrsfTramitesUotros } = useAppSelector(
    (state) => state.VitalSlice
  );
  const {
    handleElevenLoading,
    handleTwelveLoading,
    ElevenLoading,
    TwelveLoading,
  } = useContext(ModalAndLoadingContext);
  const { setRadicado, setValue } = useContext(PanelVentanillaContext);
  //* dispatch necesario
  const dispatch = useAppDispatch();

  //* states
  //* loader button simulacion
  const [loadingStates, setLoadingStates] = useState<any>({});

  // ? columns config
  const columns = [
    ...columnsOtros,
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
    //* sacar para poner color
    /*  {
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
    //* sacar para poner color
    /*   {
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
    },*/
    {
      headerName: 'Acciones',
      field: 'Acciones',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Exportar OTRO en fomato CSV">
              <IconButton
                onClick={() => {
                  downloadCSV(
                    params.row,
                    `otro_vital_${params.row.id_otros}.csv`
                  );
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
                  handleElevenLoading(true);
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
        openModalOne={ElevenLoading}
        openModalTwo={TwelveLoading}
        handleOpenModalOne={handleElevenLoading}
        handleOpenModalTwo={handleTwelveLoading}
      />
      <RenderDataGrid
        rows={
          [
            ...listaElementosPqrsfTramitesUotros,
            ...listaElementosPqrsfTramitesUotros,
          ] ?? []
        }
        columns={columns ?? []}
        title={`Lista de solicitudes de ${listaElementosPqrsfTramitesUotros[0]?.tipo_solicitud}`}
      />
    </>
  );
};
