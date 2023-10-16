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

export const SeccionesQuePersistiranNuevoCcd = (): JSX.Element => {
  //* redux states neccesaries
  const { seccionesPersistentesCcdNuevo } = useAppSelector(
    (state) => state.AsigUniRespSlice
  );

  // ? context declaration
  const { loadingButtonPSD: loadingSeccionesPersistentes } =
    useContext(ModalContextPSD);

  const columns = [...columnsPersistenciasConfirmadas];

  //* se debe poner luego la condicional para que funcione de manera de adecuada (deben ir las condicionales necesarias para manejar lo componentes)

  if (!seccionesPersistentesCcdNuevo.length) {
    return <></>;
  }

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

  return (
    <>
      <Grid container sx={containerStyles}>
        <Title title="Secciones que persistirán en CCD nuevo" />
        <RenderDataGrid
          title="Éstas secciones continuarán con los consecutivos y permisos de su predecesor ( CCD ACTUAL / CCD NUEVO )"
          columns={columns || []}
          rows={seccionesPersistentesCcdNuevo || []}
        />
      </Grid>
    </>
  );
};
