/* eslint-disable @typescript-eslint/naming-convention */

import { PerSolicitaComplemento } from '../components/perSolicitaComplemento/PerSolicitaComplemento';
import { PersonaTitular } from '../components/personaTitular/PersonaTitular';

export const ParteInicial = (): JSX.Element => {
  return (
    <>
      <PersonaTitular />
      <PerSolicitaComplemento />
    </>
  );
};
