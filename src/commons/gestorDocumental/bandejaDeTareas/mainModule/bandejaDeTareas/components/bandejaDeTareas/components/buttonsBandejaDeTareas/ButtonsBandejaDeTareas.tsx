/* eslint-disable @typescript-eslint/naming-convention */
import { useAppSelector } from '../../../../../../../../../hooks';
import { ButtonsPqrsdf } from './buttonsPqrsdf/ButtonsPqrsdf';

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

/*const renderTramitesYServicios = () => (
  <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
    <>Botones de Tramites y Servicios </>
  </Box>
);


const renderOtros = () => (
  <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
    <>Botones de Otros </>
  </Box>
);

const renderOpas = () => (
  <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
    <>Botones de OPAS </>
  </Box>
);*/

export const ButtonsBandejaDeTareas = (): JSX.Element => {
  //* navigate declaration
  // const navigate = useNavigate();

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
        /*  case 'Tramites y Servicios':
            return renderTramitesYServicios(actionsTramitesYServicios);*/
          /* case 'Otros':
        return renderOtros();
      case 'Complemento de PQRSDF':
      case 'Complemento de PQRSDF - Respuesta a solicitud':
      case 'Complemento de PQRSDF - Respuesta a requerimiento':
        return renderComplementoPQRSDF();
      case 'OPAS':
        return renderOPAS();*/
          default:
            return null;
        }
      })()}
    </>
  );
};
