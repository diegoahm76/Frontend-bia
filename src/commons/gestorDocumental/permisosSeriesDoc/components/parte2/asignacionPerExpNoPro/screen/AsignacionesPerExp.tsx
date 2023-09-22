/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { type FC } from 'react';
import { Title } from '../../../../../../../components';
import { containerStyles } from '../../../../../tca/screens/utils/constants/constants';
import { useAppSelector } from '../../../../../../../hooks';
import { UnidadActSecResp } from '../unidadActSecResp/UnidadActSecResp';
import { UnidadExterSecResp } from '../unidadExterSecResp/UnidadExterSecResp';
import { Loader } from '../../../../../../../utils/Loader/Loader';

// componenete padre Asignación de permisos sobre expedientes no propios
export const AsignacionesPerExp: FC<any> = (): JSX.Element | null => {
  // ! states from redux
  const { current_unidad_organizacional, currentSeriesSubseries, unidadActuales, unidadesActualesExternas } =
    useAppSelector((state) => state.PsdSlice);

  // ? validaciones de renderizado
  if (!current_unidad_organizacional || !currentSeriesSubseries) return null;

  return (
    <>
      <Grid container sx={containerStyles}>
        <Title title="Asignación de permisos sobre expedientes no propios" />

        {/* unidades organizacionales actuales de la sección responsable */}

        <UnidadActSecResp />

        {/* unidades organizacionales actuales externas a la sección responsable */}
        <UnidadExterSecResp />
      </Grid>
    </>
  );
};
