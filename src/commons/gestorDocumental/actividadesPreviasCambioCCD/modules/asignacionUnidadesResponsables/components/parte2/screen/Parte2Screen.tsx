/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { UnidadesSeries } from '../components/unidadesSeries/UnidadesSeries';
import { SeccionSelecccionada } from '../components/seccionSeleccionada/SeccionSelecccionada';

export const Parte2Screen = (): JSX.Element => {
  return (
    <>
      <UnidadesSeries />
      <SeccionSelecccionada />
    </>
  );
};
