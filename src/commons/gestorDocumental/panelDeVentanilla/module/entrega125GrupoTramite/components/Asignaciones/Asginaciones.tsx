import { Button, Chip, Grid } from '@mui/material';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsAsignaciones } from './columnsAsignaciones/columnsAsignaciones';
import { useContext } from 'react';
import { Loader } from '../../../../../../../utils/Loader/Loader';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import { AsignacionGrupoTramiteContext } from '../../context/AsignacionGrupoTramiteContext';

/* eslint-disable @typescript-eslint/naming-convention */
export const Asignaciones = (): JSX.Element => {
  //* context declaration
  const { listaAsignaciones } = useContext(AsignacionGrupoTramiteContext);
  const { generalLoading } = useContext(ModalAndLoadingContext);

  const estadoMapping: any = {
    'EN ESPERA': { label: 'En espera', color: 'warning' },
    ACEPTADA: { label: 'Aceptada', color: 'success' },
    RECHAZADA: { label: 'Rechazada', color: 'error' },
  };

  const columns = [
    ...columnsAsignaciones,
    {
      headerName: 'Estado asignación',
      field: 'estado_asignado',
      minWidth: 150,
      renderCell: (params: any) => {
        const estado =
          estadoMapping[params.row.estado_asignado] ||
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
      aditionalElement={
        listaAsignaciones?.length &&
        listaAsignaciones.find(
          (el: { estado_asignado: string }) =>
            el.estado_asignado === 'RECHAZADA'
        ) ? (
          <Button
            variant="contained"
            color="primary"
            // endIcon={<RemoveDoneIcon />}
          >
            {`La solicitud de OPA ha sido asignada automáticamente por el sistema al lider de la unidad ${
              listaAsignaciones.find(
                (el: { estado_asignado: string }) =>
                  el.estado_asignado === 'RECHAZADA'
              ).sec_sub
            }
                `}
          </Button>
        ) : (
          <></>
        )
      }
    />
  ) : (
    <></>
  );
};
