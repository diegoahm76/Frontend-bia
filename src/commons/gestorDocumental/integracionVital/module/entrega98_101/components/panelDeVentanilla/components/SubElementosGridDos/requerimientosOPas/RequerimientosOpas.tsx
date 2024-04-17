/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { PanelVentanillaContext } from '../../../../../../../context/PanelVentanillaContext';
import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { columnsReqOpas } from './columnsReqOpas/columnsReqOpas';
import { downloadCSV } from '../../../utils/downloadCSV';
import  DocumentScannerIcon  from '@mui/icons-material/DocumentScanner';
import { setCurrentElementPqrsdComplementoTramitesYotros } from '../../../../../../../toolkit/store/VitalStore';
import  VisibilityIcon  from '@mui/icons-material/Visibility';
import { ModalInfoElementos } from '../../AtomVistaElementos/PQRSDF/ModalInfoPqrsdf';

export const RequerimientosOpas: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    listaComplementosRequerimientosOtros,
  } = useAppSelector((state) => state.VitalSlice);

  //* context declaration
  const { setAnexos } = useContext(PanelVentanillaContext);

  const {  nineLoading,
    handleNineLoading,
    tenLoading,
    handleTenLoading,} =
    useContext(ModalAndLoadingContext);


  //* columns definition
  const columns = [
    //* se debe revisar si el tipo de complemento es pqrsdf o tramite para poder mostrar la información de la manera correcta
    ...columnsReqOpas,
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
                  console.log(params.row)
                  handleNineLoading(true);
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
        openModalOne={nineLoading}
        openModalTwo={tenLoading}
        handleOpenModalOne={handleNineLoading}
        handleOpenModalTwo={handleTenLoading}
      />
      <RenderDataGrid
        rows={[...listaComplementosRequerimientosOtros] ?? []}
        columns={columns ?? []}
        title="Complementos del elemento seleccionado"
      />
    </>
  );
};
