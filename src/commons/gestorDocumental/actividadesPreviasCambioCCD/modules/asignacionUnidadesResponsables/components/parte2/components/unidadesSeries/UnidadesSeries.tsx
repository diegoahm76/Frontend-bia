/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import React from 'react';
import { containerStyles } from '../../../../../../../tca/screens/utils/constants/constants';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { Title } from '../../../../../../../../../components';
import { Subtitle } from '../../../../../../../../../components/Subtitle';

export const UnidadesSeries = (): JSX.Element => {
  return (
    <>
      <Grid container sx={containerStyles}>
        <Title title="Selección de secciones responsables del CCD nuevo sobre las series documentales de secciones del CCD actual" />
        <Subtitle title="hello" />
        <RenderDataGrid
          title="Éstas secciones continuarán con los consecutivos y permisos de su predecesor ( CCD ACTUAL / CCD NUEVO )"
          columns={[]}
          rows={[]}
        />
      </Grid>
    </>
  );
};
