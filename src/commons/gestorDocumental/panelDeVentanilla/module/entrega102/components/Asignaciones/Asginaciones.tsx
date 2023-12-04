import { Chip, Grid } from '@mui/material';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsAsignaciones } from './columnsAsignaciones/columnsAsignaciones';
import { useContext } from 'react';
import { AsignacionGrupoContext } from '../../context/AsignacionGrupoContext';
import { Loader } from '../../../../../../../utils/Loader/Loader';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';

/* eslint-disable @typescript-eslint/naming-convention */
export const Asignaciones = (): JSX.Element => {
  //* context declaration
  const { listaAsignaciones } = useContext(AsignacionGrupoContext);
  const { generalLoading } = useContext(ModalAndLoadingContext);

  const columns = [
    ...columnsAsignaciones,
    {
      headerName: 'Estado asignación',
      field: 'estado_asignado',
      minWidth: 150,
      renderCell: (params: any) => {
        return (
          <Chip
            label={
              params.row.estado_asignado === 'EN ESPERA'
                ? 'En espera'
                : params.row.estado_asignado === 'ACEPTADO'
                ? 'Aceptado'
                : params.row.estado_asignado === 'RECHAZADO'
                ? 'Rechazado'
                : 'En espera'
            }
            size="small"
            color={
              params.row.estado_asignado === 'EN ESPERA'
                ? 'warning'
                : params.row.estado_asignado === 'ACEPTADO'
                ? 'success'
                : params.row.estado_asignado === 'RECHAZADO'
                ? 'error'
                : 'warning'
            }
          />
        );
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
