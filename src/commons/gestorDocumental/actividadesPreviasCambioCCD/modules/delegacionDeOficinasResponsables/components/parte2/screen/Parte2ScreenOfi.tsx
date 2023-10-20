/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { SeccSubCcdActual } from '../components/SeccSubCcdActual/SeccSubCcdActual';
import { Grid } from '@mui/material';
import { containerStyles } from './../../../../../../tca/screens/utils/constants/constants';

export const Parte2ScreenOfi = (): JSX.Element => {
  return (
    <Grid
      container
      sx={{
        ...containerStyles,
        justifyContent: 'center',
      }}
    >
      <>
        <SeccSubCcdActual />
      </>
    </Grid>
  );
};
