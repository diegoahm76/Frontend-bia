/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../../../hooks';
import { Title } from '../../../../../../../../components';
import { Grid } from '@mui/material';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';
import { columnsCoincidencias as columnsPersistenciasConfirmadas } from '../../../../homologacionDeSeccionesPersistentes/components/parte2/components/coincidenciasHalladasCCD/columnsCoincidencias/columnsCoincidencia';
import { ModalContextPSD } from '../../../../../../permisosSeriesDoc/context/ModalContextPSD';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';

export const SeccionesQuePersistiranNuevoCcd = (): JSX.Element => {
  //* redux states neccesaries
  const { seccionesPersistentesCcdNuevo } = useAppSelector(
    (state) => state.AsigUniRespSlice
  );

  // ? context declaration
  const { generalLoading: loadingSeccionesPersistentes } = useContext(
    ModalAndLoadingContext
  );

  const columns = [...columnsPersistenciasConfirmadas];

  //* se debe poner luego la condicional para que funcione de manera de adecuada (deben ir las condicionales necesarias para manejar lo componentes)

  if (loadingSeccionesPersistentes) {
    return (
      <Grid
        container
        sx={{
          ...containerStyles,
          boxShadow: 'none',
          background: 'none',
          position: 'static',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Loader altura={300} />
      </Grid>
    );
  }

  if (!seccionesPersistentesCcdNuevo?.length) {
    return <></>;
  }

  return (
    <>
      <Grid container sx={{
        ...containerStyles,
        mt: '1.2rem',
      }}>
        <Title title="Secciones que persistirán en CCD nuevo, persistencia realizada" />
        <RenderDataGrid
          title="Éstas secciones continuarán con los consecutivos y permisos de su predecesor ( CCD ACTUAL / CCD NUEVO )"
          columns={columns || []}
          rows={seccionesPersistentesCcdNuevo || []}
        />
      </Grid>
    </>
  );
};
