/* eslint-disable @typescript-eslint/naming-convention */

//----------- vista de complemento

import { useEffect } from 'react';

// import { ModalAtomInfoElement } from '../../Atom/ModalAtom/ModalAtomInfoElement';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../../../../../../hooks';
import { ModuleInfoTarea } from '../../../../Atom/ModuleInfoTarea';

export const VistaTareaPqrsdf = (): JSX.Element => {
  //* params from react router dom, esta información se va a recibir del params.row en el momento en el que se necesite
  const { id_PQRSDF } = useParams<{ id_PQRSDF: string }>();

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
    console.log('id_PQRSDF', id_PQRSDF);
    //* se debe llamar el servicio para obtener la información del detalle de la tarea
  }, []);

  return (
    <>
      {/* va a ser necesario que reciba una nueva propiedad llamada infoDetalle, para poder llamar los elementos del detalle con el servicio respectivo para mostrar la información */}
      <ModuleInfoTarea
        infoTitle={`Información de la tarea`}
        titleOpcion={`Listado de anexos del complemento de PQRSDF con identificación: ${id_PQRSDF}`}
      />
    </>
  );
};
