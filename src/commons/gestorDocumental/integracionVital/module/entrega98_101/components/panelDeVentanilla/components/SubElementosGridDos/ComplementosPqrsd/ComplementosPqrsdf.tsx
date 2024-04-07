/* eslint-disable @typescript-eslint/naming-convention */
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { columnsComplementoPqrsdf } from './columnsComplementoPqrsd/colComplePqrsdf';
import { Avatar, Chip, IconButton, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import TaskIcon from '@mui/icons-material/Task';
import { control_info } from '../../../../../../../../alertasgestor/utils/control_error_or_success';
import  DocumentScannerIcon  from '@mui/icons-material/DocumentScanner';
import { downloadCSV } from '../../../utils/downloadCSV';

export const ComplementosPqrsdf: React.FC = (): JSX.Element => {
  const {
    listaComplementosRequerimientosOtros,
  } = useAppSelector((state) => state.VitalSlice);

  //* columns definition
  const columns = [
    ...columnsComplementoPqrsdf,
   /* {
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
    },
    {
      headerName: 'Complememto asignado a unidad',
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
    },
    {
      headerName: 'Número de solicitudes de digitalización',
      field: 'numero_solicitudes',
      minWidth: 300,
      renderCell: (params: any) => {
        return (
          <Chip
            label={`Solicitudes de digitalización: ${params.value}`}
            clickable
            color="info"
            onClick={() => {
              control_info(
                `Actualmente tienes ${params.value} solicitudes de digitalización para este radicado`
              );
            }}
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
            <Tooltip title="Exportar COMPLEMENTO PQRSDF en fomato CSV">
              <IconButton
                onClick={() => {
                  downloadCSV(params.row, `complemento_vital_PQRSDF${Math.random()}.csv`);
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
    <RenderDataGrid
      rows={[...listaComplementosRequerimientosOtros] ?? []}
      columns={columns ?? []}
      title="Complementos del elemento seleccionado"
    />
  );
};
