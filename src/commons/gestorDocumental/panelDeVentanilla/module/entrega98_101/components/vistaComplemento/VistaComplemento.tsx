/* eslint-disable @typescript-eslint/naming-convention */

import { useEffect } from 'react';
import { useAppSelector } from '../../../../../../../hooks';
import { ModalAtomInfoElement } from '../../Atom/ModalAtom/ModalAtomInfoElement';
import { useNavigate, useParams } from 'react-router-dom';

export const VistaComplemento = (): JSX.Element => {
  //* params from react router dom, esta información se va a recibir del params.row en el momento en el que se necesite
  const { id } = useParams<{ id: string }>();

  //* redux states selected
  const { currentElementPqrsdComplementoTramitesYotros } = useAppSelector(
    (state) => state.PanelVentanillaSlice
  );

  //* navigate declaration
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentElementPqrsdComplementoTramitesYotros) {
      navigate('/app/gestor_documental/panel_ventanilla/');
    }
  }, []);


  return (
    <>
      <ModalAtomInfoElement
        infoTitle={`Información del complemento de PQRSDF con identificación: ${id}`}
        titleOpcion={`Listado de anexos del complemento de PQRSDF con identificación: ${id}`}
      />
    </>
  );
};
