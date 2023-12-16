/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, type FC } from 'react';
import { useAppSelector } from '../../../../../../hooks';
import { containerStyles } from '../../../../tca/screens/utils/constants/constants';
import { Title } from '../../../../../../components';
import { Grid } from '@mui/material';
import { RestriccionTodUnidOrg } from '../denePerExpProp/resTodUnidOrg/RestriccionTodUnidOrg';
import { ResUniDifSecSubAct } from '../denePerExpProp/resUniDifSecSubAct/ResUniDifSecSubAct';

export const DenegacionPerScreen: FC<any> = (): JSX.Element | null => {
  // ! states from redux
  const { current_unidad_organizacional, currentSeriesSubseries } =
    useAppSelector((state) => state.PsdSlice);

  // ! va a ser necesario el uso del useEffect para realizar algunas consultas que permitan traer cierta información

  // ? validaciones de renderizado
  if (!current_unidad_organizacional || !currentSeriesSubseries) return null;

  return (
    <>
      <Grid container sx={containerStyles}>
        <Title title="Denegación de permisos sobre expedientes propios" />

        {/* Restricción para todas las unidades organizacionales */}

        <RestriccionTodUnidOrg />

        {/* Restricción para unidades organizacionales diferentes a la sección o subsección actual responsable de la serie documental */}
        <ResUniDifSecSubAct />
      </Grid>
    </>
  );
};
