/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { PanelVentanillaContext } from '../../../../../../../context/PanelVentanillaContext';
import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { columnsReqOpas } from './columnsReqOpas/columnsReqOpas';
import { downloadCSV } from '../../../utils/downloadCSV';
import  DocumentScannerIcon  from '@mui/icons-material/DocumentScanner';

export const RequerimientosOpas: React.FC = (): JSX.Element => {
  const {
    listaComplementosRequerimientosOtros,
  } = useAppSelector((state) => state.VitalSlice);

  //* context declaration
  const { setAnexos } = useContext(PanelVentanillaContext);

  const { handleFifthLoading, handleOpenModalTwo: handleOpenInfoMetadatos } =
    useContext(ModalAndLoadingContext);


  //* columns definition
  const columns = [
    //* se debe revisar si el tipo de complemento es pqrsdf o tramite para poder mostrar la información de la manera correcta
    ...columnsReqOpas,
    /*{
      headerName: 'Requiere digitalización',
      field: 'requiere_digitalizacion',
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <Chip
            label={params.value ? 'Si' : 'No'}
            color={params.value ? 'success' : 'error'}
            clickable
            onClick={() => {
              control_info(
                `Este complemento ${
                  params.value ? 'requiere' : 'no requiere'
                } digitalización`
              );
            }}
          />
        );
      },
    },*/
  /* {
      headerName: 'Complemento asignado a unidad',
      field: 'complemento_asignado_unidad',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <Chip
            label={params.value ? 'Si' : 'No'}
            color={params.value ? 'success' : 'error'}
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
             <Tooltip title="Exportar COMPLEMENTO OPA en fomato CSV">
              <IconButton
                onClick={() => {
                  downloadCSV(params.row, `complemento_vital_OPA${Math.random()}.csv`);
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
           {/* <Tooltip title="Seleccionar elemento para procesos">
              <IconButton
                onClick={() => {
                  //setActionsComplementos(params?.row);
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
                      color: 'green',
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
        rows={[...listaComplementosRequerimientosOtros] ?? []}
        columns={columns ?? []}
        title="Complementos del elemento seleccionado"
      />
    </>
  );
};
