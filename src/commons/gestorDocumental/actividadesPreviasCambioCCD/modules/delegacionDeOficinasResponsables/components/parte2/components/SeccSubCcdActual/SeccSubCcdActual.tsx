/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { VisaulTexto } from '../../../../../asignacionUnidadesResponsables/components/parte2/components/unidadesSeries/visualTexto/VisualTexto';
import { Title } from '../../../../../../../../../components';
import { Grid } from '@mui/material';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';

export const SeccSubCcdActual = (): JSX.Element => {
  const styles = {
    width: '100%',
    display: 'flex',
    mt: '20px',
    mb: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  return (
    <>
      <Title title="Sección - Subsección del CCD actual" />
      <Grid item xs={12} sm={12} sx={styles}>
        <VisaulTexto
          elements={[
            'Elija la sección o subsección del CCD actual a delegar oficinas responsables.',
          ]}
        />
      </Grid>
      <RenderDataGrid title="Listado de elementos" columns={[]} rows={[]} />
    </>
  );
};
