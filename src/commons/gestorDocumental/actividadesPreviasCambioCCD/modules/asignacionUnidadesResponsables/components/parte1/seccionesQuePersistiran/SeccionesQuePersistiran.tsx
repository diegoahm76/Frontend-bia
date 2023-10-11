/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useAppSelector } from '../../../../../../../../hooks';
import { Title } from '../../../../../../../../components';
import { Box, Grid } from '@mui/material';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';

export const SeccionesQuePersistiranNuevoCcd = (): JSX.Element => {
  //* redux states neccesaries
  const { ccdOrganigramaCurrentBusqueda } = useAppSelector(
    (state) => state.AsigUniRespSlice
  );

  //* se debe poner luego la condicional para que funcione de manera de adecuada
  /* if (
    ccdOrganigramaCurrentBusqueda &&
    Object.keys(ccdOrganigramaCurrentBusqueda).length === 0
  )
    return <></>; */

  return (
    <>
      <Grid container sx={containerStyles}>
        <Title title="Secciones que persistirán en CCD nuevo" />
        <RenderDataGrid
          title="Éstas secciones continuarán con los consecutivos y permisos de su predecesor ( CCD ACTUAL / CCD NUEVO )"
          columns={[]}
          rows={[]}
        />
      </Grid>
    </>
  );
};
