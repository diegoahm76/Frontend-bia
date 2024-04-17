/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { columnsComplementoPqrsdf } from './columnsComplementoPqrsd/colComplePqrsdf';
import { Avatar, Chip, IconButton, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import TaskIcon from '@mui/icons-material/Task';
import { control_info } from '../../../../../../../../alertasgestor/utils/control_error_or_success';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { downloadCSV } from '../../../utils/downloadCSV';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { setCurrentElementPqrsdComplementoTramitesYotros } from '../../../../../../../toolkit/store/VitalStore';
import { ModalInfoElementos } from '../../AtomVistaElementos/PQRSDF/ModalInfoPqrsdf';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { useContext } from 'react';

export const ComplementosPqrsdf: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { listaComplementosRequerimientosOtros } = useAppSelector(
    (state) => state.VitalSlice
  );

  const {
    eigthLoading,
    openModalNuevoNumero2,
    handleEigthLoading,
    handleOpenModalNuevoNumero2,
  } = useContext(ModalAndLoadingContext);

  //* columns definition
  const columns = [
    ...columnsComplementoPqrsdf,
    {
      headerName: 'Acciones',
      field: 'Acciones',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Exportar COMPLEMENTO PQRSDF en fomato CSV">
              <IconButton
                onClick={() => {
                  downloadCSV(
                    params.row,
                    `complemento_vital_PQRSDF${Math.random()}.csv`
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
                  handleEigthLoading(true);
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
        openModalOne={eigthLoading}
        openModalTwo={openModalNuevoNumero2}
        handleOpenModalOne={handleEigthLoading}
        handleOpenModalTwo={handleOpenModalNuevoNumero2}
      />
      <RenderDataGrid
        rows={[...listaComplementosRequerimientosOtros] ?? []}
        columns={columns ?? []}
        title="Complementos del elemento seleccionado"
      />
    </>
  );
};
