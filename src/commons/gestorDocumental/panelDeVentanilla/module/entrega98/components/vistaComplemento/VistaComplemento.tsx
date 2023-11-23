/* eslint-disable @typescript-eslint/naming-convention */

import { ModalAtomInfoElement } from '../../Atom/ModalAtomInfoElement';
import { useParams } from 'react-router-dom';

export const VistaComplemento = (): JSX.Element => {
  //* params from react router dom, esta información se va a recibir del params.row en el momento en el que se necesite
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <ModalAtomInfoElement
        infoTitle={`Información del complemento de PQRSDF con id ${id}`}
      />
    </>
  );
};
