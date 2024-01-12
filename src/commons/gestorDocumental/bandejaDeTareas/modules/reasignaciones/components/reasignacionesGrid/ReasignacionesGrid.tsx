import { Chip, Grid } from '@mui/material';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsAsignaciones } from './columnsAsignaciones/columnsAsignaciones';
import { useContext } from 'react';
import { Loader } from '../../../../../../../utils/Loader/Loader';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import { ReasignacionContext } from '../../context/ReasignacionContext';

/* eslint-disable @typescript-eslint/naming-convention */
export const ReasignacionesGrid = (): JSX.Element => {
  //* context declaration
  const { listaAsignaciones } = useContext(ReasignacionContext);
  const { generalLoading } = useContext(ModalAndLoadingContext);

  const estadoMapping: any = {
    'EN ESPERA': { label: 'En espera', color: 'warning' },
    ACEPTADA: { label: 'Aceptada', color: 'success' },
    RECHAZADA: { label: 'Rechazada', color: 'error' },
  };

  const columns = [
    ...columnsAsignaciones,
    {
      headerName: 'Estado de reasignación',
      field: 'estado_asignacion',
      minWidth: 200,
      renderCell: (params: any) => {
        const estado =
          estadoMapping[params.row.estado_asignacion] ||
          estadoMapping['EN ESPERA'];

        return <Chip label={estado.label} size="small" color={estado.color} />;
      },
    },
  ];

  if (generalLoading) {
    return (
      <Grid
        container
        sx={{
          position: 'relative',
          justifyContent: 'center',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Loader altura={270} />
      </Grid>
    );
  }

  return listaAsignaciones.length > 0 ? (
    <RenderDataGrid
      title="Estado de las asignaciones"
      columns={columns ?? []}
      rows={[...listaAsignaciones] ?? []}
    />
  ) : (
    <></>
  );
};
