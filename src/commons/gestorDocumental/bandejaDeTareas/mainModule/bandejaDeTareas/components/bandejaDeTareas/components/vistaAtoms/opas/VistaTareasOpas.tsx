/* eslint-disable @typescript-eslint/naming-convention */

//----------- vista de complemento

import { useEffect } from 'react';

// import { ModalAtomInfoElement } from '../../Atom/ModalAtom/ModalAtomInfoElement';
import { useNavigate, useParams } from 'react-router-dom';
import { ModuleInfoTareaOtros } from '../../../../../Atom/ModuleInfoTareaOtros';
import { useAppSelector } from '../../../../../../../../../../hooks';
import { ModuleInfoTareaOpas } from '../../../../../Atom/ModuleInfoTareaOpas';

export const VistaTareasOpas = (): JSX.Element => {
  //* params from react router dom, esta información se va a recibir del params.row en el momento en el que se necesite
  const { id_tramite } = useParams<{ id_tramite: string }>();

  //* redux states selected
  const { infoTarea } = useAppSelector((state) => state.BandejaTareasSlice);

  //* navigate declaration
  const navigate = useNavigate();

  //* useState para el manejo de la información del detalle de la tarea

  useEffect(() => {
    if (!infoTarea) {
      navigate('/app/gestor_documental/bandeja_tareas/');
      return;
    }
    console.log('id_PQRSDF', id_tramite);
    //* se debe llamar el servicio para obtener la información del detalle de la tarea
  }, []);

  return (
    <>
      {/* va a ser necesario que reciba una nueva propiedad llamada infoDetalle, para poder llamar los elementos del detalle con el servicio respectivo para mostrar la información */}
      <ModuleInfoTareaOpas
        infoTitle={`Información de la tarea`}
        titleOpcion={`Listado de anexos de la solicitud de otros con identificación: ${id_tramite}`}
      />
    </>
  );
};
