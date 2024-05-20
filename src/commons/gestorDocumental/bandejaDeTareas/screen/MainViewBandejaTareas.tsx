/* eslint-disable @typescript-eslint/naming-convention */

import { Grid } from '@mui/material';
import { containerStyles } from '../../tca/screens/utils/constants/constants';
import { Title } from '../../../../components';
import { BandejaDeTareasScreen } from '../mainModule/bandejaDeTareas/screen/bandejaDeTareas/BandejaDeTareasScren';
import { useEffect } from 'react';
import { resetBandejaDeTareas } from '../toolkit/store/BandejaDeTareasStore';
import { useAppDispatch } from '../../../../hooks';

export const MainViewBandejaTareas = (): JSX.Element => {

  const dispatch = useAppDispatch(); 
  
  useEffect(() => {
    dispatch(resetBandejaDeTareas(null as any ) )
  }, []);


  return (
    <Grid container sx={containerStyles}>
      <Title title="Bandeja de tareas" />
      <BandejaDeTareasScreen />
    </Grid>
  );
};
