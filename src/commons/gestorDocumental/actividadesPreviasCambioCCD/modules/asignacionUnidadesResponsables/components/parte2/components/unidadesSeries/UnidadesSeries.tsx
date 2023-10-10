/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import React from 'react';
import { containerStyles } from '../../../../../../../tca/screens/utils/constants/constants';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { Title } from '../../../../../../../../../components';
import { Subtitle } from '../../../../../../../../../components/Subtitle';
import { Sub } from '../../../../../../../../../components/Sub';

export const UnidadesSeries = (): JSX.Element => {
  return (
    <>
      <Grid container sx={containerStyles}>
        <Title title="Selección de secciones responsables del CCD nuevo sobre las series documentales de secciones del CCD actual" />
        <Title
          title="Las asignaciones aquí realizadas son sólo para responsables sobre el catálogo de series, no continuarán con los permisos ni los consecutivos en el nuevo CCD"
          width="98%"
          fontSize="12.5px"
        />
        <Sub title="Éstas asignaciones se realizan cuando la sección o subsección actual no tienen persistencia en el nuevo CCD" width="80%" />




        
        <RenderDataGrid
          title="Éstas secciones continuarán con los consecutivos y permisos de su predecesor ( CCD ACTUAL / CCD NUEVO )"
          columns={[]}
          rows={[]}
        />
         <RenderDataGrid
          title="Éstas secciones continuarán con los consecutivos y permisos de su predecesor ( CCD ACTUAL / CCD NUEVO )"
          columns={[]}
          rows={[]}
        />
      </Grid>
    </>
  );
};
