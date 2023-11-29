/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect } from 'react';
import { useAppSelector } from '../../../../../../../hooks';
import { ModalAtomInfoElement } from '../../Atom/ModalAtomInfoElement';
import { useNavigate, useParams } from 'react-router-dom';

export const VistaPqr = (): JSX.Element => {
  //* params from react router dom, esta información se va a recibir del params.row en el momento en el que se necesite
  const { id } = useParams<{ id: string }>();
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
        infoTitle={`Información de la PQRSDF con identificación: ${id}`}
        titleOpcion={`Listado de anexos de la pqrsdf con identificación ${id}`}
      />
    </>
  );
};
