/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { PanelVentanillaContext } from '../../../../../../../context/PanelVentanillaContext';
import { Avatar, Chip, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { control_info } from '../../../../../../../../alertasgestor/utils/control_error_or_success';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { columnsReqTra } from './columsReqTra/columnsReqTra';

export const RequerimientosTramites: React.FC = (): JSX.Element => {
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
    ...columnsReqTra,
    {
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
                `Actualmente tienes ${params.value} solicitudes de digitalización para este complemento`
              );
            }}
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
            <Tooltip title="Ver info complemento asociado">
              <IconButton
                onClick={() => {
                  //setActionsComplementos(params?.row);
                  handleFifthLoading(true);
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
      <RenderDataGrid
        rows={[...listaComplementosRequerimientosOtros] ?? []}
        columns={columns ?? []}
        title="Complementos del elemento seleccionado"
      />
    </>
  );
};
