/* eslint-disable @typescript-eslint/naming-convention */

import { useContext } from 'react';
import { RenderDataGrid } from '../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { Grid } from '@mui/material';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';

export const ComplementosElemento = (): JSX.Element => {
  //* context declaration
  const { thirdLoading, handleThirdLoading } = useContext(
    ModalAndLoadingContext
  );

  // ? se debe definir el loading
/*  if (thirdLoading)
    return (
      <Grid
        container
        sx={{
          ...containerStyles,
          position: 'static',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Loader altura={270} />
      </Grid>
    );*/

  return (
    <RenderDataGrid
      rows={[]}
      columns={[]}
      title={`Complementos del elemento (...)`}
    />
  );
};
