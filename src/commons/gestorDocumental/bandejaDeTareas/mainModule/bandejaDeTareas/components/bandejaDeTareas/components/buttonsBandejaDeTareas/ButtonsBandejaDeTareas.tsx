/* eslint-disable @typescript-eslint/naming-convention */
import { useAppSelector } from '../../../../../../../../../hooks';
import { showAlert } from '../../../../../../../../../utils/showAlert/ShowAlert';
import { ButtonsTareaOpas } from './buttonsOpas/ButtonsOpas';
import { ButtonsTareaOtros } from './buttonsOtros/buttonsOtros';
import { ButtonsPqrsdf } from './buttonsPqrsdf/ButtonsPqrsdf';
import { ButtonsTareaTramites } from './buttonsTramitesYServicios/ButtonsTramites';

//* este array de acciones debe asignarsele a un elemento en redux para que se pueda actualizar el estado interno de los elementos según condicionales(ARRAY DE ACTIONS YA HACE PARTE DEL SLICE DE PANEL DE VENTANILLA)

{
  /* se van a tener que añadir las condiciones, ya que la bandeja de tareas va a terminar teniendo 4 bloques de botones
  1. botones relacionados a la respuesta de una pqrsdf
  2. botones relacionados a la respuesta tramites y servicios
  3. botonoes relacionados a la respuesta de otros
  4. buttons relacionados a la respuesta de opas
*/
}

const renderPQRSDF = () => <ButtonsPqrsdf />;

// ? se debe cambiar por la definicion de los buttons de las acciones de tramites y servicios en un módulo aparte tal como se realiza con pqrsdf
const renderOtros = () => <ButtonsTareaOtros />;

const renderOpas = () => <ButtonsTareaOpas />;

const renderTramitesYServicios = () => <ButtonsTareaTramites />;

export const ButtonsBandejaDeTareas = (): JSX.Element => {
  const { currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas } =
    useAppSelector((state) => state.BandejaTareasSlice);

  return (
    <>
      {(() => {
        const tipo =
          currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea ||
          currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo;

        switch (tipo) {
          case 'Responder PQRSDF':
          case 'RESPONDER PQRSDF':
            return renderPQRSDF();
          case 'Responder Trámite':
          case 'RESPONDER TRÁMITE':
          case 'RESPONDER TRAMITE':
            return renderTramitesYServicios();
          case 'Responder Otro':
          case 'RESPONDER OTRO':
            return renderOtros();
          case 'Responder OPA':
          case 'RESPONDER OPA':
            return renderOpas();
          default:
            return console.error(
              'No se ha encontrado el tipo de tarea para la selección de botones'
            );
        }
      })()}
    </>
  );
};
