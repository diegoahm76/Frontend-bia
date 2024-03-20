/* eslint-disable @typescript-eslint/naming-convention */
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import MultipleStopIcon from '@mui/icons-material/MultipleStop';

import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../../../../../hooks';
import { ButtonsPqrsdf } from './buttonsPqrsdf/ButtonsPqrsdf';
import { ButtonsComplementos } from './buttonsPqrsdf/buttonsComplementos/ButtonsComplementos';
import { ButtonsOpas } from './buttonsOpas/ButtonsOpas';
import { ButtonsOtros } from './buttonsOtros/ButtonsOtros';
import { ButtonsTramites } from './buttonsTramitesYServicios/ButtonsTramitesSer';
import { ButtonsCompTram } from './buttonsTramitesYServicios/buttonCompTra/ButtonsComTram';

//* este array de acciones debe asignarsele a un elemento en redux para que se pueda actualizar el estado interno de los elementos según condicionales(ARRAY DE ACTIONS YA HACE PARTE DEL SLICE DE PANEL DE VENTANILLA)

{
  /* se van a tener que añadir las condiciones, ya que el panel de Ventanilla va a terminar teniendo 4 bloques de botones
  1. botones de pqrsdf
  2. boton de tramites y servicios
  3. boton de otros
  4. botones de tramites y servicios
*/
}

const renderPQRSDF = () => <ButtonsPqrsdf />;
const renderTramitesYServicios = () => <ButtonsTramites />;
const renderOtros = () => <ButtonsOtros />;
const renderComplementoPQRSDF = () => <ButtonsComplementos />;
const renderOPAS = () => <ButtonsOpas />;
const renderComplementosTramites = () => <ButtonsCompTram />;

export const ButtonsPanelVentanilla = (): JSX.Element => {
  //* navigate declaration

  const actionsTramitesYServicios = useAppSelector(
    (state) => state.PanelVentanillaSlice.actionsTramitesYServicios
  );
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );

  return (
    <>
      {(() => {
        const tipo =
          currentElementPqrsdComplementoTramitesYotros?.tipo_solicitud ||
          currentElementPqrsdComplementoTramitesYotros?.tipo;

        switch (tipo) {
          case 'PQRSDF':
            return renderPQRSDF();
          case 'TRAMITE':
            return renderTramitesYServicios();
          case 'OTROS':
            return renderOtros();
          case 'Complemento de PQRSDF':
          case 'Complemento de PQRSDF - Respuesta a solicitud':
          case 'Complemento de PQRSDF - Respuesta a requerimiento':
            return renderComplementoPQRSDF(); // sirve para complementos de pqrsdf y trámites
          case 'Complemento de trámite':
          case 'Complemento de Trámite - Respuesta a Requerimiento':
          case 'Complementos trámite – Respuestas a solicitudes':
          case 'Complementos trámite – Respuestas a requerimientos':
            return renderComplementosTramites();
          case 'OPA':
            return renderOPAS();

          default:
            return null;
        }
      })()}
    </>
  );
};
