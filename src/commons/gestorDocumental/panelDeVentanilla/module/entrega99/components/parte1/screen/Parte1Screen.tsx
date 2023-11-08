/* eslint-disable @typescript-eslint/naming-convention */

import { PerSolicitaComplemento } from '../components/perSolicitaComplemento/PerSolicitaComplemento';
import { PersonaTitular } from '../components/personaTitular/PersonaTitular';

export const Parte1Screen = (): JSX.Element => {
  return (
    <>
      <PersonaTitular />
      <PerSolicitaComplemento />
    </>
  );
};
